/* Titan Maritime Ventures (Hellas) - site behaviour (no dependencies) */
(function () {
  "use strict";

  const header = document.querySelector(".header");
  const toggle = document.querySelector(".nav-toggle");
  const mobileNav = document.querySelector(".mobile-nav");

  /* Sticky header state */
  const onScroll = () => header && header.classList.toggle("is-scrolled", window.scrollY > 24);
  onScroll();
  window.addEventListener("scroll", onScroll, { passive: true });

  /* Mobile navigation */
  if (toggle && mobileNav) {
    const setOpen = (open) => {
      toggle.setAttribute("aria-expanded", String(open));
      mobileNav.classList.toggle("is-open", open);
      document.body.style.overflow = open ? "hidden" : "";
    };
    toggle.addEventListener("click", () => setOpen(toggle.getAttribute("aria-expanded") !== "true"));
    mobileNav.querySelectorAll("a").forEach((a) => a.addEventListener("click", () => setOpen(false)));
    window.addEventListener("keydown", (e) => { if (e.key === "Escape") setOpen(false); });
  }

  /* Mark current page in navigation */
  const here = location.pathname.split("/").pop() || "index.html";
  document.querySelectorAll(".nav a, .mobile-nav a").forEach((a) => {
    const target = a.getAttribute("href").split("#")[0] || "index.html";
    if (target === here) a.setAttribute("aria-current", "page");
  });

  /* Scroll reveal */
  const revealEls = document.querySelectorAll(".reveal");
  if ("IntersectionObserver" in window) {
    const io = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) { entry.target.classList.add("is-visible"); io.unobserve(entry.target); }
      });
    }, { rootMargin: "0px 0px -8% 0px", threshold: 0.1 });
    revealEls.forEach((el) => io.observe(el));
  } else {
    revealEls.forEach((el) => el.classList.add("is-visible"));
  }

  /* Count-up numbers (data-count="730" data-suffix="+") */
  const counters = document.querySelectorAll("[data-count]");
  const runCounter = (el) => {
    const end = parseFloat(el.dataset.count);
    const suffix = el.dataset.suffix || "";
    const prefix = el.dataset.prefix || "";
    const dur = 1400;
    const t0 = performance.now();
    const step = (t) => {
      const p = Math.min(1, (t - t0) / dur);
      const eased = 1 - Math.pow(1 - p, 3);
      el.textContent = prefix + Math.round(end * eased).toLocaleString("en-US") + suffix;
      if (p < 1) requestAnimationFrame(step);
    };
    requestAnimationFrame(step);
  };
  if (counters.length && "IntersectionObserver" in window) {
    const cio = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) { runCounter(entry.target); cio.unobserve(entry.target); }
      });
    }, { threshold: 0.4 });
    counters.forEach((el) => cio.observe(el));
  }

  /* Contact form: opens the visitor's mail client with a pre-filled message.
     Replace the `action` of the form with a Formspree/Netlify endpoint to
     collect submissions server-side instead. */
  const form = document.querySelector("#contact-form");
  if (form) {
    form.addEventListener("submit", (e) => {
      if (form.getAttribute("action")) return; // a real endpoint is configured
      e.preventDefault();
      const data = new FormData(form);
      const subject = encodeURIComponent(`[Website enquiry] ${data.get("topic") || "General"} - ${data.get("name") || ""}`);
      const body = encodeURIComponent(
        `Name: ${data.get("name")}\nCompany: ${data.get("company") || "-"}\nEmail: ${data.get("email")}\nPhone: ${data.get("phone") || "-"}\nTopic: ${data.get("topic")}\n\n${data.get("message")}`
      );
      window.location.href = `mailto:info@tmvhellas.com?subject=${subject}&body=${body}`;
    });
  }

  /* Footer year */
  document.querySelectorAll("[data-year]").forEach((el) => { el.textContent = new Date().getFullYear(); });
})();
