/* ============================================================
   PHŌNE — INTERACTIONS
   ============================================================ */


/* ============================================================
   MOBILE MENU
   ============================================================ */

const menuToggle = document.getElementById("menuToggle");
const mobileMenu = document.getElementById("mobileMenu");

if (menuToggle && mobileMenu) {

    menuToggle.addEventListener("click", () => {

        mobileMenu.classList.toggle("open");

        const spans = menuToggle.querySelectorAll("span");

        if (mobileMenu.classList.contains("open")) {

            spans[0].style.transform = "translateY(3px) rotate(45deg)";
            spans[1].style.transform = "translateY(-3px) rotate(-45deg)";

        } else {

            spans[0].style.transform = "";
            spans[1].style.transform = "";

        }

    });


    mobileMenu.querySelectorAll("a").forEach(link => {

        link.addEventListener("click", () => {

            mobileMenu.classList.remove("open");

            const spans = menuToggle.querySelectorAll("span");

            spans[0].style.transform = "";
            spans[1].style.transform = "";

        });

    });

}


/* ============================================================
   PRODUCT FILTER
   ============================================================ */

const filterButtons = document.querySelectorAll(".filter-btn");
const productCards = document.querySelectorAll(".product-card");

filterButtons.forEach(button => {

    button.addEventListener("click", () => {

        filterButtons.forEach(btn => {
            btn.classList.remove("active");
        });

        button.classList.add("active");

        const filter = button.dataset.filter;

        productCards.forEach(card => {

            const category = card.dataset.category;

            if (filter === "all" || category === filter) {

                card.classList.remove("hidden");

                setTimeout(() => {
                    card.style.opacity = "1";
                    card.style.transform = "";
                }, 20);

            } else {

                card.classList.add("hidden");

            }

        });

    });

});


/* ============================================================
   PRODUCT BUTTONS
   ============================================================ */

const productButtons = document.querySelectorAll(".product-btn");

productButtons.forEach(button => {

    button.addEventListener("click", () => {

        const card = button.closest(".product-card");

        if (!card) return;

        const productName =
            card.querySelector("h3")?.textContent.trim();

        if (productName) {

            /*
             * DEMO:
             * En la versión real este botón puede llevar a:
             *
             * /productos/iphone-17
             *
             * o abrir WhatsApp con un mensaje precargado.
             *
             * No se agrega ningún número real hasta tener
             * los datos del cliente.
             */

            alert(
                `DEMO\n\nSeleccionaste: ${productName}\n\nEn la versión final este botón llevará a la página del producto o al canal de compra.`
            );

        }

    });

});


/* ============================================================
   SCROLL REVEAL
   ============================================================ */

const revealElements = document.querySelectorAll(
    ".product-card, .quick-benefit, .offer-point, .info-card, .step"
);

revealElements.forEach(element => {
    element.classList.add("reveal");
});


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
        threshold: 0.08
    }
);


revealElements.forEach(element => {
    revealObserver.observe(element);
});


/* ============================================================
   HEADER SCROLL EFFECT
   ============================================================ */

const header = document.getElementById("header");

let lastScroll = 0;

window.addEventListener(
    "scroll",
    () => {

        const currentScroll = window.scrollY;

        if (!header) return;

        if (currentScroll > 30) {

            header.style.boxShadow =
                "0 10px 35px rgba(0,0,0,.25)";

        } else {

            header.style.boxShadow = "none";

        }

        lastScroll = currentScroll;

    },
    { passive: true }
);


/* ============================================================
   SMOOTH ANCHOR HANDLING
   ============================================================ */

document.querySelectorAll('a[href^="#"]').forEach(anchor => {

    anchor.addEventListener("click", event => {

        const targetId =
            anchor.getAttribute("href");

        if (!targetId || targetId === "#") return;

        const target =
            document.querySelector(targetId);

        if (!target) return;

        event.preventDefault();

        const headerHeight =
            header ? header.offsetHeight : 0;

        const targetPosition =
            target.getBoundingClientRect().top +
            window.scrollY -
            headerHeight -
            15;

        window.scrollTo({
            top: targetPosition,
            behavior: "smooth"
        });

    });

});


/* ============================================================
   PREVENT DEMO FORM / BUTTON ISSUES
   ============================================================ */

document.querySelectorAll("button").forEach(button => {

    if (!button.type) {
        button.type = "button";
    }

});


/* ============================================================
   CONSOLE INFO
   ============================================================ */

console.log(
    "%cPHŌNE — Demo Landing",
    "font-size:18px;font-weight:bold;"
);

console.log(
    "Demo creada para presentar la propuesta visual."
);

console.log(
    "Los precios y datos de contacto son ilustrativos."
);
