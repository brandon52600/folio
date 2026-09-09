import { test } from 'node:test';
import assert from 'node:assert/strict';
import {
  outlines,
  systems,
  differentialsFor,
  specialties,
  matchesSpecialty,
  questionsFor,
  symptomsFor,
  examsFor,
  getSystem,
} from '../src/catalog.ts';
import { buildPdf } from '../src/pdf.ts';
import { PDFDocument } from '../src/vendor/pdf-lib.js';
import { mkdir, writeFile } from 'node:fs/promises';
test('321 general specialty, system, and focused outlines cover 15 systems', () => {
  assert.equal(outlines.length, 321);
  assert.equal(systems.length, 15);
  assert.equal(new Set(outlines.map((o) => o.id)).size, 321);

  assert.equal(
    outlines.filter((o) => o.kind === 'general').length,
    systems.length,
  );
  for (const system of systems)
    assert.equal(
      outlines.filter((o) => o.kind === 'general' && o.system === system.id)
        .length,
      1,
    );
  for (const o of outlines) {
    assert(questionsFor(o).length >= 20 && questionsFor(o).length <= 54);
    assert(symptomsFor(o).length >= 4);
    assert(examsFor(o).length >= 6);
    assert(getSystem(o).sources.length);
  }
});
test('all complaints generate valid Letter and A4 PDFs with safe bounds', async () => {
  for (const o of outlines)
    for (const paper of ['US Letter', 'A4']) {
      const result = await buildPdf(o, { paper, extra: false });
      const pdf = await PDFDocument.load(result.bytes);
      assert.equal(pdf.getPageCount(), 6, o.id);
      assert.equal(pdf.getForm().getFields().length, 0);
      for (const p of result.pages) {
        for (const op of p.ops) {
          assert(op.y > 0 && op.y < p.height, `${o.id} ${op.kind} ${op.y}`);
          if (op.kind === 'line') assert(op.y2 < p.height);
        }
      }
    }
});
test('extra writing page and representative samples export', async () => {
  await mkdir('output/pdf', { recursive: true });
  for (const title of ['Chest pain', 'Child with fever']) {
    const o = outlines.find((o) => o.title === title);
    const result = await buildPdf(o, {
      paper: title === 'Chest pain' ? 'US Letter' : 'A4',
      extra: title !== 'Chest pain',
    });
    const pdf = await PDFDocument.load(result.bytes);
    assert.equal(pdf.getPageCount(), title === 'Chest pain' ? 6 : 7);
    await writeFile('output/pdf/' + result.filename, result.bytes);
  }
});

test('subjective sections and HPI follow the requested order', async () => {
  const result = await buildPdf(
    outlines.find((o) => o.title === 'Fever'),
    {
      paper: 'US Letter',
      extra: false,
    },
  );
  const text = result.pages.flatMap((p) =>
    p.ops.filter((op) => op.kind === 'text').map((op) => op.text),
  );
  const all = text.join('\n');
  let last = -1;
  for (const label of [
    'Patient name',
    'Age',
    'Gender',
    'CC / Chief complaint',
    'HPI / HISTORY PARAMETERS (IF APPLICABLE)',
    'O / Onset',
    'P / Previously happened',
    'P / Palliative factors',
    'P / Provoking factors',
    'S / Setting',
    'S / Severity',
    'T / Timing',
    'Sick contacts',
    'Recent travel',
    'ASSOCIATED SYMPTOMS',
    'RELEVANT ROS',
    'MEDS /',
    'SUPPLEMENTS',
    'ALLERGIES /',
    'Contact',
    'Food',
    'Environment',
    'Drugs',
    'PMH /',
    'PSH /',
    'FH /',
    'SH /',
  ]) {
    const pos = all.indexOf(label, last + 1);
    assert(pos > last, label);
    last = pos;
  }
  for (const label of [
    'Tobacco',
    'Alcohol',
    'Drugs /',
    'Caffeine',
    'Diet',
    'Exercise',
    'Marital',
    'Occupation',
    'Living situation',
    'Stress',
    'Sleep',
    'Sex /',
    'Hobbies',
  ])
    assert(all.includes(label), label);
});

test('HPI uses labels with blanks and no conversational questions for every complaint', async () => {
  assert.equal(
    outlines.filter((o) => o.kind === 'general').length,
    systems.length,
  );
  for (const system of systems)
    assert.equal(
      outlines.filter((o) => o.kind === 'general' && o.system === system.id)
        .length,
      1,
    );
  for (const o of outlines) {
    const r = await buildPdf(o, { paper: 'US Letter', extra: false });
    const hpi = r.pages
      .slice(0, 2)
      .flatMap((p) =>
        p.ops.filter((op) => op.kind === 'text').map((op) => op.text),
      );
    assert(
      hpi.every((t) => !t.includes('?')),
      o.id,
    );
    assert(
      questionsFor(o).every((label) => hpi.includes(label)),
      o.id,
    );
    assert.equal(
      r.pages
        .slice(0, 2)
        .flatMap((p) => p.ops.filter((op) => op.kind === 'line')).length >= questionsFor(o).length,
      true,
    );
  }
});

test('each specialty has a broad visit template scoped to its specialty', async () => {
  for (const specialty of specialties.slice(1)) {
    const templates = outlines.filter(
      (o) => o.specialty === specialty && o.kind === 'specialty',
    );
    assert.equal(templates.length, 1);
    const o = templates[0];
    assert(matchesSpecialty(o, specialty));
    assert(
      !matchesSpecialty(
        o,
        specialties.slice(1).find((s) => s !== specialty),
      ),
    );
    assert(questionsFor(o).includes('Baseline health / function'));
    const pdf = await buildPdf(o, { paper: 'US Letter', extra: false });
    const text = pdf.pages
      .flatMap((p) => p.ops.filter((o) => o.kind === 'text').map((o) => o.text))
      .join(' ');
    assert(text.toLowerCase().includes('general visit / specialty history'));
    assert(!text.toLowerCase().includes('complaint-specific hpi details'));
  }
});

test('ten additional focused outlines per specialty have complete tailored content', () => {
  for (const specialty of specialties.slice(1)) {
    const added = outlines.filter(
      (o) => o.specialty === specialty && o.expansion,
    );
    assert.equal(added.length, 10, specialty);
    assert.equal(new Set(added.map((o) => o.title)).size, 10);
    for (const o of added) {
      assert.equal(o.hpi.length, 10, o.title);
      assert.equal(new Set(o.hpi).size, 10, o.title);
      assert(o.ros.length >= 4 && o.ros.length <= 8, o.title);
      assert.equal(o.exams.length, 6, o.title);
      assert(
        !outlines.some(
          (old) =>
            !old.expansion &&
            matchesSpecialty(old, specialty) &&
            old.title === o.title,
        ),
        o.title,
      );
    }
  }
});

test('every complaint renders 5-10 differential reminders on its assessment page', async () => {
  for (const o of outlines) {
    const ddx = differentialsFor(o);
    assert(ddx && ddx.length >= 5 && ddx.length <= 10, o.title);
    assert.equal(new Set(ddx).size, ddx.length, o.title);
    const result = await buildPdf(o, { paper: 'US Letter', extra: false });
    const text = result.pages[5].ops
      .filter((op) => op.kind === 'text')
      .map((op) => op.text)
      .join(' ');
    for (const dx of ddx)
      assert(text.includes(dx.replace(/^!/, '! ')), o.title + ': ' + dx);
    assert(text.includes('not confirmed diagnoses'));
    const firstSection = result.pages[5].ops.find(op => op.kind === 'text' && op.y >= 150);
    assert(firstSection.text.startsWith('POSSIBLE MEDICAL DIAGNOSES'), o.title);
    const assessmentIndex = text.indexOf('ASSESSMENT / SUMMARY');
    assert(assessmentIndex > 0, o.title);
    for (const dx of ddx) assert(text.indexOf(dx.replace(/^!/, '! ')) < assessmentIndex, o.title);
    assert(text.indexOf('PLAN / PROPOSED') > assessmentIndex, o.title);
  }
});

