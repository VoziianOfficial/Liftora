"use strict";

/* ==========================================================================
   Liftora — Independent Garage Door Matching Platform
   File: assets/js/forms.js
   Contact form validation + AJAX submit
   ========================================================================== */

(function () {
    const CONFIG = window.LIFTORA_CONFIG || {};
    const FORM_SELECTOR = "[data-liftora-form]";

    document.addEventListener("DOMContentLoaded", initForms);

    function initForms() {
        const forms = Array.from(document.querySelectorAll(FORM_SELECTOR));

        forms.forEach((form) => {
            prepareForm(form);
            form.addEventListener("submit", handleSubmit);
        });
    }

    function prepareForm(form) {
        const legalNote = form.querySelector("[data-form-legal-note]");
        const endpoint = getFormEndpoint(form);

        if (legalNote && CONFIG.form && CONFIG.form.legalNote) {
            legalNote.textContent = CONFIG.form.legalNote;
        }

        if (!form.getAttribute("action")) {
            form.setAttribute("action", endpoint);
        }

        if (!form.getAttribute("method")) {
            form.setAttribute("method", "post");
        }

        const serviceSelect = form.querySelector('[name="service"]');

        if (
            serviceSelect &&
            serviceSelect.hasAttribute("data-render-service-options") &&
            window.LiftoraUI &&
            typeof window.LiftoraUI.renderDynamicContent === "function"
        ) {
            window.LiftoraUI.renderDynamicContent();
        }
    }

    async function handleSubmit(event) {
        event.preventDefault();

        const form = event.currentTarget;

        if (form.classList.contains("is-submitting")) {
            return;
        }

        clearStatus(form);

        const validation = validateForm(form);

        if (!validation.valid) {
            showStatus(form, validation.message, "error");
            focusFirstInvalid(form);
            return;
        }

        const submitButton = form.querySelector('[type="submit"]');
        const originalButtonText = submitButton ? submitButton.innerHTML : "";

        setSubmitting(form, submitButton, true);

        try {
            const response = await fetch(getFormEndpoint(form), {
                method: "POST",
                body: new FormData(form),
                headers: {
                    "X-Requested-With": "XMLHttpRequest"
                }
            });

            const result = await parseJsonResponse(response);

            if (!response.ok || !result.success) {
                throw new Error(result.message || getConfig("form.errorMessage", "Something went wrong. Please try again."));
            }

            showStatus(
                form,
                result.message || getConfig("form.successMessage", "Thank you. Your request has been received."),
                "success"
            );

            form.reset();

            if (window.LiftoraUI && typeof window.LiftoraUI.injectConfigValues === "function") {
                window.LiftoraUI.injectConfigValues();
            }
        } catch (error) {
            showStatus(
                form,
                error.message || getConfig("form.errorMessage", "Something went wrong. Please check your details and try again."),
                "error"
            );
        } finally {
            setSubmitting(form, submitButton, false, originalButtonText);
        }
    }

    function validateForm(form) {
        const honeypot = form.querySelector('[name="website"]');

        if (honeypot && honeypot.value.trim() !== "") {
            return {
                valid: false,
                message: "Unable to submit this request."
            };
        }

        const requiredFields = Array.from(form.querySelectorAll("[required]"));

        for (const field of requiredFields) {
            if (!field.value.trim()) {
                markInvalid(field);
                return {
                    valid: false,
                    message: getFieldLabel(field) + " is required."
                };
            }

            clearInvalid(field);
        }

        const emailField = form.querySelector('[type="email"], [name="email"]');

        if (emailField && emailField.value.trim() && !isValidEmail(emailField.value.trim())) {
            markInvalid(emailField);

            return {
                valid: false,
                message: "Please enter a valid email address."
            };
        }

        const phoneField = form.querySelector('[name="phone"]');

        if (phoneField && phoneField.value.trim() && !isValidPhone(phoneField.value.trim())) {
            markInvalid(phoneField);

            return {
                valid: false,
                message: "Please enter a valid phone number."
            };
        }

        const messageField = form.querySelector('[name="message"]');

        if (messageField && messageField.value.trim().length < 10) {
            markInvalid(messageField);

            return {
                valid: false,
                message: "Please add a few more details about your garage door request."
            };
        }

        return {
            valid: true,
            message: ""
        };
    }

    function markInvalid(field) {
        field.setAttribute("aria-invalid", "true");
        field.classList.add("is-invalid");
    }

    function clearInvalid(field) {
        field.removeAttribute("aria-invalid");
        field.classList.remove("is-invalid");
    }

    function focusFirstInvalid(form) {
        const invalid = form.querySelector(".is-invalid, [aria-invalid='true']");

        if (invalid && typeof invalid.focus === "function") {
            invalid.focus();
        }
    }

    function getFieldLabel(field) {
        const id = field.getAttribute("id");

        if (id) {
            const label = document.querySelector(`label[for="${CSS.escape(id)}"]`);
            if (label) return label.textContent.trim().replace(/\*$/, "").trim();
        }

        const wrappedLabel = field.closest("label");
        if (wrappedLabel) return wrappedLabel.textContent.trim().replace(/\*$/, "").trim();

        return field.getAttribute("name") || "This field";
    }

    function isValidEmail(value) {
        return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value);
    }

    function isValidPhone(value) {
        const cleaned = value.replace(/[^\d]/g, "");
        return cleaned.length >= 7 && cleaned.length <= 16;
    }

    function setSubmitting(form, button, submitting, originalButtonText) {
        form.classList.toggle("is-submitting", submitting);

        if (!button) return;

        button.disabled = submitting;
        button.setAttribute("aria-busy", submitting ? "true" : "false");

        if (submitting) {
            button.dataset.originalText = originalButtonText || button.innerHTML;
            button.innerHTML = '<span>Sending Request...</span><i data-lucide="loader-circle"></i>';
        } else {
            button.innerHTML = originalButtonText || button.dataset.originalText || "Submit Request";
            button.removeAttribute("aria-busy");
        }

        if (window.lucide && typeof window.lucide.createIcons === "function") {
            window.lucide.createIcons();
        }
    }

    function showStatus(form, message, type) {
        let status = form.querySelector("[data-form-status]");

        if (!status) {
            status = document.createElement("div");
            status.setAttribute("data-form-status", "");
            status.setAttribute("role", "status");
            status.setAttribute("aria-live", "polite");
            form.prepend(status);
        }

        status.className = "";
        status.classList.add("form-status", "is-visible");

        if (type === "success") {
            status.classList.add("form-status--success");
        } else {
            status.classList.add("form-status--error");
        }

        status.textContent = message;
    }

    function clearStatus(form) {
        const status = form.querySelector("[data-form-status]");

        if (status) {
            status.className = "form-status";
            status.textContent = "";
        }

        Array.from(form.querySelectorAll(".is-invalid, [aria-invalid='true']")).forEach((field) => {
            clearInvalid(field);
        });
    }

    function getFormEndpoint(form) {
        return form.getAttribute("action") || getConfig("form.endpoint", "contact.php");
    }

    function getConfig(path, fallback) {
        if (!path || typeof path !== "string") return fallback;

        return path.split(".").reduce((acc, key) => {
            if (acc && Object.prototype.hasOwnProperty.call(acc, key)) {
                return acc[key];
            }

            return undefined;
        }, CONFIG) ?? fallback;
    }

    async function parseJsonResponse(response) {
        const text = await response.text();

        if (!text) {
            return {
                success: response.ok,
                message: response.ok
                    ? getConfig("form.successMessage", "Thank you. Your request has been received.")
                    : getConfig("form.errorMessage", "Something went wrong. Please try again.")
            };
        }

        try {
            return JSON.parse(text);
        } catch (error) {
            return {
                success: false,
                message: "The server returned an unexpected response. Please try again."
            };
        }
    }
})();