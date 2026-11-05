const { chromium } = require('playwright');
const { spawn } = require('child_process');
const fs = require('fs');
const path = require('path');

const outDir = path.resolve('homepage_screenshots/round5_domains');
if (!fs.existsSync(outDir)) fs.mkdirSync(outDir, { recursive: true });

async function capture() {
  console.log('--- Capturing Round 5 Multi-Device Screenshots (Domains & Typography) ---');

  const server = spawn('npx', ['astro', 'preview', '--port', '4325'], {
    cwd: '/Users/rajnishsingh/projects/knowledge-hub',
    stdio: 'pipe'
  });

  await new Promise(r => setTimeout(r, 2500));

  const browser = await chromium.launch();

  const viewports = [
    { name: 'mobile_360', width: 360, height: 800 },
    { name: 'tablet_768', width: 768, height: 1024 },
    { name: 'desktop_1440', width: 1440, height: 900 }
  ];

  const langs = ['hi', 'en'];
  const themes = ['light', 'dark'];

  for (const lang of langs) {
    for (const theme of themes) {
      for (const vp of viewports) {
        const ctx = await browser.newContext({
          viewport: { width: vp.width, height: vp.height },
          colorScheme: theme
        });
        const page = await ctx.newPage();
        await page.goto('http://localhost:4325/knowledge-hub/', { waitUntil: 'networkidle' });

        // Apply theme
        if (theme === 'dark') {
          await page.evaluate(() => document.documentElement.classList.add('dark'));
        } else {
          await page.evaluate(() => document.documentElement.classList.remove('dark'));
        }

        // Apply language
        await page.click(`button[data-lang="${lang}"]`);
        await page.waitForTimeout(300);

        // Capture domains section specifically
        const domainSection = await page.$('#domains-section');
        if (domainSection) {
          const sectionFile = path.join(outDir, `domains_${lang}_${theme}_${vp.name}.png`);
          await domainSection.screenshot({ path: sectionFile });
          console.log(`Saved: ${path.basename(sectionFile)}`);
        }

        // Capture full page
        const fullFile = path.join(outDir, `full_${lang}_${theme}_${vp.name}.png`);
        await page.screenshot({ path: fullFile, fullPage: true });
        console.log(`Saved: ${path.basename(fullFile)}`);

        await ctx.close();
      }
    }
  }

  // Also capture type specimen and icon compare pages
  const ctxDev = await browser.newContext({ viewport: { width: 1440, height: 900 } });
  const pType = await ctxDev.newPage();
  await pType.goto('http://localhost:4325/knowledge-hub/dev/type-specimen/', { waitUntil: 'networkidle' });
  await pType.screenshot({ path: path.join(outDir, 'type_specimen_desktop.png'), fullPage: true });
  console.log('Saved: type_specimen_desktop.png');

  const pIcon = await ctxDev.newPage();
  await pIcon.goto('http://localhost:4325/knowledge-hub/dev/icon-compare/', { waitUntil: 'networkidle' });
  await pIcon.screenshot({ path: path.join(outDir, 'icon_compare_desktop.png'), fullPage: true });
  console.log('Saved: icon_compare_desktop.png');

  await ctxDev.close();
  await browser.close();
  server.kill();

  console.log('✅ All screenshots captured successfully in:', outDir);
}

capture().catch(err => {
  console.error(err);
  process.exit(1);
});
