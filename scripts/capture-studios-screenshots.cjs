const { chromium } = require('playwright');
const { spawn } = require('child_process');
const fs = require('fs');
const path = require('path');

const PORT = 4340;
const ROOT_DIR = '/Users/rajnishsingh/projects/knowledge-hub';
const LAYOUT_DIR = path.join(ROOT_DIR, 'homepage_screenshots/layout_studio');
const STYLING_DIR = path.join(ROOT_DIR, 'homepage_screenshots/styling_studio');
const ANIM_DIR = path.join(ROOT_DIR, 'homepage_screenshots/animation_studio');
const SHADCN_DIR = path.join(ROOT_DIR, 'homepage_screenshots/shadcn_studio');
const COMMUNITY_DIR = path.join(ROOT_DIR, 'homepage_screenshots/community_studio');

fs.mkdirSync(LAYOUT_DIR, { recursive: true });
fs.mkdirSync(STYLING_DIR, { recursive: true });
fs.mkdirSync(ANIM_DIR, { recursive: true });
fs.mkdirSync(SHADCN_DIR, { recursive: true });
fs.mkdirSync(COMMUNITY_DIR, { recursive: true });

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

      // 4. shadcn/ui Core Primitives Registry Studio
      const pageShadcn = await browser.newPage({ viewport: { width: vp.width, height: vp.height } });
      await pageShadcn.goto(`http://localhost:${PORT}/knowledge-hub/topics/ai-ui-prompting-engineering/`);
      if (theme === 'dark') {
        await pageShadcn.evaluate(() => document.documentElement.classList.add('dark'));
      } else {
        await pageShadcn.evaluate(() => document.documentElement.classList.remove('dark'));
      }
      await pageShadcn.waitForTimeout(300);

      const shadcnStudio = pageShadcn.locator('section#shadcn-registry-studio');
      if (await shadcnStudio.count() > 0) {
        await shadcnStudio.first().scrollIntoViewIfNeeded();
        await pageShadcn.waitForTimeout(200);
        await shadcnStudio.first().screenshot({
          path: path.join(SHADCN_DIR, `shadcn_registry_${vp.name}_${theme}.png`)
        });

        // Switch to Command tab and capture
        const cmdTab = pageShadcn.locator('#shadcn-primitive-tabs button[data-primitive="command"]');
        if (await cmdTab.count() > 0) {
          await cmdTab.click();
          await pageShadcn.waitForTimeout(200);
          await shadcnStudio.first().screenshot({
            path: path.join(SHADCN_DIR, `shadcn_cmdk_${vp.name}_${theme}.png`)
          });
        }
      }

      // 5. 21st.dev Community Registry & AI MCP Studio
      const communityStudio = pageShadcn.locator('section#community-registry-studio');
      if (await communityStudio.count() > 0) {
        await communityStudio.first().scrollIntoViewIfNeeded();
        await pageShadcn.waitForTimeout(200);
        await communityStudio.first().screenshot({
          path: path.join(COMMUNITY_DIR, `community_registry_${vp.name}_${theme}.png`)
        });

        // Switch to Glare Card tab and capture
        const glareTab = pageShadcn.locator('#community-component-tabs button[data-comp="glare-card"]');
        if (await glareTab.count() > 0) {
          await glareTab.click();
          await pageShadcn.waitForTimeout(200);
          await communityStudio.first().screenshot({
            path: path.join(COMMUNITY_DIR, `community_glare_${vp.name}_${theme}.png`)
          });
        }
      }
      await pageShadcn.close();
      console.log(`Captured ${vp.name} (${theme}) screenshots.`);
    }
  }

  await browser.close();
  srv.kill();
  console.log('All screenshots captured successfully!');
}

captureAll().catch(console.error);
