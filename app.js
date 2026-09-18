/* ==========================================================================
   JL TECH SOLUTIONS - Application Logic
   ========================================================================== */

document.addEventListener('DOMContentLoaded', () => {

    // 1. MOBILE MENU
    const menuToggleBtn = document.getElementById('menu-toggle-btn');
    const mainNavMenu = document.getElementById('main-nav-menu');
    const navLinks = document.querySelectorAll('.nav-link');

    if (menuToggleBtn && mainNavMenu) {
        menuToggleBtn.addEventListener('click', () => {
            const isExpanded = menuToggleBtn.getAttribute('aria-expanded') === 'true';
            menuToggleBtn.setAttribute('aria-expanded', !isExpanded);
            menuToggleBtn.classList.toggle('active');
            mainNavMenu.classList.toggle('active');
        });
        navLinks.forEach(link => {
            link.addEventListener('click', () => {
                menuToggleBtn.setAttribute('aria-expanded', 'false');
                menuToggleBtn.classList.remove('active');
                mainNavMenu.classList.remove('active');
            });
        });
    }

    // 2. SERVICE MODALS
    const solutionCards = document.querySelectorAll('.service-card');
    const specModals = document.querySelectorAll('.spec-modal');
    let modalTrigger = null;

    function openModal(card) {
        const modalId = card.getAttribute('data-target');
        const targetModal = document.getElementById(modalId);
        if (!targetModal) return;
        modalTrigger = card;
        targetModal.classList.add('active');
        targetModal.setAttribute('aria-hidden', 'false');
        document.body.style.overflow = 'hidden';
        const closeBtn = targetModal.querySelector('.modal-close');
        if (closeBtn) closeBtn.focus();
    }

    function closeModal(modal) {
        if (!modal) return;
        modal.classList.remove('active');
        modal.setAttribute('aria-hidden', 'true');
        document.body.style.overflow = '';
        if (modalTrigger) {
            modalTrigger.focus();
            modalTrigger = null;
        }
    }

    solutionCards.forEach(card => {
        card.setAttribute('role', 'button');
        card.setAttribute('tabindex', '0');
        card.setAttribute('aria-haspopup', 'dialog');
        card.addEventListener('click', () => openModal(card));
        card.addEventListener('keydown', (e) => {
            if (e.key === 'Enter' || e.key === ' ' || e.key === 'Spacebar') {
                e.preventDefault();
                openModal(card);
            }
        });
    });

    document.querySelectorAll('.modal-close, .modal-overlay').forEach(close => {
        close.addEventListener('click', () => closeModal(close.closest('.spec-modal')));
    });

    window.addEventListener('keydown', (e) => {
        if (e.key !== 'Escape') return;
        specModals.forEach(modal => {
            if (modal.classList.contains('active')) closeModal(modal);
        });
    });

    // Modal focus trap
    specModals.forEach(modal => {
        modal.addEventListener('keydown', (e) => {
            if (e.key !== 'Tab' || !modal.classList.contains('active')) return;
            const focusable = modal.querySelectorAll('button, [href], input, select, textarea, [tabindex]:not([tabindex="-1"])');
            if (!focusable.length) return;
            const first = focusable[0];
            const last = focusable[focusable.length - 1];
            if (e.shiftKey && document.activeElement === first) { e.preventDefault(); last.focus(); }
            else if (!e.shiftKey && document.activeElement === last) { e.preventDefault(); first.focus(); }
        });
    });


    // 3. NOC LOG JOURNAL
    const logConsole = document.getElementById('console-logs-container');
    const pauseLogsBtn = document.getElementById('btn-pause-logs');
    const clearLogsBtn = document.getElementById('btn-clear-logs');

    let logsPaused = false;
    let logTimer = null;

    const logMessagesPool = [
        { type: 'info', tag: 'AI_OPS', msg: 'AI agent completed RFP analysis for Cannon AFB procurement. 247 requirements extracted.' },
        { type: 'success', tag: 'SEC_OPS', msg: 'DMZ firewall rules audited. All isolation policies verified compliant.' },
        { type: 'info', tag: 'AI_OPS', msg: 'Document intelligence pipeline processed 86 invoices. Zero extraction errors.' },
        { type: 'warn', tag: 'SYS_OPS', msg: 'Backup storage at 78% capacity. Auto-scaling triggered on backup volume.' },
        { type: 'info', tag: 'NET_OPS', msg: 'Route tables optimized. BBR congestion control active on primary WAN.' },
        { type: 'success', tag: 'SEC_OPS', msg: 'MFA rollout completed for client site. 142 users enrolled successfully.' },
        { type: 'info', tag: 'AI_OPS', msg: 'Compliance gap analysis finished. 3 NIST 800-171 controls flagged for remediation.' },
        { type: 'success', tag: 'AI_OPS', msg: 'Chatbot deployment for medical practice completed. Patient intake workflow live.' },
        { type: 'warn', tag: 'NET_OPS', msg: 'Minor latency spike on VPN tunnel. Failover link tested and operational.' },
        { type: 'error', tag: 'SEC_OPS', msg: 'Brute-force attempt blocked on client gateway. Source IP auto-banned for 24h.' },
        { type: 'info', tag: 'AI_OPS', msg: 'AI-generated BOM v2 validated. 12 hardware items matched across 3 vendors.' },
        { type: 'success', tag: 'SYS_OPS', msg: 'POS system deployed for restaurant client. 5 terminals, 2 kitchen displays online.' }
    ];

    function getFormattedTimestamp() {
        const d = new Date();
        const pad = (n) => String(n).padStart(2, '0');
        return `[${d.getFullYear()}-${pad(d.getMonth()+1)}-${pad(d.getDate())} ${pad(d.getHours())}:${pad(d.getMinutes())}:${pad(d.getSeconds())}]`;
    }

    function addLogEntry(type, tag, msg) {
        if (!logConsole) return;
        const row = document.createElement('div');
        row.className = `log-row ${type}`;

        const tsEl = document.createElement('span');
        tsEl.className = 'log-timestamp';
        tsEl.textContent = getFormattedTimestamp();

        const tagEl = document.createElement('span');
        tagEl.className = 'log-tag';
        tagEl.textContent = `[${tag}]`;

        const msgEl = document.createElement('span');
        msgEl.className = 'log-msg';
        msgEl.textContent = msg;

        row.append(tsEl, tagEl, msgEl);
        logConsole.appendChild(row);
        logConsole.scrollTop = logConsole.scrollHeight;
        if (logConsole.childElementCount > 50) {
            logConsole.removeChild(logConsole.firstElementChild);
        }
    }

    function generateRandomLogs() {
        if (logsPaused) return;
        const item = logMessagesPool[Math.floor(Math.random() * logMessagesPool.length)];
        addLogEntry(item.type, item.tag, item.msg);
    }

    if (logConsole) {
        addLogEntry('success', 'SYS_INI', 'JL Tech Operations Hub initialized. All systems nominal.');
        addLogEntry('info', 'AI_OPS', 'AI co-worker cluster online. 4 agents available for task processing.');
        addLogEntry('info', 'SEC_OPS', 'Firewall rule mapping validated across all managed client gateways.');
        addLogEntry('success', 'SYS_OPS', 'Active Directory replication healthy. All domain controllers synchronized.');
        logTimer = setInterval(generateRandomLogs, 3000);
    }

    if (pauseLogsBtn) {
        pauseLogsBtn.addEventListener('click', () => {
            logsPaused = !logsPaused;
            pauseLogsBtn.textContent = logsPaused ? 'RESUME' : 'PAUSE';
            pauseLogsBtn.style.borderColor = logsPaused ? 'var(--color-primary)' : '';
            pauseLogsBtn.style.color = logsPaused ? 'var(--color-primary)' : '';
        });
    }

    if (clearLogsBtn) {
        clearLogsBtn.addEventListener('click', () => {
            if (logConsole) logConsole.innerHTML = '';
            addLogEntry('info', 'SYS_CLR', 'Ops log cleared.');
        });
    }


    // 4. TELEMETRY - System + AI Ops metrics
    const cpuVal = document.querySelector('#stat-cpu .stat-value');
    const cpuBar = document.querySelector('#stat-cpu .graph-bar');
    const ramVal = document.querySelector('#stat-ram .stat-value');
    const ramBar = document.querySelector('#stat-ram .graph-bar');
    const latVal = document.querySelector('#stat-latency .stat-value');
    const latBar = document.querySelector('#stat-latency .graph-bar');
    const aiTasksVal = document.querySelector('#stat-ai-tasks .stat-value');
    const aiTasksBar = document.querySelector('#stat-ai-tasks .graph-bar');
    const aiDocsVal = document.querySelector('#stat-ai-docs .stat-value');
    const aiDocsBar = document.querySelector('#stat-ai-docs .graph-bar');
    const aiTimeVal = document.querySelector('#stat-ai-time .stat-value');
    const aiTimeBar = document.querySelector('#stat-ai-time .graph-bar');
    const aiAccVal = document.querySelector('#stat-ai-accuracy .stat-value');
    const aiAccBar = document.querySelector('#stat-ai-accuracy .graph-bar');

    let telemetryTimer = null;

    function updateTelemetryValues() {
        if (logsPaused) return;

        if (cpuVal && cpuBar) {
            const cpu = (8 + Math.random() * 10).toFixed(1);
            cpuVal.textContent = `${cpu}%`;
            cpuBar.style.width = `${cpu * 2.5}%`;
        }
        if (ramVal && ramBar) {
            const ram = (40 + Math.random() * 4).toFixed(1);
            ramVal.textContent = `${ram}%`;
            ramBar.style.width = `${ram}%`;
        }
        if (latVal && latBar) {
            const latency = Math.floor(6 + Math.random() * 8);
            latVal.textContent = `${latency}ms`;
            latBar.style.width = `${latency * 5}%`;
        }
        if (aiTasksVal && aiTasksBar) {
            const tasks = Math.floor(820 + Math.random() * 60);
            aiTasksVal.textContent = tasks.toLocaleString();
            aiTasksBar.style.width = `${Math.min((tasks / 1200) * 100, 100)}%`;
        }
        if (aiDocsVal && aiDocsBar) {
            const docs = Math.floor(12300 + Math.random() * 200);
            aiDocsVal.textContent = docs.toLocaleString();
            aiDocsBar.style.width = `${Math.min((docs / 20000) * 100, 100)}%`;
        }
        if (aiTimeVal && aiTimeBar) {
            const t = (1.5 + Math.random() * 1.5).toFixed(1);
            aiTimeVal.textContent = `${t}s`;
            aiTimeBar.style.width = `${t * 15}%`;
        }
        if (aiAccVal && aiAccBar) {
            const acc = (96.8 + Math.random() * 1.5).toFixed(1);
            aiAccVal.textContent = `${acc}%`;
            aiAccBar.style.width = `${acc}%`;
        }
    }

    telemetryTimer = setInterval(updateTelemetryValues, 2500);


    // 5. PROJECT INQUIRY FORM
    // Set FORM_ENDPOINT to a form service URL (Formspree / Web3Forms / your own API) to
    // enable server-side delivery. While it is empty the form falls back to a prefilled
    // mailto: draft so an inquiry is never silently discarded.
    const FORM_ENDPOINT = '';
    const CONTACT_USER = 'limjonathan1990';
    const CONTACT_DOMAIN = 'gmail.com';

    const ticketForm = document.getElementById('incident-ticket-form');
    const transScreen = document.getElementById('portal-transmitting-screen');
    const receiptScreen = document.getElementById('portal-receipt-screen');
    const uplinkConsole = document.getElementById('uplink-console-body');
    const formErrorEl = document.getElementById('portal-form-error');
    const receiptLead = document.getElementById('receipt-lead');
    const resetFormBtn = document.getElementById('btn-reset-form');

    const nameInput = document.getElementById('input-client-name');
    const orgInput = document.getElementById('input-client-org');
    const emailInput = document.getElementById('input-client-email');
    const phoneInput = document.getElementById('input-client-phone');
    const catSelect = document.getElementById('select-service-cat');
    const descTextarea = document.getElementById('textarea-desc');
    const honeypotInput = document.getElementById('input-website-url');

    const severityOptions = document.querySelectorAll('.severity-option');

    const CATEGORY_MAP = {
        'managed_it': 'Managed IT Services',
        'presales': 'Presales & Procurement',
        'cloud': 'Cloud & Infrastructure',
        'identity': 'Identity & Access',
        'security': 'Security Operations',
        'web': 'Websites & Software',
        'pos': 'POS & Business Systems',
        'ai': 'AI-Augmented Services',
        'compliance': 'Compliance & Auditing'
    };

    function syncSeverityClasses() {
        severityOptions.forEach(opt => {
            const input = opt.querySelector('input[type="radio"]');
            opt.classList.toggle('is-checked', !!(input && input.checked));
        });
    }

    function getContactEmail() {
        return `${CONTACT_USER}@${CONTACT_DOMAIN}`;
    }

    function collectInquiry() {
        const checkedRadio = ticketForm.querySelector('input[name="severity_level"]:checked');
        const severity = checkedRadio ? checkedRadio.value.toUpperCase() : 'MEDIUM';
        const categoryText = CATEGORY_MAP[catSelect.value] || 'General Inquiry';
        const severityLabel = severity === 'HIGH' ? 'Urgent' : severity === 'MEDIUM' ? 'Standard' : 'Flexible';
        return {
            clientName: nameInput.value.trim(),
            clientOrg: orgInput.value.trim(),
            clientEmail: emailInput.value.trim(),
            clientPhone: phoneInput ? phoneInput.value.trim() : '',
            categoryText,
            severity,
            severityLabel,
            description: descTextarea.value.trim()
        };
    }

    function buildMailtoLink(inquiry) {
        const subject = `Project Inquiry: ${inquiry.categoryText} (${inquiry.clientOrg})`;
        const body = [
            `Name: ${inquiry.clientName}`,
            `Organization: ${inquiry.clientOrg}`,
            `Email: ${inquiry.clientEmail}`,
            `Phone: ${inquiry.clientPhone || 'Not provided'}`,
            `Service: ${inquiry.categoryText}`,
            `Timeline: ${inquiry.severityLabel}`,
            '',
            'Project details:',
            inquiry.description
        ].join('\n');
        return `mailto:${getContactEmail()}?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`;
    }

    function hideFormError() {
        if (!formErrorEl) return;
        formErrorEl.hidden = true;
        formErrorEl.textContent = '';
    }

    function showFormError(message, mailtoHref) {
        if (!formErrorEl) return;
        formErrorEl.textContent = '';
        formErrorEl.appendChild(document.createTextNode(message));
        if (mailtoHref) {
            const link = document.createElement('a');
            link.href = mailtoHref;
            link.textContent = 'send it by email instead';
            formErrorEl.appendChild(link);
            formErrorEl.appendChild(document.createTextNode(' so it reaches us.'));
        }
        formErrorEl.hidden = false;
    }

    function buildProcessingSteps(inquiry) {
        return [
            { text: 'Initializing secure inquiry processing...', delay: 0 },
            { text: 'Connecting to JL Tech dispatch system...', delay: 450 },
            { text: 'Secure session established. TLS 1.3 verified.', delay: 900, class: 'success' },
            { text: `Logging inquiry for: [${inquiry.clientOrg}]`, delay: 1350, class: 'active' },
            { text: `Service category identified: ${inquiry.categoryText}`, delay: 1800, class: 'accent' },
            { text: `Timeline classification: [${inquiry.severityLabel}] priority`, delay: 2250, class: inquiry.severity === 'HIGH' ? 'success' : 'accent' },
            { text: 'Generating inquiry tracking identifier...', delay: 2700 },
            { text: 'Inquiry registered in JL Tech project queue.', delay: 3150, class: 'success' }
        ];
    }

    function runProcessingSteps(steps) {
        steps.forEach(step => {
            setTimeout(() => {
                if (!uplinkConsole) return;
                const row = document.createElement('div');
                row.className = 'uplink-row';
                if (step.class) row.classList.add(step.class);
                row.textContent = `> ${step.text}`;
                uplinkConsole.appendChild(row);
                uplinkConsole.scrollTop = uplinkConsole.scrollHeight;
            }, step.delay);
        });
    }

    function renderReceipt(inquiry, delivered) {
        const ticketId = `INQ-${new Date().getFullYear()}-${Math.floor(1000 + Math.random() * 9000)}`;

        const ticketIdEl = document.getElementById('receipt-ticket-id');
        if (ticketIdEl) ticketIdEl.textContent = ticketId;

        document.getElementById('receipt-client-name').textContent = inquiry.clientName;
        document.getElementById('receipt-client-org').textContent = inquiry.clientOrg;
        document.getElementById('receipt-category').textContent = inquiry.categoryText;

        if (receiptLead) {
            receiptLead.textContent = delivered
                ? "Your project inquiry has been sent. We'll review your requirements and respond within one business day."
                : "Your email draft is ready in your mail app. Press Send to reach us. We'll respond within one business day.";
        }

        const receiptTitleEl = document.getElementById('receipt-title');
        if (receiptTitleEl) {
            receiptTitleEl.textContent = delivered ? 'Inquiry Submitted' : 'Draft Ready to Send';
        }

        const sevEl = document.getElementById('receipt-severity');
        sevEl.textContent = inquiry.severityLabel;
        sevEl.className = 't-val';
        if (inquiry.severity === 'HIGH') {
            sevEl.style.color = 'var(--color-alert-text)';
        } else if (inquiry.severity === 'MEDIUM') {
            sevEl.style.color = 'var(--color-warning-text)';
        } else {
            sevEl.style.color = 'var(--color-accent-text)';
        }

        const d = new Date();
        const pad = (n) => String(n).padStart(2, '0');
        document.getElementById('receipt-timestamp').textContent =
            `${d.getFullYear()}-${pad(d.getMonth() + 1)}-${pad(d.getDate())} ${pad(d.getHours())}:${pad(d.getMinutes())}:${pad(d.getSeconds())}`;

        receiptScreen.style.display = 'flex';
        addLogEntry('success', 'SYS_INQ', `Project inquiry ${delivered ? 'submitted' : 'drafted'}: [${ticketId}] ${inquiry.categoryText}, ${inquiry.clientOrg}.`);
    }

    function validateField(inputEl) {
        if (!inputEl) return true;
        let isValid = true;

        if (inputEl.tagName === 'SELECT') {
            isValid = inputEl.value !== '';
        } else if (inputEl.type === 'email') {
            isValid = /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(inputEl.value.trim());
        } else {
            isValid = inputEl.value.trim() !== '';
        }

        const formGroup = inputEl.closest('.form-group');
        if (formGroup) {
            if (!isValid) formGroup.classList.add('has-error');
            else formGroup.classList.remove('has-error');
        }
        return isValid;
    }

    [nameInput, orgInput, emailInput, phoneInput, catSelect, descTextarea].forEach(input => {
        if (input) {
            const eventType = input.tagName === 'SELECT' ? 'change' : 'input';
            input.addEventListener(eventType, () => {
                const formGroup = input.closest('.form-group');
                if (formGroup && formGroup.classList.contains('has-error')) {
                    validateField(input);
                }
            });
        }
    });

    if (ticketForm) {
        ticketForm.addEventListener('submit', async (e) => {
            e.preventDefault();
            hideFormError();

            // Honeypot: bots fill every field. Real users never see or reach this one.
            if (honeypotInput && honeypotInput.value !== '') return;

            const isNameValid = validateField(nameInput);
            const isOrgValid = validateField(orgInput);
            const isEmailValid = validateField(emailInput);
            const isCatValid = validateField(catSelect);
            const isDescValid = validateField(descTextarea);

            if (!(isNameValid && isOrgValid && isEmailValid && isCatValid && isDescValid)) {
                const firstError = ticketForm.querySelector('.has-error');
                if (firstError) firstError.scrollIntoView({ behavior: 'smooth', block: 'center' });
                return;
            }

            const inquiry = collectInquiry();
            const submitBtn = document.getElementById('btn-submit-incident');
            if (submitBtn) submitBtn.disabled = true;

            // No endpoint configured: hand the inquiry to the visitor's mail client so it
            // actually reaches us instead of being discarded by a fake success screen.
            if (!FORM_ENDPOINT) {
                ticketForm.style.display = 'none';
                renderReceipt(inquiry, false);
                window.location.href = buildMailtoLink(inquiry);
                if (submitBtn) submitBtn.disabled = false;
                return;
            }

            ticketForm.style.display = 'none';
            transScreen.style.display = 'flex';
            uplinkConsole.textContent = '';

            const steps = buildProcessingSteps(inquiry);
            runProcessingSteps(steps);

            try {
                const response = await fetch(FORM_ENDPOINT, {
                    method: 'POST',
                    headers: { 'Content-Type': 'application/json', 'Accept': 'application/json' },
                    body: JSON.stringify({
                        name: inquiry.clientName,
                        organization: inquiry.clientOrg,
                        email: inquiry.clientEmail,
                        phone: inquiry.clientPhone,
                        service: inquiry.categoryText,
                        timeline: inquiry.severityLabel,
                        details: inquiry.description
                    })
                });

                if (!response.ok) throw new Error(`HTTP ${response.status}`);

                await new Promise(resolve => setTimeout(resolve, steps.length * 450));

                transScreen.style.display = 'none';
                renderReceipt(inquiry, true);
            } catch (err) {
                transScreen.style.display = 'none';
                ticketForm.style.display = 'block';
                showFormError(
                    `Sorry, we couldn't submit your inquiry automatically (${err.message}). Please `,
                    buildMailtoLink(inquiry)
                );
                if (formErrorEl) formErrorEl.scrollIntoView({ behavior: 'smooth', block: 'center' });
            } finally {
                if (submitBtn) submitBtn.disabled = false;
            }
        });
    }

    if (resetFormBtn) {
        resetFormBtn.addEventListener('click', () => {
            if (!ticketForm) return;
            ticketForm.reset();
            ticketForm.querySelectorAll('.form-group').forEach(grp => grp.classList.remove('has-error'));
            syncSeverityClasses();
            hideFormError();
            receiptScreen.style.display = 'none';
            ticketForm.style.display = 'block';
        });
    }


    // 6. RADIO STATE SYNC (fallback for browsers without :has())
    severityOptions.forEach(opt => {
        const input = opt.querySelector('input[type="radio"]');
        if (input) input.addEventListener('change', syncSeverityClasses);
    });
    syncSeverityClasses();


    // 8. CLEANUP
    window.addEventListener('beforeunload', () => {
        if (logTimer) clearInterval(logTimer);
        if (telemetryTimer) clearInterval(telemetryTimer);
    });
});
