
const burger=document.querySelector(".burger"),nav=document.getElementById("nav");
burger.addEventListener("click",()=>{const o=nav.classList.toggle("open");burger.setAttribute("aria-expanded",o)});
const fb=document.querySelectorAll(".filters button");fb.forEach(b=>b.addEventListener("click",()=>{fb.forEach(x=>x.setAttribute("aria-pressed",x===b));const c=b.dataset.cat;document.querySelectorAll(".tile").forEach(t=>t.hidden=c!=="all"&&t.dataset.cat!==c)}));
const form=document.getElementById("booking");
if(form){
  const d=form.elements.data;d.min=new Date(Date.now()-new Date().getTimezoneOffset()*60000).toISOString().split("T")[0];
  const msg=document.getElementById("msg");
  form.addEventListener("submit",async e=>{
    e.preventDefault();
    if(!form.elements.privacy.checked){msg.className="err";msg.textContent="Accetta l’informativa privacy.";return}
    msg.className="";msg.textContent="";
    let first=null;
    for(const n of ["nome","telefono","data","orario","persone"]){
      const f=form.elements[n];const bad=!f.value.trim();f.classList.toggle("bad",bad);if(bad&&!first)first=f}
    if(first){msg.className="err";msg.textContent="Compila i campi evidenziati.";first.focus();return}
    const btn=form.querySelector("button");btn.disabled=true;btn.textContent="Invio in corso";
    try{
      const r=await fetch("/api/prenota",{method:"POST",headers:{"Content-Type":"application/json"},body:JSON.stringify(Object.fromEntries(new FormData(form)))});
      if(!r.ok)throw 0;
      form.reset();msg.className="ok";msg.textContent="Richiesta inviata. Ti contattiamo per confermare la prenotazione."}
    catch{msg.className="err";msg.textContent="Invio non riuscito. Riprova o chiamaci al 344 798 9270."}
    btn.disabled=false;btn.textContent="Invia richiesta"});
}
