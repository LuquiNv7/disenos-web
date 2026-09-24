/* ============================================================
   LClipStore — Interactive Logic & Cart Engine
   ============================================================ */
'use strict';
/* ============================================================
   1. PRODUCT DATA CATALOG
   ============================================================ */
const PRODUCTS = [
  {
    id: 'iph18pm-256-v1',
    model: 'iPhone 18 Pro Max',
    storage: ['256 GB'],
    prices: { '256 GB': 1830 },
    badge: 'new',
    badgeLabel: 'Nuevo 2026',
    colors: [
      { name: 'Black',    hex: '#1C1C1E', emoji: '📱', inStock: true },
      { name: 'Silver',   hex: '#C8C8C8', emoji: '📱', inStock: true },
      { name: 'Glacier',  hex: '#A8C5D0', emoji: '📱', inStock: true },
      { name: 'Burgundy', hex: '#6E1C2B', emoji: '📱', inStock: false }
    ],
    mpLink: 'LINK_MP_IPHONE_18PROMAX_256_V1'
  },
  {
    id: 'iph18pm-256-bur',
    model: 'iPhone 18 Pro Max',
    storage: ['256 GB'],
    prices: { '256 GB': 1860 },
    badge: 'hot',
    badgeLabel: '¡Popular!',
    colors: [
      { name: 'Burgundy', hex: '#6E1C2B', emoji: '📱', inStock: true }
    ],
    mpLink: 'LINK_MP_IPHONE_18PROMAX_256_BURGUNDY'
  },
  {
    id: 'iph18p-multi',
    model: 'iPhone 18 Pro',
    storage: ['256 GB', '512 GB'],
    prices: { '256 GB': 1610, '512 GB': 1830 },
    badge: 'new',
    badgeLabel: 'Nuevo 2026',
    colors: [
      { name: 'Black',    hex: '#1C1C1E', emoji: '📱', inStock: true },
      { name: 'Burgundy', hex: '#6E1C2B', emoji: '📱', inStock: true },
      { name: 'Glacier',  hex: '#A8C5D0', emoji: '📱', inStock: true }
    ],
    mpLink: 'LINK_MP_IPHONE_18PRO_MULTI'
  },
  {
    id: 'iph18p-256-gs',
    model: 'iPhone 18 Pro',
    storage: ['256 GB'],
    prices: { '256 GB': 1590 },
    badge: 'promo',
    badgeLabel: 'Precio Esp.',
    colors: [
      { name: 'Glacier', hex: '#A8C5D0', emoji: '📱', inStock: true },
      { name: 'Silver',  hex: '#C8C8C8', emoji: '📱', inStock: true }
    ],
    mpLink: 'LINK_MP_IPHONE_18PRO_256_GS'
  },
  {
    id: 'iph17pm-multi',
    model: 'iPhone 17 Pro Max',
    storage: ['256 GB', '512 GB'],
    prices: { '256 GB': 1360, '512 GB': 1600 },
    badge: null,
    badgeLabel: null,
    colors: [
      { name: 'Blue',   hex: '#2C5F8A', emoji: '📱', inStock: true },
      { name: 'Orange', hex: '#C85A00', emoji: '📱', inStock: true }
    ],
    mpLink: 'LINK_MP_IPHONE_17PROMAX_MULTI'
  },
  {
    id: 'iph17p-multi',
    model: 'iPhone 17 Pro',
    storage: ['256 GB', '512 GB'],
    prices: { '256 GB': 1260, '512 GB': 1480 },
    badge: null,
    badgeLabel: null,
    colors: [
      { name: 'Orange', hex: '#C85A00', emoji: '📱', inStock: true }
    ],
    mpLink: 'LINK_MP_IPHONE_17PRO_MULTI'
  },
  {
    id: 'iph17-256',
    model: 'iPhone 17',
    storage: ['256 GB'],
    prices: { '256 GB': 1065 },
    badge: null,
    badgeLabel: null,
    colors: [
      { name: 'Black',   hex: '#1C1C1E', emoji: '📱', inStock: true },
      { name: 'Blue',    hex: '#2C5F8A', emoji: '📱', inStock: true },
      { name: 'Sage',    hex: '#7A9E7E', emoji: '📱', inStock: true },
      { name: 'Lavender',hex: '#9B8EC4', emoji: '📱', inStock: true }
    ],
    mpLink: 'LINK_MP_IPHONE_17_256'
  },
  {
    id: 'iph16-128',
    model: 'iPhone 16',
    storage: ['128 GB'],
    prices: { '128 GB': 910 },
    badge: 'promo',
    badgeLabel: 'Oferta',
    colors: [
      { name: 'Ultra', hex: '#E0E0E0', emoji: '📱', inStock: true }
    ],
    mpLink: 'LINK_MP_IPHONE_16_128'
  },
  {
    id: 'iph15-128',
    model: 'iPhone 15',
    storage: ['128 GB'],
    prices: { '128 GB': 810 },
    badge: 'promo',
    badgeLabel: 'Oportunidad',
    colors: [
      { name: 'Blue', hex: '#2C5F8A', emoji: '📱', inStock: true }
    ],
    mpLink: 'LINK_MP_IPHONE_15_128'
  }
];
/* ============================================================
   2. PRODUCT STATE (per card)
   ============================================================ */
const cardState = {};
PRODUCTS.forEach(p => {
  const firstAvail = p.colors.find(c => c.inStock) || p.colors[0];
  cardState[p.id] = {
    selectedColor: firstAvail.name,
    selectedStorage: p.storage[0],
    fomoInterval: null
  };
});
/* ============================================================
   3. CART STATE
   ============================================================ */
const cart = {
  items: [],
  add(product, color, storage) {
    const existing = this.items.find(
      i => i.productId === product.id && i.color === color && i.storage === storage
    );
    if (existing) {
      existing.qty += 1;
    } else {
      this.items.push({
        productId: product.id,
        model:     product.model,
        color,
        storage,
        price:     product.prices[storage],
        qty:       1,
        colorHex:  product.colors.find(c => c.name === color)?.hex || '#333',
        mpLink:    product.mpLink
      });
    }
    this.render();
    animateBadge();
  },
  remove(index) {
    this.items.splice(index, 1);
    this.render();
    updateBadge();
  },
  get total() {
    return this.items.reduce((sum, i) => sum + i.price * i.qty, 0);
  },
  get count() {
    return this.items.reduce((sum, i) => sum + i.qty, 0);
  },
  render() {
    const list      = document.getElementById('cartItemsList');
    const emptyEl   = document.getElementById('cartEmpty');
    const totalEl   = document.getElementById('cartTotal');
    const subtotEl  = document.getElementById('cartSubtotal');
    const countLbl  = document.getElementById('cartCountLabel');
    const checkouts = document.getElementById('cartCheckouts');
    if (!list) return;
    countLbl.textContent = `${this.count} ${this.count === 1 ? 'artículo' : 'artículos'}`;
    if (this.items.length === 0) {
      emptyEl.style.display   = 'flex';
      list.style.display      = 'none';
      checkouts.style.display = 'none';
      totalEl.textContent     = 'USD 0';
      subtotEl.textContent    = 'USD 0';
      updateBadge();
      return;
    }
    emptyEl.style.display   = 'none';
    list.style.display      = 'flex';
    checkouts.style.display = 'block';
    list.innerHTML = this.items.map((item, idx) => `
      <div class="cart-item">
        <div class="cart-item-thumb" style="background:${item.colorHex}20">
          <span style="font-size:28px">📱</span>
        </div>
        <div class="cart-item-details">
          <div class="cart-item-name">${item.model}</div>
          <div class="cart-item-meta">${item.storage} · ${item.color} · ×${item.qty}</div>
          <div class="cart-item-price">
            <span class="currency">USD </span>${item.price.toLocaleString('es-AR')}
          </div>
        </div>
        <button class="btn-remove-item" onclick="cart.remove(${idx})" title="Eliminar">✕</button>
      </div>
    `).join('');
    const subtotal = this.total;
    subtotEl.textContent = `USD ${subtotal.toLocaleString('es-AR')}`;
    totalEl.innerHTML    = `<span class="currency">USD </span>${subtotal.toLocaleString('es-AR')}`;
    updateBadge();
  },
  buildWhatsAppMessage() {
    if (this.items.length === 0) return '';
    const lines = this.items.map(
      i => `• ${i.model} ${i.storage} – ${i.color} (USD ${i.price.toLocaleString('es-AR')}) ×${i.qty}`
    ).join('\n');
    const total = this.total.toLocaleString('es-AR');
    return encodeURIComponent(
      `Hola LClipStore! 🛒 Quiero hacer el siguiente pedido:\n\n${lines}\n\n💵 *Total: USD ${total}*\n\n¿Cómo procedo con el pago?`
    );
  }
};
/* ============================================================
   4. NAVBAR / SCROLL BEHAVIOR
   ============================================================ */
function initNavbar() {
  const navbar = document.querySelector('.navbar');
  if (!navbar) return;
  window.addEventListener('scroll', () => {
    navbar.classList.toggle('scrolled', window.scrollY > 60);
  }, { passive: true });
}
/* ============================================================
   5. CART DRAWER OPEN / CLOSE
   ============================================================ */
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
function updateBadge() {
  const badge = document.getElementById('cartBadge');
  const count = cart.count;
  badge.textContent = count;
  badge.classList.toggle('visible', count > 0);
}
function animateBadge() {
  updateBadge();
  const badge = document.getElementById('cartBadge');
  badge.classList.remove('bounce');
  void badge.offsetWidth; // reflow
  badge.classList.add('bounce');
}
/* ============================================================
   6. FOMO COUNTERS
   ============================================================ */
function initFomoCounters() {
  document.querySelectorAll('.fomo-count').forEach(el => {
    function update() {
      el.textContent = Math.floor(Math.random() * 199) + 2;
    }
    update();
    setInterval(update, 4000 + Math.random() * 1000);
  });
}
/* ============================================================
   7. COLOR SWATCH INTERACTION
   ============================================================ */
function selectColor(productId, colorName) {
  const product = PRODUCTS.find(p => p.id === productId);
  if (!product) return;
  const colorData = product.colors.find(c => c.name === colorName);
  if (!colorData || !colorData.inStock) return;
  cardState[productId].selectedColor = colorName;
  // Update swatch UI
  const card = document.querySelector(`[data-product-id="${productId}"]`);
  if (!card) return;
  card.querySelectorAll('.color-swatch').forEach(sw => {
    sw.classList.toggle('active', sw.dataset.color === colorName);
  });
  // Update color label
  const activeLabel = card.querySelector('.color-active-name');
  if (activeLabel) activeLabel.textContent = colorName;
  // Fade front phone image (cross-fade simulation)
  const frontImg = card.querySelector('.phone-img-front');
  if (frontImg) {
    frontImg.classList.add('fading');
    setTimeout(() => {
      frontImg.style.background = `linear-gradient(145deg, ${colorData.hex}33 0%, ${colorData.hex}88 100%)`;
      frontImg.classList.remove('fading');
    }, 300);
  }
  const backImg = card.querySelector('.phone-img-back');
  if (backImg) {
    backImg.style.background = `linear-gradient(145deg, ${colorData.hex}22 0%, ${colorData.hex}55 100%)`;
  }
  // Stock hint
  const hint = card.querySelector('.stock-hint');
  if (hint) hint.classList.remove('visible');
}
function hoverColor(productId, colorName) {
  const product = PRODUCTS.find(p => p.id === productId);
  if (!product) return;
  const colorData = product.colors.find(c => c.name === colorName);
  if (!colorData || colorData.inStock) {
    const card = document.querySelector(`[data-product-id="${productId}"]`);
    const hint = card?.querySelector('.stock-hint');
    if (hint) hint.classList.remove('visible');
    return;
  }
  const card = document.querySelector(`[data-product-id="${productId}"]`);
  const hint = card?.querySelector('.stock-hint');
  if (hint) hint.classList.add('visible');
}
function leaveColor(productId) {
  const card = document.querySelector(`[data-product-id="${productId}"]`);
  const hint = card?.querySelector('.stock-hint');
  if (hint) hint.classList.remove('visible');
}
/* ============================================================
   8. STORAGE SELECTOR
   ============================================================ */
function selectStorage(productId, storage) {
  cardState[productId].selectedStorage = storage;
  const card = document.querySelector(`[data-product-id="${productId}"]`);
  if (!card) return;
  card.querySelectorAll('.storage-btn').forEach(btn => {
    btn.classList.toggle('active', btn.dataset.storage === storage);
  });
  // Update price display
  const product = PRODUCTS.find(p => p.id === productId);
  const priceEl = card.querySelector('.price-value');
  if (priceEl && product) {
    priceEl.textContent = product.prices[storage].toLocaleString('es-AR');
  }
}
/* ============================================================
   9. ADD TO CART
   ============================================================ */
function addToCart(productId) {
  const product = PRODUCTS.find(p => p.id === productId);
  if (!product) return;
  const state   = cardState[productId];
  const color   = state.selectedColor;
  const storage = state.selectedStorage;
  cart.add(product, color, storage);
  openCart();
}
/* ============================================================
   10. WHATSAPP SINGLE PRODUCT
   ============================================================ */
function waProduct(productId) {
  const product = PRODUCTS.find(p => p.id === productId);
  if (!product) return;
  const state   = cardState[productId];
  const color   = state.selectedColor;
  const storage = state.selectedStorage;
  const price   = product.prices[storage];
  const msg = encodeURIComponent(
    `Hola LClipStore! Tengo una duda sobre el ${product.model} ${storage} – ${color} (USD ${price.toLocaleString('es-AR')}) que vi en la web.`
  );
  window.open(`https://wa.me/5491159305875?text=${msg}`, '_blank');
}
/* ============================================================
   11. CHECKOUT HANDLERS
   ============================================================ */
function checkoutMercadoPago() {
  if (cart.items.length === 0) { alert('Tu carrito está vacío.'); return; }
  if (cart.items.length === 1) {
    window.open(`https://mpago.la/${cart.items[0].mpLink}`, '_blank');
  } else {
    alert('Para pedidos con múltiples productos, te contactaremos por WhatsApp para coordinar el pago. ¡Redirigiendo!');
    checkoutWhatsApp();
  }
}
function checkoutWhatsApp() {
  if (cart.items.length === 0) { alert('Tu carrito está vacío.'); return; }
  const msg = cart.buildWhatsAppMessage();
  window.open(`https://wa.me/5491159305875?text=${msg}`, '_blank');
}
/* ============================================================
   12. SCROLL REVEAL
   ============================================================ */
function initScrollReveal() {
  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('revealed');
        observer.unobserve(entry.target);
      }
    });
  }, { threshold: 0.1, rootMargin: '0px 0px -40px 0px' });
  document.querySelectorAll('.reveal').forEach(el => observer.observe(el));
}
/* ============================================================
   13. RATING BAR ANIMATION
   ============================================================ */
function animateRatingBars() {
  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (!entry.isIntersecting) return;
      entry.target.querySelectorAll('.rating-bar-fill').forEach(bar => {
        const target = bar.dataset.width;
        bar.style.width = target;
      });
      observer.unobserve(entry.target);
    });
  }, { threshold: 0.3 });
  const block = document.querySelector('.rating-bars');
  if (block) {
    block.querySelectorAll('.rating-bar-fill').forEach(bar => { bar.style.width = '0%'; });
    observer.observe(block);
  }
}
/* ============================================================
   14. FILTER BUTTONS
   ============================================================ */
function initFilterButtons() {
  const btns = document.querySelectorAll('.filter-btn');
  const grid = document.getElementById('productGrid');
  if (!btns.length || !grid) return;
  btns.forEach(btn => {
    btn.addEventListener('click', () => {
      btns.forEach(b => b.classList.remove('active'));
      btn.classList.add('active');
      const filter = btn.dataset.filter;
      grid.querySelectorAll('.product-card').forEach(card => {
        const model = card.dataset.model || '';
        const show  = filter === 'all'
          || (filter === '18' && model.includes('18'))
          || (filter === '17' && model.includes('17'))
          || (filter === '16' && (model.includes('16') || model.includes('15')));
        card.style.transition  = 'opacity 0.4s, transform 0.4s';
        card.style.opacity     = show ? '1' : '0';
        card.style.transform   = show ? '' : 'scale(0.95)';
        card.style.pointerEvents = show ? '' : 'none';
      });
    });
  });
}
/* ============================================================
   15. MOBILE MENU
   ============================================================ */
function initMobileMenu() {
  const toggle = document.getElementById('mobileMenuToggle');
  const menu   = document.getElementById('mobileMenu');
  if (!toggle || !menu) return;
  toggle.addEventListener('click', () => {
    const isOpen = menu.classList.toggle('open');
    toggle.setAttribute('aria-expanded', isOpen);
    document.body.style.overflow = isOpen ? 'hidden' : '';
  });
}
/* ============================================================
   16. SMOOTH SCROLL NAV LINKS
   ============================================================ */
function initSmoothScroll() {
  document.querySelectorAll('a[href^="#"]').forEach(link => {
    link.addEventListener('click', e => {
      const target = document.querySelector(link.getAttribute('href'));
      if (!target) return;
      e.preventDefault();
      target.scrollIntoView({ behavior: 'smooth', block: 'start' });
    });
  });
}
/* ============================================================
   17. INIT
   ============================================================ */
document.addEventListener('DOMContentLoaded', () => {
  initNavbar();
  initFomoCounters();
  initScrollReveal();
  animateRatingBars();
  initFilterButtons();
  initMobileMenu();
  initSmoothScroll();
  cart.render();
  // Cart overlay click to close
  document.getElementById('cartOverlay')?.addEventListener('click', closeCart);
  // Keyboard ESC to close cart
  document.addEventListener('keydown', e => {
    if (e.key === 'Escape') closeCart();
  });
  console.log('%c🍎 LClipStore — Premium iPhone Experience', 'color:#6366F1;font-weight:900;font-size:14px');
  console.log('%cDesigned with ❤️ for ultra-luxury digital commerce.', 'color:#D4AF37;font-size:12px');
});

