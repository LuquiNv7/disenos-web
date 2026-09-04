/**
 * PHŌNE - Interactive Landing Page Logic
 * Features: Mobile drawer, sticky header, category filtering, WhatsApp inquiry modal.
 */
document.addEventListener('DOMContentLoaded', () => {
  initStickyHeader();
  initMobileMenu();
  initProductFiltering();
  initPurchaseModal();
  initSmoothScroll();
});
/**
 * 1. STICKY HEADER SCROLL EFFECT
 */
function initStickyHeader() {
  const header = document.getElementById('header');
  if (!header) return;
  const handleScroll = () => {
    if (window.scrollY > 30) {
      header.classList.add('scrolled');
    } else {
      header.classList.remove('scrolled');
    }
  };
  window.addEventListener('scroll', handleScroll, { passive: true });
  handleScroll(); // Initial check
}
/**
 * 2. MOBILE MENU DRAWER
 */
function initMobileMenu() {
  const mobileToggle = document.getElementById('mobileToggle');
  const mobileClose = document.getElementById('mobileClose');
  const mobileOverlay = document.getElementById('mobileMenuOverlay');
  const mobileNavLinks = document.querySelectorAll('.mobile-nav-link');
  if (!mobileToggle || !mobileOverlay) return;
  const openMenu = () => {
    mobileOverlay.classList.add('open');
    document.body.style.overflow = 'hidden';
  };
  const closeMenu = () => {
    mobileOverlay.classList.remove('open');
    document.body.style.overflow = '';
  };
  mobileToggle.addEventListener('click', openMenu);
  if (mobileClose) mobileClose.addEventListener('click', closeMenu);
  // Close menu when clicking backdrop
  mobileOverlay.addEventListener('click', (e) => {
    if (e.target === mobileOverlay) closeMenu();
  });
  // Close menu when clicking nav links
  mobileNavLinks.forEach(link => {
    link.addEventListener('click', (e) => {
      closeMenu();
      const filterCat = link.getAttribute('data-filter');
      if (filterCat) {
        filterProducts(filterCat);
      }
    });
  });
}
/**
 * 3. PRODUCT CATEGORY FILTERING (TODOS / IPHONE / SAMSUNG)
 */
function initProductFiltering() {
  const tabBtns = document.querySelectorAll('.tab-btn');
  const filterNavLinks = document.querySelectorAll('[data-filter]');
  tabBtns.forEach(btn => {
    btn.addEventListener('click', () => {
      const category = btn.getAttribute('data-category');
      
      // Update active tab styling
      tabBtns.forEach(b => b.classList.remove('active'));
      btn.classList.add('active');
      filterProducts(category);
    });
  });
  filterNavLinks.forEach(link => {
    link.addEventListener('click', (e) => {
      const filterVal = link.getAttribute('data-filter');
      if (filterVal) {
        filterProducts(filterVal);
        // Sync main tab buttons
        tabBtns.forEach(b => {
          if (b.getAttribute('data-category') === filterVal) {
            b.classList.add('active');
          } else {
            b.classList.remove('active');
          }
        });
      }
    });
  });
}
function filterProducts(category) {
  const productCards = document.querySelectorAll('.product-card');
  productCards.forEach(card => {
    const cardCat = card.getAttribute('data-category');
    if (category === 'todos' || cardCat === category) {
      card.style.display = 'flex';
      card.style.opacity = '1';
      card.style.transform = 'translateY(0)';
    } else {
      card.style.opacity = '0';
      card.style.transform = 'scale(0.95)';
      setTimeout(() => {
        card.style.display = 'none';
      }, 200);
    }
  });
}
/**
 * 4. PURCHASE INQUIRY MODAL & WHATSAPP INTEGRATION
 */
function initPurchaseModal() {
  const modal = document.getElementById('purchaseModal');
  const modalClose = document.getElementById('modalClose');
  const modalCancelBtn = document.getElementById('modalCancelBtn');
  const modalWhatsappBtn = document.getElementById('modalWhatsappBtn');
  const modalName = document.getElementById('modalProductName');
  const modalPrice = document.getElementById('modalProductPrice');
  const modalImg = document.getElementById('modalProductImg');
  const buyBtns = document.querySelectorAll('.buy-btn');
  if (!modal) return;
  let currentProductData = { name: '', price: '' };
  const openModal = (productName, productPrice, productImg) => {
    currentProductData = { name: productName, price: productPrice };
    if (modalName) modalName.textContent = productName;
    if (modalPrice) modalPrice.textContent = productPrice;
    if (modalImg && productImg) modalImg.src = productImg;
    modal.classList.add('active');
    document.body.style.overflow = 'hidden';
  };
  const closeModal = () => {
    modal.classList.remove('active');
    document.body.style.overflow = '';
  };
  buyBtns.forEach(btn => {
    btn.addEventListener('click', () => {
      const pName = btn.getAttribute('data-product') || 'Equipo';
      const pPrice = btn.getAttribute('data-price') || '$1.300.000';
      const pImg = btn.getAttribute('data-img') || 'assets/hero-phones.png';
      openModal(pName, pPrice, pImg);
    });
  });
  if (modalClose) modalClose.addEventListener('click', closeModal);
  if (modalCancelBtn) modalCancelBtn.addEventListener('click', closeModal);
  modal.addEventListener('click', (e) => {
    if (e.target === modal) closeModal();
  });
  // WhatsApp redirection
  if (modalWhatsappBtn) {
    modalWhatsappBtn.addEventListener('click', () => {
      const textMessage = `¡Hola! Vengo de la web de PHŌNE. Quisiera consultar disponibilidad del *${currentProductData.name}* publicado a *${currentProductData.price}*.`;
      const encodedMsg = encodeURIComponent(textMessage);
      
      // WhatsApp API URL (Target placeholder number - client can edit phone number)
      const whatsappUrl = `https://wa.me/?text=${encodedMsg}`;
      window.open(whatsappUrl, '_blank');
      closeModal();
    });
  }
}
/**
 * 5. SMOOTH SCROLLING FOR NAVIGATION LINKS
 */
function initSmoothScroll() {
  document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function(e) {
      const targetId = this.getAttribute('href');
      if (targetId === '#') return;
      const targetEl = document.querySelector(targetId);
      if (targetEl) {
        e.preventDefault();
        const headerOffset = 80;
        const elementPosition = targetEl.getBoundingClientRect().top;
        const offsetPosition = elementPosition + window.pageYOffset - headerOffset;
        window.scrollTo({
          top: offsetPosition,
          behavior: 'smooth'
        });
      }
    });
  });
}
