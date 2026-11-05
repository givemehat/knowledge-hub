import { chromium } from 'playwright';
import fs from 'fs';
import path from 'path';

const outDir = '/Users/rajnishsingh/projects/knowledge-hub/audit_screenshots';
if (!fs.existsSync(outDir)) fs.mkdirSync(outDir, { recursive: true });

const pagesToCapture = [
  { name: 'home', url: 'https://givemehat.github.io/knowledge-hub/' },
  { name: 'topic-llm', url: 'https://givemehat.github.io/knowledge-hub/topics/llms-how-they-work/' },
  { name: 'roadmap-dsa', url: 'https://givemehat.github.io/knowledge-hub/roadmaps/dsa-placement/' }
];

const viewports = [
  { name: '360px', width: 360, height: 780 },
  { name: '768px', width: 768, height: 1024 },
  { name: '1440px', width: 1440, height: 900 }
];

async function capture() {
  const browser = await chromium.launch();
  
  for (const pageInfo of pagesToCapture) {
    for (const vp of viewports) {
      // Light Mode
      const ctxLight = await browser.newContext({
        viewport: { width: vp.width, height: vp.height },
        colorScheme: 'light'
      });
      const pageL = await ctxLight.newPage();
      try {
        await pageL.goto(pageInfo.url, { waitUntil: 'networkidle', timeout: 30000 });
        const pathL = path.join(outDir, `audit_${pageInfo.name}_${vp.name}_light.png`);
        await pageL.screenshot({ path: pathL, fullPage: false });
        console.log(`Saved: ${pathL}`);
      } catch (e) {
        console.error(`Error capturing ${pageInfo.name} ${vp.name} light:`, e.message);
      }
      await ctxLight.close();

      // Dark Mode
      const ctxDark = await browser.newContext({
        viewport: { width: vp.width, height: vp.height },
        colorScheme: 'dark'
      });
      const pageD = await ctxDark.newPage();
      try {
        await pageD.goto(pageInfo.url, { waitUntil: 'networkidle', timeout: 30000 });
        // Trigger dark class if not auto applied
        await pageD.evaluate(() => document.documentElement.classList.add('dark'));
        const pathD = path.join(outDir, `audit_${pageInfo.name}_${vp.name}_dark.png`);
        await pageD.screenshot({ path: pathD, fullPage: false });
        console.log(`Saved: ${pathD}`);
      } catch (e) {
        console.error(`Error capturing ${pageInfo.name} ${vp.name} dark:`, e.message);
      }
      await ctxDark.close();
    }
  }

  await browser.close();
  console.log('All baseline screenshots captured successfully!');
}

capture();
