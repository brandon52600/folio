import {useState,useRef,useEffect} from 'react';
import {outlines} from './catalog';
import {noteSections,type Note} from './noteModel';
import {newVault,openVault,seal,parseEnvelope} from './vault';
import {buildNotePdf} from './NotePdf';
import {buildPdf} from './pdf';
const STORE=`folio-vault-v1:${import.meta.env.BASE_URL}`;
const LOCK=`${STORE}:editor`;
function download(bytes:BlobPart,name:string,type:string){const url=URL.createObjectURL(new Blob([bytes],{type}));const a=document.createElement('a');a.href=url;a.download=name;a.click();setTimeout(()=>URL.revokeObjectURL(url),1000);}
export default function NoteWorkspace({active,request,onBrowse}:{active:boolean;request:{outlineId:string;nonce:number}|null;onBrowse:()=>void}) {
 const [exists,setExists]=useState(()=>{try{return !!localStorage.getItem(STORE);}catch{return false;}});
 const [unlocked,setUnlocked]=useState(false),[pin,setPin]=useState(''),[confirm,setConfirm]=useState(''),[busy,setBusy]=useState(false),[message,setMessage]=useState(''),[saveState,setSaveState]=useState(''),[notes,setNotes]=useState<Note[]>([]),[selected,setSelected]=useState(''),[trash,setTrash]=useState(false),[paper,setPaper]=useState<'US Letter'|'A4'>('US Letter'),[query,setQuery]=useState('');
 const session=useRef<Awaited<ReturnType<typeof newVault>>|null>(null),release=useRef<(()=>void)|null>(null),queue=useRef<Promise<void>>(Promise.resolve()),latest=useRef<Note[]>([]),dirty=useRef(false),masked=useRef(true),lastRequest=useRef(0),failed=useRef(0),nextAttempt=useRef(0),restore=useRef('');
 const locking=useRef(false),mounted=useRef(true);
 async function acquire(){
  if(release.current)return;
  if(!navigator.locks)throw Error('This browser cannot safely open the vault. Use a current browser over HTTPS.');
  await new Promise<void>((resolve,reject)=>{navigator.locks.request(LOCK,{ifAvailable:true},async lock=>{if(!lock){reject(Error('Notes are open in another tab. Lock that tab first.'));return;}await new Promise<void>(done=>{release.current=done;resolve();});}).catch(reject);});
 }
 function persist(next:Note[]){
  latest.current=next;setNotes(next);dirty.current=true;setSaveState('Saving…');
  const s=session.current;if(!s)return Promise.reject(Error('Vault is locked.'));
  queue.current=queue.current.catch(()=>{}).then(async()=>{const raw=await seal(next,s.key,s.salt);localStorage.setItem(STORE,raw);if(latest.current===next){dirty.current=false;if(mounted.current)setSaveState('Saved on this device');}}).catch(()=>{if(mounted.current)setSaveState('Not saved — storage is unavailable or full. Download an encrypted backup before closing.');throw Error('Could not save notes.');});
  // The queue retains failures for flush/lock while this handler prevents unhandled rejections.
  void queue.current.catch(()=>{});return queue.current;
 }
 async function lock(){
  if(locking.current||!session.current)return;locking.current=true;masked.current=true;setUnlocked(false);setPin('');setConfirm('');setQuery('');setMessage('');setBusy(true);
  try{await queue.current;if(dirty.current)await persist(latest.current);session.current=null;latest.current=[];setNotes([]);setSelected('');release.current?.();release.current=null;setMessage('Locked. Enter your PIN to reopen your notes.');}
  catch{setMessage('Saving failed. Your unsaved note is hidden in this tab. Unlock to retry or export a backup; do not close this tab.');}
  finally{locking.current=false;setBusy(false);}
 }
 useEffect(()=>{
  mounted.current=true;let timer:ReturnType<typeof setTimeout>;
  const touch=()=>{clearTimeout(timer);if(!masked.current)timer=setTimeout(()=>void lock(),5*60*1000);};
  const hide=()=>{if(document.hidden)void lock();};
  const unload=(e:BeforeUnloadEvent)=>{if(dirty.current){e.preventDefault();e.returnValue='';}};
  ['pointerdown','keydown','input'].forEach(n=>window.addEventListener(n,touch));document.addEventListener('visibilitychange',hide);window.addEventListener('beforeunload',unload);touch();
  return ()=>{mounted.current=false;clearTimeout(timer);['pointerdown','keydown','input'].forEach(n=>window.removeEventListener(n,touch));document.removeEventListener('visibilitychange',hide);window.removeEventListener('beforeunload',unload);};
 },[unlocked]);
 function create(outlineId:string){const now=new Date().toISOString();const n:Note={id:crypto.randomUUID(),outlineId,createdAt:now,updatedAt:now,values:{}};void persist([n,...latest.current]).catch(()=>{});setSelected(n.id);setTrash(false);}
 useEffect(()=>{if(unlocked&&request&&request.nonce!==lastRequest.current){lastRequest.current=request.nonce;create(request.outlineId);}},[unlocked,request]);
 async function unlock(e:React.FormEvent){
  e.preventDefault();if(Date.now()<nextAttempt.current){setMessage('Too many attempts. Wait 30 seconds before trying again.');return;}
  if(!/^\d{4}$/.test(pin)){setMessage('Enter exactly four digits.');return;}
  if(!exists&&!restore.current&&pin!==confirm){setMessage('The PINs do not match.');return;}
  setBusy(true);setMessage('');
  try{
   await acquire();const raw=localStorage.getItem(STORE);
   if(session.current){ // A failed save kept the in-memory note behind the lock screen.
    if(!raw)throw Error('The stored vault is unavailable. Keep this tab open.');await openVault(raw,pin);
   }else if(restore.current){
    if(raw)throw Error('A vault already exists here. Restore into a browser with no existing vault.');
    session.current=await openVault(restore.current,pin);localStorage.setItem(STORE,restore.current);restore.current='';
   }else if(raw)session.current=await openVault(raw,pin);
   else{session.current=await newVault(pin);localStorage.setItem(STORE,await seal([],session.current.key,session.current.salt));}
   if(!dirty.current){latest.current=session.current.notes;setNotes(latest.current);}
   failed.current=0;setExists(true);setPin('');setConfirm('');masked.current=false;setUnlocked(true);setSaveState(dirty.current?'Unsaved changes — retry save or export backup':'Saved on this device');
  }catch(err){if(!dirty.current){session.current=null;release.current?.();release.current=null;}failed.current++;if(failed.current>=5){nextAttempt.current=Date.now()+30000;failed.current=0;}setMessage(err instanceof Error&&/another tab|browser|already exists|stored vault/.test(err.message)?err.message:'Could not unlock or save the vault. Check your PIN and browser storage. Your existing files were not changed.');}
  finally{setBusy(false);}
 }
 const note=notes.find(n=>n.id===selected),outline=note&&outlines.find(o=>o.id===note.outlineId);
 function change(id:string,value:string){if(!note||masked.current)return;void persist(latest.current.map(n=>n.id===note.id?{...n,updatedAt:new Date().toISOString(),values:{...n.values,reviewed:id==='reviewed'?value:'',[id]:value}}:n)).catch(()=>{});}
 async function exportPdf(blank=false){if(!note||!outline)return;setMessage('');try{const p=blank?await buildPdf(outline,{paper,extra:false}):await buildNotePdf(note,outline,paper);if(!masked.current)download(p.bytes as BlobPart,p.filename,'application/pdf');}catch{setMessage('PDF export failed. Some characters may not be supported by the PDF font. Your note is still saved; use an encrypted backup to preserve all text.');}}
 async function backup(){const s=session.current;if(!s)return;try{const raw=await seal(latest.current,s.key,s.salt);if(!masked.current)download(raw,'folio-encrypted-backup.json','application/json');}catch{setMessage('Could not create a backup. Keep this tab open and retry.');}}
 return <section className="note-workspace" hidden={!active} aria-label="My notes">
 {!unlocked?<div className="vault-card">
  <div className="eyebrow">LOCAL NOTE VAULT</div><h1>{exists?'Unlock your notes':'Create your PIN'}</h1>
  <p>{exists?'Your notes stay encrypted on this device.':'Choose a four-digit PIN to begin writing and saving notes.'}</p>
  <form onSubmit={unlock}><label>Four-digit PIN<input aria-label="Four-digit PIN" type="password" inputMode="numeric" autoComplete="off" maxLength={4} value={pin} onChange={e=>setPin(e.target.value.replace(/\D/g,''))}/></label>
  {!exists&&!restore.current&&<label>Confirm PIN<input aria-label="Confirm PIN" type="password" inputMode="numeric" autoComplete="off" maxLength={4} value={confirm} onChange={e=>setConfirm(e.target.value.replace(/\D/g,''))}/></label>}
  <button className="download-button" disabled={busy}>{busy?'Opening…':exists||restore.current?'Unlock notes':'Create local vault'}</button></form>
  <p role="status">{message}</p><p className="vault-help">A four-digit PIN is a convenience lock and can be guessed if someone copies your vault. Use a device screen lock. There is no PIN recovery. Clearing site data removes local notes; keep encrypted backups. Use only where your organization permits local clinical notes.</p>
  {!exists&&<label>Restore an encrypted backup<input aria-label="Restore encrypted backup" type="file" accept=".json,application/json" disabled={busy} onChange={async e=>{const file=e.target.files?.[0];if(!file)return;try{if(file.size>14000000)throw Error();const raw=await file.text();parseEnvelope(raw);restore.current=raw;setMessage('Backup selected. Enter its original four-digit PIN to restore.');}catch{setMessage('This is not a supported Folio backup.');}}}/></label>}
  <button onClick={onBrowse}>Browse blank templates</button>
 </div>:<>
  <div className="notes-toolbar"><div><div className="eyebrow">YOUR LOCAL WORKSPACE</div><h1>My notes</h1></div><button onClick={onBrowse}>New note</button><button onClick={backup}>Encrypted backup</button><button onClick={()=>void lock()}>Lock notes</button></div>
  <p className="vault-help">Auto-locks after 5 minutes of inactivity or when this tab is hidden. Downloaded PDFs are not PIN-protected.</p>
  <div role="status" className={saveState.startsWith('Not saved')?'save-error':'save-status'}>{saveState}</div>{dirty.current&&<button onClick={()=>void persist(latest.current).catch(()=>{})}>Retry save</button>}
  {message&&<p role="alert">{message}</p>}
  <div className="notes-layout"><aside className="notes-list"><label>Search notes<input value={query} onChange={e=>setQuery(e.target.value)} placeholder="Name or template"/></label><button aria-pressed={trash} onClick={()=>{setTrash(!trash);setSelected('');}}>{trash?'Active notes':'Trash'}</button>
   {notes.filter(n=>Boolean(n.deleted)===trash).filter(n=>`${n.values.name||''} ${outlines.find(o=>o.id===n.outlineId)?.title||''}`.toLowerCase().includes(query.toLowerCase())).map(n=><button className={selected===n.id?'note-item selected':'note-item'} key={n.id} onClick={()=>setSelected(n.id)}><strong>{n.values.name||'Untitled encounter'}</strong><span>{outlines.find(o=>o.id===n.outlineId)?.title||'Unknown template'}</span><small>{new Date(n.updatedAt).toLocaleString()}</small></button>)}
   {!notes.some(n=>Boolean(n.deleted)===trash)&&<p>{trash?'Trash is empty.':'Choose a template to write your first note.'}</p>}
  </aside>
  {note&&outline?<article className="editable-document" key={note.id}><div className="note-document-header"><span className="eyebrow">{note.values.reviewed==='yes'?'REVIEWED BY AUTHOR':'DRAFT'} · {outline.specialty||'ENCOUNTER'}</span><h2>{outline.title}</h2><div className="note-actions"><label>Note paper size<select value={paper} onChange={e=>setPaper(e.target.value as 'US Letter'|'A4')}><option>US Letter</option><option>A4</option></select></label><button onClick={()=>exportPdf()}>Download completed PDF</button><button onClick={()=>exportPdf(true)}>Download blank PDF</button><button onClick={()=>{void persist(latest.current.map(n=>n.id===note.id?{...n,deleted:!n.deleted}:n)).catch(()=>{});setSelected('');}}>{note.deleted?'Restore note':'Move to trash'}</button></div></div>
  {note.deleted?<p>This note is in Trash. Restore it to continue editing.</p>:noteSections(outline).map((section,i)=><details className="note-section" open={i===0} key={section.title}><summary>{section.title}<span>{section.fields.filter(f=>Boolean(note.values[f.id])).length} / {section.fields.length}</span></summary><div className="note-fields">{section.fields.map(f=><div key={f.id} className={f.type==='long'?'wide note-field':'note-field'}><label htmlFor={f.id}>{f.label}</label>{f.type==='long'?<textarea id={f.id} value={note.values[f.id]||''} onChange={e=>change(f.id,e.target.value)} rows={2}/>:f.type==='select'?<select id={f.id} value={note.values[f.id]||''} onChange={e=>change(f.id,e.target.value)}><option value="">Not recorded</option>{f.options?.map(v=><option key={v}>{v}</option>)}</select>:f.type==='check'?<input id={f.id} type="checkbox" checked={note.values[f.id]==='yes'} onChange={e=>change(f.id,e.target.checked?'yes':'')}/>:f.type==='range'?<div className="pain-control"><label className="inline-check"><input aria-label="Record pain score" type="checkbox" checked={note.values[f.id]!==undefined&&note.values[f.id]!==''} onChange={e=>change(f.id,e.target.checked?'0':'')}/>Record score</label><input id={f.id} aria-label="Pain severity (0-10)" type="range" min={0} max={10} step={1} disabled={!note.values[f.id]} value={note.values[f.id]||'0'} onChange={e=>change(f.id,e.target.value)}/><output>{note.values[f.id]?`${note.values[f.id]} / 10`:'Not recorded'}</output></div>:<input id={f.id} type={f.type==='date'?'date':'text'} value={note.values[f.id]||''} onChange={e=>change(f.id,e.target.value)}/>}</div>)}</div></details>)}
  </article>:<div className="notes-empty"><h2>{trash?'Recover a note':'Ready for your next encounter'}</h2><p>{trash?'Select a note to restore it.':'Open a saved note or choose a template to start writing.'}</p><button className="download-button" onClick={onBrowse}>Choose a template</button></div>}
  </div>
 </>}
 </section>;
}
