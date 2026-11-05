const { chromium } = require('playwright');
const { spawn } = require('child_process');

async function runAnimationStudioTest() {
  console.log('=== Starting Peach UI Animation & Micro-Interactions Test Suite ===');

  const previewPort = 4333;
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

    const url = `http://localhost:${previewPort}/knowledge-hub/topics/ui-animation-micro-interactions/`;
    await page.goto(url, { waitUntil: 'networkidle' });

    // TEST 1: Page Title & Brand Integration
    const title = await page.title();
    assert(title.includes('UI Animation Prompting') && title.endsWith('| Peach'), 'Test 1: Topic page title follows brand format', `Title: "${title}"`);

    // TEST 2: Animation Prompt Builder
    const builderSection = await page.$('#animation-prompt-builder');
    assert(builderSection !== null, 'Test 2a: Animation Prompt Builder is rendered');

    const typeButtons = await page.$$('#anim-type-selector .anim-type-btn');
    assert(typeButtons.length === 6, 'Test 2b: All 6 animation type buttons rendered (Fade, Slide, Scale, Rotate, Blur, Pulse)', `Found: ${typeButtons.length}`);

    // Click SCALE button
    await page.click('button[data-type="scale"]');
    await page.waitForTimeout(100);

    const activeType = await page.$eval('#badge-anim-type', el => el.textContent.trim());
    assert(activeType.includes('SCALE'), 'Test 2c: Clicking Scale updates active badge', `Badge: "${activeType}"`);

    const promptText = await page.$eval('#anim-builder-prompt-text', el => el.textContent);
    assert(promptText.includes('scale-in animation'), 'Test 2d: Generated prompt updates with scale parameters');

    // Test duration slider
    await page.evaluate(() => {
      const slider = document.getElementById('anim-duration-input');
      slider.value = '750';
      slider.dispatchEvent(new Event('input', { bubbles: true }));
    });
    await page.waitForTimeout(100);

    const durationVal = await page.$eval('#anim-duration-val', el => el.textContent.trim());
    assert(durationVal === '750ms', 'Test 2e: Duration slider dynamically updates value', `Found: "${durationVal}"`);

    // TEST 3: Card & Button Motion Dynamics Lab
    const motionSection = await page.$('#card-button-motion-studio');
    assert(motionSection !== null, 'Test 3a: Card & Button Motion Lab is rendered');

    const cardPatterns = await page.$$('#cards-motion-grid > div');
    const btnPatterns = await page.$$('#buttons-motion-grid > div');
    assert(cardPatterns.length === 4, 'Test 3b: Exactly 4 card motion patterns rendered', `Found: ${cardPatterns.length}`);
    assert(btnPatterns.length === 4, 'Test 3c: Exactly 4 button micro-feedback patterns rendered', `Found: ${btnPatterns.length}`);

    // Test 3D Tilt Card mouse interaction
    const tiltCard = await page.$('#interactive-tilt-card');
    assert(tiltCard !== null, 'Test 3d: Interactive 3D tilt card is present');
    await tiltCard.scrollIntoViewIfNeeded();
    await tiltCard.hover({ position: { x: 20, y: 20 } });
    await page.waitForTimeout(100);
    const transform = await page.$eval('#interactive-tilt-card', el => el.style.transform);
    assert(transform.includes('rotateX') || transform.includes('perspective'), 'Test 3e: Tilt card dynamically calculates 3D transform on mousemove', `Found: "${transform}"`);

    // Test Ripple Button Click
    await page.click('#ripple-demo-button');
    await page.waitForTimeout(50);
    const rippleSpan = await page.$('#ripple-demo-button .ink-ripple');
    assert(rippleSpan !== null, 'Test 3f: Clicking ripple button injects coordinate-aware ink-ripple element');

    // TEST 4: Alert & Notification Motion System
    const alertSection = await page.$('#alert-notification-studio');
    assert(alertSection !== null, 'Test 4a: Alert & Notification System is rendered');

    // Trigger Slide Banner
    await page.click('button[data-type="slide-banner"]');
    await page.waitForTimeout(150);
    const topBanner = await page.$('#slot-top-banner .anim-slide-down');
    assert(topBanner !== null, 'Test 4b: Triggering slide banner injects top banner with anim-slide-down');

    // Trigger Shake Error
    await page.click('button[data-type="shake-error"]');
    await page.waitForTimeout(150);
    const shakeError = await page.$('#slot-top-banner .anim-shake-error');
    assert(shakeError !== null, 'Test 4c: Triggering shake error injects error alert with anim-shake-error');

    // Trigger Toast Progress
    await page.click('button[data-type="toast-progress"]');
    await page.waitForTimeout(150);
    const toastProgress = await page.$('#slot-bottom-toasts .anim-toast-enter');
    assert(toastProgress !== null, 'Test 4d: Triggering toast progress injects toast with countdown bar');

    // Trigger Stack Queue
    await page.click('button[data-type="stack-queue"]');
    await page.waitForTimeout(100);
    await page.click('button[data-type="stack-queue"]');
    await page.waitForTimeout(100);
    const stackedItems = await page.$$('#slot-bottom-toasts > div');
    assert(stackedItems.length >= 2, 'Test 4e: Triggering stack queue appends multiple notifications', `Found: ${stackedItems.length}`);

    // TEST 5: Sticky TOC Rail Links
    const tocBuilderLink = await page.$('aside a[href="#animation-prompt-builder"]');
    const tocMotionLink = await page.$('aside a[href="#card-button-motion-studio"]');
    const tocAlertLink = await page.$('aside a[href="#alert-notification-studio"]');
    assert(tocBuilderLink !== null && tocMotionLink !== null && tocAlertLink !== null, 'Test 5: Sticky TOC rail contains links to all 3 animation studios');

    // TEST 6: Zero Console Errors
    assert(consoleErrors.length === 0, 'Test 6: Zero console errors on topic page', `Errors: ${consoleErrors.join('; ') || 'None'}`);

  } catch (err) {
    console.error('Test runner exception:', err);
    failCount++;
  } finally {
    await browser.close();
    server.kill();
  }

  console.log(`\n=== Animation Studio Test Summary: ${passCount} Passed, ${failCount} Failed ===`);
  if (failCount > 0) {
    process.exit(1);
  }
}

runAnimationStudioTest();
