import { readFile, readdir } from 'node:fs/promises';
import { join, resolve } from 'node:path';

const outputRoot = resolve('dist');

async function walk(current) {
  const entries = await readdir(current, { withFileTypes: true });
  const files = [];
  for (const entry of entries) {
    const path = join(current, entry.name);
    if (entry.isDirectory()) files.push(...(await walk(path)));
    else if (path.endsWith('.html')) files.push(path);
  }
  return files;
}

const failures = [];
const htmlFiles = await walk(outputRoot);
for (const file of htmlFiles) {
  const html = await readFile(file, 'utf8');
  const checks = [
    [/<html\b[^>]*\blang=["'][^"']+["']/i, 'missing document language'],
    [/<meta\b[^>]*\bname=["']viewport["']/i, 'missing viewport metadata'],
    [/<title>\s*[^<]+\s*<\/title>/i, 'missing page title'],
    [/<main\b/i, 'missing main landmark'],
    [/<h1\b/i, 'missing level-one heading'],
  ];
  for (const [pattern, message] of checks) {
    if (!pattern.test(html)) failures.push(`${file}: ${message}`);
  }
  for (const image of html.match(/<img\b[^>]*>/gi) ?? []) {
    if (!/\balt=["'][^"']*["']/i.test(image)) failures.push(`${file}: image missing alt attribute`);
  }
  const ids = [...html.matchAll(/\bid=["']([^"']+)["']/gi)].map((match) => match[1]);
  const duplicateIDs = ids.filter((id, index) => ids.indexOf(id) !== index);
  if (duplicateIDs.length) failures.push(`${file}: duplicate id ${duplicateIDs[0]}`);
}

if (failures.length) {
  console.error(`Accessibility checks failed:\n${failures.join('\n')}`);
  process.exit(1);
}

console.log(`Accessibility structure verified across ${htmlFiles.length} HTML file(s).`);
