import { chromium } from 'playwright';
import { spawn } from 'child_process';

async function verify() {
  console.log('Starting preview server...');
  const server = spawn('npx', ['astro', 'preview', '--port', '4366'], {
    cwd: '/Users/rajnishsingh/projects/knowledge-hub',
    stdio: 'pipe'
  });

  await new Promise(r => setTimeout(r, 2500));
  const browser = await chromium.launch();

  // Test 1: 320px screen horizontal overflow test
  const page320 = await browser.newPage({ viewport: { width: 320, height: 600 } });
  await page320.goto('http://localhost:4366/knowledge-hub/', { waitUntil: 'networkidle' });
  const scrollWidth = await page320.evaluate(() => document.documentElement.scrollWidth);
  console.log(`320px test: window width = 320, scrollWidth = ${scrollWidth}`);
  if (scrollWidth > 320) {
    console.error('FAIL: Horizontal overflow detected on 320px screen!');
  } else {
    console.log('PASS: Zero horizontal overflow on 320px screen.');
  }

  // Test 2: H1 rendered without JS
  const contextNoJS = await browser.newContext({ javaScriptEnabled: false });
  const pageNoJS = await contextNoJS.newPage();
  await pageNoJS.goto('http://localhost:4366/knowledge-hub/');
  const h1Text = await pageNoJS.$eval('h1', el => el.textContent.trim());
  console.log('No-JS H1 text:', h1Text);
  if (!h1Text.includes('Seekho wahi jo sach mein kaam aaye')) {
    console.error('FAIL: H1 is broken without JS!');
  } else {
    console.log('PASS: H1 renders completely without JS!');
  }

  // Test 3: Check for unwanted jargon words on the page
  const pageContent = await page320.content();
  const forbidden = ["Hick's Law", "cognitive fatigue", "STRUCTURED EXPLORATION", "100% Static & Free"];
  for (const word of forbidden) {
    if (pageContent.includes(word)) {
      console.error(`FAIL: Forbidden word "${word}" found in homepage markup!`);
    } else {
      console.log(`PASS: Forbidden word "${word}" is absent.`);
    }
  }

  // Test 4: First fold check on 1440x900
  const page1440 = await browser.newPage({ viewport: { width: 1440, height: 900 } });
  await page1440.goto('http://localhost:4366/knowledge-hub/', { waitUntil: 'networkidle' });
  
  // Get bounding box of Bento grid header
  const bentoHeadingY = await page1440.evaluate(() => {
    const heading = document.querySelector('h2');
    return heading ? heading.getBoundingClientRect().top : null;
  });
  console.log('Bento heading position relative to viewport:', bentoHeadingY);
  if (bentoHeadingY && bentoHeadingY <= 900) {
    console.log('PASS: Bento grid heading is within the 1440x900 first fold view!');
  } else {
    console.log(`NOTE: Bento heading at ${bentoHeadingY}px`);
  }

  await browser.close();
  server.kill();
  console.log('All automated checks completed!');
}

verify().catch(e => {
  console.error(e);
  process.exit(1);
});
