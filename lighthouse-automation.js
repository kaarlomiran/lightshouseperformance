import puppeteer from 'puppeteer';  // Import puppeteer
import { lighthouse } from 'lighthouse';  // Import lighthouse
import fs from 'fs';  // Import the filesystem module
import { URL } from 'url';  // Import URL module

const runLighthouse = async (url) => {
  const browser = await puppeteer.launch({
    headless: true,
    args: ['--no-sandbox', '--disable-setuid-sandbox']
  });

  const { lhr } = await lighthouse(url, {
    port: new URL(browser.wsEndpoint()).port,
    output: 'json',
    logLevel: 'info',
  });

  const reportJson = JSON.stringify(lhr, null, 2);
  const fileName = `lighthouse-report-${Date.now()}.json`;

  fs.writeFileSync(fileName, reportJson);
  console.log(`Report saved as ${fileName}`);

  await browser.close();
};


runLighthouse('https://console-dev.mcs.malogica.com/auth/login');