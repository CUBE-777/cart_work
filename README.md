# Triple A — Creative Digital Studio

Vanilla HTML/CSS/JS (no build step, no framework). Open `index.html` or drop the folder on Netlify.

## الملفات
| الملف | الدور |
|---|---|
| `index.html` `style.css` `script.js` | الصفحة الرئيسية (كما هي، مع إصلاحات) |
| `portfolio.html` | صفحة المعرض (Featured + All Projects + Filters) |
| `project.html?id=...` | قالب واحد لكل صفحات Case Study |
| `portfolio.js` | محرّك المعرض والـCase Study والـLightbox (لا تحتاج تعديله) |
| `site.js` | الهيكل المشترك للصفحات الداخلية (لغة/ثيم/قائمة/فوتر) |
| `data.js` | **كل البيانات والنصوص والمشاريع** |
| `404.html` | صفحة الخطأ (3 لغات) |
| `sitemap.xml` `robots.txt` | SEO |
| `assets/portfolio/` | صور المشاريع |

## إضافة مشروع
1. أنشئ `assets/portfolio/اسم-المشروع/` وضع فيه `cover.webp` و`gallery/` (و`before-after/` اختيارياً).
2. في `data.js` انسخ القالب الموجود داخل التعليق في `projects: [ ... ]` واملأه (التعليقات بالعربية تشرح كل حقل).
3. احفظ — يظهر المشروع تلقائياً. أضف رابطه في `sitemap.xml`.

## Notes
- Contact form opens WhatsApp with the request pre-filled; "Or send by email" opens a pre-filled mailto. No backend.
- Languages: Arabic (RTL) / French / English. All texts live in `data.js` → `t`, `seo`, `categories`, `projects`.
- Fonts: Unbounded + IBM Plex Sans Arabic via Google Fonts (system fallbacks included).
- Prices: set `from: "300"` on any product/package to show "From 300 MAD". Empty = "Custom quote".
- YouTube: add the real URL in `data.js` → `socials` → youtube, then set `enabled: true`.

## ربط المعرض بقاعدة البيانات (اختياري)
المشاريع يمكن أن تُدار من لوحة إدارة المتجر (تبويب «إدارة المعرض») وتُقرأ هنا من نفس Supabase.
1. نفّذ ترحيلات `006`–`008` في مشروع Supabase (موجودة في `supabase/migrations/` بمشروع المتجر) وتحقق من ظهور المشروع الحالي في لوحة الإدارة.
2. افتح `supabase-config.js` وضع **Project URL** و**المفتاح العام (anon/publishable)** فقط. ⛔ ممنوع service_role.
3. انشر الموقع.

السلوك: الإعداد فارغ ⇒ الموقع يعمل من `data.js` تماماً كما كان. الإعداد موجود والاتصال ناجح ⇒ قاعدة البيانات هي المصدر الوحيد (فإخفاء مشروع من الإدارة يخفيه هنا). فشل الاتصال/المهلة (8 ثوانٍ) ⇒ يُعرض محتوى `data.js` كاحتياطي.
ملفات جديدة: `supabase-config.js` و`portfolio-remote.js` (بدون مكتبات). `sitemap.xml` يبقى يدوياً: أضف رابط كل مشروع جديد.
