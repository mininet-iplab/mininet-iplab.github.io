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
  assert.match(documentationHtml, /Reference/);
  assert.match(documentationHtml, /Get Started/);
});

test('the landing page presents the project and the ordered documentation path', () => {
  const landingHtml = readFileSync(join(root, 'dist', 'index.html'), 'utf8');

  assert.match(
    landingHtml,
    /Mininet-IPLab is a network emulation framework for teaching IP routing and core network services on top of Mininet\./,
  );
  assert.match(landingHtml, /alt="Mininet-IPLab Web UI showing a running Lab with a topology and browser terminals"/);
  assert.match(landingHtml, /href="\/docs\/getting-started\/prerequisites\/"/);
  assert.match(landingHtml, /href="\/docs\/getting-started\/quickstart\/"/);
  assert.match(landingHtml, /href="\/docs\/build-labs\/"/);
  assert.match(landingHtml, /href="\/docs\/features\/"/);
  assert.match(landingHtml, /href="\/docs\/getting-started\/classroom\/"/);
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
  assert.match(gettingStartedText, /Choose your path/);
  assert.match(gettingStartedText, /Quick Start/);
  assert.match(gettingStartedText, /Classroom deployment/);
  assert.match(gettingStartedHtml, /href="\/docs\/getting-started\/quickstart\/"/);
});

test('the Prerequisites page makes the host checks explicit', () => {
  const prerequisitesHtml = readBuiltPage('docs/getting-started/prerequisites');
  const prerequisitesText = visibleText(prerequisitesHtml);

  assert.match(prerequisitesText, /Stable.*core.*v0\.1\.0/);
  assert.match(prerequisitesText, /64-bit Linux-capable host/);
  assert.match(prerequisitesText, /Docker Engine.*Docker Compose/);
  assert.match(prerequisitesText, /Open vSwitch kernel modules.*host/);
  assert.match(prerequisitesText, /docker info/);
  assert.match(prerequisitesText, /docker compose version/);
  assert.match(prerequisitesHtml, /href="\/docs\/getting-started\/quickstart\/"/);
});

test('the Classroom deployment page documents mniplab serve and .env roles', () => {
  const classroomHtml = readBuiltPage('docs/getting-started/classroom');
  const classroomText = visibleText(classroomHtml);

  assert.match(classroomText, /Development.*core revision/);
  assert.match(classroomText, /mniplab serve/);
  assert.match(classroomText, /examples\/labs\.json/);
  assert.match(classroomText, /Instructor/);
  assert.match(classroomText, /Learner/);
  assert.match(classroomText, /MNIPLAB_USERS/);
  assert.match(classroomText, /MNIPLAB_ENVIRONMENT=production/);
  assert.match(classroomText, /MNIPLAB_CORS_ORIGINS/);
  assert.match(classroomText, /MNIPLAB_USE_SECURE_COOKIES/);
  assert.match(classroomText, /docker compose exec mniplab mniplab serve/);
  assert.match(classroomText, /docker compose exec mniplab mniplab cleanup/);
  assert.match(
    classroomHtml,
    /href="https:\/\/github\.com\/mininet-iplab\/mininet-iplab\/blob\/a4a9a6a2c7b03fde838d4ff0c59d68567a858b2a\/mniplab\/__main__\.py"/,
  );
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
  assert.match(buildLabsText, /The authoring path/);
  assert.match(buildLabsText, /Features/);
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

test('the Features guide and recipes explain how to attach capabilities to a Lab', () => {
  const featurePages = [
    'bgp',
    'container-hosts',
    'dhcp',
    'dns',
    'dnssec',
    'exabgp',
    'ipv6',
    'vlans',
    'nat',
    'ospf',
    'packet-capture',
    'multi-lab',
    'static-routing',
  ];
  const updatedPages = new Set(['vlans', 'nat', 'packet-capture', 'multi-lab']);
  const featuresHtml = readBuiltPage('docs/features');
  const featuresText = visibleText(featuresHtml);

  assert.match(featuresText, /Development.*core revision/);
  assert.match(featuresText, /Where does it attach/);
  assert.match(featuresText, /Create a Lab/);

  for (const page of featurePages) {
    const html = readBuiltPage(`docs/features/${page}`);
    const pageText = visibleText(html);

    assert.match(pageText, /Development|Experimental/, `${page} maturity is missing`);
    assert.match(pageText, /Add it to a Lab/, `${page} has no authoring section`);
    assert.match(pageText, /Verify it/, `${page} has no verification section`);
    const sourceRevision = updatedPages.has(page)
      ? '9c14a8fee2ac40ac430909e4c4390d39662f3c6c'
      : 'a4a9a6a2c7b03fde838d4ff0c59d68567a858b2a';
    assert.match(
      html,
      new RegExp(`href="https://github\\.com/mininet-iplab/mininet-iplab/blob/${sourceRevision}/`),
      `${page} does not link to the pinned source revision`,
    );
  }
});

test('each published documentation page identifies the Stable release', () => {
  const stablePages = ['docs', 'docs/getting-started', 'docs/contribute'];

  for (const page of stablePages) {
    assert.match(visibleText(readBuiltPage(page)), /Stable.*core.*v0\.1\.0/, `${page} does not identify Stable v0.1.0`);
  }
});

test('unfinished documentation sections identify themselves as Development', () => {
  const developmentPages = ['docs/build-labs', 'docs/reference'];

  for (const page of developmentPages) {
    assert.match(visibleText(readBuiltPage(page)), /Development/, `${page} does not identify Development content`);
    assert.doesNotMatch(visibleText(readBuiltPage(page)), /Stable.*core.*v0\.1\.0/, `${page} presents unfinished content as Stable`);
  }
});

test('the documentation shell exposes each intent-first navigation destination', () => {
  const documentationHtml = readFileSync(join(root, 'dist', 'docs', 'index.html'), 'utf8');
  const destinations = [
    'getting-started',
    'getting-started/prerequisites',
    'getting-started/quickstart',
    'getting-started/classroom',
    'features',
    'features/static-routing',
    'features/ospf',
    'features/bgp',
    'features/ipv6',
    'features/vlans',
    'features/nat',
    'features/dhcp',
    'features/dns',
    'features/dnssec',
    'features/container-hosts',
    'features/exabgp',
    'features/packet-capture',
    'features/multi-lab',
    'build-labs',
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
