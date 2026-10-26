/* ==========================================================================
   CADMIUM SOLUTIONS — 2026 APPLE-INSPIRED INTERACTION ENGINE
   Zero HTML changes. Includes:
   - Spotlight Cursor Glow Shader
   - Smooth Scroll & Header Physics
   - VisionOS Spring States
   - Accessible Drawer Navigation
   - Clipboard Fallback
   - Web3Forms Integration
   ========================================================================== */

document.addEventListener("DOMContentLoaded", () => {
  "use strict";

  const prefersReducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
  const scrollBehavior = prefersReducedMotion ? "auto" : "smooth";

  /* =====================================================
     DOM REFERENCES
  ===================================================== */
  const header = document.querySelector(".site-header");
  const menuToggle = document.querySelector(".menu-toggle");
  const primaryNav = document.querySelector(".primary-nav");
  const revealElements = document.querySelectorAll(".reveal");
  const inquiryForm = document.getElementById("inquiry-form");
  const formNote = document.getElementById("form-note");
  const submitBtn = document.getElementById("submit-btn");
  const copyToast = document.getElementById("copy-toast");
  const email = "cadmiumsolutions@gmail.com";

  /* =====================================================
     APPLE-GRADE CURSOR SPOTLIGHT TRACKING
     Calculates smooth relative mouse coordinates for liquid glass surfaces
  ===================================================== */
  if (!prefersReducedMotion && window.matchMedia("(hover: hover)").matches) {
    const spotlightCards = document.querySelectorAll(
      ".creative-media, .service-row, .founder-card, .principle, .about-emblem"
    );

    spotlightCards.forEach((card) => {
      card.addEventListener("mousemove", (event) => {
        const rect = card.getBoundingClientRect();
        const x = event.clientX - rect.left;
        const y = event.clientY - rect.top;

        card.style.setProperty("--mouse-x", `${x}px`);
        card.style.setProperty("--mouse-y", `${y}px`);
      });
    });
  }

  /* =====================================================
     MOBILE NAVIGATION DRAWER
  ===================================================== */
  function closeMobileMenu() {
    if (!menuToggle || !primaryNav) return;

    menuToggle.classList.remove("is-active");
    primaryNav.classList.remove("is-open");
    menuToggle.setAttribute("aria-expanded", "false");
    menuToggle.setAttribute("aria-label", "Open navigation menu");
    document.body.classList.remove("menu-open");
  }

  function openMobileMenu() {
    if (!menuToggle || !primaryNav) return;

    menuToggle.classList.add("is-active");
    primaryNav.classList.add("is-open");
    menuToggle.setAttribute("aria-expanded", "true");
    menuToggle.setAttribute("aria-label", "Close navigation menu");
    document.body.classList.add("menu-open");
  }

  if (menuToggle && primaryNav) {
    menuToggle.setAttribute("aria-controls", primaryNav.id || "primary-nav");
    menuToggle.setAttribute("aria-expanded", primaryNav.classList.contains("is-open") ? "true" : "false");

    menuToggle.addEventListener("click", () => {
      const isOpen = menuToggle.getAttribute("aria-expanded") === "true";
      isOpen ? closeMobileMenu() : openMobileMenu();
    });

    primaryNav.querySelectorAll("a").forEach((link) => {
      link.addEventListener("click", closeMobileMenu);
    });

    document.addEventListener("keydown", (event) => {
      if (event.key === "Escape") {
        closeMobileMenu();
        if (menuToggle) menuToggle.focus();
      }
    });

    document.addEventListener("click", (event) => {
      const target = event.target;
      if (!(target instanceof Node)) return;
      if (!primaryNav.contains(target) && !menuToggle.contains(target)) {
        closeMobileMenu();
      }
    });

    window.addEventListener(
      "resize",
      () => {
        if (window.innerWidth > 768) {
          closeMobileMenu();
        }
      },
      { passive: true }
    );
  }

  /* =====================================================
     STICKY HEADER CONTROLLER
  ===================================================== */
  let previousScrolledState = null;

  function updateHeader() {
    if (!header) return;
    const isScrolled = window.scrollY > 20;

    if (isScrolled !== previousScrolledState) {
      header.classList.toggle("scrolled", isScrolled);
      previousScrolledState = isScrolled;
    }
  }

  updateHeader();
  window.addEventListener("scroll", updateHeader, { passive: true });

  /* =====================================================
     ACCESSIBLE ANCHOR SMOOTH SCROLLING
  ===================================================== */
  document.querySelectorAll('a[href^="#"]').forEach((link) => {
    link.addEventListener("click", (event) => {
      const href = link.getAttribute("href");
      if (!href || href === "#") return;

      let target;
      try {
        target = document.querySelector(href);
      } catch {
        return;
      }

      if (!target) return;

      event.preventDefault();
      closeMobileMenu();

      if (href === "#top" || href === "#home") {
        window.scrollTo({
          top: 0,
          behavior: scrollBehavior,
        });
      } else {
        const headerHeight = header ? header.getBoundingClientRect().height : 0;
        const targetTop = target.getBoundingClientRect().top + window.scrollY - headerHeight - 12;

        window.scrollTo({
          top: Math.max(0, targetTop),
          behavior: scrollBehavior,
        });
      }

      if (window.history && window.history.replaceState) {
        window.history.replaceState(
          null,
          "",
          href === "#top" ? window.location.pathname + window.location.search : href
        );
      }
    });
  });

  /* =====================================================
     EMAIL CLIPBOARD ACTION (With Fallback)
  ===================================================== */
  const emailTriggers = document.querySelectorAll(
    ".email-copy, a[href^='mailto:'], [data-email-copy], #email-copy-btn"
  );

  async function copyText(text) {
    if (navigator.clipboard && window.isSecureContext) {
      await navigator.clipboard.writeText(text);
      return true;
    }

    const temporaryInput = document.createElement("textarea");
    temporaryInput.value = text;
    temporaryInput.setAttribute("readonly", "");
    temporaryInput.style.position = "fixed";
    temporaryInput.style.opacity = "0";
    temporaryInput.style.pointerEvents = "none";

    document.body.appendChild(temporaryInput);
    temporaryInput.select();

    let copied = false;
    try {
      copied = document.execCommand("copy");
    } catch {
      copied = false;
    } finally {
      temporaryInput.remove();
    }

    if (!copied) {
      throw new Error("Clipboard unavailable");
    }

    return true;
  }

  emailTriggers.forEach((trigger) => {
    trigger.addEventListener("click", async (event) => {
      event.preventDefault();

      try {
        await copyText(email);

        if (copyToast) {
          copyToast.textContent = "Copied to clipboard!";
          copyToast.style.display = "inline";

          window.setTimeout(() => {
            copyToast.style.display = "none";
          }, 2500);
        } else {
          const originalText = trigger.textContent;
          trigger.textContent = "COPIED TO CLIPBOARD! ✓";
          trigger.classList.add("copied-success");

          window.setTimeout(() => {
            trigger.textContent = originalText;
            trigger.classList.remove("copied-success");
          }, 2500);
        }
      } catch {
        window.location.href = `mailto:${email}`;
      }
    });
  });

  /* =====================================================
     SCROLL REVEALS (Intersection Observer)
  ===================================================== */
  if ("IntersectionObserver" in window && !prefersReducedMotion) {
    const revealObserver = new IntersectionObserver(
      (entries, observer) => {
        entries.forEach((entry) => {
          if (!entry.isIntersecting) return;
          entry.target.classList.add("is-visible");
          observer.unobserve(entry.target);
        });
      },
      {
        threshold: 0.12,
        rootMargin: "0px 0px -40px 0px",
      }
    );

    revealElements.forEach((element) => {
      revealObserver.observe(element);
    });
  } else {
    revealElements.forEach((element) => {
      element.classList.add("is-visible");
    });
  }

  /* =====================================================
     PROCESS TIMELINE PROGRESS (RAF-Throttled)
  ===================================================== */
  const processSection = document.querySelector("#process, .process-section");
  const processTrack = document.querySelector(".process-track");
  const processProgress = document.querySelector(".process-line span, .process-line-progress");
  const processSteps = document.querySelectorAll(".process-step, [data-process-step]");

  let processFrameRequested = false;

  function renderProcessProgress() {
    processFrameRequested = false;
    if (!processSection) return;

    const rect = processSection.getBoundingClientRect();
    const viewportHeight = window.innerHeight;
    const sectionHeight = processSection.offsetHeight;
    const startOffset = viewportHeight * 0.72;

    const totalDistance = Math.max(1, sectionHeight + viewportHeight * 0.1);
    const progress = Math.min(1, Math.max(0, (startOffset - rect.top) / totalDistance));
    const isMobile = window.innerWidth <= 768;

    if (processTrack) {
      processTrack.classList.toggle("is-active", progress > 0.05);
    }

    if (processProgress) {
      processProgress.style.transformOrigin = isMobile ? "top center" : "left center";
      processProgress.style.transform = isMobile ? `scaleY(${progress})` : `scaleX(${progress})`;
      processProgress.classList.toggle("is-glowing", progress > 0.02);
    }

    if (processSteps.length) {
      const denominator = Math.max(1, processSteps.length - 0.75);

      processSteps.forEach((step, index) => {
        const isActive = progress >= index / denominator;
        const isPassed = progress > (index + 0.8) / denominator;

        step.classList.toggle("is-active", isActive);
        step.classList.toggle("is-passed", isPassed);
      });
    }
  }

  function scheduleProcessProgress() {
    if (processFrameRequested) return;
    processFrameRequested = true;
    window.requestAnimationFrame(renderProcessProgress);
  }

  renderProcessProgress();
  window.addEventListener("scroll", scheduleProcessProgress, { passive: true });
  window.addEventListener("resize", scheduleProcessProgress, { passive: true });

  /* =====================================================
     WEB3FORMS CONTACT SUBMISSION HANDLER
  ===================================================== */
  if (inquiryForm) {
    inquiryForm.addEventListener("submit", async (event) => {
      event.preventDefault();
      if (submitBtn && submitBtn.disabled) return;

      if (formNote) {
        formNote.textContent = "";
        formNote.removeAttribute("style");
      }

      const formData = new FormData(inquiryForm);

      if (formData.get("botcheck")) return;

      formData.set("page_url", window.location.href);
      formData.set("submitted_at", new Date().toISOString());

      if (submitBtn) {
        submitBtn.disabled = true;
        submitBtn.setAttribute("aria-busy", "true");
        submitBtn.innerHTML = 'Sending inquiry... <span aria-hidden="true">⏳</span>';
      }

      try {
        const response = await fetch("https://api.web3forms.com/submit", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Accept: "application/json",
          },
          body: JSON.stringify(Object.fromEntries(formData)),
        });

        let result;
        try {
          result = await response.json();
        } catch {
          throw new Error("The form service returned an unreadable response.");
        }

        if (!response.ok || !result.success) {
          throw new Error(result.message || "Your inquiry could not be sent. Please try again.");
        }

        if (formNote) {
          formNote.textContent = "✓ Inquiry sent successfully. Cadmium Solutions will be in touch shortly.";
          formNote.style.color = "var(--green)";
        }

        inquiryForm.reset();
      } catch (error) {
        if (formNote) {
          formNote.textContent =
            error instanceof Error && error.message
              ? `${error.message} You can also reach us directly at cadmiumsolutions@gmail.com.`
              : "Network error. Please email cadmiumsolutions@gmail.com directly.";
          formNote.style.color = "#ff6b6b";
        }
      } finally {
        if (submitBtn) {
          submitBtn.disabled = false;
          submitBtn.removeAttribute("aria-busy");
          submitBtn.innerHTML = 'Send inquiry <span aria-hidden="true">↗</span>';
        }
      }
    });
  }

  /* =====================================================
     FOOTER COPYRIGHT
  ===================================================== */
  const yearElement = document.getElementById("year");
  if (yearElement) {
    yearElement.textContent = String(new Date().getFullYear());
  }
});