(() => {
"use strict";
const D = TRIPLE_A, $ = (s, r = document) => r.querySelector(s), $$ = (s, r = document) => [...r.querySelectorAll(s)];
const store = (k, v) => { try { return v === undefined ? localStorage.getItem(k) : localStorage.setItem(k, v); } catch (e) {} };
const reduce = matchMedia("(prefers-reduced-motion: reduce)").matches;
let lang = store("lang"); if (!D.language.available.includes(lang)) lang = D.language.default;
let theme = store("theme") || D.theme.default;
let filter = "all", first = true;

const L = o => typeof o === "string" ? o : (o && (o[lang] || o.en)) || "";   // {ar,fr,en} -> string
const LA = o => (o && (o[lang] || o.en)) || [];                              // {ar:[],fr:[],en:[]} -> array
const T = k => L(D.t[k]);
const esc = s => String(s).replace(/[&<>"']/g, c => ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;" }[c]));
const wa = msg => `https://wa.me/${D.whatsapp}?text=${encodeURIComponent(msg || L(D.whatsappMessage))}`;
const social = id => D.socials.find(x => x.id === id);
const ico = (id, n = 20, fill) => { const s = social(id); return s ? `<svg viewBox="0 0 24 24" width="${n}" height="${n}" fill="${fill || s.color}" aria-hidden="true">${s.icon}</svg>` : ""; };
const price = p => p.from ? `${esc(p.from)} ${esc(D.currency)}` : "";

/* ---------- Mockups: pure CSS stand-ins until real photos exist ---------- */
const LG = `<img src="${D.logoSm}" alt="" width="96" height="75" loading="lazy" decoding="async">`;
const MK = {
  logo: () => `<div class="mk lgk"><img src="${D.logo}" alt="" width="490" height="385" loading="lazy" decoding="async"></div>`,
  card: () => `<div class="mk pair"><div class="c b"></div><div class="c f">${LG}<b>TRIPLE A</b><i></i><i></i></div></div>`,
  sticker: () => `<div class="mk stk"><div class="s2"></div><div class="s1">${LG}</div></div>`,
  flyer: () => `<div class="mk fl"><div class="p b"></div><div class="p f"><u></u><b>BIG<br>IDEA</b><i></i><i></i></div></div>`,
  cert: () => `<div class="mk cert"><div class="in"><small>CERTIFICATE</small><b>OF ACHIEVEMENT</b><i></i><span class="seal"></span></div></div>`,
  badge: () => `<div class="mk bdg"><span class="lan"></span><div class="bd">${LG}<em>STAFF</em><i></i><i></i></div></div>`,
  thanks: () => `<div class="mk thx"><div class="c b"></div><div class="c f"><b>Thank you</b><i></i>${LG}</div></div>`,
  social: () => `<div class="mk sq">${LG}<i></i><i></i></div>`,
  web: () => `<div class="mk web"><div class="tb"><i></i><i></i><i></i></div><div class="bd"><u></u><u></u><s></s><em></em></div></div>`,
  motion: () => `<div class="mk mot"><span class="play"></span><span class="tl"></span></div>`
};
const mock = k => (MK[k] || MK.card)();

/* ---------- Pillar art: the A-triangle, drawn three ways ---------- */
const ART = {
  design: `<path d="M60 5 115 99H5z"/><path class="hd" d="M60 5 84 41M60 5 36 41"/><circle cx="60" cy="5" r="4.5"/><circle cx="115" cy="99" r="4.5"/><circle cx="5" cy="99" r="4.5"/><circle cx="84" cy="41" r="2.6"/><circle cx="36" cy="41" r="2.6"/>`,
  print: `<path d="M60 5 115 99H5z"/><circle cx="60" cy="70" r="13"/><path class="hd" d="M60 48v44M38 70h44"/><path class="crop" d="M-6 14h12M0 8v12M126 14h-12M120 8v12M-6 96h12M0 90v12M126 96h-12M120 90v12"/>`,
  digital: `<path d="M60 5 115 99H5z"/><path class="hd" d="M32 80h56M44 62h32M52 44h16"/><path class="cur" d="M62 58v26l6-6 4.5 10 5-2.2-4.5-9.800h8.500z"/>`
};

/* ---------- Render ---------- */
function render() {
  const h = document.documentElement;
  h.lang = lang; h.dir = lang === "ar" ? "rtl" : "ltr"; h.dataset.theme = theme;
  $$("[data-t]").forEach(e => e.textContent = T(e.dataset.t));
  $$("[data-ph]").forEach(e => e.placeholder = T(e.dataset.ph));
  $$("[data-ico]").forEach(e => e.innerHTML = ico(e.dataset.ico, 20));
  $$("[data-logo=lg]").forEach(e => e.src = D.logo);

  const links = [["work", "work"], ["services", "services"], ["about", "about"], ["contact", "contact"]];
  $("#nav").innerHTML = links.map(([id, k]) => `<a href="#${id}">${T("nav." + k)}</a>`).join("");
  $("#fnav").innerHTML = links.map(([id, k]) => `<a href="#${id}">${T("nav." + k)}</a>`).join("");
  $("#langs").innerHTML = D.language.available.map(l => `<button type="button" data-l="${l}" aria-pressed="${l === lang}">${{ ar: "عربي", fr: "FR", en: "EN" }[l]}</button>`).join("");

  $("#pillars").innerHTML = D.pillars.map((p, i) => `
    <article class="pillar rv" style="--d:${i * 80}ms" tabindex="0" aria-labelledby="pl-${p.id}">
      <svg class="art art-${p.id}" viewBox="-8 0 136 106" aria-hidden="true" focusable="false">${ART[p.id]}</svg>
      <span class="num">${p.n}</span>
      <h3 id="pl-${p.id}">${L(p.name)}</h3>
      <p class="ptag">${L(p.tag)}</p>
      <div class="reveal"><ul class="tl-list">${LA(p.items).map(x => `<li>${esc(x)}</li>`).join("")}</ul></div>
      <a class="plink" href="#contact" data-prefill data-service="${p.service}" data-note="${esc(L(p.name))}">${T("btn.start")}</a>
    </article>`).join("");

  $("#prods").innerHTML = D.products.map((p, i) => `
    <article class="prod rv sp${p.span}" style="--d:${(i % 3) * 70}ms">
      <div class="stage">${mock(p.mock)}</div>
      <div class="pbody">
        <div><h3>${L(p.name)}</h3><p>${L(p.desc)}</p>${p.from ? `<p class="from">${T("prod.from")} <b>${price(p)}</b></p>` : ""}</div>
        <a class="btn sm" href="#contact" data-prefill data-service="${p.service}" data-note="${esc(L(p.name))}">${T("btn.order")}</a>
      </div>
    </article>`).join("");

  $("#pkgs").innerHTML = D.packages.map((p, i) => `
    <article class="pkg rv${p.pop ? " pop" : ""}" style="--d:${i * 80}ms">
      ${p.pop ? `<span class="badge">${T("pkg.pop")}</span>` : ""}
      <h3>${esc(L(p.name))}</h3><p class="pd">${L(p.desc)}</p>
      <ul class="tl-list">${LA(p.items).map(x => `<li>${esc(x)}</li>`).join("")}</ul>
      <p class="price">${p.from ? `<small>${T("pkg.from")}</small> <b>${price(p)}</b>` : `<b>${T("pkg.custom")}</b>`}</p>
      <a class="btn ${p.pop ? "pri" : ""}" href="#contact" data-prefill data-service="${p.id === "brand" ? "Branding" : p.id === "business" ? "Printing" : "Printing"}" data-note="${esc(L(p.name))}">${T("btn.quote")}</a>
    </article>`).join("");

  $("#filters").innerHTML = D.workFilters.map(f => `<button type="button" data-f="${f.id}" aria-pressed="${f.id === filter}">${L(f.t)}</button>`).join("");
  renderWork();

  $("#why").innerHTML = D.why.map((w, i) => `<li class="rv" style="--d:${i * 70}ms"><span class="num">0${i + 1}</span><div><h3>${L(w.t)}</h3><p>${L(w.d)}</p></div></li>`).join("");
  $("#steps").innerHTML = D.how.map((s, i) => `<li style="--i:${i}"><span class="node"></span><span class="num">0${i + 1}</span><h3>${L(s.t)}</h3><p>${L(s.d)}</p></li>`).join("");
  $("#aud").innerHTML = D.audiences.map((a, i) => `
    <article class="panel rv" style="--d:${i * 90}ms">
      <h3>${L(a.name)}</h3>
      <ul class="tl-list cols">${LA(a.items).map(x => `<li>${esc(x)}</li>`).join("")}</ul>
      <a class="btn ${i ? "" : "pri"}" href="#contact" data-prefill data-service="${a.service}" data-note="${esc(L(a.name))}">${L(a.cta)}</a>
    </article>`).join("");

  if (D.testimonials.length) {
    $("#proof").hidden = false;
    $("#quotes").innerHTML = D.testimonials.map(q => `<figure class="quote"><blockquote>${esc(L(q.text))}</blockquote><figcaption>${esc(q.name)}${q.role ? " — " + esc(L(q.role)) : ""}</figcaption></figure>`).join("");
  }

  $("#con-acts").innerHTML = `<a class="btn pri wa-btn" data-wa target="_blank" rel="noopener">${ico("whatsapp", 20, "#fff")}<span>${T("btn.wa")}</span></a>
    <a class="btn" href="tel:${D.phone}">${T("ui.call")}</a><a class="btn" href="mailto:${D.email}">${T("ui.email")}</a>
    <button type="button" class="btn" id="vc">${T("btn.save")}</button>`;
  $("#vc").onclick = vcard;

  const sel = $("#f-service"), cur = sel.value;
  sel.innerHTML = `<option value="">${T("f.choose")}</option>` + D.serviceOptions.map(o => `<option value="${o.v}">${L(o.t)}</option>`).join("");
  sel.value = cur;

  $$("[data-socials]").forEach(e => {
    const only = e.dataset.socials ? e.dataset.socials.split(",") : null;
    e.innerHTML = D.socials.filter(s => s.enabled && (!only || only.includes(s.id)))
      .map(s => `<a href="${s.url}" target="_blank" rel="noopener" aria-label="${s.label}" title="${s.label}" style="--c:${s.color || "var(--a)"}"><svg viewBox="0 0 24 24" width="22" height="22" fill="${s.color}" aria-hidden="true">${s.icon}</svg></a>`).join("");
  });
  $$("[data-wa]").forEach(a => a.href = wa());
  const fab = $("#wa"); fab.href = wa(); fab.innerHTML = ico("whatsapp", 30, "#fff");
  const fe = $("#f-email"); fe.href = `mailto:${D.email}`; fe.textContent = D.email;

  if (!first) $$(".rv").forEach(e => e.classList.add("on"));
  first = false; observe();
}

function renderWork() {
  const list = D.portfolio.filter(p => filter === "all" || p.cat === filter);
  $("#pf").innerHTML = list.map((p, i) => `
    <button type="button" class="work pop" style="--d:${i * 50}ms" data-id="${p.id}" aria-haspopup="dialog">
      <span class="stage">${p.image ? `<img class="cover" src="${esc(p.image)}" alt="${esc(p.name)}" loading="lazy" width="800" height="600">` : mock(p.mock)}${p.sample ? `<span class="chip">${T("tag.sample")}</span>` : ""}</span>
      <span class="wmeta"><span class="cat">${L(p.type)}</span><strong>${esc(p.name)}</strong><span class="wd">${L(p.desc)}</span></span>
    </button>`).join("");
}

/* ---------- Modal (native <dialog>: focus trap + Esc for free) ---------- */
const modal = $("#modal");
function openWork(id) {
  const p = D.portfolio.find(x => x.id === id); if (!p) return;
  const kit = p.image ? `<div class="stage big"><img class="cover" src="${esc(p.image)}" alt="${esc(p.name)}" width="800" height="600"></div>`
    : `<div class="kit k${p.kit.length}">${p.kit.map(k => `<div class="stage">${mock(k)}</div>`).join("")}</div>`;
  $("#m-body").innerHTML = `
    <button type="button" class="x" data-close aria-label="${T("btn.close")}"><span></span><span></span></button>
    <p class="cat">${L(p.type)}</p><h3 id="m-title">${esc(p.name)}</h3><p class="mlead">${L(p.desc)}</p>
    ${kit}
    <h4>${T("work.inside")}</h4>
    <ul class="tl-list cols">${LA(p.deliver).map(x => `<li>${esc(x)}</li>`).join("")}</ul>
    <div class="acts left"><a class="btn pri" href="#contact" data-prefill data-service="${p.cat === "digital" ? "Digital" : p.cat === "branding" ? "Branding" : "Printing"}" data-note="${esc(p.name)}">${T("btn.similar")}</a>
    ${p.url ? `<a class="btn" href="${esc(p.url)}" target="_blank" rel="noopener">Visit</a>` : ""}</div>`;
  modal.showModal(); document.body.classList.add("lock");
}
modal.addEventListener("close", () => document.body.classList.remove("lock"));
modal.addEventListener("click", e => { if (e.target === modal || e.target.closest("[data-close]")) modal.close(); });

/* ---------- Contact ---------- */
function vcard() {
  const v = `BEGIN:VCARD\nVERSION:3.0\nFN:TRIPLE A Studio\nORG:TRIPLE A Studio\nTEL;TYPE=CELL:${D.phone}\nEMAIL:${D.email}\nURL:${D.website}\nEND:VCARD`;
  const a = document.createElement("a");
  a.href = URL.createObjectURL(new Blob([v], { type: "text/vcard" })); a.download = "triple-a.vcf"; a.click();
  setTimeout(() => URL.revokeObjectURL(a.href), 1000);
}
const form = $("#form"), status = $("#f-status");
function compose() {
  const f = form.elements, q = f.qty.value.trim(), m = f.msg.value.trim();
  return [L(D.whatsappMessage), "", `${T("f.name")}: ${f.name.value.trim()}`, `${T("f.service")}: ${f.service.value}`,
    ...(q ? [`${T("f.qty")}: ${q}`] : []), ...(m ? [`${T("f.msg")}: ${m}`] : [])].join("\n");
}
function valid() {
  const f = form.elements, bad = [f.name, f.service].filter(x => !x.value.trim());
  [f.name, f.service].forEach(x => x.setAttribute("aria-invalid", String(bad.includes(x))));
  if (bad.length) { status.textContent = T("f.err"); status.className = "status err"; bad[0].focus(); return false; }
  return true;
}
form.addEventListener("submit", e => {
  e.preventDefault(); if (!valid()) return;
  status.textContent = T("f.ok"); status.className = "status ok";
  const a = document.createElement("a"); a.href = wa(compose()); a.target = "_blank"; a.rel = "noopener";
  document.body.append(a); a.click(); a.remove();
});
$("#f-mail").addEventListener("click", e => {
  if (!valid()) { e.preventDefault(); return; }
  e.currentTarget.href = `mailto:${D.email}?subject=${encodeURIComponent("Project request — " + form.elements.service.value)}&body=${encodeURIComponent(compose())}`;
});
form.addEventListener("input", e => e.target.removeAttribute("aria-invalid"));

/* ---------- Reveal on scroll ---------- */
const io = new IntersectionObserver(es => es.forEach(e => { if (e.isIntersecting) { e.target.classList.add("on"); io.unobserve(e.target); } }), { threshold: .12, rootMargin: "0px 0px -6% 0px" });
const observe = () => $$(".rv:not(.on),.steps:not(.on)").forEach(e => io.observe(e));

/* ---------- Events ---------- */
document.addEventListener("click", e => {
  const l = e.target.closest("[data-l]"); if (l) { lang = l.dataset.l; store("lang", lang); render(); return; }
  const f = e.target.closest("[data-f]"); if (f) { filter = f.dataset.f; $$("[data-f]").forEach(b => b.setAttribute("aria-pressed", String(b === f))); renderWork(); return; }
  const w = e.target.closest(".work"); if (w) { openWork(w.dataset.id); return; }
  const p = e.target.closest("[data-prefill]");
  if (p) {
    if (modal.open) modal.close();
    if (p.dataset.service) form.elements.service.value = p.dataset.service;
    if (p.dataset.note && !form.elements.msg.value.trim()) form.elements.msg.value = p.dataset.note + ": ";
    setTimeout(() => form.elements.name.focus({ preventScroll: true }), 700);
  }
  if (e.target.closest("#nav a")) closeMenu();
});
$("#theme").onclick = () => { theme = theme === "dark" ? "light" : "dark"; store("theme", theme); document.documentElement.dataset.theme = theme; };
const menu = $("#menu"), nav = $("#nav");
const closeMenu = () => { nav.classList.remove("open"); menu.setAttribute("aria-expanded", "false"); document.body.classList.remove("navopen"); };
menu.onclick = () => { const o = nav.classList.toggle("open"); menu.setAttribute("aria-expanded", String(o)); document.body.classList.toggle("navopen", o); };
addEventListener("keydown", e => { if (e.key === "Escape") closeMenu(); });
matchMedia("(min-width: 861px)").addEventListener("change", closeMenu);

const bar = $("#bar");
const onScroll = () => bar.classList.toggle("scrolled", scrollY > 24);
addEventListener("scroll", onScroll, { passive: true }); onScroll();

// active section in nav
const spy = new IntersectionObserver(es => es.forEach(e => {
  if (!e.isIntersecting) return;
  $$("#nav a").forEach(a => a.toggleAttribute("aria-current", a.getAttribute("href") === "#" + e.target.id));
}), { rootMargin: "-45% 0px -50% 0px" });
["work", "services", "about", "contact"].forEach(id => spy.observe($("#" + id)));

// hero logo tilt (desktop pointer only)
const vis = $("#vis");
if (!reduce && matchMedia("(hover:hover) and (pointer:fine)").matches) {
  let raf;
  vis.addEventListener("pointermove", e => {
    cancelAnimationFrame(raf);
    raf = requestAnimationFrame(() => {
      const r = vis.getBoundingClientRect(), x = (e.clientX - r.left) / r.width - .5, y = (e.clientY - r.top) / r.height - .5;
      vis.style.setProperty("--rx", (-y * 10).toFixed(2) + "deg"); vis.style.setProperty("--ry", (x * 12).toFixed(2) + "deg");
    });
  });
  vis.addEventListener("pointerleave", () => { vis.style.setProperty("--rx", "0deg"); vis.style.setProperty("--ry", "0deg"); });
}

if (!D.contactForm.enabled) form.remove();
render();
const ready = () => { $("#pre").classList.add("off"); document.body.classList.add("ready"); };
if (document.readyState === "complete") ready(); else addEventListener("load", ready);
setTimeout(ready, 1400);
})();
