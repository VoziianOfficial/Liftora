"use strict";

/* ==========================================================================
   Liftora — Independent Garage Door Matching Platform
   File: assets/js/animations.js
   Safe reveal animations without layout shift
   ========================================================================== */

(function () {
    const prefersReducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)");
    let observer = null;

    document.addEventListener("DOMContentLoaded", initAnimations);

    function initAnimations() {
        markStaggerItems();

        if (prefersReducedMotion.matches) {
            revealEverything();
            return;
        }

        createObserver();
        observeRevealElements();

        window.LiftoraAnimations = {
            refresh: refreshAnimations,
            revealEverything
        };
    }

    function createObserver() {
        observer = new IntersectionObserver(
            (entries) => {
                entries.forEach((entry) => {
                    if (!entry.isIntersecting) return;

                    const element = entry.target;
                    element.classList.add("is-visible");

                    if (observer) {
                        observer.unobserve(element);
                    }
                });
            },
            {
                root: null,
                threshold: 0.12,
                rootMargin: "0px 0px -70px 0px"
            }
        );
    }

    function observeRevealElements() {
        const elements = Array.from(document.querySelectorAll("[data-animate], .reveal"));

        elements.forEach((element) => {
            if (shouldSkipAnimation(element)) {
                element.classList.add("is-visible");
                return;
            }

            observer.observe(element);
        });
    }

    function shouldSkipAnimation(element) {
        return Boolean(
            element.closest(".site-header") ||
            element.closest(".site-footer") ||
            element.closest(".mobile-menu") ||
            element.closest(".services-dropdown") ||
            element.closest(".cookie-banner") ||
            element.closest(".cta-marquee__track") ||
            element.closest(".icon-strip__track")
        );
    }

    function markStaggerItems() {
        const groups = Array.from(document.querySelectorAll(".stagger"));

        groups.forEach((group) => {
            const children = Array.from(group.children);

            children.forEach((child, index) => {
                child.style.setProperty("--stagger-index", String(index));
            });
        });
    }

    function refreshAnimations() {
        markStaggerItems();

        if (prefersReducedMotion.matches) {
            revealEverything();
            return;
        }

        if (!observer) {
            createObserver();
        }

        observeRevealElements();
    }

    function revealEverything() {
        const elements = Array.from(document.querySelectorAll("[data-animate], .reveal"));

        elements.forEach((element) => {
            element.classList.add("is-visible");
            element.style.transform = "none";
            element.style.opacity = "1";
        });
    }

    prefersReducedMotion.addEventListener("change", () => {
        if (prefersReducedMotion.matches) {
            if (observer) {
                observer.disconnect();
            }

            revealEverything();
            return;
        }

        refreshAnimations();
    });
})();

(function () {
    const parallaxLayers = document.querySelectorAll("[data-parallax-bg]");

    if (!parallaxLayers.length) return;

    const reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    const isTouch = window.matchMedia("(max-width: 768px)").matches;

    if (reduceMotion || isTouch) {
        parallaxLayers.forEach((layer) => {
            layer.style.transform = "translate3d(0, 0, 0)";
        });
        return;
    }

    let ticking = false;

    function updateParallax() {
        parallaxLayers.forEach((layer) => {
            const section = layer.closest(".request-runway");
            if (!section) return;

            const rect = section.getBoundingClientRect();
            const windowHeight = window.innerHeight;

            if (rect.bottom < 0 || rect.top > windowHeight) return;

            const progress = (windowHeight - rect.top) / (windowHeight + rect.height);
            const movement = (progress - 0.5) * 90;

            layer.style.transform = `translate3d(0, ${movement}px, 0)`;
        });

        ticking = false;
    }

    function requestTick() {
        if (!ticking) {
            window.requestAnimationFrame(updateParallax);
            ticking = true;
        }
    }

    window.addEventListener("scroll", requestTick, { passive: true });
    window.addEventListener("resize", requestTick);

    updateParallax();
})();