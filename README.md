# Folio

An installable, offline-capable library of 321 blank clinical templates and six reference sheets. Search by complaint or specialty, preview documents with Quick Look and zoom, and export Letter or A4 PDFs. Every template includes the full HPI outline marked “if applicable.”

No login, patient-note storage, AI creation, API key, or application backend is required.

## Run locally

Use Node.js 24 and pnpm 11.19.0. From this folder:

```sh
pnpm install --frozen-lockfile
pnpm check
pnpm test
pnpm build
pnpm start
```

Open http://127.0.0.1:5173/. `pnpm dev` is available for development; offline installation is tested against the production build. `pnpm exec playwright install chromium` installs the browser for `pnpm test:pwa` (start the preview server first). Optional `BROWSER_EXECUTABLE` and `PLAYWRIGHT_MODULE` environment variables support an existing local browser/runtime.

## Publish on GitHub Pages

This folder (`app`) is the repository root: upload its contents, not the parent folder containing local downloads and caches.

1. Create an empty GitHub repository and upload/push this folder’s source files, including `.github/workflows/pages.yml`. Do not upload `node_modules`, `.env` files, `dist`, `tmp`, or `output`.
2. Use `main` as the default branch. In repository Settings → Pages, choose **GitHub Actions** as the build source.
3. Push to `main` or run **Check and deploy Folio** from Actions. The workflow installs dependencies, checks types, tests every PDF, builds, checks the PWA, then publishes.
4. Open the HTTPS URL shown by the deployment. No secrets are required.

The workflow automatically handles `/repository-name/` URLs and `owner.github.io` roots. For a custom domain, set the Actions repository variable `BASE_PATH` to `/` and configure that domain in Pages settings. Enable HTTPS. For another static host, deploy `dist` after `pnpm build`.

To simulate a repository URL locally:

```sh
BASE_PATH=/folio/ pnpm build
BASE_PATH=/folio/ pnpm start
APP_URL=http://127.0.0.1:5173/folio/ pnpm test:pwa
```

On Windows, set these variables using your shell’s environment-variable syntax.

## Install and use offline

Open the site online once and wait for **Ready for offline use**. Use **Install app** when the browser offers it. On iPhone/iPad, use Safari → Share → Add to Home Screen. On Android, use the browser’s installation menu. The app includes installation instructions when a browser does not expose a direct prompt.

The manifest includes standard and maskable icons, an Apple touch icon, a scoped start URL, and standalone display mode. The service worker caches all app assets and handles offline navigation, including query-string URLs. Updates show **Update now** before activating a waiting version. Reloading applies an update; in-app selections may reset. PDFs already downloaded are unaffected.

## Privacy and educational use

Folio does not collect patient notes, require accounts, call an AI service, or include analytics. It caches its own files on the device. The host may retain ordinary request logs. External source links have their own policies. Older locally saved AI drafts are no longer loaded; they are not uploaded or deleted automatically.

Folio and its documents are guides/templates only, not medical advice or validated clinical protocols. Content may contain inaccuracies, omissions, or outdated information. Users must independently verify it against current authoritative sources, local policy, and professional judgment. To the fullest extent permitted by law, the creator and contributors disclaim warranties and liability for inaccuracies, omissions, or losses arising from use. Nothing excludes liability that cannot legally be excluded. The app displays this notice and every exported PDF includes a concise version. A disclaimer does not guarantee protection from legal claims.

Source links appear in templates and reference sheets. Review and update clinical content before relying on it; technical tests do not establish clinical accuracy.

## License and third-party notices

MIT license; see `LICENSE`. Vendored pdf-lib retains its license at `src/vendor/pdf-lib.LICENSE.md`. Other dependencies retain their respective licenses. Links to clinical sources do not imply endorsement.

## Checks

`pnpm test` verifies the catalog and Letter/A4 PDFs. `pnpm check` checks TypeScript. `pnpm test:pwa` checks manifest/icons, absence of AI creation, offline reopening, PDF downloads, and narrow-screen layout using Chromium. Physical iPhone/Android installation and OS-specific sharing must still be checked on those devices; browser emulation does not replace that check.
