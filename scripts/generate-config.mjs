// يعمل على Netlify أثناء البناء (node scripts/generate-config.mjs).
// يقرأ SUPABASE_URL و SUPABASE_ANON_KEY (نفس متغيرات المتجر) ويكتبهما في supabase-config.js،
// فلا تحتاج لصق المفتاح يدوياً ولا وضعه في GitHub. لا يستعمل أي مكتبات.
// ⚠ يرفض تلقائياً أي مفتاح سري (service_role / sb_secret_).
import { writeFileSync, readFileSync } from "node:fs";
const FILE = new URL("../supabase-config.js", import.meta.url);
const env = process.env, fail = m => { console.error("✘ generate-config: " + m); process.exit(1); };
const url = (env.SUPABASE_URL || "").trim().replace(/\/+$/, "").replace(/\/(rest|auth|storage)\/v1.*$/i, ""), key = (env.SUPABASE_ANON_KEY || "").trim();

if (!url && !key) {
  let cur = ""; try { cur = readFileSync(FILE, "utf8"); } catch {}
  const filled = /url:\s*"https:\/\/[^"]+"/.test(cur) && /anonKey:\s*"[^"]{20,}"/.test(cur);
  console.log(filled ? "generate-config: supabase-config.js معبّأ يدوياً — يبقى كما هو."
    : "⚠ generate-config: لا SUPABASE_URL/SUPABASE_ANON_KEY في Netlify ولا قيم في supabase-config.js — لن تظهر مشاريع الأدمن في المعرض!");
  process.exit(0);
}
if (!url || !key) fail("اضبط SUPABASE_URL و SUPABASE_ANON_KEY معاً.");
if (!/^https:\/\/[a-z0-9.-]+$/i.test(url)) fail("SUPABASE_URL غير صالح (يجب أن يبدأ بـ https:// ويكون Project URL فقط).");
if (key.startsWith("sb_secret_")) fail("هذا مفتاح سري (sb_secret_). استعمل المفتاح العام فقط.");
if (!/^[A-Za-z0-9._-]{20,}$/.test(key)) fail("SUPABASE_ANON_KEY بصيغة غير متوقعة.");
if (key.split(".").length === 3) { try { if (JSON.parse(Buffer.from(key.split(".")[1], "base64url").toString()).role === "service_role") fail("هذا مفتاح service_role السري! استعمل anon."); } catch {} }

writeFileSync(FILE, `/* مُولَّد تلقائياً أثناء البناء من متغيرات Netlify (SUPABASE_URL / SUPABASE_ANON_KEY). لا تعدّله يدوياً. */
window.TA_SUPABASE = {
  url: ${JSON.stringify(url)},
  anonKey: ${JSON.stringify(key)}
};
`);
console.log("generate-config: تم كتابة supabase-config.js من متغيرات البيئة.");
