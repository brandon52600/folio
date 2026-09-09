import { useEffect, useState } from 'react';
import { disclaimer } from './disclaimer';
type InstallEvent = Event & { prompt: () => Promise<void>; userChoice: Promise<{ outcome: string }> };
export default function AppInfo() {
  const [install, setInstall] = useState<InstallEvent | null>(null);
  const [waiting, setWaiting] = useState<ServiceWorker | null>(null);
  const [installed, setInstalled] = useState(false);
  const [offlineReady, setOfflineReady] = useState(false);
  const [status, setStatus] = useState('');
  useEffect(() => {
    setInstalled(matchMedia('(display-mode: standalone)').matches || Boolean((navigator as Navigator & {standalone?: boolean}).standalone));
    const prompt = (e: Event) => { e.preventDefault(); setInstall(e as InstallEvent); };
    const done = () => { setInstalled(true); setInstall(null); };
    window.addEventListener('beforeinstallprompt', prompt);
    window.addEventListener('appinstalled', done);
    let registration: ServiceWorkerRegistration | undefined;
    let active = true;
    let reloading = false;
    const changed = () => { if (!reloading) { reloading = true; location.reload(); } };
    const check = () => { if (!document.hidden) registration?.update().catch(() => {}); };
    if (import.meta.env.PROD && 'serviceWorker' in navigator) {
      navigator.serviceWorker.addEventListener('controllerchange', changed);
      navigator.serviceWorker.register(`${import.meta.env.BASE_URL}sw.js`, { scope: import.meta.env.BASE_URL }).then(reg => {
        if (!active) return;
        registration = reg;
        if (reg.waiting) setWaiting(reg.waiting);
        reg.addEventListener('updatefound', () => {
          const worker = reg.installing;
          worker?.addEventListener('statechange', () => {
            if (active && worker.state === 'installed' && navigator.serviceWorker.controller) setWaiting(worker);
          });
        });
        navigator.serviceWorker.ready.then(() => { if (active) setOfflineReady(true); });
      }).catch(() => { if (active) setStatus('Offline setup is unavailable. You can still use the app online.'); });
      document.addEventListener('visibilitychange', check);
    }
    return () => {
      active = false;
      window.removeEventListener('beforeinstallprompt', prompt);
      window.removeEventListener('appinstalled', done);
      navigator.serviceWorker?.removeEventListener('controllerchange', changed);
      document.removeEventListener('visibilitychange', check);
    };
  }, []);
  return <section className="app-info" aria-label="About, installation, and disclaimer">
    {waiting && <div className="app-update" role="status">An updated version of Folio is ready. <button onClick={() => waiting.postMessage({ type: 'SKIP_WAITING' })}>Update now</button></div>}
    <div className="install-row">
      <strong>{installed ? 'Folio is installed' : 'Use Folio as an app'}</strong>
      {install && !installed && <button onClick={async () => { try { await install.prompt(); await install.userChoice; setInstall(null); } catch { setStatus('Use your browser menu to install Folio.'); } }}>Install app</button>}
      <span>{offlineReady ? 'Ready for offline use' : 'Open online once to prepare offline use'}</span>
    </div>
    {status && <p role="status">{status}</p>}
    <details><summary>Installation instructions</summary>
      <p>iPhone or iPad: open Folio in Safari, choose Share, then Add to Home Screen. On Android, use your browser menu and choose Install app or Add to Home screen. On a computer, use the install icon or app installation option in your browser.</p>
      <p>Open the app online once before using it offline. Templates, reference sheets, previews, and PDF exports work offline after setup. Downloaded PDFs stay in your device’s chosen download location.</p>
    </details>
    <details><summary>About Folio, privacy, and sources</summary>
      <p>Folio provides 321 blank clinical templates and six reference sheets. It has no login, AI generation, patient note entry, analytics, or advertising. The app caches its own files on your device for offline use. The website host may keep standard request logs. Source links open external websites with their own policies.</p>
      <p>Templates and references include source links. Content is not a validated clinical protocol and may not reflect current guidance. Previously saved AI templates are no longer loaded; any old browser data remains local.</p>
    </details>
    <details open><summary>Educational use and limitation of liability</summary><p>{disclaimer}</p></details>
  </section>;
}
