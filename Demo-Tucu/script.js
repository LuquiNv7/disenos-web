/* ==========================================================================
   AA BARBERÍA - ABEL ACOSTA | LOGIC & LOCALSTORAGE CONTROLLER
   ========================================================================== */

// Date helper at top level
function getTodayString() {
  const d = new Date();
  return `${d.getFullYear()}-${String(d.getMonth() + 1).padStart(2, '0')}-${String(d.getDate()).padStart(2, '0')}`;
}

// Initial Data Seed
const DEFAULT_DATA = {
  admin: {
    username: "admin",
    password: "admin123"
  },
  prices: {
    corte: 18000,
    color: 50000
  },
  users: [
    {
      id: "u_carlos",
      name: "Carlos Pérez",
      username: "carlosperez",
      phone: "9115551234",
      password: "123",
      hasMembership: true,
      membershipCutsLeft: 3,
      membershipExpiry: "2026-10-01"
    },
    {
      id: "u_lucas",
      name: "Lucas Gómez",
      username: "lucasgomez",
      phone: "9115559876",
      password: "123",
      hasMembership: false,
      membershipCutsLeft: 0,
      membershipExpiry: null
    }
  ],
  appointments: [
    {
      id: "app_1",
      clientId: "u_carlos",
      clientName: "Carlos Pérez",
      clientPhone: "9115551234",
      service: "Corte",
      price: 18000,
      date: getTodayString(),
      time: "15:00",
      status: "Pendiente",
      paid: false,
      usedMembership: true,
      createdAt: Date.now() - 3600000
    },
    {
      id: "app_2",
      clientId: "u_lucas",
      clientName: "Lucas Gómez",
      clientPhone: "9115559876",
      service: "Color",
      price: 50000,
      date: getTodayString(),
      time: "17:30",
      status: "Finalizado",
      paid: true,
      usedMembership: false,
      createdAt: Date.now() - 86400000
    }
  ],
  movements: [
    {
      id: "mov_1",
      date: getTodayString(),
      type: "ingreso",
      category: "Colores",
      amount: 50000,
      description: "Color cliente Lucas Gómez",
      createdAt: Date.now() - 86400000
    },
    {
      id: "mov_2",
      date: getTodayString(),
      type: "ingreso",
      category: "Membresías",
      amount: 60000,
      description: "Venta Membresía Carlos Pérez",
      createdAt: Date.now() - 172800000
    },
    {
      id: "mov_3",
      date: getTodayString(),
      type: "egreso",
      category: "Insumos Barbería",
      amount: 15000,
      description: "Compra navajas y toallas",
      createdAt: Date.now() - 200000000
    }
  ]
};

// Global App State
let DB = {};
let currentUser = null;
let selectedBookingTime = null;
let adminTurnosFilter = "hoy";
let editingMovId = null;

// Initialize App
document.addEventListener("DOMContentLoaded", () => {
  initStorage();
  checkSession();
  setupDatePickers();
});

function initStorage() {
  try {
    const stored = localStorage.getItem("aa_barberia_db");
    if (!stored) {
      DB = DEFAULT_DATA;
      saveDB();
    } else {
      DB = JSON.parse(stored);
      if (!DB.admin) DB.admin = DEFAULT_DATA.admin;
      if (!DB.prices) DB.prices = DEFAULT_DATA.prices;
      if (!DB.users) DB.users = DEFAULT_DATA.users;
      if (!DB.appointments) DB.appointments = DEFAULT_DATA.appointments;
      if (!DB.movements) DB.movements = DEFAULT_DATA.movements;
    }
  } catch (e) {
    DB = DEFAULT_DATA;
    saveDB();
  }
}

function saveDB() {
  try {
    localStorage.setItem("aa_barberia_db", JSON.stringify(DB));
  } catch (e) {
    console.error("Error al guardar en LocalStorage", e);
  }
}

// Session Logic
function checkSession() {
  try {
    const sess = localStorage.getItem("aa_barberia_session");
    if (sess) {
      currentUser = JSON.parse(sess);
      showApp();
    } else {
      showAuth();
    }
  } catch (e) {
    showAuth();
  }
}

function showAuth() {
  const header = document.getElementById("main-header");
  const nav = document.getElementById("bottom-nav");
  if (header) header.classList.remove("active");
  if (nav) nav.classList.remove("active");

  document.querySelectorAll(".view-section").forEach(s => s.classList.remove("active"));
  const authView = document.getElementById("view-auth");
  if (authView) authView.classList.add("active");
}

function showApp() {
  const header = document.getElementById("main-header");
  const nav = document.getElementById("bottom-nav");
  if (header) header.classList.add("active");
  if (nav) nav.classList.add("active");

  const authView = document.getElementById("view-auth");
  if (authView) authView.classList.remove("active");

  const headerName = document.getElementById("user-header-name");
  const headerRole = document.getElementById("user-header-role");

  if (currentUser.role === "admin") {
    if (headerName) headerName.textContent = "Abel Acosta";
    if (headerRole) headerRole.textContent = "Barbero (Admin)";
  } else {
    if (headerName) headerName.textContent = currentUser.name;
    if (headerRole) headerRole.textContent = "Cliente VIP";
  }

  const logoutBtn = document.getElementById("logout-btn");
  if (logoutBtn) logoutBtn.onclick = handleLogout;

  renderPricesUI();
  renderBottomNav();

  if (currentUser.role === "admin") {
    switchTab("admin-caja");
  } else {
    switchTab("client-turnos");
  }
}

function switchAuthMode(mode) {
  const loginBtn = document.getElementById("tab-login-btn");
  const regBtn = document.getElementById("tab-register-btn");
  const loginForm = document.getElementById("form-login");
  const regForm = document.getElementById("form-register");

  if (mode === "login") {
    if (loginBtn) loginBtn.classList.add("active");
    if (regBtn) regBtn.classList.remove("active");
    if (loginForm) loginForm.classList.add("active");
    if (regForm) regForm.classList.remove("active");
  } else {
    if (regBtn) regBtn.classList.add("active");
    if (loginBtn) loginBtn.classList.remove("active");
    if (regForm) regForm.classList.add("active");
    if (loginForm) loginForm.classList.remove("active");
  }
}

function fillAdminCredentials() {
  document.getElementById("login-username").value = "admin";
  document.getElementById("login-password").value = DB.admin.password || "admin123";
  showToast("Credenciales de Barbero cargadas", "success");
}

function handleLogin(e) {
  e.preventDefault();
  const userVal = document.getElementById("login-username").value.trim().toLowerCase();
  const passVal = document.getElementById("login-password").value.trim();

  if (userVal === DB.admin.username.toLowerCase() && passVal === DB.admin.password) {
    currentUser = { id: "admin", name: "Abel Acosta", role: "admin" };
    localStorage.setItem("aa_barberia_session", JSON.stringify(currentUser));
    showToast("¡Bienvenido, Abel!", "success");
    showApp();
    return;
  }

  const foundClient = DB.users.find(
    u => (u.username.toLowerCase() === userVal || u.phone === userVal) && u.password === passVal
  );

  if (foundClient) {
    currentUser = { ...foundClient, role: "client" };
    localStorage.setItem("aa_barberia_session", JSON.stringify(currentUser));
    showToast(`¡Hola, ${foundClient.name}!`, "success");
    showApp();
  } else {
    showToast("Usuario o contraseña incorrectos", "error");
  }
}

function handleRegister(e) {
  e.preventDefault();
  const name = document.getElementById("reg-name").value.trim();
  const username = document.getElementById("reg-username").value.trim().toLowerCase();
  const phone = document.getElementById("reg-phone").value.trim();
  const password = document.getElementById("reg-password").value.trim();

  if (username === "admin") {
    showToast("Ese usuario está reservado para el barbero", "error");
    return;
  }

  const exists = DB.users.some(u => u.username.toLowerCase() === username || u.phone === phone);
  if (exists) {
    showToast("Ya existe un cliente con ese usuario o teléfono", "error");
    return;
  }

  const newUser = {
    id: "u_" + Date.now(),
    name,
    username,
    phone,
    password,
    hasMembership: false,
    membershipCutsLeft: 0,
    membershipExpiry: null
  };

  DB.users.push(newUser);
  saveDB();

  currentUser = { ...newUser, role: "client" };
  localStorage.setItem("aa_barberia_session", JSON.stringify(currentUser));
  showToast("¡Registro exitoso!", "success");
  showApp();
}

function handleLogout() {
  currentUser = null;
  localStorage.removeItem("aa_barberia_session");
  showToast("Sesión cerrada", "info");
  showAuth();
}

// Navigation Tabs Renderer
function renderBottomNav() {
  const container = document.getElementById("nav-items-container");
  if (!container) return;
  container.innerHTML = "";

  if (currentUser.role === "client") {
    container.innerHTML = `
      <button class="nav-item" onclick="switchTab('client-turnos')" id="nav-client-turnos">
        <i class="fa-solid fa-calendar-check"></i>
        <span>Turnos</span>
      </button>
      <button class="nav-item" onclick="switchTab('client-membresia')" id="nav-client-membresia">
        <i class="fa-solid fa-crown"></i>
        <span>Membresía</span>
      </button>
      <button class="nav-item" onclick="switchTab('client-precios')" id="nav-client-precios">
        <i class="fa-solid fa-tags"></i>
        <span>Precios</span>
      </button>
      <button class="nav-item" onclick="switchTab('client-historial')" id="nav-client-historial">
        <i class="fa-solid fa-clock-rotate-left"></i>
        <span>Historial</span>
      </button>
    `;
  } else {
    container.innerHTML = `
      <button class="nav-item" onclick="switchTab('admin-caja')" id="nav-admin-caja">
        <i class="fa-solid fa-cash-register"></i>
        <span>Caja</span>
      </button>
      <button class="nav-item" onclick="switchTab('admin-turnos')" id="nav-admin-turnos">
        <i class="fa-solid fa-calendar-days"></i>
        <span>Turnos</span>
      </button>
      <button class="nav-item" onclick="switchTab('admin-membresias')" id="nav-admin-membresias">
        <i class="fa-solid fa-users"></i>
        <span>Clientes</span>
      </button>
      <button class="nav-item" onclick="switchTab('admin-precios')" id="nav-admin-precios">
        <i class="fa-solid fa-sliders"></i>
        <span>Ajustes</span>
      </button>
    `;
  }
}

function switchTab(tabId) {
  document.querySelectorAll(".view-section").forEach(s => s.classList.remove("active"));
  document.querySelectorAll(".nav-item").forEach(i => i.classList.remove("active"));

  const targetView = document.getElementById(`view-${tabId}`);
  if (targetView) targetView.classList.add("active");

  const targetNav = document.getElementById(`nav-${tabId}`);
  if (targetNav) targetNav.classList.add("active");

  if (tabId === "client-turnos") {
    renderClientTurnos();
    renderClientMembershipBanner();
  } else if (tabId === "client-membresia") {
    renderClientMembership();
  } else if (tabId === "client-precios") {
    renderPricesUI();
  } else if (tabId === "client-historial") {
    renderClientHistory();
  } else if (tabId === "admin-caja") {
    renderAdminCaja();
  } else if (tabId === "admin-turnos") {
    renderAdminTurnos();
  } else if (tabId === "admin-membresias") {
    renderAdminClientsList();
  } else if (tabId === "admin-precios") {
    loadAdminPriceInputs();
  }
}

// Client Handlers
function renderPricesUI() {
  const cortePrice = DB.prices.corte || 18000;
  const colorPrice = DB.prices.color || 50000;
  const comboPrice = cortePrice + colorPrice;

  const formatMoney = num => "$" + Number(num).toLocaleString("es-AR");

  const spCorte = document.getElementById("service-price-corte");
  const spColor = document.getElementById("service-price-color");
  const spCombo = document.getElementById("service-price-combo");
  if (spCorte) spCorte.textContent = formatMoney(cortePrice);
  if (spColor) spColor.textContent = formatMoney(colorPrice);
  if (spCombo) spCombo.textContent = formatMoney(comboPrice);

  const dCorte = document.getElementById("display-price-corte");
  const dColor = document.getElementById("display-price-color");
  if (dCorte) dCorte.textContent = formatMoney(cortePrice);
  if (dColor) dColor.textContent = formatMoney(colorPrice);
}

function setupDatePickers() {
  const dateInput = document.getElementById("booking-date");
  if (dateInput) {
    const today = getTodayString();
    dateInput.min = today;
    dateInput.value = today;
  }
  const movDate = document.getElementById("mov-fecha");
  if (movDate) {
    movDate.value = getTodayString();
  }
}

function selectServiceOption(labelElem, serviceName) {
  document.querySelectorAll(".service-option").forEach(opt => opt.classList.remove("active"));
  labelElem.classList.add("active");
  const radio = labelElem.querySelector('input[type="radio"]');
  if (radio) radio.checked = true;
}

function loadAvailableSlots() {
  const dateInput = document.getElementById("booking-date");
  const grid = document.getElementById("slots-grid");
  if (!grid) return;
  selectedBookingTime = null;
  const confirmBtn = document.getElementById("confirm-booking-btn");
  if (confirmBtn) confirmBtn.disabled = true;

  if (!dateInput || !dateInput.value) {
    grid.innerHTML = `<p class="empty-text">Selecciona una fecha válida.</p>`;
    return;
  }

  const chosenDate = new Date(dateInput.value + "T00:00:00");
  const dayOfWeek = chosenDate.getDay();

  if (dayOfWeek === 0) {
    grid.innerHTML = `<p class="empty-text text-red"><i class="fa-solid fa-store-slash"></i> Barbería cerrada los Domingos. Elige de Lunes a Sábado.</p>`;
    return;
  }

  const slots = [];
  for (let hour = 10; hour < 20; hour++) {
    const hStr = String(hour).padStart(2, '0');
    slots.push(`${hStr}:00`);
    slots.push(`${hStr}:30`);
  }

  const takenTimes = DB.appointments
    .filter(a => a.date === dateInput.value && a.status !== "Cancelado")
    .map(a => a.time);

  const todayStr = getTodayString();
  const now = new Date();
  const currentMinutes = now.getHours() * 60 + now.getMinutes();

  grid.innerHTML = "";

  slots.forEach(slot => {
    const [sh, sm] = slot.split(":").map(Number);
    const slotMinutes = sh * 60 + sm;

    let isPast = false;
    if (dateInput.value === todayStr && slotMinutes <= currentMinutes) {
      isPast = true;
    }

    const isTaken = takenTimes.includes(slot);
    const btn = document.createElement("button");
    btn.className = "slot-btn";
    btn.textContent = slot;

    if (isTaken || isPast) {
      btn.classList.add("occupied");
      btn.disabled = true;
      btn.title = isTaken ? "Horario ocupado" : "Horario pasado";
    } else {
      btn.onclick = () => selectSlot(btn, slot);
    }

    grid.appendChild(btn);
  });
}

function selectSlot(btnElem, timeStr) {
  document.querySelectorAll(".slot-btn").forEach(b => b.classList.remove("selected"));
  btnElem.classList.add("selected");
  selectedBookingTime = timeStr;
  const confirmBtn = document.getElementById("confirm-booking-btn");
  if (confirmBtn) confirmBtn.disabled = false;
}

function confirmBooking() {
  if (!selectedBookingTime) {
    showToast("Por favor selecciona un horario disponible", "error");
    return;
  }

  const dateValue = document.getElementById("booking-date").value;
  const serviceRadio = document.querySelector('input[name="booking-service"]:checked');
  const serviceName = serviceRadio ? serviceRadio.value : "Corte";

  let price = DB.prices.corte;
  if (serviceName === "Color") price = DB.prices.color;
  if (serviceName === "Corte + Color") price = DB.prices.corte + DB.prices.color;

  const clientUser = DB.users.find(u => u.id === currentUser.id) || currentUser;
  const hasValidMembership = clientUser.hasMembership && clientUser.membershipCutsLeft > 0 && serviceName.includes("Corte");

  const newApp = {
    id: "app_" + Date.now(),
    clientId: currentUser.id,
    clientName: currentUser.name,
    clientPhone: currentUser.phone || "Sin teléfono",
    service: serviceName,
    price: price,
    date: dateValue,
    time: selectedBookingTime,
    status: "Pendiente",
    paid: false,
    usedMembership: hasValidMembership,
    createdAt: Date.now()
  };

  DB.appointments.push(newApp);
  saveDB();

  showToast("¡Turno agendado con éxito!", "success");

  selectedBookingTime = null;
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
    if (countText) countText.textContent = `Te quedan ${clientUser.membershipCutsLeft} cortes este mes.`;
  } else {
    banner.classList.add("hidden");
  }
}

function renderClientTurnos() {
  const container = document.getElementById("client-active-turnos-list");
  if (!container) return;
  container.innerHTML = "";

  const myTurnos = DB.appointments
    .filter(a => a.clientId === currentUser.id && a.status === "Pendiente")
    .sort((a,b) => (a.date + a.time).localeCompare(b.date + b.time));

  if (myTurnos.length === 0) {
    container.innerHTML = `<div class="card text-center text-muted">No tienes turnos pendientes próximos.</div>`;
    return;
  }

  myTurnos.forEach(t => {
    const card = document.createElement("div");
    card.className = "turno-card gold-highlight";

    card.innerHTML = `
      <div class="turno-header">
        <div class="turno-date-time">
          <i class="fa-solid fa-clock"></i>
          <span>${formatDateDisplay(t.date)} - ${t.time} hs</span>
        </div>
        <span class="badge badge-pending">PENDIENTE</span>
      </div>
      <div class="turno-body">
        <span>Servicio: <strong>${t.service}</strong></span>
        <span>Precio: <strong>${t.usedMembership ? "Membresía VIP" : "$" + Number(t.price).toLocaleString("es-AR")}</strong></span>
      </div>
      <div class="turno-actions">
        <button class="btn btn-outline btn-sm btn-full" onclick="cancelClientTurno('${t.id}')">
          <i class="fa-solid fa-xmark text-red"></i> Cancelar Reserva
        </button>
      </div>
    `;

    container.appendChild(card);
  });
}

function cancelClientTurno(id) {
  if (confirm("¿Estás seguro de cancelar este turno?")) {
    const idx = DB.appointments.findIndex(a => a.id === id);
    if (idx !== -1) {
      DB.appointments[idx].status = "Cancelado";
      saveDB();
      showToast("Turno cancelado", "info");
      renderClientTurnos();
      loadAvailableSlots();
    }
  }
}

function renderClientMembership() {
  const clientUser = DB.users.find(u => u.id === currentUser.id) || currentUser;
  const cutsLeftElem = document.getElementById("vip-cuts-left");
  const statusTextElem = document.getElementById("vip-status-text");

  if (cutsLeftElem) cutsLeftElem.textContent = clientUser.membershipCutsLeft || 0;

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

function requestMembership() {
  openModal(`
    <div class="text-center">
      <i class="fa-solid fa-crown text-gold" style="font-size:48px; margin-bottom:12px;"></i>
      <h3 style="font-family:'Cinzel',serif; color:var(--gold-primary); font-size:20px;">Membresía Mensual VIP</h3>
      <p style="font-size:13px; color:var(--text-secondary); margin-top:8px;">
        Accede a 4 cortes de cabello al mes por un precio promocional único.
      </p>
      <div class="alias-box mt-3 text-center" style="flex-direction:column; gap:4px;">
        <span class="text-sm text-muted">Alias para transferencia:</span>
        <strong class="alias-text" style="font-size:22px;">Abelacostaok</strong>
      </div>
      <p class="text-sm text-muted mt-2">Envía el comprobante de transferencia al barbero Abel Acosta para activar o renovar tu membresía.</p>
      <a href="https://wa.me/91125287420?text=Hola%20Abel!%20Quiero%20activar/renovar%20mi%20Membres%C3%ADa%20VIP" target="_blank" class="btn btn-gold btn-full mt-3">
        <i class="fa-brands fa-whatsapp"></i> Avisar a Abel por WhatsApp
      </a>
    </div>
  `);
}

function renderClientHistory() {
  const container = document.getElementById("client-history-list");
  if (!container) return;
  container.innerHTML = "";

  const historyTurnos = DB.appointments
    .filter(a => a.clientId === currentUser.id && a.status !== "Pendiente")
    .sort((a,b) => (b.date + b.time).localeCompare(a.date + a.time));

  if (historyTurnos.length === 0) {
    container.innerHTML = `<div class="card text-center text-muted">Aún no posees historial de cortes finalizados.</div>`;
    return;
  }

  historyTurnos.forEach(t => {
    const card = document.createElement("div");
    card.className = "turno-card";

    let statusBadge = "";
    if (t.status === "Finalizado") {
      statusBadge = `<span class="badge badge-completed">FINALIZADO</span>`;
    } else {
      statusBadge = `<span class="badge badge-cancelled">CANCELADO</span>`;
    }

    let pagadoBannerHTML = "";
    if (t.status === "Finalizado" && t.paid) {
      pagadoBannerHTML = `
        <div class="banner-pagado-giant">
          <div class="pagado-title">PAGADO</div>
          <i class="fa-solid fa-circle-check"></i>
        </div>
      `;
    }

    card.innerHTML = `
      <div class="turno-header">
        <div class="turno-date-time">
          <i class="fa-solid fa-calendar-check"></i>
          <span>${formatDateDisplay(t.date)} - ${t.time} hs</span>
        </div>
        ${statusBadge}
      </div>
      <div class="turno-body">
        <span>Servicio: <strong>${t.service}</strong></span>
        <span>Precio: <strong>${t.usedMembership ? "Membresía VIP" : "$" + Number(t.price).toLocaleString("es-AR")}</strong></span>
      </div>
      ${pagadoBannerHTML}
    `;

    container.appendChild(card);
  });
}

function copyAlias() {
  const alias = "Abelacostaok";
  navigator.clipboard.writeText(alias).then(() => {
    showToast("¡Alias Abelacostaok copiado!", "success");
  }).catch(() => {
    showToast("Alias: Abelacostaok", "info");
  });
}


// --- ADMIN FUNCTIONALITIES ---

// 1. Caja
function renderAdminCaja() {
  updateCajaMetrics();
  renderAdminCajaList();
}

function updateCajaMetrics() {
  const todayStr = getTodayString();
  const currentMonthStr = todayStr.substring(0, 7);

  let hoyIngresos = 0;
  let mesIngresos = 0;
  let mesEgresos = 0;
  let totalBalance = 0;

  DB.movements.forEach(m => {
    const amt = Number(m.amount) || 0;
    if (m.type === "ingreso") {
      totalBalance += amt;
      if (m.date === todayStr) hoyIngresos += amt;
      if (m.date.startsWith(currentMonthStr)) mesIngresos += amt;
    } else if (m.type === "egreso") {
      totalBalance -= amt;
      if (m.date.startsWith(currentMonthStr)) mesEgresos += amt;
    }
  });

  const fmt = num => "$" + Number(num).toLocaleString("es-AR");

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
  e.preventDefault();
  const tipo = document.getElementById("mov-tipo").value;
  const monto = Number(document.getElementById("mov-monto").value);
  const categoria = document.getElementById("mov-categoria").value;
  const fecha = document.getElementById("mov-fecha").value;
  const descripcion = document.getElementById("mov-descripcion").value.trim();

  if (editingMovId) {
    const idx = DB.movements.findIndex(m => m.id === editingMovId);
    if (idx !== -1) {
      DB.movements[idx] = { ...DB.movements[idx], tipo, monto, categoria, fecha, descripcion, amount: monto };
      showToast("Movimiento actualizado", "success");
    }
    editingMovId = null;
  } else {
    const newMov = {
      id: "mov_" + Date.now(),
      date: fecha,
      type: tipo,
      category: categoria,
      amount: monto,
      description: descripcion,
      createdAt: Date.now()
    };
    DB.movements.push(newMov);
    showToast("Movimiento registrado", "success");
  }

  saveDB();
  document.getElementById("form-caja-movimiento").reset();
  document.getElementById("mov-fecha").value = getTodayString();
  renderAdminCaja();
}

function renderAdminCajaList() {
  const container = document.getElementById("caja-movements-list");
  if (!container) return;
  container.innerHTML = "";

  const searchText = (document.getElementById("filter-mov-search").value || "").toLowerCase();
  const tipoFilter = document.getElementById("filter-mov-tipo").value;

  let filtered = DB.movements.filter(m => {
    const matchesSearch = m.description.toLowerCase().includes(searchText) || m.category.toLowerCase().includes(searchText);
    const matchesTipo = tipoFilter === "todos" || m.type === tipoFilter;
    return matchesSearch && matchesTipo;
  });

  filtered.sort((a,b) => (b.date + b.createdAt).localeCompare(a.date + a.createdAt));

  if (filtered.length === 0) {
    container.innerHTML = `<div class="text-center text-muted py-3">No hay movimientos registrados.</div>`;
    return;
  }

  filtered.forEach(m => {
    const item = document.createElement("div");
    item.className = "movement-item";

    const isIngreso = m.type === "ingreso";
    const amountColorClass = isIngreso ? "text-green" : "text-red";
    const sign = isIngreso ? "+" : "-";

    item.innerHTML = `
      <div class="movement-info">
        <span class="mov-desc">${m.description}</span>
        <span class="mov-meta">${formatDateDisplay(m.date)} • Categoría: <strong>${m.category}</strong></span>
      </div>
      <div class="mov-amount-wrap">
        <span class="mov-amount ${amountColorClass}">${sign}$${Number(m.amount).toLocaleString("es-AR")}</span>
        <div class="mov-actions">
          <button class="icon-btn" onclick="editMovimiento('${m.id}')" title="Editar"><i class="fa-solid fa-pen-to-square"></i></button>
          <button class="icon-btn delete" onclick="deleteMovimiento('${m.id}')" title="Eliminar"><i class="fa-solid fa-trash"></i></button>
        </div>
      </div>
    `;

    container.appendChild(item);
  });
}

function editMovimiento(id) {
  const mov = DB.movements.find(m => m.id === id);
  if (!mov) return;

  editingMovId = id;
  document.getElementById("mov-tipo").value = mov.type;
  document.getElementById("mov-monto").value = mov.amount;
  document.getElementById("mov-categoria").value = mov.category;
  document.getElementById("mov-fecha").value = mov.date;
  document.getElementById("mov-descripcion").value = mov.description;

  showToast("Modificando movimiento...", "info");
}

function deleteMovimiento(id) {
  if (confirm("¿Deseas eliminar este movimiento de la caja?")) {
    DB.movements = DB.movements.filter(m => m.id !== id);
    saveDB();
    showToast("Movimiento eliminado", "info");
    renderAdminCaja();
  }
}

// 2. Turnos Admin
function setAdminTurnosFilter(filter) {
  adminTurnosFilter = filter;
  document.querySelectorAll("#view-admin-turnos .segment-btn").forEach(b => b.classList.remove("active"));
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
    const nextWeek = new Date();
    nextWeek.setDate(nextWeek.getDate() + 7);
    const nextWeekStr = nextWeek.toISOString().split("T")[0];
    list = list.filter(a => a.date >= todayStr && a.date <= nextWeekStr);
  }

  list.sort((a,b) => (a.date + a.time).localeCompare(b.date + b.time));

  if (list.length === 0) {
    container.innerHTML = `<div class="card text-center text-muted">No hay turnos registrados en este filtro.</div>`;
    return;
  }

  list.forEach(t => {
    const card = document.createElement("div");
    card.className = "turno-card";

    let badgeClass = "badge-pending";
    if (t.status === "Finalizado") badgeClass = "badge-completed";
    if (t.status === "Cancelado") badgeClass = "badge-cancelled";

    let pagadoBadge = t.paid ? `<span class="badge badge-paid">PAGADO</span>` : "";

    card.innerHTML = `
      <div class="turno-header">
        <div class="turno-date-time">
          <i class="fa-solid fa-user"></i>
          <span>${t.clientName} (${t.clientPhone})</span>
        </div>
        <div>
          ${pagadoBadge}
          <span class="badge ${badgeClass}">${t.status}</span>
        </div>
      </div>
      <div class="turno-body mt-2">
        <span>Fecha: <strong>${formatDateDisplay(t.date)} - ${t.time} hs</strong></span>
        <span>Servicio: <strong>${t.service}</strong></span>
      </div>
      <div class="turno-body">
        <span>Precio: <strong>${t.usedMembership ? "Membresía VIP" : "$" + Number(t.price).toLocaleString("es-AR")}</strong></span>
      </div>

      ${t.status === "Pendiente" ? `
        <div class="turno-actions">
          <button class="btn btn-success btn-sm" onclick="adminFinalizarTurno('${t.id}')">
            <i class="fa-solid fa-check"></i> Finalizar
          </button>
          <button class="btn btn-gold btn-sm" onclick="adminTogglePagado('${t.id}')">
            <i class="fa-solid fa-dollar-sign"></i> ${t.paid ? "Desmarcar Pago" : "Marcar Pagado"}
          </button>
          <button class="btn btn-danger btn-sm" onclick="adminCancelarTurno('${t.id}')">
            <i class="fa-solid fa-xmark"></i> Cancelar
          </button>
        </div>
      ` : `
        <div class="turno-actions">
          <button class="btn btn-gold btn-sm" onclick="adminTogglePagado('${t.id}')">
            <i class="fa-solid fa-dollar-sign"></i> ${t.paid ? "Desmarcar Pago" : "Marcar Pagado"}
          </button>
        </div>
      `}
    `;

    container.appendChild(card);
  });
}

function adminFinalizarTurno(id) {
  const turno = DB.appointments.find(a => a.id === id);
  if (!turno) return;

  turno.status = "Finalizado";
  turno.paid = true;

  const clientUser = DB.users.find(u => u.id === turno.clientId);
  let deductedNote = "";
  
  if (clientUser && clientUser.hasMembership && clientUser.membershipCutsLeft > 0) {
    clientUser.membershipCutsLeft -= 1;
    deductedNote = ` (Se descontó 1 corte de membresía. Restantes: ${clientUser.membershipCutsLeft})`;
  } else if (!turno.usedMembership) {
    DB.movements.push({
      id: "mov_" + Date.now(),
      date: getTodayString(),
      type: "ingreso",
      category: turno.service.includes("Color") ? "Colores" : "Cortes",
      amount: turno.price,
      description: `Pago ${turno.service} - Cliente ${turno.clientName}`,
      createdAt: Date.now()
    });
  }

  saveDB();
  showToast(`Turno finalizado y pagado${deductedNote}`, "success");
  renderAdminTurnos();
}

function adminTogglePagado(id) {
  const turno = DB.appointments.find(a => a.id === id);
  if (!turno) return;

  turno.paid = !turno.paid;
  saveDB();
  showToast(`Estado de pago: ${turno.paid ? "PAGADO" : "PENDIENTE DE PAGO"}`, "info");
  renderAdminTurnos();
}

function adminCancelarTurno(id) {
  if (confirm("¿Cancelar este turno?")) {
    const turno = DB.appointments.find(a => a.id === id);
    if (turno) {
      turno.status = "Cancelado";
      saveDB();
      showToast("Turno cancelado", "info");
      renderAdminTurnos();
    }
  }
}

// 3. Clientes & Membresías
function renderAdminClientsList() {
  const container = document.getElementById("admin-clients-list");
  if (!container) return;
  container.innerHTML = "";

  const searchText = (document.getElementById("filter-clients-search").value || "").toLowerCase();

  const filtered = DB.users.filter(u => 
    u.name.toLowerCase().includes(searchText) || 
    (u.phone && u.phone.includes(searchText)) ||
    u.username.toLowerCase().includes(searchText)
  );

  if (filtered.length === 0) {
    container.innerHTML = `<div class="card text-center text-muted">No se encontraron clientes.</div>`;
    return;
  }

  filtered.forEach(u => {
    const card = document.createElement("div");
    card.className = "client-card";

    const hasMem = u.hasMembership && u.membershipCutsLeft > 0;
    const badgeHTML = hasMem 
      ? `<span class="badge badge-completed"><i class="fa-solid fa-crown"></i> VIP (${u.membershipCutsLeft} cortes)</span>`
      : `<span class="badge badge-cancelled">SIN MEMBRESÍA</span>`;

    card.innerHTML = `
      <div class="client-header">
        <div>
          <span class="client-name">${u.name}</span>
          <div class="client-phone">Tel: ${u.phone} | User: @${u.username}</div>
        </div>
        ${badgeHTML}
      </div>

      <div class="turno-actions mt-2">
        <button class="btn btn-gold btn-sm" onclick="adminRenewMembership('${u.id}')">
          <i class="fa-solid fa-plus-circle"></i> Activar / Renovar (4 Cortes)
        </button>
        <button class="btn btn-outline btn-sm" onclick="adminViewClientHistory('${u.id}')">
          <i class="fa-solid fa-clock-rotate-left"></i> Ver Historial
        </button>
      </div>
    `;

    container.appendChild(card);
  });
}

function adminRenewMembership(userId) {
  const client = DB.users.find(u => u.id === userId);
  if (!client) return;

  client.hasMembership = true;
  client.membershipCutsLeft = 4;
  client.membershipExpiry = "2026-12-31";

  DB.movements.push({
    id: "mov_" + Date.now(),
    date: getTodayString(),
    type: "ingreso",
    category: "Membresías",
    amount: 60000,
    description: `Venta Membresía VIP 4 Cortes - Cliente ${client.name}`,
    createdAt: Date.now()
  });

  saveDB();
  showToast(`Membresía renovada para ${client.name} (4 cortes)`, "success");
  renderAdminClientsList();
}

function adminViewClientHistory(userId) {
  const client = DB.users.find(u => u.id === userId);
  const turnos = DB.appointments.filter(a => a.clientId === userId);

  let turnosHTML = turnos.length === 0 
    ? `<p class="text-muted text-center py-2">Sin turnos registrados.</p>`
    : turnos.map(t => `
        <div class="movement-item mt-1">
          <div>
            <strong>${t.service}</strong> (${formatDateDisplay(t.date)} - ${t.time} hs)
          </div>
          <span class="badge ${t.status === 'Finalizado' ? 'badge-completed' : 'badge-pending'}">${t.status}</span>
        </div>
      `).join("");

  openModal(`
    <h3 style="font-family:'Cinzel',serif; color:var(--gold-primary);">Historial: ${client.name}</h3>
    <div class="mt-3" style="max-height:260px; overflow-y:auto;">
      ${turnosHTML}
    </div>
  `);
}

// 4. Precios & Ajustes
function loadAdminPriceInputs() {
  const c = document.getElementById("admin-price-corte");
  const col = document.getElementById("admin-price-color");
  if (c) c.value = DB.prices.corte || 18000;
  if (col) col.value = DB.prices.color || 50000;
}

function handleUpdatePrices(e) {
  e.preventDefault();
  const corteVal = Number(document.getElementById("admin-price-corte").value);
  const colorVal = Number(document.getElementById("admin-price-color").value);

  if (corteVal <= 0 || colorVal <= 0) {
    showToast("Ingresa precios válidos mayores a 0", "error");
    return;
  }

  DB.prices.corte = corteVal;
  DB.prices.color = colorVal;
  saveDB();

  renderPricesUI();
  showToast("Tarifas actualizadas en tiempo real", "success");
}

function handleChangeAdminPass(e) {
  e.preventDefault();
  const currPass = document.getElementById("admin-pass-current").value;
  const newPass = document.getElementById("admin-pass-new").value;

  if (currPass !== DB.admin.password) {
    showToast("La contraseña actual es incorrecta", "error");
    return;
  }

  DB.admin.password = newPass;
  saveDB();
  showToast("Contraseña de Barbero cambiada con éxito", "success");
  document.getElementById("form-change-admin-pass").reset();
}


// --- UTILITIES & MODAL ---

function formatDateDisplay(dateStr) {
  if (!dateStr) return "";
  const parts = dateStr.split("-");
  if (parts.length !== 3) return dateStr;
  return `${parts[2]}/${parts[1]}/${parts[0]}`;
}

function showToast(msg, type = "info") {
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

  setTimeout(() => {
    toast.classList.add("hidden");
  }, 3000);
}

function openModal(contentHTML) {
  const backdrop = document.getElementById("modal-backdrop");
  const body = document.getElementById("modal-body");
  if (!backdrop || !body) return;
  body.innerHTML = contentHTML;
  backdrop.classList.remove("hidden");
}

function closeModal(e) {
  if (e.target.id === "modal-backdrop") {
    closeModalForce();
  }
}

function closeModalForce() {
  const backdrop = document.getElementById("modal-backdrop");
  if (backdrop) backdrop.classList.add("hidden");
}

