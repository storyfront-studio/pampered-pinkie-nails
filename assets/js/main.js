// Pampered Pinkie — demo site
const WA_NUMBER = "254728610475"; // confirm with owner during discovery

// mobile nav
const toggle = document.querySelector(".nav-toggle");
const nav = document.querySelector(".nav");
const closeBtn = document.querySelector(".nav-close");
if (toggle && nav) {
  const setOpen = o => { nav.classList.toggle("open", o); document.body.classList.toggle("menu-open", o); toggle.setAttribute("aria-expanded", o); };
  toggle.addEventListener("click", () => setOpen(true));
  document.addEventListener("keydown", e => { if (e.key === "Escape") setOpen(false); });
  closeBtn && closeBtn.addEventListener("click", () => setOpen(false));
  nav.querySelectorAll("a").forEach(a => a.addEventListener("click", () => setOpen(false)));
}

// scroll reveal (respects reduced motion)
const prefersReduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
if (!prefersReduced && "IntersectionObserver" in window) {
  const io = new IntersectionObserver(entries => {
    entries.forEach(e => { if (e.isIntersecting) { e.target.classList.add("in"); io.unobserve(e.target); } });
  }, { threshold: 0.12 });
  document.querySelectorAll(".reveal").forEach(el => io.observe(el));
} else {
  document.querySelectorAll(".reveal").forEach(el => el.classList.add("in"));
}

// booking form → structured WhatsApp message
const form = document.getElementById("booking-form");
if (form) {
  form.addEventListener("submit", e => {
    e.preventDefault();
    const v = id => (document.getElementById(id) || {}).value || "";
    const lines = [
      "Hello Pampered Pinkie! I'd like to book an appointment.",
      "Name: " + v("bk-name"),
      "Service: " + v("bk-service"),
      "Preferred day: " + v("bk-date"),
      "Preferred time: " + v("bk-time"),
    ];
    const set = [["Shape", "bk-shape"], ["Length", "bk-length"], ["Finish", "bk-finish"], ["Add-on", "bk-extra"]].map(p => [p[0], v(p[1])]).filter(p => p[1] && p[1] !== "Not sure yet");
    if (set.length) lines.push("My set: " + set.map(p => p[0] + " " + p[1]).join(", "));
    const notes = v("bk-notes").trim();
    if (notes) lines.push("Notes: " + notes);
    const url = "https://wa.me/" + WA_NUMBER + "?text=" + encodeURIComponent(lines.join("\n"));
    window.open(url, "_blank", "noopener");
  });
}

// current year
document.querySelectorAll("[data-year]").forEach(el => el.textContent = new Date().getFullYear());
