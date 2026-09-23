import assert from 'node:assert/strict';
import { readFileSync, existsSync } from 'node:fs';
import { join } from 'node:path';
import { test } from 'node:test';

const root = new URL('..', import.meta.url).pathname;
const readRepoFile = (relativePath) => readFileSync(join(root, relativePath), 'utf8');
const readBuiltPage = (relativePath) => readFileSync(join(root, 'dist', relativePath, 'index.html'), 'utf8');
const visibleText = (html) => html.replace(/<[^>]+>/g, ' ').replace(/\s+/g, ' ');

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

test('the landing page presents the project and the two visitor paths', () => {
  const landingHtml = readFileSync(join(root, 'dist', 'index.html'), 'utf8');

  assert.match(
    landingHtml,
    /Mininet-IPLab is a network emulation framework for teaching IP routing and core network services on top of Mininet\./,
  );
  assert.match(landingHtml, /alt="Mininet-IPLab Web UI showing a running Lab with a topology and browser terminals"/);
  assert.match(landingHtml, /href="\/docs\/understand\/"/);
  assert.match(landingHtml, /href="\/docs\/getting-started\/"/);
  assert.match(landingHtml, /href="\/docs\/getting-started\/quickstart\/"/);
});

test('the Understand page explains the stable Lab model', () => {
  const understandHtml = readBuiltPage('docs/understand');
  const understandText = visibleText(understandHtml);

  assert.match(understandText, /Stable.*core.*v0\.1\.0/);
  assert.match(understandText, /Lab Example/);
  assert.match(understandText, /Guide/);
  assert.match(understandText, /Layout/);
  assert.match(understandText, /Exercise Configuration/);
  assert.match(understandText, /Lab.*Topology/);
  assert.match(understandText, /Topology.*Nodes.*Links/);
  assert.match(understandText, /Link.*connects/);
  assert.match(understandHtml, /href="\/docs\/build-labs\/"/);
});

test('the Get Started page gives the stable installation path and platform caveat', () => {
  const gettingStartedHtml = readBuiltPage('docs/getting-started');
  const gettingStartedText = visibleText(gettingStartedHtml);

  assert.match(gettingStartedText, /Stable.*core.*v0\.1\.0/);
  assert.match(gettingStartedText, /Linux-capable host/);
  assert.match(gettingStartedText, /Docker Engine.*Docker Compose/);
  assert.match(gettingStartedText, /Open vSwitch kernel modules.*host/);
  assert.match(gettingStartedText, /macOS.*Windows/);
  assert.match(gettingStartedText, /Linux VM/);
  assert.match(gettingStartedText, /docker compose build/);
  assert.match(gettingStartedText, /docker compose up -d/);
  assert.match(gettingStartedText, /docker compose exec mniplab python3 examples\/static-lab\.py --enable-web/);
  assert.match(gettingStartedText, /localhost:8050/);
});

test('the First Lab quickstart guides static-lab observations and recovery', () => {
  const quickstartHtml = readBuiltPage('docs/getting-started/quickstart');
  const quickstartText = visibleText(quickstartHtml);

  assert.match(quickstartText, /Stable.*core.*v0\.1\.0/);
  assert.match(quickstartText, /static-lab/);
  assert.match(quickstartText, /docker compose build/);
  assert.match(quickstartText, /docker compose up -d/);
  assert.match(quickstartText, /docker compose exec mniplab python3 examples\/static-lab\.py --enable-web/);
  assert.match(quickstartText, /192\.168\.1\.2/);
  assert.match(quickstartText, /192\.168\.2\.2/);
  assert.match(quickstartText, /10\.10\.1\.1/);
  assert.match(quickstartText, /static route/i);
  assert.match(quickstartText, /Open vSwitch/i);
  assert.match(quickstartText, /docker compose.*cleanup|python -m mniplab cleanup/i);
  assert.match(
    quickstartHtml,
    /href="https:\/\/github\.com\/mininet-iplab\/mininet-iplab\/blob\/v0\.1\.0\/examples\/static-lab\.py"/,
  );
});

test('the Build Labs guide explains the model and authoring seam', () => {
  const buildLabsHtml = readBuiltPage('docs/build-labs');
  const buildLabsText = visibleText(buildLabsHtml);

  assert.match(buildLabsText, /Development/);
  for (const term of ['Lab', 'Lab Example', 'Guide', 'Topology', 'Node', 'Link', 'Layout']) {
    assert.match(buildLabsText, new RegExp(term), `${term} is missing from the authoring guide`);
  }
  assert.match(buildLabsText, /Lab shape/);
  assert.match(buildLabsText, /Learner.*Exercise Configuration/);
  assert.match(buildLabsText, /CLI Mode/);
  assert.match(buildLabsText, /Web UI Mode/);
  assert.match(buildLabsText, /addRouter/);
  assert.match(buildLabsText, /addHost/);
  assert.match(buildLabsText, /addLink/);
  assert.match(buildLabsText, /add_frr_config/);
  assert.match(buildLabsText, /addService/);
  assert.match(buildLabsText, /DHCPService/);
  assert.match(buildLabsText, /Lab Example is the repeatable Python recipe.*Lab is the one emulated network running now/);
  assert.match(buildLabsText, /Topology.*shape of a Lab/);
  assert.match(buildLabsText, /Service is also not a kind of Node/);
  assert.match(buildLabsText, /does not add or remove Nodes.*rewire Links/);
  assert.match(buildLabsText, /Layout.*does not add Nodes/);
  assert.match(buildLabsText, /examples\/.*lab-name.*layout\.json/);
  assert.match(buildLabsText, /examples\/layouts\/.*lab-id.*json/);
  assert.match(buildLabsText, /examples\/guides\/.*lab-id.*md/);
  assert.match(buildLabsText, /Service/);
  assert.match(
    buildLabsHtml,
    /href="https:\/\/github\.com\/mininet-iplab\/mininet-iplab\/blob\/v0\.1\.0\/docs\/CREATE_LAB\.md"/,
  );
  assert.match(
    buildLabsHtml,
    /href="https:\/\/github\.com\/mininet-iplab\/mininet-iplab\/blob\/a4a9a6a2c7b03fde838d4ff0c59d68567a858b2a\/docs\/CREATE_LAB\.md#services"/,
  );
  assert.match(
    buildLabsHtml,
    /href="https:\/\/github\.com\/mininet-iplab\/mininet-iplab\/blob\/a4a9a6a2c7b03fde838d4ff0c59d68567a858b2a\/examples\/dhcp-lab\.py"/,
  );
});

test('the routing learning path exposes stable concepts and tasks', () => {
  const learningPathHtml = readBuiltPage('docs/understand/routing-and-link-conditions');
  const learningPathText = visibleText(learningPathHtml);

  assert.match(learningPathText, /Stable.*core.*v0\.1\.0/);
  for (const topic of ['Static routing', 'OSPF', 'BGP', 'IPv4', 'IPv6', 'Link Conditions']) {
    assert.match(learningPathText, new RegExp(topic), `${topic} is missing from the routing learning path`);
  }
  assert.match(learningPathText, /Experimental.*ExaBGP Speaker/);
  for (const destination of [
    'static-routing',
    'ospf',
    'bgp',
    'ip-addressing',
    'link-conditions',
  ]) {
    assert.match(learningPathHtml, new RegExp(`/docs/understand/routing-and-link-conditions/${destination}/`));
  }
});

test('the routing concept pages pair observations with exact Stable source links', () => {
  const pages = {
    'static-routing': ['static-lab.py', 'static route', '192.168.2.0/24'],
    ospf: ['ospf-lab.py', 'show ip ospf neighbor', 'OSPF neighbor'],
    bgp: ['bgp-lab.py', 'show bgp summary', 'autonomous system'],
    'ip-addressing': ['static-lab-ipv6.py', 'ip6', 'defaultRoute6'],
  };

  for (const [page, terms] of Object.entries(pages)) {
    const html = readBuiltPage(`docs/understand/routing-and-link-conditions/${page}`);
    const pageText = visibleText(html);

    assert.match(pageText, /Stable.*core.*v0\.1\.0/, `${page} does not identify Stable v0.1.0`);
    for (const term of terms) {
      assert.match(pageText, new RegExp(term, 'i'), `${term} is missing from ${page}`);
    }
    assert.match(
      html,
      /href="https:\/\/github\.com\/mininet-iplab\/mininet-iplab\/(?:blob|tree)\/v0\.1\.0\//,
      `${page} does not link to the pinned Stable source`,
    );
  }
});

test('the Link Conditions page keeps connectivity controls separate from routing state', () => {
  const linkConditionsHtml = readBuiltPage('docs/understand/routing-and-link-conditions/link-conditions');
  const linkConditionsText = visibleText(linkConditionsHtml);

  assert.match(linkConditionsText, /Stable.*core.*v0\.1\.0/);
  assert.match(linkConditionsText, /Learner/);
  for (const term of ['disconnect', 'reconnect', 'delay', 'loss', 'bandwidth', 'routing protocol']) {
    assert.match(linkConditionsText, new RegExp(term, 'i'), `${term} is missing from Link Conditions guidance`);
  }
  assert.match(linkConditionsText, /does not change.*route|not.*routing protocol/i);
  assert.match(
    linkConditionsHtml,
    /href="https:\/\/github\.com\/mininet-iplab\/mininet-iplab\/blob\/v0\.1\.0\/docs\/web-ui\.md"/,
  );
});

test('each published documentation page identifies the Stable release', () => {
  const stablePages = ['docs', 'docs/understand', 'docs/getting-started', 'docs/web-ui', 'docs/contribute'];

  for (const page of stablePages) {
    assert.match(visibleText(readBuiltPage(page)), /Stable.*core.*v0\.1\.0/, `${page} does not identify Stable v0.1.0`);
  }
});

test('unfinished documentation sections identify themselves as Development', () => {
  const developmentPages = ['docs/build-labs', 'docs/lab-examples', 'docs/reference'];

  for (const page of developmentPages) {
    assert.match(visibleText(readBuiltPage(page)), /Development/, `${page} does not identify Development content`);
    assert.doesNotMatch(visibleText(readBuiltPage(page)), /Stable.*core.*v0\.1\.0/, `${page} presents unfinished content as Stable`);
  }
});

test('the documentation shell exposes each intent-first navigation destination', () => {
  const documentationHtml = readFileSync(join(root, 'dist', 'docs', 'index.html'), 'utf8');
  const destinations = [
    'understand',
    'getting-started',
    'getting-started/quickstart',
    'understand/routing-and-link-conditions',
    'understand/routing-and-link-conditions/static-routing',
    'understand/routing-and-link-conditions/ospf',
    'understand/routing-and-link-conditions/bgp',
    'understand/routing-and-link-conditions/ip-addressing',
    'understand/routing-and-link-conditions/link-conditions',
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
