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
    const studioTocLinks = await page.$$('a[href^="#shadcn-registry-studio"], a[href^="#interactive-typography-studio"], a[href^="#component-prompt-templates"], a[href^="#device-mockups-studio"]');
    assert(studioTocLinks.length === 4, 'Test 7: Sticky TOC includes 4 dedicated links for interactive studios');

    // TEST 8: shadcn/ui Core Primitives Registry Studio Presence & Tabs
    const shadcnSection = await page.$('#shadcn-registry-studio');
    assert(shadcnSection !== null, 'Test 8a: shadcn/ui Registry Studio section is rendered');

    const primitiveTabs = await page.$$('#shadcn-primitive-tabs .shadcn-tab-btn');
    assert(primitiveTabs.length === 5, 'Test 8b: All 5 core primitive tabs (Dialog, Command, Form, Table, Sheet) rendered', `Found: ${primitiveTabs.length}`);

    // TEST 9: Interactive Dialog Primitive
    await page.click('button[data-primitive="dialog"]');
    await page.waitForTimeout(100);
    const dialogStageVisible = await page.$eval('#stage-primitive-dialog', el => !el.classList.contains('hidden'));
    assert(dialogStageVisible, 'Test 9a: Dialog interactive stage is active');

    await page.click('#open-dialog-demo-btn');
    await page.waitForTimeout(150);
    const modalVisible = await page.$eval('#demo-dialog-modal', el => !el.classList.contains('hidden'));
    assert(modalVisible, 'Test 9b: Open Dialog button reveals accessible modal popup');

    await page.click('#close-dialog-demo-btn');
    await page.waitForTimeout(150);
    const modalHidden = await page.$eval('#demo-dialog-modal', el => el.classList.contains('hidden'));
    assert(modalHidden, 'Test 9c: Close Dialog button hides modal dialog');

    // TEST 10: Interactive Command (cmdk) Filter
    await page.click('button[data-primitive="command"]');
    await page.waitForTimeout(100);
    await page.fill('#cmdk-filter-input', 'bento');
    await page.waitForTimeout(100);
    const cmdkItemsCount = await page.$$eval('#cmdk-items-list .cmdk-item', items => 
      items.filter(item => !item.classList.contains('hidden')).length
    );
    assert(cmdkItemsCount >= 1, 'Test 10: Command palette filters items matching query "bento"', `Matches: ${cmdkItemsCount}`);

    // TEST 11: Interactive Form + Zod Validation
    await page.click('button[data-primitive="form"]');
    await page.waitForTimeout(100);
    // Submit without input -> expect error
    await page.click('#zod-submit-btn');
    await page.waitForTimeout(100);
    const errorVisible = await page.$eval('#zod-email-error', el => !el.classList.contains('hidden'));
    assert(errorVisible, 'Test 11a: Empty Form submission triggers Zod email validation error message');

    // Submit with valid email
    await page.fill('#zod-email-input', 'alex@agency.design');
    await page.click('#zod-submit-btn');
    await page.waitForTimeout(100);
    const successVisible = await page.$eval('#zod-success-msg', el => !el.classList.contains('hidden'));
    assert(successVisible, 'Test 11b: Valid email submission triggers Zod success confirmation');

    // TEST 12: Interactive Sheet (Drawer)
    await page.click('button[data-primitive="sheet"]');
    await page.waitForTimeout(100);
    await page.click('#open-sheet-demo-btn');
    await page.waitForTimeout(100);
    const sheetVisible = await page.$eval('#demo-sheet-container', el => !el.classList.contains('hidden'));
    assert(sheetVisible, 'Test 12a: Open Sheet button triggers sliding drawer');

    await page.click('#close-sheet-demo-btn');
    await page.waitForTimeout(350);
    const sheetHidden = await page.$eval('#demo-sheet-container', el => el.classList.contains('hidden'));
    assert(sheetHidden, 'Test 12b: Close Sheet button slides drawer away and hides');

    // TEST 13: CLI command & Prompt Generator Output
    const cliCommandText = await page.$eval('#active-cli-command', el => el.textContent.trim());
    assert(cliCommandText.includes('npx shadcn@latest add sheet'), 'Test 13a: shadcn CLI command display updates for Sheet primitive', `Found: "${cliCommandText}"`);

    const promptDisplayText = await page.$eval('#shadcn-prompt-output', el => el.textContent);
    assert(promptDisplayText.includes('SheetContent') && promptDisplayText.includes('@radix-ui/react-dialog'), 'Test 13b: Generated prompt includes Radix primitives and accessible Sheet specs');

    // TEST 14: Zero Console Errors
    assert(consoleErrors.length === 0, 'Test 14: Zero console errors logged on interactive topic page', consoleErrors.join(' | '));

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
