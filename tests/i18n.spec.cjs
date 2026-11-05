const { chromium } = require('playwright');
const { spawn } = require('child_process');
const fs = require('fs');
const path = require('path');

async function runI18nTestSuite() {
  console.log('=== Starting Bodh i18n & Typography Automated Test Suite ===');

  const previewPort = 4324;
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

    await page.goto(`http://localhost:${previewPort}/knowledge-hub/`, { waitUntil: 'networkidle' });

    // TEST 1: Default HTML lang is 'hi'
    const defaultLang = await page.$eval('html', el => el.getAttribute('lang'));
    assert(defaultLang === 'hi', 'Test 1: Default document lang is "hi" (Devanagari Hindi)', `Found: "${defaultLang}"`);

    // TEST 2: Pure Hindi strings in domains section (Zero Roman-Hindi / Hinglish)
    const eyebrow = await page.$eval('#domains-eyebrow', el => el.innerText.trim());
    const heading = await page.$eval('#domains-heading', el => el.innerText.trim());
    const subtext = await page.$eval('#domains-subtext', el => el.innerText.trim());
    const ctaText = await page.$eval('.domain-card:first-child .card-cta span', el => el.innerText.trim());

    assert(eyebrow === 'चुने हुए विषय', 'Test 2a: Domain eyebrow is pure Hindi ("चुने हुए विषय")', `Found: "${eyebrow}"`);
    assert(heading === 'आज क्या सीखना है?', 'Test 2b: Domain heading is pure Hindi ("आज क्या सीखना है?")', `Found: "${heading}"`);
    assert(subtext.includes('जाँचे-परखे गाइड') && subtext.endsWith('।'), 'Test 2c: Domain subtext is pure Hindi with Purna-viram (।)', `Found: "${subtext}"`);
    assert(ctaText === 'विषय देखें', 'Test 2d: Domain CTA is pure Hindi ("विषय देखें")', `Found: "${ctaText}"`);

    // Forbidden Hinglish checks
    const forbidden = ['karo', 'dekho', 'chune hue', 'chune', 'aaj kya', 'domain explore'];
    const sectionHtml = await page.$eval('#domains-section', el => el.innerText.toLowerCase());
    const foundViolations = forbidden.filter(w => sectionHtml.includes(w));
    assert(foundViolations.length === 0, 'Test 2e: Zero Roman-Hindi slang in domains section text', `Violations: ${foundViolations.join(', ')}`);

    // TEST 3: Devanagari Typography CSS Rules
    const hindiElementStyles = await page.evaluate(() => {
      const el = document.getElementById('domains-heading');
      const computed = window.getComputedStyle(el);
      return {
        letterSpacing: computed.letterSpacing,
        textTransform: computed.textTransform
      };
    });
    // letter-spacing must be 0 (normal)
    assert(
      hindiElementStyles.letterSpacing === 'normal' || hindiElementStyles.letterSpacing === '0px',
      'Test 3a: Devanagari heading enforces letter-spacing: 0 (No negative letter-spacing)',
      `Found: "${hindiElementStyles.letterSpacing}"`
    );
    assert(
      hindiElementStyles.textTransform === 'none',
      'Test 3b: Devanagari heading enforces text-transform: none (No uppercase breakage)',
      `Found: "${hindiElementStyles.textTransform}"`
    );

    // TEST 4: Dynamic Switching to English (EN button click)
    await page.click('button[data-lang="en"]');
    await page.waitForTimeout(300);

    const enHtmlLang = await page.$eval('html', el => el.getAttribute('lang'));
    const enEyebrow = await page.$eval('#domains-eyebrow', el => el.innerText.trim());
    const enHeading = await page.$eval('#domains-heading', el => el.innerText.trim());
    const enCta = await page.$eval('.domain-card:first-child .card-cta span', el => el.innerText.trim());
    const enProjCount = await page.$eval('[data-category="projects"] .count-pill', el => el.innerText.trim());
    const enAiCount = await page.$eval('[data-category="ai-ml"] .count-pill', el => el.innerText.trim());

    assert(enHtmlLang === 'en', 'Test 4a: Switching to EN updates html[lang] to "en"', `Found: "${enHtmlLang}"`);
    assert(enEyebrow === 'Explore domains', 'Test 4b: Domain eyebrow updates to "Explore domains"', `Found: "${enEyebrow}"`);
    assert(enHeading === 'What do you want to learn today?', 'Test 4c: Domain heading updates to "What do you want to learn today?"', `Found: "${enHeading}"`);
    assert(enCta === 'Explore domain', 'Test 4d: Domain CTA updates to "Explore domain"', `Found: "${enCta}"`);
    assert(enProjCount === '1 guide', 'Test 4e: English singular count pill renders "1 guide"', `Found: "${enProjCount}"`);
    assert(enAiCount === '6 guides', 'Test 4f: English plural count pill renders "6 guides"', `Found: "${enAiCount}"`);

    // TEST 5: Dynamic Switching back to Hindi (हिं button click)
    await page.click('button[data-lang="hi"]');
    await page.waitForTimeout(300);

    const reHiLang = await page.$eval('html', el => el.getAttribute('lang'));
    const reHiEyebrow = await page.$eval('#domains-eyebrow', el => el.innerText.trim());
    const reHiProjCount = await page.$eval('[data-category="projects"] .count-pill', el => el.innerText.trim());

    assert(reHiLang === 'hi', 'Test 5a: Switching back to हिं updates html[lang] to "hi"', `Found: "${reHiLang}"`);
    assert(reHiEyebrow === 'चुने हुए विषय', 'Test 5b: Domain eyebrow returns to "चुने हुए विषय"', `Found: "${reHiEyebrow}"`);
    assert(reHiProjCount === '1 गाइड', 'Test 5c: Hindi count pill returns to "1 गाइड"', `Found: "${reHiProjCount}"`);

    await context.close();
  } catch (err) {
    console.error('Fatal error during i18n test run:', err);
    failCount++;
  } finally {
    await browser.close();
    server.kill();
  }

  console.log(`\n=== i18n Test Summary: ${passCount} Passed, ${failCount} Failed ===`);
  if (failCount > 0) process.exit(1);
}

runI18nTestSuite();
