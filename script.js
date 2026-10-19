document.addEventListener("DOMContentLoaded", () => {
  "use strict";

  const prefersReducedMotion = window.matchMedia(
    "(prefers-reduced-motion: reduce)"
  ).matches;

  const scrollBehavior = prefersReducedMotion ? "auto" : "smooth";

  /* =========================================
     ELEMENTS
  ========================================= */

  const header = document.querySelector(".site-header");
  const menuToggle = document.querySelector(".menu-toggle");
  const primaryNav = document.querySelector(".primary-nav");

  const backToTopLinks = document.querySelectorAll(
    ".back-top, [data-back-to-top], a[href='#top']"
  );

  const revealElements = document.querySelectorAll(".reveal");

  /* =========================================
     MOBILE NAVIGATION
  ========================================= */

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
    menuToggle.setAttribute(
      "aria-expanded",
      primaryNav.classList.contains("is-open") ? "true" : "false"
    );

    menuToggle.setAttribute("aria-controls", "primary-nav");

    menuToggle.addEventListener("click", () => {
      const isOpen = menuToggle.getAttribute("aria-expanded") === "true";

      if (isOpen) {
        closeMobileMenu();
      } else {
        openMobileMenu();
      }
    });

    primaryNav.querySelectorAll("a").forEach((link) => {
      link.addEventListener("click", () => {
        closeMobileMenu();
      });
    });

    document.addEventListener("keydown", (event) => {
      if (event.key === "Escape") {
        closeMobileMenu();
      }
    });

    document.addEventListener("click", (event) => {
      const clickedInsideNav = primaryNav.contains(event.target);
      const clickedToggle = menuToggle.contains(event.target);

      if (!clickedInsideNav && !clickedToggle) {
        closeMobileMenu();
      }
    });

    window.addEventListener("resize", () => {
      if (window.innerWidth > 900) {
        closeMobileMenu();
      }
    });
  }

  /* =========================================
     STICKY HEADER
  ========================================= */

  function updateHeader() {
    if (!header) return;
    header.classList.toggle("scrolled", window.scrollY > 24);
  }

  updateHeader();
  window.addEventListener("scroll", updateHeader, { passive: true });

  /* =========================================
     SMOOTH ANCHOR NAVIGATION
  ========================================= */

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

      if (href === "#top" || href === "#home") {
        window.scrollTo({
          top: 0,
          behavior: scrollBehavior,
        });
      } else {
        const headerHeight = header
          ? header.getBoundingClientRect().height
          : 0;

        const targetPosition =
          target.getBoundingClientRect().top +
          window.scrollY -
          headerHeight -
          16;

        window.scrollTo({
          top: Math.max(0, targetPosition),
          behavior: scrollBehavior,
        });
      }

      closeMobileMenu();
    });
  });

  /* =========================================
     BACK TO TOP
  ========================================= */

  backToTopLinks.forEach((link) => {
    link.addEventListener("click", (event) => {
      event.preventDefault();

      closeMobileMenu();

      window.scrollTo({
        top: 0,
        behavior: scrollBehavior,
      });

      if (window.history.replaceState) {
        window.history.replaceState(
          null,
          "",
          window.location.pathname + window.location.search
        );
      }
    });
  });

  /* =========================================
     EMAIL COPY TO CLIPBOARD
  ========================================= */

  const emailTriggers = document.querySelectorAll(
    ".email-copy, a[href^='mailto:'], [data-email-copy], #email-copy-btn"
  );
  const copyToast = document.getElementById("copy-toast");

  emailTriggers.forEach((trigger) => {
    trigger.addEventListener("click", (e) => {
      e.preventDefault();
      const email = "cadmiumsolutions@gmail.com";

      navigator.clipboard
        .writeText(email)
        .then(() => {
          if (copyToast) {
            copyToast.style.display = "inline";
            setTimeout(() => {
              copyToast.style.display = "none";
            }, 2500);
          } else {
            const originalText = trigger.textContent;
            trigger.textContent = "COPIED TO CLIPBOARD! ✓";
            trigger.classList.add("copied-success");

            setTimeout(() => {
              trigger.textContent = originalText;
              trigger.classList.remove("copied-success");
            }, 2500);
          }
        })
        .catch(() => {
          window.location.href = `mailto:${email}`;
        });
    });
  });

  /* =========================================
     SCROLL REVEAL ANIMATIONS
  ========================================= */

  if ("IntersectionObserver" in window && !prefersReducedMotion) {
    const revealObserver = new IntersectionObserver(
      (entries, observer) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add("is-visible");
            observer.unobserve(entry.target);
          }
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

  /* =========================================
     PROCESS TIMELINE GREEN GLOW & PROGRESS
  ========================================= */

  const processSection = document.querySelector(
    "#process, .process-section"
  );

  const processTrack = document.querySelector(".process-track");

  const processProgress = document.querySelector(
    ".process-line span, .process-line-progress"
  );

  const processSteps = document.querySelectorAll(
    ".process-step, [data-process-step]"
  );

  function updateProcessProgress() {
    if (!processSection) return;

    const rect = processSection.getBoundingClientRect();
    const viewportHeight = window.innerHeight;
    const sectionHeight = processSection.offsetHeight;

    // Smoothly calculates scroll progression through the process section
    const startOffset = viewportHeight * 0.72;
    const totalDistance = Math.max(1, sectionHeight + viewportHeight * 0.1);
    const travelled = startOffset - rect.top;
    const progress = Math.min(1, Math.max(0, travelled / totalDistance));

    const isMobile = window.innerWidth <= 700;

    if (processTrack) {
      if (progress > 0.05) {
        processTrack.classList.add("is-active");
      } else {
        processTrack.classList.remove("is-active");
      }
    }

    if (processProgress) {
      if (isMobile) {
        processProgress.style.transformOrigin = "top center";
        processProgress.style.transform = `scaleY(${progress})`;
      } else {
        processProgress.style.transformOrigin = "left center";
        processProgress.style.transform = `scaleX(${progress})`;
      }

      if (progress > 0.02) {
        processProgress.classList.add("is-glowing");
      } else {
        processProgress.classList.remove("is-glowing");
      }
    }

    if (processSteps.length) {
      processSteps.forEach((step, index) => {
        const stepThreshold = index / (processSteps.length - 0.75);
        const isActive = progress >= stepThreshold;
        const isPassed = progress > (index + 0.8) / (processSteps.length - 0.75);

        step.classList.toggle("is-active", isActive);
        step.classList.toggle("is-passed", isPassed);
      });
    }
  }

  updateProcessProgress();
  window.addEventListener("scroll", updateProcessProgress, { passive: true });
  window.addEventListener("resize", updateProcessProgress, { passive: true });

  /* =========================================
     WEB3FORMS CONTACT FORM SUBMISSION
  ========================================= */

  const inquiryForm = document.getElementById("inquiry-form");
  const formNote = document.getElementById("form-note");
  const submitBtn = document.getElementById("submit-btn");

  if (inquiryForm) {
    inquiryForm.addEventListener("submit", async (e) => {
      e.preventDefault();

      if (submitBtn) {
        submitBtn.disabled = true;
        submitBtn.innerHTML = `Sending inquiry... <span aria-hidden="true">⏳</span>`;
      }

      if (formNote) {
        formNote.textContent = "";
      }

      const formData = new FormData(inquiryForm);
      const object = Object.fromEntries(formData);
      const json = JSON.stringify(object);

      try {
        const response = await fetch("https://api.web3forms.com/submit", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Accept: "application/json",
          },
          body: json,
        });

        const result = await response.json();

        if (response.status === 200 && result.success) {
          formNote.textContent = "✓ Inquired successfully! Your message has been sent to Cadmium. We will respond soon.";
          formNote.style.color = "var(--green)";
          inquiryForm.reset();
        } else {
          formNote.textContent = result.message || "Failed to send. Please reach out via WhatsApp or direct email.";
          formNote.style.color = "#ff4444";
        }
      } catch (error) {
        formNote.textContent = "Network error. Please message us directly at cadmiumsolutions@gmail.com.";
        formNote.style.color = "#ff4444";
      } finally {
        if (submitBtn) {
          submitBtn.disabled = false;
          submitBtn.innerHTML = `Send inquiry <span aria-hidden="true">↗</span>`;
        }
      }
    });
  }

  /* =========================================
     FOOTER COPYRIGHT YEAR
  ========================================= */

  const yearElement = document.getElementById("year");
  if (yearElement) {
    yearElement.textContent = new Date().getFullYear();
  }
});