import {test} from 'node:test';import assert from 'node:assert/strict';
import {referenceSheets,buildReferencePdf} from '../src/references.ts';
import {PDFDocument} from '../src/vendor/pdf-lib.js';
test('six sourced reference sheets fit a single Letter/A4 page',async()=>{
 assert.equal(referenceSheets.length,6);
 for(const sheet of referenceSheets)for(const paper of ['US Letter','A4']){
 const result=await buildReferencePdf(sheet,paper);assert.equal((await PDFDocument.load(result.bytes)).getPageCount(),1);
 assert(sheet.source.url.startsWith('https://'));
 for(const op of result.pages[0].ops)assert(op.y>0&&op.y<result.pages[0].height);
 const text=result.pages[0].ops.filter(op=>op.kind==='text').map(op=>op.text).join(' ');
 for(const section of sheet.sections)for(const line of section.lines)assert(text.includes(line));
 }
});
