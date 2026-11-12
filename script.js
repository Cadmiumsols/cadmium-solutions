/* ==========================================================================
   CADMIUM SOLUTIONS — 2026 APPLE-GRADE INTERACTION & PHYSICS ENGINE
   ========================================================================== */

document.addEventListener("DOMContentLoaded", () => {
  "use strict";

  const prefersReducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
  const scrollBehavior = prefersReducedMotion ? "auto" : "smooth";

  /* =====================================================
     DOM REFERENCES
  ===================================================== */
  const header = document.querySelector(".site-header");
  const photonRail = document.getElementById("scroll-photon-rail");
  const menuToggle = document.querySelector(".menu-toggle");
  const primaryNav = document.querySelector(".primary-nav");
  const revealElements = document.querySelectorAll(".reveal");
  const inquiryForm = document.getElementById("inquiry-form");
  const formNote = document.getElementById("form-note");
  const submitBtn = document.getElementById("submit-btn");
  const copyToast = document.getElementById("copy-toast");
  const liveChronometer = document.getElementById("live-chronometer");
  const heroMagneticBtn = document.getElementById("hero-magnetic-btn");
  const hudModal = document.getElementById("hud-modal");
  const hudCloseBtn = document.getElementById("hud-close-btn");
  const hudSearchInput = document.getElementById("hud-search-input");
  const hudResults = document.getElementById("hud-results");
  const email = "cadmiumsolutions@gmail.com";

  /* =====================================================
     01. NATIVE WEB AUDIO SYNTHETIC MICRO-HAPTICS (ACTIVE BY DEFAULT)
  ===================================================== */
  let audioContext = null;

  function playCrownTick() {
    if (prefersReducedMotion) return;
    try {
      if (!audioContext) {
        const AudioCtx = window.AudioContext || window.webkitAudioContext;
        if (AudioCtx) audioContext = new AudioCtx();
      }
      if (audioContext && audioContext.state === "suspended") {
        audioContext.resume();
      }
      if (!audioContext) return;

      const osc = audioContext.createOscillator();
      const gain = audioContext.createGain();

      osc.type = "sine";
      osc.frequency.setValueAtTime(1800, audioContext.currentTime);
      osc.frequency.exponentialRampToValueAtTime(320, audioContext.currentTime + 0.003);

      gain.gain.setValueAtTime(0.045, audioContext.currentTime);
      gain.gain.exponentialRampToValueAtTime(0.0001, audioContext.currentTime + 0.003);

      osc.connect(gain);
      gain.connect(audioContext.destination);

      osc.start();
      osc.stop(audioContext.currentTime + 0.0035);
    } catch {
      // Audio context silently falls back if prohibited by autoplay policy
    }
  }

  /* =====================================================
     02. LIVE KARACHI CHRONOMETER (PKT UTC+5)
  ===================================================== */
  function updateChronometer() {
    if (!liveChronometer) return;
    const now = new Date();
    const options = {
      timeZone: "Asia/Karachi",
      hour12: false,
      hour: "2-digit",
      minute: "2-digit",
      second: "2-digit"
    };
    const timeString = new Intl.DateTimeFormat("en-GB", options).format(now);
    liveChronometer.textContent = `PKT ${timeString}`;
  }
  updateChronometer();
  setInterval(updateChronometer, 1000);

  /* =====================================================
     03. HERO MAGNETIC BUTTON PHYSICS
  ===================================================== */
  if (heroMagneticBtn && !prefersReducedMotion && window.matchMedia("(hover: hover)").matches) {
    let btnRect = null;

    heroMagneticBtn.addEventListener("mouseenter", () => {
      btnRect = heroMagneticBtn.getBoundingClientRect();
      playCrownTick();
    });

    heroMagneticBtn.addEventListener("mousemove", (event) => {
      if (!btnRect) btnRect = heroMagneticBtn.getBoundingClientRect();
      const centerX = btnRect.left + btnRect.width / 2;
      const centerY = btnRect.top + btnRect.height / 2;
      const deltaX = (event.clientX - centerX) * 0.28;
      const deltaY = (event.clientY - centerY) * 0.28;

      heroMagneticBtn.style.transform = `translate3d(${deltaX}px, ${deltaY}px, 0)`;
    });

    heroMagneticBtn.addEventListener("mouseleave", () => {
      heroMagneticBtn.style.transform = "translate3d(0, 0, 0)";
      btnRect = null;
    });
  }

  /* =====================================================
     04. KINETIC SCRUB TYPOGRAPHY (PHILOSOPHY)
  ===================================================== */
  const scrubContainer = document.querySelector(".kinetic-scrub-text");
  if (scrubContainer) {
    const rawWords = scrubContainer.textContent.trim().split(/\s+/);
    scrubContainer.innerHTML = rawWords
      .map((word) => `<span class="scrub-word">${word}</span>`)
      .join(" ");

    const scrubWords = scrubContainer.querySelectorAll(".scrub-word");

    function renderTypographyScrub() {
      if (prefersReducedMotion) return;
      const rect = scrubContainer.getBoundingClientRect();
      const windowHeight = window.innerHeight;
      const start = windowHeight * 0.85;
      const end = windowHeight * 0.25;

      const progress = Math.min(1, Math.max(0, (start - rect.top) / (start - end)));
      const count = scrubWords.length;
      const activeThreshold = progress * count;

      scrubWords.forEach((wordEl, index) => {
        if (index <= activeThreshold) {
          wordEl.classList.add("is-illuminated");
        } else {
          wordEl.classList.remove("is-illuminated");
        }
      });
    }

    window.addEventListener("scroll", renderTypographyScrub, { passive: true });
    renderTypographyScrub();
  }

  /* =====================================================
     05. VISIONOS 2.5D CARD TILT & SPECULAR HIGHLIGHT
  ===================================================== */
  if (!prefersReducedMotion && window.matchMedia("(hover: hover)").matches) {
    const tiltCards = document.querySelectorAll("[data-tilt-card]");

    tiltCards.forEach((card) => {
      const media = card.querySelector(".creative-media");
      if (!media) return;

      let rect = null;

      card.addEventListener("mouseenter", () => {
        rect = media.getBoundingClientRect();
      });

      card.addEventListener("mousemove", (event) => {
        if (!rect) rect = media.getBoundingClientRect();
        const x = event.clientX - rect.left;
        const y = event.clientY - rect.top;

        const centerX = rect.width / 2;
        const centerY = rect.height / 2;

        const rotateY = ((x - centerX) / centerX) * 2.5;
        const rotateX = -((y - centerY) / centerY) * 2.5;

        media.style.transform = `rotateX(${rotateX.toFixed(2)}deg) rotateY(${rotateY.toFixed(2)}deg) translateZ(10px)`;
        media.style.setProperty("--specular-x", `${(x / rect.width) * 100}%`);
        media.style.setProperty("--specular-y", `${(y / rect.height) * 100}%`);
      });

      card.addEventListener("mouseleave", () => {
        media.style.transform = "rotateX(0deg) rotateY(0deg) translateZ(0px)";
        rect = null;
      });
    });
  }

  /* =====================================================
     06. HAIRLINE PHOTON SCROLL RAIL
  ===================================================== */
  function updatePhotonRail() {
    if (!photonRail) return;
    const docHeight = document.documentElement.scrollHeight - window.innerHeight;
    const progress = docHeight > 0 ? window.scrollY / docHeight : 0;
    photonRail.style.transform = `scaleX(${Math.min(1, Math.max(0, progress))})`;
  }

  window.addEventListener("scroll", updatePhotonRail, { passive: true });
  updatePhotonRail();

  /* =====================================================
     07. CSP-COMPLIANT IMAGE FALLBACKS
  ===================================================== */
  document.querySelectorAll(".founder-portrait img").forEach((img) => {
    img.addEventListener("error", () => {
      img.hidden = true;
      if (img.parentElement) {
        img.parentElement.setAttribute("data-fallback", "true");
      }
    });
  });

  /* =====================================================
     08. ACCESSIBLE MOBILE NAVIGATION DRAWER
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
    playCrownTick();
  }

  if (menuToggle && primaryNav) {
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
      if (!primaryNav.contains(target) && !menuToggle.contains(target) && (!hudModal || !hudModal.contains(target))) {
        closeMobileMenu();
      }
    });

    const desktopQuery = window.matchMedia("(min-width: 769px)");
    desktopQuery.addEventListener("change", (e) => {
      if (e.matches) closeMobileMenu();
    });
  }

  /* =====================================================
     09. STICKY HEADER CONTROLLER
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
     10. SMOOTH SCROLLING
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
      playCrownTick();

      if (href === "#top" || href === "#home") {
        window.scrollTo({ top: 0, behavior: scrollBehavior });
      } else {
        const headerHeight = header ? header.getBoundingClientRect().height : 0;
        const targetTop = target.getBoundingClientRect().top + window.scrollY - headerHeight - 12;
        window.scrollTo({ top: Math.max(0, targetTop), behavior: scrollBehavior });
      }

      if (window.history?.replaceState) {
        window.history.replaceState(null, "", href === "#top" ? window.location.pathname : href);
      }
    });
  });

  /* =====================================================
     11. EMAIL CLIPBOARD ACTION
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
    } finally {
      temporaryInput.remove();
    }
    if (!copied) throw new Error("Clipboard unavailable");
    return true;
  }

  emailTriggers.forEach((trigger) => {
    trigger.addEventListener("click", async (event) => {
      event.preventDefault();
      playCrownTick();
      try {
        await copyText(email);
        if (copyToast) {
          copyToast.textContent = "Copied to clipboard!";
          copyToast.style.display = "inline";
          window.setTimeout(() => { copyToast.style.display = "none"; }, 2500);
        }
      } catch {
        window.location.href = `mailto:${email}`;
      }
    });
  });

  /* =====================================================
     12. SCROLL REVEALS
  ===================================================== */
  if ("IntersectionObserver" in window && !prefersReducedMotion) {
    const revealObserver = new IntersectionObserver((entries, observer) => {
      entries.forEach((entry) => {
        if (!entry.isIntersecting) return;
        entry.target.classList.add("is-visible");
        observer.unobserve(entry.target);
      });
    }, { threshold: 0.12, rootMargin: "0px 0px -40px 0px" });

    revealElements.forEach((el) => revealObserver.observe(el));
  } else {
    revealElements.forEach((el) => el.classList.add("is-visible"));
  }

  /* =====================================================
     13. SURGICAL PROCESS CONDUIT TRACKER
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
    }

    if (processSteps.length) {
      const denominator = Math.max(1, processSteps.length - 0.75);
      processSteps.forEach((step, index) => {
        const isActive = progress >= index / denominator;
        const isPassed = progress > (index + 0.8) / denominator;

        step.classList.toggle("is-active", isActive);
        step.classList.toggle("is-passed", isPassed);

        if (isActive && !isPassed) {
          step.setAttribute("aria-current", "step");
        } else {
          step.removeAttribute("aria-current");
        }
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
     14. CAPABILITIES, PAIRED SYSTEMS & DELIVERABLES ENGINE
  ===================================================== */
  const servicePills = document.querySelectorAll(".service-pill-liquid");
  const bundleCards = document.querySelectorAll(".system-card-liquid");
  const dock = document.getElementById("system-dock");
  const dockCountLabel = document.getElementById("dock-count-label");
  const dockScopeSummary = document.getElementById("dock-scope-summary");
  const dockVelocityOutput = document.getElementById("dock-velocity-output");
  const dockWhatsappBtn = document.getElementById("dock-whatsapp-btn");
  const directWhatsappLink = document.getElementById("direct-whatsapp-link");
  const formSelectedScope = document.getElementById("form-selected-scope");
  const formEstimatedDeliverables = document.getElementById("form-estimated-deliverables");
  const scopePrefillBanner = document.getElementById("scope-prefill-banner");
  const scopeBannerText = document.getElementById("scope-banner-text");

  const serviceNames = {
    "brand-id": "Brand Identity & Systems",
    "asset-design": "Social Asset Design",
    "copywriting": "Strategic Copywriting",
    "videography": "Studio & On-Site Videography",
    "video-editing": "Performance Video Editing",
    "ai-ugc": "AI UGC Ad Production",
    "social-ops": "Social Media Operations",
    "meta-ads": "Meta Paid Acquisition",
    "content-strat": "Content Strategy Architecture",
    "web-eng": "Next.js Web Engineering",
    "ecom-stores": "E-Commerce Storefronts",
    "seo-geo": "Tri-Engine Search (SEO/GEO)"
  };

  const deliverableBenchmarks = {
    "video-editing": "8–12 Performance Reels/mo",
    "asset-design": "12–16 Social Visual Assets/mo",
    "copywriting": "Core Hooks & Direct-Response Copy",
    "meta-ads": "Full-Funnel Ad Architecture",
    "ai-ugc": "4–8 AI Creator Ad Variations",
    "brand-id": "1 Master Brand Guideline & Asset Suite",
    "web-eng": "Sub-Second Production Web Platform",
    "seo-geo": "Tri-Engine Search & AI Citations",
    "videography": "Half-Day On-Site Production Footage",
    "social-ops": "Daily Platform Operations & Reach Distribution",
    "content-strat": "30-Day Tactical Positioning Roadmap",
    "ecom-stores": "Headless High-Converting Commerce Store"
  };

  const bundleDefinitions = {
    "creative-engine": {
      name: "THE CREATIVE ENGINE",
      services: ["video-editing", "asset-design", "copywriting"]
    },
    "performance-funnel": {
      name: "THE ACQUISITION FUNNEL",
      services: ["meta-ads", "ai-ugc", "video-editing"]
    },
    "digital-launchpad": {
      name: "DIGITAL LAUNCHPAD",
      services: ["brand-id", "web-eng", "copywriting", "seo-geo"]
    }
  };

  let selectedServices = new Set();

  function triggerDockBounce() {
    if (!dock) return;
    dock.classList.remove("dock-bounce");
    void dock.offsetWidth;
    dock.classList.add("dock-bounce");
  }

  function updateSystemState() {
    // 1. Update capability pills
    servicePills.forEach((pill) => {
      const id = pill.dataset.serviceId;
      const isSelected = selectedServices.has(id);
      pill.classList.toggle("is-selected", isSelected);
      const btn = pill.querySelector(".pill-toggle");
      if (btn) {
        btn.setAttribute("aria-pressed", isSelected ? "true" : "false");
        const icon = btn.querySelector(".pill-toggle-icon");
        const text = btn.querySelector(".pill-toggle-text");
        if (icon) icon.textContent = isSelected ? "✓" : "+";
        if (text) text.textContent = isSelected ? "Selected" : "Add to Scope";
      }
    });

    // 2. Synchronize bundles & checkmarks
    let matchedBundleName = null;
    bundleCards.forEach((card) => {
      const bundleKey = card.dataset.bundle;
      const def = bundleDefinitions[bundleKey];
      if (!def) return;

      const allPresent = def.services.every((srv) => selectedServices.has(srv));
      card.classList.toggle("is-matched", allPresent);
      card.classList.toggle("is-active", allPresent);

      card.querySelectorAll("[data-bundle-item]").forEach((item) => {
        const itemKey = item.dataset.bundleItem;
        const isPresent = selectedServices.has(itemKey);
        item.classList.toggle("is-checked", isPresent);
      });

      const btn = card.querySelector(".bundle-cta");
      if (btn) {
        btn.innerHTML = allPresent
          ? `Bundle Active ✓`
          : `Select This System <span aria-hidden="true">↗</span>`;
      }
      if (allPresent) matchedBundleName = def.name;
    });

    // 3. Calculate Deliverables Velocity Output
    const count = selectedServices.size;
    const deliverablesList = Array.from(selectedServices).map((id) => deliverableBenchmarks[id]).filter(Boolean);

    if (count > 0 && dock) {
      dock.classList.add("is-visible");
      triggerDockBounce();

      if (dockCountLabel) {
        dockCountLabel.textContent = `${count} SERVICE${count > 1 ? "S" : ""} SELECTED`;
      }

      const chosenTitles = Array.from(selectedServices).map((id) => serviceNames[id] || id);
      if (dockScopeSummary) {
        dockScopeSummary.textContent = matchedBundleName
          ? `Matched Bundle: ${matchedBundleName}`
          : chosenTitles.join(" + ");
      }

      if (dockVelocityOutput) {
        dockVelocityOutput.textContent = `Projected Output: ${deliverablesList.slice(0, 3).join(" • ")}${deliverablesList.length > 3 ? " + more" : ""}`;
      }

      if (scopePrefillBanner && scopeBannerText) {
        scopePrefillBanner.style.display = "inline-flex";
        scopeBannerText.textContent = `Configured Scope Active: ${count} discipline${count > 1 ? "s" : ""} selected`;
      }

      const waText = encodeURIComponent(
        `Hi Cadmium Solutions! I configured a custom scope on your website.\n\n` +
        (matchedBundleName ? `Matched System: ${matchedBundleName}\n` : ``) +
        `Services Requested:\n- ` + chosenTitles.join("\n- ") +
        `\n\nProjected Monthly Output:\n- ` + deliverablesList.join("\n- ") +
        `\n\nI'd like to discuss timelines and quote proposals for my brand.`
      );
      const waUrl = `https://wa.me/923319233463?text=${waText}`;

      if (dockWhatsappBtn) dockWhatsappBtn.href = waUrl;
      if (directWhatsappLink) directWhatsappLink.href = waUrl;
      if (formSelectedScope) formSelectedScope.value = chosenTitles.join(", ");
      if (formEstimatedDeliverables) formEstimatedDeliverables.value = deliverablesList.join(" | ");
    } else if (dock) {
      dock.classList.remove("is-visible");
      if (scopePrefillBanner) scopePrefillBanner.style.display = "none";
      const defaultWa = `https://wa.me/923319233463?text=Hi%20Cadmium%20Solutions!%20I'd%20like%20to%20request%20a%20scope%20consultation%20for%20my%20brand.`;
      if (dockWhatsappBtn) dockWhatsappBtn.href = defaultWa;
      if (directWhatsappLink) directWhatsappLink.href = defaultWa;
      if (formSelectedScope) formSelectedScope.value = "None specified";
      if (formEstimatedDeliverables) formEstimatedDeliverables.value = "None specified";
    }
  }

  servicePills.forEach((pill) => {
    const trigger = pill.querySelector("[data-service-trigger]");
    if (trigger) {
      trigger.addEventListener("click", () => {
        const id = pill.dataset.serviceId;
        if (selectedServices.has(id)) {
          selectedServices.delete(id);
        } else {
          selectedServices.add(id);
        }
        playCrownTick();
        updateSystemState();
      });
    }
  });

  bundleCards.forEach((card) => {
    const trigger = card.querySelector("[data-bundle-trigger]");
    if (trigger) {
      trigger.addEventListener("click", () => {
        const bundleKey = card.dataset.bundle;
        const def = bundleDefinitions[bundleKey];
        if (!def) return;

        const allPresent = def.services.every((srv) => selectedServices.has(srv));
        if (allPresent) {
          def.services.forEach((srv) => selectedServices.delete(srv));
        } else {
          def.services.forEach((srv) => selectedServices.add(srv));
        }
        playCrownTick();
        updateSystemState();
      });
    }
  });

  /* =====================================================
     15. COMMAND PALETTE HUD (CMD + K)
  ===================================================== */
  const hudCommands = [
    { label: "Jump to Work Exhibition", category: "Navigation", target: "#work" },
    { label: "Configure Scope & Capabilities", category: "Tools", target: "#services" },
    { label: "View Paired Systems (Bundles)", category: "Navigation", target: "#systems" },
    { label: "The 5-Step Process Method", category: "Navigation", target: "#process" },
    { label: "Core Agency Principles (Ribbon)", category: "Navigation", target: "#principles" },
    { label: "About Cadmium & System Architecture", category: "Navigation", target: "#about" },
    { label: "Meet the Founders", category: "Navigation", target: "#founders" },
    { label: "Send Project Inquiry", category: "Contact", target: "#contact" },
    { label: "Quick Action: Select Creative Engine Bundle", category: "Scope Preset", action: () => selectBundlePreset("creative-engine") },
    { label: "Quick Action: Select Acquisition Funnel Bundle", category: "Scope Preset", action: () => selectBundlePreset("performance-funnel") },
    { label: "Quick Action: Select Digital Launchpad Bundle", category: "Scope Preset", action: () => selectBundlePreset("digital-launchpad") },
    { label: "Copy Agency Email to Clipboard", category: "Action", action: () => copyText(email) }
  ];

  function selectBundlePreset(bundleKey) {
    const def = bundleDefinitions[bundleKey];
    if (def) {
      selectedServices.clear();
      def.services.forEach((srv) => selectedServices.add(srv));
      updateSystemState();
      const el = document.getElementById("systems");
      if (el) el.scrollIntoView({ behavior: scrollBehavior });
    }
  }

  function openHud() {
    if (!hudModal) return;
    hudModal.classList.add("is-active");
    hudModal.setAttribute("aria-hidden", "false");
    document.body.classList.add("modal-open");
    if (hudSearchInput) {
      hudSearchInput.value = "";
      hudSearchInput.focus();
    }
    renderHudResults("");
    playCrownTick();
  }

  function closeHud() {
    if (!hudModal) return;
    hudModal.classList.remove("is-active");
    hudModal.setAttribute("aria-hidden", "true");
    document.body.classList.remove("modal-open");
    playCrownTick();
  }

  function renderHudResults(query) {
    if (!hudResults) return;
    const filter = query.toLowerCase().trim();
    const matched = hudCommands.filter((cmd) => cmd.label.toLowerCase().includes(filter) || cmd.category.toLowerCase().includes(filter));

    hudResults.innerHTML = matched.map((cmd, idx) => `
      <div class="hud-item ${idx === 0 ? "is-selected" : ""}" data-hud-index="${idx}" tabindex="0">
        <span>${cmd.label}</span>
        <span class="hud-item-shortcut mono">${cmd.category}</span>
      </div>
    `).join("");

    hudResults.querySelectorAll(".hud-item").forEach((item, index) => {
      item.addEventListener("click", () => {
        executeHudCommand(matched[index]);
      });
    });
  }

  function executeHudCommand(cmd) {
    if (!cmd) return;
    closeHud();
    if (cmd.action) {
      cmd.action();
    } else if (cmd.target) {
      const el = document.querySelector(cmd.target);
      if (el) el.scrollIntoView({ behavior: scrollBehavior });
    }
  }

  if (hudCloseBtn) hudCloseBtn.addEventListener("click", closeHud);

  if (hudModal) {
    hudModal.addEventListener("click", (e) => {
      if (e.target === hudModal) closeHud();
    });
  }

  if (hudSearchInput) {
    hudSearchInput.addEventListener("input", (e) => {
      renderHudResults(e.target.value);
    });

    hudSearchInput.addEventListener("keydown", (e) => {
      const items = Array.from(hudResults.querySelectorAll(".hud-item"));
      const selectedIndex = items.findIndex((i) => i.classList.contains("is-selected"));

      if (e.key === "ArrowDown") {
        e.preventDefault();
        const next = (selectedIndex + 1) % items.length;
        items.forEach((i, idx) => i.classList.toggle("is-selected", idx === next));
        playCrownTick();
      } else if (e.key === "ArrowUp") {
        e.preventDefault();
        const prev = (selectedIndex - 1 + items.length) % items.length;
        items.forEach((i, idx) => i.classList.toggle("is-selected", idx === prev));
        playCrownTick();
      } else if (e.key === "Enter") {
        e.preventDefault();
        const filter = hudSearchInput.value.toLowerCase().trim();
        const matched = hudCommands.filter((cmd) => cmd.label.toLowerCase().includes(filter) || cmd.category.toLowerCase().includes(filter));
        if (matched[selectedIndex]) executeHudCommand(matched[selectedIndex]);
      }
    });
  }

  // Global listener for CMD+K / CTRL+K
  window.addEventListener("keydown", (e) => {
    if ((e.metaKey || e.ctrlKey) && e.key === "k") {
      e.preventDefault();
      hudModal.classList.contains("is-active") ? closeHud() : openHud();
    } else if (e.key === "Escape" && hudModal && hudModal.classList.contains("is-active")) {
      closeHud();
    }
  });

  /* =====================================================
     16. CONTACT FORM HANDLER WITH PREFILLED SCOPE
  ===================================================== */
  if (inquiryForm) {
    inquiryForm.addEventListener("submit", async (event) => {
      event.preventDefault();
      if (submitBtn && submitBtn.disabled) return;

      if (formNote) {
        formNote.textContent = "";
        formNote.removeAttribute("style");
      }

      if (!inquiryForm.checkValidity()) {
        if (formNote) {
          formNote.textContent = "Please fill in all required fields marked with an asterisk (*).";
          formNote.style.color = "#ff6b6b";
        }
        return;
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

        const result = await response.json().catch(() => null);

        if (!response.ok || !result || !result.success) {
          throw new Error("API_REJECTED");
        }

        if (formNote) {
          formNote.textContent = "✓ Inquiry sent successfully. Cadmium Solutions will be in touch shortly.";
          formNote.style.color = "var(--green)";
        }

        inquiryForm.reset();
        selectedServices.clear();
        updateSystemState();
        playCrownTick();
      } catch (error) {
        console.error("Submission error:", error);
        if (formNote) {
          formNote.textContent = "We could not send your message at this time. Please email us directly at cadmiumsolutions@gmail.com.";
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
     17. FOOTER COPYRIGHT
  ===================================================== */
  const yearElement = document.getElementById("year");
  if (yearElement) {
    yearElement.textContent = String(new Date().getFullYear());
  }
});