const { chromium } = require('playwright');
const { spawn } = require('child_process');
const fs = require('fs');
const path = require('path');

const outDir = path.join(__dirname, '../homepage_screenshots/round8_brand_before');
if (!fs.existsSync(outDir)) {
  fs.mkdirSync(outDir, { recursive: true });
}

async function captureBrandBefore() {
  console.log('=== Capturing Round 8 Brand Before Baseline Screenshots ===');

  const previewPort = 4327;
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
    { name: 'home', path: '/' },
    { name: 'about', path: '/about/' },
    { name: 'design_system', path: '/design-system/' }
  ];

  for (const vp of viewports) {
    for (const theme of ['light', 'dark']) {
      for (const lang of ['hi', 'en']) {
        const context = await browser.newContext({
          viewport: { width: vp.width, height: vp.height },
          colorScheme: theme
        });
        const page = await context.newPage();

        for (const p of pages) {
          await page.goto(`${base}${p.path}`, { waitUntil: 'networkidle' });

          // Apply theme & language
          await page.evaluate(({ theme, lang }) => {
            if (theme === 'dark') {
              document.documentElement.classList.add('dark');
              localStorage.setItem('bodh_theme', 'dark');
            } else {
              document.documentElement.classList.remove('dark');
              localStorage.setItem('bodh_theme', 'light');
            }

            document.documentElement.setAttribute('lang', lang);
            localStorage.setItem('bodh_lang', lang);
            window.dispatchEvent(new CustomEvent('bodh:lang-change', { detail: { lang } }));
          }, { theme, lang });

          await page.waitForTimeout(250);

          const filename = `${p.name}_${vp.name}_${theme}_${lang}.png`;
          const screenshotPath = path.join(outDir, filename);
          await page.screenshot({ path: screenshotPath, fullPage: false });
          console.log(`Saved baseline: ${filename}`);
        }
        await context.close();
      }
    }
  }

  await browser.close();
  server.kill();
  console.log('=== Baseline Screenshots Complete! ===');
}

captureBrandBefore().catch(err => {
  console.error(err);
  process.exit(1);
});
