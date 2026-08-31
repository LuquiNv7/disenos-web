const obs=new IntersectionObserver(e=>e.forEach(x=>{if(x.isIntersecting){x.target.classList.add("show");obs.unobserve(x.target)}}),{threshold:.1});
document.querySelectorAll(".grid article,.commercial>div,.intro,.head").forEach(x=>{x.classList.add("reveal");obs.observe(x)});
