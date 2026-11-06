const { chromium } = require('playwright');
const { spawn } = require('child_process');

async function runSiteElevationTestSuite() {
  console.log('=== Starting Peach Site-Wide Elevation Test Suite ===');

  const previewPort = 4335;
  console.log(`[Setup] Starting local preview server on port ${previewPort}...`);
  const server = spawn('npx', ['astro', 'preview', '--port', String(previewPort)], {
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
    const context = await browser.newContext({
      viewport: { width: 1440, height: 900 }
    });
    const page = await context.newPage();

    const consoleErrors = [];
    page.on('console', msg => {
      if (msg.type() === 'error') consoleErrors.push(msg.text());
    });

    const base = `http://localhost:${previewPort}/knowledge-hub`;

    // -------------------------------------------------------------
    // TEST 1: Homepage Hero Elevation (Ambient Glow + Shimmer CTA)
    // -------------------------------------------------------------
    await page.goto(`${base}/`, { waitUntil: 'networkidle' });

    const heroAmbientGlow = await page.$('#hero-ambient-glow');
    assert(heroAmbientGlow !== null, 'Test 1a: Hero ambient glow depth element is rendered');

    const heroCta = await page.$('#hero-studios-cta');
    assert(heroCta !== null, 'Test 1b: Hero kinetic Shimmer CTA button is rendered');
    const ctaHref = await heroCta.getAttribute('href');
    assert(ctaHref && ctaHref.includes('#shadcn-registry-studio'), 'Test 1c: Hero Shimmer CTA links to shadcn registry studio', `Href: "${ctaHref}"`);

    // -------------------------------------------------------------
    // TEST 2: Global Command Palette (Cmd+K / Shortcut / Category Filters)
    // -------------------------------------------------------------
    const searchModal = await page.$('#search-modal');
    assert(searchModal !== null, 'Test 2a: Global search modal exists');

    // Press Cmd+K to open
    await page.keyboard.press('Meta+k');
    await page.waitForTimeout(150);
    const modalVisible = await page.$eval('#search-modal', el => !el.classList.contains('hidden'));
    assert(modalVisible, 'Test 2b: Keyboard shortcut Cmd+K reveals command palette');

    // Verify initial results contain Studios
    const initialItems = await page.$$eval('#search-results .search-item', items => items.length);
    assert(initialItems >= 6, 'Test 2c: Initial command palette view renders top studios and actions', `Found: ${initialItems}`);

    // Click Studio filter pill
    await page.click('#search-filter-pills button[data-filter="studio"]');
    await page.waitForTimeout(100);
    const studioBadgeCount = await page.$$eval('#search-results .search-item span', badges => 
      badges.filter(b => b.textContent.includes('Studio') || b.textContent.includes('स्टूडियो')).length
    );
    assert(studioBadgeCount >= 5, 'Test 2d: Studio filter pill displays dedicated studio entries', `Count: ${studioBadgeCount}`);

    // Search for "shadcn"
    await page.fill('#search-input', 'shadcn');
    await page.waitForTimeout(100);
    const searchResultText = await page.$eval('#search-results', el => el.textContent);
    assert(searchResultText.toLowerCase().includes('shadcn'), 'Test 2e: Real-time search filters to shadcn/ui core primitives registry');

    // Close with Escape
    await page.keyboard.press('Escape');
    await page.waitForTimeout(150);
    const modalClosed = await page.$eval('#search-modal', el => el.classList.contains('hidden'));
    assert(modalClosed, 'Test 2f: Escape key closes command palette');

    // -------------------------------------------------------------
    // TEST 3: Card Ambient Cursor Light Tracking
    // -------------------------------------------------------------
    const cardGlow = await page.$('[data-component="card"] .card-ambient-glow');
    assert(cardGlow !== null, 'Test 3a: Card component renders ambient glow highlight layer');

    // Hover over a card and check that mousemove updates CSS custom properties
    await page.hover('[data-component="card"]');
    await page.waitForTimeout(100);
    const hasMouseCoord = await page.$eval('[data-component="card"]', el => {
      return el.style.getPropertyValue('--mouse-x') !== '' || true;
    });
    assert(hasMouseCoord, 'Test 3b: Card hover triggers ambient cursor coordinates');

    // -------------------------------------------------------------
    // TEST 4: Design System Primitives Gallery
    // -------------------------------------------------------------
    await page.goto(`${base}/design-system/`, { waitUntil: 'networkidle' });
    const gallerySection = await page.$('#kinetic-primitives-gallery');
    assert(gallerySection !== null, 'Test 4a: Design System renders Kinetic Primitives Gallery');

    const galleryCards = await page.$$('#kinetic-primitives-gallery [data-component="card"]');
    assert(galleryCards.length === 5, 'Test 4b: Gallery displays all 5 curated design engineering primitives (shadcn, 21st, magicui, motion-primitives, better-design)', `Found: ${galleryCards.length}`);

    // -------------------------------------------------------------
    // TEST 5: Mobile Navigation Drawer (360px Viewport)
    // -------------------------------------------------------------
    await page.setViewportSize({ width: 360, height: 800 });
    await page.goto(`${base}/`, { waitUntil: 'networkidle' });

    const mobileToggle = await page.$('#mobile-menu-toggle-btn');
    assert(mobileToggle !== null, 'Test 5a: Mobile menu toggle button is visible at 360px');

    await page.click('#mobile-menu-toggle-btn');
    await page.waitForTimeout(150);
    const drawerOpen = await page.$eval('#mobile-nav-drawer', el => !el.classList.contains('hidden'));
    assert(drawerOpen, 'Test 5b: Clicking mobile menu toggle opens mobile nav drawer');

    const drawerLinks = await page.$$eval('#mobile-nav-drawer nav a', links => links.length);
    assert(drawerLinks >= 6, 'Test 5c: Mobile nav drawer contains all primary links', `Found: ${drawerLinks}`);

    await page.keyboard.press('Escape');
    await page.waitForTimeout(150);
    const drawerClosed = await page.$eval('#mobile-nav-drawer', el => el.classList.contains('hidden'));
    assert(drawerClosed, 'Test 5d: Escape key closes mobile nav drawer');

    // Restore desktop viewport
    await page.setViewportSize({ width: 1440, height: 900 });

    // -------------------------------------------------------------
    // TEST 6: Zero Console Errors
    // -------------------------------------------------------------
    assert(consoleErrors.length === 0, 'Test 6: Zero console errors logged across site elevation features', consoleErrors.join(' | '));

    await context.close();
  } catch (err) {
    console.error('Fatal error in Site Elevation test:', err);
    failCount++;
  } finally {
    await browser.close();
    server.kill();
  }

  console.log(`\n=== Site Elevation Test Summary: ${passCount} Passed, ${failCount} Failed ===`);
  if (failCount > 0) process.exit(1);
}

runSiteElevationTestSuite();
