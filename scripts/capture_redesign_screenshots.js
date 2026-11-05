import { chromium } from 'playwright';
import { spawn } from 'child_process';
import fs from 'fs';
import path from 'path';

const outDir = '/Users/rajnishsingh/projects/knowledge-hub/redesign_screenshots';
if (!fs.existsSync(outDir)) fs.mkdirSync(outDir, { recursive: true });

async function run() {
  console.log('Starting preview server...');
  const server = spawn('npx', ['astro', 'preview', '--port', '4399'], {
    cwd: '/Users/rajnishsingh/projects/knowledge-hub',
    stdio: 'pipe'
  });

  // wait 2 seconds for server to start
  await new Promise(r => setTimeout(r, 2000));

  const browser = await chromium.launch();

  const pagesToTest = [
    { name: 'home', path: '/knowledge-hub/' },
    { name: 'topic_rag', path: '/knowledge-hub/topics/ai-agents-and-rag/' },
    { name: 'roadmap_dsa', path: '/knowledge-hub/roadmaps/dsa-placement/' },
    { name: 'design_system', path: '/knowledge-hub/design-system/' },
    { name: 'resources', path: '/knowledge-hub/resources/' }
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
        await pageL.goto(`http://localhost:4399${pageItem.path}`, { waitUntil: 'networkidle', timeout: 10000 });
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
        await pageD.goto(`http://localhost:4399${pageItem.path}`, { waitUntil: 'networkidle', timeout: 10000 });
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
  console.log('Preview server terminated. All redesign screenshots captured successfully.');
}

run().catch(e => {
  console.error(e);
  process.exit(1);
});
