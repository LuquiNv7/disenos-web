const WA="5491136994436";
const waLink=t=>`https://wa.me/${WA}?text=${encodeURIComponent(t)}`;

document.querySelector("#wa").href=waLink("Hola Armony, quería consultar por un tratamiento.");

document.querySelector("#contacto").addEventListener("submit",e=>{
 e.preventDefault();
 const n=document.querySelector("#name").value,p=document.querySelector("#phone").value,s=document.querySelector("#service").value,m=document.querySelector("#msg").value;
 location.href=waLink(`Hola Armony 👋 Soy ${n}. Mi teléfono es ${p}. Quería consultar por: ${s}. ${m}`);
});

const io=new IntersectionObserver(es=>es.forEach(e=>{if(e.isIntersecting)e.target.classList.add("visible")}),{threshold:.12});
document.querySelectorAll(".reveal").forEach(e=>io.observe(e));

document.querySelector(".menu").onclick=()=>document.querySelector("nav").classList.toggle("open");
