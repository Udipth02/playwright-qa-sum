const { chromium } = require('playwright');

const seeds = Array.from({ length: 10 }, (_, i) => 54 + i);
const baseURL = 'https://example.com/seed-'; // Replace with actual URL prefix

(async () => {
  const browser = await chromium.launch();
  const page = await browser.newPage();
  let grandTotal = 0;

  for (const seed of seeds) {
    const url = `${baseURL}${seed}`;
    console.log(`Visiting: ${url}`);
    await page.goto(url);

    const numbers = await page.$$eval('table td', tds =>
      tds.map(td => parseFloat(td.textContent.replace(/[^0-9.-]/g, ''))).filter(n => !isNaN(n))
    );

    const pageTotal = numbers.reduce((sum, val) => sum + val, 0);
    console.log(`Seed ${seed} total: ${pageTotal}`);
    grandTotal += pageTotal;
  }

  console.log(`✅ Grand Total: ${grandTotal}`);
  await browser.close();
})();
