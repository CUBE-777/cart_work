/* Triple A — Creative Digital Studio
   site.js: الهيكل المشترك للصفحات الداخلية (portfolio.html / project.html / 404.html).
   يستخدم نفس data.js ونفس نظام اللغات {ar,fr,en} والثيم المستخدمين في الصفحة الرئيسية — لا نظام ترجمة ثانٍ.
   الصفحة الرئيسية تستعمل script.js الذي يوفّر نفس واجهة window.TA. */
(() => {
"use strict";
const D = TRIPLE_A, $ = (s, r = document) => r.querySelector(s), $$ = (s, r = document) => [...r.querySelectorAll(s)];
const store = (k, v) => { try { return v === undefined ? localStorage.getItem(k) : localStorage.setItem(k, v); } catch (e) {} };
let lang = store("lang"); if (!D.language.available.includes(lang)) lang = D.language.default;
let theme = store("theme") || D.theme.default;
const B = document.body.dataset.base || "";          // "/" للصفحة 404 (تعمل من أي مسار)، وفارغ للباقي

const L = o => typeof o === "string" ? o : (o && (o[lang] || o.en)) || "";
const LA = o => (o && (o[lang] || o.en)) || [];
const T = k => L(D.t[k]);
const esc = s => String(s).replace(/[&<>"']/g, c => ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;" }[c]));
const wa = msg => `https://wa.me/${D.whatsapp}?text=${encodeURIComponent(msg || L(D.whatsappMessage))}`;
const social = id => D.socials.find(x => x.id === id);
const ico = (id, n = 20, fill) => { const s = social(id); return s ? `<svg viewBox="0 0 24 24" width="${n}" height="${n}" fill="${fill || s.color}" aria-hidden="true">${s.icon}</svg>` : ""; };

const hooks = [];
const TA = window.TA = {
  D, $, $$, L, LA, T, esc, wa, ico, social, base: B,
  get lang() { return lang; },
  fmt: (k, v) => T(k).replace(/\{(\w+)\}/g, (_, n) => v[n] ?? ""),
  ready: false,
  onRender(fn) { hooks.push(fn); if (TA.ready) fn(); }
};

function syncSeo() {
  const page = document.body.dataset.page, sx = D.seo && D.seo[page]; if (!sx) return;   // صفحة project يتولاها portfolio.js
  document.title = L(sx.title);
  ["meta[name=description]", "meta[property='og:description']", "meta[name='twitter:description']"].forEach(q => { const m = $(q); if (m) m.content = L(sx.description); });
  ["meta[property='og:title']", "meta[name='twitter:title']"].forEach(q => { const m = $(q); if (m) m.content = L(sx.title); });
  const ol = $("meta[property='og:locale']"); if (ol) ol.content = { ar: "ar_MA", fr: "fr_FR", en: "en_US" }[lang];
}
TA.syncSeo = syncSeo;

function render() {
  const h = document.documentElement;
  h.lang = lang; h.dir = lang === "ar" ? "rtl" : "ltr"; h.dataset.theme = theme;
  $$("[data-t]").forEach(e => e.textContent = T(e.dataset.t));
  $$("[data-aria]").forEach(e => e.setAttribute("aria-label", T(e.dataset.aria)));
  $$("[data-alt]").forEach(e => e.alt = T(e.dataset.alt));
  $$("[data-ico]").forEach(e => e.innerHTML = ico(e.dataset.ico, 20));

  const cur = document.body.dataset.nav;
  const links = [["index.html#home", "home"], ["index.html#services", "services"], ["portfolio.html", "portfolio"], ["index.html#about", "about"], ["index.html#contact", "contact"]];
  const nav = ([h2, k]) => `<a href="${B}${h2}"${k === cur ? ' aria-current="page"' : ""}>${T("nav." + k)}</a>`;
  $("#nav").innerHTML = links.map(nav).join("");
  $("#fnav").innerHTML = links.map(nav).join("");
  $("#langs").innerHTML = D.language.available.map(l => `<button type="button" data-l="${l}" aria-pressed="${l === lang}">${{ ar: "عربي", fr: "FR", en: "EN" }[l]}</button>`).join("");

  $$("[data-socials]").forEach(e => {
    const only = e.dataset.socials ? e.dataset.socials.split(",") : null;
    e.innerHTML = D.socials.filter(s => s.enabled && s.url && (!only || only.includes(s.id)))
      .map(s => `<a href="${esc(s.url)}" target="_blank" rel="noopener noreferrer" aria-label="${esc(s.label)} ${esc(T("lk.newtab"))}" title="${esc(s.label)}" style="--c:${s.color || "var(--a)"}"><svg viewBox="0 0 24 24" width="22" height="22" fill="${s.color}" aria-hidden="true">${s.icon}</svg></a>`).join("");
  });
  $$("[data-wa]").forEach(a => a.href = wa());
  const fab = $("#wa"); fab.href = wa(); fab.innerHTML = ico("whatsapp", 30, "#fff");
  const fe = $("#f-email"); fe.href = `mailto:${D.email}`; fe.textContent = D.email;
  syncSeo();
  if (TA.ready) hooks.forEach(fn => fn());
}

/* ---------- events ---------- */
const menu = $("#menu"), nav = $("#nav");
const closeMenu = () => { nav.classList.remove("open"); menu.setAttribute("aria-expanded", "false"); document.body.classList.remove("navopen"); };
document.addEventListener("click", e => {
  const l = e.target.closest("[data-l]"); if (l) { lang = l.dataset.l; store("lang", lang); render(); return; }
  if (e.target.closest("#nav a")) closeMenu();
});
$("#theme").onclick = () => { theme = theme === "dark" ? "light" : "dark"; store("theme", theme); document.documentElement.dataset.theme = theme; };
menu.onclick = () => { const o = nav.classList.toggle("open"); menu.setAttribute("aria-expanded", String(o)); document.body.classList.toggle("navopen", o); };
addEventListener("keydown", e => { if (e.key === "Escape") closeMenu(); });
matchMedia("(min-width: 861px)").addEventListener("change", closeMenu);
const bar = $("#bar"), onScroll = () => bar.classList.toggle("scrolled", scrollY > 24);
addEventListener("scroll", onScroll, { passive: true }); onScroll();

render();
document.body.classList.add("ready");
TA.ready = true; hooks.forEach(fn => fn());
})();
