const login=document.querySelector("#login"),app=document.querySelector("#app"),form=document.querySelector("#loginForm"),error=document.querySelector("#error");
form.onsubmit=e=>{e.preventDefault();if(user.value==="admin"&&pass.value==="armony2026"){login.classList.add("hidden");app.classList.remove("hidden")}else error.textContent="Usuario o contraseña incorrectos."};
document.querySelector("#logout").onclick=()=>{app.classList.add("hidden");login.classList.remove("hidden")};

const pages=document.querySelectorAll(".page"),nav=document.querySelectorAll("[data-page]"),title=document.querySelector("#pageTitle");
const names={dashboard:"Resumen",agenda:"Agenda",clients:"Clientes",team:"Equipo",cash:"Caja",services:"Servicios"};
function go(p){pages.forEach(x=>x.classList.toggle("active-page",x.id===p));nav.forEach(x=>x.classList.toggle("active",x.dataset.page===p));title.textContent=names[p]||"Resumen";window.scrollTo(0,0)}
document.addEventListener("click",e=>{const b=e.target.closest("[data-page]");if(b)go(b.dataset.page)});

const modal=document.querySelector("#modal");
document.querySelector("#newTurn").onclick=()=>modal.classList.remove("hidden");
document.querySelector("#close").onclick=()=>modal.classList.add("hidden");
document.querySelector("#save").onclick=()=>{modal.classList.add("hidden");alert("Turno creado correctamente.")};
modal.onclick=e=>{if(e.target===modal)modal.classList.add("hidden")};
