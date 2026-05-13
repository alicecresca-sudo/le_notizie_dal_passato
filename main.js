/**
 * Le Notizie dal Passato — script condiviso
 * Menu mobile, ombra navbar allo scroll, timeline home, form contatti
 */

(function () {
  "use strict";

  function initNavToggle() {
    var toggle = document.querySelector(".nav-toggle");
    var list = document.querySelector(".nav-list");
    if (!toggle || !list) return;

    toggle.addEventListener("click", function () {
      var open = list.classList.toggle("is-open");
      toggle.setAttribute("aria-expanded", open ? "true" : "false");
    });

    document.addEventListener("click", function (e) {
      if (!list.classList.contains("is-open")) return;
      if (toggle.contains(e.target) || list.contains(e.target)) return;
      list.classList.remove("is-open");
      toggle.setAttribute("aria-expanded", "false");
    });
  }

  function initHeaderScroll() {
    var header = document.querySelector(".site-header");
    if (!header) return;

    function onScroll() {
      if (window.scrollY > 12) {
        header.classList.add("is-scrolled");
      } else {
        header.classList.remove("is-scrolled");
      }
    }

    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
  }

  /**
   * Home: timeline dinamica (IntersectionObserver, soglia 40%)
   */
  function initTimeline() {
    const dots = document.querySelectorAll(".timeline-dot");
    const cards = document.querySelectorAll(".article-card[data-article]");
    if (!dots.length || !cards.length) return;

    function setActive(id) {
      dots.forEach((d) => d.classList.remove("active"));
      const target = document.querySelector(`.timeline-dot[data-article="${id}"]`);
      if (target) target.classList.add("active");
    }

    if (dots.length > 0) dots[0].classList.add("active");

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setActive(entry.target.dataset.article);
          }
        });
      },
      { threshold: 0.6, rootMargin: '-20% 0px -20% 0px' }
    );

    cards.forEach((card) => observer.observe(card));

    dots.forEach((dot) => {
      dot.addEventListener("click", () => {
        const id = dot.dataset.article;
        const cardEl = document.querySelector(`.article-card[data-article="${id}"]`);
        if (cardEl) cardEl.scrollIntoView({ behavior: "smooth", block: "center" });
      });
    });
  }

  function initContactForm() {
    var form = document.querySelector("#contact-form");
    if (!form) return;

    var success = document.querySelector("#form-success");

    form.addEventListener("submit", function (e) {
      e.preventDefault();
      if (success) {
        success.classList.add("is-visible");
        success.textContent =
          "Messaggio registrato solo in anteprima: nessun dato è stato inviato.";
      }
      form.reset();
    });
  }

  document.addEventListener("DOMContentLoaded", function () {
    initNavToggle();
    initHeaderScroll();
    initTimeline();
    initContactForm();
  });
})();
