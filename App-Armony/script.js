const login=document.querySelector("#login");
const app=document.querySelector("#app");
const form=document.querySelector("#loginForm");
const error=document.querySelector("#error");
const user=document.querySelector("#user");
const pass=document.querySelector("#pass");

form.addEventListener("submit",e=>{
 e.preventDefault();
 if(user.value==="admin"&&pass.value==="armony2026"){
  login.classList.add("hidden");
  app.classList.remove("hidden");
  error.textContent="";
 }else{
  error.textContent="Usuario o contraseña incorrectos.";
 }
});

document.querySelector("#logout").addEventListener("click",()=>{
 app.classList.add("hidden");
 login.classList.remove("hidden");
});

const pages=document.querySelectorAll(".page");
const nav=document.querySelectorAll("[data-page]");
const title=document.querySelector("#pageTitle");

const names={
 dashboard:"Resumen",
 agenda:"Agenda",
 clients:"Clientes",
 team:"Equipo",
 cash:"Caja",
 services:"Servicios"
};

function go(page){
 pages.forEach(p=>p.classList.toggle("active-page",p.id===page));
 nav.forEach(n=>n.classList.toggle("active",n.dataset.page===page));
 title.textContent=names[page]||"Resumen";
 window.scrollTo(0,0);
}

document.addEventListener("click",e=>{
 const button=e.target.closest("[data-page]");
 if(button)go(button.dataset.page);
});

const modal=document.querySelector("#modal");
const newTurn=document.querySelector("#newTurn");
const close=document.querySelector("#close");
const save=document.querySelector("#save");

if(newTurn)newTurn.addEventListener("click",()=>modal.classList.remove("hidden"));
if(close)close.addEventListener("click",()=>modal.classList.add("hidden"));

if(save)save.addEventListener("click",()=>{
 modal.classList.add("hidden");
 alert("Turno creado correctamente.");
});

if(modal){
 modal.addEventListener("click",e=>{
  if(e.target===modal)modal.classList.add("hidden");
 });
}
