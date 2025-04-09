const puppeteer = require('puppeteer');
const lighthouse = require('lighthouse');
const fs = require('fs');
const { URL } = require('url');

const runLighthouse = async (url) => {
  const browser = await puppeteer.launch({
    headless: true,
    args: ['--no-sandbox', '--disable-setuid-sandbox']
  });

  const { lhr } = await lighthouse(url, {
    port: new URL(browser.wsEndpoint()).port,
    output: 'html',
    logLevel: 'info',
  });

  const reportHtml = lhr.report;
  const fileName = `lighthouse-report-${Date.now()}.html`;

  fs.writeFileSync(fileName, reportHtml);
  console.log(`Report saved as ${fileName}`);

  await browser.close();
};

runLighthouse('https://console-dev.mcs.malogica.com/auth/login');