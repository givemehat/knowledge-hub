const { chromium } = require('playwright');
const { spawn } = require('child_process');
const fs = require('fs');
const path = require('path');

const PORT = 4340;
const ROOT_DIR = '/Users/rajnishsingh/projects/knowledge-hub';
const LAYOUT_DIR = path.join(ROOT_DIR, 'homepage_screenshots/layout_studio');
const STYLING_DIR = path.join(ROOT_DIR, 'homepage_screenshots/styling_studio');
const ANIM_DIR = path.join(ROOT_DIR, 'homepage_screenshots/animation_studio');

fs.mkdirSync(LAYOUT_DIR, { recursive: true });
fs.mkdirSync(STYLING_DIR, { recursive: true });
fs.mkdirSync(ANIM_DIR, { recursive: true });

const VIEWPORTS = [
  { name: 'desktop', width: 1440, height: 900 },
  { name: 'tablet', width: 768, height: 1024 },
  { name: 'mobile', width: 360, height: 800 }
];

async function captureAll() {
  console.log('[Setup] Starting local preview server on port', PORT);
  const srv = spawn('npx', ['astro', 'preview', '--port', String(PORT)], {
    cwd: ROOT_DIR,
    stdio: 'pipe'
  });

  await new Promise(res => setTimeout(res, 2500));

  const browser = await chromium.launch();

  for (const vp of VIEWPORTS) {
    for (const theme of ['light', 'dark']) {
      // 1. Layout Studio
      const page1 = await browser.newPage({ viewport: { width: vp.width, height: vp.height } });
      await page1.goto(`http://localhost:${PORT}/knowledge-hub/topics/responsive-layouts-bento-grid/`);
      if (theme === 'dark') {
        await page1.evaluate(() => document.documentElement.classList.add('dark'));
      } else {
        await page1.evaluate(() => document.documentElement.classList.remove('dark'));
      }
      await page1.waitForTimeout(300);

      // Capture Layout Builder Section
      const layoutBuilder = page1.locator('section#layout-prompt-builder');
      if (await layoutBuilder.count() > 0) {
        await layoutBuilder.first().scrollIntoViewIfNeeded();
        await page1.waitForTimeout(200);
        await layoutBuilder.first().screenshot({
          path: path.join(LAYOUT_DIR, `builder_${vp.name}_${theme}.png`)
        });
      }

      // Capture Responsive Pattern Simulator Section
      const sim = page1.locator('section#responsive-pattern-simulator');
      if (await sim.count() > 0) {
        await sim.first().scrollIntoViewIfNeeded();
        await page1.waitForTimeout(200);
        await sim.first().screenshot({
          path: path.join(LAYOUT_DIR, `simulator_${vp.name}_${theme}.png`)
        });
      }

      // Capture Dynamic Bento Matrix Section
      const bento = page1.locator('section#dynamic-bento-matrix');
      if (await bento.count() > 0) {
        await bento.first().scrollIntoViewIfNeeded();
        await page1.waitForTimeout(200);
        await bento.first().screenshot({
          path: path.join(LAYOUT_DIR, `bento_${vp.name}_${theme}.png`)
        });

        // Click Magic UI Bento Tab and capture
        const magicBentoTab = page1.locator('#bento-archetype-tabs button[data-archetype="magicui"]');
        if (await magicBentoTab.count() > 0) {
          await magicBentoTab.click();
          await page1.waitForTimeout(250);
          await bento.first().screenshot({
            path: path.join(LAYOUT_DIR, `bento_magicui_${vp.name}_${theme}.png`)
          });
        }
      }
      await page1.close();

      // 2. Animation Studio (Magic UI Kinetic Effects)
      const pageAnim = await browser.newPage({ viewport: { width: vp.width, height: vp.height } });
      await pageAnim.goto(`http://localhost:${PORT}/knowledge-hub/topics/ui-animation-micro-interactions/`);
      if (theme === 'dark') {
        await pageAnim.evaluate(() => document.documentElement.classList.add('dark'));
      } else {
        await pageAnim.evaluate(() => document.documentElement.classList.remove('dark'));
      }
      await pageAnim.waitForTimeout(300);

      const magicSection = pageAnim.locator('#magicui-kinetic-effects');
      if (await magicSection.count() > 0) {
        await magicSection.first().scrollIntoViewIfNeeded();
        await pageAnim.waitForTimeout(200);
        await magicSection.first().screenshot({
          path: path.join(ANIM_DIR, `magicui_kinetic_${vp.name}_${theme}.png`)
        });
      }

      const mpSection = pageAnim.locator('section#motion-primitives-studio');
      if (await mpSection.count() > 0) {
        await mpSection.first().scrollIntoViewIfNeeded();
        await pageAnim.waitForTimeout(200);
        await mpSection.first().screenshot({
          path: path.join(ANIM_DIR, `motion_primitives_${vp.name}_${theme}.png`)
        });
      }
      await pageAnim.close();

      // 3. Styling Studio
      const page2 = await browser.newPage({ viewport: { width: vp.width, height: vp.height } });
      await page2.goto(`http://localhost:${PORT}/knowledge-hub/topics/ui-styling-color-systems/`);
      if (theme === 'dark') {
        await page2.evaluate(() => document.documentElement.classList.add('dark'));
      } else {
        await page2.evaluate(() => document.documentElement.classList.remove('dark'));
      }
      await page2.waitForTimeout(300);

      // Capture Styling Builder Section
      const styleBuilder = page2.locator('section#styling-prompt-builder');
      if (await styleBuilder.count() > 0) {
        await styleBuilder.first().scrollIntoViewIfNeeded();
        await page2.waitForTimeout(200);
        await styleBuilder.first().screenshot({
          path: path.join(STYLING_DIR, `builder_${vp.name}_${theme}.png`)
        });
      }

      // Capture WCAG Contrast Lab Section
      const contrastLab = page2.locator('section#wcag-contrast-lab');
      if (await contrastLab.count() > 0) {
        await contrastLab.first().scrollIntoViewIfNeeded();
        await page2.waitForTimeout(200);
        await contrastLab.first().screenshot({
          path: path.join(STYLING_DIR, `contrast_${vp.name}_${theme}.png`)
        });
      }

      // Capture Elevation Shadow Studio Section
      const shadowLab = page2.locator('section#elevation-shadow-lab');
      if (await shadowLab.count() > 0) {
        await shadowLab.first().scrollIntoViewIfNeeded();
        await page2.waitForTimeout(200);
        await shadowLab.first().screenshot({
          path: path.join(STYLING_DIR, `elevation_${vp.name}_${theme}.png`)
        });
      }
      await page2.close();
      console.log(`Captured ${vp.name} (${theme}) screenshots.`);
    }
  }

  await browser.close();
  srv.kill();
  console.log('All screenshots captured successfully!');
}

captureAll().catch(console.error);
