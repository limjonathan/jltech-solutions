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

    // Header scroll (throttled)
    const mainHeader = document.querySelector('.main-header');
    let scrollTicking = false;
    window.addEventListener('scroll', () => {
        if (!scrollTicking) {
            requestAnimationFrame(() => {
                if (mainHeader) {
                    mainHeader.classList.toggle('scrolled', window.scrollY > 40);
                }
                scrollTicking = false;
            });
            scrollTicking = true;
        }
    });


    // 2. SERVICE MODALS
    const solutionCards = document.querySelectorAll('.service-card');
    const specModals = document.querySelectorAll('.spec-modal');

    solutionCards.forEach(card => {
        card.addEventListener('click', () => {
            const modalId = card.getAttribute('data-target');
            const targetModal = document.getElementById(modalId);
            if (targetModal) {
                targetModal.classList.add('active');
                targetModal.setAttribute('aria-hidden', 'false');
                document.body.style.overflow = 'hidden';
                const closeBtn = targetModal.querySelector('.modal-close');
                if (closeBtn) closeBtn.focus();
            }
        });
    });

    document.querySelectorAll('.modal-close, .modal-overlay').forEach(close => {
        close.addEventListener('click', () => {
            const activeModal = close.closest('.spec-modal');
            if (activeModal) {
                activeModal.classList.remove('active');
                activeModal.setAttribute('aria-hidden', 'true');
                document.body.style.overflow = '';
            }
        });
    });

    window.addEventListener('keydown', (e) => {
        if (e.key === 'Escape') {
            specModals.forEach(modal => {
                if (modal.classList.contains('active')) {
                    modal.classList.remove('active');
                    modal.setAttribute('aria-hidden', 'true');
                    document.body.style.overflow = '';
                }
            });
        }
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
        row.innerHTML = `<span class="log-timestamp">${getFormattedTimestamp()}</span><span class="log-tag">[${tag}]</span><span class="log-msg">${msg}</span>`;
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
        if (cpuVal && cpuBar) { const cpu = (8 + Math.random() * 10).toFixed(1); cpuVal.textContent = `${cpu}%`; cpuBar.style.width = `${cpu * 2.5}%`; }
        if (ramVal && ramBar) { const ram = (40 + Math.random() * 4).toFixed(1); ramVal.textContent = `${ram}%`; ramBar.style.width = `${ram}%`; }
        if (latVal && latBar) { const latency = Math.floor(6 + Math.random() * 8); latVal.textContent = `${latency}ms`; latBar.style.width = `${latency * 5}%`; }
        if (aiTasksVal && aiTasksBar) { const tasks = Math.floor(820 + Math.random() * 60); aiTasksVal.textContent = tasks.toLocaleString(); aiTasksBar.style.width = `${Math.min((tasks / 1200) * 100, 100)}%`; }
        if (aiDocsVal && aiDocsBar) { const docs = Math.floor(12300 + Math.random() * 200); aiDocsVal.textContent = docs.toLocaleString(); aiDocsBar.style.width = `${Math.min((docs / 20000) * 100, 100)}%`; }
        if (aiTimeVal && aiTimeBar) { const t = (1.5 + Math.random() * 1.5).toFixed(1); aiTimeVal.textContent = `${t}s`; aiTimeBar.style.width = `${t * 15}%`; }
        if (aiAccVal && aiAccBar) { const acc = (96.8 + Math.random() * 1.5).toFixed(1); aiAccVal.textContent = `${acc}%`; aiAccBar.style.width = `${acc}%`; }
    }

    telemetryTimer = setInterval(updateTelemetryValues, 2500);


    // 5. PROJECT INQUIRY FORM
    const ticketForm = document.getElementById('incident-ticket-form');
    const transScreen = document.getElementById('portal-transmitting-screen');
    const receiptScreen = document.getElementById('portal-receipt-screen');
    const uplinkConsole = document.getElementById('uplink-console-body');
    const resetFormBtn = document.getElementById('btn-reset-form');

    const nameInput = document.getElementById('input-client-name');
    const orgInput = document.getElementById('input-client-org');
    const emailInput = document.getElementById('input-client-email');
    const phoneInput = document.getElementById('input-client-phone');
    const catSelect = document.getElementById('select-service-cat');
    const descTextarea = document.getElementById('textarea-desc');

    function validateField(inputEl) {
        if (!inputEl) return true;
        let isValid = true;
        if (inputEl.tagName === 'SELECT') isValid = inputEl.value !== '';
        else if (inputEl.type === 'email') isValid = /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(inputEl.value.trim());
        else isValid = inputEl.value.trim() !== '';
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
                if (formGroup && formGroup.classList.contains('has-error')) validateField(input);
            });
        }
    });

    if (ticketForm) {
        ticketForm.addEventListener('submit', (e) => {
            e.preventDefault();
            if (!(validateField(nameInput) && validateField(orgInput) && validateField(emailInput) && validateField(catSelect) && validateField(descTextarea))) {
                const firstError = ticketForm.querySelector('.has-error');
                if (firstError) firstError.scrollIntoView({ behavior: 'smooth', block: 'center' });
                return;
            }
            ticketForm.style.display = 'none';
            transScreen.style.display = 'flex';
            uplinkConsole.innerHTML = '';
            const clientName = nameInput.value.trim();
            const clientOrg = orgInput.value.trim();
            const checkedRadio = ticketForm.querySelector('input[name="severity_level"]:checked');
            const severity = checkedRadio ? checkedRadio.value.toUpperCase() : 'STANDARD';
            const categoryMap = {
                'managed_it': 'Managed IT Services', 'presales': 'Presales & Procurement',
                'cloud': 'Cloud & Infrastructure', 'identity': 'Identity & Access',
                'security': 'Security Operations', 'web': 'Websites & Software',
                'pos': 'POS & Business Systems', 'ai': 'AI-Augmented Services',
                'compliance': 'Compliance & Auditing'
            };
            const categoryText = categoryMap[catSelect.value] || 'General Inquiry';
            const severityLabel = severity === 'HIGH' ? 'Urgent' : severity === 'MEDIUM' ? 'Standard' : 'Flexible';
            const simSteps = [
                { text: 'Initializing secure inquiry processing...', delay: 0 },
                { text: 'Connecting to JL Tech dispatch system...', delay: 500 },
                { text: 'Secure session established. TLS 1.3 verified.', delay: 1000, class: 'success' },
                { text: `Logging inquiry for: [${clientOrg}]`, delay: 1400, class: 'active' },
                { text: `Service category identified: ${categoryText}`, delay: 1900, class: 'accent' },
                { text: `Timeline classification: [${severityLabel}] priority`, delay: 2400, class: severity === 'HIGH' ? 'success' : 'accent' },
                { text: 'AI co-worker assigned for initial requirements analysis...', delay: 2900 },
                { text: 'Generating inquiry tracking identifier...', delay: 3400 },
                { text: 'Inquiry successfully registered in JL Tech project queue!', delay: 3900, class: 'success' },
                { text: 'Confirmation email will be sent within moments.', delay: 4400 }
            ];
            simSteps.forEach(step => {
                setTimeout(() => {
                    const row = document.createElement('div');
                    row.className = 'uplink-row';
                    if (step.class) row.classList.add(step.class);
                    row.textContent = `> ${step.text}`;
                    uplinkConsole.appendChild(row);
                    uplinkConsole.scrollTop = uplinkConsole.scrollHeight;
                }, step.delay);
            });
            setTimeout(() => {
                transScreen.style.display = 'none';
                receiptScreen.style.display = 'flex';
                const ticketId = `INQ-2026-${Math.floor(1000 + Math.random() * 9000)}`;
                document.getElementById('receipt-ticket-id').textContent = ticketId;
                document.getElementById('receipt-client-name').textContent = clientName;
                document.getElementById('receipt-client-org').textContent = clientOrg;
                document.getElementById('receipt-category').textContent = categoryText;
                const sevEl = document.getElementById('receipt-severity');
                sevEl.textContent = severityLabel;
                sevEl.className = 't-val';
                if (severity === 'HIGH') sevEl.style.color = 'var(--color-alert)';
                else if (severity === 'MEDIUM') sevEl.style.color = 'var(--color-warning)';
                else sevEl.style.color = 'var(--color-accent)';
                const d = new Date();
                const pad = (n) => String(n).padStart(2, '0');
                const tsStr = `${d.getFullYear()}-${pad(d.getMonth()+1)}-${pad(d.getDate())} ${pad(d.getHours())}:${pad(d.getMinutes())}:${pad(d.getSeconds())}`;
                document.getElementById('receipt-timestamp').textContent = tsStr;
                addLogEntry('success', 'SYS_INQ', `Project inquiry logged: [${ticketId}] ${categoryText} - ${clientOrg}.`);
            }, 5200);
        });
    }

    if (resetFormBtn) {
        resetFormBtn.addEventListener('click', () => {
            if (ticketForm) {
                ticketForm.reset();
                ticketForm.querySelectorAll('.form-group').forEach(grp => grp.classList.remove('has-error'));
                receiptScreen.style.display = 'none';
                ticketForm.style.display = 'block';
            }
        });
    }

    // 6. FIREFOX :has() FALLBACK
    document.querySelectorAll('.severity-option input[type="radio"]').forEach(radio => {
        radio.addEventListener('change', () => {
            document.querySelectorAll('.severity-option').forEach(opt => opt.classList.remove('is-checked'));
            const parent = radio.closest('.severity-option');
            if (parent) parent.classList.add('is-checked');
        });
        if (radio.checked) {
            const parent = radio.closest('.severity-option');
            if (parent) parent.classList.add('is-checked');
        }
    });

    // 7. CLEANUP
    window.addEventListener('beforeunload', () => {
        if (logTimer) clearInterval(logTimer);
        if (telemetryTimer) clearInterval(telemetryTimer);
    });
});
