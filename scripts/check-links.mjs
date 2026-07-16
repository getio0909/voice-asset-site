import { access, readFile, readdir } from 'node:fs/promises';
import { dirname, extname, join, resolve } from 'node:path';

const outputRoot = resolve('dist');

async function walk(current) {
  const entries = await readdir(current, { withFileTypes: true });
  const files = [];
  for (const entry of entries) {
    const path = join(current, entry.name);
    if (entry.isDirectory()) files.push(...(await walk(path)));
    else files.push(path);
  }
  return files;
}

async function exists(path) {
  try {
    await access(path);
    return true;
  } catch {
    return false;
  }
}

async function resolvesToOutput(source, href) {
  const clean = decodeURIComponent(href.split(/[?#]/, 1)[0]);
  const base = clean.startsWith('/') ? outputRoot : dirname(source);
  const target = resolve(base, clean.replace(/^\/+/, ''));
  if (!target.startsWith(outputRoot)) return false;
  const candidates = [target];
  if (clean.endsWith('/')) candidates.push(join(target, 'index.html'));
  else if (!extname(target)) candidates.push(`${target}.html`, join(target, 'index.html'));
  return (await Promise.all(candidates.map(exists))).some(Boolean);
}

const htmlFiles = (await walk(outputRoot)).filter((file) => file.endsWith('.html'));
const failures = [];
if (!(await exists(join(outputRoot, 'index.html')))) {
  failures.push('dist/index.html: missing deployment root page');
}
for (const file of htmlFiles) {
  const html = await readFile(file, 'utf8');
  const hrefs = [...html.matchAll(/\bhref=["']([^"']+)["']/g)].map((match) => match[1]);
  for (const href of hrefs) {
    if (/^(?:https?:|mailto:|tel:|data:|javascript:|#)/.test(href)) continue;
    if (!(await resolvesToOutput(file, href))) failures.push(`${file}: ${href}`);
  }
}

if (failures.length) {
  console.error(`Broken internal links:\n${failures.join('\n')}`);
  process.exit(1);
}

console.log(`internal links verified across ${htmlFiles.length} HTML file(s)`);
