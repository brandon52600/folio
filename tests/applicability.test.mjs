import { test } from 'node:test';
import assert from 'node:assert/strict';
import { outlines } from '../src/catalog.ts';
import { hpiGroups, exposureFields } from '../src/subjective.ts';
import { groupsFor, exposuresFor } from '../src/subjectiveApplicability.ts';
import { buildPdf } from '../src/pdf.ts';
test('all templates include every HPI parameter and exposure with if-applicable instructions', async () => {
 for (const o of outlines) {
  assert.deepEqual(groupsFor(o),hpiGroups,o.title);
  assert.deepEqual(exposuresFor(o),exposureFields,o.title);
  const pdf=await buildPdf(o,{paper:'A4',extra:false});
  const text=pdf.pages.slice(0,2).flatMap(p=>p.ops.filter(op=>op.kind==='text').map(op=>op.text));
  assert(text.includes('Complete each section if applicable; leave unrelated fields blank.'),o.title);
  for(const g of hpiGroups)assert(text.includes(g.label),o.title+': '+g.label);
  for(const label of exposureFields)assert(text.includes(label),o.title+': '+label);
 }
});
test('saved AI applicability metadata cannot hide any history fields',()=>{
 for(const painMode of ['none','conditional','primary']) {
  const o={...outlines[0],generated:true,painMode};
  assert.deepEqual(groupsFor(o),hpiGroups);
  assert.deepEqual(exposuresFor(o),exposureFields);
 }
});
