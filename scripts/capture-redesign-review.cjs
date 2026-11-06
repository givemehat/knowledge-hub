const { chromium } = require('playwright');
const { spawn } = require('child_process');
const fs = require('fs');
const path = require('path');

const PORT = 4345;
const ROOT_DIR = '/Users/rajnishsingh/projects/knowledge-hub';
const OUT_DIR = path.join(ROOT_DIR, 'homepage_screenshots/redesign_v2');

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
      await page.goto(`http://localhost:${PORT}/knowledge-hub/en/`, { waitUntil: 'networkidle' });
      if (theme === 'dark') {
        await page.evaluate(() => document.documentElement.classList.add('dark'));
      } else {
        await page.evaluate(() => document.documentElement.classList.remove('dark'));
      }
      await page.waitForTimeout(300);

      // 1. Capture Hero + Header Viewport
      await page.screenshot({
        path: path.join(OUT_DIR, `hero_fold_${vp.name}_${theme}.png`),
        clip: { x: 0, y: 0, width: vp.width, height: Math.min(vp.height, 900) }
      });

      // 2. Capture Bento Domains Section
      const domainsSec = page.locator('#domains-section');
      if (await domainsSec.count() > 0) {
        await domainsSec.scrollIntoViewIfNeeded();
        await page.waitForTimeout(200);
        await domainsSec.screenshot({
          path: path.join(OUT_DIR, `domains_${vp.name}_${theme}.png`)
        });
      }

      // 3. Capture Roadmap Banner
      const roadmapSec = page.locator('section').filter({ hasText: 'From DSA to Placement' });
      if (await roadmapSec.count() > 0) {
        await roadmapSec.scrollIntoViewIfNeeded();
        await page.waitForTimeout(200);
        await roadmapSec.screenshot({
          path: path.join(OUT_DIR, `roadmap_banner_${vp.name}_${theme}.png`)
        });
      }

      await page.close();
      console.log(`Captured redesign ${vp.name} (${theme})`);
    }
  }

  await browser.close();
  srv.kill();
  console.log('Redesign screenshots captured successfully!');
}

captureRedesign().catch(err => {
  console.error(err);
  process.exit(1);
});
