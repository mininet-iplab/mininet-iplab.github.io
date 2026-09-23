import assert from 'node:assert/strict';
import { readFileSync, existsSync } from 'node:fs';
import { join } from 'node:path';
import { test } from 'node:test';

const root = new URL('..', import.meta.url).pathname;
const readRepoFile = (relativePath) => readFileSync(join(root, relativePath), 'utf8');

test('the project is configured as a static Astro site with Starlight', () => {
  const packageJson = JSON.parse(readRepoFile('package.json'));
  const astroConfig = readRepoFile('astro.config.mjs');

  assert.equal(packageJson.scripts.build, 'astro build');
  assert.match(astroConfig, /@astrojs\/starlight/);
  assert.match(astroConfig, /https:\/\/mininet-iplab\.github\.io/);
  assert.match(astroConfig, /base:\s*['"]\/['"]/);
});

test('the production artifact contains the landing page and documentation route', () => {
  const landingPage = join(root, 'dist', 'index.html');
  const documentationPage = join(root, 'dist', 'docs', 'index.html');

  assert.ok(existsSync(landingPage), 'landing page was not generated');
  assert.ok(existsSync(documentationPage), 'documentation page was not generated');

  const landingHtml = readFileSync(landingPage, 'utf8');
  const documentationHtml = readFileSync(documentationPage, 'utf8');

  assert.match(landingHtml, /Mininet-IPLab/);
  assert.match(landingHtml, /href="\/docs\/"/);
  assert.match(documentationHtml, /Understand/);
  assert.match(documentationHtml, /Get Started/);
});

test('the documentation shell exposes each intent-first navigation destination', () => {
  const documentationHtml = readFileSync(join(root, 'dist', 'docs', 'index.html'), 'utf8');
  const destinations = [
    'understand',
    'getting-started',
    'build-labs',
    'lab-examples',
    'web-ui',
    'reference',
    'contribute',
  ];

  for (const destination of destinations) {
    assert.ok(existsSync(join(root, 'dist', 'docs', destination, 'index.html')), `${destination} route was not generated`);
    assert.match(documentationHtml, new RegExp(`/docs/${destination}/`));
  }
});

test('the Pages workflow builds and exposes a static artifact', () => {
  const workflow = readRepoFile('.github/workflows/pages.yml');

  assert.match(workflow, /pull_request:/);
  assert.match(workflow, /npm ci/);
  assert.match(workflow, /npm run build/);
  assert.match(workflow, /actions\/upload-pages-artifact/);
  assert.match(workflow, /actions\/upload-artifact/);
  assert.match(workflow, /path:\s*dist/);
});
