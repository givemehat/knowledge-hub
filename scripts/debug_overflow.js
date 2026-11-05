import { chromium } from 'playwright';

async function check() {
  const browser = await chromium.launch();
  const page = await browser.newPage({ viewport: { width: 320, height: 600 } });
  await page.goto("http://localhost:4366/knowledge-hub/");
  const overflows = await page.evaluate(() => {
    const docWidth = 320;
    const elements = document.querySelectorAll("*");
    const found = [];
    elements.forEach(el => {
      const rect = el.getBoundingClientRect();
      if (rect.right > docWidth + 2) {
        found.push({
          tag: el.tagName,
          className: (el.className || "").toString().slice(0, 80),
          id: el.id,
          right: Math.round(rect.right),
          width: Math.round(rect.width)
        });
      }
    });
    return found;
  });
  console.log("Found overflowing elements count:", overflows.length);
  console.log("Top 10 overflowing:", overflows.slice(0, 10));
  await browser.close();
}

check().catch(console.error);
