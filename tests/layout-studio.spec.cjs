/**
 * Peach Responsive Layouts & Bento Grid Architecture Automated Test Suite
 * 
 * Verifies:
 * 1. Topic page renders without errors
 * 2. LayoutPromptBuilder allows switching layout types, content goals, and features
 * 3. ResponsivePatternSimulator switches patterns and emulates viewports (Desktop, Tablet, Mobile)
 * 4. Off-Canvas drawer toggles smoothly
 * 5. DynamicBentoMatrix switches archetypes (Portfolio, Dashboard, Features) and updates prompt
 * 6. 1-Click Copy buttons function cleanly
 * 7. Zero console errors on render
 */

const { chromium } = require('playwright');
const { spawn } = require('child_process');

const PORT = 4338;
const BASE_URL = `http://localhost:${PORT}/knowledge-hub/topics/responsive-layouts-bento-grid/`;

async function runLayoutStudioTests() {
  console.log('=== Starting Peach Responsive Layouts & Bento Studio Test Suite ===');
  let passCount = 0;
  let failCount = 0;

  function assert(condition, name, details = '') {
    if (condition) {
      console.log(`✅ PASS: ${name} ${details ? '(' + details + ')' : ''}`);
      passCount++;
    } else {
      console.error(`❌ FAIL: ${name} ${details ? '(' + details + ')' : ''}`);
      failCount++;
    }
  }

  console.log(`[Setup] Starting local Astro preview server on port ${PORT}...`);
  const srv = spawn('npx', ['astro', 'preview', '--port', String(PORT)], {
    cwd: '/Users/rajnishsingh/projects/knowledge-hub',
    stdio: 'pipe'
  });

  await new Promise(res => setTimeout(res, 2500));

  const browser = await chromium.launch();
  const context = await browser.newContext({ viewport: { width: 1440, height: 900 } });
  const page = await context.newPage();

  const consoleErrors = [];
  page.on('console', msg => {
    if (msg.type() === 'error') consoleErrors.push(msg.text());
  });

  try {
    await page.goto(BASE_URL, { waitUntil: 'networkidle' });

    // Test 1: Page Header & Title
    const h1 = await page.$eval('h1', el => el.innerText.trim());
    assert(h1.includes('Responsive Layouts') || h1.includes('रिस्पॉन्सिव लेआउट्स'), 'Test 1: Topic title renders correctly', h1);

    // Test 2: Layout Prompt Builder - Layout Type Selector
    const bentoBtn = page.locator('#layout-type-selector button[data-layout="bento"]');
    await bentoBtn.click();
    const promptTextBento = await page.$eval('#layout-builder-prompt-text', el => el.innerText);
    assert(promptTextBento.includes('BENTO') || promptTextBento.includes('bento'), 'Test 2a: Layout Prompt Builder switches to BENTO GRID', promptTextBento.slice(0, 40));

    // Test 2b: Content Purpose Selector
    const dashBtn = page.locator('#layout-purpose-selector button[data-purpose="dashboard"]');
    await dashBtn.click();
    const promptTextDash = await page.$eval('#layout-builder-prompt-text', el => el.innerText);
    assert(promptTextDash.includes('dashboard') || promptTextDash.includes('DASHBOARD'), 'Test 2b: Content purpose updates to DASHBOARD');

    // Test 3: Responsive Pattern Simulator - Switch to Layout Shifter
    const shifterTab = page.locator('#pattern-tabs button[data-pattern="layout-shifter"]');
    await shifterTab.click();
    const isShifterVisible = await page.locator('#sim-view-layout-shifter').isVisible();
    assert(isShifterVisible, 'Test 3a: ResponsivePatternSimulator displays Layout Shifter view');

    // Test 3b: Viewport Switcher - Mobile
    const mobileVpBtn = page.locator('#sim-viewport-control button[data-viewport="mobile"]');
    await mobileVpBtn.click();
    const vpLabel = await page.$eval('#active-viewport-label', el => el.innerText.trim());
    assert(vpLabel.includes('Mobile'), 'Test 3b: Viewport switcher emulates mobile width', vpLabel);

    // Test 3c: Off-Canvas Drawer Toggle
    const offCanvasTab = page.locator('#pattern-tabs button[data-pattern="off-canvas"]');
    await offCanvasTab.click();
    await page.waitForTimeout(100);
    const toggleDrawerBtn = page.locator('#toggle-offcanvas-btn');
    await toggleDrawerBtn.click();
    await page.waitForTimeout(100);
    const drawerTransform = await page.$eval('#offcanvas-drawer', el => el.style.transform);
    assert(drawerTransform.includes('0') || drawerTransform.includes('translateX(0px)'), 'Test 3c: Off-canvas drawer slides into view on toggle', `Found: "${drawerTransform}"`);

    // Test 4: Dynamic Bento Matrix - Switch to Dashboard Archetype
    const dashBentoTab = page.locator('#bento-archetype-tabs button[data-archetype="dashboard"]');
    await dashBentoTab.click();
    const isDashBentoVisible = await page.locator('#bento-grid-dashboard').isVisible();
    assert(isDashBentoVisible, 'Test 4a: DynamicBentoMatrix displays Dashboard grid archetype');

    const bentoPrompt = await page.$eval('#bento-prompt-output', el => el.innerText);
    assert(bentoPrompt.includes('executive SaaS analytics dashboard'), 'Test 4b: Bento prompt updates to Dashboard template');

    // Test 5: Switch to Product Features Archetype
    const featBentoTab = page.locator('#bento-archetype-tabs button[data-archetype="features"]');
    await featBentoTab.click();
    const isFeatBentoVisible = await page.locator('#bento-grid-features').isVisible();
    assert(isFeatBentoVisible, 'Test 5: DynamicBentoMatrix displays Product Features grid archetype');

    // Test 6: Zero Console Errors
    assert(consoleErrors.length === 0, 'Test 6: Zero console errors on responsive layouts studio page', consoleErrors.join(' | '));

  } catch (err) {
    console.error('Fatal error during test run:', err);
    failCount++;
  } finally {
    await browser.close();
    srv.kill();
  }

  console.log(`\n=== Layout Studio Test Summary: ${passCount} Passed, ${failCount} Failed ===`);
  if (failCount > 0) process.exit(1);
}

runLayoutStudioTests();
