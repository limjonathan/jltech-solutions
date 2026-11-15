(() => {
    const grid = document.querySelector('#showcase-grid');
    const index = document.querySelector('#project-index');
    const caseStudy = document.querySelector('#case-study-view');
    const count = document.querySelector('#project-count');
    const error = document.querySelector('#showcase-error');
    const filters = [...document.querySelectorAll('.showcase-filter')];
    let projects = [];
    let activeCategory = new URLSearchParams(window.location.search).get('category') || 'all';

    const create = (tag, className, text) => {
        const element = document.createElement(tag);
        if (className) element.className = className;
        if (text) element.textContent = text;
        return element;
    };

    const projectCard = (project) => {
        const article = create('article', 'project-card');
        const image = create('img', 'project-card-media');
        image.src = project.artifact;
        image.alt = `${project.title} project preview`;
        image.loading = 'lazy';
        const body = create('div', 'project-card-body');
        const title = create('h3', null, project.title);
        const summary = create('p', null, project.summary);
        const meta = create('div', 'project-card-meta');
        meta.append(
            create('span', 'project-card-category', project.category),
            create('span', 'project-card-link', 'View case study →')
        );
        body.append(title, summary, meta);
        const link = create('a', null);
        link.href = `showcase.html#${encodeURIComponent(project.slug)}`;
        link.setAttribute('aria-label', `View case study: ${project.title}`);
        link.append(image, body);
        article.append(link);
        return article;
    };

    const renderIndex = () => {
        const visible = activeCategory === 'all'
            ? projects
            : projects.filter((project) => project.category === activeCategory);
        grid.replaceChildren(...visible.map(projectCard));
        count.textContent = `${visible.length} ${visible.length === 1 ? 'project' : 'projects'}`;
        filters.forEach((filter) => {
            const active = filter.dataset.category === activeCategory;
            filter.classList.toggle('is-active', active);
            filter.setAttribute('aria-pressed', String(active));
        });
    };

    const renderCaseStudy = (slug) => {
        const project = projects.find((entry) => entry.slug === slug);
        if (!project) {
            caseStudy.hidden = true;
            index.hidden = false;
            return;
        }
        index.hidden = true;
        caseStudy.hidden = false;
        caseStudy.replaceChildren();
        const shell = create('div', 'case-study-shell');
        const figure = create('figure');
        const image = create('img', 'case-study-artifact');
        image.src = project.artifact;
        image.alt = `${project.title} project preview`;
        const caption = create('figcaption', 'visually-hidden', `${project.title}: ${project.summary}`);
        figure.append(image, caption);
        const copy = create('div', 'case-study-copy');
        const heading = create('h2', null, project.title);
        heading.id = 'case-study-title';
        copy.append(
            create('p', 'eyebrow', `${project.category} · ${project.artifactType}`),
            heading,
            create('p', null, project.summary)
        );
        copy.append(
            create('p', 'case-study-label', 'Outcome'),
            create('p', null, project.outcome),
            create('p', 'case-study-label', 'Build summary'),
            create('p', null, project.buildSummary)
        );
        const problemLabel = create('p', 'case-study-label', 'The problem');
        copy.append(problemLabel, create('p', null, project.problem));
        const capabilityLabel = create('p', 'case-study-label', 'Capabilities');
        const capabilities = create('ul', 'case-study-capabilities');
        project.capabilities.forEach((capability) => capabilities.append(create('li', null, capability)));
        copy.append(capabilityLabel, capabilities);
        const link = create('a', 'case-study-back', '← Back to all work');
        link.href = 'showcase.html';
        copy.append(link);
        shell.append(figure, copy);
        caseStudy.append(shell);
        document.title = `${project.title} Case Study | JL Tech Solutions`;
        document.querySelector('#showcase-content').focus({ preventScroll: true });
    };

    const syncView = () => {
        const slug = decodeURIComponent(window.location.hash.slice(1));
        renderCaseStudy(slug);
        if (!slug) {
            document.title = 'Selected Work | JL Tech Solutions';
            index.hidden = false;
        }
    };

    filters.forEach((filter) => {
        filter.addEventListener('click', () => {
            activeCategory = filter.dataset.category;
            const query = activeCategory === 'all' ? '' : `?category=${encodeURIComponent(activeCategory)}`;
            window.history.replaceState(null, '', `showcase.html${query}${window.location.hash}`);
            renderIndex();
        });
    });

    window.addEventListener('hashchange', syncView);

    fetch('showcase/projects.json?v=2')
        .then((response) => {
            if (!response.ok) throw new Error('Catalog unavailable');
            return response.json();
        })
        .then((catalog) => {
            projects = catalog;
            const knownCategories = new Set(filters.map((filter) => filter.dataset.category));
            if (!knownCategories.has(activeCategory)) activeCategory = 'all';
            renderIndex();
            syncView();
        })
        .catch(() => {
            error.hidden = false;
            count.textContent = 'Catalog unavailable';
        });
})();
