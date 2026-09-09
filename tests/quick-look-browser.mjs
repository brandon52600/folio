import { chromium, browserOptions, appUrl } from './browser-runtime.mjs';import assert from 'node:assert/strict';
const browser=await chromium.launch(browserOptions);const ctx=await browser.newContext();const page=await ctx.newPage();
try{
 await page.goto(appUrl);
 await page.getByRole('tab',{name:'Reference sheets',exact:true}).click();
 const selected=await page.locator('.preview-title h2').last().textContent();
 await page.getByRole('button',{name:'Quick Look: SBAR handoff guide',exact:true}).click();
 const dialog=page.getByRole('dialog');await dialog.getByRole('img').waitFor();
 const before=await dialog.locator('canvas').evaluate(el=>el.getBoundingClientRect().width);
 await dialog.getByRole('button',{name:'Zoom in',exact:true}).click();
 assert.equal(await dialog.getByLabel('Zoom level').textContent(),'125%');assert(await dialog.locator('canvas').evaluate(el=>el.getBoundingClientRect().width)>before);
 await page.screenshot({path:'tmp/quick-look-desktop.png'});
 await page.keyboard.press('Escape');assert.equal(await page.getByRole('dialog').count(),0);
 assert.equal(await page.locator('.preview-title h2').last().textContent(),selected);
 assert.equal(await page.getByRole('button',{name:'Quick Look: SBAR handoff guide',exact:true}).evaluate(el=>el===document.activeElement),true);
 await page.getByRole('tab',{name:'Templates',exact:true}).click();await page.getByLabel('Search chief complaints').fill('Chest pain');
 await page.getByRole('button',{name:'Quick Look: Chest pain',exact:true}).click();await dialog.getByRole('img').waitFor();
 await dialog.getByLabel('Quick Look page',{exact:true}).selectOption('5');await dialog.getByRole('img',{name:/page 6 of 6/}).waitFor();
 await dialog.getByRole('button',{name:'Close Quick Look'}).click();
 await page.evaluate(()=>navigator.serviceWorker.ready);await ctx.setOffline(true);
 await page.getByRole('button',{name:'Quick Look: Chest pain',exact:true}).click();await dialog.getByRole('img').waitFor();
 await page.setViewportSize({width:390,height:844});await dialog.getByRole('button',{name:'Zoom in',exact:true}).click();
 assert.equal(await page.evaluate(()=>document.documentElement.scrollWidth>innerWidth),false);
 await page.screenshot({path:'tmp/quick-look-mobile.png'});
 console.log('PASS: reference/template Quick Look, zoom, pagination, Escape/focus return, selection preserved, offline and mobile');
}finally{await browser.close();}
