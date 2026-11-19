(() => {
    const grid = document.querySelector('#showcase-grid');
    const index = document.querySelector('#project-index');
    const caseStudy = document.querySelector('#case-study-view');
    const count = document.querySelector('#project-count');
    const error = document.querySelector('#showcase-error');
    const filters = [...document.querySelectorAll('.showcase-filter')];
    let projects = [];
    let activeCategory = new URLSearchParams(window.location.search).get('category') || 'all';
    let lastTrigger = null;
    let pendingFocus = null;

    const create = (tag, className, text) => {
        const element = document.createElement(tag);
        if (className) element.className = className;
        if (text !== undefined) element.textContent = text;
        return element;
    };

    const visibleProjects = () => activeCategory === 'all'
        ? projects
        : projects.filter((project) => project.category === activeCategory);

    const safeDemoUrl = (value) => {
        if (typeof value !== 'string' || !value) return null;
        try {
            const url = new URL(value);
            const hostname = url.hostname.toLowerCase();
            if (url.protocol === 'https:' && !url.username && !url.password && !url.port) {
                const localName = ['local', 'host'].join('');
                if (hostname !== localName && hostname !== '::1' && !hostname.endsWith('.local')) {
                    if (/^(10|127)\./.test(hostname) || /^192\.168\./.test(hostname) || /^172\.(1[6-9]|2\d|3[01])\./.test(hostname)) return null;
                    return url.href;
                }
            }
            return null;
        } catch {
            return null;
        }
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
        link.addEventListener('click', (event) => {
            event.preventDefault();
            lastTrigger = link;
            window.location.hash = encodeURIComponent(project.slug);
        });
        article.append(link);
        return article;
    };

    const renderIndex = () => {
        const visible = visibleProjects();
        grid.replaceChildren(...visible.map(projectCard));
        count.textContent = `${visible.length} ${visible.length === 1 ? 'project' : 'projects'}`;
        filters.forEach((filter) => {
            const active = filter.dataset.category === activeCategory;
            filter.classList.toggle('is-active', active);
            filter.setAttribute('aria-pressed', String(active));
        });
    };

    const updateGallery = (image, thumbnails, images, project, activeIndex) => {
        image.src = images[activeIndex];
        image.alt = `${project.title} project preview ${activeIndex + 1} of ${images.length}`;
        thumbnails.forEach((thumbnail, index) => {
            thumbnail.classList.toggle('is-active', index === activeIndex);
            thumbnail.setAttribute('aria-current', index === activeIndex ? 'true' : 'false');
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

        const visible = visibleProjects();
        const projectIndex = visible.findIndex((entry) => entry.slug === slug);
        const shell = create('div', 'case-study-shell');
        const close = create('button', 'case-study-close', 'Close case study');
        close.type = 'button';
        close.setAttribute('aria-label', `Close ${project.title} case study`);
        close.addEventListener('click', closeCaseStudy);
        caseStudy.append(close);

        const gallery = create('div', 'case-study-gallery');
        const figure = create('figure');
        const image = create('img', 'case-study-artifact');
        const images = [project.artifact, ...(project.screenshots || [])];
        const thumbnails = [];
        images.forEach((source, imageIndex) => {
            const thumbnail = create('button', 'case-study-thumbnail');
            thumbnail.type = 'button';
            thumbnail.setAttribute('aria-label', `Show screenshot ${imageIndex + 1} of ${images.length}`);
            thumbnail.addEventListener('click', () => updateGallery(image, thumbnails, images, project, imageIndex));
            const thumbnailImage = create('img');
            thumbnailImage.src = source;
            thumbnailImage.alt = '';
            thumbnailImage.loading = 'lazy';
            thumbnail.append(thumbnailImage);
            thumbnails.push(thumbnail);
        });
        updateGallery(image, thumbnails, images, project, 0);
        const caption = create('figcaption', 'visually-hidden', `${project.title}: ${project.summary}`);
        figure.append(image, caption);
        const thumbnailList = create('div', 'case-study-thumbnails');
        thumbnailList.setAttribute('aria-label', 'Project screenshots');
        thumbnails.forEach((thumbnail) => thumbnailList.append(thumbnail));
        gallery.append(figure, thumbnailList);

        const copy = create('div', 'case-study-copy');
        const heading = create('h2', null, project.title);
        heading.id = 'case-study-title';
        copy.append(
            create('p', 'eyebrow', `${project.category} · ${project.artifactType}`),
            heading,
            create('p', null, project.summary)
        );
        const details = [
            ['The problem', project.problem],
            ['Outcome', project.outcome],
            ['Build summary', project.buildSummary]
        ];
        details.forEach(([label, text]) => {
            const section = create('section', 'case-study-detail');
            section.append(create('h3', 'case-study-label', label), create('p', null, text));
            copy.append(section);
        });

        const capabilitySection = create('section', 'case-study-detail');
        capabilitySection.append(create('h3', 'case-study-label', 'Capabilities'));
        const capabilities = create('ul', 'case-study-capabilities');
        project.capabilities.forEach((capability) => {
            const item = create('li', 'case-study-chip', capability);
            capabilities.append(item);
        });
        capabilitySection.append(capabilities);
        copy.append(capabilitySection);

        const demoUrl = safeDemoUrl(project.demoUrl);
        if (demoUrl) {
            const demo = create('a', 'case-study-demo', 'Open safe demo');
            demo.href = demoUrl;
            demo.target = '_blank';
            demo.rel = 'noopener noreferrer';
            copy.append(demo);
        }

        const navigation = create('nav', 'case-study-navigation', 'Browse case studies');
        const previous = create('button', 'case-study-previous', '← Previous project');
        const next = create('button', 'case-study-next', 'Next project →');
        previous.type = 'button';
        next.type = 'button';
        previous.disabled = projectIndex <= 0;
        next.disabled = projectIndex < 0 || projectIndex >= visible.length - 1;
        previous.addEventListener('click', () => navigateCaseStudy(visible[projectIndex - 1], 'previous'));
        next.addEventListener('click', () => navigateCaseStudy(visible[projectIndex + 1], 'next'));
        navigation.append(previous, next);
        copy.append(navigation);

        const back = create('a', 'case-study-back', '← Back to all work');
        back.href = 'showcase.html';
        copy.append(back);
        shell.append(gallery, copy);
        caseStudy.append(shell);
        document.title = `${project.title} Case Study | JL Tech Solutions`;

        const focusElement = pendingFocus === 'previous' ? previous
            : pendingFocus === 'next' ? next : close;
        pendingFocus = null;
        focusElement.focus();
    };

    const navigateCaseStudy = (project, control) => {
        if (!project) return;
        pendingFocus = control;
        window.location.hash = encodeURIComponent(project.slug);
    };

    function closeCaseStudy() {
        const trigger = lastTrigger;
        window.history.pushState(null, '', `${window.location.pathname}${window.location.search}`);
        syncView();
        if (trigger && document.contains(trigger)) trigger.focus();
        lastTrigger = null;
    }

    const syncView = () => {
        let slug = window.location.hash.slice(1);
        try {
            slug = decodeURIComponent(slug);
        } catch {
            slug = '';
        }
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

    document.addEventListener('keydown', (event) => {
        if (event.key === 'Escape' && !caseStudy.hidden) closeCaseStudy();
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
