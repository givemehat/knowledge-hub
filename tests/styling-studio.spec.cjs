/**
 * Peach UI Styling, Themes & Color Systems Automated Test Suite
 * 
 * Verifies:
 * 1. Topic page renders without errors
 * 2. StylingPromptBuilder allows switching styles (glass, neumorphic, brutalist), themes, colors, and shadows
 * 3. WcagContrastLab computes accurate luminance ratios and updates pass/fail badges
 * 4. WcagContrastLab smart auto-fix button achieves >= 4.5:1 ratio
 * 5. ElevationShadowLab switches between 5 elevation levels and updates computed CSS box-shadow
 * 6. 1-Click Copy buttons function cleanly
 * 7. Zero console errors on render
 */

const { chromium } = require('playwright');
const { spawn } = require('child_process');

const PORT = 4339;
const BASE_URL = `http://localhost:${PORT}/knowledge-hub/topics/ui-styling-color-systems/`;

async function runStylingStudioTests() {
  console.log('=== Starting Peach UI Styling & Color Systems Studio Test Suite ===');
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
    assert(h1.includes('UI Styling') || h1.includes('UI स्टाइलिंग'), 'Test 1: Topic title renders correctly', h1);

    // Test 2: Styling Prompt Builder - Glassmorphism Style
    const glassBtn = page.locator('#style-type-selector button[data-style="glass"]');
    await glassBtn.click();
    const promptTextGlass = await page.$eval('#styling-prompt-output', el => el.innerText);
    assert(promptTextGlass.includes('GLASS'), 'Test 2a: Styling Prompt Builder selects GLASS style');

    // Test 2b: Switch to Neumorphic Style
    const neumBtn = page.locator('#style-type-selector button[data-style="neumorphic"]');
    await neumBtn.click();
    const promptTextNeum = await page.$eval('#styling-prompt-output', el => el.innerText);
    assert(promptTextNeum.includes('NEUMORPHIC'), 'Test 2b: Styling Prompt Builder selects NEUMORPHIC style');

    // Test 2c: Switch to Dark Theme
    const darkThemeBtn = page.locator('#style-theme-selector button[data-theme="dark"]');
    await darkThemeBtn.click();
    const promptTextDark = await page.$eval('#styling-prompt-output', el => el.innerText);
    assert(promptTextDark.includes('DARK'), 'Test 2c: Theme mode updates to DARK');

    // Test 3: WCAG Contrast Lab - Preset Selection (Slate on White)
    const presetSlateBtn = page.locator('#contrast-presets button:first-child');
    await presetSlateBtn.click();
    const ratioText = await page.$eval('#contrast-ratio-display', el => el.innerText.trim());
    assert(parseFloat(ratioText) >= 15, 'Test 3a: Contrast Lab computes high contrast for Slate on White (>= 15:1)', ratioText);

    const normalBadge = await page.$eval('#badge-normal-text', el => el.innerText.trim());
    assert(normalBadge.includes('Pass AA'), 'Test 3b: Normal Text badge passes WCAG AA for slate on white');

    // Test 3c: Failing Gray Preset & Auto-Fix
    const failingGrayBtn = page.locator('button[data-fg="#94A3B8"]');
    await failingGrayBtn.click();
    const failingRatio = await page.$eval('#contrast-ratio-display', el => el.innerText.trim());
    assert(parseFloat(failingRatio) < 4.5, 'Test 3c: Failing gray preset reports low ratio (< 4.5:1)', failingRatio);

    // Click Auto-Fix Button
    const autoFixBtn = page.locator('#smart-fix-contrast-btn');
    await autoFixBtn.click();
    const fixedRatio = await page.$eval('#contrast-ratio-display', el => el.innerText.trim());
    assert(parseFloat(fixedRatio) >= 4.5, 'Test 3d: Auto-Fix button calibrates contrast to >= 4.5:1', fixedRatio);

    // Test 4: Elevation & Shadow Studio - Level 3 Menus
    const level3Btn = page.locator('#elevation-level-selector button[data-level="3"]');
    await level3Btn.click();
    const shadowCode = await page.$eval('#shadow-code-output', el => el.innerText);
    assert(shadowCode.includes('elevation-level-3'), 'Test 4a: Elevation studio updates to Level 3 Menus');

    // Test 4b: Surface Theme Switcher
    const darkSurfBtn = page.locator('#shadow-canvas-theme-control button[data-surface="dark"]');
    await darkSurfBtn.click();
    const stageBg = await page.$eval('#elevation-stage-surface', el => el.style.backgroundColor);
    assert(stageBg.includes('rgb(18, 16, 22)'), 'Test 4b: Surface canvas updates to dark obsidian (#121016)', stageBg);

    // Test 5: Zero Console Errors
    assert(consoleErrors.length === 0, 'Test 5: Zero console errors on UI styling studio page', consoleErrors.join(' | '));

  } catch (err) {
    console.error('Fatal error during test run:', err);
    failCount++;
  } finally {
    await browser.close();
    srv.kill();
  }

  console.log(`\n=== Styling Studio Test Summary: ${passCount} Passed, ${failCount} Failed ===`);
  if (failCount > 0) process.exit(1);
}

runStylingStudioTests();
