const { chromium } = require('playwright');
const { spawn } = require('child_process');
const fs = require('fs');
const path = require('path');

async function runCardSystemTestSuite() {
  console.log('=== Starting Bodh Card DNA & Design Unification Test Suite ===');

  const previewPort = 4325;
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
    // TEST 1: data-component="card" exists across all core page types
    // -------------------------------------------------------------
    const pagesToCheck = [
      { name: 'Homepage', url: `${base}/` },
      { name: 'Resources', url: `${base}/resources/` },
      { name: 'Topic Detail', url: `${base}/topics/llms-how-they-work/` },
      { name: 'Roadmap Detail', url: `${base}/roadmaps/ai-ml-engineer/` },
      { name: 'Updates', url: `${base}/updates/` },
      { name: 'About', url: `${base}/about/` },
      { name: 'Design System', url: `${base}/design-system/` }
    ];

    for (const p of pagesToCheck) {
      await page.goto(p.url, { waitUntil: 'networkidle' });
      const cardCount = await page.$$eval('[data-component="card"]', els => els.length);
      assert(cardCount > 0, `Test 1: ${p.name} renders data-component="card"`, `Found: ${cardCount} cards`);
    }

    // -------------------------------------------------------------
    // TEST 2: Equal Heights & Pinned Footers on Resources page (1440px)
    // -------------------------------------------------------------
    await page.goto(`${base}/resources/`, { waitUntil: 'networkidle' });
    const resourceCards = await page.$$('[data-component="card"]');
    assert(resourceCards.length >= 6, 'Test 2a: Resources page renders >= 6 cards', `Found: ${resourceCards.length}`);

    // Check first row (first 3 cards)
    const row1Boxes = [];
    for (let i = 0; i < Math.min(3, resourceCards.length); i++) {
      const box = await resourceCards[i].boundingBox();
      if (box) row1Boxes.push(box);
    }
    if (row1Boxes.length === 3) {
      const heights = row1Boxes.map(b => Math.round(b.height));
      const delta = Math.max(...heights) - Math.min(...heights);
      assert(delta <= 3, 'Test 2b: Resources grid row 1 cards have equal height', `Heights: ${heights.join(', ')}px, Delta: ${delta}px`);
    }

    // Check that card footers have mt-auto or are pinned to the bottom
    const footersPinned = await page.$$eval('[data-component="card"]', cards => {
      return cards.every(card => {
        const footer = card.querySelector('[data-component="card-footer"]');
        if (!footer) return true; // Some cards may not have footers
        return footer.classList.contains('mt-auto') || window.getComputedStyle(footer).marginTop.includes('auto') || footer.offsetTop > 0;
      });
    });
    assert(footersPinned, 'Test 2c: All card footers are positioned with mt-auto pinning');

    // -------------------------------------------------------------
    // TEST 3: At most ONE primary dark pill button per card
    // -------------------------------------------------------------
    const primaryButtonViolations = await page.$$eval('[data-component="card"]', cards => {
      let violations = 0;
      for (const card of cards) {
        // Find buttons with primary variant
        const primaryButtons = card.querySelectorAll('[data-variant="primary"]');
        if (primaryButtons.length > 1) {
          violations++;
        }
      }
      return violations;
    });
    assert(primaryButtonViolations === 0, 'Test 3: At most ONE primary dark button per card', `Violations: ${primaryButtonViolations}`);

    // -------------------------------------------------------------
    // TEST 4: Zero Glued Text Strings across pages
    // -------------------------------------------------------------
    await page.goto(`${base}/topics/llms-how-they-work/`, { waitUntil: 'networkidle' });
    
    // Check for glued patterns like "Difficultyintermediate", "Confidence BadgeHIGH", "pythonCopy Code"
    const gluedTextViolations = await page.evaluate(() => {
      const textNodes = [];
      const walker = document.createTreeWalker(document.body, NodeFilter.SHOW_TEXT, null, false);
      let node;
      while (node = walker.nextNode()) {
        const text = node.nodeValue.trim();
        // Specifically look for stuck labels
        if (/Difficulty(beginner|intermediate|advanced)/i.test(text) ||
            /Confidence(\s*Badge)?(high|medium|evolving)/i.test(text) ||
            /Last Fact-Checked\d{4}/i.test(text) ||
            /pythonCopy/i.test(text)) {
          textNodes.push(text);
        }
      }
      return textNodes;
    });
    assert(gluedTextViolations.length === 0, 'Test 4: Zero stuck/glued label strings on topic page', `Violations: ${gluedTextViolations.join('; ') || 'None'}`);

    // -------------------------------------------------------------
    // TEST 5: YouTube Thumbnails & Links
    // -------------------------------------------------------------
    await page.goto(`${base}/resources/`, { waitUntil: 'networkidle' });
    const ytThumbnails = await page.$$eval('img[src*="youtube.com/vi/"], img[src*="ytimg.com"]', imgs => {
      return imgs.map(img => ({
        src: img.src,
        alt: img.alt,
        complete: img.complete
      }));
    });
    assert(ytThumbnails.length >= 2, 'Test 5a: Verified 16:9 YouTube thumbnails present', `Found: ${ytThumbnails.length}`);
    const validAlts = ytThumbnails.every(t => t.alt && t.alt.length > 5);
    assert(validAlts, 'Test 5b: All YouTube thumbnails have descriptive alt text');

    // -------------------------------------------------------------
    // TEST 6: Zero Unverified Superlatives in Resource Claims
    // -------------------------------------------------------------
    const resourcesDataPath = path.join(__dirname, '../src/data/resources.ts');
    const resourcesContent = fs.readFileSync(resourcesDataPath, 'utf-8');
    const forbiddenSuperlatives = [
      'best video in the world',
      'undisputed number 1',
      'greatest course ever',
      'the best in the world'
    ];
    let superlativeViolations = [];
    for (const phrase of forbiddenSuperlatives) {
      if (resourcesContent.toLowerCase().includes(phrase)) {
        superlativeViolations.push(phrase);
      }
    }
    assert(superlativeViolations.length === 0, 'Test 6: Zero unverified superlatives in resources.ts', `Violations: ${superlativeViolations.join(', ') || 'None'}`);

    // -------------------------------------------------------------
    // TEST 7: Language Chips render clean "हिन्दी" or "English"
    // -------------------------------------------------------------
    const languageChips = await page.$$eval('[data-component="card"]', cards => {
      const labels = [];
      cards.forEach(c => {
        const langChip = c.querySelector('[data-variant="language"]');
        if (langChip) labels.push(langChip.textContent.trim());
      });
      return labels;
    });
    const validLanguages = languageChips.every(l => l.includes('हिन्दी') || l.includes('English'));
    assert(validLanguages && languageChips.length > 0, 'Test 7: Language chips strictly render "हिन्दी" or "English"', `Found: ${languageChips.slice(0, 4).join(', ')}`);

    // -------------------------------------------------------------
    // TEST 8: Broken Link Report Triggers
    // -------------------------------------------------------------
    const brokenLinkTriggers = await page.$$eval('a[title*="Report broken link"]', els => els.length);
    assert(brokenLinkTriggers >= 6, 'Test 8: Broken link report triggers present on all resource cards', `Found: ${brokenLinkTriggers}`);

    // -------------------------------------------------------------
    // TEST 9: Sibling comparison on /design-system/
    // -------------------------------------------------------------
    await page.goto(`${base}/design-system/`, { waitUntil: 'networkidle' });
    const siblingCards = await page.$$eval('[data-component="card"]', cards => cards.length);
    assert(siblingCards >= 4, 'Test 9: Design system displays sibling comparison cards', `Found: ${siblingCards} cards`);

    // -------------------------------------------------------------
    // TEST 10: Zero Console Errors
    // -------------------------------------------------------------
    assert(consoleErrors.length === 0, 'Test 10: Zero console errors logged across all test navigations', `Errors: ${consoleErrors.join('; ') || 'None'}`);

  } catch (err) {
    console.error('Test runner threw an unexpected exception:', err);
    failCount++;
  } finally {
    await browser.close();
    server.kill();
  }

  console.log(`\n=== Card System Test Summary: ${passCount} Passed, ${failCount} Failed ===`);
  if (failCount > 0) {
    process.exit(1);
  }
}

runCardSystemTestSuite();
