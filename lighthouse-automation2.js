import puppeteer from 'puppeteer';
import lighthouse from 'lighthouse';
import fs from 'fs';
import { URL } from 'url';

const runLighthouseWithLogin = async () => {
  const browser = await puppeteer.launch({
    headless: true,
    args: ['--no-sandbox', '--disable-setuid-sandbox'],
  });

  const page = await browser.newPage();
  await page.goto('https://console-dev.mcs.malogica.com/auth/login', { waitUntil: 'networkidle2' });

  try {
    // Wait for and select the email field
    await page.waitForSelector('input[type="email"]', { timeout: 60000 }); // Increase timeout
    await page.type('input[type="email"]', 'nawaj90515@avzong.com');

    // Wait for and select the password field
    await page.waitForSelector('input[type="password"]', { timeout: 60000 });
    await page.type('input[type="password"]', 'Testing12@@');

    // Wait for and click the login button
    await page.waitForSelector('button[type="submit"]', { timeout: 60000 });
    await page.click('button[type="submit"]');
    
    // Wait for navigation to complete after login
    await page.waitForNavigation({ waitUntil: 'networkidle2', timeout: 60000 });

    console.log("Login successful, running Lighthouse audit...");

    // Run Lighthouse on the authenticated page
    const { lhr, report } = await lighthouse(page.url(), {
      port: new URL(browser.wsEndpoint()).port,
      output: 'html',
      logLevel: 'info',
    });

    // Check if report was generated successfully
    if (!report) {
      throw new Error("Lighthouse report generation failed.");
    }

    // Save the Lighthouse report
    const fileName = `lighthouse-report-${Date.now()}.html`;
    fs.writeFileSync(fileName, report);
    console.log(`Lighthouse report saved as ${fileName}`);

  } catch (error) {
    console.error("Error during login or Lighthouse process:", error);
  } finally {
    await browser.close();
  }
};

runLighthouseWithLogin();