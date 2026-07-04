"use strict";

/* ==========================================================================
   Liftora — Independent Garage Door Matching Platform
   File: assets/js/global.js
   Global UI logic, config injection, navigation, FAQ, tabs, render helpers
   ========================================================================== */

(function () {
    const CONFIG = window.LIFTORA_CONFIG || {};

    const SELECTORS = {
        header: ".site-header",
        mobileToggle: "[data-mobile-toggle]",
        mobileMenu: "[data-mobile-menu]",
        mobileClose: "[data-mobile-close]",
        mobileOverlayClose: "[data-mobile-overlay-close]",
        dropdownToggle: "[data-dropdown-toggle]",
        dropdown: "[data-services-dropdown]",
        faqRoot: "[data-faq]",
        tabRoot: "[data-tabs]",
        quickNeedsRoot: "[data-quick-needs]",
        showcaseRoot: "[data-services-showcase]",
        sliderRoot: "[data-notes-slider]",
        cookieBanner: "[data-cookie-banner]",
        cookieAccept: "[data-cookie-accept]"
    };

    const state = {
        lastFocusedElement: null,
        dropdownCloseTimer: null
    };

    document.addEventListener("DOMContentLoaded", init);

    function init() {
        injectConfigValues();
        renderDynamicContent();
        initHeaderScroll();
        initActiveNav();
        initServicesDropdown();
        initMobileMenu();
        initFaq();
        initTabs();
        initQuickNeeds();
        initServicesShowcase();
        initNotesSlider();
        initCookieBanner();
        initSmoothScroll();
        initExternalSafeLinks();
        refreshIcons();
    }

    /* ==========================================================================
       General helpers
       ========================================================================== */

    function qs(selector, scope = document) {
        return scope.querySelector(selector);
    }

    function qsa(selector, scope = document) {
        return Array.from(scope.querySelectorAll(selector));
    }

    function getConfig(path, fallback = "") {
        if (!path || typeof path !== "string") return fallback;

        return path.split(".").reduce((acc, key) => {
            if (acc && Object.prototype.hasOwnProperty.call(acc, key)) {
                return acc[key];
            }

            return undefined;
        }, CONFIG) ?? fallback;
    }

    function createIcon(name, className = "") {
        const icon = document.createElement("i");
        icon.setAttribute("data-lucide", name || "circle");
        if (className) icon.className = className;
        return icon;
    }

    function toTel(value) {
        return `tel:${String(value || "").replace(/[^\d+]/g, "")}`;
    }

    function toMailto(value) {
        return `mailto:${String(value || "").trim()}`;
    }

    function isPhonePath(path) {
        return /phone/i.test(path || "");
    }

    function isEmailPath(path) {
        return /email/i.test(path || "");
    }

    function setHidden(element, hidden) {
        if (!element) return;
        element.hidden = hidden;
        element.setAttribute("aria-hidden", hidden ? "true" : "false");
    }

    function refreshIcons() {
        if (window.lucide && typeof window.lucide.createIcons === "function") {
            window.lucide.createIcons();
        }
    }

    function safeText(value) {
        return String(value ?? "");
    }

    function getCurrentFileName() {
        const path = window.location.pathname;
        const file = path.substring(path.lastIndexOf("/") + 1);
        return file || "index.html";
    }

    function serviceById(id) {
        return (CONFIG.services || []).find((service) => service.id === id);
    }

    function serviceByUrl(url) {
        return (CONFIG.services || []).find((service) => service.url === url);
    }

    function createArrowIcon() {
        return createIcon("arrow-up-right");
    }

    /* ==========================================================================
       Config injection
       ========================================================================== */

    function injectConfigValues() {
        qsa("[data-config]").forEach((element) => {
            const path = element.getAttribute("data-config");
            const value = getConfig(path, "");

            if (element.tagName === "INPUT" || element.tagName === "TEXTAREA") {
                element.value = safeText(value);
            } else {
                element.textContent = safeText(value);
            }
        });

        qsa("[data-config-href]").forEach((element) => {
            const path = element.getAttribute("data-config-href");
            const value = getConfig(path, "");

            if (!value) return;

            if (isPhonePath(path)) {
                element.setAttribute("href", toTel(value));
            } else if (isEmailPath(path)) {
                element.setAttribute("href", toMailto(value));
            } else {
                element.setAttribute("href", value);
            }
        });

        qsa("[data-config-src]").forEach((element) => {
            const path = element.getAttribute("data-config-src");
            const value = getConfig(path, "");

            if (value) {
                element.setAttribute("src", value);
            }
        });

        qsa("[data-config-alt]").forEach((element) => {
            const path = element.getAttribute("data-config-alt");
            const value = getConfig(path, "");

            if (value) {
                element.setAttribute("alt", value);
            }
        });

        qsa("[data-current-year]").forEach((element) => {
            element.textContent = String(new Date().getFullYear());
        });

        qsa("[data-logo]").forEach((image) => {
            const mode = image.getAttribute("data-logo");
            const path = mode === "light" ? "brand.logoLight" : "brand.logo";
            const src = getConfig(path, "");

            if (src) {
                image.setAttribute("src", src);
            }

            if (!image.getAttribute("alt")) {
                image.setAttribute("alt", `${getConfig("brand.name", "Liftora")} logo`);
            }
        });

        qsa("[data-phone-link]").forEach((element) => {
            const phone = getConfig("contact.phone", "");
            element.setAttribute("href", toTel(phone));
            if (!element.textContent.trim()) {
                element.textContent = phone;
            }
        });

        qsa("[data-email-link]").forEach((element) => {
            const email = getConfig("contact.email", "");
            element.setAttribute("href", toMailto(email));
            if (!element.textContent.trim()) {
                element.textContent = email;
            }
        });
    }

    /* ==========================================================================
       Dynamic render entry
       ========================================================================== */

    function renderDynamicContent() {
        renderNavLinks();
        renderServiceDropdowns();
        renderFooterServices();
        renderFooterNav();
        renderMobileServices();
        renderServiceOptions();
        renderCtaMarquee();
        renderIconStrips();
        renderGarageDoorTypes();
        renderPopularServices();
        renderServicesGrid();
        renderServiceShortcuts();
        renderServiceDetailContent();
    }

    function renderNavLinks() {
        qsa('[data-render="nav-links"]').forEach((container) => {
            container.innerHTML = "";

            (CONFIG.nav || []).forEach((item) => {
                const li = document.createElement("li");
                li.className = "main-nav__item";

                if (item.label === "Services") {
                    li.classList.add("has-dropdown");

                    const wrapper = document.createElement("div");
                    wrapper.className = "main-nav__service-wrap";

                    const link = document.createElement("a");
                    link.className = "main-nav__link";
                    link.href = item.url;
                    link.textContent = item.label;

                    const button = document.createElement("button");
                    button.className = "dropdown-toggle";
                    button.type = "button";
                    button.setAttribute("data-dropdown-toggle", "");
                    button.setAttribute("aria-expanded", "false");
                    button.setAttribute("aria-label", "Open services menu");
                    button.append("Services");
                    button.appendChild(createIcon("chevron-down"));

                    const dropdown = document.createElement("div");
                    dropdown.className = "services-dropdown";
                    dropdown.setAttribute("data-services-dropdown", "");
                    dropdown.setAttribute("aria-label", "Garage door service links");

                    wrapper.appendChild(button);
                    li.appendChild(wrapper);
                    li.appendChild(dropdown);
                } else {
                    const link = document.createElement("a");
                    link.className = "main-nav__link";
                    link.href = item.url;
                    link.textContent = item.label;
                    li.appendChild(link);
                }

                container.appendChild(li);
            });
        });
    }

    function renderServiceDropdowns() {
        qsa('[data-render="service-dropdown"], [data-services-dropdown]').forEach((container) => {
            container.innerHTML = "";

            (CONFIG.services || []).forEach((service) => {
                const link = document.createElement("a");
                link.className = "services-dropdown__link";
                link.href = service.url;

                link.appendChild(createIcon(service.icon));
                link.appendChild(document.createTextNode(service.title));

                container.appendChild(link);
            });
        });
    }

    function renderMobileServices() {
        qsa('[data-render="mobile-services"]').forEach((container) => {
            container.innerHTML = "";

            (CONFIG.services || []).forEach((service) => {
                const link = document.createElement("a");
                link.className = "mobile-menu__service-link";
                link.href = service.url;

                link.appendChild(createIcon(service.icon));
                link.appendChild(document.createTextNode(service.title));

                container.appendChild(link);
            });
        });
    }

    function renderFooterServices() {
        qsa('[data-render="footer-services"]').forEach((container) => {
            container.innerHTML = "";

            (CONFIG.services || []).forEach((service) => {
                const link = document.createElement("a");
                link.href = service.url;
                link.appendChild(createIcon(service.icon));
                link.appendChild(document.createTextNode(service.title));
                container.appendChild(link);
            });
        });
    }

    function renderFooterNav() {
        qsa('[data-render="footer-nav"]').forEach((container) => {
            container.innerHTML = "";

            (CONFIG.nav || []).forEach((item) => {
                const link = document.createElement("a");
                link.href = item.url;
                link.appendChild(createIcon("arrow-up-right"));
                link.appendChild(document.createTextNode(item.label));
                container.appendChild(link);
            });
        });
    }

    function renderServiceOptions() {
        qsa('[data-render="service-options"]').forEach((select) => {
            const selected = select.getAttribute("data-selected") || "";
            const placeholder = select.getAttribute("data-placeholder") || "Select a service need";

            select.innerHTML = "";

            const first = document.createElement("option");
            first.value = "";
            first.textContent = placeholder;
            select.appendChild(first);

            (CONFIG.serviceNeedOptions || []).forEach((optionText) => {
                const option = document.createElement("option");
                option.value = optionText;
                option.textContent = optionText;

                if (selected && selected === optionText) {
                    option.selected = true;
                }

                select.appendChild(option);
            });
        });
    }

    function renderCtaMarquee() {
        qsa('[data-render="cta-marquee"]').forEach((container) => {
            const items = CONFIG.ctaMarquee || [];
            container.innerHTML = "";

            const track = document.createElement("div");
            track.className = "cta-marquee__track";

            for (let groupIndex = 0; groupIndex < 2; groupIndex += 1) {
                const group = document.createElement("div");
                group.className = "cta-marquee__group";
                group.setAttribute("aria-hidden", groupIndex === 1 ? "true" : "false");

                items.forEach((item) => {
                    const span = document.createElement("span");
                    span.textContent = item;
                    group.appendChild(span);
                });

                track.appendChild(group);
            }

            container.appendChild(track);
        });
    }

    function renderIconStrips() {
        qsa('[data-render="icon-strip"]').forEach((container) => {
            const source = container.getAttribute("data-icon-source") || "services";
            const items = source === "types" ? CONFIG.garageDoorTypes || [] : CONFIG.services || [];

            container.innerHTML = "";

            const track = document.createElement("div");
            track.className = "icon-strip__track";

            for (let groupIndex = 0; groupIndex < 2; groupIndex += 1) {
                const group = document.createElement("div");
                group.className = "icon-strip__group";
                group.setAttribute("aria-hidden", groupIndex === 1 ? "true" : "false");

                items.forEach((item) => {
                    const span = document.createElement("span");
                    span.className = "icon-strip__item";
                    span.appendChild(createIcon(item.icon || "circle"));
                    span.appendChild(document.createTextNode(item.shortTitle || item.title));
                    group.appendChild(span);
                });

                track.appendChild(group);
            }

            container.appendChild(track);
        });
    }

    function renderGarageDoorTypes() {
        qsa('[data-render="garage-door-types"]').forEach((container) => {
            container.innerHTML = "";

            (CONFIG.garageDoorTypes || []).forEach((type) => {
                const item = document.createElement("div");
                item.className = "type-item";
                item.appendChild(createIcon(type.icon));

                const strong = document.createElement("strong");
                strong.textContent = type.title;
                item.appendChild(strong);

                container.appendChild(item);
            });
        });
    }

    function renderPopularServices() {
        qsa('[data-render="popular-services"]').forEach((container) => {
            container.innerHTML = "";

            (CONFIG.services || []).slice(0, 4).forEach((service) => {
                const card = document.createElement("a");
                card.className = "service-photo-card";
                card.href = service.url;
                card.style.setProperty("--service-image", `url("${service.image}")`);

                const iconWrap = document.createElement("span");
                iconWrap.className = "service-photo-card__icon";
                iconWrap.appendChild(createIcon(service.icon));

                const content = document.createElement("span");
                content.className = "service-photo-card__content";

                const title = document.createElement("h3");
                title.textContent = service.title;

                const text = document.createElement("p");
                text.textContent = service.description;

                const link = document.createElement("span");
                link.className = "service-photo-card__link";
                link.append("View Service");
                link.appendChild(createArrowIcon());

                content.append(title, text, link);
                card.append(iconWrap, content);

                container.appendChild(card);
            });
        });
    }

    function renderServicesGrid() {
        qsa('[data-render="services-grid"]').forEach((container) => {
            container.innerHTML = "";

            (CONFIG.services || []).forEach((service) => {
                const card = document.createElement("article");
                card.className = "clean-card";

                const iconWrap = document.createElement("div");
                iconWrap.className = "clean-card__icon";
                iconWrap.appendChild(createIcon(service.icon));

                const title = document.createElement("h3");
                title.textContent = service.title;

                const text = document.createElement("p");
                text.textContent = service.description;

                const link = document.createElement("a");
                link.className = "clean-card__link";
                link.href = service.url;
                link.append("View Service");
                link.appendChild(createArrowIcon());

                card.append(iconWrap, title, text, link);
                container.appendChild(card);
            });
        });
    }

    function renderServiceShortcuts() {
        qsa('[data-render="service-shortcuts"]').forEach((container) => {
            container.innerHTML = "";

            (CONFIG.services || []).forEach((service) => {
                const link = document.createElement("a");
                link.className = "shortcut-card";
                link.href = service.url;

                link.appendChild(createIcon(service.icon));

                const strong = document.createElement("strong");
                strong.textContent = service.shortTitle || service.title;
                link.appendChild(strong);

                container.appendChild(link);
            });
        });
    }

    function renderServiceDetailContent() {
        const serviceRoot = qs("[data-service-page]");
        if (!serviceRoot) return;

        const serviceId = serviceRoot.getAttribute("data-service-page");
        const service = serviceById(serviceId);
        if (!service) return;

        qsa("[data-service-title]").forEach((element) => {
            element.textContent = service.title;
        });

        qsa("[data-service-hero-title]").forEach((element) => {
            element.textContent = service.heroTitle;
        });

        qsa("[data-service-hero-text]").forEach((element) => {
            element.textContent = service.heroText;
        });

        qsa("[data-service-overview-title]").forEach((element) => {
            element.textContent = service.overviewTitle;
        });

        qsa("[data-service-overview-text]").forEach((element) => {
            element.textContent = service.overviewText;
        });

        qsa("[data-service-image]").forEach((image) => {
            image.setAttribute("src", service.image);
            image.setAttribute("alt", `${service.title} request visual`);
        });

        renderSimpleList("[data-render-service-focus]", service.focusPoints, "feature-point", "check-circle");
        renderServiceCards("[data-render-service-situations]", service.commonSituations);
        renderLineItems("[data-render-provider-evaluate]", service.providerMayEvaluate);
        renderLineItems("[data-render-request-prep]", service.requestPreparation);
        renderQuestionsList("[data-render-provider-questions]");
        renderRelatedServices("[data-render-related-services]", service.related || []);
    }

    function renderSimpleList(selector, items, className, iconName) {
        qsa(selector).forEach((container) => {
            container.innerHTML = "";

            (items || []).forEach((item) => {
                const row = document.createElement("div");
                row.className = className;

                row.appendChild(createIcon(iconName));

                const span = document.createElement("span");
                span.textContent = item;
                row.appendChild(span);

                container.appendChild(row);
            });
        });
    }

    function renderServiceCards(selector, items) {
        const iconCycle = ["door-open", "activity", "panel-top", "wrench", "radio-tower", "shield-alert"];

        qsa(selector).forEach((container) => {
            container.innerHTML = "";

            (items || []).forEach((item, index) => {
                const card = document.createElement("article");
                card.className = "clean-card";

                const iconWrap = document.createElement("div");
                iconWrap.className = "clean-card__icon";
                iconWrap.appendChild(createIcon(iconCycle[index % iconCycle.length]));

                const title = document.createElement("h3");
                title.textContent = item;

                const text = document.createElement("p");
                text.textContent =
                    "Include this detail in your request so providers can better understand the situation before supplying next-step information.";

                card.append(iconWrap, title, text);
                container.appendChild(card);
            });
        });
    }

    function renderLineItems(selector, items) {
        qsa(selector).forEach((container) => {
            container.innerHTML = "";

            (items || []).forEach((item) => {
                const row = document.createElement("li");
                row.className = "line-list__item";

                row.appendChild(createIcon("check-circle"));

                const textWrap = document.createElement("span");
                const strong = document.createElement("strong");
                strong.textContent = item;
                textWrap.appendChild(strong);

                row.appendChild(textWrap);
                container.appendChild(row);
            });
        });
    }

    function renderQuestionsList(selector) {
        const questions = [
            "What is included in the quote?",
            "What parts or products are involved?",
            "Is repair or replacement being discussed?",
            "What warranty terms apply?",
            "What timing is available?",
            "Are licensing, insurance, or permits relevant?"
        ];

        renderLineItems(selector, questions);
    }

    function renderRelatedServices(selector, relatedIds) {
        qsa(selector).forEach((container) => {
            container.innerHTML = "";

            relatedIds.slice(0, 3).forEach((id) => {
                const service = serviceById(id);
                if (!service) return;

                const card = document.createElement("a");
                card.className = "related-card";
                card.href = service.url;
                card.style.setProperty("--related-image", `url("${service.image}")`);

                const content = document.createElement("span");
                content.className = "related-card__content";

                const title = document.createElement("h3");
                title.textContent = service.title;

                const action = document.createElement("span");
                action.append("View Service");
                action.appendChild(createArrowIcon());

                content.append(title, action);
                card.appendChild(content);
                container.appendChild(card);
            });
        });
    }

    /* ==========================================================================
       Header scroll + active nav
       ========================================================================== */

    function initHeaderScroll() {
        const header = qs(SELECTORS.header);
        if (!header) return;

        const update = () => {
            header.classList.toggle("is-scrolled", window.scrollY > 12);
        };

        update();
        window.addEventListener("scroll", update, { passive: true });
    }

    function initActiveNav() {
        const current = getCurrentFileName();

        qsa('a[href]').forEach((link) => {
            const href = link.getAttribute("href");
            if (!href || href.startsWith("#") || href.startsWith("mailto:") || href.startsWith("tel:")) return;

            if (href === current) {
                link.classList.add("is-active");
                link.setAttribute("aria-current", "page");
            }

            if (current !== "services.html" && serviceByUrl(current) && href === "services.html") {
                link.classList.add("is-active");
            }
        });
    }

    /* ==========================================================================
       Services dropdown
       ========================================================================== */

    function initServicesDropdown() {
        const toggles = qsa(SELECTORS.dropdownToggle);

        toggles.forEach((toggle) => {
            const parent = toggle.closest(".has-dropdown") || toggle.parentElement;
            const dropdown = parent ? qs(SELECTORS.dropdown, parent) : null;

            if (!dropdown) return;

            toggle.addEventListener("click", (event) => {
                event.preventDefault();
                const isOpen = toggle.getAttribute("aria-expanded") === "true";
                setDropdown(toggle, dropdown, !isOpen);
            });

            toggle.addEventListener("keydown", (event) => {
                if (event.key === "ArrowDown") {
                    event.preventDefault();
                    setDropdown(toggle, dropdown, true);
                    const firstLink = qs("a", dropdown);
                    if (firstLink) firstLink.focus();
                }

                if (event.key === "Escape") {
                    setDropdown(toggle, dropdown, false);
                    toggle.focus();
                }
            });

            dropdown.addEventListener("keydown", (event) => {
                if (event.key === "Escape") {
                    setDropdown(toggle, dropdown, false);
                    toggle.focus();
                }
            });

            parent.addEventListener("mouseenter", () => {
                window.clearTimeout(state.dropdownCloseTimer);
                setDropdown(toggle, dropdown, true);
            });

            parent.addEventListener("mouseleave", () => {
                state.dropdownCloseTimer = window.setTimeout(() => {
                    setDropdown(toggle, dropdown, false);
                }, 140);
            });
        });

        document.addEventListener("click", (event) => {
            if (event.target.closest(".has-dropdown")) return;
            closeAllDropdowns();
        });
    }

    function setDropdown(toggle, dropdown, open) {
        toggle.setAttribute("aria-expanded", open ? "true" : "false");
        dropdown.classList.toggle("is-open", open);
    }

    function closeAllDropdowns() {
        qsa(SELECTORS.dropdownToggle).forEach((toggle) => {
            const parent = toggle.closest(".has-dropdown") || toggle.parentElement;
            const dropdown = parent ? qs(SELECTORS.dropdown, parent) : null;
            if (dropdown) setDropdown(toggle, dropdown, false);
        });
    }

    /* ==========================================================================
       Mobile menu
       ========================================================================== */

    function initMobileMenu() {
        const toggle = qs(SELECTORS.mobileToggle);
        const menu = qs(SELECTORS.mobileMenu);

        if (!toggle || !menu) return;

        const closeButtons = qsa(`${SELECTORS.mobileClose}, ${SELECTORS.mobileOverlayClose}`, menu);

        toggle.addEventListener("click", () => {
            const isOpen = menu.classList.contains("is-open");
            isOpen ? closeMobileMenu(toggle, menu) : openMobileMenu(toggle, menu);
        });

        closeButtons.forEach((button) => {
            button.addEventListener("click", () => closeMobileMenu(toggle, menu));
        });

        qsa("a", menu).forEach((link) => {
            link.addEventListener("click", () => closeMobileMenu(toggle, menu));
        });

        menu.addEventListener("click", (event) => {
            if (event.target === menu) {
                closeMobileMenu(toggle, menu);
            }
        });

        document.addEventListener("keydown", (event) => {
            if (event.key === "Escape" && menu.classList.contains("is-open")) {
                closeMobileMenu(toggle, menu);
            }
        });
    }

    function openMobileMenu(toggle, menu) {
        state.lastFocusedElement = document.activeElement;

        toggle.classList.add("is-active");
        toggle.setAttribute("aria-expanded", "true");

        menu.classList.add("is-open");
        setHidden(menu, false);

        document.body.classList.add("menu-open");

        const closeButton = qs(SELECTORS.mobileClose, menu);
        if (closeButton) {
            window.setTimeout(() => closeButton.focus(), 40);
        }
    }

    function closeMobileMenu(toggle, menu) {
        toggle.classList.remove("is-active");
        toggle.setAttribute("aria-expanded", "false");

        menu.classList.remove("is-open");
        document.body.classList.remove("menu-open");

        window.setTimeout(() => {
            if (!menu.classList.contains("is-open")) {
                setHidden(menu, true);
            }
        }, 240);

        if (state.lastFocusedElement && typeof state.lastFocusedElement.focus === "function") {
            state.lastFocusedElement.focus();
        }
    }

    /* ==========================================================================
       FAQ accordion
       ========================================================================== */

    function initFaq() {
        qsa(SELECTORS.faqRoot).forEach((root) => {
            const type = root.getAttribute("data-faq") || "home";
            const items = CONFIG.faq && CONFIG.faq[type] ? CONFIG.faq[type] : [];

            if (root.hasAttribute("data-render-faq")) {
                renderFaq(root, items);
            }

            const questions = qsa(".faq-question", root);

            questions.forEach((button, index) => {
                const answer = qs(".faq-answer", button.closest(".faq-item"));
                if (!answer) return;

                const shouldOpen = button.getAttribute("aria-expanded") === "true" || index === 0;

                setFaqItem(button, answer, shouldOpen);

                button.addEventListener("click", () => {
                    const isOpen = button.getAttribute("aria-expanded") === "true";

                    if (root.getAttribute("data-faq-mode") !== "multi") {
                        questions.forEach((otherButton) => {
                            if (otherButton === button) return;
                            const otherAnswer = qs(".faq-answer", otherButton.closest(".faq-item"));
                            if (otherAnswer) setFaqItem(otherButton, otherAnswer, false);
                        });
                    }

                    setFaqItem(button, answer, !isOpen);
                });
            });
        });
    }

    function renderFaq(root, items) {
        root.innerHTML = "";

        const list = document.createElement("div");
        list.className = "faq-list";

        items.forEach((item, index) => {
            const faqItem = document.createElement("div");
            faqItem.className = "faq-item";

            const questionId = `faq-question-${Math.random().toString(16).slice(2)}`;
            const answerId = `faq-answer-${Math.random().toString(16).slice(2)}`;

            const button = document.createElement("button");
            button.className = "faq-question";
            button.type = "button";
            button.id = questionId;
            button.setAttribute("aria-expanded", index === 0 ? "true" : "false");
            button.setAttribute("aria-controls", answerId);

            const questionText = document.createElement("span");
            questionText.textContent = item.question;

            const icon = document.createElement("span");
            icon.className = "faq-icon";
            icon.setAttribute("aria-hidden", "true");

            button.append(questionText, icon);

            const answer = document.createElement("div");
            answer.className = "faq-answer";
            answer.id = answerId;
            answer.setAttribute("role", "region");
            answer.setAttribute("aria-labelledby", questionId);

            const inner = document.createElement("div");
            inner.className = "faq-answer__inner";

            const paragraph = document.createElement("p");
            paragraph.textContent = item.answer;

            inner.appendChild(paragraph);
            answer.appendChild(inner);

            faqItem.append(button, answer);
            list.appendChild(faqItem);
        });

        root.appendChild(list);
    }

    function setFaqItem(button, answer, open) {
        button.setAttribute("aria-expanded", open ? "true" : "false");
        answer.classList.toggle("is-open", open);
    }

    /* ==========================================================================
       Tabs
       ========================================================================== */

    function initTabs() {
        qsa(SELECTORS.tabRoot).forEach((root) => {
            const buttons = qsa("[data-tab-target]", root);
            const panels = qsa("[data-tab-panel]", root);

            if (!buttons.length || !panels.length) return;

            buttons.forEach((button) => {
                button.addEventListener("click", () => {
                    const target = button.getAttribute("data-tab-target");

                    buttons.forEach((item) => {
                        const active = item === button;
                        item.classList.toggle("is-active", active);
                        item.setAttribute("aria-selected", active ? "true" : "false");
                    });

                    panels.forEach((panel) => {
                        const active = panel.getAttribute("data-tab-panel") === target;
                        panel.classList.toggle("is-active", active);
                        panel.hidden = !active;
                    });

                    refreshIcons();
                });
            });

            const activeButton = buttons.find((button) => button.classList.contains("is-active")) || buttons[0];
            if (activeButton) activeButton.click();
        });
    }

    /* ==========================================================================
       Quick needs section
       ========================================================================== */

    function initQuickNeeds() {
        qsa(SELECTORS.quickNeedsRoot).forEach((root) => {
            const needs = CONFIG.quickNeeds || [];
            if (!needs.length) return;

            const list = qs("[data-quick-needs-list]", root);
            const panel = qs("[data-quick-needs-panel]", root);

            if (!list || !panel) return;

            if (list.hasAttribute("data-render-quick-list")) {
                list.innerHTML = "";

                needs.forEach((need, index) => {
                    const button = document.createElement("button");
                    button.className = "quick-nav__button";
                    button.type = "button";
                    button.setAttribute("data-quick-index", String(index));
                    button.setAttribute("aria-pressed", index === 0 ? "true" : "false");

                    const text = document.createElement("span");
                    text.textContent = need.title;

                    button.append(text, createIcon("chevron-right"));
                    list.appendChild(button);
                });
            }

            const buttons = qsa("[data-quick-index]", list);

            function updatePanel(index) {
                const need = needs[index] || needs[0];

                buttons.forEach((button, buttonIndex) => {
                    const active = buttonIndex === index;
                    button.classList.toggle("is-active", active);
                    button.setAttribute("aria-pressed", active ? "true" : "false");
                });

                panel.innerHTML = "";

                const iconWrap = document.createElement("div");
                iconWrap.className = "quick-nav__panel-icon";
                iconWrap.appendChild(createIcon(need.icon));

                const title = document.createElement("h3");
                title.textContent = need.title;

                const text = document.createElement("p");
                text.textContent = need.text;

                let support = null;
                if (need.supportText) {
                    support = document.createElement("p");
                    support.className = "quick-nav__support";
                    support.textContent = need.supportText;
                }

                let detailList = null;
                if (Array.isArray(need.detailPoints) && need.detailPoints.length) {
                    detailList = document.createElement("ul");
                    detailList.className = "quick-nav__detail-list";

                    need.detailPoints.forEach((point) => {
                        const item = document.createElement("li");
                        item.className = "quick-nav__detail-item";
                        item.appendChild(createIcon("check-circle"));
                        item.appendChild(document.createTextNode(point));
                        detailList.appendChild(item);
                    });
                }

                const actions = document.createElement("div");
                actions.className = "btn-row";

                const link = document.createElement("a");
                link.className = "btn btn-primary";
                link.href = need.url;
                link.append(need.cta);
                link.appendChild(createArrowIcon());

                actions.appendChild(link);

                const meta = document.createElement("div");
                meta.className = "quick-nav__meta";

                ["Provider-supplied details", "Review terms directly", "Availability may vary"].forEach((label) => {
                    const span = document.createElement("span");
                    span.appendChild(createIcon("check-circle"));
                    span.appendChild(document.createTextNode(label));
                    meta.appendChild(span);
                });

                panel.append(iconWrap, title, text);

                if (support) {
                    panel.appendChild(support);
                }

                if (detailList) {
                    panel.appendChild(detailList);
                }

                panel.append(actions, meta);
                refreshIcons();
            }

            buttons.forEach((button) => {
                button.addEventListener("click", () => {
                    const index = Number(button.getAttribute("data-quick-index") || "0");
                    updatePanel(index);
                });
            });

            updatePanel(0);
        });
    }

    /* ==========================================================================
       Services showcase
       ========================================================================== */

    function initServicesShowcase() {
        qsa(SELECTORS.showcaseRoot).forEach((root) => {
            const imagePanel = qs("[data-showcase-image]", root);
            const list = qs("[data-showcase-list]", root);

            if (!imagePanel || !list) return;

            list.innerHTML = "";

            (CONFIG.services || []).forEach((service, index) => {
                const button = document.createElement("button");
                button.className = "showcase-item";
                button.type = "button";
                button.setAttribute("data-showcase-index", String(index));
                button.setAttribute("aria-pressed", index === 0 ? "true" : "false");

                const icon = createIcon(service.icon);

                const text = document.createElement("span");
                const strong = document.createElement("strong");
                strong.textContent = service.title;
                const small = document.createElement("span");
                small.textContent = service.shortTitle || "Garage door request";
                text.append(strong, small);

                button.append(icon, text, createIcon("arrow-up-right"));
                list.appendChild(button);
            });

            const buttons = qsa("[data-showcase-index]", list);

            function updateShowcase(index) {
                const service = (CONFIG.services || [])[index] || (CONFIG.services || [])[0];
                if (!service) return;

                buttons.forEach((button, buttonIndex) => {
                    const active = buttonIndex === index;
                    button.classList.toggle("is-active", active);
                    button.setAttribute("aria-pressed", active ? "true" : "false");
                });

                imagePanel.style.setProperty("--showcase-image", `url("${service.image}")`);
                imagePanel.setAttribute("href", service.url);

                const iconWrap = qs("[data-showcase-icon]", imagePanel);
                const title = qs("[data-showcase-title]", imagePanel);
                const text = qs("[data-showcase-text]", imagePanel);
                const link = qs("[data-showcase-link]", imagePanel);

                if (iconWrap) {
                    iconWrap.innerHTML = "";
                    iconWrap.appendChild(createIcon(service.icon));
                }

                if (title) title.textContent = service.title;
                if (text) text.textContent = service.description;
                if (link) link.setAttribute("href", service.url);

                refreshIcons();
            }

            buttons.forEach((button) => {
                button.addEventListener("click", () => {
                    const index = Number(button.getAttribute("data-showcase-index") || "0");
                    updateShowcase(index);
                });
            });

            updateShowcase(0);
        });
    }

    /* ==========================================================================
       Notes slider
       ========================================================================== */

    function initNotesSlider() {
        qsa(SELECTORS.sliderRoot).forEach((root) => {
            const track = qs("[data-slider-track]", root);
            const prev = qs("[data-slider-prev]", root);
            const next = qs("[data-slider-next]", root);

            if (!track || !prev || !next) return;

            const cards = qsa(".note-card", track);
            if (!cards.length) return;

            let index = 0;

            function visibleCount() {
                return window.matchMedia("(max-width: 768px)").matches ? 1 : 2;
            }

            function maxIndex() {
                return Math.max(cards.length - visibleCount(), 0);
            }

            function update() {
                const card = cards[0];
                const gap = parseFloat(getComputedStyle(track).gap || "0");
                const width = card.getBoundingClientRect().width + gap;
                const safeIndex = Math.min(index, maxIndex());

                index = safeIndex;
                track.style.transform = `translateX(${-width * safeIndex}px)`;

                prev.disabled = safeIndex <= 0;
                next.disabled = safeIndex >= maxIndex();
            }

            prev.addEventListener("click", () => {
                index = Math.max(index - 1, 0);
                update();
            });

            next.addEventListener("click", () => {
                index = Math.min(index + 1, maxIndex());
                update();
            });

            window.addEventListener("resize", update);
            update();
        });
    }

    /* ==========================================================================
       Cookie banner
       ========================================================================== */

    function initCookieBanner() {
        const banner = qs(SELECTORS.cookieBanner);
        const accept = qs(SELECTORS.cookieAccept);

        if (!banner || !accept) return;

        const storageKey = "liftora_cookie_notice_accepted";

        if (localStorage.getItem(storageKey) === "true") {
            return;
        }

        banner.classList.add("is-visible");
        setHidden(banner, false);

        accept.addEventListener("click", () => {
            localStorage.setItem(storageKey, "true");
            banner.classList.remove("is-visible");
            window.setTimeout(() => setHidden(banner, true), 220);
        });
    }

    /* ==========================================================================
       Smooth scroll / external links
       ========================================================================== */

    function initSmoothScroll() {
        qsa('a[href^="#"]').forEach((link) => {
            link.addEventListener("click", (event) => {
                const targetId = link.getAttribute("href");

                if (!targetId || targetId === "#") return;

                const target = qs(targetId);
                if (!target) return;

                event.preventDefault();

                target.scrollIntoView({
                    behavior: window.matchMedia("(prefers-reduced-motion: reduce)").matches ? "auto" : "smooth",
                    block: "start"
                });
            });
        });
    }

    function initExternalSafeLinks() {
        qsa('a[target="_blank"]').forEach((link) => {
            const rel = link.getAttribute("rel") || "";
            if (!rel.includes("noopener")) {
                link.setAttribute("rel", `${rel} noopener noreferrer`.trim());
            }
        });
    }

    /* ==========================================================================
       Public safe refresh hook for other files
       ========================================================================== */

    window.LiftoraUI = {
        refreshIcons,
        injectConfigValues,
        renderDynamicContent,
        initFaq,
        getConfig
    };
})();


(function () {
    document.addEventListener("DOMContentLoaded", initDoorTypesShowcase);

    function initDoorTypesShowcase() {
        const config = window.LIFTORA_CONFIG || {};
        const showcase = config.doorTypesShowcase || {};
        const items = Array.isArray(showcase.items) ? showcase.items : [];

        const cardsMount = document.querySelector('[data-render="door-type-showcase-cards"]');
        const notesMount = document.querySelector('[data-render="door-type-showcase-notes"]');
        const image = document.querySelector("[data-door-types-photo]");
        const imageLabel = document.querySelector("[data-door-types-photo-label]");
        const photoWrap = image ? image.closest(".door-types-showcase__photo") : null;

        if (!cardsMount || !notesMount || !image || !imageLabel || !items.length) return;

        cardsMount.innerHTML = items.map((item, index) => {
            const variant = item.variant || "soft";
            const icon = item.icon || "door-open";

            return `
                <button class="door-type-tile door-type-tile--${escapeAttr(variant)}" type="button" data-door-type-index="${index}" aria-pressed="${index === 0 ? "true" : "false"}">
                    <div>
                        <span>${escapeHTML(item.number || String(index + 1).padStart(2, "0"))}</span>
                        <h3>${escapeHTML(item.title || "")}</h3>
                    </div>
                    <i data-lucide="${escapeAttr(icon)}" aria-hidden="true"></i>
                </button>
            `;
        }).join("");

        const buttons = Array.from(cardsMount.querySelectorAll("[data-door-type-index]"));

        buttons.forEach((button) => {
            const index = Number(button.getAttribute("data-door-type-index"));

            button.addEventListener("mouseenter", () => {
                setActiveDoorType(index, false);
            });

            button.addEventListener("click", () => {
                setActiveDoorType(index, true);
            });

            button.addEventListener("focus", () => {
                setActiveDoorType(index, false);
            });
        });

        setActiveDoorType(0, true);
        refreshLucideIcons();

        function setActiveDoorType(index, lockFocus) {
            const item = items[index];
            if (!item) return;

            buttons.forEach((button, buttonIndex) => {
                const isActive = buttonIndex === index;
                button.classList.toggle("is-active", isActive);
                button.setAttribute("aria-pressed", isActive ? "true" : "false");
            });

            if (photoWrap) {
                photoWrap.classList.add("is-changing");
            }

            window.setTimeout(() => {
                if (item.image) {
                    image.src = item.image;
                }

                if (item.alt) {
                    image.alt = item.alt;
                }

                imageLabel.textContent = item.imageLabel || "Door type helps providers understand the request context";

                renderNotes(item.notes || []);

                if (photoWrap) {
                    photoWrap.classList.remove("is-changing");
                }

                refreshLucideIcons();
            }, 120);

            if (lockFocus && buttons[index]) {
                buttons[index].focus({ preventScroll: true });
            }
        }

        function renderNotes(notes) {
            notesMount.innerHTML = notes.map((note) => {
                const icon = note.icon || "arrow-up-right";
                const accent = note.accent || "eggplant";
                const url = note.url || "services.html";

                return `
                    <a class="door-types-note door-types-note--${escapeAttr(accent)}" href="${escapeAttr(url)}">
                        <span class="door-types-note__line"></span>
                        <div>
                            <p>${escapeHTML(note.label || "")}</p>
                            <h3>${escapeHTML(note.title || "")}</h3>
                        </div>
                        <i data-lucide="${escapeAttr(icon)}" aria-hidden="true"></i>
                    </a>
                `;
            }).join("");
        }
    }

    function refreshLucideIcons() {
        if (window.lucide && typeof window.lucide.createIcons === "function") {
            window.lucide.createIcons();
        }
    }

    function escapeHTML(value) {
        return String(value ?? "")
            .replaceAll("&", "&amp;")
            .replaceAll("<", "&lt;")
            .replaceAll(">", "&gt;")
            .replaceAll('"', "&quot;")
            .replaceAll("'", "&#039;");
    }

    function escapeAttr(value) {
        return escapeHTML(value).replaceAll("`", "&#096;");
    }
})();