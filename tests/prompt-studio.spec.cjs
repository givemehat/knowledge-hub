const { chromium } = require('playwright');
const { spawn } = require('child_process');

async function runPromptStudioTest() {
  console.log('=== Starting Peach AI UI Prompting Studio Test Suite ===');

  const previewPort = 4329;
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

    const url = `http://localhost:${previewPort}/knowledge-hub/topics/ai-ui-prompting-engineering/`;
    await page.goto(url, { waitUntil: 'networkidle' });

    // TEST 1: Page Title & Heading
    const title = await page.title();
    assert(title.includes('AI UI Prompting') && title.endsWith('| Peach'), 'Test 1: Topic page title follows brand pattern', `Title: "${title}"`);

    // TEST 2: Typography Studio Presence
    const studioSection = await page.$('#interactive-typography-studio');
    assert(studioSection !== null, 'Test 2a: Interactive Typography Studio is rendered');

    const fontButtons = await page.$$('#font-family-selector .font-btn');
    assert(fontButtons.length === 6, 'Test 2b: All 6 font family buttons rendered', `Found: ${fontButtons.length}`);

    // TEST 3: Dynamic Typography Slider Interaction
    await page.evaluate(() => {
      const slider = document.getElementById('heading-size-input');
      slider.value = '56';
      slider.dispatchEvent(new Event('input', { bubbles: true }));
    });
    await page.waitForTimeout(100);

    const headingFontSize = await page.$eval('#preview-heading', el => el.style.fontSize);
    assert(headingFontSize === '56px', 'Test 3a: Heading size slider dynamically updates preview element style', `Found: "${headingFontSize}"`);

    const promptText = await page.$eval('#generated-prompt-text', el => el.textContent);
    assert(promptText.includes('56px'), 'Test 3b: Generated prompt updates with selected size (56px)');
    assert(promptText.includes('Inter'), 'Test 3c: Generated prompt contains selected typeface');

    // TEST 4: Typeface Selection Switch
    await page.click('button[data-font="Plus Jakarta Sans"]');
    await page.waitForTimeout(100);

    const activeFontBadgeText = await page.$eval('#active-font-badge', el => el.textContent.trim());
    assert(activeFontBadgeText === 'Font: Plus Jakarta Sans', 'Test 4a: Font switch updates active badge', `Found: "${activeFontBadgeText}"`);

    const updatedPrompt = await page.$eval('#generated-prompt-text', el => el.textContent);
    assert(updatedPrompt.includes('Plus Jakarta Sans'), 'Test 4b: Prompt text reflects "Plus Jakarta Sans"');

    // TEST 5: Component Prompts Gallery
    const promptCards = await page.$$('#component-prompts-gallery .copy-component-prompt-btn');
    assert(promptCards.length === 6, 'Test 5: Component Prompt Gallery renders 6 copyable prompt cards', `Found: ${promptCards.length}`);

    // TEST 6: Device Framing Studio Tabs
    const desktopView = await page.$('#frame-view-desktop');
    assert(desktopView !== null, 'Test 6a: macOS Browser frame view is rendered');

    // Click mobile tab
    await page.click('#frame-tab-mobile');
    await page.waitForTimeout(150);

    const mobileVisible = await page.$eval('#frame-view-mobile', el => !el.classList.contains('hidden'));
    const desktopHidden = await page.$eval('#frame-view-desktop', el => el.classList.contains('hidden'));
    assert(mobileVisible && desktopHidden, 'Test 6b: Mobile frame tab activates iPhone 16 Pro view and hides desktop view');

    // Click desktop tab back
    await page.click('#frame-tab-desktop');
    await page.waitForTimeout(150);

    const desktopVisible = await page.$eval('#frame-view-desktop', el => !el.classList.contains('hidden'));
    assert(desktopVisible, 'Test 6c: Desktop tab switches back to macOS browser frame');

    // TEST 7: Left Sticky Table of Contents Links
    const studioTocLinks = await page.$$('a[href^="#interactive-typography-studio"], a[href^="#component-prompt-templates"], a[href^="#device-mockups-studio"]');
    assert(studioTocLinks.length === 3, 'Test 7: Sticky TOC includes 3 dedicated links for interactive studios');

    // TEST 8: Zero Console Errors
    assert(consoleErrors.length === 0, 'Test 8: Zero console errors logged on interactive topic page', consoleErrors.join(' | '));

    await context.close();
  } catch (err) {
    console.error('Fatal error in Prompt Studio test:', err);
    failCount++;
  } finally {
    await browser.close();
    server.kill();
  }

  console.log(`\n=== Prompt Studio Test Summary: ${passCount} Passed, ${failCount} Failed ===`);
  if (failCount > 0) process.exit(1);
}

runPromptStudioTest();
