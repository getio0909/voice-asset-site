import { readdir } from 'node:fs/promises';
import { extname, join, relative, resolve } from 'node:path';

const docsRoot = resolve('src/content/docs');
const locales = ['en', 'zh-cn'];

async function collectMarkdown(root, current = root, ignoredRootDirectories = new Set()) {
  const entries = await readdir(current, { withFileTypes: true });
  const files = [];
  for (const entry of entries) {
    const path = join(current, entry.name);
    if (entry.isDirectory()) {
      if (current === root && ignoredRootDirectories.has(entry.name)) continue;
      files.push(...(await collectMarkdown(root, path, ignoredRootDirectories)));
    } else if (['.md', '.mdx'].includes(extname(entry.name))) {
      files.push(relative(root, path).replaceAll('\\', '/').replace(/\.mdx?$/, ''));
    }
  }
  return files.sort();
}

const pages = new Map([
  ['en', await collectMarkdown(join(docsRoot, 'en'))],
  ['zh-cn', await collectMarkdown(docsRoot, docsRoot, new Set(['en']))],
]);

const expected = pages.get(locales[0]);
const failures = [];
for (const locale of locales.slice(1)) {
  const actual = pages.get(locale);
  const missing = expected.filter((page) => !actual.includes(page));
  const extra = actual.filter((page) => !expected.includes(page));
  if (missing.length || extra.length) {
    failures.push(`${locale}: missing [${missing.join(', ')}], extra [${extra.join(', ')}]`);
  }
}

if (failures.length) {
  console.error(`Locale pages are not aligned:\n${failures.join('\n')}`);
  process.exit(1);
}

console.log(`i18n parity verified for ${expected.length} page(s) in ${locales.join(', ')}`);
