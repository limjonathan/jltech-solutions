const fs = require('node:fs');
const path = require('node:path');

const root = path.resolve(__dirname, '..');
const catalogPath = path.join(root, 'showcase', 'projects.json');
const forbidden = /(github\.com|\/home\/|\/Users\/|\.git|password|secret|api[_-]?key|token)/i;
const required = ['slug', 'title', 'category', 'summary', 'problem', 'capabilities', 'artifact', 'artifactType', 'outcome', 'buildSummary'];
const artifactRoot = path.resolve(root, 'showcase', 'assets');

function validate() {
    const projects = JSON.parse(fs.readFileSync(catalogPath, 'utf8'));
    const slugs = new Set();
    const errors = [];

    if (projects.length !== 48) errors.push(`expected 48 projects, found ${projects.length}`);
    for (const project of projects) {
        for (const field of required) {
            if (!project[field]) errors.push(`${project.slug || 'unknown'} is missing ${field}`);
        }
        if (slugs.has(project.slug)) errors.push(`duplicate slug: ${project.slug}`);
        slugs.add(project.slug);
        if (!Array.isArray(project.capabilities)) errors.push(`${project.slug} capabilities must be an array`);
        if (forbidden.test(JSON.stringify(project))) errors.push(`${project.slug} contains forbidden public data`);
        if (project.artifact && !/^showcase\/assets\/[a-z0-9-]+\.svg$/.test(project.artifact)) {
            errors.push(`${project.slug} artifact path is not a safe local poster path`);
        } else if (project.artifact) {
            const artifactPath = path.resolve(root, project.artifact);
            if (!artifactPath.startsWith(`${artifactRoot}${path.sep}`) || !fs.existsSync(artifactPath)) {
                errors.push(`${project.slug} artifact does not exist inside showcase/assets`);
            }
        }
    }

    return errors;
}

const errors = validate();
if (errors.length > 0) {
    console.error(errors.join('\n'));
    process.exitCode = 1;
} else {
    console.log('Showcase catalog valid: 48 projects, 48 local artifacts.');
}

module.exports = { validate };
