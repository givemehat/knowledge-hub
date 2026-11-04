import fs from 'fs';
import path from 'path';

const contentDir = '/Users/rajnishsingh/projects/knowledge-hub/content/topics';
const files = fs.readdirSync(contentDir).filter(f => f.endsWith('.mdx')).sort();

console.log(`Found ${files.length} MDX files:`);
for (const f of files) {
  const raw = fs.readFileSync(path.join(contentDir, f), 'utf-8');
  const parts = raw.split('---');
  if (parts.length >= 3) {
    const slugMatch = parts[1].match(/slug:\s*["']?([^"'\n]+)["']?/);
    const titleMatch = parts[1].match(/title:\s*["']?([^"'\n]+)["']?/);
    console.log(`- ${f} -> slug: ${slugMatch ? slugMatch[1] : 'unknown'} | title: ${titleMatch ? titleMatch[1].slice(0, 50) : ''}`);
  }
}
