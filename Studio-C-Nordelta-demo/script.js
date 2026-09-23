/* ============================================================
   STUDIO C — NORDELTA · script.js
   ============================================================ */
'use strict';
/* ── CATALOG DATA ────────────────────────────────────────── */
const CATALOG = [
  {
    id: 1,
    name: 'Vestido VOGUE',
    category: 'largos',
    price: 72222,
    transfer: 65000,
    stock: false,
    sizes: ['XS','S','M','L'],
    img: 'https://d22fxaf9t8d39k.cloudfront.net/b28c8f67f5135e64e5c3de47a9e1a8ac64f033f1c6c0f33a45c262f231926d39437670.webp',
    desc: 'Vestido largo de silueta envolvente, diseño editorial con escote profundo. Ideal para eventos de noche y galas de alta costura.'
  },
  {
    id: 2,
    name: 'Vestido GLAM Basic',
    category: 'largos',
    price: 72222,
    transfer: 65000,
    stock: true,
    sizes: ['XS','S','M','L','XL'],
    img: 'https://d22fxaf9t8d39k.cloudfront.net/2f48169081ce91ff88a49af15c426622cec9de693b9fc464d80e06cd10181443437670.jpg',
    desc: 'Clásico contemporáneo. Líneas limpias, caída perfecta. La definición de la elegancia sin esfuerzo para cualquier ocasión especial.'
  },
  {
    id: 3,
    name: 'Vestido PASADOR Un Solo Hombro',
    category: 'largos',
    price: 72222,
    transfer: 65000,
    stock: true,
    sizes: ['S','M','L'],
    img: 'https://d22fxaf9t8d39k.cloudfront.net/5743f5fd5192c36f15c27f79ebd2b9d409aa4e59b57a2936b8d2719992c39481437670.jpg',
    desc: 'Diseño asimétrico de un solo hombro con detalle pasador. Vanguardia y sensualidad en una sola pieza.'
  },
  {
    id: 4,
    name: 'Vestido Tul para Atar con Drapeado y Lazo',
    category: 'largos',
    price: 90000,
    transfer: 81000,
    stock: false,
    sizes: ['XS','S','M','L'],
    img: 'https://d22fxaf9t8d39k.cloudfront.net/5baae29a1c5bb23ec73c82dc592b37d51e33d6caec0873ec0017d103044484fb437670.jpg',
    desc: 'Tul de alta calidad con drapeado artesanal y lazo como elemento protagonista. Romanticismo de couture.'
  },
  {
    id: 5,
    name: 'Vestido HALTER Mic',
    category: 'largos',
    price: 72222,
    transfer: 65000,
    stock: false,
    sizes: ['XS','S','M'],
    img: 'https://d22fxaf9t8d39k.cloudfront.net/efa92ec7cd4eb79e7af40a4bdbd2c32298617bb0a7b3e0d2cc862204965c5e9c437670.jpg',
    desc: 'Cuello halter con microdetalle. Silueta ajustada que celebra la forma femenina con refinamiento absoluto.'
  },
  {
    id: 6,
    name: 'Vestido Lentejuelas Brillos Escote V',
    category: 'largos',
    price: 113333,
    transfer: 102000,
    stock: false,
    sizes: ['S','M','L'],
    img: 'https://d22fxaf9t8d39k.cloudfront.net/2fae2b3363a8de3edb03fe1acd6e802a539c9f9b1b34389aadc17a560ba9e81e437670.jpg',
    desc: 'Lentejuelas de máximo brillo con escote en V profundo. Para las noches que merecen ser recordadas.'
  },
  {
    id: 7,
    name: 'Vestido Lentejuelas Brillos Cuello Redondo',
    category: 'largos',
    price: 130000,
    transfer: 117000,
    stock: true,
    sizes: ['XS','S','M','L','XL'],
    img: 'https://d22fxaf9t8d39k.cloudfront.net/397151ee52b564f5a60dd9f7fca6523cfe2f80390c236c782a57e799fff25110437670.jpg',
    desc: 'Columna de lentejuelas con cuello redondo. Elegancia máxima, impacto visual total. Disponible en múltiples colores.'
  },
  {
    id: 8,
    name: 'Vestido Corto LENTEJONES',
    category: 'cortos',
    price: 65000,
    transfer: 58500,
    stock: false,
    sizes: ['XS','S','M','L'],
    img: 'https://d22fxaf9t8d39k.cloudfront.net/78d92e555454d06db816ca957e6d07acfdf5428486f77cc05e5fc83bca6955a1437670.jpg',
    desc: 'Mini vestido con lentejones oversized. Actitud, movimiento y brillo concentrado en una pieza corta explosiva.'
  },
  {
    id: 9,
    name: 'Vestido Corto Lentejuelas Tul',
    category: 'cortos',
    price: 85000,
    transfer: 76500,
    stock: true,
    sizes: ['XS','S','M','L'],
    img: 'https://d22fxaf9t8d39k.cloudfront.net/8372356acfa80a005455b03170dab171b7f11118281517a02480db5478583e29437670.jpg',
    desc: 'Combinación exquisita de tul y lentejuelas en versión corta. Romanticismo brillante para cocktails y galas.'
  },
  {
    id: 10,
    name: 'Vestido Strapless Drap Falda Tul Simple',
    category: 'largos',
    price: 80000,
    transfer: 72000,
    stock: false,
    sizes: ['XS','S','M'],
    img: 'https://d22fxaf9t8d39k.cloudfront.net/ce39f533e7b5c1ae7998b8624a397ab7e504e9716d5d44e2cfdb141a6250c089437670.jpg',
    desc: 'Strapless estructurado con drapeado en corpiño y falda de tul en capas. La novia moderna.'
  },
  {
    id: 11,
    name: 'Vestido Largo Lentejuelas Tul',
    category: 'largos',
    price: 132000,
    transfer: 118800,
    stock: false,
    sizes: ['XS','S','M','L'],
    img: 'https://d22fxaf9t8d39k.cloudfront.net/e91f00e74eafb985be901c55f12c7ab10c898a7f2ff15bd5307994ccdd4669e3437670.jpg',
    desc: 'El vestido más espectacular de la colección. Lentejuelas sobre base de tul en largo maxi. Imposible pasar desapercibida.'
  },
  {
    id: 12,
    name: 'Faux Fur OVER Chocolate',
    category: 'abrigos',
    price: 120000,
    transfer: 108000,
    stock: false,
    sizes: ['XS','S','M','L','XL'],
    img: 'https://d22fxaf9t8d39k.cloudfront.net/b1ca662a8eaad7618d51bd225b67b2c1ee39599e6ad2e666532daf4f8a5800f9437670.jpg',
    desc: 'Abrigo oversized de faux fur en tono chocolate. Lujo responsable, calidez máxima, estética de editorial de moda invernal.'
  }
];
/* ── STATE ───────────────────────────────────────────────── */
let cart = JSON.parse(localStorage.getItem('sc_cart') || '[]');
let activeFilter = 'todos';
let selectedModal = null;
/* ── FORMAT CURRENCY ─────────────────────────────────────── */
const fmt = n => '$' + n.toLocaleString('es-AR', { minimumFractionDigits: 0 });
/* ── CUSTOM CURSOR ───────────────────────────────────────── */
function initCursor() {
  const dot  = document.querySelector('.cursor-dot');
  const ring = document.querySelector('.cursor-ring');
  if (!dot || !ring) return;
  let mx = -100, my = -100, rx = -100, ry = -100;
  document.addEventListener('mousemove', e => {
    mx = e.clientX; my = e.clientY;
    dot.style.left = mx + 'px';
    dot.style.top  = my + 'px';
  });
  (function animRing() {
    rx += (mx - rx) * 0.12;
    ry += (my - ry) * 0.12;
    ring.style.left = rx + 'px';
    ring.style.top  = ry + 'px';
    requestAnimationFrame(animRing);
  })();
  document.querySelectorAll('a, button, .product-card, .filter-btn').forEach(el => {
    el.addEventListener('mouseenter', () => ring.classList.add('hovered'));
    el.addEventListener('mouseleave', () => ring.classList.remove('hovered'));
  });
}
/* ── NAVBAR SCROLL ───────────────────────────────────────── */
function initNavbar() {
  const nav = document.getElementById('navbar');
  const hamburger = document.querySelector('.nav-hamburger');
  const navLinks  = document.querySelector('.nav-links');
  window.addEventListener('scroll', () => {
    nav.classList.toggle('scrolled', window.scrollY > 60);
  });
  if (hamburger && navLinks) {
    hamburger.addEventListener('click', () => {
      hamburger.classList.toggle('open');
      navLinks.classList.toggle('mobile-open');
    });
    navLinks.querySelectorAll('a').forEach(a => {
      a.addEventListener('click', () => {
        hamburger.classList.remove('open');
        navLinks.classList.remove('mobile-open');
      });
    });
  }
}
/* ── REVEAL ON SCROLL ────────────────────────────────────── */
function initReveal() {
  const els = document.querySelectorAll('.reveal');
  const obs = new IntersectionObserver(entries => {
    entries.forEach(e => { if (e.isIntersecting) { e.target.classList.add('visible'); obs.unobserve(e.target); } });
  }, { threshold: 0.12 });
  els.forEach(el => obs.observe(el));
}
/* ── TOAST NOTIFICATION ──────────────────────────────────── */
function showToast(title, sub) {
  const t = document.getElementById('toast');
  t.querySelector('.toast-text p').textContent = title;
  t.querySelector('.toast-text small').textContent = sub;
  t.classList.add('show');
  setTimeout(() => t.classList.remove('show'), 3000);
}
/* ── CART LOGIC ──────────────────────────────────────────── */
function saveCart() { localStorage.setItem('sc_cart', JSON.stringify(cart)); }
function addToCart(product, size) {
  const key = `${product.id}-${size}`;
  const existing = cart.find(i => i.key === key);
  if (existing) {
    existing.qty++;
  } else {
    cart.push({ key, id: product.id, name: product.name, size, price: product.transfer, img: product.img, qty: 1 });
  }
  saveCart();
  updateCartBadge();
  renderCart();
  showToast('Agregado al carrito', `${product.name} — Talle ${size}`);
}
function removeFromCart(key) {
  cart = cart.filter(i => i.key !== key);
  saveCart();
  updateCartBadge();
  renderCart();
}
function changeQty(key, delta) {
  const item = cart.find(i => i.key === key);
  if (!item) return;
  item.qty = Math.max(1, item.qty + delta);
  saveCart();
  updateCartBadge();
  renderCart();
}
function updateCartBadge() {
  const total = cart.reduce((s, i) => s + i.qty, 0);
  const badge = document.querySelector('.cart-badge');
  if (!badge) return;
  badge.textContent = total;
  badge.classList.toggle('visible', total > 0);
}
function renderCart() {
  const body   = document.getElementById('cart-body');
  const footer = document.getElementById('cart-footer');
  if (!body) return;
  if (cart.length === 0) {
    body.innerHTML = `
      <div class="cart-empty">
        <svg width="48" height="48" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1"><circle cx="9" cy="21" r="1"/><circle cx="20" cy="21" r="1"/><path d="M1 1h4l2.68 13.39a2 2 0 0 0 2 1.61h9.72a2 2 0 0 0 2-1.61L23 6H6"/></svg>
        <p>Tu carrito está vacío.<br>Explorá nuestra colección.</p>
      </div>`;
    if (footer) footer.style.display = 'none';
    return;
  }
  if (footer) footer.style.display = 'flex';
  const subtotal = cart.reduce((s, i) => s + i.price * i.qty, 0);
  body.innerHTML = cart.map(item => `
    <div class="cart-item" data-key="${item.key}">
      <img class="cart-item-img" src="${item.img}" alt="${item.name}" loading="lazy">
      <div>
        <p class="cart-item-name">${item.name}</p>
        <p class="cart-item-size">Talle: ${item.size}</p>
        <p class="cart-item-price">${fmt(item.price)}</p>
        <div class="cart-qty">
          <button class="qty-btn" onclick="changeQty('${item.key}', -1)">−</button>
          <span class="qty-num">${item.qty}</span>
          <button class="qty-btn" onclick="changeQty('${item.key}', 1)">+</button>
        </div>
      </div>
      <button class="cart-remove" onclick="removeFromCart('${item.key}')" title="Eliminar">
        <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5"><path d="M18 6L6 18M6 6l12 12"/></svg>
      </button>
    </div>`).join('');
  if (footer) {
    footer.querySelector('.subtotal-val').textContent = fmt(subtotal);
    footer.querySelector('.total-val').textContent = fmt(subtotal);
  }
}
function buildWhatsAppMessage() {
  const lines = cart.map(i => `• ${i.name} (T. ${i.size}) x${i.qty} — ${fmt(i.price * i.qty)}`);
  const total = cart.reduce((s, i) => s + i.price * i.qty, 0);
  const msg = [
    '¡Hola! Quiero realizar el siguiente pedido de Studio C Nordelta:',
    '',
    ...lines,
    '',
    `*TOTAL (con 10% descuento transferencia): ${fmt(total)}*`,
    '',
    'Aguardo instrucciones de pago. ¡Gracias!'
  ].join('\n');
  return encodeURIComponent(msg);
}
function sendToWhatsApp() {
  if (cart.length === 0) return;
  const msg = buildWhatsAppMessage();
  window.open(`https://wa.me/541128786544?text=${msg}`, '_blank');
}
/* ── CART DRAWER ─────────────────────────────────────────── */
function initCartDrawer() {
  const overlay = document.querySelector('.cart-overlay');
  const drawer  = document.getElementById('cart-drawer');
  const openBtn = document.querySelector('.nav-cart-btn');
  const closeBtn = document.querySelector('.cart-close');
  function openCart() {
    drawer.classList.add('open');
    overlay.classList.add('open');
    document.body.style.overflow = 'hidden';
  }
  function closeCart() {
    drawer.classList.remove('open');
    overlay.classList.remove('open');
    document.body.style.overflow = '';
  }
  openBtn?.addEventListener('click', openCart);
  closeBtn?.addEventListener('click', closeCart);
  overlay?.addEventListener('click', e => { if (e.target === overlay) closeCart(); });
  document.querySelector('.cart-wa-btn')?.addEventListener('click', sendToWhatsApp);
}
/* ── PRODUCT GRID ────────────────────────────────────────── */
function renderProducts(filter = 'todos') {
  const grid = document.getElementById('products-grid');
  if (!grid) return;
  const filtered = filter === 'todos' ? CATALOG : CATALOG.filter(p => p.category === filter);
  grid.innerHTML = filtered.map(p => `
    <article class="product-card" data-id="${p.id}" data-stock="${p.stock}">
      <div class="product-img-wrap">
        <img src="${p.img}" alt="${p.name}" loading="lazy">
        ${p.stock
          ? '<span class="product-badge">Disponible</span>'
          : '<span class="product-badge out">Sin Stock</span>'
        }
        <div class="product-overlay">
          <button class="product-add-btn"
            onclick="handleQuickAdd(${p.id}, event)"
            ${!p.stock ? 'disabled' : ''}>
            ${p.stock ? 'Agregar al Carrito' : 'Sin Stock'}
          </button>
        </div>
      </div>
      <div class="product-info">
        <h3 class="product-name">${p.name}</h3>
        <div class="product-prices">
          <span class="price-original">${fmt(p.price)}</span>
          <span class="price-transfer">${fmt(p.transfer)}</span>
          <span class="price-label">transferencia</span>
        </div>
      </div>
      <div class="size-selector" id="sizes-${p.id}">
        ${p.sizes.map(s => `<button class="size-btn" onclick="selectSize(this, ${p.id}, '${s}')">${s}</button>`).join('')}
      </div>
    </article>`).join('');
  // Click card to open modal
  grid.querySelectorAll('.product-card').forEach(card => {
    card.addEventListener('click', e => {
      if (e.target.closest('.size-btn') || e.target.closest('.product-add-btn')) return;
      openModal(Number(card.dataset.id));
    });
  });
}
function selectSize(btn, productId, size) {
  document.querySelectorAll(`#sizes-${productId} .size-btn`).forEach(b => b.classList.remove('selected'));
  btn.classList.add('selected');
  btn.closest('.product-card').dataset.selectedSize = size;
}
function handleQuickAdd(productId, e) {
  e.stopPropagation();
  const card = document.querySelector(`.product-card[data-id="${productId}"]`);
  const size = card?.dataset.selectedSize;
  const product = CATALOG.find(p => p.id === productId);
  if (!product || !product.stock) return;
  if (!size) {
    showToast('Seleccioná un talle', 'Por favor elegí tu talle antes de agregar');
    return;
  }
  addToCart(product, size);
}
/* ── FILTER BAR ──────────────────────────────────────────── */
function initFilters() {
  document.querySelectorAll('.filter-btn').forEach(btn => {
    btn.addEventListener('click', () => {
      document.querySelectorAll('.filter-btn').forEach(b => b.classList.remove('active'));
      btn.classList.add('active');
      activeFilter = btn.dataset.filter;
      renderProducts(activeFilter);
      initReveal(); // re-init for new cards
    });
  });
}
/* ── PRODUCT MODAL ───────────────────────────────────────── */
function openModal(productId) {
  const p = CATALOG.find(x => x.id === productId);
  if (!p) return;
  selectedModal = p;
  const overlay = document.getElementById('product-modal');
  overlay.querySelector('.modal-img').src = p.img;
  overlay.querySelector('.modal-img').alt = p.name;
  overlay.querySelector('.modal-name').textContent = p.name;
  overlay.querySelector('.modal-price-original').textContent = fmt(p.price);
  overlay.querySelector('.modal-price-transfer').textContent = fmt(p.transfer);
  overlay.querySelector('.modal-desc').textContent = p.desc;
  overlay.querySelector('.modal-status').textContent = p.stock ? '✓ Disponible' : '✗ Sin Stock';
  overlay.querySelector('.modal-status').style.color = p.stock ? 'var(--gold)' : 'var(--text-sub)';
  const sizesWrap = overlay.querySelector('.modal-sizes');
  sizesWrap.innerHTML = p.sizes.map(s =>
    `<button class="size-btn" onclick="selectModalSize(this, '${s}')">${s}</button>`
  ).join('');
  const addBtn = overlay.querySelector('.modal-add-btn');
  addBtn.disabled = !p.stock;
  addBtn.textContent = p.stock ? 'Agregar al Carrito' : 'Sin Stock';
  overlay.classList.add('open');
  document.body.style.overflow = 'hidden';
}
function closeModal() {
  document.getElementById('product-modal').classList.remove('open');
  document.body.style.overflow = '';
  selectedModal = null;
}
function selectModalSize(btn, size) {
  document.querySelectorAll('.modal-sizes .size-btn').forEach(b => b.classList.remove('selected'));
  btn.classList.add('selected');
}
function handleModalAdd() {
  if (!selectedModal) return;
  const selected = document.querySelector('.modal-sizes .size-btn.selected');
  if (!selected) { showToast('Seleccioná un talle', 'Por favor elegí tu talle antes de agregar'); return; }
  addToCart(selectedModal, selected.textContent.trim());
  closeModal();
}
function initModal() {
  document.querySelector('.modal-close')?.addEventListener('click', closeModal);
  document.getElementById('product-modal')?.addEventListener('click', e => {
    if (e.target.id === 'product-modal') closeModal();
  });
  document.querySelector('.modal-add-btn')?.addEventListener('click', handleModalAdd);
}
/* ── BOOKING FORM ────────────────────────────────────────── */
function initBooking() {
  const form    = document.getElementById('booking-form');
  const success = document.getElementById('booking-success');
  if (!form) return;
  // Min date = tomorrow
  const dateInput = form.querySelector('input[name="date"]');
  if (dateInput) {
    const tomorrow = new Date();
    tomorrow.setDate(tomorrow.getDate() + 1);
    dateInput.min = tomorrow.toISOString().split('T')[0];
  }
  form.addEventListener('submit', e => {
    e.preventDefault();
    const data = Object.fromEntries(new FormData(form));
    // Build WhatsApp message
    const msg = encodeURIComponent(
      `¡Hola! Quiero reservar una Cita VIP en Studio C Nordelta:\n\n` +
      `👤 *Nombre:* ${data.name}\n` +
      `📱 *Teléfono:* ${data.phone}\n` +
      `📅 *Fecha:* ${data.date}\n` +
      `🕐 *Horario:* ${data.time}\n` +
      `🎀 *Motivo:* ${data.occasion}\n` +
      (data.notes ? `📝 *Notas:* ${data.notes}\n` : '') +
      `\nAguardo confirmación. ¡Gracias!`
    );
    window.open(`https://wa.me/541128786544?text=${msg}`, '_blank');
    form.style.display = 'none';
    success.classList.add('show');
  });
}
/* ── ANIMATED COUNTER ────────────────────────────────────── */
function initCounters() {
  const counters = document.querySelectorAll('.count-up');
  const obs = new IntersectionObserver(entries => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        const el = entry.target;
        const target = parseInt(el.dataset.target, 10);
        const duration = 1800;
        const step = 16;
        const increment = target / (duration / step);
        let current = 0;
        const timer = setInterval(() => {
          current += increment;
          if (current >= target) { current = target; clearInterval(timer); }
          el.textContent = Math.floor(current).toLocaleString('es-AR') + (el.dataset.suffix || '');
        }, step);
        obs.unobserve(el);
      }
    });
  }, { threshold: 0.5 });
  counters.forEach(el => obs.observe(el));
}
/* ── PARALLAX HERO ───────────────────────────────────────── */
function initParallax() {
  const heroBg = document.querySelector('.hero-bg');
  if (!heroBg) return;
  window.addEventListener('scroll', () => {
    if (window.scrollY < window.innerHeight) {
      heroBg.style.transform = `scale(1.05) translateY(${window.scrollY * 0.3}px)`;
    }
  }, { passive: true });
}
/* ── MARQUEE CLONE ───────────────────────────────────────── */
function initMarquee() {
  const inner = document.querySelector('.marquee-inner');
  if (!inner) return;
  inner.innerHTML += inner.innerHTML;
}
/* ── INIT ────────────────────────────────────────────────── */
document.addEventListener('DOMContentLoaded', () => {
  initCursor();
  initNavbar();
  initReveal();
  initParallax();
  initMarquee();
  renderProducts();
  initFilters();
  initCartDrawer();
  initModal();
  initBooking();
  initCounters();
  updateCartBadge();
  renderCart();
});
