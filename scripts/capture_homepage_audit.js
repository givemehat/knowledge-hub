import { chromium } from 'playwright';
import { spawn } from 'child_process';
import fs from 'fs';
import path from 'path';

const outDir = '/Users/rajnishsingh/projects/knowledge-hub/homepage_screenshots/round1_before';
if (!fs.existsSync(outDir)) fs.mkdirSync(outDir, { recursive: true });

async function run() {
  console.log('Starting preview server...');
  const server = spawn('npx', ['astro', 'preview', '--port', '4388'], {
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

  for (const vp of viewports) {
    // Light
    const ctxLight = await browser.newContext({
      viewport: { width: vp.width, height: vp.height },
      colorScheme: 'light'
    });
    const pageL = await ctxLight.newPage();
    try {
      await pageL.goto('http://localhost:4388/knowledge-hub/', { waitUntil: 'networkidle', timeout: 10000 });
      // Capture viewport (first fold)
      await pageL.screenshot({ path: path.join(outDir, `home_${vp.name}_light_fold.png`), fullPage: false });
      // Capture full page
      await pageL.screenshot({ path: path.join(outDir, `home_${vp.name}_light_full.png`), fullPage: true });
      console.log(`Captured Light for ${vp.name}`);
    } catch (e) {
      console.error(`Light error ${vp.name}:`, e.message);
    }
    await ctxLight.close();

    // Dark
    const ctxDark = await browser.newContext({
      viewport: { width: vp.width, height: vp.height },
      colorScheme: 'dark'
    });
    const pageD = await ctxDark.newPage();
    try {
      await pageD.goto('http://localhost:4388/knowledge-hub/', { waitUntil: 'networkidle', timeout: 10000 });
      await pageD.evaluate(() => document.documentElement.classList.add('dark'));
      await pageD.screenshot({ path: path.join(outDir, `home_${vp.name}_dark_fold.png`), fullPage: false });
      await pageD.screenshot({ path: path.join(outDir, `home_${vp.name}_dark_full.png`), fullPage: true });
      console.log(`Captured Dark for ${vp.name}`);
    } catch (e) {
      console.error(`Dark error ${vp.name}:`, e.message);
    }
    await ctxDark.close();
  }

  await browser.close();
  server.kill();
  console.log('Done capturing initial screenshots!');
}

run().catch(e => {
  console.error(e);
  process.exit(1);
});
