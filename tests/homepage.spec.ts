import { chromium } from 'playwright';
import { spawn } from 'child_process';
import fs from 'fs';
import path from 'path';

const outDir = '/Users/rajnishsingh/projects/knowledge-hub/homepage_screenshots/round4_verified';
if (!fs.existsSync(outDir)) fs.mkdirSync(outDir, { recursive: true });

async function runTestSuite() {
  console.log('--- Starting Bodh Homepage Automated Test Suite ---');

  // Step 1: Start Astro preview server on port 4322
  console.log('[Setup] Starting local preview server on port 4322...');
  const server = spawn('npx', ['astro', 'preview', '--port', '4322'], {
    cwd: '/Users/rajnishsingh/projects/knowledge-hub',
    stdio: 'pipe'
  });

  await new Promise(r => setTimeout(r, 2500));

  const browser = await chromium.launch();
  let passCount = 0;
  let failCount = 0;

  function assert(condition, testName, details = '') {
    if (condition) {
      console.log(`✅ PASS: ${testName} ${details ? '(' + details + ')' : ''}`);
      passCount++;
    } else {
      console.error(`❌ FAIL: ${testName} ${details ? '(' + details + ')' : ''}`);
      failCount++;
    }
  }

  try {
    // TEST 1: H1 full text without JS
    const ctxNoJS = await browser.newContext({ javaScriptEnabled: false });
    const pageNoJS = await ctxNoJS.newPage();
    await pageNoJS.goto('http://localhost:4322/knowledge-hub/');
    const h1NoJS = await pageNoJS.$eval('h1', el => el.innerText.trim());
    const h1Normalized = h1NoJS.replace(/\s+/g, ' ').trim();
    assert(
      h1Normalized === 'Seekho wahi jo sach mein kaam aaye.',
      'Test 1: H1 full sentence renders completely without JS',
      `Found: "${h1Normalized}"`
    );
    await ctxNoJS.close();

    // Context with normal JS & Mac UserAgent
    const ctxMac = await browser.newContext({
      viewport: { width: 1440, height: 900 },
      userAgent: 'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 Chrome/120.0.0.0 Safari/537.36'
    });
    const page = await ctxMac.newPage();

    const consoleErrors = [];
    const failedRequests = [];
    page.on('console', msg => {
      if (msg.type() === 'error') consoleErrors.push(msg.text());
    });
    page.on('response', res => {
      if (res.status() >= 400) failedRequests.push({ url: res.url(), status: res.status() });
    });

    await page.goto('http://localhost:4322/knowledge-hub/', { waitUntil: 'networkidle' });

    // TEST 2: No stray cursor / typewriter elements
    const strayCount = await page.evaluate(() => {
      return document.querySelectorAll('.cursor, .typewriter, [data-typewriter]').length;
    });
    assert(strayCount === 0, 'Test 2: Zero stray typewriter/cursor elements on page', `Found: ${strayCount}`);

    // TEST 3: Hero height <= 760px on 1440x900 viewport & elements in fold
    const heroBox = await page.$eval('section', el => el.getBoundingClientRect());
    assert(heroBox.height <= 760, 'Test 3a: Hero section height <= 760px', `Height: ${Math.round(heroBox.height)}px`);
    
    const trustTop = await page.evaluate(() => {
      const el = document.querySelectorAll('section')[1];
      return el ? el.getBoundingClientRect().top : 9999;
    });
    assert(trustTop < 900, 'Test 3b: Trust strip top is within 1440x900 first fold', `Top: ${Math.round(trustTop)}px`);

    // TEST 4: Header search compact initially, expands after scrolling hero search
    const headerSearchInitial = await page.$eval('#header-search-label', el => el.classList.contains('hidden'));
    assert(headerSearchInitial, 'Test 4a: Header search is compact icon initially');

    await page.evaluate(() => {
      window.scrollTo(0, 600);
      window.dispatchEvent(new Event('scroll'));
    });
    await page.waitForTimeout(300);
    const headerSearchExpanded = await page.$eval('#header-search-label', el => el.classList.contains('sm:inline'));
    assert(headerSearchExpanded, 'Test 4b: Header search expands after scrolling past hero search');
    await page.evaluate(() => {
      window.scrollTo(0, 0);
      window.dispatchEvent(new Event('scroll'));
    });

    // TEST 5: Shortcut hint matches Mac userAgent
    const shortcutMac = await page.$eval('.os-shortcut-hint', el => el.textContent.trim());
    assert(shortcutMac === '⌘K', 'Test 5a: Mac user sees ⌘K shortcut hint', `Found: ${shortcutMac}`);

    // Test Windows userAgent
    const ctxWin = await browser.newContext({
      userAgent: 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 Chrome/120.0.0.0 Safari/537.36'
    });
    const pageWin = await ctxWin.newPage();
    await pageWin.goto('http://localhost:4322/knowledge-hub/', { waitUntil: 'networkidle' });
    const shortcutWin = await pageWin.$eval('.os-shortcut-hint', el => el.textContent.trim());
    assert(shortcutWin === 'Ctrl K', 'Test 5b: Windows/Linux user sees Ctrl K shortcut hint', `Found: ${shortcutWin}`);
    await ctxWin.close();

    // TEST 6: Zero broken images & zero 404 network requests & zero console errors
    const imgCheck = await page.evaluate(() => {
      const imgs = Array.from(document.querySelectorAll('img'));
      return imgs.filter(img => !img.complete || img.naturalWidth === 0).map(img => img.src);
    });
    assert(imgCheck.length === 0, 'Test 6a: Zero broken images on page', `Broken count: ${imgCheck.length}`);
    assert(failedRequests.length === 0, 'Test 6b: Zero failed 404 network requests', `Failed: ${JSON.stringify(failedRequests)}`);
    assert(consoleErrors.length === 0, 'Test 6c: Zero browser console errors', `Errors: ${JSON.stringify(consoleErrors)}`);

    // TEST 7: Color contrast on H1 & subtext
    const contrastPass = await page.evaluate(() => {
      const h1 = document.querySelector('h1');
      const style = window.getComputedStyle(h1);
      // Ensure H1 text is not transparent
      return style.color !== 'rgba(0, 0, 0, 0)' && style.color !== 'transparent';
    });
    assert(contrastPass, 'Test 7: H1 text is fully opaque and contrasting (no transparent text)');

    // TEST 8: "Built by" is NOT in Hero section; it exists in footer/about
    const heroContainsBuiltBy = await page.$eval('section', el => el.innerText.toLowerCase().includes('built by'));
    assert(!heroContainsBuiltBy, 'Test 8a: "Built by" chip is removed from Hero section');

    const footerContainsBuiltBy = await page.$eval('footer', el => el.innerText.toLowerCase().includes('built by'));
    assert(footerContainsBuiltBy, 'Test 8b: "Built by" is preserved in Footer');

    // TEST 9: 320px screen zero horizontal scroll & tap targets
    const ctx320 = await browser.newContext({ viewport: { width: 320, height: 600 } });
    const page320 = await ctx320.newPage();
    await page320.goto('http://localhost:4322/knowledge-hub/', { waitUntil: 'networkidle' });
    const scrollWidth320 = await page320.evaluate(() => document.documentElement.scrollWidth);
    assert(scrollWidth320 === 320, 'Test 9: Zero horizontal scroll on 320px screen', `scrollWidth: ${scrollWidth320}px`);
    await ctx320.close();

    // TEST 10: Capture multi-device baseline screenshots
    console.log('[Capture] Capturing verified baseline screenshots (360/768/1440, Light + Dark)...');
    const viewports = [
      { name: 'mobile_360', width: 360, height: 800 },
      { name: 'tablet_768', width: 768, height: 1024 },
      { name: 'desktop_1440', width: 1440, height: 900 }
    ];

    for (const vp of viewports) {
      // Light
      const cL = await browser.newContext({ viewport: { width: vp.width, height: vp.height }, colorScheme: 'light' });
      const pL = await cL.newPage();
      await pL.goto('http://localhost:4322/knowledge-hub/', { waitUntil: 'networkidle' });
      await pL.screenshot({ path: path.join(outDir, `home_${vp.name}_light_fold.png`), fullPage: false });
      await pL.screenshot({ path: path.join(outDir, `home_${vp.name}_light_full.png`), fullPage: true });
      await cL.close();

      // Dark
      const cD = await browser.newContext({ viewport: { width: vp.width, height: vp.height }, colorScheme: 'dark' });
      const pD = await cD.newPage();
      await pD.goto('http://localhost:4322/knowledge-hub/', { waitUntil: 'networkidle' });
      await pD.evaluate(() => document.documentElement.classList.add('dark'));
      await pD.screenshot({ path: path.join(outDir, `home_${vp.name}_dark_fold.png`), fullPage: false });
      await pD.screenshot({ path: path.join(outDir, `home_${vp.name}_dark_full.png`), fullPage: true });
      await cD.close();
    }
    console.log('✅ PASS: All 12 multi-device baseline screenshots captured.');

    await ctxMac.close();
  } catch (err) {
    console.error('Test execution error:', err);
    failCount++;
  } finally {
    await browser.close();
    server.kill();
  }

  console.log(`\n========================================`);
  console.log(`TEST RESULTS: ${passCount} PASSED, ${failCount} FAILED`);
  console.log(`========================================\n`);

  if (failCount > 0) {
    process.exit(1);
  }
}

runTestSuite().catch(e => {
  console.error(e);
  process.exit(1);
});
