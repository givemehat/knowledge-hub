const { chromium } = require('playwright');
const { spawn } = require('child_process');

async function runTypographyStudioTest() {
  console.log('=== Starting Peach Typography Prompting & Font Pairing Test Suite ===');

  const previewPort = 4331;
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
      if (msg.type === 'error') consoleErrors.push(msg.text());
    });

    const url = `http://localhost:${previewPort}/knowledge-hub/topics/typography-prompting-font-pairing/`;
    await page.goto(url, { waitUntil: 'networkidle' });

    // TEST 1: Page Title & Brand Integration
    const title = await page.title();
    assert(title.includes('Typography Prompting') && title.endsWith('| Peach'), 'Test 1: Topic page title follows brand format', `Title: "${title}"`);

    // TEST 2: Font Pairing Matrix & Presets
    const matrixSection = await page.$('#font-pairing-matrix');
    assert(matrixSection !== null, 'Test 2a: Interactive Font Pairing Matrix is rendered');

    const presetCards = await page.$$('#pairing-presets-list .pairing-preset-card');
    assert(presetCards.length === 4, 'Test 2b: All 4 classic font pairing presets rendered', `Found: ${presetCards.length}`);

    // Click Grotesque + Sans Preset
    await page.click('button[data-preset="grotesque-sans"]');
    await page.waitForTimeout(150);

    const activeBadgeText = await page.$eval('#active-pairing-badge', el => el.textContent.trim());
    assert(activeBadgeText.includes('Bricolage Grotesque'), 'Test 2c: Clicking Grotesque preset updates active badge', `Badge: "${activeBadgeText}"`);

    const headingFont = await page.$eval('#pairing-heading', el => el.style.fontFamily);
    assert(headingFont.includes('Bricolage Grotesque'), 'Test 2d: Heading preview switches to Bricolage Grotesque', `Font: "${headingFont}"`);

    const promptText = await page.$eval('#pairing-prompt-text', el => el.textContent);
    assert(promptText.includes('Bricolage Grotesque') && promptText.includes('Inter'), 'Test 2e: Prompt output updates with chosen pairing tokens');

    // TEST 3: Text Animation Studio (6 Playgrounds)
    const animSection = await page.$('#text-animation-studio');
    assert(animSection !== null, 'Test 3a: Text Animation Studio is rendered');

    const animCards = await page.$$('#animations-grid .animation-card');
    assert(animCards.length === 6, 'Test 3b: Exactly 6 text animation playgrounds rendered', `Found: ${animCards.length}`);

    // Verify Reduced Motion Simulator
    await page.click('#toggle-reduced-motion-btn');
    await page.waitForTimeout(100);

    const isReducedActive = await page.$eval('#text-animation-studio', el => el.classList.contains('reduced-motion-active'));
    assert(isReducedActive, 'Test 3c: Reduced motion simulation toggle adds active accessible class');

    // Toggle reduced motion back off
    await page.click('#toggle-reduced-motion-btn');
    await page.waitForTimeout(100);
    const isReducedOff = await page.$eval('#text-animation-studio', el => !el.classList.contains('reduced-motion-active'));
    assert(isReducedOff, 'Test 3d: Reduced motion simulation can be toggled off');

    // TEST 4: 4 Real-World Scenario Presets
    const scenarioSection = await page.$('#scenario-prompt-presets');
    assert(scenarioSection !== null, 'Test 4a: Scenario Prompt Presets section is rendered');

    const scenarioCards = await page.$$('#scenario-cards-grid .scenario-card');
    assert(scenarioCards.length === 4, 'Test 4b: All 4 real-world scenario cards rendered', `Found: ${scenarioCards.length}`);

    // TEST 5: Table of Contents navigation links
    const tocMatrixLink = await page.$('aside a[href="#font-pairing-matrix"]');
    const tocAnimLink = await page.$('aside a[href="#text-animation-studio"]');
    const tocScenarioLink = await page.$('aside a[href="#scenario-presets"]');
    assert(tocMatrixLink !== null && tocAnimLink !== null && tocScenarioLink !== null, 'Test 5: Sticky TOC rail contains quick links to all 3 studios');

    // TEST 6: Zero Console Errors
    assert(consoleErrors.length === 0, 'Test 6: Zero console errors on topic page', `Errors: ${consoleErrors.join('; ') || 'None'}`);

  } catch (err) {
    console.error('Test runner exception:', err);
    failCount++;
  } finally {
    await browser.close();
    server.kill();
  }

  console.log(`\n=== Typography Studio Test Summary: ${passCount} Passed, ${failCount} Failed ===`);
  if (failCount > 0) {
    process.exit(1);
  }
}

runTypographyStudioTest();
