const { chromium } = require('playwright');
const { spawn } = require('child_process');
const fs = require('fs');
const path = require('path');

const outDir = path.resolve('homepage_screenshots/round6_unification_baseline');
if (!fs.existsSync(outDir)) fs.mkdirSync(outDir, { recursive: true });

async function captureBaseline() {
  console.log('=== Capturing Prompt 9 Unification Baseline Screenshots ===');

  const server = spawn('npx', ['astro', 'preview', '--port', '4326'], {
    cwd: '/Users/rajnishsingh/projects/knowledge-hub',
    stdio: 'pipe'
  });

  await new Promise(r => setTimeout(r, 2500));

  const browser = await chromium.launch();

  const pages = [
    { name: 'resources', path: '/knowledge-hub/resources/' },
    { name: 'topic_detail', path: '/knowledge-hub/topics/llms-how-they-work/' },
    { name: 'roadmap_detail', path: '/knowledge-hub/roadmaps/dsa-placement/' },
    { name: 'updates', path: '/knowledge-hub/updates/' },
    { name: 'about', path: '/knowledge-hub/about/' }
  ];

  const viewports = [
    { name: '360', width: 360, height: 800 },
    { name: '768', width: 768, height: 1024 },
    { name: '1440', width: 1440, height: 900 }
  ];

  const langs = ['hi', 'en'];
  const themes = ['light', 'dark'];

  // Capture representative matrix
  for (const p of pages) {
    for (const theme of themes) {
      for (const lang of langs) {
        // Capture desktop for all, mobile/tablet for key pages
        const ctx = await browser.newContext({
          viewport: { width: 1440, height: 900 },
          colorScheme: theme
        });
        const page = await ctx.newPage();
        await page.goto(`http://localhost:4326${p.path}`, { waitUntil: 'networkidle' });

        if (theme === 'dark') {
          await page.evaluate(() => document.documentElement.classList.add('dark'));
        } else {
          await page.evaluate(() => document.documentElement.classList.remove('dark'));
        }

        const langBtn = await page.$(`button[data-lang="${lang}"]`);
        if (langBtn) {
          await langBtn.click();
          await page.waitForTimeout(200);
        }

        const fileName = `${p.name}_${lang}_${theme}_1440.png`;
        await page.screenshot({ path: path.join(outDir, fileName), fullPage: false });
        console.log(`Saved baseline: ${fileName}`);

        await ctx.close();
      }
    }

    // Also capture mobile for resources & topic
    if (p.name === 'resources' || p.name === 'topic_detail') {
      const ctxMobile = await browser.newContext({ viewport: { width: 360, height: 800 }, colorScheme: 'light' });
      const pageMobile = await ctxMobile.newPage();
      await pageMobile.goto(`http://localhost:4326${p.path}`, { waitUntil: 'networkidle' });
      await pageMobile.screenshot({ path: path.join(outDir, `${p.name}_hi_light_360.png`), fullPage: false });
      console.log(`Saved baseline: ${p.name}_hi_light_360.png`);
      await ctxMobile.close();
    }
  }

  await browser.close();
  server.kill();
  console.log('✅ Baseline screenshots complete in:', outDir);
}

captureBaseline().catch(err => {
  console.error(err);
  process.exit(1);
});
