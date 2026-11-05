const { chromium } = require('playwright');
const { spawn } = require('child_process');
const fs = require('fs');
const path = require('path');

const outDir = path.join(__dirname, '../homepage_screenshots/round7_unification_final');
if (!fs.existsSync(outDir)) {
  fs.mkdirSync(outDir, { recursive: true });
}

async function captureFinalScreenshots() {
  console.log('=== Capturing Round 7 Final Unification Screenshots ===');

  const previewPort = 4326;
  const server = spawn('npx', ['astro', 'preview', '--port', String(previewPort)], {
    cwd: path.join(__dirname, '..'),
    stdio: 'pipe'
  });

  await new Promise(r => setTimeout(r, 2500));

  const browser = await chromium.launch();
  const base = `http://localhost:${previewPort}/knowledge-hub`;

  const viewports = [
    { name: 'desktop', width: 1440, height: 900 },
    { name: 'tablet', width: 768, height: 1024 },
    { name: 'mobile', width: 360, height: 800 }
  ];

  const pages = [
    { name: 'resources', path: '/resources/' },
    { name: 'design_system', path: '/design-system/' },
    { name: 'topic_detail', path: '/topics/llms-how-they-work/' },
    { name: 'roadmap_detail', path: '/roadmaps/ai-ml-engineer/' },
    { name: 'updates', path: '/updates/' },
    { name: 'about', path: '/about/' }
  ];

  for (const vp of viewports) {
    for (const theme of ['light', 'dark']) {
      const context = await browser.newContext({
        viewport: { width: vp.width, height: vp.height },
        colorScheme: theme
      });
      const page = await context.newPage();

      for (const p of pages) {
        await page.goto(`${base}${p.path}`, { waitUntil: 'networkidle' });

        if (theme === 'dark') {
          await page.evaluate(() => {
            document.documentElement.classList.add('dark');
            localStorage.setItem('bodh_theme', 'dark');
          });
        } else {
          await page.evaluate(() => {
            document.documentElement.classList.remove('dark');
            localStorage.setItem('bodh_theme', 'light');
          });
        }
        await page.waitForTimeout(300);

        const screenshotPath = path.join(outDir, `${p.name}_${vp.name}_${theme}.png`);
        await page.screenshot({ path: screenshotPath, fullPage: false });
        console.log(`Saved screenshot: ${screenshotPath}`);
      }
      await context.close();
    }
  }

  await browser.close();
  server.kill();
  console.log('=== All Final Unification Screenshots Captured Successfully! ===');
}

captureFinalScreenshots().catch(err => {
  console.error(err);
  process.exit(1);
});
