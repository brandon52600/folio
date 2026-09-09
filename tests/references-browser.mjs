import { chromium, browserOptions, appUrl } from './browser-runtime.mjs';
import assert from 'node:assert/strict';
const browser=await chromium.launch(browserOptions);
const context=await browser.newContext({acceptDownloads:true});const page=await context.newPage();
try{
 await page.goto(appUrl);
 await page.getByRole('tab',{name:'Reference sheets',exact:true}).click();
 assert.equal(await page.locator('.reference-grid .specialty-tile').count(),6);
 await page.locator('.reference-grid .specialty-tile').filter({hasText:'SBAR handoff guide'}).click();
 await page.getByRole('img',{name:'SBAR handoff guide reference preview'}).waitFor();
 await page.getByLabel('Reference paper size').selectOption('A4');
 await page.getByRole('button',{name:'Download reference PDF'}).waitFor();
 const promise=page.waitForEvent('download');await page.getByRole('button',{name:'Download reference PDF'}).click();
 assert.equal((await promise).suggestedFilename(),'folio-reference-sbar-a4.pdf');
 await page.screenshot({path:'tmp/reference-library.png',fullPage:true});
 await page.getByRole('tab',{name:'Templates',exact:true}).click();assert.equal(await page.locator('.specialty-tile:visible').count(),22);
 await page.evaluate(()=>navigator.serviceWorker.ready);await context.setOffline(true);await page.reload();
 await page.getByRole('tab',{name:'Reference sheets',exact:true}).click();
 await page.getByRole('button',{name:'Download reference PDF'}).waitFor();
 const offline=page.waitForEvent('download');await page.getByRole('button',{name:'Download reference PDF'}).click();assert((await offline).suggestedFilename().includes('reference-hpi'));
 await page.setViewportSize({width:390,height:844});assert.equal(await page.evaluate(()=>document.documentElement.scrollWidth>innerWidth),false);
 console.log('PASS: tabs, six sheets, preview, A4 export, template navigation, offline download, mobile width');
}finally{await browser.close();}
