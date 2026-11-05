const { chromium } = require('playwright');
const { spawn } = require('child_process');
const fs = require('fs');
const path = require('path');

const outDir = path.join(__dirname, '../homepage_screenshots/round9_prompt_studio');
if (!fs.existsSync(outDir)) {
  fs.mkdirSync(outDir, { recursive: true });
}

async function captureStudioScreenshots() {
  console.log('=== Capturing AI UI Prompting Studio Screenshots ===');

  const previewPort = 4330;
  const server = spawn('npx', ['astro', 'preview', '--port', String(previewPort)], {
    cwd: path.join(__dirname, '..'),
    stdio: 'pipe'
  });

  await new Promise(r => setTimeout(r, 2500));

  const browser = await chromium.launch();
  const url = `http://localhost:${previewPort}/knowledge-hub/topics/ai-ui-prompting-engineering/`;

  const viewports = [
    { name: 'desktop', width: 1440, height: 900 },
    { name: 'tablet', width: 768, height: 1024 },
    { name: 'mobile', width: 360, height: 800 }
  ];

  for (const vp of viewports) {
    for (const theme of ['light', 'dark']) {
      const context = await browser.newContext({
        viewport: { width: vp.width, height: vp.height },
        colorScheme: theme
      });
      const page = await context.newPage();

      await page.goto(url, { waitUntil: 'networkidle' });

      await page.evaluate(({ theme }) => {
        if (theme === 'dark') {
          document.documentElement.classList.add('dark');
        } else {
          document.documentElement.classList.remove('dark');
        }
      }, { theme });

      await page.waitForTimeout(300);

      const filename = `prompt_studio_${vp.name}_${theme}.png`;
      await page.screenshot({ path: path.join(outDir, filename), fullPage: false });
      console.log(`Saved screenshot: ${filename}`);

      // Also capture the Interactive Studio section specifically
      const studioElement = await page.$('#interactive-typography-studio');
      if (studioElement) {
        const studioFilename = `typography_studio_${vp.name}_${theme}.png`;
        await studioElement.screenshot({ path: path.join(outDir, studioFilename) });
        console.log(`Saved element screenshot: ${studioFilename}`);
      }

      await context.close();
    }
  }

  await browser.close();
  server.kill();
  console.log('=== Studio Screenshots Captured Successfully ===');
}

captureStudioScreenshots().catch(err => {
  console.error('Screenshot capture failed:', err);
  process.exit(1);
});
