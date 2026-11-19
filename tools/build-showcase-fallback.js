const fs = require('node:fs');
const path = require('node:path');

const root = path.resolve(__dirname, '..');
const pagePath = path.join(root, 'showcase.html');
const catalogPath = path.join(root, 'showcase', 'projects.json');
const catalog = JSON.parse(fs.readFileSync(catalogPath, 'utf8'));

if (!Array.isArray(catalog) || catalog.some((project) => !project || !project.slug || !project.artifact)) {
    throw new Error(`Cannot generate showcase fallback from invalid catalog: ${catalogPath}`);
}

const escapeHtml = (value) => String(value).replace(/[&<>"']/g, (character) => ({
    '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;'
}[character]));

const markup = catalog.map((project) => `                <article class="fallback-project" id="${escapeHtml(project.slug)}">
                    <img src="${escapeHtml(project.artifact)}" alt="${escapeHtml(project.title)} project preview" width="1200" height="720">
                    <div>
                        <p class="project-card-category">${escapeHtml(project.category)}</p>
                        <h3>${escapeHtml(project.title)}</h3>
                        <p>${escapeHtml(project.summary)}</p>
                        <p><strong>Outcome:</strong> ${escapeHtml(project.outcome)}</p>
                        <p><strong>Build summary:</strong> ${escapeHtml(project.buildSummary)}</p>
                        <p><strong>Problem:</strong> ${escapeHtml(project.problem)}</p>
                        <p><strong>Capabilities:</strong> ${escapeHtml(project.capabilities.join(', '))}</p>
                    </div>
                </article>`).join('\n');

const page = fs.readFileSync(pagePath, 'utf8');
const start = '            <!-- STATIC_FALLBACK_START -->';
const end = '            <!-- STATIC_FALLBACK_END -->';
const startIndex = page.indexOf(start);
const endIndex = page.indexOf(end);
if (startIndex < 0 || endIndex < 0 || endIndex < startIndex) {
    throw new Error('Showcase fallback markers are missing');
}

const updated = `${page.slice(0, startIndex)}${start}\n${markup}\n${page.slice(endIndex)}`;
fs.writeFileSync(pagePath, updated);
