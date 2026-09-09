import type { QuickLookDocument } from './QuickLook';
import { useState, useEffect, useRef } from 'react';
import { BookOpen, Download } from 'lucide-react';
import { referenceSheets, buildReferencePdf } from './references';
import { paintPreview, type PdfResult } from './pdf';
export default function ReferenceLibrary({
  onQuickLook,
}: {
  onQuickLook: (document: QuickLookDocument) => void;
}) {
  const [selected, setSelected] = useState(referenceSheets[0]),
    [paper, setPaper] = useState<'US Letter' | 'A4'>('US Letter'),
    [pdf, setPdf] = useState<PdfResult | null>(null),
    [error, setError] = useState('');
  const canvas = useRef<HTMLCanvasElement>(null);
  useEffect(() => {
    let active = true;
    setPdf(null);
    setError('');
    buildReferencePdf(selected, paper)
      .then((p) => {
        if (active) setPdf(p);
      })
      .catch(() => {
        if (active) setError('Could not prepare this sheet. Try again.');
      });
    return () => {
      active = false;
    };
  }, [selected, paper]);
  useEffect(() => {
    if (pdf && canvas.current) paintPreview(canvas.current, pdf.pages[0]);
  }, [pdf]);
  function download() {
    if (!pdf) return;
    const url = URL.createObjectURL(
      new Blob([pdf.bytes as BlobPart], { type: 'application/pdf' }),
    );
    const a = document.createElement('a');
    a.href = url;
    a.download = pdf.filename;
    a.click();
    setTimeout(() => URL.revokeObjectURL(url), 1000);
  }
  return (
    <section>
      <div className="studio-hero">
        <div>
          <div className="eyebrow">KEEP THE ESSENTIALS CLOSE</div>
          <h1>Reference sheets</h1>
          <p>Quick guides to read, print, or keep in your notes app.</p>
        </div>
      </div>
      <div className="studio-columns">
        <div className="reference-grid">
          {referenceSheets.map((sheet) => (
            <div className="document-card" key={sheet.id}>
              <button
                key={sheet.id}
                aria-pressed={selected.id === sheet.id}
                className={
                  'specialty-tile ' +
                  (selected.id === sheet.id ? 'selected-reference' : '')
                }
                onClick={() => setSelected(sheet)}
              >
                <BookOpen size={25} />
                <strong>{sheet.title}</strong>
                <span>{sheet.description}</span>
                <span>1-page PDF</span>
              </button>
              <button
                className="quick-look-trigger"
                aria-label={`Quick Look: ${sheet.title}`}
                onClick={() =>
                  onQuickLook({
                    title: sheet.title,
                    load: () => buildReferencePdf(sheet, paper),
                  })
                }
              >
                Quick Look
              </button>
            </div>
          ))}
        </div>
        <aside className="template-preview">
          <div className="preview-title">
            <h2>{selected.title}</h2>
            <p>{selected.description}</p>
          </div>
          <label className="reference-paper">
            Paper size
            <select
              aria-label="Reference paper size"
              value={paper}
              onChange={(e) => setPaper(e.target.value as 'US Letter' | 'A4')}
            >
              <option>US Letter</option>
              <option>A4</option>
            </select>
          </label>
          <button
            className="download-button"
            onClick={download}
            disabled={!pdf}
          >
            <Download size={18} />
            Download reference PDF
          </button>
          {pdf ? (
            <div className="preview-frame">
              <canvas
                ref={canvas}
                role="img"
                className="preview-canvas"
                aria-label={`${selected.title} reference preview`}
              />
            </div>
          ) : (
            <p role="status">{error || 'Preparing sheet…'}</p>
          )}
          <p className="export-hint">
            Print or annotate outside the app. Available offline.
          </p>
          <a href={selected.source.url} target="_blank" rel="noreferrer">
            Source: {selected.source.title} ↗
          </a>
        </aside>
      </div>
    </section>
  );
}
