const fs = require('fs');
const path = require('path');
const { chromium } = require('playwright');

// 1. Standalone Peach SVG Mark (36x36)
const peachMarkSvg = `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 36 36" fill="none">
  <defs>
    <!-- Rich Peach to Coral Gradient -->
    <linearGradient id="peach-body-grad" x1="8" y1="6" x2="28" y2="31" gradientUnits="userSpaceOnUse">
      <stop offset="0%" stop-color="#FFB396"/>
      <stop offset="45%" stop-color="#FF7A59"/>
      <stop offset="100%" stop-color="#DE4321"/>
    </linearGradient>
    
    <!-- Bookmark Leaf Gradient (Emerald to Indigo) -->
    <linearGradient id="peach-leaf-grad" x1="18" y1="3" x2="28" y2="9" gradientUnits="userSpaceOnUse">
      <stop offset="0%" stop-color="#10B981"/>
      <stop offset="60%" stop-color="#0E8A8A"/>
      <stop offset="100%" stop-color="#5B3DF5"/>
    </linearGradient>

    <!-- Cheek Glow Filter -->
    <radialGradient id="peach-glow" cx="13" cy="17" r="10" gradientUnits="userSpaceOnUse">
      <stop offset="0%" stop-color="#FFE8DC" stop-opacity="0.6"/>
      <stop offset="100%" stop-color="#FF7A59" stop-opacity="0"/>
    </radialGradient>
  </defs>

  <!-- Learning Bookmark Leaf at Cleft -->
  <path d="M 17.5 8.5 C 19 3.5 25.5 3 28 5 C 28 8.5 23 10.5 17.5 8.5 Z" fill="url(#peach-leaf-grad)"/>
  <path d="M 18.5 8.2 C 21.5 6 25 5.5 27 5.2" stroke="#FFFFFF" stroke-width="0.8" stroke-linecap="round" opacity="0.8"/>

  <!-- Peach Body Shape with Natural Top Cleft -->
  <path d="M 18 9.5 C 13.5 6 6 10 6 18 C 6 25.5 12 30.5 18 30.5 C 24 30.5 30 25.5 30 18 C 30 10 22.5 6 18 9.5 Z" fill="url(#peach-body-grad)"/>
  
  <!-- Subtle Soft Cheek Highlight -->
  <circle cx="13" cy="18" r="7" fill="url(#peach-glow)"/>

  <!-- Subtle Cleft Contour Line (Learning Flow) -->
  <path d="M 18 9.5 C 18 14 16.8 17 16.8 20" stroke="#FFFFFF" stroke-width="1.3" stroke-linecap="round" opacity="0.45"/>

  <!-- Central Knowledge Node / Seed of Wisdom -->
  <circle cx="18" cy="22" r="1.5" fill="#FFFFFF" opacity="0.95"/>
  <circle cx="18" cy="22" r="2.4" stroke="#5B3DF5" stroke-width="0.6" stroke-opacity="0.5"/>
</svg>`;

// 2. Favicon SVG (Containerized for crisp rendering on dark and light browser tabs)
const faviconSvg = `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 36 36" fill="none">
  <rect width="36" height="36" rx="9" fill="#141118"/>
  <g transform="translate(0, 0)">
    ${peachMarkSvg.replace('<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 36 36" fill="none">', '').replace('</svg>', '')}
  </g>
</svg>`;

// 3. Brand Wordmark & Logo SVG (160x40)
const logoSvg = `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 160 40" fill="none">
  <g transform="translate(2, 2)">
    ${peachMarkSvg.replace('<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 36 36" fill="none">', '').replace('</svg>', '')}
  </g>
  <!-- English Wordmark -->
  <text x="44" y="27" font-family="'Plus Jakarta Sans', system-ui, -apple-system, sans-serif" font-weight="900" font-size="22" fill="#14121A" letter-spacing="-0.03em">Peach</text>
  <!-- Devanagari Accent -->
  <text x="112" y="27" font-family="'Noto Sans Devanagari', sans-serif" font-weight="700" font-size="14" fill="#DE4321">पीच</text>
</svg>`;

// 4. OpenGraph 1200x630 Image Template SVG
const ogImageSvg = `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1200 630" fill="none">
  <!-- Deep Obsidian Canvas -->
  <rect width="1200" height="630" fill="#121016"/>

  <!-- Ambient Glow Meshes -->
  <circle cx="240" cy="180" r="340" fill="#FF7A59" fill-opacity="0.16" filter="blur(140px)"/>
  <circle cx="1020" cy="460" r="320" fill="#5B3DF5" fill-opacity="0.14" filter="blur(140px)"/>
  <circle cx="600" cy="560" r="260" fill="#10B981" fill-opacity="0.08" filter="blur(120px)"/>

  <!-- Top Accent Ribbon: Peach, Coral, Indigo -->
  <rect x="0" y="0" width="400" height="6" fill="#FFB396"/>
  <rect x="400" y="0" width="400" height="6" fill="#FF7A59"/>
  <rect x="800" y="0" width="400" height="6" fill="#5B3DF5"/>

  <!-- Brand Pill Header -->
  <g transform="translate(100, 80)">
    <rect width="210" height="44" rx="22" fill="white" fill-opacity="0.08" stroke="white" stroke-opacity="0.15" stroke-width="1.5"/>
    <circle cx="24" cy="22" r="6" fill="#FF7A59"/>
    <text x="40" y="28" font-family="'Plus Jakarta Sans', system-ui, sans-serif" font-size="15" font-weight="800" fill="#F8FAFC" letter-spacing="0.5">
      PEACH • पीच
    </text>
  </g>

  <!-- Large Peach Logo Mark on Right -->
  <g transform="translate(860, 160) scale(7)">
    ${peachMarkSvg.replace('<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 36 36" fill="none">', '').replace('</svg>', '')}
  </g>

  <!-- Main Headline -->
  <g transform="translate(100, 230)">
    <text x="0" y="0" font-family="'Plus Jakarta Sans', system-ui, sans-serif" font-size="62" font-weight="900" fill="#FFFFFF" letter-spacing="-1.5">
      Learn Tech & The World,
    </text>
    <text x="0" y="78" font-family="'Plus Jakarta Sans', system-ui, sans-serif" font-size="62" font-weight="900" fill="url(#title-peach-grad)" letter-spacing="-1.5">
      With Verified Sources.
    </text>
  </g>

  <!-- Subtitle -->
  <g transform="translate(100, 390)">
    <text x="0" y="0" font-family="'Inter', system-ui, sans-serif" font-size="22" font-weight="500" fill="#CBD5E1" letter-spacing="-0.2">
      Roadmaps, theory and verified links, in one place.
    </text>
    <text x="0" y="36" font-family="'Noto Sans Devanagari', 'Inter', system-ui, sans-serif" font-size="20" font-weight="500" fill="#94A3B8">
      सटीक रोडमैप, सिद्धांत और जाँचे-परखे स्रोत • 100% मुफ़्त एवं विज्ञापन-रहित
    </text>
  </g>

  <!-- Footer Metric Badges -->
  <g transform="translate(100, 520)">
    <rect width="320" height="44" rx="14" fill="white" fill-opacity="0.06" stroke="white" stroke-opacity="0.1"/>
    <circle cx="24" cy="22" r="11" fill="#FF7A59"/>
    <text x="24" y="26" font-family="'Inter', sans-serif" font-size="12" font-weight="bold" fill="white" text-anchor="middle">P</text>
    <text x="46" y="27" font-family="'Inter', sans-serif" font-size="13" font-weight="600" fill="#F1F5F9">
      Peach Knowledge Engine
    </text>
  </g>

  <defs>
    <linearGradient id="title-peach-grad" x1="0" y1="0" x2="600" y2="0" gradientUnits="userSpaceOnUse">
      <stop offset="0%" stop-color="#FFB396"/>
      <stop offset="60%" stop-color="#FF7A59"/>
      <stop offset="100%" stop-color="#FF9E7A"/>
    </linearGradient>
  </defs>
</svg>`;

// Write all SVGs
const publicDir = path.join(__dirname, '../public');
const brandDir = path.join(publicDir, 'brand');
if (!fs.existsSync(brandDir)) fs.mkdirSync(brandDir, { recursive: true });

fs.writeFileSync(path.join(publicDir, 'favicon.svg'), faviconSvg);
fs.writeFileSync(path.join(brandDir, 'favicon.svg'), faviconSvg);
fs.writeFileSync(path.join(brandDir, 'peach-mark.svg'), peachMarkSvg);
fs.writeFileSync(path.join(brandDir, 'logo.svg'), logoSvg);
fs.writeFileSync(path.join(brandDir, 'og-image.svg'), ogImageSvg);

console.log('✅ Generated all brand SVGs!');

// Use Playwright to render pixel-perfect PNG icons
async function renderPngIcons() {
  const browser = await chromium.launch();
  const page = await browser.newPage();

  // Render 180x180 Apple Touch Icon
  await page.setViewportSize({ width: 180, height: 180 });
  await page.setContent(`<!DOCTYPE html><html><body style="margin:0;padding:0;background:transparent;">${faviconSvg.replace('width="36" height="36"', 'width="180" height="180"')}</body></html>`);
  await page.screenshot({ path: path.join(publicDir, 'apple-touch-icon.png'), omitBackground: false });

  // Render 192x192 PWA Icon
  await page.setViewportSize({ width: 192, height: 192 });
  await page.setContent(`<!DOCTYPE html><html><body style="margin:0;padding:0;background:transparent;">${faviconSvg.replace('width="36" height="36"', 'width="192" height="192"')}</body></html>`);
  await page.screenshot({ path: path.join(brandDir, 'icon-192.png'), omitBackground: false });

  // Render 512x512 PWA Icon
  await page.setViewportSize({ width: 512, height: 512 });
  await page.setContent(`<!DOCTYPE html><html><body style="margin:0;padding:0;background:transparent;">${faviconSvg.replace('width="36" height="36"', 'width="512" height="512"')}</body></html>`);
  await page.screenshot({ path: path.join(brandDir, 'icon-512.png'), omitBackground: false });

  // Render 32x32 favicon.ico (as PNG stream)
  await page.setViewportSize({ width: 32, height: 32 });
  await page.setContent(`<!DOCTYPE html><html><body style="margin:0;padding:0;background:transparent;">${faviconSvg.replace('width="36" height="36"', 'width="32" height="32"')}</body></html>`);
  const icoBuffer = await page.screenshot({ type: 'png', omitBackground: false });
  fs.writeFileSync(path.join(publicDir, 'favicon.ico'), icoBuffer);

  // Render 1200x630 OG PNG
  await page.setViewportSize({ width: 1200, height: 630 });
  await page.setContent(`<!DOCTYPE html><html><body style="margin:0;padding:0;background:#121016;">${ogImageSvg}</body></html>`);
  await page.screenshot({ path: path.join(brandDir, 'og-image.png'), omitBackground: false });

  await browser.close();
  console.log('✅ Generated all PNG and ICO icon assets (apple-touch-icon, icon-192, icon-512, favicon.ico, og-image.png)!');
}

renderPngIcons().catch(err => {
  console.error(err);
  process.exit(1);
});
