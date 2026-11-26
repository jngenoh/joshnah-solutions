// Joshnah Solutions site behaviour
(function () {
  const WHATSAPP = "254726301706";
  const EMAIL = "info@joshnahsolutions.co.ke";

  // Mobile menu
  const toggle = document.querySelector(".menu-toggle");
  const menu = document.getElementById("menu");
  if (toggle && menu) {
    toggle.addEventListener("click", () => {
      const open = menu.classList.toggle("open");
      toggle.setAttribute("aria-expanded", String(open));
      toggle.setAttribute("aria-label", open ? "Close menu" : "Open menu");
    });
    menu.querySelectorAll("a").forEach((a) =>
      a.addEventListener("click", () => {
        menu.classList.remove("open");
        toggle.setAttribute("aria-expanded", "false");
      })
    );
  }

  // Year
  const year = document.getElementById("year");
  if (year) year.textContent = new Date().getFullYear();

  // Reveal on scroll
  const targets = document.querySelectorAll(".service, .steps li, .sector, .pillars li, .section-head");
  if ("IntersectionObserver" in window && !window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
    document.documentElement.classList.add("js");
    targets.forEach((el) => el.classList.add("reveal"));
    const io = new IntersectionObserver((entries) => {
      entries.forEach((e) => {
        if (e.isIntersecting) { e.target.classList.add("in"); io.unobserve(e.target); }
      });
    }, { rootMargin: "0px 0px -8% 0px" });
    targets.forEach((el) => io.observe(el));
  }

  // Quote form -> WhatsApp or email
  const form = document.getElementById("quote-form");
  const error = document.getElementById("form-error");
  if (form) {
    form.addEventListener("submit", (ev) => {
      ev.preventDefault();
      const via = ev.submitter && ev.submitter.dataset.via === "email" ? "email" : "whatsapp";
      const name = document.getElementById("f-name").value.trim();
      const org = document.getElementById("f-org").value.trim();
      const service = document.getElementById("f-service").value;
      const message = document.getElementById("f-msg").value.trim();
      if (!name || !message) { error.hidden = false; return; }
      error.hidden = true;

      const lines = [
        "Hello Joshnah Solutions,",
        "",
        "Name: " + name,
        org ? "Organisation: " + org : null,
        "Service: " + service,
        "",
        message,
      ].filter((l) => l !== null).join("\n");

      if (via === "email") {
        const subject = "Quotation request: " + service;
        window.location.href = "mailto:" + EMAIL + "?subject=" + encodeURIComponent(subject) + "&body=" + encodeURIComponent(lines);
      } else {
        window.open("https://wa.me/" + WHATSAPP + "?text=" + encodeURIComponent(lines), "_blank", "noopener");
      }
    });
  }
})();
