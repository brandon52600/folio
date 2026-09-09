import { pdfNotice } from './disclaimer.ts';
import { groupsFor, exposuresFor } from './subjectiveApplicability.ts';
import {
  hpiGroups,
  exposureFields,
  additionalHpiFields,
  complaintHpi,
  allergyTypes,
} from './subjective.ts';
import { PDFDocument, StandardFonts, rgb } from './vendor/pdf-lib.js';
import {
  getSystem,
  differentialsFor,
  hpiFor,
  sourcesFor,
  reviewFor,
  questionsFor,
  symptomsFor,
  examsFor,
  type Outline,
} from './catalog.ts';
export type PdfOptions = { paper: 'US Letter' | 'A4'; extra: boolean };
export type DrawOp =
  | {
      kind: 'text';
      x: number;
      y: number;
      text: string;
      size: number;
      bold: boolean;
      color: string;
    }
  | {
      kind: 'line';
      x: number;
      y: number;
      x2: number;
      y2: number;
      color: string;
      width: number;
    }
  | { kind: 'box'; x: number; y: number; w: number; h: number; color: string };
export type PagePlan = {
  width: number;
  height: number;
  ops: DrawOp[];
  title: string;
};
export type PdfResult = {
  bytes: Uint8Array;
  pages: PagePlan[];
  filename: string;
};
const ink = '#283c31',
  muted = '#75816d',
  rule = '#cbd2c6',
  accent = '#3f674b';
const clean = (s: string) =>
  s
    .replace(/[–—−]/g, '-')
    .replace(/[‘’]/g, "'")
    .replace(/[“”]/g, '"')
    .replace(/[^\x20-\x7e]/g, '');
function color(hex: string) {
  return rgb(
    parseInt(hex.slice(1, 3), 16) / 255,
    parseInt(hex.slice(3, 5), 16) / 255,
    parseInt(hex.slice(5, 7), 16) / 255,
  );
}
export async function buildPdf(
  outline: Outline,
  options: PdfOptions,
): Promise<PdfResult> {
  const doc = await PDFDocument.create();
  const regular = await doc.embedFont(StandardFonts.Helvetica),
    bold = await doc.embedFont(StandardFonts.HelveticaBold);
  const [width, height] =
    options.paper === 'A4' ? [595.28, 841.89] : [612, 792];
  const margin = 42,
    usable = width - margin * 2;
  const plans: PagePlan[] = [];
  let plan: PagePlan;
  doc.setTitle(`${outline.title} - blank encounter template`);
  doc.setAuthor('Folio Template Studio');
  doc.setSubject('Unreviewed educational outline; blank writing template');
  doc.setCreator('Folio - local PDF generator');
  function text(
    value: string,
    x: number,
    y: number,
    size = 9,
    b = false,
    c = ink,
  ) {
    value = clean(value);
    const font = b ? bold : regular;
    if (
      x < margin - 1 ||
      x + font.widthOfTextAtSize(value, size) > width - margin + 1 ||
      y < 25 ||
      y > height - 24
    )
      throw Error(`Layout bounds exceeded: ${outline.id} / ${value}`);
    plan.ops.push({ kind: 'text', x, y, text: value, size, bold: b, color: c });
  }
  function line(x: number, y: number, x2: number, y2 = y, c = rule, w = 0.45) {
    plan.ops.push({ kind: 'line', x, y, x2, y2, color: c, width: w });
  }
  function box(x: number, y: number, w = 6, h = 6) {
    plan.ops.push({ kind: 'box', x, y, w, h, color: muted });
  }
  function wrap(value: string, max: number, size = 9, b = false) {
    const font = b ? bold : regular;
    const lines: string[] = [];
    let row = '';
    for (const word of clean(value).split(/\s+/)) {
      const next = row ? row + ' ' + word : word;
      if (font.widthOfTextAtSize(next, size) > max && row) {
        lines.push(row);
        row = word;
      } else row = next;
    }
    if (row) lines.push(row);
    return lines;
  }
  function paragraph(
    value: string,
    x: number,
    y: number,
    max = usable,
    size = 9,
    b = false,
    c = ink,
  ) {
    const lines = wrap(value, max, size, b);
    lines.forEach((v, i) => text(v, x, y + i * (size + 4), size, b, c));
    return y + lines.length * (size + 4);
  }
  function heading(label: string, y: number) {
    text(label.toUpperCase(), margin, y, 9, true, accent);
    line(margin, y + 9, width - margin);
    return y + 28;
  }
  function writing(
    y: number,
    count: number,
    spacing = 19,
    x = margin,
    w = usable,
  ) {
    for (let i = 0; i < count; i++) line(x, y + i * spacing, x + w);
  }
  function page(title: string) {
    plan = { width, height, ops: [], title };
    plans.push(plan);
    text('FOLIO / ENCOUNTER OUTLINE', margin, 37, 8, true, accent);
    text(
      (outline.specialty || getSystem(outline).name).toUpperCase(),
      margin,
      59,
      8,
      false,
      muted,
    );
    paragraph(
      outline.title,
      margin,
      88,
      usable,
      outline.generated
        ? Math.min(
            23,
            (23 * usable) / bold.widthOfTextAtSize(clean(outline.title), 23),
          )
        : 23,
      true,
    );
    text(title, margin, 113, 9, false, muted);
    line(margin, 126, width - margin, 126, accent, 0.8);
  }
  function shortField(label: string, top: number, x = margin, w = usable) {
    text(
      label,
      x,
      top,
      outline.generated
        ? Math.min(8, (8 * w) / bold.widthOfTextAtSize(clean(label), 8))
        : 8,
      true,
      muted,
    );
    writing(top + 18, 1, 19, x, w);
  }
  function symptomTable(label: string, items: string[], top: number) {
    let yy = heading(label, top);
    text(
      'P = present   D = denied   U = unknown   N = not assessed; leave unanswered items blank.',
      margin,
      yy,
      7.5,
      false,
      muted,
    );
    yy += 22;
    const cw = (usable - 22) / 2,
      rows = Math.ceil(items.length / 2);
    for (let c = 0; c < 2; c++) {
      const x = margin + c * (cw + 22);
      text('SYMPTOM', x, yy, 7, true, muted);
      ['P', 'D', 'U', 'N'].forEach((v, i) =>
        text(v, x + cw - 65 + i * 17, yy, 7, true, muted),
      );
      for (let r = 0; r < rows; r++) {
        const symptom = items[c * rows + r];
        if (!symptom) continue;
        const top = yy + 20 + r * 23;
        paragraph(symptom, x, top, cw - 77, 8.5);
        for (let k = 0; k < 4; k++) box(x + cw - 65 + k * 17, top - 6);
        line(x, top + 9, x + cw);
      }
    }
    return yy + rows * 23 + 38;
  }
  page('01 / Subjective - identifiers, CC, and HPI');
  const col = (usable - 20) / 2;
  shortField('Patient name', 151, margin, usable * 0.48);
  shortField('Age', 151, margin + usable * 0.52, usable * 0.18);
  shortField('Gender', 151, margin + usable * 0.74, usable * 0.26);
  shortField(
    outline.kind === 'specialty'
      ? 'CC / Visit reason / concerns (patient wording)'
      : 'CC / Chief complaint (patient wording)',
    194,
  );
  text(
    'Complete each section if applicable; leave unrelated fields blank.',
    margin, 224, 7.5, false, muted,
  );
  let y = heading(
    outline.kind === 'specialty'
      ? 'HPI / history parameters (if applicable)'
      : 'HPI / history parameters (if applicable)',
    237,
  );
  groupsFor(outline).forEach((group, i) => {
    const top = y + i * 44;
    text(group.label, margin, top, 8.5, true, accent);
    const fw = (usable - 24) / 3;
    group.fields.forEach((label, j) => {
      const x = margin + j * (fw + 12);
      text(label, x, top + 14, 7.4, false, muted);
      writing(top + 29, 1, 19, x, fw);
    });
  });
  page(
    outline.kind === 'specialty'
      ? '02 / General visit - exposures and specialty history'
      : '02 / HPI - relevant context and complaint-specific details',
  );
  y = heading('Context / exposures (if applicable)', 150);
  exposuresFor(outline).forEach((label, i) =>
    shortField(
      label,
      y + Math.floor(i / 2) * 33,
      margin + (i % 2) * (col + 20),
      col,
    ),
  );
  y = heading(
    outline.kind === 'specialty'
      ? 'General visit / specialty history'
      : 'Complaint-specific HPI details',
    y + 117,
  );
  hpiFor(outline).forEach((label, i) =>
    shortField(
      label,
      y + Math.floor(i / 2) * 33,
      margin + (i % 2) * (col + 20),
      col,
    ),
  );
  y = heading('Additional HPI context', y + 216);
  additionalHpiFields.forEach((label, i) =>
    shortField(
      label,
      y + Math.floor(i / 2) * 33,
      margin + (i % 2) * (col + 20),
      col,
    ),
  );
  page('03 / Subjective - symptoms, ROS, and medicines');
  y = symptomTable(
    outline.kind === 'specialty'
      ? 'Associated symptoms / specialty review'
      : 'Associated symptoms / relevant ROS',
    outline.ros,
    150,
  );
  const associated = new Set(outline.ros);
  const additionalReview = reviewFor(outline).filter((item) => !associated.has(item));
  if (additionalReview.length) y = symptomTable(
    'ROS / additional relevant system review', additionalReview, y,
  );
  y = heading('Meds / current medications', y + 3);
  paragraph(
    'Record name, dose, route, frequency, reason, benefit, side effects, and adherence. Include nonprescription medicines.',
    margin,
    y,
    usable,
    8,
    false,
    muted,
  );
  y += 32;
  for (let i = 0; i < 3; i++) {
    text(
      `${i + 1}. Name _____________________ Dose __________ Route _______ Frequency ______________`,
      margin,
      y,
      8,
      false,
      muted,
    );
    text(
      'Reason _____________________ Side effects __________________ Adherence ______________',
      margin,
      y + 17,
      8,
      false,
      muted,
    );
    y += 35;
  }
  y = heading('Supplements', y + 5);
  paragraph(
    'Name / dose / frequency / reason / effects (vitamins, herbals, and other products).',
    margin,
    y,
    usable,
    8,
    false,
    muted,
  );
  writing(y + 25, 2, 24);
  page('04 / Subjective - allergies and background histories');
  y = heading('Allergies / four categories', 150);
  text(
    'For each: allergen, reaction, severity, timing, and source. Distinguish none, unknown, and not assessed.',
    margin,
    y,
    7.5,
    false,
    muted,
  );
  y += 25;
  allergyTypes.forEach((label) => {
    shortField(label, y);
    y += 28;
  });
  y = heading('PMH / past medical history', y + 7);
  text(
    'Conditions, relevant dates, hospitalizations, current control, and prior evaluations.',
    margin,
    y,
    8,
    false,
    muted,
  );
  writing(y + 19, 1);
  y += 39;
  y = heading('PSH / past surgical history', y);
  text(
    'Procedure, date, indication, complications, and recovery.',
    margin,
    y,
    8,
    false,
    muted,
  );
  writing(y + 19, 1);
  y += 39;
  y = heading('FH / family history', y);
  text(
    'Relative, condition, age at onset, and relevant familial risks.',
    margin,
    y,
    8,
    false,
    muted,
  );
  writing(y + 19, 1);
  y += 39;
  y = heading('SH / social history', y);
  const social = [
    'Tobacco / type, amount, duration, quit history',
    'Alcohol / type, amount, pattern',
    'Drugs / type, route, frequency',
    'Caffeine / amount and timing',
    'Diet / intake, restrictions, food access',
    'Exercise / type, frequency, limitations',
    'Marital / relationship status',
    'Occupation / exposures',
    'Living situation / household, support, safety',
    'Stress / stressors and coping',
    'Sleep / duration, quality, schedule',
    'Sex / activity, partners, protection, concerns',
    'Hobbies / activities and exposures',
  ];
  social.forEach((label, i) =>
    shortField(
      label,
      y + Math.floor(i / 2) * 27,
      margin + (i % 2) * (col + 20),
      col,
    ),
  );
  page('05 / Objective - examination and findings');
  shortField(
    'Vitals / BP, HR, RR, temperature, SpO2, weight (include units)',
    151,
  );
  y = heading('Physical examination / tailored components', 195);
  text(
    'P = performed   N = not performed   D = deferred   U = unable; never assume normal findings.',
    margin,
    y,
    7.5,
    false,
    muted,
  );
  y += 22;
  examsFor(outline).forEach((e, i) => {
    const end = paragraph(`${i + 1}. ${e}`, margin, y, usable - 86, 8.5);
    ['P', 'N', 'D', 'U'].forEach((v, k) => {
      const x = width - margin - 72 + k * 19;
      box(x, y - 6, 5, 5);
      text(v, x + 7, y, 6.5, false, muted);
    });
    writing(end + 7, 1);
    y = end + 20;
  });
  shortField(
    'Consent / chaperone / declined components / available test results',
    y + 2,
  );
  heading('Additional objective findings', y + 48);
  writing(y + 82, 4, 24);
  page('06 / Assessment and plan');
  const broad = outline.kind === 'general' || outline.kind === 'specialty';
  y = heading(
    broad
      ? 'Possible medical diagnoses / general review'
      : 'Possible medical diagnoses / differential',
    150,
  );
  y =
    paragraph(
      'Possibilities to consider, not confirmed diagnoses or a likelihood ranking. Match to age, history, exam, and testing. Not exhaustive.',
      margin,
      y,
      usable,
      8,
      false,
      muted,
    ) + 14;
  text(
    '! = time-sensitive alternative when clinically suspected. Blank box = considered.',
    margin,
    y,
    8,
    false,
    muted,
  );
  y += 24;
  for (const diagnosis of differentialsFor(outline)) {
    box(margin, y - 7, 7, 7);
    y =
      paragraph(
        diagnosis.startsWith('!') ? '! ' + diagnosis.slice(1) : diagnosis,
        margin + 17,
        y,
        usable - 17,
        10,
        false,
        diagnosis.startsWith('!') ? accent : muted,
      ) + 15;
  }
  y = heading(
    'Assessment / summary, problems, differential, reasoning',
    y + 12,
  );
  writing(y + 12, 2, 22);
  y += 64;
  shortField('Other diagnoses / supporting or opposing findings', y + 4);
  y = heading(
    'Plan / proposed actions, completed actions, supervisor questions',
    y + 55,
  );
  writing(y + 12, 3, 23);
  let sy = height - 93;
  sy = paragraph(
    'Unreviewed educational outline. Not a complete assessment or treatment protocol. Use qualified supervision and local policies; intimate examinations require indication and consent.',
    margin,
    sy,
    usable,
    6.5,
    false,
    muted,
  );
  paragraph(
    sourcesFor(outline)[0]
      ? `Background: ${sourcesFor(outline)[0].url}`
      : 'AI-generated draft / no independently verified references',
    margin,
    sy + 3,
    usable,
    6,
    false,
    muted,
  );
  if (options.extra) {
    page('07 / Additional writing space');
    text(
      'Additional findings, reasoning, or supervisor feedback.',
      margin,
      150,
      9,
      false,
      muted,
    );
    writing(179, Math.floor((height - 230) / 22), 22);
  }
  plans.forEach((p, index) => {
    plan = p;
    line(margin, height - 49, width - margin, height - 49);
    text(
      pdfNotice[0],
      margin,
      height - 37,
      6,
      false,
      muted,
    );
    text(
      `${index + 1} / ${plans.length}`,
      width - margin - 24,
      height - 37,
      7,
      false,
      muted,
    );
    text(pdfNotice[1], margin, height - 26, 6, false, muted);
    const pdfPage = doc.addPage([width, height]);
    for (const op of p.ops) {
      if (op.kind === 'text')
        pdfPage.drawText(op.text, {
          x: op.x,
          y: height - op.y,
          size: op.size,
          font: op.bold ? bold : regular,
          color: color(op.color),
        });
      else if (op.kind === 'line')
        pdfPage.drawLine({
          start: { x: op.x, y: height - op.y },
          end: { x: op.x2, y: height - op.y2 },
          color: color(op.color),
          thickness: op.width,
        });
      else
        pdfPage.drawRectangle({
          x: op.x,
          y: height - op.y - op.h,
          width: op.w,
          height: op.h,
          borderColor: color(op.color),
          borderWidth: 0.5,
        });
    }
  });
  return {
    bytes: await doc.save(),
    pages: plans,
    filename: `folio-${outline.id}-${options.paper === 'A4' ? 'a4' : 'letter'}${options.extra ? '-extra' : ''}.pdf`,
  };
}
export function paintPreview(
  canvas: HTMLCanvasElement,
  plan: PagePlan,
  scale = 2,
) {
  canvas.width = plan.width * scale;
  canvas.height = plan.height * scale;
  const ctx = canvas.getContext('2d');
  if (!ctx) return;
  ctx.scale(scale, scale);
  ctx.fillStyle = '#fff';
  ctx.fillRect(0, 0, plan.width, plan.height);
  for (const op of plan.ops) {
    ctx.strokeStyle = op.color;
    ctx.fillStyle = op.color;
    if (op.kind === 'text') {
      ctx.font = `${op.bold ? 'bold ' : ''}${op.size}px Arial, Helvetica, sans-serif`;
      ctx.fillText(op.text, op.x, op.y);
    } else if (op.kind === 'line') {
      ctx.lineWidth = op.width;
      ctx.beginPath();
      ctx.moveTo(op.x, op.y);
      ctx.lineTo(op.x2, op.y2);
      ctx.stroke();
    } else {
      ctx.lineWidth = 0.5;
      ctx.strokeRect(op.x, op.y, op.w, op.h);
    }
  }
}
