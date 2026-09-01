// ===============================
// NATALIA JOANNAZ
// Premium Website Interactions
// ===============================


// MOBILE MENU

const menuBtn = document.getElementById("menuBtn");
const mobileMenu = document.getElementById("mobileMenu");

if (menuBtn && mobileMenu) {

  menuBtn.addEventListener("click", () => {
    mobileMenu.classList.toggle("active");
  });

  document.querySelectorAll(".mobile-menu a").forEach(link => {
    link.addEventListener("click", () => {
      mobileMenu.classList.remove("active");
    });
  });
}


// HEADER ON SCROLL

const header = document.getElementById("header");

window.addEventListener("scroll", () => {

  if (window.scrollY > 50) {
    header.style.background = "rgba(246,241,233,.97)";
    header.style.boxShadow = "0 10px 30px rgba(40,38,32,.06)";
  } else {
    header.style.background = "rgba(246,241,233,.90)";
    header.style.boxShadow = "none";
  }

});


// SCROLL REVEAL

const revealElements = document.querySelectorAll(".reveal");

const observer = new IntersectionObserver(
  (entries) => {

    entries.forEach(entry => {

      if (entry.isIntersecting) {
        entry.target.style.animationPlayState = "running";
        observer.unobserve(entry.target);
      }

    });

  },
  {
    threshold: 0.12
  }
);

revealElements.forEach(element => {
  element.style.animationPlayState = "paused";
  observer.observe(element);
});


// SMOOTH INTERNAL LINKS

document.querySelectorAll('a[href^="#"]').forEach(link => {

  link.addEventListener("click", function (event) {

    const targetId = this.getAttribute("href");

    if (!targetId || targetId === "#") return;

    const target = document.querySelector(targetId);

    if (!target) return;

    event.preventDefault();

    const headerHeight = header ? header.offsetHeight : 0;

    const position =
      target.getBoundingClientRect().top +
      window.scrollY -
      headerHeight;

    window.scrollTo({
      top: position,
      behavior: "smooth"
    });

  });

});


// WHATSAPP TRACKING

document.querySelectorAll('a[href*="wa.me"]').forEach(button => {

  button.addEventListener("click", () => {

    console.log(
      "WhatsApp CTA clicked - Natalia Joannaz"
    );

  });

});
