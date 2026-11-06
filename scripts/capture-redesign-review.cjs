const { chromium } = require('playwright');
const { spawn } = require('child_process');
const fs = require('fs');
const path = require('path');

const PORT = 4345;
const ROOT_DIR = '/Users/rajnishsingh/projects/knowledge-hub';
const OUT_DIR = path.join(ROOT_DIR, 'homepage_screenshots/redesign_v2');
const ARTIFACT_DIR = '/Users/rajnishsingh/.gemini/antigravity/brain/74659deb-02b7-4218-a0f1-f2cc2d48f1b6';

fs.mkdirSync(OUT_DIR, { recursive: true });

const VIEWPORTS = [
  { name: 'desktop', width: 1440, height: 900 },
  { name: 'tablet', width: 768, height: 1024 },
  { name: 'mobile', width: 360, height: 800 }
];

async function captureRedesign() {
  console.log('[Setup] Starting local preview server on port', PORT);
  const srv = spawn('npx', ['astro', 'preview', '--port', String(PORT)], {
    cwd: ROOT_DIR,
    stdio: 'pipe'
  });

  await new Promise(res => setTimeout(res, 2500));

  const browser = await chromium.launch();

  for (const vp of VIEWPORTS) {
    for (const theme of ['light', 'dark']) {
      const page = await browser.newPage({ viewport: { width: vp.width, height: vp.height } });

      // 1. Homepage
      await page.goto(`http://localhost:${PORT}/knowledge-hub/en/`, { waitUntil: 'networkidle' });
      if (theme === 'dark') {
        await page.evaluate(() => document.documentElement.classList.add('dark'));
      } else {
        await page.evaluate(() => document.documentElement.classList.remove('dark'));
      }
      await page.waitForTimeout(300);

      const heroPath = path.join(OUT_DIR, `hero_fold_${vp.name}_${theme}.png`);
      await page.screenshot({
        path: heroPath,
        clip: { x: 0, y: 0, width: vp.width, height: Math.min(vp.height, 900) }
      });
      fs.copyFileSync(heroPath, path.join(ARTIFACT_DIR, `hero_fold_${vp.name}_${theme}.png`));

      // 2. Scenarios Catalog
      await page.goto(`http://localhost:${PORT}/knowledge-hub/en/scenarios/`, { waitUntil: 'networkidle' });
      if (theme === 'dark') await page.evaluate(() => document.documentElement.classList.add('dark'));
      await page.waitForTimeout(200);
      const scPath = path.join(OUT_DIR, `scenarios_${vp.name}_${theme}.png`);
      await page.screenshot({ path: scPath, clip: { x: 0, y: 0, width: vp.width, height: Math.min(vp.height, 900) } });
      fs.copyFileSync(scPath, path.join(ARTIFACT_DIR, `scenarios_${vp.name}_${theme}.png`));

      // 3. About Creator Page
      await page.goto(`http://localhost:${PORT}/knowledge-hub/en/about/`, { waitUntil: 'networkidle' });
      if (theme === 'dark') await page.evaluate(() => document.documentElement.classList.add('dark'));
      await page.waitForTimeout(200);
      const aboutPath = path.join(OUT_DIR, `about_${vp.name}_${theme}.png`);
      await page.screenshot({ path: aboutPath, clip: { x: 0, y: 0, width: vp.width, height: Math.min(vp.height, 900) } });
      fs.copyFileSync(aboutPath, path.join(ARTIFACT_DIR, `about_${vp.name}_${theme}.png`));

      // 4. Contact Form Page
      await page.goto(`http://localhost:${PORT}/knowledge-hub/contact/`, { waitUntil: 'networkidle' });
      if (theme === 'dark') await page.evaluate(() => document.documentElement.classList.add('dark'));
      await page.waitForTimeout(200);
      const contactPath = path.join(OUT_DIR, `contact_${vp.name}_${theme}.png`);
      await page.screenshot({ path: contactPath, clip: { x: 0, y: 0, width: vp.width, height: Math.min(vp.height, 900) } });
      fs.copyFileSync(contactPath, path.join(ARTIFACT_DIR, `contact_${vp.name}_${theme}.png`));

      // 5. Changelog / Updates Page
      await page.goto(`http://localhost:${PORT}/knowledge-hub/updates/`, { waitUntil: 'networkidle' });
      if (theme === 'dark') await page.evaluate(() => document.documentElement.classList.add('dark'));
      await page.waitForTimeout(200);
      const updatesPath = path.join(OUT_DIR, `updates_${vp.name}_${theme}.png`);
      await page.screenshot({ path: updatesPath, clip: { x: 0, y: 0, width: vp.width, height: Math.min(vp.height, 900) } });
      fs.copyFileSync(updatesPath, path.join(ARTIFACT_DIR, `updates_${vp.name}_${theme}.png`));

      await page.close();
      console.log(`Captured all pages for ${vp.name} (${theme})`);
    }
  }

  await browser.close();
  srv.kill();
  console.log('All responsive subpage screenshots captured successfully!');
}

captureRedesign().catch(err => {
  console.error(err);
  process.exit(1);
});
