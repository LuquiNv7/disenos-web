const WA="5491136994436";

const waLink=text=>
 `https://wa.me/${WA}?text=${encodeURIComponent(text)}`;

const wa=document.querySelector("#wa");

if(wa){
 wa.href=waLink("Hola Armony, quería consultar por un tratamiento.");
}

const form=document.querySelector("#contacto");

if(form){
 form.addEventListener("submit",e=>{
  e.preventDefault();

  const name=document.querySelector("#name")?.value.trim()||"";
  const phone=document.querySelector("#phone")?.value.trim()||"";
  const service=document.querySelector("#service")?.value||"";
  const message=document.querySelector("#msg")?.value.trim()||"";

  location.href=waLink(
   `Hola Armony 👋 Soy ${name}. Mi teléfono es ${phone}. Quería consultar por: ${service}. ${message}`
  );
 });
}

const observer=new IntersectionObserver(entries=>{
 entries.forEach(entry=>{
  if(entry.isIntersecting){
   entry.target.classList.add("visible");
   observer.unobserve(entry.target);
  }
 });
},{threshold:.12});

document.querySelectorAll(".reveal").forEach(element=>{
 observer.observe(element);
});

const menu=document.querySelector(".menu");
const nav=document.querySelector("nav");

if(menu&&nav){
 menu.addEventListener("click",()=>{
  nav.classList.toggle("open");
 });
}
