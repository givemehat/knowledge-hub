const fs = require('fs');
const path = require('path');

// Banned Roman-Hindi (Hinglish) keywords in official UI translations
const FORBIDDEN_WORDS = [
  'karo',
  'dekho',
  'seekho',
  'chune hue',
  'chune',
  'aaj',
  'ke liye',
  'hai',
  'bina',
  'sach mein',
  'padho',
  'shuru karo',
  'aa rahe'
];

function checkFile(filePath) {
  const content = fs.readFileSync(filePath, 'utf-8');
  const json = JSON.parse(content);
  const jsonString = JSON.stringify(json).toLowerCase();

  const foundViolations = [];

  for (const word of FORBIDDEN_WORDS) {
    // Regex for whole word match in roman strings
    const regex = new RegExp(`\\b${word}\\b`, 'i');
    if (regex.test(jsonString)) {
      foundViolations.push(word);
    }
  }

  return foundViolations;
}

const hiPath = path.resolve('src/i18n/hi.json');
const enPath = path.resolve('src/i18n/en.json');

console.log('--- Checking i18n dictionaries for forbidden Roman-Hindi slang ---');

let hasErrors = false;

[hiPath, enPath].forEach(filePath => {
  const violations = checkFile(filePath);
  if (violations.length > 0) {
    console.error(`❌ FAIL: Found Roman-Hindi words in ${path.basename(filePath)}:`, violations);
    hasErrors = true;
  } else {
    console.log(`✅ PASS: ${path.basename(filePath)} contains zero Roman-Hindi slang.`);
  }
});

if (hasErrors) {
  process.exit(1);
} else {
  console.log('✅ All i18n strings strictly adhere to clean Hindi (Devanagari) or clean English.');
  process.exit(0);
}
