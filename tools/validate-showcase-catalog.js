const fs = require('node:fs');
const path = require('node:path');

const root = path.resolve(__dirname, '..');
const catalogPath = path.join(root, 'showcase', 'projects.json');
const forbidden = /(github\.com|\/home\/|\/Users\/|\.git|password|secret|api[_-]?key|token)/i;
const required = ['slug', 'title', 'category', 'summary', 'problem', 'capabilities', 'artifact', 'artifactType', 'outcome', 'buildSummary'];
const artifactRoot = path.resolve(root, 'showcase', 'assets');
const safeAssetPath = /^showcase\/assets\/[a-z0-9-]+\.(?:png|jpe?g|webp|svg)$/;
const privateHostnames = new Set(['localhost', 'localhost.localdomain', 'ip6-localhost']);

function isPublicHttpsUrl(value) {
    if (typeof value !== 'string' || !value) return false;
    let url;
    try {
        url = new URL(value);
    } catch {
        return false;
    }
    if (url.protocol !== 'https:' || url.username || url.password) return false;
    const hostname = url.hostname.toLowerCase().replace(/^\[|\]$/g, '');
    if (privateHostnames.has(hostname) || hostname.endsWith('.localhost') || hostname.endsWith('.local')) {
        return false;
    }
    if (hostname === '::1' || hostname === '0.0.0.0' || hostname === '::'
        || /^(?:fc|fd|fe[89a-f])[0-9a-f:]*$/i.test(hostname)) return false;
    const octets = hostname.split('.').map(Number);
    if (octets.length === 4 && octets.every((octet) => Number.isInteger(octet) && octet >= 0 && octet <= 255)) {
        const [first, second] = octets;
        if (first === 10 || first === 127 || first === 169 && second === 254
            || first === 172 && second >= 16 && second <= 31
            || first === 192 && (second === 0 || second === 168)
            || first === 100 && second >= 64 && second <= 127
            || first === 198 && second >= 18 && second <= 19
            || first >= 224) return false;
    }
    return Boolean(hostname);
}

function validateAssetPath(projectSlug, field, assetPath, errors) {
    if (typeof assetPath !== 'string' || !safeAssetPath.test(assetPath)) {
        errors.push(`${projectSlug} ${field} path is not a safe local capture path`);
        return;
    }
    const resolvedPath = path.resolve(root, assetPath);
    if (!resolvedPath.startsWith(`${artifactRoot}${path.sep}`) || !fs.existsSync(resolvedPath)) {
        errors.push(`${projectSlug} ${field} does not exist inside showcase/assets`);
    }
}

function validateProject(project) {
    const errors = [];
    const slug = project && project.slug ? project.slug : 'unknown';
    for (const field of required) {
        if (!project || !project[field]) errors.push(`${slug} is missing ${field}`);
    }
    if (project && !Array.isArray(project.capabilities)) {
        errors.push(`${slug} capabilities must be an array`);
    }
    if (project && forbidden.test(JSON.stringify(project))) {
        errors.push(`${slug} contains forbidden public data`);
    }
    if (project && project.artifact) validateAssetPath(slug, 'artifact', project.artifact, errors);
    if (project && project.screenshots !== undefined) {
        if (!Array.isArray(project.screenshots)) {
            errors.push(`${slug} screenshots must be an array`);
        } else {
            project.screenshots.forEach((screenshot, index) => {
                validateAssetPath(slug, `screenshots[${index}]`, screenshot, errors);
            });
        }
    }
    if (project && project.demoUrl !== undefined && !isPublicHttpsUrl(project.demoUrl)) {
        errors.push(`${slug} demoUrl must be an HTTPS public URL`);
    }
    return errors;
}

function validate() {
    const projects = JSON.parse(fs.readFileSync(catalogPath, 'utf8'));
    const slugs = new Set();
    const errors = [];

    if (projects.length !== 48) errors.push(`expected 48 projects, found ${projects.length}`);
    for (const project of projects) {
        errors.push(...validateProject(project));
        if (slugs.has(project.slug)) errors.push(`duplicate slug: ${project.slug}`);
        slugs.add(project.slug);
    }

    return errors;
}

if (require.main === module) {
    const errors = validate();
    if (errors.length > 0) {
        console.error(errors.join('\n'));
        process.exitCode = 1;
    } else {
        console.log('Showcase catalog valid: 48 projects, 48 local artifacts.');
    }
}

module.exports = { isPublicHttpsUrl, validate, validateProject };
