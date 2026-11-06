const { chromium } = require('playwright');
const { spawn } = require('child_process');
const fs = require('fs');
const path = require('path');

const PORT = 4342;
const ROOT_DIR = '/Users/rajnishsingh/projects/knowledge-hub';
const OUT_DIR = path.join(ROOT_DIR, 'homepage_screenshots/site_elevation');

fs.mkdirSync(OUT_DIR, { recursive: true });

const VIEWPORTS = [
  { name: 'desktop', width: 1440, height: 900 },
  { name: 'tablet', width: 768, height: 1024 },
  { name: 'mobile', width: 360, height: 800 }
];

async function captureElevation() {
  console.log('[Setup] Starting local preview server on port', PORT);
  const srv = spawn('npx', ['astro', 'preview', '--port', String(PORT)], {
    cwd: ROOT_DIR,
    stdio: 'pipe'
  });

  await new Promise(res => setTimeout(res, 2500));

  const browser = await chromium.launch();

  for (const vp of VIEWPORTS) {
    for (const theme of ['light', 'dark']) {
      // 1. Homepage Hero Elevation
      const pageHero = await browser.newPage({ viewport: { width: vp.width, height: vp.height } });
      await pageHero.goto(`http://localhost:${PORT}/knowledge-hub/en/`);
      if (theme === 'dark') {
        await pageHero.evaluate(() => document.documentElement.classList.add('dark'));
      } else {
        await pageHero.evaluate(() => document.documentElement.classList.remove('dark'));
      }
      await pageHero.waitForTimeout(200);

      const heroSec = pageHero.locator('section').first();
      if (await heroSec.count() > 0) {
        await heroSec.screenshot({
          path: path.join(OUT_DIR, `hero_${vp.name}_${theme}.png`)
        });
      }

      // Open Cmd+K Command Palette and capture
      await pageHero.keyboard.press('Meta+k');
      await pageHero.waitForTimeout(250);
      const palette = pageHero.locator('#search-modal > div');
      if (await palette.count() > 0) {
        await palette.screenshot({
          path: path.join(OUT_DIR, `cmdk_palette_${vp.name}_${theme}.png`)
        });
      }
      await pageHero.close();

      // 2. Design System Kinetic Primitives Gallery
      const pageDs = await browser.newPage({ viewport: { width: vp.width, height: vp.height } });
      await pageDs.goto(`http://localhost:${PORT}/knowledge-hub/design-system/`);
      if (theme === 'dark') {
        await pageDs.evaluate(() => document.documentElement.classList.add('dark'));
      } else {
        await pageDs.evaluate(() => document.documentElement.classList.remove('dark'));
      }
      await pageDs.waitForTimeout(200);

      const gallerySec = pageDs.locator('section#kinetic-primitives-gallery');
      if (await gallerySec.count() > 0) {
        await gallerySec.scrollIntoViewIfNeeded();
        await pageDs.waitForTimeout(200);
        await gallerySec.screenshot({
          path: path.join(OUT_DIR, `ds_gallery_${vp.name}_${theme}.png`)
        });
      }
      await pageDs.close();
      console.log(`Captured site elevation ${vp.name} (${theme})`);
    }
  }

  await browser.close();
  srv.kill();
  console.log('Site elevation screenshots captured successfully!');
}

captureElevation().catch(console.error);
