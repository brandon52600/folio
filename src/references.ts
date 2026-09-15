import { pdfNotice } from './disclaimer.ts';
import { PDFDocument, StandardFonts, rgb } from './vendor/pdf-lib.js';
import type { PdfResult, DrawOp } from './pdf.ts';
import { systems } from './catalog.ts';
import { generalDetails } from './expandedCatalog.ts';
import { relatedRosBySystem } from './systemReferences.ts';
export type ReferenceSheet = {
  id: string;
  title: string;
  description: string;
  sections: { title: string; lines: string[] }[];
  source: { title: string; url: string };
  additionalSources?: { title: string; url: string }[];
  layout?: 'labs';
};
const interview = {
  title: 'Clinical Methods: The Medical Interview',
  url: 'https://www.ncbi.nlm.nih.gov/books/NBK349/',
};
const coreReferenceSheets: ReferenceSheet[] = [
  {
    id: 'hpi',
    title: 'HPI quick reference',
    description: 'Your OPPPQRRSST sequence, exposures, and symptom context.',
    source: interview,
    sections: [
      {
        title: 'O / P / P / P',
        lines: [
          'Onset: date/time, sudden/gradual, initial symptoms.',
          'Previously happened: number, similarity, prior evaluation.',
          'Palliative factors: measures tried, degree and duration of relief.',
          'Provoking factors: triggers, aggravating factors, reproducibility.',
        ],
      },
      {
        title: 'Q / R / R',
        lines: [
          'Quality of pain: description, character, change in quality.',
          'Region: location, side, extent/depth.',
          'Radiation: present/absent, destination, pattern.',
        ],
      },
      {
        title: 'S / S / T',
        lines: [
          'Setting: activity at onset, environment, circumstances.',
          'Severity: current/worst, baseline comparison, functional limitation.',
          'Timing: constant/intermittent, duration, frequency, progression.',
        ],
      },
      {
        title: 'Complete the context',
        lines: [
          'Sick contacts; recent travel/dates; occupational and other exposures.',
          'Associated symptoms; pertinent negatives; relevant warning features.',
          'Treatments/results; impact on intake, sleep and activity; main concern.',
        ],
      },
    ],
  },
  {
    id: 'subjective',
    title: 'Subjective history checklist',
    description:
      'The full subjective sequence and your four allergy categories.',
    source: interview,
    sections: [
      {
        title: 'Opening sequence',
        lines: [
          'Patient name, age, gender; source of history and communication needs.',
          'CC in patient wording; HPI in your OPPPQRRSST order.',
          'Associated symptoms, then relevant ROS.',
        ],
      },
      {
        title: 'Medicines and allergies',
        lines: [
          'Meds: name, dose, route, frequency, reason, benefit and side effects.',
          'Supplements and nonprescription products; adherence and access.',
          'Allergies: contact, food, environment, drugs. Record the reaction.',
        ],
      },
      {
        title: 'Background history',
        lines: [
          'PMH: conditions, relevant dates, admissions and current status.',
          'PSH: procedure, date, indication, complications and recovery.',
          'FH: relative, condition, age at onset and relevant inherited risks.',
        ],
      },
      {
        title: 'Social history',
        lines: [
          'Tobacco, alcohol, drugs, caffeine, diet and exercise.',
          'Marital status, occupation, living situation and supports.',
          'Stress, sleep, sex, hobbies; relevant exposures and safety concerns.',
        ],
      },
    ],
  },
  {
    id: 'medication-review',
    title: 'Medication reconciliation',
    description:
      'A practical checklist for building and comparing medication lists.',
    source: {
      title: 'AHRQ: Medication Reconciliation',
      url: 'https://psnet.ahrq.gov/primer/medication-reconciliation',
    },
    sections: [
      {
        title: 'Gather the actual regimen',
        lines: [
          'Ask about prescribed, nonprescription and as-needed medicines.',
          'Include vitamins, supplements, inhalers, drops, creams and injections.',
          'Compare patient/caregiver reports with available bottles and records.',
        ],
      },
      {
        title: 'Record each product',
        lines: [
          'Name, formulation, strength, dose, route and frequency.',
          'Indication, actual use, last dose when relevant, and prescriber.',
          'Benefit, adverse effects, missed doses, cost and access barriers.',
        ],
      },
      {
        title: 'Reconcile differences',
        lines: [
          'Identify omissions, duplicate products and dose/frequency mismatches.',
          'Clarify starts, stops and changes across transitions in care.',
          'Verify discrepancies with the appropriate clinician or pharmacist.',
        ],
      },
      {
        title: 'Close the loop',
        lines: [
          'Record the source, date and unresolved questions.',
          'Document the reconciled list and communicate agreed changes.',
          'Check patient understanding; do not assume a discrepancy is intentional.',
        ],
      },
    ],
  },
  {
    id: 'sbar',
    title: 'SBAR handoff guide',
    description:
      'A concise structure for communicating a concern or requesting help.',
    source: {
      title: 'AHRQ TeamSTEPPS: SBAR',
      url: 'https://www.ahrq.gov/teamstepps-program/curriculum/communication/tools/sbar.html',
    },
    sections: [
      {
        title: 'S / Situation',
        lines: [
          'Identify yourself, role, patient and location as appropriate.',
          'State the immediate concern and why you are contacting the receiver.',
          'Make urgency clear; use the local escalation pathway when needed.',
        ],
      },
      {
        title: 'B / Background',
        lines: [
          'Give the relevant reason for care and brief clinical context.',
          'Include pertinent history, medicines, allergies and recent changes.',
          'Select information that helps the receiver understand the concern.',
        ],
      },
      {
        title: 'A / Assessment',
        lines: [
          'Describe current findings, trends and actions already taken.',
          'Explain your interpretation and any uncertainty.',
          'Separate observed facts from suspected causes.',
        ],
      },
      {
        title: 'R / Recommendation or request',
        lines: [
          'State the specific review, decision or action you need and when.',
          'Confirm who will do what and the follow-up plan.',
          'Invite questions and confirm shared understanding.',
        ],
      },
    ],
  },
  {
    id: 'exam-documentation',
    title: 'Examination documentation guide',
    description:
      'Capture examination scope and findings without assuming normality.',
    source: {
      title: 'Clinical Methods: The Physical Examination',
      url: 'https://www.ncbi.nlm.nih.gov/books/NBK361/',
    },
    sections: [
      {
        title: 'Before the examination',
        lines: [
          'Select components relevant to the history and current concern.',
          'Explain the examination; obtain appropriate consent.',
          'Record chaperone involvement and examination limitations when relevant.',
        ],
      },
      {
        title: 'Objective findings',
        lines: [
          'Vitals: include units, time and relevant measurement conditions.',
          'Describe observed findings, location, side and extent.',
          'Distinguish the patient report from what you directly observed.',
        ],
      },
      {
        title: 'Status and limitations',
        lines: [
          'Performed; not performed; deferred; unable; declined.',
          'Record relevant reasons, tolerance and factors limiting interpretation.',
          'Do not translate an unperformed component into a normal finding.',
        ],
      },
      {
        title: 'Connect findings to assessment',
        lines: [
          'Record relevant positive and negative findings.',
          'Note changes from prior examinations when comparison is available.',
          'Identify findings needing clarification or supervisor review.',
        ],
      },
    ],
  },
  {
    id: 'differential-reasoning',
    title: 'Differential reasoning worksheet',
    description:
      'Organize possibilities, supporting evidence and unresolved questions.',
    source: {
      title: 'MedlinePlus: Differential Diagnosis',
      url: 'https://medlineplus.gov/lab-tests/differential-diagnosis/',
    },
    sections: [
      {
        title: 'Define the problem',
        lines: [
          'Summarize the chief concern, time course and relevant context.',
          'Identify key positive findings and meaningful negative findings.',
          'Note missing or uncertain information.',
        ],
      },
      {
        title: 'Generate possibilities',
        lines: [
          'List common explanations that fit the presentation.',
          'Include important alternatives that need timely consideration.',
          'Avoid treating a template reminder as a confirmed diagnosis.',
        ],
      },
      {
        title: 'Compare the evidence',
        lines: [
          'For each possibility: supporting findings and opposing findings.',
          'Identify history or exam details that would help distinguish causes.',
          'Reassess assumptions when new information does not fit.',
        ],
      },
      {
        title: 'Document the next step',
        lines: [
          'Record working diagnosis, uncertainty and remaining alternatives.',
          'Discuss appropriate further evaluation with the supervising clinician.',
          'Document follow-up, pending results and responsibility for review.',
        ],
      },
    ],
  },
  {
    id: 'lab-values', title: 'Fishbones & lab values',
    description: 'Adult CBC, BMP/CMP, electrolytes, and coagulation at a glance.',
    layout: 'labs',
    source: { title: 'MedlinePlus: comprehensive metabolic panel', url: 'https://medlineplus.gov/ency/article/003468.htm' },
    additionalSources: [
      { title: 'MedlinePlus: CBC', url: 'https://medlineplus.gov/ency/article/003642.htm' },
      { title: 'MedlinePlus: platelets', url: 'https://medlineplus.gov/ency/article/003647.htm' },
      { title: 'MedlinePlus: magnesium', url: 'https://medlineplus.gov/ency/article/003487.htm' },
      { title: 'MedlinePlus: phosphorus', url: 'https://medlineplus.gov/ency/article/003478.htm' },
      { title: 'MedlinePlus: PT / INR', url: 'https://medlineplus.gov/ency/article/003652.htm' },
      { title: 'MedlinePlus: PTT', url: 'https://medlineplus.gov/ency/article/003653.htm' },
    ],
    sections: [
      { title: 'CBC', lines: [
        'WBC | 4.5-11.0 x10^3/mcL', 'Platelets (Plt) | 150-400 x10^3/mcL',
        'Hemoglobin (Hgb) | F 12-16; M 13-18 g/dL', 'Hematocrit (Hct) | F 36-48; M 40-55 %',
        'RBC | F 4.2-5.4; M 4.6-6.2 x10^6/mcL', 'MCV | 80-100 fL',
        'MCH | 27-32 pg/cell', 'MCHC | 32-36 g/dL',
      ] },
      { title: 'BMP / chemistry', lines: [
        'Sodium (Na) | 135-145 mEq/L', 'Potassium (K) | 3.7-5.2 mEq/L',
        'Chloride (Cl) | 96-106 mEq/L', 'Total CO2 | 23-29 mEq/L',
        'BUN | 6-20 mg/dL', 'Creatinine (Cr) | 0.6-1.3 mg/dL',
        'Glucose, fasting | 70-100 mg/dL', 'Calcium, total | 8.5-10.2 mg/dL',
      ] },
      { title: 'CMP = BMP + these 6 tests', lines: [
        'Albumin | 3.4-5.4 g/dL', 'Total protein | 6.0-8.3 g/dL',
        'ALP | 20-130 U/L', 'ALT | 4-36 U/L', 'AST | 8-33 U/L',
        'Bilirubin, total | 0.1-1.2 mg/dL',
      ] },
      { title: 'Common add-ons (not in CMP)', lines: [
        'Magnesium | 1.7-2.2 mg/dL', 'Phosphorus | 2.8-4.5 mg/dL',
        'PT | 11-13.5 seconds', 'INR | 0.8-1.1 (unitless)', 'PTT | 25-35 seconds',
      ] },
    ],
  },

];

const pairPrompts = (value: string) => {
  const labels = value.split('|').slice(0, 10);
  return Array.from({ length: 5 }, (_, index) =>
    `Ask: ${labels[index * 2]}; ${labels[index * 2 + 1]}.`,
  );
};

const systemReferenceSheets: ReferenceSheet[] = systems.map((system) => {
  const detail = generalDetails[system.id];
  const relatedRos = relatedRosBySystem[system.id];
  if (!detail || !relatedRos) throw new Error(`Missing system reference: ${system.id}`);
  const exams = detail[2].split('|');
  const extraExam = system.exam.find((item) => !exams.includes(item));
  return {
    id: `system-${system.id}`,
    title: `${system.name} H&P`,
    description: 'High-yield HPI, cross-system ROS, and focused exam bullets.',
    source: system.sources[0],
    additionalSources: system.sources.slice(1),
    sections: [
      { title: 'High-yield HPI questions', lines: pairPrompts(detail[0]) },
      { title: 'Related ROS / other systems', lines: relatedRos },
      { title: 'Focused physical examination', lines: [...exams, extraExam || system.exam[0]] },
    ],
  };
});

export const referenceSheets: ReferenceSheet[] = [
  ...coreReferenceSheets,
  ...systemReferenceSheets,
];
export async function buildReferencePdf(
  sheet: ReferenceSheet,
  paper: 'US Letter' | 'A4',
): Promise<PdfResult> {
  const doc = await PDFDocument.create(),
    regular = await doc.embedFont(StandardFonts.Helvetica),
    bold = await doc.embedFont(StandardFonts.HelveticaBold);
  const [width, height] = paper === 'A4' ? [595.28, 841.89] : [612, 792];
  const ops: DrawOp[] = [];
  const text = (value: string, x: number, y: number, size = 10, b = false) =>
    ops.push({
      kind: 'text',
      text: value,
      x,
      y,
      size,
      bold: b,
      color: b ? '#284f3e' : '#394a40',
    });
  const line = (y: number) =>
    ops.push({
      kind: 'line',
      x: 42,
      y,
      x2: width - 42,
      y2: y,
      color: '#cbd2c6',
      width: 0.6,
    });
  text('FOLIO / REFERENCE SHEETS', 42, 36, 8, true);
  text(sheet.title, 42, 74, 23, true);
  text(sheet.description, 42, 97, 9);
  line(113);
  if (sheet.layout === 'labs') {
    const segment = (x: number, y: number, x2: number, y2: number) =>
      ops.push({ kind: 'line', x, y, x2, y2, color: '#284f3e', width: 1 });
    text('COMMON FISHBONE SHORTHAND', 42, 133, 9, true);
    text('CBC', 42, 153, 9, true);
    text('WBC', 47, 190, 10, true); text('Hgb', 113, 176, 10, true);
    text('Hct', 115, 207, 10, true); text('Plt', 182, 190, 10, true);
    segment(88, 162, 101, 186); segment(101, 186, 88, 213);
    segment(101, 186, 164, 186);
    segment(178, 162, 164, 186); segment(164, 186, 178, 213);
    const x = width / 2;
    text('CHEM 7', x, 153, 9, true);
    ['Na', 'Cl', 'BUN'].forEach((label, i) => text(label, x + i * 51 + 9, 176, 10, true));
    ['K', 'CO2', 'Cr'].forEach((label, i) => text(label, x + i * 51 + 9, 207, 10, true));
    segment(x, 186, x + 152, 186);
    [48, 99].forEach(dx => segment(x + dx, 160, x + dx, 214));
    segment(x + 152, 160, x + 171, 186); segment(x + 171, 186, x + 152, 214);
    text('Glucose', x + 176, 190, 9, true);
    text('Replace labels with results; record units and collection time. Layouts vary by institution.', 42, 234, 8);
    text('Chem 7 omits calcium. BMP adds calcium; CMP adds the six tests listed below.', 42, 248, 8);
    text('CO2 is serum total CO2 (mainly bicarbonate), not blood-gas PaCO2.', 42, 262, 8);
    line(274);
    const columnWidth = (width - 104) / 2;
    sheet.sections.forEach((section, index) => {
      const left = index % 2 === 0 ? 42 : 62 + columnWidth;
      let rowY = index < 2 ? 296 : 477;
      text(section.title.toUpperCase(), left, rowY, 9, true);
      rowY += 23;
      for (const value of section.lines) { text(value, left, rowY, 8.3); rowY += 17; }
    });
    text('Adult examples only; use the reporting laboratory interval. Not pediatric or pregnancy ranges.', 42, 625, 8, true);
    text('F/M = source female/male intervals; age, hormones, altitude and assay can affect results.', 42, 639, 8);
    text('PT/INR/PTT intervals assume no anticoagulation; these are not treatment targets.', 42, 653, 8);
    text('mcL = microliter. Ranges are not diagnostic cutoffs or critical-value thresholds.', 42, 667, 8);
    text('Sources: MedlinePlus (accessed 14 Sep 2026). Article IDs at medlineplus.gov/ency/article/', 42, height - 104, 7);
    text('CBC 003642; Plt 003647; Mg 003487; phosphorus 003478; PT/INR 003652; PTT 003653 (.htm).', 42, height - 92, 7);
  } else {
  let y = 146;
  for (const section of sheet.sections) {
    text(section.title.toUpperCase(), 42, y, 10, true);
    y += 25;
    for (const value of section.lines) {
      text(value, 42, y, 10);
      y += 21;
    }
    y += 26;
  }
  text('Notes / questions', 42, y, 10, true);
  line(y + 28);
  line(y + 51);
  }
  if (sheet.layout !== 'labs') text(
    'Educational reference. Adapt to the encounter, supervision, and local policies.',
    42,
    height - 90,
    8,
  );
  text(sheet.source.title, 42, height - 70, 7, true);
  text(sheet.source.url, 42, height - 57, 6.5);
  line(height - 47);
  text(pdfNotice[0], 42, height - 36, 6);
  text(pdfNotice[1], 42, height - 25, 6);
  const page = doc.addPage([width, height]);
  for (const op of ops) {
    if (op.kind === 'text') {
      const font = op.bold ? bold : regular;
      if (font.widthOfTextAtSize(op.text, op.size) > width - 42 - op.x)
        throw new Error('Reference text exceeds page width');
      page.drawText(op.text, {
        x: op.x,
        y: height - op.y,
        size: op.size,
        font,
        color: rgb(0.16, 0.25, 0.2),
      });
    } else if (op.kind === 'line')
      page.drawLine({
        start: { x: op.x, y: height - op.y },
        end: { x: op.x2, y: height - op.y2 },
        thickness: op.width,
        color: rgb(0.79, 0.82, 0.77),
      });
  }
  doc.setTitle(sheet.title);
  return {
    bytes: await doc.save(),
    pages: [{ width, height, title: sheet.title, ops }],
    filename: `folio-reference-${sheet.id}-${paper === 'A4' ? 'a4' : 'letter'}.pdf`,
  };
}
