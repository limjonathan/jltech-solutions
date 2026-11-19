const fs = require('node:fs');
const net = require('node:net');
const path = require('node:path');

const root = path.resolve(__dirname, '..');
const catalogPath = path.join(root, 'showcase', 'projects.json');
const forbidden = /(github\.com|\/home\/|\/Users\/|\.git|password|secret|api[_-]?key|token)/i;
const required = ['slug', 'title', 'category', 'summary', 'problem', 'capabilities', 'artifact', 'artifactType', 'outcome', 'buildSummary'];
const artifactRoot = path.resolve(root, 'showcase', 'assets');
const safeAssetPath = /^showcase\/assets\/[a-z0-9-]+\.(?:png|jpe?g|webp|svg)$/;
const privateHostnames = new Set(['localhost', 'localhost.localdomain', 'ip6-localhost']);

function parseIpv6(hostname) {
    const halves = hostname.split('::');
    if (halves.length > 2) return null;
    const left = halves[0] ? halves[0].split(':') : [];
    const right = halves.length === 2 && halves[1] ? halves[1].split(':') : [];
    if (halves.length === 1 && left.length !== 8) return null;
    if (halves.length === 2 && left.length + right.length >= 8) return null;
    const groups = [
        ...left,
        ...Array(8 - left.length - right.length).fill('0'),
        ...right
    ];
    if (groups.some((group) => !/^[0-9a-f]{1,4}$/i.test(group))) return null;
    return groups.flatMap((group) => {
        const value = Number.parseInt(group, 16);
        return [value >> 8, value & 0xff];
    });
}

function isBlockedIpv4(octets) {
    const [first, second, third, fourth] = octets;
    return first === 0
        || first === 10
        || first === 100 && second >= 64 && second <= 127
        || first === 127
        || first === 169 && second === 254
        || first === 172 && second >= 16 && second <= 31
        || first === 192 && (
            second === 0
            || second === 2
            || second === 168
            || second === 88 && third === 99
        )
        || first === 198 && (
            second === 18 || second === 19
            || second === 51
        )
        || first === 203 && second === 0 && third === 113
        || first >= 224
        || first === 192 && second === 31 && third === 196 && fourth === 0
        || first === 192 && second === 52 && third === 193 && fourth === 0;
}

function isBlockedIpv6(hostname) {
    const bytes = parseIpv6(hostname);
    if (!bytes) return true;
    const isUnspecified = bytes.every((byte) => byte === 0);
    const isLoopback = bytes.slice(0, 15).every((byte) => byte === 0) && bytes[15] === 1;
    const isIpv4Mapped = bytes.slice(0, 10).every((byte) => byte === 0)
        && bytes[10] === 0xff && bytes[11] === 0xff;
    if (isIpv4Mapped && isBlockedIpv4(bytes.slice(12).map((byte) => byte))) return true;
    return isUnspecified
        || isLoopback
        || bytes[0] === 0xfc || bytes[0] === 0xfd
        || bytes[0] === 0xfe && (bytes[1] & 0xc0) === 0x80
        || bytes[0] === 0xff
        || bytes[0] === 0x20 && bytes[1] === 0x01 && bytes[2] === 0x00
            && (bytes[3] === 0x00 || bytes[3] === 0x02 || bytes[3] === 0x10)
        || bytes[0] === 0x3f && bytes[1] === 0xff;
}

function isPublicHttpsUrl(value) {
    if (typeof value !== 'string' || !value) return false;
    let url;
    try {
        url = new URL(value);
    } catch {
        return false;
    }
    if (url.protocol !== 'https:' || url.username || url.password) return false;
    const hostname = url.hostname.toLowerCase().replace(/^\[|\]$/g, '').replace(/\.+$/, '');
    if (privateHostnames.has(hostname) || hostname.endsWith('.localhost')
        || hostname.endsWith('.local') || hostname.endsWith('.internal')
        || hostname.endsWith('.home.arpa')) {
        return false;
    }
    const ipVersion = net.isIP(hostname);
    if (ipVersion === 4) {
        const octets = hostname.split('.').map(Number);
        if (isBlockedIpv4(octets)) return false;
    } else if (ipVersion === 6 && isBlockedIpv6(hostname)) {
        return false;
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
