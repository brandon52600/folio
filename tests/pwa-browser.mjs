import assert from 'node:assert/strict';
import { readFile, writeFile } from 'node:fs/promises';
import { chromium, browserOptions, appUrl } from './browser-runtime.mjs';
import { PDFDocument } from '../src/vendor/pdf-lib.js';
for(let i=0;i<80;i++){try{if((await fetch(appUrl)).ok)break;}catch{}if(i===79)throw Error('Start the static server before running PWA tests');await new Promise(r=>setTimeout(r,250));}
const browser=await chromium.launch(browserOptions);
const context=await browser.newContext({acceptDownloads:true});
const page=await context.newPage();
const errors=[];page.on('pageerror',e=>errors.push(e.message));
const swOriginal=await readFile('dist/sw.js','utf8');
try{
 await page.goto(appUrl+'?studio=3');
 await page.getByText('Ready for offline use',{exact:true}).waitFor();
 assert.equal(await page.getByRole('button',{name:/Create a template/}).count(),0);
 assert.equal(await page.locator('input[type=password]').count(),0);
 assert.equal(await page.locator('.specialty-tile').count(),22);
 assert.equal((await fetch(new URL('api/ai-status',appUrl))).status,404);
 const manifestUrl=await page.locator('link[rel=manifest]').getAttribute('href');
 const resolved=new URL(manifestUrl,appUrl);const manifest=await (await fetch(resolved)).json();
 assert.equal(manifest.display,'standalone');
 assert.equal(new URL(manifest.start_url,resolved).pathname,new URL(appUrl).pathname);
 assert(manifest.icons.some(i=>i.purpose==='maskable'));
 for(const icon of manifest.icons){const response=await fetch(new URL(icon.src,resolved));assert(response.ok);const bytes=Buffer.from(await response.arrayBuffer());const size=Number(icon.sizes.split('x')[0]);assert.equal(bytes.readUInt32BE(16),size);assert.equal(bytes.readUInt32BE(20),size);}
 await page.getByText('Installation instructions',{exact:true}).click();
 assert(await page.getByText(/iPhone or iPad: open Folio in Safari/).isVisible());
 assert(await page.getByText(/To the fullest extent permitted by applicable law/).isVisible());
 // Exercise a real waiting worker, update notification, and explicit activation.
 await writeFile('dist/sw.js',swOriginal+'\n// Update workflow test\n');
 await page.evaluate(async()=>{const r=await navigator.serviceWorker.getRegistration();await r.update();});
 await page.getByRole('button',{name:'Update now',exact:true}).waitFor();
 await page.getByRole('button',{name:'Update now',exact:true}).click();
 await page.getByText('Ready for offline use',{exact:true}).waitFor();
 await context.setOffline(true);
 const offline=await context.newPage();
 await offline.goto(appUrl+'?offline-reopen=1');
 await offline.getByRole('heading',{name:/A clear outline/}).waitFor();
 await offline.getByLabel('Search chief complaints').fill('Chest pain');
 await offline.getByRole('button',{name:'Quick Look: Chest pain',exact:true}).click();
 await offline.getByRole('dialog').getByRole('img').waitFor();
 await offline.getByRole('button',{name:'Close Quick Look'}).click();
 const [download]=await Promise.all([offline.waitForEvent('download'),offline.getByRole('button',{name:'Download PDF · 6 pages',exact:true}).click()]);
 const pdf=await PDFDocument.load(await readFile(await download.path()));assert.equal(pdf.getPageCount(),6);
 await offline.setViewportSize({width:390,height:844});assert.equal(await offline.evaluate(()=>document.documentElement.scrollWidth>innerWidth),false);
 assert.deepEqual(errors,[]);
 console.log('PASS: no AI, manifest/icons, repository paths, installation help, disclaimer, update activation, offline reopening, Quick Look, PDF download, mobile width');
}finally{await writeFile('dist/sw.js',swOriginal);await browser.close();}
