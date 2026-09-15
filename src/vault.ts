import type { Note } from './noteModel.ts';
export type Envelope = { version: 1; salt: string; iv: string; data: string };
const encoder = new TextEncoder();
function b64(a:Uint8Array) { let s=''; for(const b of a)s+=String.fromCharCode(b);return btoa(s); }
function bytes(s:string) {return Uint8Array.from(atob(s),c=>c.charCodeAt(0));}
export async function derivePinKey(pin:string,salt:string) {
 if(!/^\d{4}$/.test(pin)) throw Error('Enter exactly four digits.');
 const material=await crypto.subtle.importKey('raw',encoder.encode(pin),'PBKDF2',false,['deriveKey']);
 return crypto.subtle.deriveKey({name:'PBKDF2',salt:bytes(salt),iterations:600000,hash:'SHA-256'},material,{name:'AES-GCM',length:256},false,['encrypt','decrypt']);
}
export async function seal(notes:Note[],key:CryptoKey,salt:string):Promise<string> {
 const iv=crypto.getRandomValues(new Uint8Array(12));
 const data=await crypto.subtle.encrypt({name:'AES-GCM',iv,additionalData:encoder.encode('folio-vault-v1')},key,encoder.encode(JSON.stringify(notes)));
 return JSON.stringify({version:1,salt,iv:b64(iv),data:b64(new Uint8Array(data))});
}
export function parseEnvelope(raw:string):Envelope {
 const e=JSON.parse(raw);
 if(e.version!==1||typeof e.salt!=='string'||typeof e.iv!=='string'||typeof e.data!=='string'||bytes(e.salt).length!==16||bytes(e.iv).length!==12||e.data.length>14000000)throw Error('Invalid backup format.');
 return e;
}
export async function openVault(raw:string,pin:string) {
 const e=parseEnvelope(raw), key=await derivePinKey(pin,e.salt);
 const plain=await crypto.subtle.decrypt({name:'AES-GCM',iv:bytes(e.iv),additionalData:encoder.encode('folio-vault-v1')},key,bytes(e.data));
 const notes=JSON.parse(new TextDecoder().decode(plain));
 if(!Array.isArray(notes)||!notes.every(n=>n&&typeof n.id==='string'&&typeof n.outlineId==='string'&&typeof n.createdAt==='string'&&typeof n.updatedAt==='string'&&n.values&&typeof n.values==='object'&&!Array.isArray(n.values)&&Object.values(n.values).every(v=>typeof v==='string'))||new Set(notes.map(n=>n.id)).size!==notes.length)throw Error('Invalid note data.');
 return {key,salt:e.salt,notes:notes as Note[]};
}
export async function newVault(pin:string) {const salt=b64(crypto.getRandomValues(new Uint8Array(16)));const key=await derivePinKey(pin,salt);return {key,salt,notes:[] as Note[]};}
