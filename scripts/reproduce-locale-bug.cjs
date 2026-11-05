const { chromium } = require('playwright');
const { spawn } = require('child_process');
const fs = require('fs');
const path = require('path');

const outDir = path.join(__dirname, '../homepage_screenshots/round11_locale_bug');
if (!fs.existsSync(outDir)) {
  fs.mkdirSync(outDir, { recursive: true });
}

async function reproduceBug() {
  console.log('=== Rule #0: Reproducing Locale Bug on Current Peach Homepage ===');

  const previewPort = 4331;
  const server = spawn('npx', ['astro', 'preview', '--port', String(previewPort)], {
    cwd: path.join(__dirname, '..'),
    stdio: 'pipe'
  });

  await new Promise(r => setTimeout(r, 2500));

  const browser = await chromium.launch();
  const page = await browser.newPage({ viewport: { width: 1440, height: 900 } });

  const url = `http://localhost:${previewPort}/knowledge-hub/`;
  await page.goto(url, { waitUntil: 'networkidle' });

  // 1. Initial State Screenshot (Hindi)
  await page.screenshot({ path: path.join(outDir, '01_homepage_initial_hi.png'), fullPage: false });
  console.log('Saved 01_homepage_initial_hi.png');

  // 2. Click the EN language toggle button
  const enBtn = await page.$('button[data-lang="en"]');
  if (enBtn) {
    await enBtn.click();
    await page.waitForTimeout(400);
  }

  // 3. Screenshot after EN clicked showing the leak
  await page.screenshot({ path: path.join(outDir, '02_homepage_en_selected_leak.png'), fullPage: false });
  console.log('Saved 02_homepage_en_selected_leak.png');

  // 4. Element screenshot of the domain card showing the Hindi leak specifically
  const firstCard = await page.$('.domain-card');
  if (firstCard) {
    await firstCard.screenshot({ path: path.join(outDir, '03_domain_card_leak_detail.png') });
    console.log('Saved 03_domain_card_leak_detail.png');
  }

  // Check the leaked values
  const cardData = await page.evaluate(() => {
    const card = document.querySelector('.domain-card');
    if (!card) return null;
    const topTopicsLabel = card.querySelector('.inset-panel span')?.innerText;
    const firstTopicTitle = card.querySelector('.topic-row span.truncate')?.innerText;
    const readingTime = card.querySelector('.topic-row .tabular-nums span')?.innerText;
    const countPill = card.querySelector('.count-pill')?.innerText;
    const footerMeta = card.querySelector('.card-footer span')?.innerText;

    return {
      topTopicsLabel,
      firstTopicTitle,
      readingTime,
      countPill,
      footerMeta
    };
  });

  console.log('\n[BUG REPRODUCTION REPORT]:');
  console.log('- Inset panel label:', cardData?.topTopicsLabel, '(Expected: "Top topics", Found: "' + cardData?.topTopicsLabel + '")');
  console.log('- Topic row title:', cardData?.firstTopicTitle, '(Hindi Devanagari text still present!)');
  console.log('- Reading time:', cardData?.readingTime, '(Expected: "min", Found abbreviation with no space: "' + cardData?.readingTime + '")');
  console.log('- Count pill:', cardData?.countPill);
  console.log('- Footer meta:', cardData?.footerMeta, '(Duplicate count!)');

  await browser.close();
  server.kill();
  console.log('=== Bug Reproduction Complete ===');
}

reproduceBug().catch(err => {
  console.error('Reproduction failed:', err);
  process.exit(1);
});
