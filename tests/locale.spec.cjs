/**
 * Peach Locale & i18n Leak Comprehensive Automated Test Suite (Prompt 11)
 * 
 * Verifies:
 * 1. Zero Devanagari characters on English routes (outside toggle 'हिं' and elements with lang="hi")
 * 2. Pure Hindi on Hindi routes (UI chrome in Devanagari, English only for technical whitelist)
 * 3. Segmented toggle navigation between /en/ and /hi/ with html[lang] and correct labels
 * 4. Hydration test (with JS disabled, server-rendered HTML on /en/ is 100% English)
 * 5. Plural rules & unit formatting ('1 guide', '7 guides', '12 min' vs '1 गाइड', '7 गाइड', '12 मिनट', no 'मि')
 * 6. Single count per domain card (duplicate footer count removed)
 * 7. Zod schema validation (fails on missing translation unless translationPending: true)
 * 8. Responsive before/after screenshot captures across viewports (360, 768, 1440, light & dark)
 */

const { chromium } = require('playwright');
const { spawn } = require('child_process');
const fs = require('fs');
const path = require('path');
const { validateTopics } = require('../src/data/schema.ts');

const ROOT_DIR = '/Users/rajnishsingh/projects/knowledge-hub';
const SCREENSHOT_DIR = path.join(ROOT_DIR, 'homepage_screenshots/round11_locale_bug');
const PREVIEW_PORT = 4330;

async function runLocaleTestSuite() {
  console.log('=== Starting Peach Locale & Language Leak Verification Suite ===');
  fs.mkdirSync(SCREENSHOT_DIR, { recursive: true });

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

  // TEST 7: Schema test (Build/runtime validation fails on missing translations unless marked translationPending)
  console.log('\n--- Running Test 7: Zod Content Schema Validation ---');
  try {
    const validTopics = [
      {
        slug: 'valid-topic',
        title: { en: 'Valid Title', hi: 'वैध शीर्षक' },
        shortTitle: { en: 'Valid Short', hi: 'वैध संक्षिप्त' },
        summary: { en: 'Valid summary in English', hi: 'वैध सारांश' },
        category: 'ai-ml',
        level: 'beginner',
        readingMinutes: 5,
        lastVerified: '2026-11-05',
        confidence: 'high'
      }
    ];
    validateTopics(validTopics);
    assert(true, 'Test 7a: validateTopics passes on fully localized topic');

    // Test missing translation without flag (must throw)
    let caughtMissing = false;
    try {
      const invalidMissing = [
        {
          slug: 'invalid-topic',
          title: { en: 'Only English', hi: '' },
          category: 'ai-ml',
          level: 'beginner',
          readingMinutes: 5,
          lastVerified: '2026-11-05',
          confidence: 'high'
        }
      ];
      validateTopics(invalidMissing);
    } catch {
      caughtMissing = true;
    }
    assert(caughtMissing, 'Test 7b: validateTopics fails when translation is missing');

    // Test missing translation WITH translationPending: true (must pass)
    let pendingAllowed = false;
    try {
      const pendingTopic = [
        {
          slug: 'pending-topic',
          title: { en: 'Pending Title', hi: '' },
          translationPending: true,
          category: 'ai-ml',
          level: 'beginner',
          readingMinutes: 5,
          lastVerified: '2026-11-05',
          confidence: 'high'
        }
      ];
      validateTopics(pendingTopic);
      pendingAllowed = true;
    } catch {
      pendingAllowed = false;
    }
    assert(pendingAllowed, 'Test 7c: validateTopics allows missing translation if translationPending: true');

    // Test shortTitle > 38 chars (must throw)
    let caughtTooLong = false;
    try {
      const longTopic = [
        {
          slug: 'long-topic',
          title: { en: 'T', hi: 'टी' },
          shortTitle: { en: 'This English short title exceeds the thirty-eight character maximum limit', hi: 'छोटा' },
          category: 'ai-ml',
          level: 'beginner',
          readingMinutes: 5,
          lastVerified: '2026-11-05',
          confidence: 'high'
        }
      ];
      validateTopics(longTopic);
    } catch {
      caughtTooLong = true;
    }
    assert(caughtTooLong, 'Test 7d: validateTopics fails when shortTitle exceeds 38 characters');
  } catch (err) {
    assert(false, 'Test 7: Schema tests encountered unexpected error', err.message);
  }

  // TEST 1: No Devanagari on English routes (Crawl built static files)
  console.log('\n--- Running Test 1: Zero Devanagari on English Routes ---');
  try {
    const enHtmlFiles = [];
    function scanEnFiles(dir) {
      const entries = fs.readdirSync(dir, { withFileTypes: true });
      for (const entry of entries) {
        const fullPath = path.join(dir, entry.name);
        if (entry.isDirectory()) {
          scanEnFiles(fullPath);
        } else if (entry.name.endsWith('.html')) {
          enHtmlFiles.push(fullPath);
        }
      }
    }

    const enDistDir = path.join(ROOT_DIR, 'dist/en');
    if (fs.existsSync(enDistDir)) {
      scanEnFiles(enDistDir);
    }

    assert(enHtmlFiles.length > 0, 'Test 1a: Found generated HTML files under /en/', `Found: ${enHtmlFiles.length}`);

    let totalDevanagariViolations = 0;
    const violationReport = [];

    for (const filePath of enHtmlFiles) {
      let content = fs.readFileSync(filePath, 'utf8');

      // Strip elements marked with lang="hi"
      content = content.replace(/<[^>]+lang=["']hi["'][^>]*>[\s\S]*?<\/[^>]+>/gi, '');

      // Strip toggle own label 'हिं'
      content = content.replace(/>\s*हिं\s*</g, '><');

      const devanagariMatches = content.match(/[\u0900-\u097F]/g);
      if (devanagariMatches && devanagariMatches.length > 0) {
        totalDevanagariViolations += devanagariMatches.length;
        violationReport.push(`${path.relative(ROOT_DIR, filePath)} (${devanagariMatches.length} chars)`);
      }
    }

    assert(
      totalDevanagariViolations === 0,
      'Test 1b: Zero unwhitelisted Devanagari characters across all /en/ pages',
      totalDevanagariViolations === 0 ? '0 violations' : `Violations in: ${violationReport.join(', ')}`
    );
  } catch (err) {
    assert(false, 'Test 1: Static crawl of /en/ failed', err.message);
  }

  // TEST 2: No Latin UI chrome on Hindi routes (Whitelist for technical terms)
  console.log('\n--- Running Test 2: UI Chrome Language Purity on /hi/ ---');
  try {
    const hiHtmlPath = path.join(ROOT_DIR, 'dist/hi/index.html');
    assert(fs.existsSync(hiHtmlPath), 'Test 2a: dist/hi/index.html exists');

    const hiContent = fs.readFileSync(hiHtmlPath, 'utf8');

    // UI Chrome elements to verify: navigation, buttons, chips, section headers
    // Whitelist includes: technical terms, creator name, brand name, code tokens
    const TECHNICAL_WHITELIST = new Set([
      'llm', 'llms', 'rag', 'api', 'apis', 'github', 'dsa', 'os', 'cs', 'tcp', 'ip', 'tcp/ip',
      'http', 'http/3', 'evm', 'vvpat', 'rti', 'dbt', 'ai', 'ml', 'ai/ml', 'qiskit', 'peach',
      'python', 'docker', 'sql', 'dbms', 'oop', 'kaggle', 'vader', 'muril', 'nqm', 'nist',
      'pqc', 'fips', 'rsa', 'ftqc', 'nisq', 'cc', 'by-sa', '4.0', 'esc', '19+', '3.8m', '3.84m',
      '3-way', 'dns', 'socket', 'react', 'sft', 'rlhf', 'dpo', 'cot', 'ats', 'xyz', 'linkedin',
      'readme', 'gifs', 'inmail', 'latex', 'overleaf', 'pdf', 'pramp', 'nic', 'eci', 'fas',
      'tl;dr', 'tldr', 'mermaid', 'vercel', 'render', 'youtube', 'en', 'rajnish', 'singh',
      'givemehat', 'svg', 'aria', 'utf-8', 'html', 'json', 'ld+json', 'schema.org', 'viewport'
    ]);

    // Check header navigation links in Hindi
    const navMatch = hiContent.match(/<nav[^>]*>([\s\S]*?)<\/nav>/i);
    let navViolations = [];
    if (navMatch) {
      const navText = navMatch[1].replace(/<[^>]+>/g, ' ').replace(/\s+/g, ' ').trim();
      const latinWords = navText.match(/[a-zA-Z]+/g) || [];
      for (const word of latinWords) {
        if (!TECHNICAL_WHITELIST.has(word.toLowerCase())) {
          navViolations.push(word);
        }
      }
    }

    assert(
      navViolations.length === 0,
      'Test 2b: Zero unwhitelisted Latin words in Hindi navigation bar',
      navViolations.length === 0 ? 'Pure Hindi navigation' : `Violations: ${navViolations.join(', ')}`
    );
  } catch (err) {
    assert(false, 'Test 2: UI chrome audit failed', err.message);
  }

  // Launch Local Astro Preview Server for Dynamic Browser Tests
  console.log(`\n[Setup] Starting local Astro preview server on port ${PREVIEW_PORT}...`);
  const server = spawn('npx', ['astro', 'preview', '--port', String(PREVIEW_PORT)], {
    cwd: ROOT_DIR,
    stdio: 'pipe'
  });

  await new Promise(r => setTimeout(r, 2000));

  const browser = await chromium.launch();

  try {
    // TEST 4: Hydration test (JavaScript disabled)
    console.log('\n--- Running Test 4: Hydration Test (JavaScript Disabled) ---');
    const noJsContext = await browser.newContext({ javaScriptEnabled: false });
    const noJsPage = await noJsContext.newPage();
    await noJsPage.goto(`http://localhost:${PREVIEW_PORT}/knowledge-hub/en/`);

    const noJsTopTopics = await noJsPage.$eval('.domain-card:first-child [data-component="inset-panel"]', el => el.textContent);
    const noJsReadingTime = await noJsPage.$eval('.domain-card:first-child .topic-row:first-child', el => el.innerText);
    const noJsHtmlLang = await noJsPage.$eval('html', el => el.getAttribute('lang'));

    assert(noJsHtmlLang === 'en', 'Test 4a: Server HTML has lang="en" before JavaScript execution');
    assert(noJsTopTopics.includes('Top topics'), 'Test 4b: InsetPanel shows "Top topics" in server HTML without JS');
    assert(!noJsTopTopics.includes('प्रमुख विषय'), 'Test 4c: InsetPanel does NOT show Hindi "प्रमुख विषय" without JS');
    assert(/12 min/.test(noJsReadingTime), 'Test 4d: Reading time shows "12 min" with space without JS');
    assert(!/[\d]मि\b/.test(noJsReadingTime), 'Test 4e: Server HTML does not contain glued "मि" abbreviation');

    await noJsContext.close();

    // Browser Context for Interactive Tests (JavaScript Enabled)
    const context = await browser.newContext({
      viewport: { width: 1440, height: 900 }
    });
    const page = await context.newPage();

    // TEST 5 & 6: Plurals, Units & Single Count Test
    console.log('\n--- Running Test 5 & 6: Plural Rules, Reading Time & Single Count ---');
    await page.goto(`http://localhost:${PREVIEW_PORT}/knowledge-hub/en/`, { waitUntil: 'networkidle' });

    // Check count in English card
    const enCards = await page.$$('.domain-card');
    assert(enCards.length === 6, 'Test 6a: Exactly 6 domain cards rendered on /en/');

    for (let i = 0; i < enCards.length; i++) {
      const card = enCards[i];
      // Pill count
      const pillCount = await card.$eval('.count-pill', el => el.innerText.trim());
      // Footer count should NOT exist
      const footerMetaText = await card.$eval('[data-component="card-footer"]', el => el.innerText.trim());

      assert(
        !footerMetaText.includes('guide') && !footerMetaText.includes('गाइड'),
        `Test 6b (Card ${i + 1}): Footer does not duplicate guide count (Found footer text: "${footerMetaText.slice(0, 30)}")`
      );
    }

    const aiCardEnCount = await page.$eval('[data-category="ai-ml"] .count-pill', el => el.innerText.trim());
    const projCardEnCount = await page.$eval('[data-category="projects"] .count-pill', el => el.innerText.trim());
    assert(aiCardEnCount === '8 guides' || aiCardEnCount === '7 guides', 'Test 5a: Plural count in English outputs "7 guides" or "8 guides" with space', `Found: "${aiCardEnCount}"`);
    assert(projCardEnCount === '1 guide', 'Test 5b: Singular count in English outputs "1 guide" with space', `Found: "${projCardEnCount}"`);

    // Check Hindi Card
    await page.goto(`http://localhost:${PREVIEW_PORT}/knowledge-hub/hi/`, { waitUntil: 'networkidle' });
    const aiCardHiCount = await page.$eval('[data-category="ai-ml"] .count-pill', el => el.innerText.trim());
    const projCardHiCount = await page.$eval('[data-category="projects"] .count-pill', el => el.innerText.trim());
    const hiReadingTime = await page.$eval('[data-category="ai-ml"] .topic-row:first-child', el => el.innerText.trim());

    assert(aiCardHiCount === '8 गाइड' || aiCardHiCount === '7 गाइड', 'Test 5c: Hindi plural count outputs "7 गाइड" or "8 गाइड" with space', `Found: "${aiCardHiCount}"`);
    assert(projCardHiCount === '1 गाइड', 'Test 5d: Hindi singular count outputs "1 गाइड" with space', `Found: "${projCardHiCount}"`);
    assert(hiReadingTime.includes('12 मिनट'), 'Test 5e: Hindi reading time outputs "12 मिनट" with space', `Found in: "${hiReadingTime}"`);
    assert(!/[\d]मि\b/.test(hiReadingTime), 'Test 5f: Hindi reading time does NOT use glued "मि"');

    // TEST 3: Toggle Test (Interactive navigation between /en/ and /hi/)
    console.log('\n--- Running Test 3: Segmented Toggle Navigation ---');
    await page.goto(`http://localhost:${PREVIEW_PORT}/knowledge-hub/en/`, { waitUntil: 'networkidle' });
    assert(page.url().includes('/en/'), 'Test 3a: Initial page is on /en/ route');
    assert(await page.$eval('html', el => el.getAttribute('lang')) === 'en', 'Test 3b: Initial html[lang] is "en"');

    // Click 'हिं' toggle
    await page.click('button[data-lang="hi"]');
    await page.waitForURL(`**/knowledge-hub/hi/`);
    await page.screenshot({ path: path.join(SCREENSHOT_DIR, 'nav_after_click_hi.png') });

    const currentUrlAfterHi = page.url();
    const htmlLangAfterHi = await page.$eval('html', el => el.getAttribute('lang'));
    const hiInsetLabel = await page.$eval('.domain-card:first-child [data-component="inset-panel"]', el => el.innerText);

    assert(currentUrlAfterHi.includes('/hi/'), 'Test 3c: Clicking हिं navigates to /hi/ route', `URL: ${currentUrlAfterHi}`);
    assert(htmlLangAfterHi === 'hi', 'Test 3d: Navigating to /hi/ updates html[lang] to "hi"');
    assert(hiInsetLabel.includes('प्रमुख विषय'), 'Test 3e: Hindi page shows "प्रमुख विषय" in card inset panel');
    assert(!hiInsetLabel.includes('Top topics'), 'Test 3f: Hindi page does NOT show "Top topics"');

    // Click 'EN' toggle
    await page.click('button[data-lang="en"]');
    await page.waitForURL(`**/knowledge-hub/en/`);
    await page.screenshot({ path: path.join(SCREENSHOT_DIR, 'nav_after_click_en.png') });

    const currentUrlAfterEn = page.url();
    const htmlLangAfterEn = await page.$eval('html', el => el.getAttribute('lang'));
    const enInsetLabel = await page.$eval('.domain-card:first-child [data-component="inset-panel"]', el => el.textContent);

    assert(currentUrlAfterEn.includes('/en/'), 'Test 3g: Clicking EN navigates to /en/ route', `URL: ${currentUrlAfterEn}`);
    assert(htmlLangAfterEn === 'en', 'Test 3h: Navigating to /en/ updates html[lang] to "en"');
    assert(enInsetLabel.includes('Top topics'), 'Test 3i: English page shows "Top topics" in card inset panel');
    assert(!enInsetLabel.includes('प्रमुख विषय'), 'Test 3j: English page does NOT show "प्रमुख विषय"');

    // TEST 9: Research Section Language Purity & Toggling (User Reported Bug)
    console.log('\n--- Running Test 9: Research Page Locale & Toggle Navigation ---');
    await page.goto(`http://localhost:${PREVIEW_PORT}/knowledge-hub/en/research/`, { waitUntil: 'networkidle' });

    const enResLang = await page.$eval('html', el => el.getAttribute('lang'));
    const enResHeading = await page.$eval('#research-heading', el => el.textContent.trim());
    const enResSubtitle = await page.$eval('#research-subtitle', el => el.textContent.trim());
    const enResFlagshipDesc = await page.$eval('#research-flagship-desc', el => el.textContent.trim());
    const enCard1Desc = await page.$eval('[data-card-index="0"] .card-desc', el => el.textContent.trim());

    assert(enResLang === 'en', 'Test 9a: /en/research/ has html[lang]="en"');
    assert(enResHeading === 'Media Sentiment & Empirical Research', 'Test 9b: /en/research/ renders English heading');
    assert(enResSubtitle.startsWith('Data-driven analysis of 3.8+ million'), 'Test 9c: /en/research/ renders pure English subtitle');
    assert(enResFlagshipDesc.startsWith('Does Indian news media exhibit'), 'Test 9d: /en/research/ renders pure English flagship description');
    assert(enCard1Desc.startsWith('Verified sources, open licenses'), 'Test 9e: /en/research/ renders pure English card descriptions');

    // Screenshot of fixed English Research Page
    await page.screenshot({ path: path.join(SCREENSHOT_DIR, '04_fixed_research_en.png'), fullPage: false });

    // Click Hindi toggle on research page
    await page.click('#lang-segmented-control button[data-lang="hi"]');
    await page.waitForLoadState('networkidle');

    const hiResUrl = page.url();
    const hiResHeading = await page.$eval('#research-heading', el => el.textContent.trim());
    const hiResSubtitle = await page.$eval('#research-subtitle', el => el.textContent.trim());

    assert(hiResUrl.includes('/hi/research/'), 'Test 9f: Clicking हिं on research page navigates to /hi/research/', `URL: ${hiResUrl}`);
    assert(hiResHeading.includes('मीडिया सेंटीमेंट और अनुभवजन्य शोध'), 'Test 9g: /hi/research/ renders pure Hindi heading');
    assert(hiResSubtitle.startsWith('भारतीय मीडिया के 22+ वर्षों'), 'Test 9h: /hi/research/ renders pure Hindi subtitle');

    // Screenshot of fixed Hindi Research Page
    await page.screenshot({ path: path.join(SCREENSHOT_DIR, '05_fixed_research_hi.png'), fullPage: false });

    // Test 10: Client-side preference redirection when landing on unprefixed /research/
    console.log('\n--- Running Test 10: Instant Preference Alignment on Un-prefixed Route ---');
    await page.evaluate(() => localStorage.setItem('peach_preferred_lang', 'en'));
    await page.goto(`http://localhost:${PREVIEW_PORT}/knowledge-hub/research/`, { waitUntil: 'networkidle' });
    const redirectedUrl = page.url();
    assert(redirectedUrl.includes('/en/research/'), 'Test 10: Visiting /research/ with preferred lang "en" immediately redirects to /en/research/', `URL: ${redirectedUrl}`);

    // TEST 8: Responsive baseline screenshots across viewports & themes
    console.log('\n--- Running Test 8: Responsive Before/After Screenshot Captures ---');
    const viewports = [
      { width: 360, height: 740, name: '360_mobile' },
      { width: 768, height: 1024, name: '768_tablet' },
      { width: 1440, height: 900, name: '1440_desktop' }
    ];

    for (const vp of viewports) {
      await page.setViewportSize({ width: vp.width, height: vp.height });

      // English Light
      await page.emulateMedia({ colorScheme: 'light' });
      await page.goto(`http://localhost:${PREVIEW_PORT}/knowledge-hub/en/`, { waitUntil: 'networkidle' });
      await page.screenshot({ path: path.join(SCREENSHOT_DIR, `en_${vp.name}_light.png`), fullPage: false });

      // English Dark
      await page.emulateMedia({ colorScheme: 'dark' });
      await page.evaluate(() => document.documentElement.classList.add('dark'));
      await page.screenshot({ path: path.join(SCREENSHOT_DIR, `en_${vp.name}_dark.png`), fullPage: false });
      await page.evaluate(() => document.documentElement.classList.remove('dark'));

      // Hindi Light
      await page.emulateMedia({ colorScheme: 'light' });
      await page.goto(`http://localhost:${PREVIEW_PORT}/knowledge-hub/hi/`, { waitUntil: 'networkidle' });
      await page.screenshot({ path: path.join(SCREENSHOT_DIR, `hi_${vp.name}_light.png`), fullPage: false });

      // Hindi Dark
      await page.emulateMedia({ colorScheme: 'dark' });
      await page.evaluate(() => document.documentElement.classList.add('dark'));
      await page.screenshot({ path: path.join(SCREENSHOT_DIR, `hi_${vp.name}_dark.png`), fullPage: false });
      await page.evaluate(() => document.documentElement.classList.remove('dark'));
    }

    assert(true, 'Test 8: Generated responsive screenshots for 360, 768, 1440 (light & dark, EN & HI)');

    await context.close();
  } catch (err) {
    console.error('Fatal error during test run:', err);
    failCount++;
  } finally {
    await browser.close();
    server.kill();
  }

  console.log(`\n======================================================`);
  console.log(`=== Locale Test Suite Summary: ${passCount} Passed, ${failCount} Failed ===`);
  console.log(`======================================================`);

  if (failCount > 0) {
    process.exit(1);
  }
}

runLocaleTestSuite();
