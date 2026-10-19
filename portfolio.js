/* Triple A — Creative Digital Studio
   portfolio.js: محرّك المعرض وصفحات الـCase Study. Vanilla JS بلا مكتبات.
   لا حاجة لتعديل هذا الملف لإضافة مشروع — كل شيء يُقرأ من data.js (قسم projects).
   يُحمَّل بعد script.js (الرئيسية) أو site.js (الصفحات الداخلية) ويستعمل window.TA المشتركة. */
(() => {
  "use strict";
  const TA = window.TA; if (!TA) return;
  const { D, $, $$, L, LA, T, esc, wa } = TA;
  const S = Object.assign({ imagesBase: "assets/portfolio", homeOtherLimit: 6, relatedCount: 3 }, D.portfolioSettings);
  const BASE = TA.base || "";
  const SITE = (D.website || "").replace(/\/$/, "");
  const page = document.body.dataset.page;
  const reduce = matchMedia("(prefers-reduced-motion: reduce)").matches;

  /* ---------- helpers ---------- */
  const isId = s => typeof s === "string" && /^[a-z0-9][a-z0-9_-]*$/i.test(s);
  const safeUrl = u => (typeof u === "string" && /^https?:\/\/[^\s]+$/i.test(u.trim())) ? u.trim() : "";   // يمنع javascript: وغيره
  const isPath = n => /^(https?:)?\/\//i.test(n) || n.includes("/");
  const imgPath = (p, n, sub) => encodeURI(isPath(n) ? n : [S.imagesBase, p.id, sub, n].filter(Boolean).join("/"));
  const list = o => Array.isArray(o) ? o : LA(o);
  const paras = t => String(L(t) || "").split(/\n{2,}/).map(x => x.trim()).filter(Boolean).map(x => `<p>${esc(x).replace(/\n/g, "<br>")}</p>`).join("");
  const hasText = t => !!String(L(t) || "").trim();
  const abs = u => /^https?:\/\//i.test(u) ? u : `${SITE}/${u.replace(/^\//, "")}`;

  /* ---------- project data (مع تحقق وتطبيع) ---------- */
  // البيانات المشتقة تُحسب من D.* وتُعاد عند وصول مشاريع قاعدة البيانات (انظر applyRemote في الأسفل)
  let all, featured, others, catsPresent, collections;
  function deriveProjects() {
  const seen = new Set();
  all = (D.projects || []).map(raw => {
    if (!raw || !isId(raw.id)) { console.warn("[portfolio] مشروع بلا id صالح (حروف إنجليزية/أرقام/شرطات فقط):", raw); return null; }
    if (seen.has(raw.id)) { console.warn("[portfolio] id مكرر:", raw.id); return null; }
    seen.add(raw.id);
    if (!D.categories.some(c => c.id === raw.category)) console.warn(`[portfolio] الفئة "${raw.category}" غير موجودة في categories (المشروع ${raw.id})`);
    return raw;
  }).filter(Boolean);
  featured = all.filter(p => p.featured === true).sort((a, b) => (a.featuredOrder ?? 1e9) - (b.featuredOrder ?? 1e9));
  others = all.filter(p => p.featured !== true);
  }
  deriveProjects();
  const cat = id => D.categories.find(c => c.id === id);
  const catLabel = p => { const c = cat(p.category); return c ? L(c.t) : ""; };
  // نسبة الصورة (ratio أو coverSize). إن اختلفت كثيراً عن إطار البطاقة 4/3 تُعرض كاملة بلا قص (.fit)
  const rat = s => { const m = /^(\d+(?:\.\d+)?)\s*\/\s*(\d+(?:\.\d+)?)$/.exec(String(s || "").trim()); return m && +m[2] ? +m[1] / +m[2] : 0; };
  const srcRatio = p => rat(p.ratio) || ((p.coverSize && p.coverSize.w && p.coverSize.h) ? p.coverSize.w / p.coverSize.h : 0);
  const fits = p => { const r = srcRatio(p); return !!r && Math.abs(r / (4 / 3) - 1) > .12; };
  const inColl = (p, c) => p.collection === c.id && p.category === c.category;
  function deriveTaxonomy() {
    catsPresent = D.categories.filter(c => all.some(p => p.category === c.id));
    collections = (D.collections || []).filter(c => c && isId(c.id) && cat(c.category) && all.some(p => inColl(p, c)));   // لا تُعرض Collection فارغة
  }
  deriveTaxonomy();
  const collOf = p => collections.find(c => inColl(p, c));
  const collMembers = c => all.filter(p => inColl(p, c));
  const coverObj = p => typeof p.cover === "object" && p.cover ? p.cover : { src: p.cover || "" };
  const coverSrc = p => { const c = coverObj(p); return c.src ? imgPath(p, c.src, "") : ""; };
  const title = p => L(p.title) || p.id;
  const href = p => `${BASE}project.html?id=${encodeURIComponent(p.id)}`;

  /* ---------- card ---------- */
  const placeholder = () => `<span class="pph" aria-hidden="true"><img src="${BASE}${esc(D.logoSm)}" alt="" width="96" height="75" decoding="async"></span>`;
  function card(p, i, o = {}) {
    const src = coverSrc(p), c = coverObj(p), alt = L(p.coverAlt) || title(p);
    const eager = o.eager ? ' fetchpriority="high"' : ' loading="lazy"';
    const img = src
      ? `<img data-pimg src="${esc(src)}"${c.srcset ? ` srcset="${esc(c.srcset)}" sizes="${esc(c.sizes || "(max-width: 600px) 100vw, 50vw")}"` : ""} alt="${esc(alt)}" width="${esc((p.coverSize && p.coverSize.w) || 1200)}" height="${esc((p.coverSize && p.coverSize.h) || 900)}"${eager} decoding="async">`
      : placeholder();
    return `<a class="pcard${o.big ? " big" : ""} pop" style="--d:${Math.min(i, 8) * 50}ms" href="${esc(href(p))}">
    <span class="pimg${!o.frame && fits(p) ? " fit" : ""}">${img}<span class="pgo" aria-hidden="true"></span></span>
    <span class="pmeta">${catLabel(p) ? `<span class="cat">${esc(catLabel(p))}</span>` : ""}<strong>${esc(title(p))}</strong>${hasText(p.description) ? `<span class="wd">${esc(L(p.description))}</span>` : ""}</span>
  </a>`;
  }
  function collCard(c, i) {
    const ms = collMembers(c), lead = ms.find(p => coverSrc(p)) || ms[0], src = coverSrc(lead), name = L(c.t);
    const img = src ? `<img data-pimg src="${esc(src)}" alt="" width="${esc((lead.coverSize && lead.coverSize.w) || 1200)}" height="${esc((lead.coverSize && lead.coverSize.h) || 900)}" loading="lazy" decoding="async">` : placeholder();
    return `<a class="pcard pop" style="--d:${Math.min(i, 8) * 50}ms" href="${BASE}portfolio.html?collection=${encodeURIComponent(c.id)}" data-pf-coll="${esc(c.id)}">
    <span class="pimg${fits(lead) ? " fit" : ""}">${img}<span class="pgo" aria-hidden="true"></span></span>
    <span class="pmeta"><span class="cat">${esc(L((cat(c.category) || {}).t))}</span><strong>${esc(name)}</strong><span class="wd">${esc(TA.fmt("pf.count", { n: ms.length }))}</span></span>
  </a>`;
  }
  // صورة غلاف مفقودة → نعرض بديلاً بدل أيقونة مكسورة
  function wireImgs(root) {
    $$("img[data-pimg]", root).forEach(im => {
      const fail = () => { const span = document.createElement("span"); span.innerHTML = placeholder(); im.replaceWith(span.firstElementChild); };
      if (im.complete && im.naturalWidth === 0 && im.getAttribute("src")) fail(); else im.addEventListener("error", fail, { once: true });
    });
  }

  /* ---------- Home + Portfolio page ---------- */
  let filter = "all";
  let coll = page === "portfolio" ? (new URLSearchParams(location.search).get("collection") || "") : "";   // Collection مفتوحة حالياً
  function mountList(root) {
    const isHome = page === "home";
    const ctaHref = isHome ? "#contact" : `${BASE}index.html#contact`;
    if (!all.length) {
      root.innerHTML = `<div class="pf-empty rv"><svg viewBox="0 0 120 104" aria-hidden="true" focusable="false"><path d="M60 4 116 100H4z" fill="none" stroke="currentColor" stroke-width="2" stroke-linejoin="round"/></svg>
      <h3>${T("pf.empty.h")}</h3><p>${T("pf.empty.p")}</p>
      <div class="acts"><a class="btn pri" href="${ctaHref}"${isHome ? " data-prefill" : ""}>${T("btn.start")}</a><a class="btn wa-btn" href="${esc(wa())}" target="_blank" rel="noopener noreferrer">${TA.ico("whatsapp", 20, "currentColor")}<span>${T("btn.wa")}</span></a></div></div>`;
      $$(".rv", root).forEach(e => e.classList.add("on"));
      return;
    }
    const open = collections.find(c => c.id === coll); if (open) filter = open.category; else coll = "";
    if (filter !== "all" && !catsPresent.some(c => c.id === filter)) filter = "all";
    const bar = catsPresent.length > 1
      ? `<div class="filters" role="group" aria-label="${esc(T("pf.filter"))}"><button type="button" data-pf="all" aria-pressed="${filter === "all"}">${T("pf.filter.all")}</button>${catsPresent.map(c => `<button type="button" data-pf="${esc(c.id)}" aria-pressed="${filter === c.id}">${esc(L(c.t))}</button>`).join("")}</div>` : "";
    root.innerHTML = `
    <section class="pf-sec" data-pf-featwrap aria-labelledby="pf-feat-h"><h3 class="pf-h" id="pf-feat-h">${T("pf.featured")}</h3><div class="pgrid pfeat" data-pf-feat></div></section>
    ${isHome ? "" : `<section class="pf-sec" data-pf-collwrap aria-labelledby="pf-coll-h" hidden><button type="button" class="cs-back" data-pf-coll=""><span aria-hidden="true" class="arr"></span><span data-pf-collback></span></button><h3 class="pf-h" id="pf-coll-h" tabindex="-1"></h3><div class="pgrid pall" data-pf-collgrid></div></section>`}
    ${bar ? `<div class="pf-bar">${bar}</div>` : ""}
    <section class="pf-sec" data-pf-allwrap aria-labelledby="pf-all-h"><h3 class="pf-h" id="pf-all-h">${featured.length ? (isHome ? T("pf.more") : T("pf.all")) : T("pf.all")}</h3><div class="pgrid pall" data-pf-all></div></section>
    <p class="pf-status" data-pf-status role="status" aria-live="polite"></p>
    ${isHome ? `<div class="acts pf-more"><a class="btn pri lg" href="${BASE}portfolio.html">${T("pf.viewAll")}</a></div>` : ""}`;
    paint(root);
  }
  function paint(root) {
    const isHome = page === "home", ok = p => filter === "all" || p.category === filter;
    const cv = !isHome && collections.find(c => c.id === coll);
    const f = cv ? [] : featured.filter(ok);
    let o = cv ? [] : [...collections.filter(ok).map(c => ({ c })), ...others.filter(p => !collOf(p) && ok(p)).map(p => ({ p }))];
    if (isHome) o = o.slice(0, Math.max(0, +S.homeOtherLimit || 0));
    const fw = $("[data-pf-featwrap]", root), aw = $("[data-pf-allwrap]", root);
    fw.hidden = !f.length; aw.hidden = !o.length;
    $("[data-pf-feat]", root).innerHTML = f.map((p, i) => card(p, i, { big: i === 0 && f.length % 2 === 1 && f.length > 1, eager: !isHome && i === 0 })).join("");
    $("[data-pf-all]", root).innerHTML = o.map((x, i) => x.c ? collCard(x.c, i) : card(x.p, i)).join("");
    const cw = $("[data-pf-collwrap]", root);
    if (cw) cw.hidden = !cv;
    if (cv && cw) {
      $("#pf-coll-h", cw).textContent = L(cv.t);
      $("[data-pf-collback]", cw).textContent = TA.fmt("pf.coll.back", { cat: L((cat(cv.category) || {}).t) });
      const g = $("[data-pf-collgrid]", cw), r = rat(cv.ratio);   // إطار موحّد بنسبة الـCollection (مثلاً 9/5)
      g.classList.toggle("pr", !!r); if (r) g.style.setProperty("--pr", cv.ratio.trim()); else g.style.removeProperty("--pr");
      g.innerHTML = collMembers(cv).map((p, i) => card(p, i, { frame: !!r })).join("");
    }
    $("[data-pf-status]", root).textContent = (!cv && !f.length && !o.length) ? T("pf.nomatch") : "";
    wireImgs(root);
  }

  /* ---------- Lightbox (native <dialog>: focus trap + Esc) ---------- */
  let lb, lbItems = [], lbIdx = 0, lbOpener = null;
  function buildLightbox() {
    if (lb) return;
    lb = document.createElement("dialog"); lb.className = "lb";
    lb.innerHTML = `<div class="lb-in"><button type="button" class="lb-x" data-lb="close"><span></span><span></span></button>
    <button type="button" class="lb-nav prev" data-lb="prev"><span aria-hidden="true"></span></button>
    <figure class="lb-fig"><img alt="" decoding="async"><figcaption><span class="lb-cap"></span><span class="lb-count" aria-live="polite"></span></figcaption></figure>
    <button type="button" class="lb-nav next" data-lb="next"><span aria-hidden="true"></span></button></div>`;
    document.body.append(lb);
    lb.addEventListener("click", e => {
      const b = e.target.closest("[data-lb]");
      if (b) { const a = b.dataset.lb; a === "close" ? lb.close() : go(a === "next" ? 1 : -1); return; }
      if (!e.target.closest(".lb-fig")) lb.close();                 // الضغط على الخلفية يغلق
    });
    lb.addEventListener("close", () => { document.body.classList.remove("lock"); if (lbOpener && lbOpener.isConnected) lbOpener.focus({ preventScroll: true }); });
    lb.addEventListener("keydown", e => {
      const rtl = document.documentElement.dir === "rtl";
      if (e.key === "ArrowRight") { e.preventDefault(); go(rtl ? -1 : 1); }
      if (e.key === "ArrowLeft") { e.preventDefault(); go(rtl ? 1 : -1); }
    });
    let x0 = null;                                                   // سحب باللمس
    lb.addEventListener("touchstart", e => { x0 = e.touches.length === 1 ? e.touches[0].clientX : null; }, { passive: true });
    lb.addEventListener("touchend", e => {
      if (x0 === null) return; const dx = e.changedTouches[0].clientX - x0; x0 = null;
      if (Math.abs(dx) < 50) return;
      const rtl = document.documentElement.dir === "rtl"; go((dx < 0) !== rtl ? 1 : -1);
    }, { passive: true });
  }
  function lbLabels() {
    $("[data-lb=close]", lb).setAttribute("aria-label", T("lb.close"));
    $("[data-lb=prev]", lb).setAttribute("aria-label", T("lb.prev"));
    $("[data-lb=next]", lb).setAttribute("aria-label", T("lb.next"));
  }
  function show() {
    const it = lbItems[lbIdx], im = $("img", lb);
    im.classList.remove("in"); im.src = it.src; im.alt = it.alt;
    if (it.srcset) im.srcset = it.srcset; else im.removeAttribute("srcset");
    $(".lb-cap", lb).textContent = it.alt;
    $(".lb-count", lb).textContent = TA.fmt("lb.counter", { n: lbIdx + 1, total: lbItems.length });
    const multi = lbItems.length > 1; $$(".lb-nav", lb).forEach(b => b.hidden = !multi);
    requestAnimationFrame(() => im.classList.add("in"));
    [1, -1].forEach(d => { const n = lbItems[(lbIdx + d + lbItems.length) % lbItems.length]; if (n && n !== it) new Image().src = n.src; });
  }
  function go(d) { if (lbItems.length < 2) return; lbIdx = (lbIdx + d + lbItems.length) % lbItems.length; show(); }
  function openLightbox(items, idx, opener) {
    buildLightbox(); lbLabels(); lbItems = items; lbIdx = idx; lbOpener = opener; show();
    lb.showModal(); document.body.classList.add("lock");
  }

  /* ---------- Before / After ---------- */
  function beforeAfter(p, b, i) {
    if (!b || !b.before || !b.after) return "";
    const t = title(p), lab = hasText(b.label) ? L(b.label) : "";
    const ar = b.w && b.h ? `${+b.w} / ${+b.h}` : "4 / 3";
    return `<figure class="ba rv" style="--pos:50%;--ar:${ar}">
    ${lab ? `<figcaption class="ba-cap">${esc(lab)}</figcaption>` : ""}
    <div class="ba-stage">
      <img class="ba-img" src="${esc(imgPath(p, b.after, "before-after"))}" alt="${esc(t)} — ${esc(T("cs.after"))}" loading="lazy" decoding="async">
      <img class="ba-img ba-before" src="${esc(imgPath(p, b.before, "before-after"))}" alt="${esc(t)} — ${esc(T("cs.before"))}" loading="lazy" decoding="async">
      <span class="ba-line" aria-hidden="true"><i></i></span>
      <span class="ba-tag b" aria-hidden="true">${T("cs.before")}</span><span class="ba-tag a" aria-hidden="true">${T("cs.after")}</span>
      <input class="ba-range" type="range" min="0" max="100" value="50" step="1" aria-label="${esc(T("cs.slider"))}" aria-valuetext="${esc(T("cs.before"))} / ${esc(T("cs.after"))}">
    </div></figure>`;
  }

  /* ---------- Case study ---------- */
  const row = (key, body, cls = "") => `<section class="cs-sec cs-row rv ${cls}" aria-labelledby="cs-${key}"><h2 id="cs-${key}" class="cs-label">${T("cs." + key)}</h2><div class="cs-body">${body}</div></section>`;
  function linksOf(p) {
    const l = p.links || {}, out = [];
    [["live", "lk.live", true], ["website", "lk.website"], ["github", "lk.github"], ["behance", "lk.behance"], ["instagram", "lk.instagram"], ["video", "lk.video"]].forEach(([k, tk, pri]) => {
      const u = safeUrl(l[k]); if (u) out.push({ u, label: T(tk), pri });
    });
    (Array.isArray(l.other) ? l.other : []).forEach(o => { const u = o && safeUrl(o.url); if (u && hasText(o.label)) out.push({ u, label: L(o.label) }); });
    if (typeof p.pdf === "string" && /\.pdf$/i.test(p.pdf.trim())) out.push({ u: imgPath(p, p.pdf.trim(), ""), label: T("cs.pdf") });
    if (l.whatsapp) {
      const custom = typeof l.whatsapp === "string" && /^https:\/\/wa\.me\//i.test(l.whatsapp) ? l.whatsapp : "";
      out.push({ u: custom || wa(TA.fmt("wa.project", { title: title(p) })), label: T("lk.whatsapp"), wa: true });
    }
    return out;
  }
  let galleryItems = [];
  function projectHtml(p) {
    const t = title(p), c = coverObj(p), src = coverSrc(p), parts = [];
    const meta = [];
    if (catLabel(p)) meta.push([T("cs.category"), catLabel(p)]);
    if (p.client && hasText(p.client)) meta.push([T("cs.client"), L(p.client)]);
    if (p.year) meta.push([T("cs.year"), String(p.year)]);

    // 1) Hero
    parts.push(`<header class="cs-hero wrap">
    <a class="cs-back" href="${BASE}portfolio.html"><span aria-hidden="true" class="arr"></span>${T("cs.back")}</a>
    ${catLabel(p) ? `<p class="pos">${esc(catLabel(p))}</p>` : ""}
    <h1 id="cs-title">${esc(t)}</h1>
    ${hasText(p.description) ? `<p class="cs-lead">${esc(L(p.description))}</p>` : ""}
    ${meta.length ? `<dl class="cs-meta">${meta.map(([k, v]) => `<div><dt>${esc(k)}</dt><dd>${esc(v)}</dd></div>`).join("")}</dl>` : ""}
  </header>`);

    // 2) Cover (الصورة الرئيسية: بدون lazy لتحسين LCP)
    if (src) parts.push(`<figure class="cs-cover wrap"><img data-pimg src="${esc(src)}"${c.srcset ? ` srcset="${esc(c.srcset)}" sizes="${esc(c.sizes || "(max-width: 1180px) 100vw, 1180px")}"` : ""} alt="${esc(L(p.coverAlt) || t)}" width="${esc((p.coverSize && p.coverSize.w) || 1600)}" height="${esc((p.coverSize && p.coverSize.h) || 900)}" fetchpriority="high" decoding="async"></figure>`);

    // 3-5) Overview / Challenge / Solution
    const rows = [];
    if (hasText(p.overview)) rows.push(row("overview", paras(p.overview)));
    if (hasText(p.challenge)) rows.push(row("challenge", paras(p.challenge)));
    if (hasText(p.solution)) rows.push(row("solution", paras(p.solution)));

    // 6) Services
    const sv = list(p.services).filter(Boolean);
    if (sv.length) rows.push(row("services", `<ul class="tl-list cols">${sv.map(x => `<li>${esc(x)}</li>`).join("")}</ul>`));

    // 7) Process
    const pr = (Array.isArray(p.process) ? p.process : []).filter(x => x && (hasText(x.title) || hasText(x.text)));
    if (pr.length) rows.push(row("process", `<ol class="cs-steps">${pr.map((x, i) => `<li><span class="num">0${i + 1}</span><div>${hasText(x.title) ? `<h3>${esc(L(x.title))}</h3>` : ""}${hasText(x.text) ? `<p>${esc(L(x.text))}</p>` : ""}</div></li>`).join("")}</ol>`));
    if (rows.length) parts.push(`<div class="wrap cs-rows">${rows.join("")}</div>`);

    // 8) Gallery
    galleryItems = (Array.isArray(p.gallery) ? p.gallery : []).map((g, i) => {
      const o = typeof g === "string" ? { src: g } : g; if (!o || !o.src) return null;
      return { src: imgPath(p, o.src, "gallery"), srcset: o.srcset || "", alt: L(o.alt) || TA.fmt("cs.img", { title: t, n: i + 1 }), w: o.w, h: o.h };
    }).filter(Boolean);
    if (galleryItems.length) parts.push(`<section class="cs-sec wrap rv" aria-labelledby="cs-gallery"><h2 id="cs-gallery" class="cs-h">${T("cs.gallery")}</h2>
    <ul class="gal">${galleryItems.map((g, i) => `<li><button type="button" class="gal-i" data-gal="${i}" aria-haspopup="dialog" aria-label="${esc(T("lb.open"))}: ${esc(g.alt)}"><img data-pimg src="${esc(g.src)}"${g.srcset ? ` srcset="${esc(g.srcset)}" sizes="(max-width: 600px) 100vw, (max-width: 1000px) 50vw, 33vw"` : ""} alt="${esc(g.alt)}"${g.w && g.h ? ` width="${+g.w}" height="${+g.h}"` : ""} loading="lazy" decoding="async"></button></li>`).join("")}</ul></section>`);

    // 9) Before / After
    const ba = (Array.isArray(p.beforeAfter) ? p.beforeAfter : []).map((b, i) => beforeAfter(p, b, i)).filter(Boolean);
    if (ba.length) parts.push(`<section class="cs-sec wrap" aria-labelledby="cs-ba"><h2 id="cs-ba" class="cs-h">${T("cs.ba")}</h2><div class="ba-list">${ba.join("")}</div></section>`);

    // 10-12) Tools / Results / Links
    const rows2 = [];
    const tools = (Array.isArray(p.tools) ? p.tools : []).filter(Boolean);
    if (tools.length) rows2.push(row("tools", `<ul class="chips">${tools.map(x => `<li>${esc(L(x))}</li>`).join("")}</ul>`));
    const mt = (Array.isArray(p.metrics) ? p.metrics : []).filter(m => m && m.value);
    if (hasText(p.results) || mt.length) rows2.push(row("results", `${paras(p.results)}${mt.length ? `<dl class="metrics">${mt.map(m => `<div><dt>${esc(L(m.label))}</dt><dd>${esc(m.value)}</dd></div>`).join("")}</dl>` : ""}`));
    const lk = linksOf(p);
    if (lk.length) rows2.push(row("links", `<div class="acts left">${lk.map(x => `<a class="btn${x.pri ? " pri" : ""}${x.wa ? " wa-btn" : ""}" href="${esc(x.u)}" target="_blank" rel="noopener noreferrer">${x.wa ? TA.ico("whatsapp", 20, "currentColor") : ""}<span>${esc(x.label)}</span><span class="sr">${esc(T("lk.newtab"))}</span></a>`).join("")}</div>`));
    if (rows2.length) parts.push(`<div class="wrap cs-rows">${rows2.join("")}</div>`);

    // 13) Related
    const n = Math.max(0, +S.relatedCount || 0);
    const rel = [...all.filter(x => x.id !== p.id && x.category === p.category), ...all.filter(x => x.id !== p.id && x.category !== p.category)].slice(0, n);
    if (rel.length) parts.push(`<section class="cs-sec wrap" aria-labelledby="cs-rel"><h2 id="cs-rel" class="cs-h">${T("cs.related")}</h2><div class="pgrid pall">${rel.map((x, i) => card(x, i)).join("")}</div></section>`);

    // 14) CTA
    const q = new URLSearchParams({ service: (cat(p.category) || {}).service || "", note: t }).toString();
    parts.push(`<section class="cta cs-cta" aria-labelledby="cs-cta-h"><div class="wrap"><h2 id="cs-cta-h">${T("cs.cta.h")}</h2><p>${T("cs.cta.sub")}</p>
    <div class="acts"><a class="btn pri lg" href="${BASE}index.html?${esc(q)}#contact">${T("btn.similar")}</a><a class="btn lg wa-btn" href="${esc(wa(TA.fmt("wa.project", { title: t })))}" target="_blank" rel="noopener noreferrer">${TA.ico("whatsapp", 20, "currentColor")}<span>${T("btn.wa")}</span></a></div></div></section>`);
    return parts.join("");
  }

  /* ---------- SEO ديناميكي لكل مشروع ---------- */
  function meta(sel, attr, val) {
    let m = $(sel); if (!m) { m = document.createElement("meta"); const [, k, v] = sel.match(/\[([\w:]+)=["']?([^"'\]]+)/); m.setAttribute(k, v); document.head.append(m); }
    m.setAttribute(attr, val);
  }
  function projectSeo(p) {
    const t = `${title(p)}${(D.seo && D.seo.projectSuffix) || " — Triple A"}`;
    const d = (hasText(p.description) ? L(p.description) : L(p.overview) || L(D.seo.home.description)).replace(/\s+/g, " ").trim().slice(0, 300);
    const url = `${SITE}/project.html?id=${encodeURIComponent(p.id)}`, src = coverSrc(p), img = src ? abs(src) : `${SITE}/og-image.jpg`;
    document.title = t;
    meta("meta[name=description]", "content", d);
    const lk = $("link[rel=canonical]"); if (lk) lk.href = url;
    meta("meta[property='og:title']", "content", t); meta("meta[property='og:description']", "content", d);
    meta("meta[property='og:url']", "content", url); meta("meta[property='og:image']", "content", img);
    meta("meta[property='og:locale']", "content", { ar: "ar_MA", fr: "fr_FR", en: "en_US" }[TA.lang]);
    meta("meta[name='twitter:title']", "content", t); meta("meta[name='twitter:description']", "content", d); meta("meta[name='twitter:image']", "content", img);
    let ld = $("#ld-project"); if (!ld) { ld = document.createElement("script"); ld.type = "application/ld+json"; ld.id = "ld-project"; document.head.append(ld); }
    ld.textContent = JSON.stringify({
      "@context": "https://schema.org", "@type": "CreativeWork", name: title(p), description: d, url, image: img, inLanguage: TA.lang,
      ...(p.year ? { dateCreated: String(p.year) } : {}),
      creator: { "@type": "Organization", name: D.siteName, url: SITE + "/" },
      ...(catLabel(p) ? { genre: catLabel(p) } : {})
    });
  }

  /* ---------- reveal + before/after wiring ---------- */
  const io = "IntersectionObserver" in window ? new IntersectionObserver(es => es.forEach(e => { if (e.isIntersecting) { e.target.classList.add("on"); io.unobserve(e.target); } }), { threshold: .1, rootMargin: "0px 0px -6% 0px" }) : null;
  function reveal(root, instant) { $$(".rv:not(.on)", root).forEach(e => (instant || !io) ? e.classList.add("on") : io.observe(e)); }
  function wireBA(root) {
    $$(".ba", root).forEach(f => { const r = $(".ba-range", f); r.addEventListener("input", () => f.style.setProperty("--pos", r.value + "%")); });
  }

  function renderProject(root, first) {
    const id = new URLSearchParams(location.search).get("id");
    const p = all.find(x => x.id === id);
    if (!p) {
      document.title = `${T("cs.notfound.h")}${(D.seo && D.seo.projectSuffix) || ""}`;
      meta("meta[name=robots]", "content", "noindex");
      const ld = $("#ld-project"); if (ld) ld.remove();
      root.innerHTML = `<section class="nf-in wrap"><h1>${T("cs.notfound.h")}</h1><p>${T("cs.notfound.p")}</p>
      <div class="acts"><a class="btn pri lg" href="${BASE}portfolio.html">${T("nf.portfolio")}</a><a class="btn lg" href="${BASE}index.html">${T("nf.home")}</a></div></section>`;
      return;
    }
    root.innerHTML = projectHtml(p);
    projectSeo(p); wireImgs(root); wireBA(root); reveal(root, !first);
  }

  /* ---------- init + events ---------- */
  let firstRender = true;
  const REMOTE = window.TA_REMOTE && window.TA_REMOTE.enabled ? window.TA_REMOTE : null;   // null = لا اتصال بقاعدة البيانات (السلوك الأصلي)
  function applyRemote() {   // نجاح الجلب → قاعدة البيانات هي المصدر؛ فشل → تبقى بيانات data.js
    if (!REMOTE || REMOTE.state !== "ok") return;
    D.projects = REMOTE.data.projects; D.categories = REMOTE.data.categories; D.collections = REMOTE.data.collections;
    deriveProjects(); deriveTaxonomy();
  }
  function init() {
    if (REMOTE && REMOTE.state === "loading") {   // أثناء الجلب: حالة تحميل (صفحة المشروع فيها نص «جارٍ التحميل» أصلاً)
      const lr = page === "project" ? null : $("[data-portfolio]");
      if (lr) lr.innerHTML = `<p class="pf-status" role="status">${T("cs.loading")}</p>`;
      return;
    }
    if (REMOTE && REMOTE.state === "failed" && !all.length && page !== "project") {   // فشل الاتصال ولا احتياطي محلي: لا نعرض "لا مشاريع" المضلِّلة
      const r0 = $("[data-portfolio]"), lg = document.documentElement.lang;
      if (r0) r0.innerHTML = `<p class="pf-status" role="status">${lg === "ar" ? "تعذّر تحميل المشاريع حالياً. أعد تحميل الصفحة بعد قليل." : lg === "fr" ? "Impossible de charger les projets pour le moment. Réessayez dans un instant." : "Couldn't load the projects right now. Please reload in a moment."}</p>`;
      return;
    }
    const f = firstRender; firstRender = false;
    if (page === "project") { const r = $("#project-root"); if (r) renderProject(r, f); return; }
    const root = $("[data-portfolio]"); if (!root) return;
    mountList(root); reveal(root, !f);
  }
  document.addEventListener("click", e => {
    const cb = e.target.closest("[data-pf-coll]");
    if (cb && page === "portfolio" && !(e.metaKey || e.ctrlKey || e.shiftKey || e.button)) {
      e.preventDefault(); const root = cb.closest("[data-portfolio]"), prev = coll;
      coll = cb.dataset.pfColl; paint(root);
      if (coll) { $("#pf-coll-h", root).focus({ preventScroll: true }); $("[data-pf-collwrap]", root).scrollIntoView({ block: "start", behavior: reduce ? "auto" : "smooth" }); }
      else { const back = $(`[data-pf-all] [data-pf-coll="${CSS.escape(prev)}"]`, root); if (back) back.focus(); }
      return;
    }
    const b = e.target.closest("[data-pf]");
    if (b) {
      coll = ""; filter = b.dataset.pf; const root = b.closest("[data-portfolio]");
      $$("[data-pf]", root).forEach(x => x.setAttribute("aria-pressed", String(x === b)));
      paint(root); return;
    }
    const g = e.target.closest("[data-gal]");
    if (g) openLightbox(galleryItems, +g.dataset.gal, g);
  });
  TA.onRender(init);
  if (REMOTE && REMOTE.promise) REMOTE.promise.then(() => { applyRemote(); init(); });
})();
