import QuickLook, { type QuickLookDocument } from './QuickLook';
import ReferenceLibrary from './ReferenceLibrary';
import AppInfo from './AppInfo';
import { useState, useEffect, useRef } from 'react';
import { buildPdf, paintPreview, type PdfResult } from './pdf';
import {
  Activity,
  Stethoscope,
  HeartPulse,
  Wind,
  Brain,
  Bone,
  Droplets,
  Baby,
  Eye,
  Ear,
  Flower2,
  ShieldPlus,
  Scissors,
  Microscope,
  Users,
  Hospital,
  Cross,
  Sparkles,
  Pill,
  HeartHandshake,
  Search,
  ArrowDownToLine,
  ArrowRight,
  BookOpen,
  Check,
  FileText,
  Layers,
  SlidersHorizontal,
  ChevronRight,
  Printer,
  Leaf,
} from 'lucide-react';
import {
  Select,
  SelectTrigger,
  SelectValue,
  SelectContent,
  SelectItem,
} from '@/components/ui/select';
import {
  systems,
  sourcesFor,
  matchesSpecialty,
  outlines,
  specialties,
  getSystem,
  questionsFor,
  symptomsFor,
  examsFor,
} from './catalog';
function Pick({
  label,
  value,
  options,
  onChange,
}: {
  label: string;
  value: string;
  options: string[];
  onChange: (v: string) => void;
}) {
  return (
    <Select value={value} onValueChange={(v) => v && onChange(v)}>
      <SelectTrigger aria-label={label}>
        <SelectValue />
      </SelectTrigger>
      <SelectContent>
        {options.map((v) => (
          <SelectItem key={v} value={v}>
            {v}
          </SelectItem>
        ))}
      </SelectContent>
    </Select>
  );
}

const specialtyIcons = [
  Layers,
  Users,
  Hospital,
  Cross,
  Stethoscope,
  HeartPulse,
  Wind,
  Scissors,
  Activity,
  Brain,
  Bone,
  ShieldPlus,
  Droplets,
  Droplets,
  Flower2,
  Pill,
  Sparkles,
  Ear,
  Eye,
  HeartHandshake,
  Baby,
  Microscope,
];
export default function App() {
  const [libraryOpen, setLibraryOpen] = useState(false);

  const [activeTab, setActiveTab] = useState('templates');
  const [quickLook, setQuickLook] = useState<QuickLookDocument | null>(null);
  function goHome() {
    setActiveTab('templates');

    setLibraryOpen(false);
    setSearch('');
    setSystem('all');
    setSpecialty('All specialties');
    window.scrollTo({ top: 0 });
  }
  const [system, setSystem] = useState('all'),
    [specialty, setSpecialty] = useState('All specialties'),
    [search, setSearch] = useState(''),
    [chosen, setChosen] = useState(
      outlines.find((o) => o.title === 'Chest pain')!.id,
    ),
    [paper, setPaper] = useState('US Letter'),
    [space, setSpace] = useState('Standard');
  const [pdf, setPdf] = useState<PdfResult | null>(null),
    [page, setPage] = useState(0),
    [error, setError] = useState(''),
    [downloading, setDownloading] = useState(false);
  const canvas = useRef<HTMLCanvasElement>(null);
  const request = useRef(0);
  useEffect(() => {
    const n = ++request.current;
    setPdf(null);
    setPage(0);
    setError('');
    buildPdf(
      outlines.find((o) => o.id === chosen)!,
      {
        paper: paper as 'US Letter' | 'A4',
        extra: space === 'Extra writing page',
      },
    )
      .then((p) => {
        if (n === request.current) setPdf(p);
      })
      .catch(() => {
        if (n === request.current)
          setError(
            'This PDF could not be prepared. Try another template or paper size.',
          );
      });
  }, [chosen, paper, space]);
  useEffect(() => {
    if (pdf && canvas.current) paintPreview(canvas.current, pdf.pages[page]);
  }, [pdf, page, libraryOpen]);
  function download() {
    if (!pdf) return;
    setDownloading(true);
    const blob = new Blob([pdf.bytes as BlobPart], { type: 'application/pdf' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = pdf.filename;
    document.body.appendChild(a);
    a.click();
    a.remove();
    setTimeout(() => {
      URL.revokeObjectURL(url);
      setDownloading(false);
    }, 1200);
  }
  function chooseSystem(id: string) {
    setLibraryOpen(true);
    setSystem(id);
    setSpecialty('All specialties');
    setSearch('');
    if (id !== 'all' && outlines.find((o) => o.id === chosen)?.system !== id)
      setChosen(outlines.find((o) => o.system === id)!.id);
  }
  function chooseSpecialty(value: string) {

    setLibraryOpen(true);
    setSpecialty(value);
    setSystem('all');
    setSearch('');
    if (value !== 'All specialties')
      setChosen(
        outlines.find((o) => o.specialty === value)?.id ||
          outlines.find((o) => matchesSpecialty(o, value))!.id,
      );
  }
  const selected = outlines.find((o) => o.id === chosen)!;
  const visible = outlines.filter(
    (o) =>
      (system === 'all' || o.system === system) &&
      matchesSpecialty(o, specialty) &&
      `${o.title} ${o.description} ${o.specialty || ''} ${getSystem(o).name}`
        .toLowerCase()
        .includes(search.toLowerCase()),
  );
  return (
    <div className="studio specialty-studio">
      {quickLook && (
        <QuickLook document={quickLook} onClose={() => setQuickLook(null)} />
      )}
      <div className="studio-work">
        <header className="studio-top">
          <span>
            <button className="home-link" onClick={goHome}>
              <Activity size={20} /> folio.
            </button>
            <ChevronRight size={13} />{' '}
            <strong>
              {activeTab === 'references'
                ? 'Reference sheets'
                : libraryOpen
                  ? 'Template library'
                  : 'Choose a specialty'}
            </strong>
          </span>
          <span className="offline-badge">
            <i /> LIBRARY AVAILABLE OFFLINE
          </span>
        </header>
        <nav
          className="workspace-tabs"
          role="tablist"
          aria-label="Workspace sections"
        >
          {['templates', 'references'].map((tab, i) => (
            <button
              key={tab}
              id={`tab-${tab}`}
              role="tab"
              aria-selected={activeTab === tab}
              aria-controls={`panel-${tab}`}
              tabIndex={activeTab === tab ? 0 : -1}
              onClick={() => setActiveTab(tab)}
              onKeyDown={(e) => {
                if (
                  ['ArrowLeft', 'ArrowRight', 'Home', 'End'].includes(e.key)
                ) {
                  e.preventDefault();
                  const next =
                    e.key === 'Home'
                      ? 'templates'
                      : e.key === 'End'
                        ? 'references'
                        : i === 0
                          ? 'references'
                          : 'templates';
                  setActiveTab(next);
                  document.getElementById(`tab-${next}`)?.focus();
                }
              }}
            >
              {tab === 'templates' ? 'Templates' : 'Reference sheets'}
            </button>
          ))}
        </nav>
        <main className="studio-main">
          <div
            id="panel-references"
            role="tabpanel"
            aria-labelledby="tab-references"
            hidden={activeTab !== 'references'}
          >
            {activeTab === 'references' && (
              <ReferenceLibrary onQuickLook={setQuickLook} />
            )}
          </div>
          <div
            id="panel-templates"
            role="tabpanel"
            aria-labelledby="tab-templates"
            hidden={activeTab !== 'templates'}
          >
            <div className="studio-hero">
              <div>
                <div className="eyebrow">LESS PREPARATION. MORE PRESENCE.</div>
                <h1>
                  A clear outline for
                  <br />
                  every encounter.
                </h1>
                <p>
                  Choose your specialty, or search for a complaint.
                  <br />
                  Print your template, or make it your own in your favorite
                  notes app.
                </p>
              </div>
              <div className="hero-stat">
                <BookOpen size={23} />
                <strong>{outlines.length}</strong>
                <span>
                  focused templates
                  <br />
                  across {systems.length} systems
                </span>
              </div>
            </div>
            <>
                <div className="library-toolbar">
                  <label className="search-wrap">
                    <Search size={17} />
                    <input
                      aria-label="Search chief complaints"
                      placeholder="Search a chief complaint, symptom, or specialty…"
                      value={search}
                      onChange={(e) => {
                        setSearch(e.target.value);
                        if (e.target.value.trim()) setLibraryOpen(true);
                      }}
                    />
                  </label>
                  {libraryOpen && (
                    <>
                      <button
                        className="home-link back-specialties"
                        onClick={goHome}
                      >
                        ← Specialties
                      </button>
                      <Pick
                        label="Specialty"
                        value={specialty}
                        options={specialties}
                        onChange={chooseSpecialty}
                      />
                      <Pick
                        label="System"
                        value={
                          systems.find((s) => s.id === system)?.name ||
                          'All systems'
                        }
                        options={['All systems', ...systems.map((s) => s.name)]}
                        onChange={(v) =>
                          chooseSystem(
                            systems.find((s) => s.name === v)?.id || 'all',
                          )
                        }
                      />
                    </>
                  )}
                </div>
                {!libraryOpen ? (
                  <section
                    aria-label="Choose a specialty"
                    className="specialty-landing"
                  >
                    <div className="library-heading">
                      <h2>Browse specialties</h2>
                      <span>
                        {specialties.length - 1} specialties · {outlines.length}{' '}
                        templates
                      </span>
                    </div>
                    <div className="specialty-grid">
                      {specialties.map((name, i) => {
                        const Icon = specialtyIcons[i] || Stethoscope;
                        const count = outlines.filter((o) =>
                          matchesSpecialty(o, name),
                        ).length;
                        return (
                          <button
                            className={
                              'specialty-tile ' +
                              (i === 0 ? 'all-specialties' : '')
                            }
                            key={name}
                            onClick={() => chooseSpecialty(name)}
                          >
                            <span className="specialty-icon">
                              <Icon
                                size={28}
                                strokeWidth={1.6}
                                aria-hidden="true"
                              />
                            </span>
                            <strong>{name}</strong>
                            <span>{count} templates</span>
                            <ArrowRight
                              className="tile-arrow"
                              size={16}
                              aria-hidden="true"
                            />
                          </button>
                        );
                      })}
                    </div>
                  </section>
                ) : (
                  <div className="studio-columns">
                    <section className="complaint-library">
                      <div className="library-heading">
                        <h2>
                          {system === 'all'
                            ? 'General & focused templates'
                            : systems.find((s) => s.id === system)?.name}
                        </h2>
                        <span>{visible.length} templates</span>
                      </div>
                      <div className="complaint-grid">
                        {visible.map((o) => (
                          <div className="document-card" key={o.id}>
                            <button
                              className={
                                'complaint-card ' +
                                (chosen === o.id ? 'chosen' : '')
                              }
                              key={o.id}
                              onClick={() => {
                                setChosen(o.id);
                                if (window.innerWidth < 761)
                                  document
                                    .getElementById('pdf-preview')
                                    ?.scrollIntoView({
                                      behavior: 'smooth',
                                      block: 'start',
                                    });
                              }}
                            >
                              <span className="card-system">
                                {o.generated
                                  ? 'AI-generated draft'
                                  : o.kind === 'general'
                                    ? 'General template'
                                    : o.specialty || getSystem(o).short}
                                {chosen === o.id && <Check size={14} />}
                              </span>
                              <h3>{o.title}</h3>
                              <p>{o.description}</p>
                              <span className="card-bottom">
                                {questionsFor(o).length} HPI items{' '}
                                <span>·</span> {symptomsFor(o).length} ROS
                                prompts <ArrowRight size={13} />
                              </span>
                            </button>
                            <button
                              className="quick-look-trigger"
                              aria-label={`Quick Look: ${o.title}`}
                              onClick={() =>
                                setQuickLook({
                                  title: o.title,
                                  load: () =>
                                    buildPdf(o, {
                                      paper: paper as 'US Letter' | 'A4',
                                      extra: space === 'Extra writing page',
                                    }),
                                })
                              }
                            >
                              <Eye size={15} /> Quick Look
                            </button>
                          </div>
                        ))}
                      </div>
                      {!visible.length && (
                        <div className="empty-library">
                          <Search />
                          <h3>No matching templates</h3>
                          <p>Try a broader complaint or another specialty.</p>
                          <button
                            onClick={() => {
                              setSearch('');
                              setSystem('all');
                              setSpecialty('All specialties');
                            }}
                          >
                            Reset filters
                          </button>
                        </div>
                      )}
                    </section>
                    <aside className="template-preview" id="pdf-preview">
                      <div className="preview-top">
                        <span>
                          <FileText size={16} /> YOUR TEMPLATE
                        </span>
                        <span>BLANK & READY TO USE</span>
                      </div>
                      <div className="preview-title">
                        <span className="eyebrow">
                          {getSystem(selected).name}
                        </span>
                        <h2>{selected.title}</h2>
                        <p>
                          {selected.kind === 'specialty'
                            ? 'General visit history'
                            : 'Focused history'}{' '}
                          · ROS · Examination · SOAP
                        </p>
                      </div>
                      <div className="export-options">
                        <label>
                          Paper size
                          <Pick
                            label="Paper size"
                            value={paper}
                            options={['US Letter', 'A4']}
                            onChange={setPaper}
                          />
                        </label>
                        <label>
                          Writing space
                          <Pick
                            label="Writing space"
                            value={space}
                            options={['Standard', 'Extra writing page']}
                            onChange={setSpace}
                          />
                        </label>
                      </div>
                      <button
                        className="download-button"
                        disabled={!pdf || downloading}
                        onClick={download}
                      >
                        <ArrowDownToLine size={18} />
                        {downloading ? 'PDF downloaded' : 'Download PDF'}
                        {pdf && ` · ${pdf.pages.length} pages`}
                      </button>
                      <p className="export-hint">
                        A real PDF, generated on your device. Import into a
                        notes app or print at 100% scale.
                      </p>
                      {pdf ? (
                        <>
                          <div className="preview-frame">
                            <canvas
                              ref={canvas}
                              className="preview-canvas"
                              role="img"
                              aria-label={`${selected.title}, page ${page + 1}: ${pdf.pages[page].title}`}
                            />
                          </div>
                          <div className="page-controls">
                            <button
                              aria-label="Previous preview page"
                              disabled={page === 0}
                              onClick={() => setPage(page - 1)}
                            >
                              ‹
                            </button>
                            <span>
                              Page {page + 1} of {pdf.pages.length}
                            </span>
                            <button
                              aria-label="Next preview page"
                              disabled={page === pdf.pages.length - 1}
                              onClick={() => setPage(page + 1)}
                            >
                              ›
                            </button>
                          </div>
                        </>
                      ) : (
                        <div className="preview-loading">
                          {error || 'Preparing your template…'}
                        </div>
                      )}
                      <div className="preview-stats">
                        <span>{questionsFor(selected).length} HPI items</span>
                        <span>{symptomsFor(selected).length} symptoms</span>
                        <span>{examsFor(selected).length} exam prompts</span>
                      </div>
                      <details className="review-status">
                        <summary>Clinical content & sources</summary>
                        <p>
                          Educational outlines awaiting clinician review. These
                          prompts are not a complete assessment or a validated
                          clinical protocol. Select examinations with your
                          supervisor; nothing is documented as performed.
                        </p>
                        {sourcesFor(selected).map((s) => (
                          <a
                            key={s.url}
                            href={s.url}
                            target="_blank"
                            rel="noreferrer"
                          >
                            {s.title} ↗
                          </a>
                        ))}
                      </details>
                    </aside>
                  </div>
                )}
              </>
          </div>
        </main>
        <AppInfo />
        <footer className="studio-footer">
          <span>Folio / thoughtfully structured, freely written.</span>
          <span>Blank templates only · no clinical data entry</span>
        </footer>
      </div>
    </div>
  );
}
