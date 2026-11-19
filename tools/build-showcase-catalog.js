const fs = require('node:fs');
const path = require('node:path');

const root = path.resolve(__dirname, '..');
const artifactDir = path.join(root, 'showcase', 'assets');
const captureArtifacts = {
    'aleph-bet-express': 'showcase/assets/aleph-bet-express.png',
    'answer-esg': 'showcase/assets/answer-esg.png',
    'bishi-bashi': 'showcase/assets/bishi-bashi.jpg',
    'boardly': 'showcase/assets/boardly.png',
    'carecircle': 'showcase/assets/carecircle.png',
    'complybase': 'showcase/assets/complybase.png',
    'courseware-as-code': 'showcase/assets/courseware-as-code.png',
    'deshportfolio': 'showcase/assets/deshportfolio.png',
    'dylan-portfolio': 'showcase/assets/dylan-portfolio.png',
    'dotdrift': 'showcase/assets/dotdrift.png',
    'emily-portfolio': 'showcase/assets/emily-portfolio.png',
    'fieldops-central': 'showcase/assets/fieldops.png',
    'fooocus-mcp': 'showcase/assets/fooocus-mcp.png',
    'gig-tax': 'showcase/assets/gigtax.png',
    'homeloop': 'showcase/assets/homeloop.png',
    'hyprwall-dl': 'showcase/assets/hyprwall-dl.png',
    'icha-portfolio': 'showcase/assets/icha-portfolio.png',
    'jonathan-portfolio': 'showcase/assets/jonathan-portfolio.png',
    'jltech-solutions': 'showcase/assets/jltech-solutions.png',
    'john-portfolio': 'showcase/assets/john-portfolio.png',
    'mcp-audit': 'showcase/assets/mcp-audit.png',
    'memview': 'showcase/assets/memview.png',
    'nomu': 'showcase/assets/nomu.png',
    'nursey': 'showcase/assets/nursey.png',
    'opencode': 'showcase/assets/opencode.png',
    'paulus-portfolio': 'showcase/assets/paulusalim-portfolio.png',
    'pdfforge': 'showcase/assets/pdfforge.png',
    'pitchkit': 'showcase/assets/pitchkit.png',
    'pmc-website': 'showcase/assets/pmc-website.png',
    'polyglot': 'showcase/assets/polyglot.png',
    'probekeeper': 'showcase/assets/probekeeper.png',
    'recoverly': 'showcase/assets/recoverly.png',
    'regexscope': 'showcase/assets/regexscope.png',
    'runtime-mcp': 'showcase/assets/runtime-mcp.png',
    'sachi': 'showcase/assets/sachi.png',
    'skillpacks': 'showcase/assets/skillpacks.png',
    'skpkg': 'showcase/assets/skpkg.png',
    'slabdesk': 'showcase/assets/slabdesk.png',
    'staffy': 'showcase/assets/staffy.png',
    'static-fpv': 'showcase/assets/static-fpv.png',
    'street-eats-food-truck': 'showcase/assets/street-eats.png',
    'sunrisesite': 'showcase/assets/sunrise-site.png',
    'superasianwok': 'showcase/assets/superasianwok.png',
    'tilmar-ops': 'showcase/assets/tilmar-ops.png',
    'tinyflags': 'showcase/assets/tinyflags.png',
    'toolbelt': 'showcase/assets/toolbelt.png',
    'wiklite': 'showcase/assets/wiklite.png'
};
const additionalScreenshots = {
    'jltech-solutions': [
        'showcase/assets/jltech-solutions-02.png',
        'showcase/assets/jltech-solutions-03.png',
        'showcase/assets/jltech-solutions-04.png'
    ],
    'deshportfolio': [
        'showcase/assets/deshportfolio-02.png',
        'showcase/assets/deshportfolio-03.png'
    ],
    'dylan-portfolio': [
        'showcase/assets/dylan-portfolio-02.png',
        'showcase/assets/dylan-portfolio-03.png'
    ],
    'emily-portfolio': [
        'showcase/assets/emily-portfolio-02.png',
        'showcase/assets/emily-portfolio-03.png'
    ],
    'icha-portfolio': [
        'showcase/assets/icha-portfolio-02.png',
        'showcase/assets/icha-portfolio-03.png'
    ],
    'john-portfolio': [
        'showcase/assets/john-portfolio-02.png',
        'showcase/assets/john-portfolio-03.png'
    ],
    'street-eats-food-truck': [
        'showcase/assets/street-eats-food-truck-02.png',
        'showcase/assets/street-eats-food-truck-03.png'
    ],
    'pmc-website': [
        'showcase/assets/pmc-website-02.png',
        'showcase/assets/pmc-website-03.png'
    ],
    'sunrisesite': [
        'showcase/assets/sunrisesite-02.png',
        'showcase/assets/sunrisesite-03.png'
    ],
    'superasianwok': [
        'showcase/assets/superasianwok-02.png',
        'showcase/assets/superasianwok-03.png'
    ],
    'nomu': [
        'showcase/assets/nomu-02.png',
        'showcase/assets/nomu-03.png'
    ],
    'aleph-bet-express': [
        'showcase/assets/aleph-bet-express-02.png',
        'showcase/assets/aleph-bet-express-03.png'
    ],
    'courseware-as-code': [
        'showcase/assets/courseware-as-code-02.png',
        'showcase/assets/courseware-as-code-03.png'
    ],
    'pdfforge': [
        'showcase/assets/pdfforge-02.png',
        'showcase/assets/pdfforge-03.png'
    ],
    'regexscope': [
        'showcase/assets/regexscope-02.png',
        'showcase/assets/regexscope-03.png'
    ]
};
const demoUrls = {};

const projects = [
    ['aleph-bet-express', 'Aleph Bet Express', 'Applications', 'A focused learning experience that turns Hebrew practice into a repeatable daily habit.', 'Learners needed a clear, low-friction way to move from short exercises to steady progress.', ['Learning UX', 'Responsive interface', 'Progress flow'], 'interface'],
    ['alphafleet-landing', 'AlphaFleet Launch', 'Websites', 'A high-conviction landing experience for a modern trading product.', 'A complex financial product needed a concise, credible first impression.', ['Product positioning', 'Conversion layout', 'Responsive web'], 'interface'],
    ['answer-esg', 'ESG Answer Desk', 'AI systems', 'A research workspace that helps teams find and explain ESG answers faster.', 'Analysts needed structured answers without losing the context behind the evidence.', ['Document workflows', 'AI-assisted research', 'Review interface'], 'workflow'],
    ['paulus-portfolio', 'Paulus Portfolio', 'Frontend', 'A personal portfolio that makes a creative body of work easy to browse and remember.', 'The work needed a stronger narrative than a collection of disconnected links.', ['Portfolio design', 'Visual hierarchy', 'Editorial layout'], 'interface'],
    ['bishi-bashi', 'Bishi Bashi Play', 'Media', 'A playful browser experience built around fast reactions and immediate feedback.', 'The concept needed a lightweight, accessible way to feel fun in the first few seconds.', ['Game loop', 'Interaction design', 'Browser experience'], 'interface'],
    ['boardly', 'Boardly Workspace', 'Applications', 'A focused workspace for organizing decisions, projects, and the work around them.', 'Teams needed one calm place to turn scattered notes into visible next steps.', ['Workspace UX', 'Information architecture', 'Product flows'], 'interface'],
    ['carecircle', 'CareCircle', 'Applications', 'A support-oriented experience for coordinating care, people, and important follow-ups.', 'Care work needed clearer shared context and fewer handoff gaps.', ['Care coordination', 'Accessible UI', 'Shared status'], 'workflow'],
    ['complybase', 'ComplyBase', 'Applications', 'A compliance workspace that turns recurring evidence work into an organized operating rhythm.', 'Compliance teams needed visibility into what was known, missing, and next.', ['Compliance UX', 'Evidence tracking', 'Operational dashboard'], 'workflow'],
    ['courseware-as-code', 'Courseware Studio', 'Applications', 'A structured way to turn technical knowledge into reusable learning material.', 'Course authors needed repeatable content patterns instead of manual page assembly.', ['Content systems', 'Learning design', 'Reusable workflows'], 'architecture'],
    ['deshportfolio', 'Desh Portfolio', 'Websites', 'A personal site with a distinctive visual voice and a clear path through selected work.', 'The portfolio needed to feel authored rather than templated.', ['Art direction', 'Portfolio UX', 'Responsive composition'], 'interface'],
    ['dylan-portfolio', 'Dylan Hardy Portfolio', 'Websites', 'A polished portfolio experience that gives projects room to speak for themselves.', 'The work needed a simple structure that still felt considered and memorable.', ['Case studies', 'Visual storytelling', 'Web design'], 'interface'],
    ['dotdrift', 'DotDrift', 'Automation', 'A compact desktop utility for making visual configuration work easier to manage.', 'A repetitive setup task needed a small tool with a clear, dependable workflow.', ['Desktop utility', 'Configuration UX', 'Automation'], 'terminal'],
    ['emily-portfolio', 'Emily Lim Portfolio', 'Websites', 'A warm, navigable portfolio for presenting a person and their work with confidence.', 'The site needed to balance personality with fast, obvious navigation.', ['Personal brand', 'Responsive layout', 'Content design'], 'interface'],
    ['fieldops-central', 'FieldOps Central', 'CRM', 'Operations software for turning service requests into clear, assignable work.', 'Field teams needed one place to see intake, ownership, progress, and follow-up.', ['CRM workflows', 'Operations dashboard', 'Status visibility'], 'interface'],
    ['fooocus-mcp', 'Creative Model Bridge', 'AI systems', 'A reliable bridge for turning creative model capabilities into repeatable tool actions.', 'Creative workflows needed a safer way to connect models with useful operations.', ['Tool integration', 'AI workflows', 'Request routing'], 'architecture'],
    ['gig-tax', 'GigTax', 'Applications', 'A practical planning experience for independent workers navigating tax decisions.', 'Independent earners needed a clearer starting point than spreadsheets and guesswork.', ['Financial planning', 'Guided forms', 'Decision support'], 'workflow'],
    ['homeloop', 'HomeLoop', 'Applications', 'A home-maintenance workspace that turns scattered upkeep into a manageable loop.', 'Homeowners needed reminders, history, and next actions in one simple view.', ['Household operations', 'Task planning', 'Timeline UX'], 'interface'],
    ['hyprwall-dl', 'Wallcraft Downloader', 'Automation', 'A small utility for collecting and organizing high-quality desktop backgrounds.', 'The process needed to be quick, predictable, and easy to repeat.', ['Desktop tooling', 'Asset workflow', 'Batch actions'], 'terminal'],
    ['icha-portfolio', 'Icha Frida Portfolio', 'Websites', 'A personality-led portfolio with a clear visual system for selected work.', 'The work needed an online home that felt as specific as the person behind it.', ['Portfolio UX', 'Visual identity', 'Responsive web'], 'interface'],
    ['jonathan-portfolio', 'Jonathan Lim Portfolio', 'Websites', 'A personal showcase for connecting technical capability with finished outcomes.', 'The experience needed to explain breadth without becoming a list of tools.', ['Personal positioning', 'Case-study flow', 'Web design'], 'interface'],
    ['jltech-solutions', 'JL Tech Solutions', 'Websites', 'A full-spectrum IT site that turns technical capability into a practical path to action.', 'Businesses needed a credible way to understand services, risk, and next steps.', ['Service design', 'Conversion UX', 'Trust signals'], 'interface'],
    ['john-portfolio', 'John Portfolio', 'Websites', 'A concise portfolio experience that makes selected work easy to discover.', 'The site needed a clean presentation layer for a varied body of work.', ['Portfolio design', 'Content hierarchy', 'Responsive web'], 'interface'],
    ['mcp-audit', 'Tooling Audit Desk', 'Security', 'A security-oriented workflow for inspecting tool integrations and their operational edges.', 'Teams needed a repeatable way to surface risk before tools reached production.', ['Security review', 'Workflow design', 'Risk visibility'], 'terminal'],
    ['memview', 'Memory View', 'AI systems', 'A visual inspection layer for understanding what an AI workflow remembers and retrieves.', 'People needed a more legible way to reason about context and recall.', ['AI observability', 'Data inspection', 'Visual tooling'], 'architecture'],
    ['nomu', 'NoMu Studio', 'Websites', 'A product-facing site with a strong point of view and a focused path to engagement.', 'The brand needed a digital space that felt deliberate from the first interaction.', ['Brand experience', 'Landing page', 'Motion-ready layout'], 'interface'],
    ['nursey', 'Nursey', 'Applications', 'A gentle, practical experience for organizing care information and everyday routines.', 'Caregivers needed information to feel calm, visible, and manageable.', ['Care UX', 'Routine planning', 'Mobile-first design'], 'workflow'],
    ['opencode', 'Agent Workbench', 'Tools', 'A developer tool experience for making AI-assisted work more inspectable and useful.', 'Complex agent workflows needed clearer tools, states, and feedback.', ['Developer tooling', 'Agent workflows', 'Product systems'], 'terminal'],
    ['street-eats-food-truck', 'Street Eats', 'Websites', 'A vivid food-truck presence that makes the menu, mood, and next visit obvious.', 'A mobile audience needed fast answers without sacrificing personality.', ['Local business web', 'Menu UX', 'Mobile conversion'], 'interface'],
    ['pdfforge', 'PDF Forge', 'Tools', 'A utility workflow for turning document tasks into a predictable sequence of actions.', 'Document work needed fewer manual steps and clearer outcomes.', ['Document tooling', 'Batch workflow', 'Utility UX'], 'terminal'],
    ['pitchkit', 'PitchKit', 'Applications', 'A presentation-planning workspace for shaping an idea into a persuasive story.', 'People needed help moving from raw material to a coherent pitch.', ['Story structure', 'Content workflow', 'Presentation UX'], 'workflow'],
    ['pmc-website', 'PMC Web Presence', 'Websites', 'A service-oriented web presence that gives a professional organization a clearer digital front door.', 'Visitors needed to understand the organization and find the right next action quickly.', ['Service website', 'Information architecture', 'Responsive web'], 'interface'],
    ['polyglot', 'Polyglot', 'Tools', 'A language utility that makes working across words, meanings, and formats less tedious.', 'Language tasks needed a faster path from input to useful output.', ['Language tooling', 'Utility design', 'Fast feedback'], 'interface'],
    ['probekeeper', 'ProbeKeeper', 'Automation', 'A practical monitoring utility for keeping track of recurring checks and their outcomes.', 'Operational checks needed history and visibility instead of disappearing into logs.', ['Monitoring workflow', 'Status history', 'Operational tooling'], 'terminal'],
    ['recoverly', 'Recoverly', 'Applications', 'A recovery-oriented experience for guiding people through stressful technical problems.', 'Users needed clear next steps when data or devices felt at risk.', ['Guided support', 'Recovery workflow', 'Trust-centered UX'], 'workflow'],
    ['regexscope', 'RegexScope', 'Tools', 'A visual utility for understanding, testing, and refining regular expressions.', 'Pattern work needed immediate feedback and less trial-and-error.', ['Developer utility', 'Visual parsing', 'Interactive feedback'], 'interface'],
    ['runtime-mcp', 'Runtime Tool Layer', 'Backend', 'Infrastructure for giving agents reliable access to the tools they need.', 'Agent systems needed a dependable boundary between intent and execution.', ['Tool orchestration', 'Runtime design', 'AI infrastructure'], 'architecture'],
    ['sachi', 'Sachi', 'Tools', 'A small personal utility designed around a focused, repeatable daily workflow.', 'A recurring task deserved a dedicated interface instead of scattered reminders.', ['Personal tooling', 'Workflow design', 'Focused UX'], 'interface'],
    ['skillpacks', 'SkillPacks', 'AI systems', 'A structured way to package reusable capabilities for AI-assisted work.', 'Reusable agent behavior needed organization, naming, and safe reuse.', ['Capability design', 'AI workflows', 'Knowledge systems'], 'architecture'],
    ['skpkg', 'SK Package', 'Tools', 'A packaging workflow for organizing and distributing reusable technical capabilities.', 'Reusable assets needed a consistent path from creation to use.', ['Packaging workflow', 'Developer tooling', 'Distribution'], 'terminal'],
    ['slabdesk', 'SlabDesk', 'Applications', 'A calm desk for coordinating work, notes, and operational follow-through.', 'People needed a practical control surface without the noise of a giant suite.', ['Workspace design', 'Task coordination', 'Dashboard UX'], 'interface'],
    ['staffy', 'Staffy', 'Applications', 'A staffing workflow that makes people, roles, and coverage easier to coordinate.', 'Scheduling and staffing decisions needed shared visibility.', ['Staffing operations', 'Planning UX', 'Status workflows'], 'workflow'],
    ['static-fpv', 'Static FPV', 'Media', 'A visual media experiment built around motion, perspective, and a strong point of view.', 'The concept needed a memorable way to communicate an atmosphere, not just information.', ['Media production', 'Visual direction', 'Interactive showcase'], 'media'],
    ['sunrisesite', 'Sunrise Site', 'Websites', 'A bright, approachable web presence designed to make a service feel easy to start.', 'The experience needed to move visitors from interest to confidence quickly.', ['Brand web', 'Conversion design', 'Responsive layout'], 'interface'],
    ['superasianwok', 'Super Asian Wok', 'Websites', 'A food-business site that puts appetite, menu clarity, and location information first.', 'Visitors needed to decide what to order and where to go with minimal friction.', ['Restaurant web', 'Menu presentation', 'Local discovery'], 'interface'],
    ['tilmar-ops', 'TilMar Operations', 'Applications', 'An operations surface for turning business activity into visible, manageable work.', 'The team needed a shared view of movement, ownership, and follow-up.', ['Operations systems', 'Business workflow', 'Dashboard UX'], 'workflow'],
    ['tinyflags', 'Tiny Flags', 'Automation', 'A tiny utility for making small but important configuration states visible.', 'Small configuration differences needed to be obvious before they caused larger issues.', ['Configuration tooling', 'Status indicators', 'Developer UX'], 'terminal'],
    ['toolbelt', 'Toolbelt', 'Tools', 'A practical collection of focused utilities for getting technical work over the line.', 'Frequently repeated tasks needed a single, understandable home.', ['Utility collection', 'Workflow acceleration', 'Developer UX'], 'terminal'],
    ['wiklite', 'WikLite', 'Applications', 'A lightweight knowledge space for capturing useful information without ceremony.', 'Teams needed searchable context that stayed quick to maintain.', ['Knowledge UX', 'Searchable notes', 'Content structure'], 'interface']
];

const escapeXml = (value) => value.replace(/[<>&'"]/g, (character) => ({
    '<': '&lt;', '>': '&gt;', '&': '&amp;', "'": '&apos;', '"': '&quot;'
}[character]));

function poster(project) {
    const [, title, category, summary, , capabilities, artifactType] = project;
    const accent = artifactType === 'interface' ? '#2563eb'
        : artifactType === 'workflow' ? '#0f766e'
            : artifactType === 'architecture' ? '#7c3aed'
                : artifactType === 'media' ? '#c2410c' : '#334155';
    return `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1200 720" role="img" aria-labelledby="title desc">
<title id="title">${escapeXml(title)} project preview</title>
<desc id="desc">${escapeXml(summary)}</desc>
<rect width="1200" height="720" fill="#f8fafc"/>
<rect x="48" y="48" width="1104" height="624" rx="22" fill="#0f172a"/>
<rect x="48" y="48" width="1104" height="90" rx="22" fill="${accent}"/>
<circle cx="92" cy="93" r="10" fill="#dbeafe"/><circle cx="124" cy="93" r="10" fill="#bfdbfe"/><circle cx="156" cy="93" r="10" fill="#93c5fd"/>
<text x="80" y="210" fill="#93c5fd" font-family="Arial,sans-serif" font-size="22" font-weight="700" letter-spacing="3">${escapeXml(category.toUpperCase())}</text>
<text x="80" y="278" fill="#f8fafc" font-family="Arial,sans-serif" font-size="58" font-weight="700">${escapeXml(title)}</text>
<text x="80" y="330" fill="#cbd5e1" font-family="Arial,sans-serif" font-size="24">${escapeXml(summary.slice(0, 68))}</text>
<rect x="80" y="400" width="760" height="16" rx="8" fill="#334155"/><rect x="80" y="438" width="530" height="16" rx="8" fill="#334155"/>
<rect x="80" y="516" width="240" height="62" rx="12" fill="${accent}"/><text x="108" y="555" fill="white" font-family="Arial,sans-serif" font-size="20" font-weight="700">${escapeXml(capabilities[0])}</text>
<text x="80" y="628" fill="#64748b" font-family="monospace" font-size="18">JL TECH / PROJECT SHOWCASE</text>
</svg>`;
}

fs.mkdirSync(artifactDir, { recursive: true });
const catalog = projects.map(([slug, title, category, summary, problem, capabilities, artifactType]) => {
    const project = {
        slug,
        title,
        category,
        summary,
        problem,
        capabilities,
        artifact: captureArtifacts[slug] || `showcase/assets/${slug}.svg`,
        artifactType: captureArtifacts[slug] ? 'screenshot' : 'poster',
        outcome: `A clear, outcome-focused experience for ${title.toLowerCase()}.`,
        buildSummary: `Built as a focused ${artifactType} experience around ${capabilities.slice(0, 2).join(' and ').toLowerCase()}.`
    };
    return {
        ...project,
        ...(additionalScreenshots[slug] ? { screenshots: additionalScreenshots[slug] } : {}),
        ...(demoUrls[slug] ? { demoUrl: demoUrls[slug] } : {})
    };
});

fs.writeFileSync(path.join(root, 'showcase', 'projects.json'), `${JSON.stringify(catalog, null, 2)}\n`);
for (const project of projects) {
    if (!captureArtifacts[project[0]]) {
        fs.writeFileSync(path.join(artifactDir, `${project[0]}.svg`), poster(project));
    }
}
