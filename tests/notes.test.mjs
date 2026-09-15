import {test} from 'node:test';import assert from 'node:assert/strict';
import {newVault,openVault,seal} from '../src/vault.ts';
import {outlines,matchesSpecialty} from '../src/catalog.ts';
import {noteSections,needsCareInfo} from '../src/noteModel.ts';
import {buildPdf} from '../src/pdf.ts';import {buildNotePdf} from '../src/NotePdf.ts';
import {PDFDocument} from '../src/vendor/pdf-lib.js';
test('vault roundtrip, wrong PIN, tampering, random IV, and encrypted metadata',async()=>{
 const session=await newVault('0427');const notes=[{id:'test-note',outlineId:outlines[0].id,createdAt:'2026-09-15',updatedAt:'2026-09-15',values:{name:'PRIVATE PERSON',cc:'Private complaint'}}];
 const a=await seal(notes,session.key,session.salt),b=await seal(notes,session.key,session.salt);
 assert.notEqual(a,b);assert(!a.includes('PRIVATE'));assert(!a.includes('test-note'));assert.deepEqual((await openVault(a,'0427')).notes,notes);
 await assert.rejects(openVault(a,'0428'));const tampered=JSON.parse(a);tampered.data=(tampered.data[0]==='A'?'B':'A')+tampered.data.slice(1);await assert.rejects(openVault(JSON.stringify(tampered),'0427'));
 await assert.rejects(newVault('12345'));
});
test('every ED and IM template has care info at the start in form and PDF',async()=>{
 for(const o of outlines){const expected=matchesSpecialty(o,'Emergency medicine')||matchesSpecialty(o,'Internal medicine');assert.equal(needsCareInfo(o),expected);assert.equal(noteSections(o)[0].fields.some(f=>f.id==='code'),expected);if(expected){for(const paper of ['US Letter','A4']){const p=await buildPdf(o,{paper,extra:false});const text=p.pages[0].ops.filter(o=>o.kind==='text');assert(text.some(o=>o.text.includes('Code status')&&o.y<240));assert(text.some(o=>o.text.includes('#1 emergency contact')&&o.y<240));}}}
});
test('completed PDF wraps long entries, preserves zero and explicit negatives, omits unanswered fields',async()=>{
 const o=outlines.find(needsCareInfo),n={id:'test-note',outlineId:o.id,createdAt:'2026-09-15',updatedAt:'2026-09-15',values:{name:'TEST ONLY',code:'Unknown / not yet confirmed','ros-0':'Denied',pain:'0',plan:'Longword'.repeat(1600)+'\nSecond paragraph'}};
 for(const paper of ['US Letter','A4']){const p=await buildNotePdf(n,o,paper);assert(p.pages.length>1);assert.equal((await PDFDocument.load(p.bytes)).getPageCount(),p.pages.length);const all=p.pages.flatMap(p=>p.ops).map(o=>o.text).join(' ');assert(all.includes('Denied'));assert(all.includes('Second paragraph'));assert(!all.includes('Full code'));for(const p1 of p.pages)for(const op of p1.ops)assert(op.y>0&&op.y<p1.height);}
 await assert.rejects(buildNotePdf({...n,values:{name:'漢字'}},o,'A4'));
});
