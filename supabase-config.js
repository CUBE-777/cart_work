/* Triple A — إعداد الاتصال بقاعدة البيانات (Supabase) لجلب مشاريع المعرض.
   ▶ هذا الملف هو سبب عدم ظهور مشاريع الأدمن: إن بقي فارغاً يعرض الموقع data.js فقط.
   ▶ الصق القيمتين نفسيهما الموجودتين في متجر Triple A (Supabase → Project Settings → API):
        url      = Project URL         مثل: https://abcdxyz.supabase.co
        anonKey  = المفتاح العام        (anon / publishable) فقط
   ⛔ ممنوع وضع service_role أو sb_secret_… هنا (الملف عام يراه كل زائر، والموقع يرفضه تلقائياً).
   بعد التعبئة: انشر الموقع، ثم افتح Console واكتب TA_REMOTE  →  يجب أن ترى state: "ok". */
window.TA_SUPABASE = {
  url: "",       // ← الصق Project URL هنا
  anonKey: ""    // ← الصق المفتاح العام هنا
};
