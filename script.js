(() => {
const D = TRIPLE_A, $ = s => document.querySelector(s), $$ = s => [...document.querySelectorAll(s)];
const get = (o, p) => p.split(".").reduce((a, k) => a && a[k], o);
const store = (k, v) => { try { return v === undefined ? localStorage.getItem(k) : localStorage.setItem(k, v); } catch (e) {} };
let lang = store("lang"); if (!D.language.available.includes(lang)) lang = D.language.default;
let theme = store("theme") || D.theme.default;
const L = o => typeof o === "string" ? o : (o && (o[lang] || o.en)) || "";
const wa = () => `https://wa.me/${D.whatsapp}?text=${encodeURIComponent(L(D.whatsappMessage))}`;
const ico = (id, n = 22) => { const s = D.socials.find(x => x.id === id); return s ? `<svg viewBox="0 0 24 24" width="${n}" height="${n}" fill="${s.color}" aria-hidden="true">${s.icon}</svg>` : ""; };
const U = k => L(get(D.ui, k));

function vcard() {
  const v = `BEGIN:VCARD\nVERSION:3.0\nFN:${D.brand}\nORG:${D.brand}\nTEL;TYPE=CELL:${D.phone}\nEMAIL:${D.email}\nURL:${D.website}\nEND:VCARD`;
  const a = document.createElement("a");
  a.href = URL.createObjectURL(new Blob([v], { type: "text/vcard" }));
  a.download = "triple-a.vcf"; a.click();
}

function actions() {
  return `<a class="btn pri" href="#contact">${U("contactUs")}</a>
  <a class="btn" href="${wa()}" target="_blank" rel="noopener">${ico("whatsapp", 18)}${U("whatsapp")}</a>
  <a class="btn" href="tel:${D.phone}">${U("call")}</a>
  <a class="btn" href="mailto:${D.email}">${U("email")}</a>`;
}

function render() {
  document.documentElement.lang = lang;
  document.documentElement.dir = lang === "ar" ? "rtl" : "ltr";
  document.documentElement.dataset.theme = theme;
  document.title = `${D.brand} — ${L(D.tagline)}`;
  $$("[data-brand]").forEach(e => e.textContent = D.brand);
  $$("[data-logo]").forEach(e => e.src = D.logo);
  $$("[data-t]").forEach(e => e.textContent = U(e.dataset.t));
  $$("[data-ph]").forEach(e => e.placeholder = U(e.dataset.ph));
  $("#tagline").textContent = L(D.tagline);
  $("#desc").textContent = L(D.description);
  $("#about-t").textContent = L(D.about);
  $("#nav").innerHTML = ["services", "portfolio", "about", "contact"].map(k => `<a href="#${k}">${U("nav." + k)}</a>`).join("");
  $("#langs").innerHTML = D.language.available.map(l => `<button data-l="${l}" aria-pressed="${l === lang}">${{ar:"عربي",fr:"FR",en:"EN"}[l]}</button>`).join("");
  $("#acts").innerHTML = actions();
  $("#acts2").innerHTML = actions() .replace(/<a class="btn pri" href="#contact">.*?<\/a>/, `<button class="btn pri" id="vc">${U("save")}</button>`);
  $("#vc").onclick = vcard;
  $("#svc").innerHTML = D.services.map(s => {
    const t = s.link ? "a" : "div";
    return `<${t} class="card rv" ${s.link ? `href="${s.link}"` : ""}><i></i><h3>${L(s.name)}</h3><p>${L(s.desc)}</p></${t}>`;
  }).join("");
  $("#pf").innerHTML = D.portfolio.map(p => `<article class="card rv"><img src="${p.image}" alt="${p.name}" loading="lazy"><div class="in">
    <div class="meta"><span>${L(p.type)}</span>${p.featured ? `<span class="badge">★ ${U("ui.featured")}</span>` : ""}</div>
    <h3>${p.name}</h3><p>${L(p.description)}</p>
    <div class="tags">${p.tags.map(t => `<span>${t}</span>`).join("")}</div>
    <div class="lnks">${p.url ? `<a href="${p.url}" target="_blank" rel="noopener">${U("ui.visit")}</a>` : ""}${p.github ? `<a href="${p.github}" target="_blank" rel="noopener">GitHub</a>` : ""}</div></div></article>`).join("");
  $$("[data-socials]").forEach(e => e.innerHTML = D.socials.filter(s => s.enabled)
    .map(s => `<a href="${s.url}" target="_blank" rel="noopener" aria-label="${s.label}" title="${s.label}" style="--c:${s.color||'var(--a)'}"><svg viewBox="0 0 24 24" width="22" height="22" fill="${s.color}" aria-hidden="true">${s.icon}</svg></a>`).join(""));
  $("#flinks").innerHTML = `<a href="tel:${D.phone}">${U("call")}</a><a href="${wa()}">${U("whatsapp")}</a><a href="mailto:${D.email}">${U("email")}</a>`;
  $("#wa").href = wa(); $("#wa").innerHTML = ico("whatsapp", 30).replace(/fill="[^"]*"/, 'fill="#fff"');
  if ($("#form")) $("#form").hidden = !D.contactForm.enabled;
  observe();
}

const io = new IntersectionObserver(es => es.forEach(e => e.isIntersecting && (e.target.classList.add("on"), io.unobserve(e.target))), { threshold: .1 });
const observe = () => $$(".rv:not(.on)").forEach(e => io.observe(e));

document.addEventListener("click", e => {
  const b = e.target.closest("[data-l]");
  if (b) { lang = b.dataset.l; store("lang", lang); render(); }
  if (e.target.closest("#nav a")) { $("#nav").classList.remove("open"); $("#menu").setAttribute("aria-expanded", "false"); }
});
$("#theme").onclick = () => { theme = theme === "dark" ? "light" : "dark"; store("theme", theme); render(); };
$("#menu").onclick = () => $("#menu").setAttribute("aria-expanded", $("#nav").classList.toggle("open"));
$("#form").onsubmit = e => {
  e.preventDefault();
  const f = e.target;
  location.href = `mailto:${D.email}?subject=${encodeURIComponent(f.n.value)}&body=${encodeURIComponent(f.m.value)}`;
};
// Remove the contact form entirely when disabled (no empty space)
if (!D.contactForm.enabled) $("#form").remove();
render();
const hide = () => $("#pre").classList.add("off");
addEventListener("load", hide); setTimeout(hide, 1500);
})();
