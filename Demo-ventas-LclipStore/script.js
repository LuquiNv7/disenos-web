/* =============================================
   LClipStore — Interactive Script
   Ultra-Luxury iPhone E-commerce
   ============================================= */
// ========= CONFIGURATION =========
const USD_TO_ARS = 1200;
const COUNTDOWN_DURATION_MS = 60 * 60 * 1000; // 1 hour
const WHATSAPP_NUMBER = '541159305875';
// ========= IMAGE MAP (model + color -> {front, back}) =========
// All renders on white/transparent background, consistent style
const IMAGE_MAP = {
    '18promax': {
        black: {
            front: 'https://www.pngall.com/wp-content/uploads/24/iPhone-18-Pro-Black-Display-And-Front-Design-PNG.png',
            back: 'https://www.pngall.com/wp-content/uploads/24/iPhone-18-Pro-Max-Black-Rear-Panel-Design-PNG.png'
        },
        silver: {
            front: 'https://www.pngall.com/wp-content/uploads/24/iPhone-18-Pro-Black-Display-And-Front-Design-PNG.png',
            back: 'https://www.pngall.com/wp-content/uploads/24/iPhone-18-Pro-Max-Silver-Rear-Panel-Design-PNG.png'
        },
        glacier: {
            front: 'https://www.pngall.com/wp-content/uploads/24/iPhone-18-Pro-Black-Display-And-Front-Design-PNG.png',
            back: 'https://www.pngall.com/wp-content/uploads/24/iPhone-18-Pro-Max-Glacier-Rear-Product-Design-PNG.png'
        },
        burgundy: {
            front: 'https://www.pngall.com/wp-content/uploads/24/iPhone-18-Pro-Black-Display-And-Front-Design-PNG.png',
            back: 'https://www.pngall.com/wp-content/uploads/24/iPhone-18-Pro-Burgundy-Back-And-Side-View-PNG.png'
        }
    },
    '18pro': {
        black: {
            front: 'https://www.pngall.com/wp-content/uploads/24/iPhone-18-Pro-Black-Display-And-Front-Design-PNG.png',
            back: 'https://www.pngall.com/wp-content/uploads/24/iPhone-18-Pro-Black-Textured-Case-Back-PNG.png'
        },
        silver: {
            front: 'https://www.pngall.com/wp-content/uploads/24/iPhone-18-Pro-Black-Display-And-Front-Design-PNG.png',
            back: 'https://www.pngall.com/wp-content/uploads/24/iPhone-18-Pro-White-Titanium-Back-Design-PNG.png'
        },
        glacier: {
            front: 'https://www.pngall.com/wp-content/uploads/24/iPhone-18-Pro-Black-Display-And-Front-Design-PNG.png',
            back: 'https://www.pngall.com/wp-content/uploads/24/iPhone-18-Pro-Blue-Titanium-Back-PNG.png'
        },
        burgundy: {
            front: 'https://www.pngall.com/wp-content/uploads/24/iPhone-18-Pro-Black-Display-And-Front-Design-PNG.png',
            back: 'https://www.pngall.com/wp-content/uploads/24/iPhone-18-Pro-Burgundy-Back-And-Side-View-PNG.png'
        }
    },
    '17promax': {
        blue: {
            front: 'https://www.pngall.com/wp-content/uploads/24/iPhone-18-Pro-Black-Display-And-Front-Design-PNG.png',
            back: 'https://www.pngall.com/wp-content/uploads/24/iPhone-18-Pro-Blue-Titanium-Back-PNG.png'
        },
        orange: {
            front: 'https://www.pngall.com/wp-content/uploads/24/iPhone-18-Pro-Black-Display-And-Front-Design-PNG.png',
            back: 'https://www.pngall.com/wp-content/uploads/24/iPhone-18-Pro-Burgundy-Back-And-Side-View-PNG.png'
        }
    },
    '17pro': {
        orange: {
            front: 'https://www.pngall.com/wp-content/uploads/24/iPhone-18-Pro-Black-Display-And-Front-Design-PNG.png',
            back: 'https://www.pngall.com/wp-content/uploads/24/iPhone-18-Pro-Burgundy-Back-And-Side-View-PNG.png'
        },
        blue: {
            front: 'https://www.pngall.com/wp-content/uploads/24/iPhone-18-Pro-Black-Display-And-Front-Design-PNG.png',
            back: 'https://www.pngall.com/wp-content/uploads/24/iPhone-18-Pro-Blue-Titanium-Back-PNG.png'
        }
    },
    '17': {
        black: {
            front: 'https://www.pngall.com/wp-content/uploads/24/iPhone-18-Pro-Black-Display-And-Front-Design-PNG.png',
            back: 'https://www.pngall.com/wp-content/uploads/24/iPhone-18-Pro-Black-Textured-Case-Back-PNG.png'
        },
        blue: {
            front: 'https://www.pngall.com/wp-content/uploads/24/iPhone-18-Pro-Black-Display-And-Front-Design-PNG.png',
            back: 'https://www.pngall.com/wp-content/uploads/24/iPhone-18-Pro-Blue-Titanium-Back-PNG.png'
        },
        sage: {
            front: 'https://www.pngall.com/wp-content/uploads/24/iPhone-18-Pro-Black-Display-And-Front-Design-PNG.png',
            back: 'https://www.pngall.com/wp-content/uploads/24/iPhone-18-Pro-White-Titanium-Back-Design-PNG.png'
        },
        lavender: {
            front: 'https://www.pngall.com/wp-content/uploads/24/iPhone-18-Pro-Black-Display-And-Front-Design-PNG.png',
            back: 'https://www.pngall.com/wp-content/uploads/24/iPhone-18-Pro-Burgundy-Back-And-Side-View-PNG.png'
        }
    },
    '16': {
        ultra: {
            front: 'https://www.pngall.com/wp-content/uploads/24/iPhone-18-Pro-Black-Display-And-Front-Design-PNG.png',
            back: 'https://www.pngall.com/wp-content/uploads/24/iPhone-18-Pro-Blue-Titanium-Back-PNG.png'
        },
        black: {
            front: 'https://www.pngall.com/wp-content/uploads/24/iPhone-18-Pro-Black-Display-And-Front-Design-PNG.png',
            back: 'https://www.pngall.com/wp-content/uploads/24/iPhone-18-Pro-Black-Textured-Case-Back-PNG.png'
        },
        pink: {
            front: 'https://www.pngall.com/wp-content/uploads/24/iPhone-18-Pro-Black-Display-And-Front-Design-PNG.png',
            back: 'https://www.pngall.com/wp-content/uploads/24/iPhone-18-Pro-Burgundy-Back-And-Side-View-PNG.png'
        }
    },
    '15': {
        blue: {
            front: 'https://www.pngall.com/wp-content/uploads/24/iPhone-18-Pro-Black-Display-And-Front-Design-PNG.png',
            back: 'https://www.pngall.com/wp-content/uploads/24/iPhone-18-Pro-Blue-Titanium-Back-PNG.png'
        }
    }
};
// ========= CART STATE =========
let cart = [];
// ========= UTILITY FUNCTIONS =========
function formatUSD(amount) {
    return amount.toLocaleString('es-AR', { minimumFractionDigits: 0, maximumFractionDigits: 0 });
}
function formatARS(amount) {
    const ars = Math.round(amount * USD_TO_ARS);
    return ars.toLocaleString('es-AR', { minimumFractionDigits: 0, maximumFractionDigits: 0 }).replace(/,/g, '.');
}
// ========= COUNTDOWN TIMERS =========
function initCountdowns() {
    const timers = document.querySelectorAll('[data-countdown]');
    timers.forEach(timerEl => {
        // Stagger start times slightly so they don't all hit 0 together
        const stagger = Math.random() * 5 * 60 * 1000; // up to 5 min offset
        const endTime = Date.now() + COUNTDOWN_DURATION_MS - stagger;
        timerEl.dataset.endTime = endTime;
    });
}
function updateCountdowns() {
    const timers = document.querySelectorAll('[data-countdown]');
    timers.forEach(timerEl => {
        const endTime = parseInt(timerEl.dataset.endTime);
        let diff = endTime - Date.now();
        if (diff < 0) diff = 0;
        const h = Math.floor(diff / 3_600_000);
        const m = Math.floor((diff % 3_600_000) / 60_000);
        const s = Math.floor((diff % 60_000) / 1000);
        const pad = n => String(n).padStart(2, '0');
        const hEl = timerEl.querySelector('[data-h]');
        const mEl = timerEl.querySelector('[data-m]');
        const sEl = timerEl.querySelector('[data-s]');
        if (hEl) hEl.textContent = pad(h);
        if (mEl) mEl.textContent = pad(m);
        if (sEl) sEl.textContent = pad(s);
        // Reset if expired (continuous loop)
        if (diff === 0) {
            timerEl.dataset.endTime = Date.now() + COUNTDOWN_DURATION_MS;
        }
    });
}
// ========= FOMO VISITOR COUNTERS =========
function initVisitorCounters() {
    const counters = document.querySelectorAll('[data-visitors]');
    counters.forEach(counter => {
        // Initial random value between 12 and 87
        const initial = Math.floor(Math.random() * 76) + 12;
        counter.textContent = initial;
        counter.dataset.base = initial;
    });
}
function updateVisitorCounters() {
    const counters = document.querySelectorAll('[data-visitors]');
    counters.forEach(counter => {
        const current = parseInt(counter.textContent);
        // Random walk: -8 to +12, clamped 2-200
        const delta = Math.floor(Math.random() * 21) - 8;
        let next = current + delta;
        next = Math.max(2, Math.min(200, next));
        counter.textContent = next;
    });
}
// ========= COLOR SWITCHING =========
function initColorSelectors() {
    document.querySelectorAll('.color-dot').forEach(dot => {
        dot.addEventListener('click', (e) => {
            e.preventDefault();
            const dotEl = e.currentTarget;
            if (dotEl.classList.contains('out-of-stock')) {
                // Show a subtle tooltip
                const card = dotEl.closest('.product-card');
                const note = card.querySelector('.stock-note');
                if (note) {
                    note.textContent = 'Sin stock temporal';
                    setTimeout(() => { note.textContent = ''; }, 2500);
                }
                return;
            }
            const color = dotEl.dataset.color;
            const card = dotEl.closest('.product-card');
            if (!card) return;
            const imgContainer = card.querySelector('.product-images');
            const modelKey = imgContainer.dataset.modelKey;
            const currentColor = imgContainer.dataset.currentColor;
            if (color === currentColor) return;
            // Update active dot
            card.querySelectorAll('.color-dot').forEach(d => d.classList.remove('active'));
            dotEl.classList.add('active');
            // Swap images with crossfade
            const newImages = IMAGE_MAP[modelKey] && IMAGE_MAP[modelKey][color];
            if (!newImages) return;
            const frontImg = imgContainer.querySelector('.product-img-front');
            const backImg = imgContainer.querySelector('.product-img-back');
            // Crossfade
            [frontImg, backImg].forEach(img => img.classList.add('fading-out'));
            setTimeout(() => {
                frontImg.src = newImages.front;
                backImg.src = newImages.back;
                imgContainer.dataset.currentColor = color;
                setTimeout(() => {
                    [frontImg, backImg].forEach(img => img.classList.remove('fading-out'));
                }, 50);
            }, 320);
        });
    });
}
// ========= PRICE CALCULATION (DUAL CURRENCY) =========
function initPrices() {
    document.querySelectorAll('[data-price-usd]').forEach(el => {
        const usd = parseInt(el.dataset.usd);
        el.textContent = formatUSD(usd);
        // Find sibling ARS
        const card = el.closest('.countdown-row, .product-card');
        if (card) {
            const arsEl = card.querySelector('[data-price-ars]');
            if (arsEl) arsEl.textContent = formatARS(usd);
        }
    });
}
// ========= CART FUNCTIONALITY =========
function openCart() {
    document.getElementById('cartDrawer').classList.add('open');
    document.getElementById('cartOverlay').classList.add('open');
    document.body.style.overflow = 'hidden';
}
function closeCart() {
    document.getElementById('cartDrawer').classList.remove('open');
    document.getElementById('cartOverlay').classList.remove('open');
    document.body.style.overflow = '';
}
function updateCartUI() {
    const itemsEl = document.getElementById('cartItems');
    const footerEl = document.getElementById('cartFooter');
    const emptyEl = document.getElementById('cartEmpty');
    const badgeEl = document.getElementById('cartBadge');
    const checkoutBtn = document.getElementById('checkoutBtn');
    badgeEl.textContent = cart.length;
    if (cart.length === 0) {
        emptyEl.style.display = 'flex';
        footerEl.style.display = 'none';
        // Remove any cart items except empty state
        itemsEl.querySelectorAll('.cart-item').forEach(el => el.remove());
        return;
    }
    emptyEl.style.display = 'none';
    footerEl.style.display = 'block';
    // Remove existing cart items
    itemsEl.querySelectorAll('.cart-item').forEach(el => el.remove());
    let totalUSD = 0;
    cart.forEach((item, idx) => {
        totalUSD += item.usd;
        const itemEl = document.createElement('div');
        itemEl.className = 'cart-item';
        itemEl.innerHTML = `
            <div class="cart-item-img">📱</div>
            <div>
                <div class="cart-item-name">${item.name}</div>
                <div class="cart-item-price">USD ${formatUSD(item.usd)}</div>
                <div class="cart-item-price-ars">≈ ARS ${formatARS(item.usd)}</div>
            </div>
            <button class="cart-item-remove" data-remove-idx="${idx}" aria-label="Eliminar">×</button>
        `;
        itemsEl.appendChild(itemEl);
    });
    // Total USD/ARS
    const totalUsdEl = document.querySelector('.cart-total-usd');
    const totalArsEl = document.querySelector('.cart-total-ars span:last-child');
    if (totalUsdEl) totalUsdEl.textContent = 'USD ' + formatUSD(totalUSD);
    if (totalArsEl) totalArsEl.textContent = 'ARS ' + formatARS(totalUSD);
    // Mercado Pago checkout link (placeholder)
    checkoutBtn.href = 'LINK_MP_CHECKOUT';
    checkoutBtn.target = '_blank';
    checkoutBtn.rel = 'noopener';
    // Remove buttons
    itemsEl.querySelectorAll('[data-remove-idx]').forEach(btn => {
        btn.addEventListener('click', () => {
            const idx = parseInt(btn.dataset.removeIdx);
            cart.splice(idx, 1);
            updateCartUI();
        });
    });
}
function initCart() {
    // Add-to-cart buttons
    document.querySelectorAll('[data-add-cart]').forEach(btn => {
        btn.addEventListener('click', (e) => {
            // Allow default (MercadoPago link) only with ctrl/cmd click or right-click
            // Otherwise: add to cart
            if (!e.ctrlKey && !e.metaKey && !e.shiftKey) {
                e.preventDefault();
                const name = btn.dataset.cartName;
                const usd = parseInt(btn.dataset.cartUsd);
                cart.push({ name, usd });
                updateCartUI();
                openCart();
            }
        });
    });
    // Cart toggle
    document.getElementById('cartTrigger').addEventListener('click', openCart);
    document.getElementById('cartClose').addEventListener('click', closeCart);
    document.getElementById('cartOverlay').addEventListener('click', closeCart);
    // Cart WhatsApp button
    const cartWaBtn = document.getElementById('cartWaBtn');
    cartWaBtn.addEventListener('click', () => {
        if (cart.length === 0) return;
        let itemsText = cart.map(i => `- ${i.name} (USD ${formatUSD(i.usd)})`).join('%0A');
        const message = `Hola LClipStore! Tengo una consulta sobre los siguientes productos que vi en la web:%0A%0A${itemsText}%0A%0AMe gustaría recibir más información. Gracias!`;
        window.open(`https://wa.me/${WHATSAPP_NUMBER}?text=${message}`, '_blank');
    });
    updateCartUI();
}
// ========= WHATSAPP LINKS (already handled via href, but confirm dynamic) =========
function initWhatsAppLinks() {
    // Static links are already set in HTML via href; nothing else needed
    // This is a hook point for future enhancements
}
// ========= NAV SCROLL EFFECT =========
function initNavScroll() {
    const nav = document.getElementById('navGlass');
    const onScroll = () => {
        if (window.scrollY > 60) {
            nav.classList.add('scrolled');
        } else {
            nav.classList.remove('scrolled');
        }
    };
    window.addEventListener('scroll', onScroll, { passive: true });
    onScroll();
}
// ========= SMOOTH SCROLL INTERNAL LINKS =========
function initSmoothScroll() {
    document.querySelectorAll('a[href^="#"]').forEach(link => {
        link.addEventListener('click', (e) => {
            const href = link.getAttribute('href');
            if (href === '#') return;
            const target = document.querySelector(href);
            if (target) {
                e.preventDefault();
                const offset = 120;
                const top = target.getBoundingClientRect().top + window.scrollY - offset;
                window.scrollTo({ top, behavior: 'smooth' });
            }
        });
    });
}
// ========= IMAGE LAZY LOAD WITH CROSSFALLBACK =========
function initImageFallbacks() {
    document.querySelectorAll('.product-img').forEach(img => {
        img.addEventListener('error', () => {
            // Fallback: use a light gray div-like placeholder
            img.style.display = 'none';
        });
    });
}
// ========= INIT ON DOM READY =========
document.addEventListener('DOMContentLoaded', () => {
    initPrices();
    initCountdowns();
    updateCountdowns();
    setInterval(updateCountdowns, 1000);
    initVisitorCounters();
    setInterval(updateVisitorCounters, 4000);
    initColorSelectors();
    initCart();
    initWhatsAppLinks();
    initNavScroll();
    initSmoothScroll();
    initImageFallbacks();
    // Animate rating bars when section comes into view
    const reviewSection = document.querySelector('.reviews-section');
    if (reviewSection) {
        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    document.querySelectorAll('.bar-fill').forEach(bar => {
                        const w = bar.style.width;
                        bar.style.width = '0%';
                        setTimeout(() => { bar.style.width = w; }, 100);
                    });
                    observer.disconnect();
                }
            });
        }, { threshold: 0.2 });
        observer.observe(reviewSection);
    }
});

