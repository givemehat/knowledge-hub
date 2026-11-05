import { chromium } from 'playwright';
import { spawn } from 'child_process';
import fs from 'fs';
import path from 'path';

const outDir = '/Users/rajnishsingh/projects/knowledge-hub/creator_screenshots';
if (!fs.existsSync(outDir)) fs.mkdirSync(outDir, { recursive: true });

async function run() {
  console.log('Starting preview server for creator verification...');
  const server = spawn('npx', ['astro', 'preview', '--port', '4321'], {
    cwd: '/Users/rajnishsingh/projects/knowledge-hub',
    stdio: 'pipe'
  });

  await new Promise(r => setTimeout(r, 2000));

  const browser = await chromium.launch();

  const pagesToTest = [
    { name: 'about_creator', path: '/knowledge-hub/about/' },
    { name: 'contact_page', path: '/knowledge-hub/contact/' },
    { name: 'icon_compare', path: '/knowledge-hub/dev/icon-compare/' },
    { name: 'topic_author_card', path: '/knowledge-hub/topics/ai-agents-and-rag/' }
  ];

  const viewports = [
    { name: 'mobile_360', width: 360, height: 780 },
    { name: 'desktop_1440', width: 1440, height: 900 }
  ];

  for (const pageItem of pagesToTest) {
    for (const vp of viewports) {
      // Light Mode
      const ctxLight = await browser.newContext({
        viewport: { width: vp.width, height: vp.height },
        colorScheme: 'light'
      });
      const pageL = await ctxLight.newPage();
      try {
        await pageL.goto(`http://localhost:4321${pageItem.path}`, { waitUntil: 'networkidle', timeout: 12000 });
        const filePathL = path.join(outDir, `${pageItem.name}_${vp.name}_light.png`);
        await pageL.screenshot({ path: filePathL, fullPage: false });
        console.log(`Captured: ${filePathL}`);
      } catch (e) {
        console.error(`Error on ${pageItem.name} light:`, e.message);
      }
      await ctxLight.close();

      // Dark Mode
      const ctxDark = await browser.newContext({
        viewport: { width: vp.width, height: vp.height },
        colorScheme: 'dark'
      });
      const pageD = await ctxDark.newPage();
      try {
        await pageD.goto(`http://localhost:4321${pageItem.path}`, { waitUntil: 'networkidle', timeout: 12000 });
        await pageD.evaluate(() => document.documentElement.classList.add('dark'));
        const filePathD = path.join(outDir, `${pageItem.name}_${vp.name}_dark.png`);
        await pageD.screenshot({ path: filePathD, fullPage: false });
        console.log(`Captured: ${filePathD}`);
      } catch (e) {
        console.error(`Error on ${pageItem.name} dark:`, e.message);
      }
      await ctxDark.close();
    }
  }

  await browser.close();
  server.kill();
  console.log('All creator branding and icon comparison screenshots captured successfully.');
}

run().catch(e => {
  console.error(e);
  process.exit(1);
});
