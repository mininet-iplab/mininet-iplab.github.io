#!/usr/bin/env node
// Archive the current documentation as a past version before documenting a new core release.
//
//   node scripts/archive-docs-version.mjs v0.1.0
//
// Copies src/content/docs/docs/ (without earlier archives) to src/content/docs/docs/<version>/ and rewrites its
// absolute /docs/ links to /docs/<version>/, so the archived pages keep linking to each other. Screenshots are shared
// from src/assets/, so the copy moves the relative image paths one directory deeper. Afterwards, add the version to
// src/versions.ts and update the new latest entry, as described in README.md.
import { cpSync, existsSync, readdirSync, readFileSync, statSync, writeFileSync } from 'node:fs';
import { join, relative } from 'node:path';

const version = process.argv[2];
if (!/^v\d+\.\d+\.\d+$/.test(version ?? '')) {
  console.error('Usage: node scripts/archive-docs-version.mjs vX.Y.Z');
  process.exit(1);
}

const docsRoot = new URL('../src/content/docs/docs/', import.meta.url).pathname;
const target = join(docsRoot, version);
if (existsSync(target)) {
  console.error(`${relative(process.cwd(), target)} already exists.`);
  process.exit(1);
}

// Copy entry by entry: the target lives inside docsRoot, and earlier archives stay where they are.
const isArchive = (name) => /^v\d+\.\d+\.\d+$/.test(name);
for (const name of readdirSync(docsRoot).filter((entry) => !isArchive(entry))) {
  cpSync(join(docsRoot, name), join(target, name), { recursive: true });
}

const walk = (dir) =>
  readdirSync(dir).flatMap((name) => {
    const path = join(dir, name);
    return statSync(path).isDirectory() ? walk(path) : [path];
  });

for (const file of walk(target).filter((path) => /\.mdx?$/.test(path))) {
  // Astro would slugify the `v0.1.0` directory to `v010`, so pin each page's route to /docs/<version>/<path>/.
  const page = relative(target, file).replace(/\.mdx?$/, '').replace(/(^|\/)index$/, '');
  const slug = ['docs', version, page].filter(Boolean).join('/');
  const text = readFileSync(file, 'utf8')
    .replace(/^---\n/, `---\nslug: ${slug}\n`)
    .replace(/(\]\(|href=")\/docs\//g, `$1/docs/${version}/`)
    .replace(/\]\((\.\.\/)+assets\//g, (match) => match.replace('](', '](../'));
  writeFileSync(file, text);
}

console.log(`Archived the current docs as ${relative(process.cwd(), target)}.`);
