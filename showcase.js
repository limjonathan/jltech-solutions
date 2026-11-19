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
    let backgroundState = [];

    const create = (tag, className, text) => {
        const element = document.createElement(tag);
        if (className) element.className = className;
        if (text !== undefined) element.textContent = text;
        return element;
    };

    const visibleProjects = () => activeCategory === 'all'
        ? projects
        : projects.filter((project) => project.category === activeCategory);

    const parseIpv6 = (hostname) => {
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
    };

    const isBlockedIpv4 = (octets) => {
        if (octets.length !== 4 || octets.some((octet) => !Number.isInteger(octet) || octet < 0 || octet > 255)) return true;
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
            || first === 198 && (second === 18 || second === 19 || second === 51)
            || first === 203 && second === 0 && third === 113
            || first >= 224
            || first === 192 && second === 31 && third === 196 && fourth === 0
            || first === 192 && second === 52 && third === 193 && fourth === 0;
    };

    const isBlockedIpv6 = (hostname) => {
        const bytes = parseIpv6(hostname);
        if (!bytes) return true;
        const isUnspecified = bytes.every((byte) => byte === 0);
        const isLoopback = bytes.slice(0, 15).every((byte) => byte === 0) && bytes[15] === 1;
        const isIpv4Mapped = bytes.slice(0, 10).every((byte) => byte === 0)
            && bytes[10] === 0xff && bytes[11] === 0xff;
        if (isIpv4Mapped && isBlockedIpv4(bytes.slice(12))) return true;
        return isUnspecified
            || isLoopback
            || bytes[0] === 0xfc || bytes[0] === 0xfd
            || bytes[0] === 0xfe && (bytes[1] & 0xc0) === 0x80
            || bytes[0] === 0xff
            || bytes[0] === 0x20 && bytes[1] === 0x01 && bytes[2] === 0x00
                && (bytes[3] === 0x00 || bytes[3] === 0x02 || bytes[3] === 0x10)
            || bytes[0] === 0x3f && bytes[1] === 0xff;
    };

    const isIpv4 = (hostname) => /^\d{1,3}(?:\.\d{1,3}){3}$/.test(hostname);
    const isIpv6 = (hostname) => hostname.includes(':');
    const safeDemoUrl = (value) => {
        if (typeof value !== 'string' || !value) return null;
        try {
            const url = new URL(value);
            const hostname = url.hostname.toLowerCase().replace(/^\[|\]$/g, '').replace(/\.+$/, '');
            if (url.protocol !== 'https:' || url.username || url.password || url.port || !hostname) return null;
            if (['localhost', 'localhost.localdomain', 'ip6-localhost'].includes(hostname)
                || hostname.endsWith('.localhost')
                || hostname.endsWith('.local')
                || hostname.endsWith('.internal')
                || hostname.endsWith('.home.arpa')) return null;
            if (isIpv4(hostname) && isBlockedIpv4(hostname.split('.').map(Number))) return null;
            if (isIpv6(hostname) && isBlockedIpv6(hostname)) return null;
            return url.href;
        } catch {
            return null;
        }
    };
    if (window.__SHOWCASE_TEST__) window.__showcaseTestHooks = { safeDemoUrl };

    const setModalBackgroundState = (isOpen) => {
        if (isOpen) {
            if (backgroundState.length) return;
            const backgroundElements = new Set();
            let current = caseStudy;
            while (current && current.parentElement && current.parentElement !== document.body) {
                [...current.parentElement.children]
                    .filter((element) => element !== current)
                    .forEach((element) => backgroundElements.add(element));
                current = current.parentElement;
            }
            if (current?.parentElement === document.body) {
                [...current.parentElement.children]
                    .filter((element) => element !== current)
                    .forEach((element) => backgroundElements.add(element));
            }
            backgroundState = [...backgroundElements].map((element) => ({
                    element,
                    inert: element.inert,
                    ariaHidden: element.getAttribute('aria-hidden')
                }));
            backgroundState.forEach(({ element }) => {
                element.inert = true;
                element.setAttribute('aria-hidden', 'true');
            });
            return;
        }
        backgroundState.forEach(({ element, inert, ariaHidden }) => {
            element.inert = inert;
            if (ariaHidden === null) element.removeAttribute('aria-hidden');
            else element.setAttribute('aria-hidden', ariaHidden);
        });
        backgroundState = [];
    };

    const focusableSelector = 'a[href], button:not([disabled]), input:not([disabled]), select:not([disabled]), textarea:not([disabled]), [tabindex]:not([tabindex="-1"])';
    const trapFocus = (event) => {
        if (caseStudy.hidden || event.key !== 'Tab') return;
        const focusable = [...caseStudy.querySelectorAll(focusableSelector)];
        if (!focusable.length) {
            event.preventDefault();
            caseStudy.focus();
            return;
        }
        const first = focusable[0];
        const last = focusable[focusable.length - 1];
        if (event.shiftKey && document.activeElement === first) {
            event.preventDefault();
            last.focus();
        } else if (!event.shiftKey && document.activeElement === last) {
            event.preventDefault();
            first.focus();
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
            setModalBackgroundState(false);
            index.hidden = false;
            return;
        }

        index.hidden = true;
        caseStudy.hidden = false;
        setModalBackgroundState(true);
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
            let currentSlug = '';
            try {
                currentSlug = decodeURIComponent(window.location.hash.slice(1));
            } catch {
                currentSlug = '';
            }
            const nextHash = visibleProjects().some((project) => project.slug === currentSlug)
                ? window.location.hash
                : '';
            window.history.replaceState(null, '', `showcase.html${query}${nextHash}`);
            renderIndex();
            syncView();
        });
    });

    document.addEventListener('keydown', (event) => {
        if (event.key === 'Escape' && !caseStudy.hidden) closeCaseStudy();
        trapFocus(event);
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
