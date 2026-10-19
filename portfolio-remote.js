/* Triple A — portfolio-remote.js
   يجلب مشاريع المعرض المنشورة من Supabase (نفس مشروع المتجر) عبر REST مباشرة — بلا مكتبات.
   • القراءة فقط وبالمفتاح العام؛ سياسات RLS تضمن أن الزائر لا يرى إلا المنشور.
   • إن كان الإعداد فارغاً أو فشل الاتصال أو انتهت المهلة أو جاءت بيانات غير صالحة: لا يتغير شيء
     ويبقى الموقع يعرض مشاريع data.js كما هي (احتياطي آمن).
   • كل نص قادم من قاعدة البيانات يُنقَّى هنا، ثم تهربه portfolio.js عند العرض (esc) — لا يُفسَّر HTML أبداً.
   يُحمَّل قبل portfolio.js ويعرّف window.TA_REMOTE. */
(() => {
  "use strict";
  const C = window.TA_SUPABASE || {};
  const url = String(C.url || "").trim().replace(/\/(rest|auth|storage)\/v1.*$/i, "").replace(/\/+$/, ""), key = String(C.anonKey || "").trim();
  const LANGS = ["ar", "fr", "en"], BUCKET = "product-images", TIMEOUT = 8000;

  // لا نعمل أبداً بمفتاح سري: نرفض sb_secret_ ونرفض JWT دوره service_role
  function keyIsSafe(k) {
    if (/^sb_secret_/i.test(k)) return false;
    const p = k.split(".");
    if (p.length === 3) { try { const role = JSON.parse(atob(p[1].replace(/-/g, "+").replace(/_/g, "/"))).role; if (role && role !== "anon") return false; } catch (e) { /* ليس JWT قياسياً */ } }
    return true;
  }
  const enabled = /^https:\/\/[a-z0-9.-]+$/i.test(url) && key.length > 20 && /^[\w.-]+$/.test(key) && keyIsSafe(key);
  if (!enabled && (url || key)) console.warn("[portfolio] إعداد Supabase غير صالح أو مفتاح غير عام — يُستعمل data.js فقط.");
  else if (!enabled) console.warn("[portfolio] supabase-config.js فارغ — يُعرض محتوى data.js فقط ولن يظهر ما تضيفه من لوحة الأدمن. املأ url و anonKey.");

  /* ---------- تنقية وتحويل صفوف القاعدة إلى شكل مشاريع data.js ---------- */
  const str = (v, max = 5000) => typeof v === "string" ? v.slice(0, max) : "";
  const ml = o => { const r = {}; if (o && typeof o === "object" && !Array.isArray(o)) LANGS.forEach(l => { const s = str(o[l]); if (s.trim()) r[l] = s; }); return r; };
  const arr = (v, n) => Array.isArray(v) ? v.slice(0, n) : [];
  const isId = s => typeof s === "string" && /^[a-z0-9][a-z0-9_-]*$/i.test(s);
  // صورة: مسار تخزين Supabase → رابط عام، https كما هو، مسار نسبي محلي كما هو، وغير ذلك (javascript:/data:/…) يُرفض
  function img(src) {
    const s = str(src, 600).trim(); if (!s) return "";
    if (/^portfolio\/[\w./ -]+$/.test(s) && !s.includes("..")) return `${url}/storage/v1/object/public/${BUCKET}/${s.split("/").map(encodeURIComponent).join("/")}`;
    if (/^https:\/\/[^\s]+$/i.test(s)) return s;
    if (!/^[a-z][a-z0-9+.-]*:/i.test(s) && !s.startsWith("//") && !s.includes("..")) return s;
    return "";
  }
  const dim = v => Number.isInteger(v) && v > 0 && v < 20000 ? v : 0;
  function project(r) {
    if (!r || !isId(r.slug)) return null;
    const p = { id: r.slug, category: str(r.category_slug, 80), featured: r.is_featured === true, featuredOrder: Number.isFinite(r.sort_order) ? r.sort_order : 0,
      title: ml(r.title), description: ml(r.description), overview: ml(r.overview), challenge: ml(r.challenge), solution: ml(r.solution), results: ml(r.results) };
    if (!Object.keys(p.title).length) return null;
    if (isId(r.collection_slug)) p.collection = r.collection_slug;
    const sv = {}; if (r.services && typeof r.services === "object") LANGS.forEach(l => { const a = arr(r.services[l], 12).map(x => str(x, 120).trim()).filter(Boolean); if (a.length) sv[l] = a; }); p.services = sv;
    p.tools = arr(r.tools, 30).map(x => str(x, 60).trim()).filter(Boolean);
    if (r.year) p.year = str(r.year, 10); if (r.client) p.client = str(r.client, 200);
    p.cover = img(r.cover);
    if (/^\d+(\.\d+)?\/\d+(\.\d+)?$/.test(str(r.cover_ratio))) p.ratio = r.cover_ratio;
    if (dim(r.cover_w) && dim(r.cover_h)) p.coverSize = { w: r.cover_w, h: r.cover_h };
    p.gallery = arr(r.gallery, 20).map(g => { const src = img(g && g.src); if (!src) return null; const o = { src }; if (dim(g.w) && dim(g.h)) { o.w = g.w; o.h = g.h; } if (g.alt) o.alt = ml(g.alt); return o; }).filter(Boolean);
    const pdf = str(r.pdf_url, 500).trim(); if (pdf && /\.pdf$/i.test(pdf)) p.pdf = img(pdf);
    const l = r.links && typeof r.links === "object" ? r.links : {}, links = {};
    ["live", "github", "behance", "instagram", "video", "website"].forEach(k => { const v = str(l[k], 500).trim(); if (/^https?:\/\/[^\s]+$/i.test(v)) links[k] = v; });   // يمنع javascript: وغيره
    if (l.whatsapp === true) links.whatsapp = true; else if (typeof l.whatsapp === "string" && /^https:\/\/wa\.me\//i.test(l.whatsapp)) links.whatsapp = l.whatsapp;
    links.other = arr(l.other, 10).map(o => o && /^https?:\/\/[^\s]+$/i.test(str(o.url).trim()) ? { label: ml(o.label), url: o.url.trim() } : null).filter(Boolean);
    p.links = links;
    const x = r.extra && typeof r.extra === "object" ? r.extra : {};
    p.process = arr(x.process, 12).map(s => ({ title: ml(s && s.title), text: ml(s && s.text) }));
    p.metrics = arr(x.metrics, 12).map(m => m && str(m.value, 30) ? { value: str(m.value, 30), label: ml(m.label) } : null).filter(Boolean);
    p.beforeAfter = arr(x.beforeAfter, 6).map(b => { const bf = img(b && b.before), af = img(b && b.after); if (!bf || !af) return null; const o = { before: bf, after: af, label: ml(b.label) }; if (dim(b.w) && dim(b.h)) { o.w = b.w; o.h = b.h; } return o; }).filter(Boolean);
    return p;
  }
  function map(projectRows, catRows, collRows) {
    const seen = new Set(), projects = arr(projectRows, 500).map(project).filter(p => p && !seen.has(p.id) && seen.add(p.id));
    const categories = arr(catRows, 100).filter(c => c && isId(c.slug)).map(c => ({ id: c.slug, service: str(c.service, 40), t: ml(c.names) })).filter(c => Object.keys(c.t).length);
    const collections = arr(collRows, 100).filter(c => c && isId(c.slug) && isId(c.category_slug)).map(c => ({ id: c.slug, category: c.category_slug, ratio: /^\d+(\.\d+)?\/\d+(\.\d+)?$/.test(str(c.ratio)) ? c.ratio : undefined, t: ml(c.names) })).filter(c => Object.keys(c.t).length);
    return { projects, categories, collections };
  }

  /* ---------- الجلب ---------- */
  const R = window.TA_REMOTE = { enabled, state: enabled ? "loading" : "off", data: null, promise: null, map };
  if (!enabled) return;
  const ctl = typeof AbortController === "function" ? new AbortController() : null, timer = setTimeout(() => ctl && ctl.abort(), TIMEOUT);
  const get = q => fetch(`${url}/rest/v1/${q}`, { headers: { apikey: key, Authorization: `Bearer ${key}`, Accept: "application/json" }, cache: "no-store", signal: ctl ? ctl.signal : undefined })
    .then(res => { if (!res.ok) throw new Error("HTTP " + res.status); return res.json(); });
  R.promise = Promise.all([
    get("portfolio_projects?select=*&is_published=eq.true&order=sort_order.asc,created_at.desc&limit=500"),
    get("portfolio_categories?select=*&is_active=eq.true&order=sort_order.asc"),
    get("portfolio_collections?select=*&is_active=eq.true&order=sort_order.asc")
  ]).then(([p, c, k]) => {
    if (!Array.isArray(p) || !Array.isArray(c) || !Array.isArray(k)) throw new Error("bad response");
    R.data = map(p, c, k); R.state = "ok";
  }).catch(e => { R.state = "failed"; R.error = String(e && e.message || e); console.warn("[portfolio] تعذّر تحميل المشاريع من قاعدة البيانات — يُعرض المحتوى المحلي:", e && e.message); })
    .finally(() => clearTimeout(timer));
})();
