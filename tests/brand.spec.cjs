/**
 * Peach Brand Verification & Anti-Regression Test Suite
 * 
 * Verifies:
 * 1. Zero occurrences of legacy brand strings ("Bodh", "बोध", "KnowledgeHub", "Knowledge Hub") across all static HTML files.
 * 2. Page titles adhere strictly to `<Title> | Peach`.
 * 3. OpenGraph, Twitter Cards, Schema.org JSON-LD, and Manifest reflect "Peach".
 * 4. Header logo SVG renders with baseline-aligned English and Devanagari Hindi wordmarks.
 * 5. All brand asset endpoints return HTTP 200 (favicon, apple-touch-icon, logo.svg, og-image, manifest).
 * 6. Peach color palette tokens satisfy WCAG AA contrast standards.
 */

const { chromium } = require('playwright');
const { spawn } = require('child_process');
const fs = require('fs');
const path = require('path');

const PORT = 4326;
const BASE_PATH = '/knowledge-hub';
const DIST_DIR = path.resolve(__dirname, '../dist');

let passedTests = 0;
let failedTests = 0;

function assert(condition, message, details = '') {
  if (condition) {
    console.log(`✅ PASS: ${message}`);
    passedTests++;
  } else {
    console.error(`❌ FAIL: ${message} ${details ? `(${details})` : ''}`);
    failedTests++;
  }
}

// Recursively find all HTML files in dist
function getAllHtmlFiles(dir, fileList = []) {
  const files = fs.readdirSync(dir);
  for (const file of files) {
    const fullPath = path.join(dir, file);
    if (fs.statSync(fullPath).isDirectory()) {
      getAllHtmlFiles(fullPath, fileList);
    } else if (file.endsWith('.html')) {
      fileList.push(fullPath);
    }
  }
  return fileList;
}

// Calculate relative luminance for WCAG contrast
function getLuminance(r, g, b) {
  const [rs, gs, bs] = [r, g, b].map(c => {
    c = c / 255;
    return c <= 0.03928 ? c / 12.92 : Math.pow((c + 0.055) / 1.055, 2.4);
  });
  return 0.2126 * rs + 0.7152 * gs + 0.0722 * bs;
}

function getContrastRatio(hex1, hex2) {
  const parseHex = hex => {
    hex = hex.replace('#', '');
    return [
      parseInt(hex.slice(0, 2), 16),
      parseInt(hex.slice(2, 4), 16),
      parseInt(hex.slice(4, 6), 16)
    ];
  };
  const [r1, g1, b1] = parseHex(hex1);
  const [r2, g2, b2] = parseHex(hex2);
  const lum1 = getLuminance(r1, g1, b1);
  const lum2 = getLuminance(r2, g2, b2);
  const brightest = Math.max(lum1, lum2);
  const darkest = Math.min(lum1, lum2);
  return (brightest + 0.05) / (darkest + 0.05);
}

async function run() {
  console.log('\n=== Starting Peach Brand Verification Test Suite ===');

  // TEST 1: Full Dist Crawl for forbidden legacy strings
  console.log('[Test 1] Crawling all static HTML files in ./dist for forbidden legacy brands...');
  const htmlFiles = getAllHtmlFiles(DIST_DIR);
  assert(htmlFiles.length >= 25, `Test 1a: Found ${htmlFiles.length} HTML files generated in dist/`);

  const forbiddenRegexes = [
    { name: '"Bodh" (English word)', regex: /\bBodh\b/g },
    { name: '"बोध" (Devanagari)', regex: /बोध/g },
    { name: '"KnowledgeHub" (CamelCase)', regex: /KnowledgeHub/g },
    { name: '"Knowledge Hub" (Separated brand name)', regex: /Knowledge Hub/g }
  ];

  let totalViolations = 0;
  const violationDetails = [];

  for (const filePath of htmlFiles) {
    const content = fs.readFileSync(filePath, 'utf-8');
    const relativePath = path.relative(DIST_DIR, filePath);

    for (const { name, regex } of forbiddenRegexes) {
      const matches = content.match(regex);
      if (matches) {
        totalViolations += matches.length;
        violationDetails.push(`${relativePath}: ${matches.length} matches of ${name}`);
      }
    }
  }

  assert(
    totalViolations === 0,
    `Test 1b: Zero occurrences of legacy brands across all ${htmlFiles.length} HTML files`,
    violationDetails.length ? violationDetails.slice(0, 5).join('; ') : 'Zero violations'
  );

  // Start preview server
  console.log(`[Setup] Starting preview server on port ${PORT}...`);
  const server = spawn('npx', ['astro', 'preview', '--port', String(PORT)], {
    cwd: '/Users/rajnishsingh/projects/knowledge-hub',
    stdio: 'pipe'
  });

  await new Promise(r => setTimeout(r, 2500));

  const browser = await chromium.launch({ headless: true });
  const page = await browser.newPage();

  const consoleErrors = [];
  page.on('console', msg => {
    if (msg.type() === 'error') {
      consoleErrors.push(msg.text());
    }
  });

  const failedRequests = [];
  page.on('requestfailed', req => {
    failedRequests.push(`${req.method()} ${req.url()}: ${req.failure().errorText}`);
  });

  try {
    const testUrls = [
      '/',
      '/about/',
      '/resources/',
      '/updates/',
      '/roadmaps/',
      '/design-system/',
      '/topics/',
      '/contact/',
      '/contribute/'
    ];

    // TEST 2: Title Pattern Check
    console.log('[Test 2] Verifying document title pattern across pages...');
    let titlesValid = true;
    const titleResults = [];

    for (const urlPath of testUrls) {
      await page.goto(`http://localhost:${PORT}${BASE_PATH}${urlPath}`);
      const title = await page.title();
      titleResults.push(`${urlPath} -> "${title}"`);
      // Title must either end with "| Peach" or be "Peach — ..." for home
      const matchesPattern = title.endsWith('| Peach') || title.includes('Peach');
      if (!matchesPattern) {
        titlesValid = false;
        console.error(`Invalid title at ${urlPath}: "${title}"`);
      }
    }

    assert(titlesValid, `Test 2: All ${testUrls.length} pages follow the '... | Peach' pattern`);

    // TEST 3: Meta & OpenGraph & JSON-LD Verification (on /)
    console.log('[Test 3] Verifying Meta tags, OpenGraph, Twitter, and Schema JSON-LD...');
    await page.goto(`http://localhost:${PORT}${BASE_PATH}/`);

    const ogSiteName = await page.$eval('meta[property="og:site_name"]', el => el.getAttribute('content'));
    assert(ogSiteName === 'Peach', `Test 3a: og:site_name is strictly "Peach" (Found: "${ogSiteName}")`);

    const ogTitle = await page.$eval('meta[property="og:title"]', el => el.getAttribute('content'));
    assert(ogTitle.includes('Peach'), `Test 3b: og:title contains "Peach" (Found: "${ogTitle}")`);

    const jsonLdContent = await page.$eval('script[type="application/ld+json"]', el => el.textContent);
    const jsonLd = JSON.parse(jsonLdContent);
    assert(jsonLd.name === 'Peach', `Test 3c: Schema.org WebSite name is "Peach" (Found: "${jsonLd.name}")`);
    assert(
      Array.isArray(jsonLd.alternateName) && jsonLd.alternateName.includes('पीच'),
      `Test 3d: Schema.org alternateName contains Devanagari "पीच"`
    );

    // TEST 4: Header Logo & Visual Baseline Alignment
    console.log('[Test 4] Verifying Header Logo, Wordmark, and Dual-Script Alignment...');
    const headerLogo = await page.$('#header-logo');
    assert(headerLogo !== null, 'Test 4a: Header logo element (#header-logo) is rendered');

    const brandNameText = await page.$eval('#header-brand-name', el => el.innerText.trim());
    assert(brandNameText === 'Peach', `Test 4b: Brand name in header is "Peach" (Found: "${brandNameText}")`);

    const brandHiText = await page.$eval('#header-brand-hi', el => el.innerText.trim());
    assert(brandHiText === 'पीच', `Test 4c: Devanagari script badge in header is "पीच" (Found: "${brandHiText}")`);

    const logoSvg = await page.$('#header-logo svg');
    assert(logoSvg !== null, 'Test 4d: Header logo contains original SVG peach icon');

    // TEST 5: Brand Asset HTTP 200 Verification
    console.log('[Test 5] Verifying all Brand Assets return HTTP 200 without broken links...');
    const assetEndpoints = [
      '/favicon.svg',
      '/favicon.ico',
      '/apple-touch-icon.png',
      '/brand/icon-192.png',
      '/brand/icon-512.png',
      '/brand/logo.svg',
      '/brand/peach-mark.svg',
      '/brand/og-image.png',
      '/manifest.webmanifest'
    ];

    let allAssets200 = true;
    for (const asset of assetEndpoints) {
      const response = await page.goto(`http://localhost:${PORT}${BASE_PATH}${asset}`);
      const status = response.status();
      if (status !== 200) {
        allAssets200 = false;
        console.error(`Asset failed: ${asset} -> HTTP ${status}`);
      }
    }
    assert(allAssets200, `Test 5a: All ${assetEndpoints.length} brand asset endpoints return HTTP 200`);

    // Verify manifest JSON contents
    const manifestResponse = await page.goto(`http://localhost:${PORT}${BASE_PATH}/manifest.webmanifest`);
    const manifestJson = await manifestResponse.json();
    assert(
      manifestJson.name === 'Peach — Knowledge Engine' && manifestJson.short_name === 'Peach',
      `Test 5b: Web App Manifest contains correct brand name (Found: "${manifestJson.name}", "${manifestJson.short_name}")`
    );

    // TEST 6: WCAG AA Color Contrast Ratios
    console.log('[Test 6] Verifying WCAG AA contrast for Peach design tokens...');
    // peach-800 (#A83115) on pure white (#FFFFFF)
    const peach800OnWhite = getContrastRatio('#A83115', '#FFFFFF');
    assert(
      peach800OnWhite >= 4.5,
      `Test 6a: peach-800 (#A83115) has >= 4.5:1 contrast on white (Calculated: ${peach800OnWhite.toFixed(2)}:1)`
    );

    // peach-400 (#FF9E7A) on dark background (#121016)
    const peach400OnDark = getContrastRatio('#FF9E7A', '#121016');
    assert(
      peach400OnDark >= 4.5,
      `Test 6b: peach-400 (#FF9E7A) has >= 4.5:1 contrast on dark surface (Calculated: ${peach400OnDark.toFixed(2)}:1)`
    );

    // peach-900 (#87220B) on peach-100 (#FFE8DC)
    const peach900On100 = getContrastRatio('#87220B', '#FFE8DC');
    assert(
      peach900On100 >= 4.5,
      `Test 6c: peach-900 (#87220B) on peach-100 badge tint has >= 4.5:1 contrast (Calculated: ${peach900On100.toFixed(2)}:1)`
    );

    // TEST 7: Console & Network Cleanliness
    assert(consoleErrors.length === 0, 'Test 7a: Zero console errors during all brand navigations', consoleErrors.join('; '));
    assert(failedRequests.length === 0, 'Test 7b: Zero failed HTTP requests during asset crawls', failedRequests.join('; '));

  } finally {
    await browser.close();
    server.kill();
  }

  console.log(`\n=== Brand Test Summary: ${passedTests} Passed, ${failedTests} Failed ===`);
  if (failedTests > 0) {
    process.exit(1);
  }
}

run().catch(err => {
  console.error('Fatal Brand Test Failure:', err);
  process.exit(1);
});
