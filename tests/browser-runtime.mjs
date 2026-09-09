export const { chromium } = await import(process.env.PLAYWRIGHT_MODULE || 'playwright');
export const browserOptions = { headless:true, ...(process.env.BROWSER_EXECUTABLE ? {executablePath:process.env.BROWSER_EXECUTABLE} : {}) };
export const appUrl = process.env.APP_URL || 'http://127.0.0.1:5173/';
