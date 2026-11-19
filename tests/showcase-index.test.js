const test = require('node:test');
const assert = require('node:assert/strict');
const fs = require('node:fs');
const path = require('node:path');
const vm = require('node:vm');

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
    assert.doesNotMatch(source, /github\.com|\/home\/|\/Users\/|127\.0\.0\.1/i);
    assert.doesNotMatch(source, /(?:https?:)?\/\/localhost(?::\d+)?(?:\/|$)/i);
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

test('case-study panel exposes accessible controls and filtered navigation', () => {
    const page = fs.readFileSync(path.join(root, 'showcase.html'), 'utf8');
    const script = fs.readFileSync(path.join(root, 'showcase.js'), 'utf8');
    assert.match(page, /role="dialog"/);
    assert.match(page, /aria-modal="true"/);
    assert.match(script, /case-study-close/);
    assert.match(script, /case-study-previous/);
    assert.match(script, /case-study-next/);
    assert.match(script, /Escape/);
    assert.match(script, /visibleProjects/);
    assert.match(script, /focus\(\)/);
});

test('case-study gallery uses the primary artifact plus optional screenshots', () => {
    const script = fs.readFileSync(path.join(root, 'showcase.js'), 'utf8');
    const styles = fs.readFileSync(path.join(root, 'showcase.css'), 'utf8');
    assert.match(script, /project\.artifact,\s*\.\.\.\(project\.screenshots\s*\|\|\s*\[\]\)/);
    assert.match(script, /case-study-thumbnail/);
    assert.match(script, /case-study-gallery/);
    assert.match(styles, /case-study-thumbnails/);
});

test('optional demo CTA only permits safe HTTPS public URLs', () => {
    const script = fs.readFileSync(path.join(root, 'showcase.js'), 'utf8');
    assert.match(script, /demoUrl/);
    assert.match(script, /url\.protocol\s*!==\s*['"]https:/);
    assert.match(script, /isBlockedIpv4/);
    assert.match(script, /isBlockedIpv6/);
    assert.match(script, /noopener noreferrer/);
    assert.match(script, /case-study-demo/);
});

test('runtime demo URL guard rejects local, reserved, and malformed HTTPS targets', async () => {
    const showcase = fs.readFileSync(path.join(root, 'showcase.js'), 'utf8');
    const stub = () => ({
        hidden: true,
        children: [],
        querySelectorAll: () => [],
        addEventListener: () => {},
        replaceChildren: () => {},
        setAttribute: () => {},
        classList: { toggle: () => {} }
    });
    const elements = {
        '#showcase-grid': stub(),
        '#project-index': stub(),
        '#case-study-view': stub(),
        '#project-count': stub(),
        '#showcase-error': stub()
    };
    const context = {
        URL,
        URLSearchParams,
        window: {
            __SHOWCASE_TEST__: true,
            location: { search: '', hash: '', pathname: '/showcase.html' },
            history: { replaceState: () => {}, pushState: () => {} },
            addEventListener: () => {}
        },
        document: {
            body: { children: [] },
            querySelector: (selector) => elements[selector],
            querySelectorAll: () => [],
            addEventListener: () => {},
            createElement: () => stub()
        },
        fetch: () => Promise.reject(new Error('test catalog unavailable'))
    };
    vm.runInNewContext(showcase, context);
    const { safeDemoUrl } = context.window.__showcaseTestHooks;
    const blocked = [
        'https://0.0.0.0/demo',
        'https://169.254.10.20/demo',
        'https://192.168.1.2/demo',
        'https://[::1]/demo',
        'https://[fd00::1]/demo',
        'https://[fe80::1]/demo',
        'https://[::ffff:192.168.1.2]/demo',
        'https://service.internal/demo',
        'not a URL'
    ];
    blocked.forEach((url) => assert.equal(safeDemoUrl(url), null, url));
    assert.equal(safeDemoUrl('https://example.com/demo'), 'https://example.com/demo');
});

test('case-study runtime modal behavior traps focus and re-renders after filter changes', () => {
    const script = fs.readFileSync(path.join(root, 'showcase.js'), 'utf8');
    assert.match(script, /element\.inert\s*=\s*true/);
    assert.match(script, /aria-hidden/);
    assert.match(script, /event\.key !== 'Tab'/);
    assert.match(script, /renderIndex\(\);\s*\n\s*syncView\(\);/);
    assert.match(script, /const nextHash = visibleProjects\(\)\.some/);
});
