const { chromium } = require('playwright');
const { spawn } = require('child_process');
const path = require('path');
const fs = require('fs');

async function captureAnimationScreenshots() {
  const previewPort = 4334;
  const server = spawn('npx', ['astro', 'preview', '--port', String(previewPort)], {
    cwd: '/Users/rajnishsingh/projects/knowledge-hub',
    stdio: 'pipe'
  });

  await new Promise(r => setTimeout(r, 2500));

  const outDir = path.join('/Users/rajnishsingh/projects/knowledge-hub/homepage_screenshots/animation_studio');
  if (!fs.existsSync(outDir)) fs.mkdirSync(outDir, { recursive: true });

  const browser = await chromium.launch();

  const viewports = [
    { name: 'desktop', width: 1440, height: 900 },
    { name: 'tablet', width: 768, height: 1024 },
    { name: 'mobile', width: 360, height: 780 }
  ];

  for (const vp of viewports) {
    for (const theme of ['light', 'dark']) {
      const context = await browser.newContext({
        viewport: { width: vp.width, height: vp.height },
        colorScheme: theme
      });
      const page = await context.newPage();

      await page.goto(`http://localhost:${previewPort}/knowledge-hub/topics/ui-animation-micro-interactions/`, {
        waitUntil: 'networkidle'
      });

      if (theme === 'dark') {
        await page.evaluate(() => document.documentElement.classList.add('dark'));
      } else {
        await page.evaluate(() => document.documentElement.classList.remove('dark'));
      }

      await page.waitForTimeout(300);

      // Screenshot the Motion Builder section
      const builderEl = await page.$('#animation-prompt-builder');
      if (builderEl) {
        await builderEl.screenshot({
          path: path.join(outDir, `motion_builder_${vp.name}_${theme}.png`)
        });
      }

      // Screenshot the Card & Button Motion section
      const motionEl = await page.$('#card-button-motion-studio');
      if (motionEl) {
        await motionEl.screenshot({
          path: path.join(outDir, `card_button_motion_${vp.name}_${theme}.png`)
        });
      }

      // Screenshot the Alert & Toast section
      const alertEl = await page.$('#alert-notification-studio');
      if (alertEl) {
        await alertEl.screenshot({
          path: path.join(outDir, `alert_notifications_${vp.name}_${theme}.png`)
        });
      }

      await context.close();
    }
  }

  await browser.close();
  server.kill();
  console.log('✅ All animation screenshots captured successfully in', outDir);
}

captureAnimationScreenshots();
