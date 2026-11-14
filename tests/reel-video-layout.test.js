const assert = require('node:assert/strict');
const fs = require('node:fs');
const path = require('node:path');
const test = require('node:test');

const index = fs.readFileSync(path.join(__dirname, '..', 'index.html'), 'utf8');
const app = fs.readFileSync(path.join(__dirname, '..', 'app.js'), 'utf8');

test('keeps the reel band focused on the enterprise film', () => {
    const reelSection = index.match(/<section class="reel-band"[\s\S]*?<\/section>/)?.[0] || '';

    assert.equal((reelSection.match(/class="reel-video"/g) || []).length, 1);
    assert.match(reelSection, /data-src="assets\/reel-enterprise\.mp4"/);
    assert.match(reelSection, /data-autoplay="true"/);
    assert.doesNotMatch(reelSection, /data-src="assets\/reel-local\.mp4"/);
});

test('places the on-site film beside the inquiry form with user controls', () => {
    const portalSection = index.match(/<section class="portal-section"[\s\S]*?<\/section>/)?.[0] || '';

    assert.match(portalSection, /class="reel-video reel-video-secondary"/);
    assert.match(portalSection, /data-src="assets\/reel-local\.mp4"/);
    assert.doesNotMatch(portalSection, /data-autoplay="true"/);
    assert.match(portalSection, /\scontrols(?:\s|>)/);
});

test('pauses the other film before starting a reel video', () => {
    assert.match(app, /reelVideos\.forEach\(\(otherVideo\) => \{\s*if \(otherVideo !== video\) otherVideo\.pause\(\);/);
    assert.match(app, /rootMargin: '200px 0px'/);
    assert.match(app, /if \(reduceMotion\.matches\) unwatchReel\(\)/);
});
