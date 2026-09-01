const employees = [
  {
    id: "lia",
    name: "Lia Admin",
    role: "Administradora",
    admin: true
  },
  {
    id: "dulce",
    name: "Dulce",
    role: "Profesional",
    admin: false
  },
  {
    id: "yael",
    name: "Yael",
    role: "Profesional",
    admin: false
  },
  {
    id: "damiana",
    name: "Damiana",
    role: "Profesional",
    admin: false
  },
  {
    id: "sol",
    name: "Sol",
    role: "Profesional",
    admin: false
  },
  {
    id: "nicole",
    name: "Nicole",
    role: "Profesional",
    admin: false
  },
  {
    id: "lorena",
    name: "Lorena",
    role: "Profesional",
    admin: false
  }
];

let selectedUser = null;
let currentUser = null;
let selectedDate = getLocalDate();
let selectedEmployeeFilter = "all";


function getLocalDate() {

  const today = new Date();

  const year = today.getFullYear();
  const month = String(today.getMonth() + 1).padStart(2, "0");
  const day = String(today.getDate()).padStart(2, "0");

  return `${year}-${month}-${day}`;
}


function loadData(key, defaultValue) {

  const data = localStorage.getItem(key);

  return data ? JSON.parse(data) : defaultValue;
}


function saveData(key, value) {

  localStorage.setItem(key, JSON.stringify(value));
}


let appointments = loadData("liaSpaAppointments", []);
let history = loadData("liaSpaHistory", []);


function formatMoney(amount) {

  return new Intl.NumberFormat("es-AR", {
    style: "currency",
    currency: "ARS",
    maximumFractionDigits: 0
  }).format(Number(amount));
}


function formatDate(dateString) {

  const date = new Date(`${dateString}T12:00:00`);

  return date.toLocaleDateString("es-AR", {
    weekday: "long",
    day: "numeric",
    month: "long"
  });
}


function getInitials(name) {

  return name
    .split(" ")
    .map(word => word[0])
    .join("")
    .substring(0, 2)
    .toUpperCase();
}


function showToast(message) {

  const toast = document.getElementById("toast");

  toast.textContent = message;
  toast.classList.add("show");

  setTimeout(() => {
    toast.classList.remove("show");
  }, 3000);
}


/* LOGIN */

function renderProfileSelector() {

  const container = document.getElementById("profileSelector");

  container.innerHTML = employees.map(employee => `

    <button
      class="profile-option ${selectedUser?.id === employee.id ? "selected" : ""}"
      data-user="${employee.id}"
    >

      <span class="profile-avatar">
        ${employee.admin ? "✦" : getInitials(employee.name)}
      </span>

      <span>

        <strong>${employee.name}</strong>

        <small>${employee.role}</small>

      </span>

    </button>

  `).join("");


  document.querySelectorAll(".profile-option").forEach(button => {

    button.addEventListener("click", () => {

      const userId = button.dataset.user;

      selectedUser = employees.find(user => user.id === userId);

      renderProfileSelector();

    });

  });

}


document.getElementById("loginButton").addEventListener("click", () => {

  if (!selectedUser) {

    showToast("Seleccioná un perfil para ingresar.");

    return;
  }

  currentUser = selectedUser;

  document.getElementById("loginScreen").classList.add("hidden");

  document.getElementById("appScreen").classList.remove("hidden");

  setupApp();

});


document.getElementById("logoutButton").addEventListener("click", () => {

  currentUser = null;
  selectedUser = null;

  document.getElementById("appScreen").classList.add("hidden");

  document.getElementById("loginScreen").classList.remove("hidden");

  renderProfileSelector();

});


/* SETUP */

function setupApp() {

  document.getElementById("currentUserCard").innerHTML = `

    <strong>${currentUser.name}</strong>

    <small>${currentUser.role}</small>

  `;


  document.getElementById("topGreeting").textContent =
    currentUser.admin
      ? "PANEL DE ADMINISTRACIÓN"
      : "LIA SPA PRIVATE";


  document.getElementById("todayDate").textContent =
    new Date().toLocaleDateString("es-AR", {
      day: "numeric",
      month: "long",
      year: "numeric"
    });


  document.querySelectorAll(".admin-only").forEach(element => {

    element.style.display =
      currentUser.admin ? "" : "none";

  });


  renderAll();

}


/* NAVIGATION */

document.querySelectorAll("[data-page]").forEach(button => {

  button.addEventListener("click", () => {

    openPage(button.dataset.page);

  });

});


function openPage(pageName) {

  document.querySelectorAll(".page").forEach(page => {

    page.classList.remove("active-page");

  });


  document.querySelectorAll(".nav-item, .mobile-nav-item").forEach(button => {

    button.classList.remove("active");

  });


  document
    .getElementById(`${pageName}Page`)
    .classList.add("active-page");


  document
    .querySelectorAll(`[data-page="${pageName}"]`)
    .forEach(button => button.classList.add("active"));


  const titles = {

    dashboard: "Inicio",
    agenda: "Agenda",
    team: "Equipo",
    history: "Actividad",
    profile: "Mi perfil"

  };


  document.getElementById("pageTitle").textContent =
    titles[pageName];


  if (pageName === "dashboard") renderDashboard();
  if (pageName === "agenda") renderAgenda();
  if (pageName === "team") renderTeam();
  if (pageName === "history") renderHistory();
  if (pageName === "profile") renderProfile();

}


document.querySelector(".go-agenda").addEventListener("click", () => {

  openPage("agenda");

});


/* DASHBOARD */

function renderDashboard() {

  const visibleAppointments = currentUser.admin

    ? appointments

    : appointments.filter(
        appointment =>
          appointment.employeeId === currentUser.id
      );


  const todayAppointments = visibleAppointments.filter(
    appointment =>
      appointment.date === getLocalDate()
  );


  const todayAmount = todayAppointments.reduce(
    (total, appointment) =>
      total + Number(appointment.amount),
    0
  );


  document.getElementById("welcomeBox").innerHTML = `

    <p>
      ${currentUser.admin
        ? "CONTROL Y GESTIÓN DEL EQUIPO"
        : "TU ESPACIO PERSONAL"
      }
    </p>

    <h2>
      Hola, ${currentUser.name.replace(" Admin", "")} ✦
    </h2>

    <p>
      ${currentUser.admin
        ? "Tenés toda la actividad de LiaSpa organizada en un solo lugar."
        : "Acá podés consultar tus turnos y tu actividad."
      }
    </p>

  `;


  document.getElementById("statsGrid").innerHTML = `

    <div class="stat-card">

      <div class="stat-label">TURNOS HOY</div>

      <div class="stat-value">
        ${todayAppointments.length}
      </div>

    </div>


    <div class="stat-card">

      <div class="stat-label">IMPORTE HOY</div>

      <div class="stat-value">
        ${formatMoney(todayAmount)}
      </div>

    </div>


    <div class="stat-card">

      <div class="stat-label">
        ${currentUser.admin ? "TOTAL REGISTRADO" : "MIS TURNOS"}
      </div>

      <div class="stat-value">
        ${currentUser.admin
          ? formatMoney(
              appointments.reduce(
                (total, appointment) =>
                  total + Number(appointment.amount),
                0
            ))
          : visibleAppointments.length
        }
      </div>

    </div>

  `;


  const upcoming = visibleAppointments
    .filter(appointment => appointment.date >= getLocalDate())
    .sort(sortAppointments)
    .slice(0, 6);


  renderAppointmentCards(
    document.getElementById("upcomingAppointments"),
    upcoming
  );

}


/* APPOINTMENTS */

function sortAppointments(a, b) {

  return (
    `${a.date} ${a.time}`
      .localeCompare(`${b.date} ${b.time}`)
  );

}


function renderAppointmentCards(container, appointmentList) {

  if (!appointmentList.length) {

    container.innerHTML = `
      <div class="empty-state">
        No hay turnos registrados todavía.
      </div>
    `;

    return;
  }


  container.innerHTML = appointmentList.map(appointment => {

    const employee = employees.find(
      employee => employee.id === appointment.employeeId
    );


    return `

      <button
        class="appointment-card"
        data-appointment="${appointment.id}"
      >

        <div class="appointment-main">

          <div class="appointment-time">
            ${appointment.time}
          </div>

          <div>

            <strong>${appointment.client}</strong>

            <small>
              ${employee.name} ·
              ${appointment.service || "Servicio"}
            </small>

          </div>

        </div>


        <div class="amount">

          ${formatMoney(appointment.amount)}

        </div>

      </button>

    `;

  }).join("");


  container.querySelectorAll("[data-appointment]").forEach(button => {

    button.addEventListener("click", () => {

      const appointment = appointments.find(
        item => item.id === button.dataset.appointment
      );

      openAppointmentDetail(appointment);

    });

  });

}


/* AGENDA */

function renderAgenda() {

  document.getElementById("selectedDateLabel").textContent =
    formatDate(selectedDate);


  renderEmployeeFilter();


  let visibleEmployees = employees.filter(
    employee => !employee.admin
  );


  if (!currentUser.admin) {

    visibleEmployees = visibleEmployees.filter(
      employee => employee.id === currentUser.id
    );

  }


  if (
    currentUser.admin &&
    selectedEmployeeFilter !== "all"
  ) {

    visibleEmployees = visibleEmployees.filter(
      employee =>
        employee.id === selectedEmployeeFilter
    );

  }


  document.getElementById("agendaContainer").innerHTML =
    visibleEmployees.map(employee => {

      const employeeAppointments = appointments
        .filter(
          appointment =>
            appointment.employeeId === employee.id &&
            appointment.date === selectedDate
        )
        .sort(sortAppointments);


      return `

        <div class="employee-agenda">

          <div class="employee-agenda-header">

            <div>

              <h3>${employee.name}</h3>

              <p>
                ${employeeAppointments.length} turno(s)
              </p>

            </div>

          </div>


          <div class="agenda-appointments">

            ${
              employeeAppointments.length

                ? employeeAppointments.map(appointment => `

                  <button
                    class="appointment-card"
                    data-appointment="${appointment.id}"
                  >

                    <div class="appointment-main">

                      <div class="appointment-time">
                        ${appointment.time}
                      </div>

                      <div>

                        <strong>${appointment.client}</strong>

                        <small>
                          ${appointment.service || "Servicio"}
                        </small>

                      </div>

                    </div>


                    <div class="amount">
                      ${formatMoney(appointment.amount)}
                    </div>

                  </button>

                `).join("")

                : `

                  <div class="empty-state">
                    Sin turnos para este día.
                  </div>

                `

            }

          </div>

        </div>

      `;

    }).join("");


  document
    .querySelectorAll("#agendaContainer [data-appointment]")
    .forEach(button => {

      button.addEventListener("click", () => {

        const appointment = appointments.find(
          item =>
            item.id === button.dataset.appointment
        );

        openAppointmentDetail(appointment);

      });

    });

}


function renderEmployeeFilter() {

  const container =
    document.getElementById("employeeFilter");


  if (!currentUser.admin) {

    container.innerHTML = "";

    return;
  }


  container.innerHTML = `

    <button
      class="filter-btn ${selectedEmployeeFilter === "all" ? "active" : ""}"
      data-filter="all"
    >
      Todo el equipo
    </button>


    ${employees
      .filter(employee => !employee.admin)
      .map(employee => `

        <button
          class="filter-btn ${selectedEmployeeFilter === employee.id ? "active" : ""}"
          data-filter="${employee.id}"
        >
          ${employee.name}
        </button>

      `)
      .join("")}

  `;


  container
    .querySelectorAll(".filter-btn")
    .forEach(button => {

      button.addEventListener("click", () => {

        selectedEmployeeFilter =
          button.dataset.filter;

        renderAgenda();

      });

    });

}


document
  .getElementById("prevDay")
  .addEventListener("click", () => {

    const date = new Date(
      `${selectedDate}T12:00:00`
    );

    date.setDate(date.getDate() - 1);

    selectedDate = date
      .toISOString()
      .split("T")[0];

    renderAgenda();

  });


document
  .getElementById("nextDay")
  .addEventListener("click", () => {

    const date = new Date(
      `${selectedDate}T12:00:00`
    );

    date.setDate(date.getDate() + 1);

    selectedDate = date
      .toISOString()
      .split("T")[0];

    renderAgenda();

  });


/* TEAM */

function renderTeam() {

  const team = employees.filter(
    employee => !employee.admin
  );


  document.getElementById("teamGrid").innerHTML =
    team.map(employee => {

      const employeeAppointments =
        appointments.filter(
          appointment =>
            appointment.employeeId === employee.id
        );


      const total = employeeAppointments.reduce(
        (sum, appointment) =>
          sum + Number(appointment.amount),
        0
      );


      return `

        <div class="team-card">

          <div class="team-avatar">
            ${getInitials(employee.name)}
          </div>

          <h3>${employee.name}</h3>

          <p>Profesional LiaSpa</p>

          <div class="profile-stats">

            <div class="stat-card">

              <div class="stat-label">
                TURNOS
              </div>

              <div class="stat-value">
                ${employeeAppointments.length}
              </div>

            </div>


            <div class="stat-card">

              <div class="stat-label">
                IMPORTE
              </div>

              <div class="stat-value">
                ${formatMoney(total)}
              </div>

            </div>

          </div>

        </div>

      `;

    }).join("");

}


/* HISTORY */

function renderHistory() {

  if (!history.length) {

    document.getElementById("historyList").innerHTML = `

      <div class="empty-state">
        Todavía no hay movimientos registrados.
      </div>

    `;

    return;
  }


  document.getElementById("historyList").innerHTML =
    history
      .slice()
      .reverse()
      .map(item => `

        <div class="history-item">

          <div class="history-icon">
            ${item.icon || "✓"}
          </div>

          <div>

            <strong>
              ${item.title}
            </strong>

            <small>
              ${item.description}
            </small>

            <small>
              ${item.dateTime}
            </small>

          </div>

        </div>

      `)
      .join("");

}


/* PROFILE */

function renderProfile() {

  const employeeAppointments =
    currentUser.admin

      ? appointments

      : appointments.filter(
          appointment =>
            appointment.employeeId === currentUser.id
        );


  const total = employeeAppointments.reduce(
    (sum, appointment) =>
      sum + Number(appointment.amount),
    0
  );


  const todayCount =
    employeeAppointments.filter(
      appointment =>
        appointment.date === getLocalDate()
    ).length;


  document.getElementById("profileContent").innerHTML = `

    <div class="profile-hero">

      <div class="big-avatar">

        ${currentUser.admin
          ? "✦"
          : getInitials(currentUser.name)
        }

      </div>


      <div>

        <p class="eyebrow">
          ${currentUser.role.toUpperCase()}
        </p>

        <h2>${currentUser.name}</h2>

        <p>
          ${currentUser.admin
            ? "Acceso completo a la gestión de LiaSpa."
            : "Perfil interno y agenda personal."
          }
        </p>

      </div>

    </div>


    <div class="profile-stats">

      <div class="stat-card">

        <div class="stat-label">
          TURNOS HOY
        </div>

        <div class="stat-value">
          ${todayCount}
        </div>

      </div>


      <div class="stat-card">

        <div class="stat-label">
          IMPORTE REGISTRADO
        </div>

        <div class="stat-value">
          ${formatMoney(total)}
        </div>

      </div>

    </div>

  `;

}


/* NEW APPOINTMENT */

const appointmentModal =
  document.getElementById("appointmentModal");


document
  .getElementById("newAppointmentBtn")
  .addEventListener("click", openAppointmentModal);


function openAppointmentModal() {

  document
    .getElementById("appointmentForm")
    .reset();


  const employeeSelect =
    document.getElementById("appointmentEmployee");


  const availableEmployees =
    currentUser.admin

      ? employees.filter(
          employee => !employee.admin
        )

      : employees.filter(
          employee =>
            employee.id === currentUser.id
        );


  employeeSelect.innerHTML =
    availableEmployees.map(employee => `

      <option value="${employee.id}">
        ${employee.name}
      </option>

    `).join("");


  document
    .getElementById("appointmentDate")
    .value = selectedDate;


  generateTimeOptions();


  document
    .getElementById("availabilityMessage")
    .textContent = "";


  appointmentModal.classList.remove("hidden");

}


function generateTimeOptions() {

  const timeSelect =
    document.getElementById("appointmentTime");


  let html = "";

  for (let hour = 8; hour <= 20; hour++) {

    ["00", "30"].forEach(minutes => {

      const time =
        `${String(hour).padStart(2, "0")}:${minutes}`;

      html += `
        <option value="${time}">
          ${time}
        </option>
      `;

    });

  }


  timeSelect.innerHTML = html;

}


function checkAvailability() {

  const employeeId =
    document.getElementById("appointmentEmployee").value;

  const date =
    document.getElementById("appointmentDate").value;

  const time =
    document.getElementById("appointmentTime").value;


  const conflict =
    appointments.some(
      appointment =>
        appointment.employeeId === employeeId &&
        appointment.date === date &&
        appointment.time === time
    );


  const message =
    document.getElementById("availabilityMessage");


  if (conflict) {

    message.textContent =
      "⚠️ Este horario ya está ocupado.";

    message.className =
      "availability-message error";

    return false;

  }


  message.textContent =
    "✓ Horario disponible.";

  message.className =
    "availability-message success";

  return true;

}


[
  "appointmentEmployee",
  "appointmentDate",
  "appointmentTime"
].forEach(id => {

  document
    .getElementById(id)
    .addEventListener("change", checkAvailability);

});


document
  .getElementById("closeModal")
  .addEventListener("click", () => {

    appointmentModal.classList.add("hidden");

  });


document
  .getElementById("appointmentForm")
  .addEventListener("submit", event => {

    event.preventDefault();


    if (!checkAvailability()) {

      showToast(
        "No se puede crear el turno porque el horario está ocupado."
      );

      return;
    }


    const appointment = {

      id: crypto.randomUUID(),

      employeeId:
        document.getElementById("appointmentEmployee").value,

      client:
        document.getElementById("appointmentClient").value.trim(),

      date:
        document.getElementById("appointmentDate").value,

      time:
        document.getElementById("appointmentTime").value,

      service:
        document.getElementById("appointmentService").value.trim(),

      amount:
        Number(
          document.getElementById("appointmentAmount").value
        ),

      notes:
        document.getElementById("appointmentNotes").value.trim(),

      createdBy:
        currentUser.name,

      createdAt:
        new Date().toISOString()

    };


    appointments.push(appointment);

    saveData(
      "liaSpaAppointments",
      appointments
    );


    addHistory(
      "＋",
      `${currentUser.name} creó un turno`,
      `${appointment.client} · ${appointment.time} · ${formatMoney(appointment.amount)}`
    );


    appointmentModal.classList.add("hidden");

    showToast("✓ Turno creado correctamente");

    renderAll();

  });


/* DETAIL */

function openAppointmentDetail(appointment) {

  const employee = employees.find(
    employee =>
      employee.id === appointment.employeeId
  );


  const canDelete =
    currentUser.admin ||
    currentUser.id === appointment.employeeId;


  document.getElementById("detailContent").innerHTML = `

    <button
      id="closeDetail"
      class="modal-close"
    >
      ×
    </button>


    <p class="eyebrow">
      DETALLE DEL TURNO
    </p>

    <h2>${appointment.client}</h2>


    <div class="detail-info">

      <div class="detail-row">

        <span>Profesional</span>

        <strong>${employee.name}</strong>

      </div>


      <div class="detail-row">

        <span>Fecha</span>

        <strong>
          ${formatDate(appointment.date)}
        </strong>

      </div>


      <div class="detail-row">

        <span>Horario</span>

        <strong>${appointment.time}</strong>

      </div>


      <div class="detail-row">

        <span>Servicio</span>

        <strong>
          ${appointment.service || "No especificado"}
        </strong>

      </div>


      <div class="detail-row">

        <span>Importe</span>

        <strong>
          ${formatMoney(appointment.amount)}
        </strong>

      </div>


      ${
        appointment.notes
          ? `
            <div class="detail-row">
              <span>Notas</span>
              <strong>${appointment.notes}</strong>
            </div>
          `
          : ""
      }

    </div>


    ${
      canDelete
        ? `
          <button
            id="deleteAppointment"
            class="delete-btn"
          >
            Eliminar turno
          </button>
        `
        : ""
    }

  `;


  document
    .getElementById("detailModal")
    .classList.remove("hidden");


  document
    .getElementById("closeDetail")
    .addEventListener("click", () => {

      document
        .getElementById("detailModal")
        .classList.add("hidden");

    });


  const deleteButton =
    document.getElementById("deleteAppointment");


  if (deleteButton) {

    deleteButton.addEventListener("click", () => {

      if (
        !confirm(
          "¿Seguro que querés eliminar este turno? El horario volverá a quedar disponible."
        )
      ) {
        return;
      }


      appointments =
        appointments.filter(
          item =>
            item.id !== appointment.id
        );


      saveData(
        "liaSpaAppointments",
        appointments
      );


      addHistory(
        "×",
        `${currentUser.name} eliminó un turno`,
        `${appointment.client} · ${employee.name} · ${appointment.time}`
      );


      document
        .getElementById("detailModal")
        .classList.add("hidden");


      showToast("Turno eliminado.");

      renderAll();

    });

  }

}


/* HISTORY */

function addHistory(icon, title, description) {

  const now = new Date();

  history.push({

    id: crypto.randomUUID(),

    icon,
    title,
    description,

    dateTime:
      now.toLocaleDateString("es-AR") +
      " · " +
      now.toLocaleTimeString("es-AR", {
        hour: "2-digit",
        minute: "2-digit"
      })

  });


  saveData(
    "liaSpaHistory",
    history
  );

}


/* RENDER */

function renderAll() {

  renderDashboard();
  renderAgenda();

  if (currentUser.admin) {

    renderTeam();
    renderHistory();

  }

  renderProfile();

}


renderProfileSelector();
