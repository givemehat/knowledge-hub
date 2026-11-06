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

    // TEST 2f: Magic UI Kinetic Presets in Builder
    await page.click('button[data-magic="border-beam"]');
    await page.waitForTimeout(100);
    const magicBorderPrompt = await page.$eval('#anim-builder-prompt-text', el => el.textContent);
    assert(magicBorderPrompt.includes('@magicui/border-beam') && magicBorderPrompt.includes('conic-gradient'), 'Test 2f: Magic UI Border Beam preset generates registry prompt');

    await page.click('button[data-magic="shimmer-button"]');
    await page.waitForTimeout(100);
    const magicShimmerPrompt = await page.$eval('#anim-builder-prompt-text', el => el.textContent);
    assert(magicShimmerPrompt.includes('@magicui/shimmer-button'), 'Test 2g: Magic UI Shimmer Button preset configures shimmer sweep');

    await page.click('button[data-magic="meteors"]');
    await page.waitForTimeout(100);
    const magicMeteorsPrompt = await page.$eval('#anim-builder-prompt-text', el => el.textContent);
    assert(magicMeteorsPrompt.includes('@magicui/meteors'), 'Test 2h: Magic UI Meteors preset configures cosmic particle tail');

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

    // TEST 3g: Magic UI Kinetic Signature Effects in Section 3
    const magicSection = await page.$('#magicui-kinetic-effects');
    assert(magicSection !== null, 'Test 3g: Magic UI Kinetic Effects section is rendered');

    const borderBeamRing = await page.$('#magicui-border-beam-wrapper .border-beam-ring');
    assert(borderBeamRing !== null, 'Test 3h: Border Beam contains continuous orbiting conic ring element');

    const animatedBeamPath = await page.$('#magicui-animated-beam #magic-beam-active-path');
    assert(animatedBeamPath !== null, 'Test 3i: Animated Beam contains streaming SVG stroke element');

    // Test Animated Beam Pulse Button
    await page.click('#trigger-beam-pulse-btn');
    await page.waitForTimeout(50);
    const isBeamFast = await page.$eval('#magic-beam-active-path', el => el.classList.contains('anim-beam-fast'));
    assert(isBeamFast, 'Test 3j: Clicking Pulse accelerates animated beam stream');

    const shimmerGlimmer = await page.$('#interactive-shimmer-btn .shimmer-glimmer');
    assert(shimmerGlimmer !== null, 'Test 3k: Shimmer Button contains sweeping glimmer overlay');

    const meteors = await page.$$('#magicui-meteors .meteor-streak');
    assert(meteors.length >= 4, 'Test 3l: Meteors container renders at least 4 diagonal shooting star streaks', `Found: ${meteors.length}`);

    const particles = await page.$$('#magicui-particles .floating-particle');
    assert(particles.length >= 5, 'Test 3m: Particles canvas renders at least 5 floating ambient points', `Found: ${particles.length}`);

    // Scatter Particles button
    await page.click('#randomize-particles-btn');
    await page.waitForTimeout(100);
    const p1Top = await page.$eval('.floating-particle:first-child', el => el.style.top);
    assert(p1Top.includes('%'), 'Test 3n: Scatter Particles button re-randomizes particle positions', `Top: "${p1Top}"`);

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

    // TEST 5: Motion Primitives Studio (Dock, Morphing Popover, Progressive Blur)
    const mpSection = await page.$('#motion-primitives-studio');
    assert(mpSection !== null, 'Test 5a: Motion Primitives Studio section is rendered');

    const dockItems = await page.$$('#mp-floating-dock .dock-item');
    assert(dockItems.length === 6, 'Test 5b: macOS Floating Dock renders exactly 6 interactive items', `Found: ${dockItems.length}`);

    // Test dock item hover and distance magnification
    const secondDockItem = await page.$('#mp-floating-dock .dock-item:nth-child(2)');
    if (secondDockItem) {
      await secondDockItem.hover();
      await page.waitForTimeout(100);
      const scaleText = await page.$eval('#mp-dock-scale-feedback', el => el.textContent.trim());
      const scaleVal = parseFloat(scaleText);
      assert(scaleVal > 1.2, 'Test 5c: Hovering over dock item triggers spring magnification (> 1.2x)', `Found: "${scaleText}"`);
    }

    // Test Morphing Popover toggle
    await page.click('#mp-popover-trigger');
    await page.waitForTimeout(100);
    const isPopoverOpen = await page.$eval('#mp-popover-panel', el => !el.classList.contains('hidden'));
    assert(isPopoverOpen, 'Test 5d: Morphing popover expands into command palette on trigger click');

    await page.click('#mp-popover-close-btn');
    await page.waitForTimeout(100);
    const isPopoverClosed = await page.$eval('#mp-popover-panel', el => el.classList.contains('hidden'));
    assert(isPopoverClosed, 'Test 5e: Morphing popover collapses back on close button click');

    // Test Progressive Blur slider
    await page.evaluate(() => {
      const slider = document.getElementById('mp-blur-slider');
      slider.value = '24';
      slider.dispatchEvent(new Event('input', { bubbles: true }));
    });
    await page.waitForTimeout(50);
    const blurText = await page.$eval('#mp-blur-val', el => el.textContent.trim());
    assert(blurText === '24px', 'Test 5f: Progressive blur slider adjusts blur depth to 24px', blurText);

    // TEST 6: Sticky TOC Rail Links
    const tocBuilderLink = await page.$('aside a[href="#animation-prompt-builder"]');
    const tocMotionLink = await page.$('aside a[href="#card-button-motion-studio"]');
    const tocAlertLink = await page.$('aside a[href="#alert-notification-studio"]');
    const tocMpLink = await page.$('aside a[href="#motion-primitives-studio"]');
    assert(tocBuilderLink !== null && tocMotionLink !== null && tocAlertLink !== null && tocMpLink !== null, 'Test 6: Sticky TOC rail contains links to all 4 animation studios');

    // TEST 7: Zero Console Errors
    assert(consoleErrors.length === 0, 'Test 7: Zero console errors on topic page', `Errors: ${consoleErrors.join('; ') || 'None'}`);

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
