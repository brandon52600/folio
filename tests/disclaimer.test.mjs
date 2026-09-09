import {test} from 'node:test';
import assert from 'node:assert/strict';
import {outlines} from '../src/catalog.ts';
import {buildPdf} from '../src/pdf.ts';
import {referenceSheets,buildReferencePdf} from '../src/references.ts';
import {pdfNotice} from '../src/disclaimer.ts';
test('every exported template and reference page includes the guide and liability notice',async()=>{
 const results=[];
 for(const o of outlines)results.push(await buildPdf(o,{paper:'A4',extra:false}));
 for(const r of referenceSheets)results.push(await buildReferencePdf(r,'A4'));
 for(const result of results)for(const page of result.pages){const text=page.ops.filter(o=>o.kind==='text').map(o=>o.text);for(const notice of pdfNotice)assert(text.includes(notice),result.filename);}
});
