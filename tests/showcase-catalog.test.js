const test = require('node:test');
const assert = require('node:assert/strict');
const fs = require('node:fs');
const path = require('node:path');

const root = path.resolve(__dirname, '..');
const catalogPath = path.join(root, 'showcase', 'projects.json');

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
