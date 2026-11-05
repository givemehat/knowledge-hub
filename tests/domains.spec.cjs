const { chromium } = require('playwright');
const { spawn } = require('child_process');
const fs = require('fs');
const path = require('path');

async function runDomainsTestSuite() {
  console.log('=== Starting Peach Domains Section & Icon Overhaul Test Suite ===');

  const previewPort = 4323;
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

    await page.goto(`http://localhost:${previewPort}/knowledge-hub/`, { waitUntil: 'networkidle' });

    // TEST 1: Section presence & 6 domain cards
    const cards = await page.$$('.domain-card');
    assert(cards.length === 6, 'Test 1: 6 domain cards rendered in domains section', `Found: ${cards.length}`);

    // TEST 2: Equal Height Grid Alignment across rows on desktop (1440px)
    const cardBoxes = [];
    for (const card of cards) {
      const box = await card.boundingBox();
      if (box) cardBoxes.push(box);
    }
    assert(cardBoxes.length === 6, 'Test 2a: All 6 cards have valid bounding boxes');

    // On desktop 1440px, there are 2 rows of 3 cards each (row 1: cards 0,1,2; row 2: cards 3,4,5)
    if (cardBoxes.length === 6) {
      const row1Heights = [cardBoxes[0].height, cardBoxes[1].height, cardBoxes[2].height];
      const row2Heights = [cardBoxes[3].height, cardBoxes[4].height, cardBoxes[5].height];
      const maxDiffRow1 = Math.max(...row1Heights) - Math.min(...row1Heights);
      const maxDiffRow2 = Math.max(...row2Heights) - Math.min(...row2Heights);

      assert(maxDiffRow1 <= 3, 'Test 2b: Row 1 cards have equal heights (<= 3px delta)', `Heights: ${row1Heights.map(h => Math.round(h)).join(', ')}px, Delta: ${Math.round(maxDiffRow1)}px`);
      assert(maxDiffRow2 <= 3, 'Test 2c: Row 2 cards have equal heights (<= 3px delta)', `Heights: ${row2Heights.map(h => Math.round(h)).join(', ')}px, Delta: ${Math.round(maxDiffRow2)}px`);
    }

    // TEST 3: Semantic Icon Verification (Zero Inappropriate Metaphors)
    // 3a: AI & ML must have Brain/Synapse, NOT microphone
    const aiIconHtml = await page.$eval('[data-category="ai-ml"] [data-icon-set="peach-duotone"]', el => el.innerHTML);
    const hasMic = aiIconHtml.includes('d="M12 2a3 3') || aiIconHtml.includes('line x1="12" x2="12" y1="19" y2="22"');
    const hasBrain = aiIconHtml.includes('M14 4C9.5') || aiIconHtml.includes('circle cx="10" cy="9"');
    assert(!hasMic && hasBrain, 'Test 3a: AI & ML uses Neural Brain duotone icon, NOT microphone');

    // 3b: Projects must have Rocket ship, NOT generic star
    const projIconHtml = await page.$eval('[data-category="projects"] [data-icon-set="peach-duotone"]', el => el.innerHTML);
    const hasStar = projIconHtml.includes('polygon points="12 2 15.09');
    const hasRocket = projIconHtml.includes('M14 3C17.5') || projIconHtml.includes('14 25L16.5');
    assert(!hasStar && hasRocket, 'Test 3b: Projects Hub uses Rocket ship launch icon, NOT star');

    // 3c: Politics & Governance must have Constitutional Landmark / Pillars, NOT house
    const govIconHtml = await page.$eval('[data-category="gov-policy"] [data-icon-set="peach-duotone"]', el => el.innerHTML);
    const hasHouse = govIconHtml.includes('d="m3 9 9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z"');
    const hasPillars = govIconHtml.includes('M6 12V21M11 12V21') || govIconHtml.includes('M3 10L14 4L25 10');
    assert(!hasHouse && hasPillars, 'Test 3c: Governance uses Constitutional Landmark & Pillars icon, NOT house');

    // 3d: Tech Fundamentals has Layered Isometric Architecture
    const techIconHtml = await page.$eval('[data-category="tech-fundamentals"] [data-icon-set="peach-duotone"]', el => el.innerHTML);
    const hasStack = techIconHtml.includes('M14 3L24 8L14 13L4 8L14 3Z');
    assert(hasStack, 'Test 3d: Tech Fundamentals uses Layered Isometric System Architecture');

    // TEST 4: Tech Fundamentals is populated (No 0-guide ghost cards)
    const techCountPill = await page.$eval('[data-category="tech-fundamentals"] .count-pill', el => el.innerText.trim());
    assert(techCountPill.includes('3'), 'Test 4: Tech Fundamentals is fully populated with 3 guides', `Found: "${techCountPill}"`);

    // TEST 5: Quantum Computing topics are distinct (No duplicate "Qubit" topic in slots 1 and 3)
    const quantumTopicRows = await page.$$eval('[data-category="quantum"] .topic-row', rows => rows.map(r => r.innerText.trim()));
    const uniqueQuantumTopics = new Set(quantumTopicRows);
    assert(
      quantumTopicRows.length === 3 && uniqueQuantumTopics.size === 3,
      'Test 5: Quantum Computing has 3 completely distinct topics (Zero duplication)',
      `Titles: ${JSON.stringify(quantumTopicRows)}`
    );

    // TEST 6: All rendered topic shortTitles are <= 38 characters and do not end in mid-word truncation "…"
    const allTopicTitles = await page.$$eval('.topic-row span.truncate', spans => spans.map(s => s.innerText.trim()));
    const longTitles = allTopicTitles.filter(t => t.length > 38);
    const cutOffTitles = allTopicTitles.filter(t => t.endsWith('…') || t.endsWith('...'));
    assert(longTitles.length === 0, 'Test 6a: Zero topic titles exceed 38 characters', `Violations: ${longTitles.length}`);
    assert(cutOffTitles.length === 0, 'Test 6b: Zero topic titles end with mid-word truncation ellipsis "…"', `Violations: ${cutOffTitles.length}`);

    // TEST 7: Singular/Plural Grammar
    // Projects has 1 guide -> "1 गाइड" in Hindi
    const projCount = await page.$eval('[data-category="projects"] .count-pill', el => el.innerText.trim());
    assert(projCount === '1 गाइड', 'Test 7a: Correct Hindi singular plural: "1 गाइड" for single guide', `Found: "${projCount}"`);

    // AI/ML has multiple guides -> plural "गाइड" in Hindi
    const aiCount = await page.$eval('[data-category="ai-ml"] .count-pill', el => el.innerText.trim());
    assert(aiCount === '8 गाइड' || aiCount === '7 गाइड' || aiCount === '6 गाइड', 'Test 7b: Correct Hindi plural for multiple guides', `Found: "${aiCount}"`);

    // TEST 8: Zero Console Errors
    assert(consoleErrors.length === 0, 'Test 8: Zero console errors on homepage during render', consoleErrors.join(' | '));

    await context.close();
  } catch (err) {
    console.error('Fatal error during test run:', err);
    failCount++;
  } finally {
    await browser.close();
    server.kill();
  }

  console.log(`\n=== Test Summary: ${passCount} Passed, ${failCount} Failed ===`);
  if (failCount > 0) process.exit(1);
}

runDomainsTestSuite();
