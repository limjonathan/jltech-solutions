const test = require('node:test');
const assert = require('node:assert/strict');
const fs = require('node:fs');
const path = require('node:path');

const root = path.resolve(__dirname, '..');

test('showcase index exposes the project grid, filters, and home entry point', () => {
    const page = fs.readFileSync(path.join(root, 'showcase.html'), 'utf8');
    const home = fs.readFileSync(path.join(root, 'index.html'), 'utf8');
    assert.match(page, /id="showcase-grid"/);
    assert.match(page, /data-category="all"/);
    assert.match(page, /data-category="Applications"/);
    assert.match(page, /showcase\.js/);
    assert.match(home, /showcase\.html/);
});

test('showcase page contains no repository or private endpoint links', () => {
    const source = [
        fs.readFileSync(path.join(root, 'showcase.html'), 'utf8'),
        fs.readFileSync(path.join(root, 'showcase.js'), 'utf8')
    ].join('\n');
    assert.doesNotMatch(source, /github\.com|\/home\/|localhost|127\.0\.0\.1/i);
});

test('showcase page has accessible structure and reduced-motion support', () => {
    const page = fs.readFileSync(path.join(root, 'showcase.html'), 'utf8');
    const styles = fs.readFileSync(path.join(root, 'showcase.css'), 'utf8');
    assert.equal((page.match(/<h1\b/g) || []).length, 1);
    assert.match(page, /aria-label="Filter projects by category"/);
    assert.match(page, /aria-live="polite"/);
    assert.match(styles, /prefers-reduced-motion:\s*reduce/);
    assert.doesNotMatch(styles, /tabindex\s*:\s*[1-9]/);
});

test('showcase page keeps a readable static fallback for all projects', () => {
    const page = fs.readFileSync(path.join(root, 'showcase.html'), 'utf8');
    assert.equal((page.match(/class="fallback-project"/g) || []).length, 48);
    assert.match(page, /Outcome:/);
    assert.match(page, /Build summary:/);
    assert.match(page, /id="fieldops-central"/);
});

test('case-study renderer includes outcome and build summary sections', () => {
    const script = fs.readFileSync(path.join(root, 'showcase.js'), 'utf8');
    assert.match(script, /'Outcome'/);
    assert.match(script, /project\.outcome/);
    assert.match(script, /'Build summary'/);
    assert.match(script, /project\.buildSummary/);
});
