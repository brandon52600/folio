import { useEffect, useRef, useState } from 'react';
import { X, ZoomIn, ZoomOut } from 'lucide-react';
import { paintPreview, type PdfResult } from './pdf';
export type QuickLookDocument = {
  title: string;
  load: () => Promise<PdfResult>;
};
export default function QuickLook({
  document: entry,
  onClose,
}: {
  document: QuickLookDocument;
  onClose: () => void;
}) {
  const dialog = useRef<HTMLDialogElement>(null),
    canvas = useRef<HTMLCanvasElement>(null),
    viewport = useRef<HTMLDivElement>(null);
  const [pdf, setPdf] = useState<PdfResult | null>(null),
    [error, setError] = useState(''),
    [page, setPage] = useState(0),
    [zoom, setZoom] = useState(100),
    [available, setAvailable] = useState(600);
  useEffect(() => {
    const d = dialog.current!;
    const previous = document.activeElement as HTMLElement | null;
    d.showModal();
    const overflow = document.body.style.overflow;
    document.body.style.overflow = 'hidden';
    let active = true;
    entry
      .load()
      .then((p) => {
        if (active) setPdf(p);
      })
      .catch(() => {
        if (active)
          setError(
            'Could not load this preview. Close Quick Look and try again.',
          );
      });
    return () => {
      active = false;
      d.close();
      document.body.style.overflow = overflow;
      previous?.focus();
    };
  }, [entry]);
  useEffect(() => {
    if (!viewport.current) return;
    const node = viewport.current;
    const observer = new ResizeObserver(() =>
      setAvailable(node.clientWidth - 32),
    );
    observer.observe(node);
    return () => observer.disconnect();
  }, []);
  useEffect(() => {
    if (pdf && canvas.current)
      paintPreview(
        canvas.current,
        pdf.pages[page],
        Math.max(2, (zoom / 100) * 2),
      );
    viewport.current?.scrollTo({ top: 0, left: 0 });
  }, [pdf, page, zoom]);
  const width = pdf
    ? (Math.min(pdf.pages[page].width, Math.max(200, available)) * zoom) / 100
    : 0;
  return (
    <dialog
      className="quick-look"
      ref={dialog}
      aria-labelledby="quick-look-title"
      onCancel={(e) => {
        e.preventDefault();
        onClose();
      }}
      onClick={(e) => {
        if (e.target === dialog.current) {
          const r = dialog.current!.getBoundingClientRect();
          if (
            e.clientX < r.left ||
            e.clientX > r.right ||
            e.clientY < r.top ||
            e.clientY > r.bottom
          )
            onClose();
        }
      }}
    >
      <header className="quick-look-header">
        <div>
          <span className="eyebrow">QUICK LOOK</span>
          <h2 id="quick-look-title">{entry.title}</h2>
        </div>
        <button aria-label="Close Quick Look" onClick={onClose} autoFocus>
          <X size={22} />
        </button>
      </header>
      <div className="quick-look-controls">
        <button
          aria-label="Zoom out"
          disabled={zoom <= 50}
          onClick={() => setZoom((z) => Math.max(50, z - 25))}
        >
          <ZoomOut size={18} />
        </button>
        <output aria-label="Zoom level">{zoom}%</output>
        <button
          aria-label="Zoom in"
          disabled={zoom >= 300}
          onClick={() => setZoom((z) => Math.min(300, z + 25))}
        >
          <ZoomIn size={18} />
        </button>
        <button
          onClick={() => {
            setZoom(100);
            viewport.current?.scrollTo({ top: 0, left: 0 });
          }}
        >
          Fit width
        </button>
        {pdf && (
          <>
            <button
              aria-label="Previous Quick Look page"
              disabled={page === 0}
              onClick={() => setPage((p) => p - 1)}
            >
              ‹
            </button>
            <select
              aria-label="Quick Look page"
              value={page}
              onChange={(e) => setPage(Number(e.target.value))}
            >
              {pdf.pages.map((p, i) => (
                <option key={i} value={i}>
                  {i + 1} / {pdf.pages.length} — {p.title}
                </option>
              ))}
            </select>
            <button
              aria-label="Next Quick Look page"
              disabled={page === pdf.pages.length - 1}
              onClick={() => setPage((p) => p + 1)}
            >
              ›
            </button>
          </>
        )}
      </div>
      <div className="quick-look-viewport" ref={viewport}>
        {pdf ? (
          <canvas
            ref={canvas}
            role="img"
            aria-label={`${entry.title}, Quick Look page ${page + 1} of ${pdf.pages.length}`}
            style={{ width, height: 'auto' }}
          />
        ) : (
          <p role="status">{error || 'Preparing preview…'}</p>
        )}
      </div>
    </dialog>
  );
}
