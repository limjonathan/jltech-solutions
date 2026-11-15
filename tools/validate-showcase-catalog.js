const fs = require('node:fs');
const path = require('node:path');

const root = path.resolve(__dirname, '..');
const catalogPath = path.join(root, 'showcase', 'projects.json');
const forbidden = /(github\.com|\/home\/|\/Users\/|\.git|password|secret|api[_-]?key|token)/i;
const required = ['slug', 'title', 'category', 'summary', 'problem', 'capabilities', 'artifact', 'artifactType'];

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
        if (project.artifact && !fs.existsSync(path.join(root, project.artifact))) {
            errors.push(`${project.slug} artifact does not exist: ${project.artifact}`);
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
