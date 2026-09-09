import { pdfNotice } from './disclaimer.ts';
import { PDFDocument, StandardFonts, rgb } from './vendor/pdf-lib.js';
import type { PdfResult, DrawOp } from './pdf.ts';
export type ReferenceSheet = {
  id: string;
  title: string;
  description: string;
  sections: { title: string; lines: string[] }[];
  source: { title: string; url: string };
};
const interview = {
  title: 'Clinical Methods: The Medical Interview',
  url: 'https://www.ncbi.nlm.nih.gov/books/NBK349/',
};
export const referenceSheets: ReferenceSheet[] = [
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
  text(
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
      if (font.widthOfTextAtSize(op.text, op.size) > width - 84)
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
