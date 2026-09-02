/* =========================
   MENÚ MOBILE
========================= */

const menuToggle = document.getElementById("menuToggle");
const menu = document.getElementById("menu");

if (menuToggle && menu) {

  menuToggle.addEventListener("click", () => {
    menu.classList.toggle("active");
  });

  document.querySelectorAll(".menu a").forEach(link => {

    link.addEventListener("click", () => {
      menu.classList.remove("active");
    });

  });

}


/* =========================
   ANIMACIONES AL SCROLLEAR
========================= */

const revealElements = document.querySelectorAll(".reveal");

const revealObserver = new IntersectionObserver(
  entries => {

    entries.forEach(entry => {

      if (entry.isIntersecting) {

        entry.target.classList.add("visible");

        revealObserver.unobserve(entry.target);

      }

    });

  },
  {
    threshold: 0.12
  }
);

revealElements.forEach(element => {
  revealObserver.observe(element);
});


/* =========================
   FORMULARIO → WHATSAPP
========================= */

const form = document.getElementById("contactForm");

if (form) {

  form.addEventListener("submit", event => {

    event.preventDefault();

    const name = document.getElementById("name").value.trim();
    const phone = document.getElementById("phone").value.trim();
    const service = document.getElementById("service").value;
    const message = document.getElementById("message").value.trim();

    if (!name || !phone) {
      alert("Por favor completá tu nombre y teléfono.");
      return;
    }

    const whatsappMessage =
      `Hola, soy ${name}.%0A%0A` +
      `Quisiera realizar una consulta legal.%0A%0A` +
      `Área: ${service}%0A` +
      `Teléfono: ${phone}%0A` +
      `Mensaje: ${message || "Sin mensaje adicional."}`;

    const whatsappURL =
      `https://wa.me/5491140646941?text=${whatsappMessage}`;

    window.open(whatsappURL, "_blank");

  });

}


/* =========================
   AÑO AUTOMÁTICO
========================= */

const year = document.getElementById("year");

if (year) {
  year.textContent = new Date().getFullYear();
}


/* =========================
   HEADER AL SCROLL
========================= */

const header = document.querySelector(".header");

window.addEventListener("scroll", () => {

  if (!header) return;

  if (window.scrollY > 50) {
    header.style.background = "rgba(17,17,15,.94)";
    header.style.backdropFilter = "blur(15px)";
  } else {
    header.style.background = "transparent";
    header.style.backdropFilter = "none";
  }

});
