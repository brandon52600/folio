import { chromium, browserOptions, appUrl } from './browser-runtime.mjs';
import { PDFDocument } from '../src/vendor/pdf-lib.js';
import { readFile, mkdir } from 'node:fs/promises';
import assert from 'node:assert/strict';
await mkdir('tmp/pdfs', { recursive: true });
const browser = await chromium.launch(browserOptions);
const ctx = await browser.newContext({ acceptDownloads: true });
const page = await ctx.newPage();
const errors = [],
  remote = [];
page.on('pageerror', (e) => errors.push(e.message));
page.on('request', (r) => {
  if (!r.url().startsWith(new URL(appUrl).origin)) remote.push(r.url());
});
try {
  await page.goto(appUrl+'?studio=3');
  await page.getByRole('heading', { name: /A clear outline/ }).waitFor();
  assert.equal(await page.locator('.specialty-tile').count(),22);
  assert.equal(await page.locator('.complaint-card').count(), 0);
  await page.screenshot({ path: 'tmp/specialty-landing.png', fullPage: true });
  await page.setViewportSize({ width: 390, height: 844 });
  assert.equal(
    await page.evaluate(
      () => document.documentElement.scrollWidth > innerWidth,
    ),
    false,
  );
  await page.screenshot({ path: 'tmp/specialty-mobile.png', fullPage: true });
  await page.setViewportSize({ width: 1280, height: 900 });
  await page.getByRole('button', {name:'Pediatrics 17 templates',exact:true}).click();
  assert.equal(await page.locator('.complaint-card').count(),17);
  await page.getByRole('button', {name:'← Specialties',exact:true}).click();
  assert.equal(await page.locator('.specialty-tile').count(),22);
  await page
    .getByRole('button', { name: 'All specialties 321 templates', exact: true })
    .click();
  assert.equal(await page.locator('input[type=password]').count(), 0);
  assert.equal(await page.locator('.complaint-card').count(), 321);
  assert.equal(await page.locator('textarea').count(), 0);
  await page.getByRole('combobox', { name: 'Specialty', exact: true }).click();
  await page.getByRole('option', { name: 'Pediatrics', exact: true }).click();
  assert.equal(await page.locator('.complaint-card').count(), 17);
  await page
    .locator('.preview-title')
    .getByRole('heading', { name: 'Pediatrics - general visit', exact: true })
    .waitFor();
  await page.locator('.complaint-card').filter({hasText:'Child with fever'}).click();
  await page.getByRole('combobox', { name: 'Paper size', exact: true }).click();
  await page.getByRole('option', { name: 'A4', exact: true }).click();
  await page
    .getByRole('combobox', { name: 'Writing space', exact: true })
    .click();
  await page
    .getByRole('option', { name: 'Extra writing page', exact: true })
    .click();
  const button = page.getByRole('button', { name: 'Download PDF · 7 pages' });
  await button.waitFor();
  const downloadPromise = page.waitForEvent('download');
  await button.click();
  const download = await downloadPromise;
  assert.equal(
    download.suggestedFilename(),
    'folio-peds-child-with-fever-a4-extra.pdf',
  );
  await download.saveAs('tmp/pdfs/browser-export.pdf');
  const exported = await PDFDocument.load(
    await readFile('tmp/pdfs/browser-export.pdf'),
  );
  assert.equal(exported.getPageCount(), 7);
  assert(Math.abs(exported.getPage(0).getWidth() - 595.28) < 0.1);
  await page.getByRole('button', { name: 'Next preview page' }).click();
  assert(await page.getByRole('img', { name: /page 2/ }).isVisible());
  await page.screenshot({ path: 'tmp/studio-desktop.png', fullPage: true });
  await page.getByRole('combobox', { name: 'System', exact: true }).click();
  await page
    .getByRole('option', { name: 'Cardiovascular', exact: true })
    .click();
  assert.equal(await page.locator('.complaint-card').count(), 17);
  await page.getByLabel('Search chief complaints').fill('palpitations');
  assert.equal(await page.locator('.complaint-card').count(), 1);
  await page.locator('.complaint-card').filter({hasText:'Palpitations'}).click();
  await page.getByLabel('Search chief complaints').fill('no-match');
  assert(
    await page
      .getByRole('heading', { name: 'No matching templates' })
      .isVisible(),
  );
  await page.getByRole('button', { name: 'Reset filters' }).click();
  assert.equal(await page.locator('.complaint-card').count(), 321);
  await page.evaluate(() => navigator.serviceWorker.ready);
  await ctx.setOffline(true);
  await page.reload();
  await page.getByLabel('Search chief complaints').fill('low platelet count');
  await page.locator('.complaint-card').filter({hasText:'Low platelet count'}).click();
  await page.getByRole('button', { name: 'Download PDF · 6 pages' }).waitFor();
  const offPromise = page.waitForEvent('download');
  await page.getByRole('button', { name: 'Download PDF · 6 pages' }).click();
  const offlineDownload = await offPromise;
  assert(offlineDownload.suggestedFilename().includes('common-hematology'));
  await offlineDownload.saveAs('tmp/pdfs/offline-export.pdf');
  assert.equal(
    (
      await PDFDocument.load(await readFile('tmp/pdfs/offline-export.pdf'))
    ).getPageCount(),
    6,
  );
  assert.equal(
    await page.evaluate(async () => (await indexedDB.databases()).length),
    0,
  );
  await page.setViewportSize({ width: 390, height: 844 });
  await page.getByLabel('Search chief complaints').fill('chest pain');
  await page.locator('.complaint-card').filter({hasText:'Chest pain'}).click();
  await page.getByRole('button', { name: 'Download PDF · 6 pages' }).waitFor();
  await page.screenshot({ path: 'tmp/studio-mobile.png', fullPage: true });
  assert.equal(
    await page.evaluate(
      () => document.documentElement.scrollWidth > innerWidth,
    ),
    false,
  );
  assert.deepEqual(errors, []);
  assert.deepEqual(remote, []);
  console.log(
    'PASS: no login/notes/storage, 321 templates, specialty/system/search filters, exact PDF download, A4 + extra page, page preview, offline PDF export, mobile width, zero remote requests/runtime errors.',
  );
} finally {
  await browser.close();
}
