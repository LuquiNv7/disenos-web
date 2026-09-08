/* ==========================================================================
   AA BARBERÍA - ABEL ACOSTA | LOGIC & LOCALSTORAGE CONTROLLER
   ========================================================================== */
  } else {
    try {
      DB = JSON.parse(stored);
      // Ensure fallbacks
      if (!DB.admin) DB.admin = DEFAULT_DATA.admin;
      if (!DB.prices) DB.prices = DEFAULT_DATA.prices;
      if (!DB.users) DB.users = DEFAULT_DATA.users;
}
function showAuth() {
  document.getElementById("main-header").classList.add("hidden");
  document.getElementById("bottom-nav").classList.add("hidden");
  const header = document.getElementById("main-header");
  const nav = document.getElementById("bottom-nav");
  if (header) { header.classList.add("hidden"); header.style.display = "none"; }
  if (nav) { nav.classList.add("hidden"); nav.style.display = "none"; }
  
  // Hide all main content views, show auth view
  document.querySelectorAll(".view-section").forEach(sec => sec.classList.add("hidden"));
  document.getElementById("view-auth").classList.remove("hidden");
  document.querySelectorAll(".view-section").forEach(sec => {
    sec.classList.add("hidden");
    sec.style.display = "none";
  });
  
  const authView = document.getElementById("view-auth");
  if (authView) {
    authView.classList.remove("hidden");
    authView.style.display = "flex";
  }
}
function showApp() {
  document.getElementById("main-header").classList.remove("hidden");
  document.getElementById("bottom-nav").classList.remove("hidden");
  document.getElementById("view-auth").classList.add("hidden");
  const header = document.getElementById("main-header");
  const nav = document.getElementById("bottom-nav");
  if (header) { header.classList.remove("hidden"); header.style.display = "flex"; }
  if (nav) { nav.classList.remove("hidden"); nav.style.display = "block"; }
  // Set Header User Info
  const authView = document.getElementById("view-auth");
  if (authView) { authView.classList.add("hidden"); authView.style.display = "none"; }
  const headerName = document.getElementById("user-header-name");
  const headerRole = document.getElementById("user-header-role");
  
  if (currentUser.role === "admin") {
    headerName.textContent = "Abel Acosta";
    headerRole.textContent = "Barbero (Admin)";
    if (headerName) headerName.textContent = "Abel Acosta";
    if (headerRole) headerRole.textContent = "Barbero (Admin)";
  } else {
    headerName.textContent = currentUser.name;
    headerRole.textContent = "Cliente VIP";
    if (headerName) headerName.textContent = currentUser.name;
    if (headerRole) headerRole.textContent = "Cliente VIP";
  }
  // Bind logout
  document.getElementById("logout-btn").onclick = handleLogout;
  const logoutBtn = document.getElementById("logout-btn");
  if (logoutBtn) logoutBtn.onclick = handleLogout;
  // Render prices across UI
  renderPricesUI();
  // Render Navigation Bar for Role
  renderBottomNav();
  // Default tab based on role
  if (currentUser.role === "admin") {
    switchTab("admin-caja");
  } else {
  const regForm = document.getElementById("form-register");
  if (mode === "login") {
    loginBtn.classList.add("active");
    regBtn.classList.remove("active");
    loginForm.classList.remove("hidden-form");
    regForm.classList.add("hidden-form");
    if (loginBtn) loginBtn.classList.add("active");
    if (regBtn) regBtn.classList.remove("active");
    if (loginForm) { loginForm.classList.remove("hidden-form"); loginForm.style.display = "flex"; }
    if (regForm) { regForm.classList.add("hidden-form"); regForm.style.display = "none"; }
  } else {
    regBtn.classList.add("active");
    loginBtn.classList.remove("active");
    regForm.classList.remove("hidden-form");
    loginForm.classList.add("hidden-form");
    if (regBtn) regBtn.classList.add("active");
    if (loginBtn) loginBtn.classList.remove("active");
    if (regForm) { regForm.classList.remove("hidden-form"); regForm.style.display = "flex"; }
    if (loginForm) { loginForm.classList.add("hidden-form"); loginForm.style.display = "none"; }
  }
}
// --- NAVIGATION & VIEWS CONTROLLER ---
function renderBottomNav() {
  const container = document.getElementById("nav-items-container");
  if (!container) return;
  container.innerHTML = "";
  if (currentUser.role === "client") {
}
function switchTab(tabId) {
  // Hide all sections
  document.querySelectorAll(".view-section").forEach(sec => sec.classList.add("hidden"));
  document.querySelectorAll(".view-section").forEach(sec => {
    sec.classList.add("hidden");
    sec.style.display = "none";
  });
  
  // Deactivate nav buttons
  document.querySelectorAll(".nav-item").forEach(item => item.classList.remove("active"));
  // Activate view
  const targetView = document.getElementById(`view-${tabId}`);
  if (targetView) targetView.classList.remove("hidden");
  if (targetView) {
    targetView.classList.remove("hidden");
    targetView.style.display = "flex";
  }
  // Activate nav button
  const targetNav = document.getElementById(`nav-${tabId}`);
  if (targetNav) targetNav.classList.add("active");
  // Trigger view renderers
  if (tabId === "client-turnos") {
    renderClientTurnos();
    renderClientMembershipBanner();
  const colorPrice = DB.prices.color || 50000;
  const comboPrice = cortePrice + colorPrice;
  // Format currency
  const formatMoney = num => "$" + Number(num).toLocaleString("es-AR");
  document.getElementById("service-price-corte").textContent = formatMoney(cortePrice);
  document.getElementById("service-price-color").textContent = formatMoney(colorPrice);
  document.getElementById("service-price-combo").textContent = formatMoney(comboPrice);
  const spCorte = document.getElementById("service-price-corte");
  const spColor = document.getElementById("service-price-color");
  const spCombo = document.getElementById("service-price-combo");
  if (spCorte) spCorte.textContent = formatMoney(cortePrice);
  if (spColor) spColor.textContent = formatMoney(colorPrice);
  if (spCombo) spCombo.textContent = formatMoney(comboPrice);
  const dCorte = document.getElementById("display-price-corte");
  const dColor = document.getElementById("display-price-color");
function loadAvailableSlots() {
  const dateInput = document.getElementById("booking-date");
  const grid = document.getElementById("slots-grid");
  if (!grid) return;
  selectedBookingTime = null;
  document.getElementById("confirm-booking-btn").disabled = true;
  const confirmBtn = document.getElementById("confirm-booking-btn");
  if (confirmBtn) confirmBtn.disabled = true;
  if (!dateInput.value) {
  if (!dateInput || !dateInput.value) {
    grid.innerHTML = `<p class="empty-text">Selecciona una fecha válida.</p>`;
    return;
  }
  const chosenDate = new Date(dateInput.value + "T00:00:00");
  const dayOfWeek = chosenDate.getDay(); // 0: Sunday, 1: Mon, ..., 6: Sat
  const dayOfWeek = chosenDate.getDay();
  if (dayOfWeek === 0) {
    grid.innerHTML = `<p class="empty-text text-red"><i class="fa-solid fa-store-slash"></i> La barbería abre de Lunes a Sábado. Domingos cerrado.</p>`;
    return;
  }
  // Generate 30-min slots from 10:00 to 20:00
  const slots = [];
  for (let hour = 10; hour < 20; hour++) {
    const hStr = String(hour).padStart(2, '0');
    slots.push(`${hStr}:00`);
    slots.push(`${hStr}:30`);
  }
  // Filter out occupied slots
  const takenTimes = DB.appointments
    .filter(a => a.date === dateInput.value && a.status !== "Cancelado")
    .map(a => a.time);
  // Check if chosen date is Today to filter past times
  const todayStr = getTodayString();
  const now = new Date();
  const currentMinutes = now.getHours() * 60 + now.getMinutes();
  document.querySelectorAll(".slot-btn").forEach(b => b.classList.remove("selected"));
  btnElem.classList.add("selected");
  selectedBookingTime = timeStr;
  document.getElementById("confirm-booking-btn").disabled = false;
  const confirmBtn = document.getElementById("confirm-booking-btn");
  if (confirmBtn) confirmBtn.disabled = false;
}
function confirmBooking() {
  if (serviceName === "Color") price = DB.prices.color;
  if (serviceName === "Corte + Color") price = DB.prices.corte + DB.prices.color;
  // Refresh client user from DB
  const clientUser = DB.users.find(u => u.id === currentUser.id) || currentUser;
  const hasValidMembership = clientUser.hasMembership && clientUser.membershipCutsLeft > 0 && serviceName.includes("Corte");
  showToast("¡Turno agendado con éxito!", "success");
  // Clear selection
  selectedBookingTime = null;
  document.getElementById("confirm-booking-btn").disabled = true;
  const confirmBtn = document.getElementById("confirm-booking-btn");
  if (confirmBtn) confirmBtn.disabled = true;
  loadAvailableSlots();
  renderClientTurnos();
}
function renderClientMembershipBanner() {
  const banner = document.getElementById("client-membership-banner");
  const countText = document.getElementById("banner-cuts-count");
  
  if (!banner) return;
  const clientUser = DB.users.find(u => u.id === currentUser.id);
  if (clientUser && clientUser.hasMembership && clientUser.membershipCutsLeft > 0) {
    banner.classList.remove("hidden");
    countText.textContent = `Te quedan ${clientUser.membershipCutsLeft} cortes este mes.`;
    banner.style.display = "flex";
    if (countText) countText.textContent = `Te quedan ${clientUser.membershipCutsLeft} cortes este mes.`;
  } else {
    banner.classList.add("hidden");
    banner.style.display = "none";
  }
}
function renderClientTurnos() {
  const container = document.getElementById("client-active-turnos-list");
  if (!container) return;
  container.innerHTML = "";
  const myTurnos = DB.appointments
  const cutsLeftElem = document.getElementById("vip-cuts-left");
  const statusTextElem = document.getElementById("vip-status-text");
  cutsLeftElem.textContent = clientUser.membershipCutsLeft || 0;
  if (cutsLeftElem) cutsLeftElem.textContent = clientUser.membershipCutsLeft || 0;
  if (clientUser.hasMembership && clientUser.membershipCutsLeft > 0) {
    statusTextElem.textContent = "ACTIVA";
    statusTextElem.className = "status-active";
  } else {
    statusTextElem.textContent = "INACTIVA";
    statusTextElem.className = "status-inactive";
  if (statusTextElem) {
    if (clientUser.hasMembership && clientUser.membershipCutsLeft > 0) {
      statusTextElem.textContent = "ACTIVA";
      statusTextElem.className = "status-active";
    } else {
      statusTextElem.textContent = "INACTIVA";
      statusTextElem.className = "status-inactive";
    }
  }
}
function renderClientHistory() {
  const container = document.getElementById("client-history-list");
  if (!container) return;
  container.innerHTML = "";
  const historyTurnos = DB.appointments
function updateCajaMetrics() {
  const todayStr = getTodayString();
  const currentMonthStr = todayStr.substring(0, 7); // YYYY-MM
  const currentMonthStr = todayStr.substring(0, 7);
  let hoyIngresos = 0;
  let mesIngresos = 0;
  const fmt = num => "$" + Number(num).toLocaleString("es-AR");
  document.getElementById("metric-ingresos-hoy").textContent = fmt(hoyIngresos);
  document.getElementById("metric-ingresos-mes").textContent = fmt(mesIngresos);
  document.getElementById("metric-egresos-mes").textContent = fmt(mesEgresos);
  document.getElementById("metric-balance-total").textContent = fmt(totalBalance);
  const mHoy = document.getElementById("metric-ingresos-hoy");
  const mMes = document.getElementById("metric-ingresos-mes");
  const mEg = document.getElementById("metric-egresos-mes");
  const mTot = document.getElementById("metric-balance-total");
  if (mHoy) mHoy.textContent = fmt(hoyIngresos);
  if (mMes) mMes.textContent = fmt(mesIngresos);
  if (mEg) mEg.textContent = fmt(mesEgresos);
  if (mTot) mTot.textContent = fmt(totalBalance);
}
function handleSaveMovimiento(e) {
function renderAdminCajaList() {
  const container = document.getElementById("caja-movements-list");
  if (!container) return;
  container.innerHTML = "";
  const searchText = (document.getElementById("filter-mov-search").value || "").toLowerCase();
function setAdminTurnosFilter(filter) {
  adminTurnosFilter = filter;
  document.querySelectorAll("#view-admin-turnos .segment-btn").forEach(b => b.classList.remove("active"));
  document.getElementById(`admin-turnos-filter-${filter}`).classList.add("active");
  const btn = document.getElementById(`admin-turnos-filter-${filter}`);
  if (btn) btn.classList.add("active");
  renderAdminTurnos();
}
function renderAdminTurnos() {
  const container = document.getElementById("admin-turnos-list");
  if (!container) return;
  container.innerHTML = "";
  const todayStr = getTodayString();
  
  let list = DB.appointments;
  if (adminTurnosFilter === "hoy") {
    list = list.filter(a => a.date === todayStr);
  } else if (adminTurnosFilter === "semana") {
    // Upcoming 7 days
    const nextWeek = new Date();
    nextWeek.setDate(nextWeek.getDate() + 7);
    const nextWeekStr = nextWeek.toISOString().split("T")[0];
  turno.status = "Finalizado";
  turno.paid = true;
  // Deduct membership cut if client has active membership
  const clientUser = DB.users.find(u => u.id === turno.clientId);
  let deductedNote = "";
  
  if (clientUser && clientUser.hasMembership && clientUser.membershipCutsLeft > 0) {
    clientUser.membershipCutsLeft -= 1;
    deductedNote = ` (Se descontó 1 corte de membresía. Restantes: ${clientUser.membershipCutsLeft})`;
  } else if (!turno.usedMembership) {
    // Log income in Caja automatically
    DB.movements.push({
      id: "mov_" + Date.now(),
      date: getTodayString(),
// 3. CLIENTES & MEMBRESÍAS
function renderAdminClientsList() {
  const container = document.getElementById("admin-clients-list");
  if (!container) return;
  container.innerHTML = "";
  const searchText = (document.getElementById("filter-clients-search").value || "").toLowerCase();
  client.membershipCutsLeft = 4;
  client.membershipExpiry = "2026-12-31";
  // Automatically register membership sale in Caja
  DB.movements.push({
    id: "mov_" + Date.now(),
    date: getTodayString(),
// 4. PRECIOS Y AJUSTES ADMIN
function loadAdminPriceInputs() {
  document.getElementById("admin-price-corte").value = DB.prices.corte || 18000;
  document.getElementById("admin-price-color").value = DB.prices.color || 50000;
  const c = document.getElementById("admin-price-corte");
  const col = document.getElementById("admin-price-color");
  if (c) c.value = DB.prices.corte || 18000;
  if (col) col.value = DB.prices.color || 50000;
}
function handleUpdatePrices(e) {
  const toast = document.getElementById("toast");
  const toastMsg = document.getElementById("toast-msg");
  const toastIcon = document.getElementById("toast-icon");
  if (!toast) return;
  toastMsg.textContent = msg;
  
  if (type === "success") {
    toastIcon.className = "fa-solid fa-circle-check text-green";
  } else if (type === "error") {
    toastIcon.className = "fa-solid fa-circle-exclamation text-red";
  } else {
    toastIcon.className = "fa-solid fa-circle-info text-gold";
  }
  toast.classList.remove("hidden");
  toast.style.display = "flex";
  setTimeout(() => {
    toast.classList.add("hidden");
    toast.style.display = "none";
  }, 3000);
}
function openModal(contentHTML) {
  const backdrop = document.getElementById("modal-backdrop");
  const body = document.getElementById("modal-body");
  if (!backdrop || !body) return;
  body.innerHTML = contentHTML;
  backdrop.classList.remove("hidden");
  backdrop.style.display = "flex";
}
function closeModal(e) {
  if (e.target.id === "modal-backdrop") {
    closeModalForce();
  }
}
function closeModalForce() {
  document.getElementById("modal-backdrop").classList.add("hidden");
  const backdrop = document.getElementById("modal-backdrop");
  if (backdrop) {
    backdrop.classList.add("hidden");
    backdrop.style.display = "none";
  }
}
