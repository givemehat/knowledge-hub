const { chromium } = require('playwright');
const { spawn } = require('child_process');
const path = require('path');
const fs = require('fs');

async function captureTypographyScreenshots() {
  const previewPort = 4332;
  const server = spawn('npx', ['astro', 'preview', '--port', String(previewPort)], {
    cwd: '/Users/rajnishsingh/projects/knowledge-hub',
    stdio: 'pipe'
  });

  await new Promise(r => setTimeout(r, 2500));

  const outDir = path.join('/Users/rajnishsingh/projects/knowledge-hub/homepage_screenshots/typography_studio');
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

      await page.goto(`http://localhost:${previewPort}/knowledge-hub/topics/typography-prompting-font-pairing/`, {
        waitUntil: 'networkidle'
      });

      if (theme === 'dark') {
        await page.evaluate(() => document.documentElement.classList.add('dark'));
      } else {
        await page.evaluate(() => document.documentElement.classList.remove('dark'));
      }

      await page.waitForTimeout(300);

      // Screenshot the Matrix section
      const matrixEl = await page.$('#font-pairing-matrix');
      if (matrixEl) {
        await matrixEl.screenshot({
          path: path.join(outDir, `pairing_matrix_${vp.name}_${theme}.png`)
        });
      }

      // Screenshot the Animation studio section
      const animEl = await page.$('#text-animation-studio');
      if (animEl) {
        await animEl.screenshot({
          path: path.join(outDir, `text_animations_${vp.name}_${theme}.png`)
        });
      }

      // Screenshot the Scenario presets section
      const scenarioEl = await page.$('#scenario-prompt-presets');
      if (scenarioEl) {
        await scenarioEl.screenshot({
          path: path.join(outDir, `scenario_presets_${vp.name}_${theme}.png`)
        });
      }

      await context.close();
    }
  }

  await browser.close();
  server.kill();
  console.log('✅ All typography screenshots captured successfully in', outDir);
}

captureTypographyScreenshots();
