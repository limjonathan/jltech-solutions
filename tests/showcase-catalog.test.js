const test = require('node:test');
const assert = require('node:assert/strict');
const fs = require('node:fs');
const path = require('node:path');

const root = path.resolve(__dirname, '..');
const catalogPath = path.join(root, 'showcase', 'projects.json');
const { validateProject } = require('../tools/validate-showcase-catalog.js');

test('showcase catalog contains 48 unique project case studies', () => {
    assert.equal(fs.existsSync(catalogPath), true, 'showcase/projects.json is required');
    const projects = JSON.parse(fs.readFileSync(catalogPath, 'utf8'));
    assert.equal(projects.length, 48);
    assert.equal(new Set(projects.map((project) => project.slug)).size, 48);
});

test('every project has safe public case-study fields and a local artifact', () => {
    const projects = JSON.parse(fs.readFileSync(catalogPath, 'utf8'));
    const forbidden = /(github\.com|\/home\/|\/Users\/|\.git|password|secret|api[_-]?key|token)/i;
    const required = ['slug', 'title', 'category', 'summary', 'problem', 'capabilities', 'artifact', 'artifactType'];

    for (const project of projects) {
        for (const field of required) {
            assert.ok(project[field], `${project.slug || 'unknown'} is missing ${field}`);
        }
        assert.ok(Array.isArray(project.capabilities), `${project.slug} capabilities must be an array`);
        assert.ok(!forbidden.test(JSON.stringify(project)), `${project.slug} contains private data`);
        assert.ok(fs.existsSync(path.join(root, project.artifact)), `${project.slug} artifact is missing`);
    }
});

test('catalog spans the capabilities promised by the showcase filters', () => {
    const projects = JSON.parse(fs.readFileSync(catalogPath, 'utf8'));
    const categories = new Set(projects.map((project) => project.category));
    for (const category of ['Automation', 'CRM', 'Applications', 'Websites', 'Frontend', 'Backend', 'AI systems', 'Tools', 'Media', 'Security']) {
        assert.ok(categories.has(category), `missing category: ${category}`);
    }
});

test('projects without additional screenshots fall back to their primary artifact', () => {
    const projects = JSON.parse(fs.readFileSync(catalogPath, 'utf8'));
    const project = projects.find((entry) => !entry.screenshots);

    assert.ok(project, 'catalog should contain a project without additional screenshots');
    assert.deepEqual([project.artifact, ...(project.screenshots || [])], [project.artifact]);
});

test('additional screenshots must use safe local showcase asset paths', () => {
    const project = {
        slug: 'fixture',
        title: 'Fixture',
        category: 'Tools',
        summary: 'Fixture summary.',
        problem: 'Fixture problem.',
        capabilities: ['Testing'],
        artifact: 'showcase/assets/fixture.png',
        artifactType: 'screenshot',
        outcome: 'Fixture outcome.',
        buildSummary: 'Fixture build.',
        screenshots: ['showcase/assets/fixture-detail.png']
    };

    assert.deepEqual(validateProject(project), [
        'fixture artifact does not exist inside showcase/assets',
        'fixture screenshots[0] does not exist inside showcase/assets'
    ]);
    assert.match(validateProject({
        ...project,
        artifact: 'showcase/assets/aleph-bet-express.png',
        screenshots: ['showcase/assets/../projects.json']
    }).find((error) => error.includes('screenshots[0]')), /safe local capture path/);
});

test('demo URLs must be HTTPS public URLs', () => {
    const base = {
        slug: 'fixture',
        title: 'Fixture',
        category: 'Tools',
        summary: 'Fixture summary.',
        problem: 'Fixture problem.',
        capabilities: ['Testing'],
        artifact: 'showcase/assets/aleph-bet-express.png',
        artifactType: 'screenshot',
        outcome: 'Fixture outcome.',
        buildSummary: 'Fixture build.'
    };

    assert.match(validateProject({ ...base, demoUrl: 'http://example.com' })[0], /HTTPS public URL/);
    assert.match(validateProject({ ...base, demoUrl: 'https://localhost:8005' })[0], /HTTPS public URL/);
    assert.match(validateProject({ ...base, demoUrl: 'https://192.168.1.10' })[0], /HTTPS public URL/);
});
