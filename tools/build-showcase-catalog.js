const fs = require('node:fs');
const path = require('node:path');

const root = path.resolve(__dirname, '..');
const artifactDir = path.join(root, 'showcase', 'assets');
const captureArtifacts = {
    'aleph-bet-express': 'showcase/assets/aleph-bet-express.png',
    'answer-esg': 'showcase/assets/answer-esg.png',
    'bishi-bashi': 'showcase/assets/bishi-bashi.jpg',
    'boardly': 'showcase/assets/boardly.png',
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
    'fieldops-central': [
        'showcase/assets/fieldops-02.png'
    ],
    'toolbelt': [
        'showcase/assets/toolbelt-02.png'
    ],
    'answer-esg': [
        'showcase/assets/answer-esg-02.png'
    ],
    'boardly': [
        'showcase/assets/boardly-02.png'
    ],
    'homeloop': [
        'showcase/assets/homeloop-02.png'
    ],
    'nursey': [
        'showcase/assets/nursey-02.png'
    ],
    'slabdesk': [
        'showcase/assets/slabdesk-02.png'
    ],
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
    ],
    'gig-tax': [
        'showcase/assets/gig-tax-02.png',
        'showcase/assets/gig-tax-03.png'
    ],
    'complybase': [
        'showcase/assets/complybase-02.png',
        'showcase/assets/complybase-03.png',
        'showcase/assets/complybase-04.png',
        'showcase/assets/complybase-05.png'
    ],
    'pitchkit': [
        'showcase/assets/pitchkit-02.png',
        'showcase/assets/pitchkit-03.png',
        'showcase/assets/pitchkit-04.png'
    ],
    'wiklite': [
        'showcase/assets/wiklite-02.png',
        'showcase/assets/wiklite-03.png',
        'showcase/assets/wiklite-04.png',
        'showcase/assets/wiklite-05.png'
    ]
};
const demoUrls = {};
const verifiedCaseStudyDetails = {
    'aleph-bet-express': {
        outcome: 'A clearer public path for nationwide vehicle transport, dealer fleet logistics, and quote requests.',
        buildSummary: 'Built as a zero-build static marketing site with responsive service sections, animated route visuals, and a client-side quote flow.'
    },
    'answer-esg': {
        outcome: 'A structured ESG workspace for reusable activity data, questionnaire answers, and reporting context.',
        buildSummary: 'Built around VSME datapoints, emissions calculations, evidence provenance, and questionnaire-ready reporting.'
    },
    'courseware-as-code': {
        outcome: 'A self-hostable course format that adds teaching and review workflows to ordinary Markdown.',
        buildSummary: 'Built as a static course generator with client-side quizzes, FSRS review scheduling, and browser-local progress.'
    },
    'boardly': {
        outcome: 'A focused restaurant operations surface for keeping menu content and screens coordinated.',
        buildSummary: 'Built around menu design, player pairing, daypart scheduling, and per-screen billing workflows.'
    },
    'carecircle': {
        outcome: 'A shared care view for medication status, family visibility, escalation, and caregiver coordination.',
        buildSummary: 'Built around medication reminders, photo confirmation, family dashboards, and caregiver support workflows.'
    },
    'fieldops-central': {
        outcome: 'A linked field-operations workspace for technician activity, site context, inventory, and manager review.',
        buildSummary: 'Built as a healthcare IT PWA with technician and manager workspaces, fictional demo data, and offline activity support.'
    },
    'homeloop': {
        outcome: 'A focused marketplace model connecting recurring home-service subscriptions with provider dispatch.',
        buildSummary: 'Built around service zones, subscriptions, recurring visits, provider lifecycle, payments, and payouts.'
    },
    'nursey': {
        outcome: 'A care-agency workflow covering client and caregiver operations through EVV-ready billing inputs.',
        buildSummary: 'Built as a HIPAA-conscious multi-tenant home-care platform with scheduling, point-of-care notes, immutable EVV records, and billing.'
    },
    'paulus-portfolio': {
        outcome: 'A distinctive professional presentation for cyber and clinical-informatics work.',
        buildSummary: 'Built as a responsive personal website combining tactical cyber direction with clinical-informatics positioning.'
    },
    'pdfforge': {
        outcome: 'A browser-based PDF toolbox that keeps document processing local and predictable.',
        buildSummary: 'Built as a static Astro/React workspace with modular WebAssembly tools, worker isolation, and zero-upload processing.'
    },
    'pitchkit': {
        outcome: 'A proposal workflow that helps agencies move from client brief to signed and payable outcome.',
        buildSummary: 'Built around AI proposal generation, public proposal pages, signing, payments, engagement tracking, and pipeline analytics.'
    },
    'recoverly': {
        outcome: 'Automated recovery sequences and attribution for failed recurring SaaS payments.',
        buildSummary: 'Built around Stripe Connect, payment-failure webhooks, branded day 0/3/7 email sequences, and recovery reporting.'
    },
    'slabdesk': {
        outcome: 'A job-centered operating surface for stone shops across pipeline, money, inventory, and field work.',
        buildSummary: 'Built as a multi-tenant CRM where customers are jobs and estimates, invoices, inventory, and photos share one record.'
    },
    'staffy': {
        outcome: 'A recruiting CRM positioned around flat team pricing, AI-native workflows, and exportable data.',
        buildSummary: 'Built for small staffing agencies with candidate parsing, matching, outreach, organizations, and tiered team billing.'
    },
    'sunrisesite': {
        outcome: 'A restaurant front door that makes menu, location, and ordering decisions easy.',
        buildSummary: 'Built as a responsive restaurant site with dynamic menu presentation, local discovery, and ordering paths.'
    },
    'tilmar-ops': {
        outcome: 'A clearer design direction for the Til Mar Design website across brand and responsive layouts.',
        buildSummary: 'Built as a design workspace for brand direction, audits, and responsive website concepts.'
    },
    'toolbelt': {
        outcome: 'An offline-first field-service workflow designed around completing and syncing real crew jobs.',
        buildSummary: 'Built as a mobile PWA for customers, jobs, quotes, invoices, Stripe payments, and offline job completion.'
    },
    'wiklite': {
        outcome: 'A lightweight local-first knowledge system for linked Markdown notes and visual context.',
        buildSummary: 'Built around Markdown files, backlinks, fuzzy search, command-palette editing, and a graph view without cloud storage.'
    },
    'jltech-solutions': {
        outcome: 'A public-facing IT and SecOps site that gives businesses a clear route from risk to engagement.',
        buildSummary: 'Built as a static corporate site with service pages, NOC-style dashboard storytelling, inquiry flows, and a ticket portal.'
    },
    'jonathan-portfolio': {
        outcome: 'A professional portfolio that connects IT operations capability with finished work and service context.',
        buildSummary: 'Built around a NOC terminal presentation, service portal, technical work, and a professional timeline.'
    }
};

const projects = [
    ['aleph-bet-express', 'Aleph-Bet Express LLC', 'Websites', 'A nationwide vehicle-transport website for moving cars with clear service and quote paths.', 'Vehicle owners and dealer fleets needed a credible way to understand transport options and request service.', ['Auto transport', 'Dealer and fleet logistics', 'Quote workflow'], 'interface'],
    ['alphafleet-landing', 'AlphaFleet Launch', 'Websites', 'A high-conviction landing experience for a modern trading product.', 'A complex financial product needed a concise, credible first impression.', ['Product positioning', 'Conversion layout', 'Responsive web'], 'interface'],
    ['answer-esg', 'AnswerESG', 'Applications', 'A VSME-native ESG and carbon-reporting workspace for answering customer, bank, and tender questionnaires.', 'Small businesses needed to measure activity once and reuse defensible ESG evidence across requests.', ['Carbon accounting', 'ESG questionnaire workflows', 'Evidence-backed reporting'], 'workflow'],
    ['paulus-portfolio', 'Paulus Portfolio', 'Frontend', 'A premium tactical cyber and clinical-informatics personal website.', 'A multidisciplinary professional profile needed a focused presentation for technical, security, and clinical-informatics work.', ['Professional positioning', 'Cyber and clinical informatics', 'Responsive portfolio web'], 'interface'],
    ['bishi-bashi', 'Bishi Bashi Play', 'Media', 'A playful browser experience built around fast reactions and immediate feedback.', 'The concept needed a lightweight, accessible way to feel fun in the first few seconds.', ['Game loop', 'Interaction design', 'Browser experience'], 'interface'],
    ['boardly', 'Boardly', 'Applications', 'A restaurant menu-board platform for designing menus, scheduling dayparts, and pairing TV screens as players.', 'Restaurants needed one system to manage menu content, screen playback, scheduling, and per-screen billing.', ['Menu designer', 'TV player pairing', 'Daypart scheduling'], 'interface'],
    ['carecircle', 'CareCircle', 'Applications', 'An elder-care coordination platform for medication reminders, family visibility, and caregiver support.', 'Families needed shared medication status, photo confirmation, escalation, and caregiver coordination in one place.', ['Medication workflows', 'Family dashboards', 'Caregiver coordination'], 'workflow'],
    ['complybase', 'ComplyBase', 'Applications', 'A compliance workspace that turns recurring evidence work into an organized operating rhythm.', 'Compliance teams needed visibility into what was known, missing, and next.', ['Compliance UX', 'Evidence tracking', 'Operational dashboard'], 'workflow'],
    ['courseware-as-code', 'Courseware as Code', 'Tools', 'A Markdown-to-static-course tool with inline quizzes, FSRS spaced repetition, and local-only learner progress.', 'Educators and internal trainers needed teaching interactivity without an LMS, accounts, or telemetry.', ['Markdown authoring', 'Instant-feedback quizzes', 'Spaced repetition'], 'architecture'],
    ['deshportfolio', 'Desh Portfolio', 'Websites', 'A personal site with a distinctive visual voice and a clear path through selected work.', 'The portfolio needed to feel authored rather than templated.', ['Art direction', 'Portfolio UX', 'Responsive composition'], 'interface'],
    ['dylan-portfolio', 'Dylan Hardy Portfolio', 'Websites', 'A polished portfolio experience that gives projects room to speak for themselves.', 'The work needed a simple structure that still felt considered and memorable.', ['Case studies', 'Visual storytelling', 'Web design'], 'interface'],
    ['dotdrift', 'DotDrift', 'Automation', 'A compact desktop utility for making visual configuration work easier to manage.', 'A repetitive setup task needed a small tool with a clear, dependable workflow.', ['Desktop utility', 'Configuration UX', 'Automation'], 'terminal'],
    ['emily-portfolio', 'Emily Lim Portfolio', 'Websites', 'A warm, navigable portfolio for presenting a person and their work with confidence.', 'The site needed to balance personality with fast, obvious navigation.', ['Personal brand', 'Responsive layout', 'Content design'], 'interface'],
    ['fieldops-central', 'FieldOps Central', 'CRM', 'A healthcare IT field-operations workspace for technician activities, site work, inventory, and manager reporting.', 'Healthcare field teams needed linked activity, site, inventory, and reporting workflows.', ['Technician workflows', 'Site and inventory records', 'Manager reporting'], 'workflow'],
    ['fooocus-mcp', 'Creative Model Bridge', 'AI systems', 'A reliable bridge for turning creative model capabilities into repeatable tool actions.', 'Creative workflows needed a safer way to connect models with useful operations.', ['Tool integration', 'AI workflows', 'Request routing'], 'architecture'],
    ['gig-tax', 'GigTax', 'Applications', 'A practical planning experience for independent workers navigating tax decisions.', 'Independent earners needed a clearer starting point than spreadsheets and guesswork.', ['Financial planning', 'Guided forms', 'Decision support'], 'workflow'],
    ['homeloop', 'HomeLoop', 'Applications', 'A recurring cleaning and lawn-care subscription marketplace for one metro area.', 'Home-service customers needed simple recurring plans while small providers needed scheduled, paid work.', ['Service subscriptions', 'Provider dispatch', 'Stripe billing workflows'], 'workflow'],
    ['hyprwall-dl', 'Wallcraft Downloader', 'Automation', 'A small utility for collecting and organizing high-quality desktop backgrounds.', 'The process needed to be quick, predictable, and easy to repeat.', ['Desktop tooling', 'Asset workflow', 'Batch actions'], 'terminal'],
    ['icha-portfolio', 'Icha Frida Portfolio', 'Websites', 'A clinical portfolio presenting Icha Frida’s nursing education, patient-care experience, and professional values.', 'An aspiring nurse needed a credible way to present clinical rotations, skills, education, and care philosophy.', ['Clinical portfolio UX', 'Skills and timeline presentation', 'Accessible responsive web'], 'interface'],
    ['jonathan-portfolio', 'Jonathan Lim Portfolio', 'Websites', 'A personal showcase for connecting technical capability with finished outcomes.', 'The experience needed to explain breadth without becoming a list of tools.', ['Personal positioning', 'Case-study flow', 'Web design'], 'interface'],
    ['jltech-solutions', 'JL Tech Solutions', 'Websites', 'A full-spectrum IT and SecOps site that turns technical capability into a practical path to action.', 'Businesses needed a credible way to understand services, risk, and next steps.', ['Service design', 'Conversion UX', 'Trust signals'], 'interface'],
    ['john-portfolio', 'John Portfolio', 'Websites', 'A concise portfolio experience that makes selected work easy to discover.', 'The site needed a clean presentation layer for a varied body of work.', ['Portfolio design', 'Content hierarchy', 'Responsive web'], 'interface'],
    ['mcp-audit', 'Tooling Audit Desk', 'Security', 'A security-oriented workflow for inspecting tool integrations and their operational edges.', 'Teams needed a repeatable way to surface risk before tools reached production.', ['Security review', 'Workflow design', 'Risk visibility'], 'terminal'],
    ['memview', 'Memory View', 'AI systems', 'A visual inspection layer for understanding what an AI workflow remembers and retrieves.', 'People needed a more legible way to reason about context and recall.', ['AI observability', 'Data inspection', 'Visual tooling'], 'architecture'],
    ['nomu', 'NoMu Studio', 'Websites', 'A product-facing site with a strong point of view and a focused path to engagement.', 'The brand needed a digital space that felt deliberate from the first interaction.', ['Brand experience', 'Landing page', 'Motion-ready layout'], 'interface'],
    ['nursey', 'Nursey', 'Applications', 'A private-duty home-care agency platform for clients, caregivers, scheduling, EVV, billing, and payroll.', 'Home-care agencies needed one tenant-safe workflow from care visits through verified billing.', ['Caregiver scheduling', 'EVV-ready point of care', 'Billing and payroll'], 'workflow'],
    ['opencode', 'Agent Workbench', 'Tools', 'A developer tool experience for making AI-assisted work more inspectable and useful.', 'Complex agent workflows needed clearer tools, states, and feedback.', ['Developer tooling', 'Agent workflows', 'Product systems'], 'terminal'],
    ['street-eats-food-truck', 'Street Eats', 'Websites', 'A vivid food-truck presence that makes the menu, mood, and next visit obvious.', 'A mobile audience needed fast answers without sacrificing personality.', ['Local business web', 'Menu UX', 'Mobile conversion'], 'interface'],
    ['pdfforge', 'PDF Forge', 'Tools', 'A privacy-first browser PDF toolbox for merging, splitting, compressing, converting, and OCR.', 'People needed common PDF operations without uploading documents to a server.', ['Client-side PDF tools', 'WebAssembly processing', 'Privacy-first workflows'], 'architecture'],
    ['pitchkit', 'PitchKit', 'Applications', 'An AI proposal workspace for digital agencies that turns briefs into signable, payable proposals.', 'Agencies needed a faster way to turn client briefs into proposals while tracking engagement and pipeline outcomes.', ['AI proposal generation', 'Public proposal signing', 'Pipeline analytics'], 'workflow'],
    ['pmc-website', 'PMC Web Presence', 'Websites', 'A service-oriented web presence that gives a professional organization a clearer digital front door.', 'Visitors needed to understand the organization and find the right next action quickly.', ['Service website', 'Information architecture', 'Responsive web'], 'interface'],
    ['polyglot', 'Polyglot', 'Tools', 'A language utility that makes working across words, meanings, and formats less tedious.', 'Language tasks needed a faster path from input to useful output.', ['Language tooling', 'Utility design', 'Fast feedback'], 'interface'],
    ['probekeeper', 'ProbeKeeper', 'Automation', 'A practical monitoring utility for keeping track of recurring checks and their outcomes.', 'Operational checks needed history and visibility instead of disappearing into logs.', ['Monitoring workflow', 'Status history', 'Operational tooling'], 'terminal'],
    ['recoverly', 'Recoverly', 'Applications', 'A Stripe payment-recovery tool for small SaaS businesses.', 'Failed recurring payments needed automated, measurable recovery.', ['Stripe Connect', 'Dunning sequences', 'Recovery attribution'], 'workflow'],
    ['regexscope', 'RegexScope', 'Tools', 'A visual utility for understanding, testing, and refining regular expressions.', 'Pattern work needed immediate feedback and less trial-and-error.', ['Developer utility', 'Visual parsing', 'Interactive feedback'], 'interface'],
    ['runtime-mcp', 'Runtime Tool Layer', 'Backend', 'Infrastructure for giving agents reliable access to the tools they need.', 'Agent systems needed a dependable boundary between intent and execution.', ['Tool orchestration', 'Runtime design', 'AI infrastructure'], 'architecture'],
    ['sachi', 'Sachi', 'Tools', 'A small personal utility designed around a focused, repeatable daily workflow.', 'A recurring task deserved a dedicated interface instead of scattered reminders.', ['Personal tooling', 'Workflow design', 'Focused UX'], 'interface'],
    ['skillpacks', 'SkillPacks', 'AI systems', 'A structured way to package reusable capabilities for AI-assisted work.', 'Reusable agent behavior needed organization, naming, and safe reuse.', ['Capability design', 'AI workflows', 'Knowledge systems'], 'architecture'],
    ['skpkg', 'SK Package', 'Tools', 'A packaging workflow for organizing and distributing reusable technical capabilities.', 'Reusable assets needed a consistent path from creation to use.', ['Packaging workflow', 'Developer tooling', 'Distribution'], 'terminal'],
    ['slabdesk', 'SlabDesk', 'Applications', 'A multi-tenant CRM for stone fabricators, covering jobs, estimates, invoices, inventory, and field photos.', 'Fabrication shops needed one job-centered operating system without relearning their incumbent workflow.', ['Stone-fabricator CRM', 'Estimate and invoice workflows', 'Inventory and field operations'], 'workflow'],
    ['staffy', 'Staffy', 'Applications', 'A flat-priced recruiting CRM for small staffing agencies with AI-assisted parsing, matching, and outreach.', 'Small recruiting teams needed shared candidate workflows without per-seat pricing or data lock-in.', ['Recruiting CRM', 'AI candidate workflows', 'Flat team pricing'], 'workflow'],
    ['static-fpv', 'Static FPV', 'Media', 'A visual media experiment built around motion, perspective, and a strong point of view.', 'The concept needed a memorable way to communicate an atmosphere, not just information.', ['Media production', 'Visual direction', 'Interactive showcase'], 'media'],
    ['sunrisesite', 'Sunrise Breakfast, Lunch & Thai', 'Websites', 'A restaurant website that makes Sunrise’s breakfast, lunch, Thai menu, location, and ordering options easy to explore.', 'Restaurant visitors needed fast access to the menu, location, and ordering options.', ['Dynamic menu', 'Restaurant ordering UX', 'Local discovery'], 'interface'],
    ['superasianwok', 'Super Asian Wok', 'Websites', 'A food-business site that puts appetite, menu clarity, and location information first.', 'Visitors needed to decide what to order and where to go with minimal friction.', ['Restaurant web', 'Menu presentation', 'Local discovery'], 'interface'],
    ['tilmar-ops', 'Til Mar Design Website Concepts', 'Websites', 'A design workspace for the Til Mar Design website, covering brand direction, audits, and responsive mockups.', 'The business needed a considered web direction and practical responsive concepts before implementation.', ['Brand direction', 'Website audits', 'Responsive mockups'], 'interface'],
    ['tinyflags', 'Tiny Flags', 'Automation', 'A tiny utility for making small but important configuration states visible.', 'Small configuration differences needed to be obvious before they caused larger issues.', ['Configuration tooling', 'Status indicators', 'Developer UX'], 'terminal'],
    ['toolbelt', 'Toolbelt', 'Applications', 'An offline-first field-service management PWA for small plumbing, electrical, and HVAC crews.', 'Field crews needed to complete jobs, capture notes and photos, and sync invoices even without connectivity.', ['Offline job completion', 'Dispatch and invoicing', 'Mobile field workflows'], 'workflow'],
    ['wiklite', 'WikLite', 'Applications', 'A local-first Markdown wiki with backlinks, fuzzy search, editing, and graph view.', 'People needed lightweight linked notes without an account, cloud storage, or database lock-in.', ['Markdown editing', 'Backlinks and fuzzy search', 'Graph visualization'], 'interface']
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
        outcome: verifiedCaseStudyDetails[slug]?.outcome
            || `A clear, outcome-focused experience for ${title.toLowerCase()}.`,
        buildSummary: verifiedCaseStudyDetails[slug]?.buildSummary
            || `Built as a focused ${artifactType} experience around ${capabilities.slice(0, 2).join(' and ').toLowerCase()}.`
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
