// Triple A — Creative Digital Studio — المصدر الوحيد للبيانات (single source of truth).
// كل النصوص على شكل {ar, fr, en}. إذا نقصت لغة يُستخدم الإنجليزي.
// عدّل بيانات التواصل والأسعار والمشاريع من هنا فقط؛ لا حاجة لتعديل أي ملف آخر.
const TRIPLE_A = {
  siteName: "Triple A — Creative Digital Studio",   // الاسم الرسمي: يُستخدم في الفوتر وSEO والـStructured Data
  brand: "TRIPLE A",
  logo: "logo.webp",          // hero / large
  logoSm: "logo-sm.webp",     // navbar / preloader
  phone: "+212633740099",
  whatsapp: "212633740099",   // international format, digits only
  whatsappMessage: { ar: "مرحبا Triple A، عندي مشروع", fr: "Bonjour Triple A, j'ai un projet", en: "Hello Triple A, I have a project" },
  email: "triple.a.code@gmail.com",
  website: "https://triple-a-a-a.netlify.app",
  // رابط المتجر (Triple A Store). ضع هنا الرابط الكامل بعد نشر المتجر، مثال: "https://your-store.netlify.app"
  // اتركه فارغاً = لا يظهر أي رابط للمتجر (لا رابط مكسور). يظهر في القائمة والفوتر وزر في أعلى الصفحة الرئيسية.
  storeUrl: "https://triple-a-store.netlify.app",
  theme: { default: "dark" },
  language: { default: "ar", available: ["ar", "fr", "en"] },
  contactForm: { enabled: true },

  // Prices are intentionally empty. Fill "from" (e.g. "300") to show "Starting from 300 MAD".
  currency: "MAD",

  t: {
    "nav.work": { ar: "أعمالنا", fr: "RÉALISATIONS", en: "WORK" },
    "nav.services": { ar: "الخدمات", fr: "SERVICES", en: "SERVICES" },
    "nav.about": { ar: "من نحن", fr: "À PROPOS", en: "ABOUT" },
    "nav.contact": { ar: "تواصل", fr: "CONTACT", en: "CONTACT" },
    "nav.store": { ar: "المتجر", fr: "BOUTIQUE", en: "STORE" },
    "btn.start": { ar: "ابدأ مشروعك", fr: "DÉMARRER UN PROJET", en: "START A PROJECT" },
    "btn.explore": { ar: "اكتشف أعمالنا", fr: "VOIR NOS RÉALISATIONS", en: "EXPLORE OUR WORK" },
    "btn.wa": { ar: "راسلنا على واتساب", fr: "ÉCRIRE SUR WHATSAPP", en: "WHATSAPP US" },
    "btn.store": { ar: "زُر المتجر", fr: "VISITER LA BOUTIQUE", en: "VISIT THE STORE" },
    "btn.quote": { ar: "اطلب عرض سعر", fr: "DEMANDER UN DEVIS", en: "GET A QUOTE" },
    "btn.order": { ar: "اطلب الآن", fr: "COMMANDER", en: "ORDER THIS" },
    "btn.save": { ar: "حفظ جهة الاتصال", fr: "Enregistrer le contact", en: "Save contact" },
    "btn.close": { ar: "إغلاق", fr: "Fermer", en: "Close" },
    "btn.similar": { ar: "ابدأ مشروعاً مشابهاً", fr: "LANCER UN PROJET SIMILAIRE", en: "START A SIMILAR PROJECT" },
    "hero.pos": { ar: "DESIGN • PRINT • DIGITAL", fr: "DESIGN • PRINT • DIGITAL", en: "DESIGN • PRINT • DIGITAL" },
    "hero.l1": { ar: "نصمّم.", fr: "ON CONÇOIT.", en: "WE DESIGN." },
    "hero.l2": { ar: "نطبع.", fr: "ON IMPRIME.", en: "WE PRINT." },
    "hero.l3": { ar: "نبني.", fr: "ON CONSTRUIT.", en: "WE BUILD." },
    "hero.sub": { ar: "تصميم إبداعي وطباعة احترافية وتجارب رقمية — كلها تحت سقف واحد.", fr: "Design créatif, impression professionnelle et expériences digitales — sous un même toit.", en: "Creative design, professional printing and digital experiences — all under one roof." },
    "svc.h": { ar: "ماذا نفعل", fr: "CE QUE NOUS FAISONS", en: "WHAT WE DO" },
    "svc.sub": { ar: "ثلاثة تخصصات. فريق واحد. علامتك لا تنتقل بين أيادٍ مختلفة.", fr: "Trois disciplines. Une équipe. Votre marque ne change jamais de mains.", en: "Three disciplines. One team. Your brand never changes hands." },
    "prod.h": { ar: "مصنوع لعلامتك", fr: "FAIT POUR VOTRE MARQUE", en: "MADE FOR YOUR BRAND" },
    "prod.sub": { ar: "من البكسل إلى الورق.", fr: "Du pixel au papier.", en: "From pixels to print." },
    "prod.from": { ar: "ابتداءً من", fr: "À partir de", en: "From" },
    "pkg.h": { ar: "الباقات", fr: "OFFRES", en: "PACKAGES" },
    "pkg.sub": { ar: "اختر نقطة بداية، ونعدّلها حسب مشروعك.", fr: "Choisissez un point de départ. Nous l'adaptons à votre projet.", en: "Pick a starting point. We tune it to your project." },
    "pkg.pop": { ar: "الأكثر طلباً", fr: "LE PLUS POPULAIRE", en: "MOST POPULAR" },
    "pkg.from": { ar: "ابتداءً من", fr: "À partir de", en: "Starting from" },
    "pkg.custom": { ar: "السعر حسب الطلب", fr: "Sur devis", en: "Custom quote" },
    "pkg.note": { ar: "السعر النهائي يعتمد على الكمية والورق والتشطيب.", fr: "Le prix final dépend de la quantité, du papier et de la finition.", en: "Final price depends on quantity, paper and finish." },
    "work.h": { ar: "أعمال مختارة", fr: "RÉALISATIONS", en: "SELECTED WORK" },
    "work.sub": { ar: "نحن لا نصنع قطعة واحدة. نبني هوية كاملة.", fr: "Nous ne faisons pas une seule pièce. Nous construisons une identité complète.", en: "We don't make one piece. We build the whole identity." },
    "work.inside": { ar: "ماذا في المشروع", fr: "Dans ce projet", en: "What's inside" },
    "tag.sample": { ar: "نموذج", fr: "Exemple", en: "Concept" },
    "why.h": { ar: "لماذا Triple A؟", fr: "POURQUOI TRIPLE A ?", en: "WHY TRIPLE A?" },
    "why.about": {
      ar: "Triple A استوديو إبداعي من ثلاثة أشخاص. نصمّم الهوية، ونطبع المواد، ونبني الجانب الرقمي — فيبدو كل شيء وكأنه خرج من يد واحدة.",
      fr: "Triple A est un studio créatif de trois personnes. Nous concevons l'identité, imprimons les supports et construisons le digital — pour que tout semble sorti de la même main.",
      en: "Triple A is a three-person creative studio. We design the identity, print the materials and build the digital side — so everything looks like it came from the same hand."
    },
    "how.h": { ar: "كيف نعمل", fr: "COMMENT ÇA MARCHE", en: "HOW IT WORKS" },
    "for.h": { ar: "ماذا تحتاج؟", fr: "DE QUOI AVEZ-VOUS BESOIN ?", en: "WHAT DO YOU NEED?" },
    "for.sub": { ar: "اختر حالتك، ونجمع لك الأنسب.", fr: "Choisissez votre cas, nous composons le reste.", en: "Pick your situation. We assemble the right set." },
    "proof.h": { ar: "أعمالنا تتحدث عنا", fr: "NOS RÉALISATIONS PARLENT", en: "OUR WORK SPEAKS FOR ITSELF" },
    "cta.h": { ar: "لنصنع شيئاً يستحق أن يُتذكَّر.", fr: "CRÉONS QUELQUE CHOSE DONT ON SE SOUVIENDRA.", en: "LET'S CREATE SOMETHING WORTH REMEMBERING." },
    "cta.sub": { ar: "عندك فكرة أو علامة أو فعالية؟ لنحوّلها إلى شيء حقيقي.", fr: "Une idée, une marque ou un événement ? Rendons-le réel.", en: "Have an idea, a brand or an event? Let's turn it into something real." },
    "con.h": { ar: "ابدأ مشروعك", fr: "DÉMARREZ VOTRE PROJET", en: "START YOUR PROJECT" },
    "con.sub": { ar: "أربع خانات فقط. هذا كل ما نحتاجه لنبدأ.", fr: "Quatre champs. C'est tout ce qu'il faut pour commencer.", en: "Four fields. That's all we need to begin." },
    "f.name": { ar: "الاسم", fr: "Nom", en: "Name" },
    "f.service": { ar: "الخدمة", fr: "Service", en: "Service" },
    "f.choose": { ar: "اختر الخدمة", fr: "Choisir un service", en: "Choose a service" },
    "f.qty": { ar: "الكمية", fr: "Quantité", en: "Quantity" },
    "f.qtyph": { ar: "مثال: 500", fr: "ex. 500", en: "e.g. 500" },
    "f.msg": { ar: "رسالتك", fr: "Message", en: "Message" },
    "f.send": { ar: "أرسل طلب المشروع", fr: "ENVOYER LA DEMANDE", en: "SEND PROJECT REQUEST" },
    "f.mail": { ar: "أو أرسلها بالبريد", fr: "Ou envoyer par e-mail", en: "Or send by email" },
    "f.err": { ar: "أضف اسمك واختر الخدمة.", fr: "Ajoutez votre nom et choisissez un service.", en: "Add your name and choose a service." },
    "f.ok": { ar: "جاري فتح واتساب بطلبك…", fr: "Ouverture de WhatsApp avec votre demande…", en: "Opening WhatsApp with your request…" },
    "foot.nav": { ar: "التنقل", fr: "Navigation", en: "Navigation" },
    "foot.rights": { ar: "© 2026 Triple A — Creative Digital Studio", fr: "© 2026 Triple A — Creative Digital Studio", en: "© 2026 Triple A — Creative Digital Studio" },
    // ---- التنقل ----
    "nav.home": { ar: "الرئيسية", fr: "ACCUEIL", en: "HOME" },
    "nav.portfolio": { ar: "الأعمال", fr: "PORTFOLIO", en: "PORTFOLIO" },
    // ---- المعرض Portfolio ----
    "pf.hero.h": { ar: "أعمالنا", fr: "NOS RÉALISATIONS", en: "OUR PORTFOLIO" },
    "pf.hero.sub": { ar: "مشاريع حقيقية من التصميم والتطوير والفيديو والخدمات الرقمية.", fr: "Des projets réels en design, développement, vidéo et services digitaux.", en: "Real projects across design, development, video and digital services." },
    "pf.featured": { ar: "مشاريع مميزة", fr: "Projets à la une", en: "Featured Projects" },
    "pf.more": { ar: "باقي المشاريع", fr: "Autres projets", en: "More Projects" },
    "pf.all": { ar: "كل المشاريع", fr: "Tous les projets", en: "All Projects" },
    "pf.viewAll": { ar: "عرض كل المشاريع", fr: "VOIR TOUS LES PROJETS", en: "VIEW ALL PROJECTS" },
    "pf.view": { ar: "عرض المشروع", fr: "Voir le projet", en: "View project" },
    "pf.filter": { ar: "تصفية المشاريع حسب الفئة", fr: "Filtrer les projets par catégorie", en: "Filter projects by category" },
    "pf.filter.all": { ar: "الكل", fr: "TOUT", en: "ALL" },
    "pf.empty.h": { ar: "مشاريع جديدة قادمة قريباً", fr: "De nouveaux projets arrivent bientôt", en: "New projects are coming soon" },
    "pf.empty.p": { ar: "نجهّز أعمالنا الحقيقية للعرض هنا. في الأثناء، يسعدنا الحديث عن مشروعك.", fr: "Nous préparons nos vrais projets pour les présenter ici. En attendant, parlons du vôtre.", en: "We're preparing our real work for display here. Meanwhile, we'd love to hear about your project." },
    "pf.nomatch": { ar: "لا توجد مشاريع في هذه الفئة حالياً.", fr: "Aucun projet dans cette catégorie pour le moment.", en: "No projects in this category yet." },
    "pf.count": { ar: "{n} مشروع", fr: "{n} projet(s)", en: "{n} project(s)" },
    "pf.coll.back": { ar: "العودة إلى {cat}", fr: "Retour à {cat}", en: "Back to {cat}" },
    "cs.pdf": { ar: "مشاهدة PDF الكامل", fr: "Voir le PDF complet", en: "View Full PDF" },
    "pf.cta.h": { ar: "هل لديك مشروع في بالك؟", fr: "UN PROJET EN TÊTE ?", en: "GOT A PROJECT IN MIND?" },
    "pf.cta.sub": { ar: "أخبرنا بفكرتك ونحوّلها إلى عمل يستحق الظهور هنا.", fr: "Parlez-nous de votre idée et transformons-la en réalisation digne de figurer ici.", en: "Tell us your idea and we'll turn it into work worth showing here." },
    // ---- صفحة المشروع Case Study ----
    "cs.back": { ar: "العودة إلى الأعمال", fr: "Retour aux réalisations", en: "Back to portfolio" },
    "cs.category": { ar: "الفئة", fr: "Catégorie", en: "Category" },
    "cs.client": { ar: "العميل", fr: "Client", en: "Client" },
    "cs.year": { ar: "السنة", fr: "Année", en: "Year" },
    "cs.overview": { ar: "نظرة عامة", fr: "Aperçu", en: "Overview" },
    "cs.challenge": { ar: "التحدي", fr: "Le défi", en: "The Challenge" },
    "cs.solution": { ar: "الحل", fr: "La solution", en: "The Solution" },
    "cs.services": { ar: "الخدمات", fr: "Services", en: "Services" },
    "cs.process": { ar: "مراحل العمل", fr: "Démarche", en: "Process" },
    "cs.gallery": { ar: "معرض الصور", fr: "Galerie", en: "Gallery" },
    "cs.ba": { ar: "قبل / بعد", fr: "Avant / Après", en: "Before / After" },
    "cs.before": { ar: "قبل", fr: "Avant", en: "Before" },
    "cs.after": { ar: "بعد", fr: "Après", en: "After" },
    "cs.slider": { ar: "اسحب للمقارنة بين قبل وبعد", fr: "Faites glisser pour comparer avant et après", en: "Drag to compare before and after" },
    "cs.tools": { ar: "الأدوات والتقنيات", fr: "Outils et technologies", en: "Tools & Technologies" },
    "cs.results": { ar: "النتائج", fr: "Résultats", en: "Results" },
    "cs.links": { ar: "روابط المشروع", fr: "Liens du projet", en: "Project Links" },
    "cs.related": { ar: "مشاريع مشابهة", fr: "Projets similaires", en: "Related Projects" },
    "cs.cta.h": { ar: "لنصنع مشروعك القادم.", fr: "CRÉONS VOTRE PROCHAIN PROJET.", en: "LET'S BUILD YOUR NEXT PROJECT." },
    "cs.cta.sub": { ar: "أعجبك هذا العمل؟ أخبرنا عن فكرتك.", fr: "Ce travail vous plaît ? Parlez-nous de votre idée.", en: "Like what you see? Tell us about your idea." },
    "cs.img": { ar: "{title} — صورة {n}", fr: "{title} — image {n}", en: "{title} — image {n}" },
    "cs.notfound.h": { ar: "المشروع غير موجود", fr: "PROJET INTROUVABLE", en: "PROJECT NOT FOUND" },
    "cs.notfound.p": { ar: "قد يكون الرابط غير صحيح أو أن المشروع لم يعد معروضاً.", fr: "Le lien est peut-être incorrect ou le projet n'est plus affiché.", en: "The link may be wrong, or the project is no longer listed." },
    "cs.loading": { ar: "جارٍ التحميل…", fr: "Chargement…", en: "Loading…" },
    // ---- Lightbox ----
    "lb.open": { ar: "تكبير الصورة", fr: "Agrandir l'image", en: "Enlarge image" },
    "lb.close": { ar: "إغلاق", fr: "Fermer", en: "Close" },
    "lb.prev": { ar: "الصورة السابقة", fr: "Image précédente", en: "Previous image" },
    "lb.next": { ar: "الصورة التالية", fr: "Image suivante", en: "Next image" },
    "lb.counter": { ar: "{n} / {total}", fr: "{n} / {total}", en: "{n} / {total}" },
    // ---- روابط المشروع ----
    "lk.live": { ar: "الموقع المباشر", fr: "Voir le site en ligne", en: "Live Demo" },
    "lk.github": { ar: "الكود على GitHub", fr: "Code sur GitHub", en: "View on GitHub" },
    "lk.behance": { ar: "على Behance", fr: "Sur Behance", en: "View on Behance" },
    "lk.instagram": { ar: "على Instagram", fr: "Sur Instagram", en: "View on Instagram" },
    "lk.video": { ar: "شاهد الفيديو", fr: "Voir la vidéo", en: "Watch video" },
    "lk.website": { ar: "موقع خارجي", fr: "Site externe", en: "External website" },
    "lk.whatsapp": { ar: "اسأل عن مشروع مشابه", fr: "Demander un projet similaire", en: "Ask about a similar project" },
    "lk.newtab": { ar: "(يفتح في نافذة جديدة)", fr: "(s'ouvre dans un nouvel onglet)", en: "(opens in a new tab)" },
    "wa.project": { ar: "مرحبا Triple A، أريد مشروعاً مثل: {title}", fr: "Bonjour Triple A, je souhaite un projet comme : {title}", en: "Hello Triple A, I'd like a project like: {title}" },
    // ---- صفحة 404 ----
    "nf.h": { ar: "ضاعت الصفحة في المطبعة.", fr: "Perdue à l'impression.", en: "Lost in print." },
    "nf.p": { ar: "هذه الصفحة غير موجودة أو تم نقلها.", fr: "Cette page n'existe pas ou a été déplacée.", en: "This page doesn't exist or has moved." },
    "nf.home": { ar: "العودة إلى الرئيسية", fr: "RETOUR À L'ACCUEIL", en: "BACK TO HOME" },
    "nf.portfolio": { ar: "تصفّح الأعمال", fr: "VOIR LES RÉALISATIONS", en: "BROWSE PORTFOLIO" },
    // ---- إمكانية الوصول (aria-label) والنماذج ----
    "aria.home": { ar: "Triple A — الصفحة الرئيسية", fr: "Triple A — accueil", en: "Triple A — home" },
    "aria.main": { ar: "التنقل الرئيسي", fr: "Navigation principale", en: "Main navigation" },
    "aria.foot": { ar: "تنقل الفوتر", fr: "Navigation du pied de page", en: "Footer navigation" },
    "aria.lang": { ar: "اللغة", fr: "Langue", en: "Language" },
    "aria.theme": { ar: "تبديل المظهر (داكن / فاتح)", fr: "Changer de thème (sombre / clair)", en: "Toggle theme (dark / light)" },
    "aria.menu": { ar: "القائمة", fr: "Menu", en: "Menu" },
    "aria.wa": { ar: "تواصل عبر واتساب", fr: "Contacter sur WhatsApp", en: "Chat on WhatsApp" },
    "aria.logo": { ar: "شعار Triple A: ثلاثة حروف A متداخلة تشكّل مثلثاً", fr: "Logo Triple A : trois lettres A entrelacées formant un triangle", en: "Triple A logo: three interlocking letter A shapes forming a triangle" },
    "f.subject": { ar: "طلب مشروع — ", fr: "Demande de projet — ", en: "Project request — " },
    "ui.skip": { ar: "تخطَّ إلى المحتوى", fr: "Aller au contenu", en: "Skip to content" },
    "ui.email": { ar: "البريد", fr: "E-mail", en: "Email" },
    "ui.call": { ar: "اتصال", fr: "Appeler", en: "Call" }
  },

  serviceOptions: [
    { v: "Design", t: { ar: "تصميم", fr: "Design", en: "Design" } },
    { v: "Printing", t: { ar: "طباعة", fr: "Impression", en: "Printing" } },
    { v: "Branding", t: { ar: "هوية بصرية", fr: "Branding", en: "Branding" } },
    { v: "Digital", t: { ar: "رقمي", fr: "Digital", en: "Digital" } },
    { v: "Other", t: { ar: "أخرى", fr: "Autre", en: "Other" } }
  ],

  // Three pillars. "art" picks the SVG drawn in script.js.
  pillars: [
    {
      id: "design", n: "01", service: "Design",
      name: { ar: "التصميم", fr: "DESIGN", en: "DESIGN" },
      tag: { ar: "علامتك. حِرفتنا.", fr: "Votre marque. Notre savoir-faire.", en: "Your brand. Our craft." },
      items: {
        en: ["Logo Design", "Branding", "Social Media Design", "Posters", "Motion Design", "Visual Identity"],
        ar: ["تصميم الشعارات", "العلامة التجارية", "تصاميم السوشيال ميديا", "البوسترات", "موشن جرافيك", "الهوية البصرية"],
        fr: ["Création de logo", "Branding", "Design réseaux sociaux", "Affiches", "Motion design", "Identité visuelle"]
      }
    },
    {
      id: "print", n: "02", service: "Printing",
      name: { ar: "الطباعة", fr: "PRINT", en: "PRINT" },
      tag: { ar: "تصميم لا يبقى حبيس الشاشة.", fr: "Un design qui ne reste pas sur l'écran.", en: "Design that doesn't stay on screen." },
      items: {
        en: ["Business Cards", "Stickers", "Flyers", "Certificates", "Badges", "Invitations", "Thank-you Cards", "Menus", "Labels"],
        ar: ["بطاقات العمل", "ستيكرات", "فلايرز", "شهادات", "بادجات", "دعوات", "بطاقات شكر", "قوائم الطعام", "لصاقات"],
        fr: ["Cartes de visite", "Stickers", "Flyers", "Certificats", "Badges", "Invitations", "Cartes de remerciement", "Menus", "Étiquettes"]
      }
    },
    {
      id: "digital", n: "03", service: "Digital",
      name: { ar: "الرقمي", fr: "DIGITAL", en: "DIGITAL" },
      tag: { ar: "مبني ليُستخدم، لا ليُشاهَد فقط.", fr: "Conçu pour servir, pas seulement pour être vu.", en: "Built to be used, not just viewed." },
      items: {
        en: ["Websites", "Landing Pages", "Digital Menus", "QR Solutions", "Interactive Experiences"],
        ar: ["مواقع إلكترونية", "صفحات هبوط", "منيو رقمي", "حلول QR", "تجارب تفاعلية"],
        fr: ["Sites web", "Landing pages", "Menus digitaux", "Solutions QR", "Expériences interactives"]
      }
    }
  ],

  // "from": "" hides the price line. Set e.g. "150" to show "From 150 MAD".
  products: [
    {
      id: "cards", mock: "card", span: 4, service: "Printing", from: "",
      name: { ar: "بطاقات العمل", fr: "Cartes de visite", en: "Business Cards" },
      desc: { ar: "ورق ثقيل وحواف دقيقة وانطباع أول لا يُنسى.", fr: "Papier épais, finitions nettes, une première impression qui reste.", en: "Heavy stock, sharp edges, a first impression that sticks." }
    },
    {
      id: "stickers", mock: "sticker", span: 2, service: "Printing", from: "",
      name: { ar: "ستيكرات", fr: "Stickers", en: "Stickers" },
      desc: { ar: "قصّ حسب الشكل، لامع أو مطفي، جاهز للّصق في كل مكان.", fr: "Découpe sur mesure, brillant ou mat. Faits pour se coller partout.", en: "Die-cut, glossy or matte. Made to be stuck on everything." }
    },
    {
      id: "flyers", mock: "flyer", span: 2, service: "Printing", from: "",
      name: { ar: "فلايرز", fr: "Flyers", en: "Flyers" },
      desc: { ar: "رسالة واضحة وتصميم لافت وجاهز للتوزيع.", fr: "Message clair, mise en page percutante, prêt à distribuer.", en: "Clear message, loud layout, ready to hand out." }
    },
    {
      id: "certs", mock: "cert", span: 4, service: "Printing", from: "",
      name: { ar: "شهادات", fr: "Certificats", en: "Certificates" },
      desc: { ar: "شهادات وتكريمات تستحق أن تُحفظ.", fr: "Des certificats qui méritent d'être gardés.", en: "Awards and diplomas that look worth keeping." }
    },
    {
      id: "badges", mock: "badge", span: 3, service: "Printing", from: "",
      name: { ar: "بادجات", fr: "Badges", en: "Badges" },
      desc: { ar: "بادجات للفعاليات والفرق، تصميم وطباعة في مكان واحد.", fr: "Badges d'événement et d'équipe, conçus et imprimés ensemble.", en: "Event and staff badges, designed and printed together." }
    },
    {
      id: "thanks", mock: "thanks", span: 3, service: "Printing", from: "",
      name: { ar: "بطاقات الشكر", fr: "Cartes de remerciement", en: "Thank-you Cards" },
      desc: { ar: "بطاقة صغيرة تعيد الزبون إليك.", fr: "Une petite carte qui fait revenir les clients.", en: "A small card that brings customers back." }
    }
  ],

  // Prices left empty on purpose (not provided). Fill "from" to show them.
  packages: [
    {
      id: "starter", from: "", pop: false,
      name: { ar: "STARTER", fr: "STARTER", en: "STARTER" },
      desc: { ar: "بداية بسيطة ومتينة.", fr: "Un départ simple et solide.", en: "A simple, solid start." },
      items: {
        en: ["Business Card Design", "1000 Business Cards", "QR Code"],
        ar: ["تصميم بطاقة العمل", "1000 بطاقة عمل مطبوعة", "كود QR"],
        fr: ["Design de carte de visite", "1000 cartes de visite", "QR code"]
      }
    },
    {
      id: "business", from: "", pop: true,
      name: { ar: "BUSINESS", fr: "BUSINESS", en: "BUSINESS" },
      desc: { ar: "كل ما يحتاجه نشاطك ليبدو احترافياً.", fr: "Tout pour que votre activité soit professionnelle.", en: "Everything a growing business needs to look professional." },
      items: {
        en: ["Professional Design", "1000 Business Cards", "QR Code", "Stickers", "Social Media Assets"],
        ar: ["تصميم احترافي", "1000 بطاقة عمل", "كود QR", "ستيكرات", "تصاميم سوشيال ميديا"],
        fr: ["Design professionnel", "1000 cartes de visite", "QR code", "Stickers", "Visuels réseaux sociaux"]
      }
    },
    {
      id: "brand", from: "", pop: false,
      name: { ar: "BRAND", fr: "BRAND", en: "BRAND" },
      desc: { ar: "هوية متكاملة، من الشعار حتى الإطلاق.", fr: "Une identité complète, du logo au lancement.", en: "A complete identity, from logo to launch." },
      items: {
        en: ["Logo", "Brand Identity", "Business Cards", "Stickers", "Social Media", "Digital Presence"],
        ar: ["شعار", "هوية بصرية", "بطاقات عمل", "ستيكرات", "سوشيال ميديا", "حضور رقمي"],
        fr: ["Logo", "Identité de marque", "Cartes de visite", "Stickers", "Réseaux sociaux", "Présence digitale"]
      }
    }
  ],

  // ======================================================================
  //  PORTFOLIO — نظام المعرض وصفحات الـCase Study
  // ======================================================================
  //  لإضافة مشروع جديد (3 خطوات):
  //   1) أنشئ مجلداً:  assets/portfolio/اسم-المشروع/   (نفس قيمة id بالضبط، حروف إنجليزية صغيرة وشرطات)
  //        ├─ cover.webp          ← صورة الغلاف
  //        ├─ gallery/            ← صور المعرض (01.webp, 02.webp ...)
  //        └─ before-after/       ← (اختياري) before.webp و after.webp
  //   2) انسخ القالب الموجود داخل التعليق في الأسفل إلى داخل  projects: [ ... ]  واملأه.
  //   3) احفظ الملف. يظهر المشروع تلقائياً في الرئيسية وفي portfolio.html وتُنشأ له صفحة:
  //        project.html?id=اسم-المشروع
  //
  //  قواعد عامة:
  //   • أي حقل اختياري: احذفه أو اتركه فارغاً ("" أو []) وسيختفي القسم المرتبط به من الصفحة.
  //   • النصوص دائماً بثلاث لغات {ar, fr, en}. إن تركت لغة فارغة يُعرض الإنجليزي.
  //   • أسماء الصور تُكتب كأسماء ملفات فقط (مثل "01.webp") وتُقرأ تلقائياً من مجلد المشروع.
  //     وإن كتبت مساراً كاملاً (فيه "/" أو يبدأ بـ http) فيُستخدم كما هو.
  //   • يفضَّل WebP، وبعرض 1600px كحد أقصى للمعرض، و1200×900 للغلاف.
  // ----------------------------------------------------------------------

  // الفئات (Filters). المعرض يعرض فقط الفئات التي تحتوي مشروعاً واحداً على الأقل.
  // id: هو ما تكتبه في حقل category داخل المشروع.
  // service: الخدمة التي تُملأ تلقائياً في نموذج التواصل عند الضغط على "ابدأ مشروعاً مشابهاً".
  categories: [
    { id: "web-development", service: "Digital", t: { ar: "تطوير المواقع", fr: "Développement web", en: "Web Development" } },
    { id: "graphic-design", service: "Design", t: { ar: "التصميم الجرافيكي", fr: "Design graphique", en: "Graphic Design" } },
    { id: "print", service: "Printing", t: { ar: "طباعة", fr: "Impression", en: "Print" } },
    { id: "video-motion", service: "Design", t: { ar: "فيديو / موشن", fr: "Vidéo / Motion", en: "Video / Motion" } },
    { id: "digital-services", service: "Digital", t: { ar: "خدمات رقمية", fr: "Services digitaux", en: "Digital Services" } }
  ],

  // Collections: مجموعات داخل فئة (ليست فئة رئيسية). تظهر فقط إذا وُجد فيها مشروع واحد على الأقل.
  // ratio (اختياري): نسبة صور مشاريعها، فيُعرض داخل الـCollection إطار بهذه النسبة بلا قص.
  // category: الفئة التي تتبعها (يجب أن تطابق id في categories). id: هو ما تكتبه في حقل collection داخل المشروع.
  collections: [
    { id: "business-cards", category: "graphic-design", ratio: "9/5", t: { ar: "بطاقات الأعمال", fr: "Cartes de visite", en: "Business Cards" } }
  ],

  portfolioSettings: {
    imagesBase: "assets/portfolio",  // مجلد صور المشاريع
    homeOtherLimit: 6,               // كم مشروعاً (غير Featured) يظهر في الرئيسية. اجعله 0 لإخفائهم هناك.
    relatedCount: 3                  // عدد "مشاريع مشابهة" أسفل صفحة المشروع
  },

  // ----------------------------------------------------------------------
  //  المشاريع. (فارغة عمداً — لا مشاريع وهمية. أضف مشاريعك الحقيقية هنا.)
  // ----------------------------------------------------------------------
  projects: [
    {
      id: "triple-a-business-card",

      collection: "business-cards",

      type: "business-card",

      title: {
        ar: "بطاقة أعمال Triple A",
        fr: "Carte de visite Triple A",
        en: "Triple A Business Card"
      },

      description: {
        ar: "تصميم بطاقة أعمال احترافية لفريق Triple A.",
        fr: "Conception d'une carte de visite professionnelle pour Triple A.",
        en: "Professional business card design for Triple A."
      },

      category: "graphic-design",

      cover: "assets/portfolio/Graphic Design/Business Cards/triple-a-business-card/cover.webp",

      ratio: "9/5",   // نسبة الغلاف الحقيقية: تحدد فقط كيف تُعرض الصورة داخل الإطار (اختياري)

      coverSize: { w: 1134, h: 661 },

      gallery: [
        { src: "assets/portfolio/Graphic Design/Business Cards/triple-a-business-card/front 1.webp", w: 1134, h: 661 },
        { src: "assets/portfolio/Graphic Design/Business Cards/triple-a-business-card/back1.webp", w: 1134, h: 661 },
        { src: "assets/portfolio/Graphic Design/Business Cards/triple-a-business-card/reel.webp", w: 1134, h: 661 }
      ],

      // PDF اختياري (يظهر كزر "View Full PDF" داخل صفحة المشروع)
      pdf: "assets/portfolio/Graphic Design/Business Cards/triple-a-business-card/MY ULTRA CART V2.4.pdf",

      featured: false,

      links: {
        live: "",
        github: "",
        behance: "",
        instagram: "",
        video: "",
        whatsapp: ""
      }
    }
    /* ================= قالب مشروع كامل — انسخه كما هو داخل projects ثم عدّله =================
    {
      // معرّف المشروع = اسم المجلد = الرابط. حروف إنجليزية صغيرة وأرقام وشرطات فقط. لا تغيّره لاحقاً.
      id: "project-name",

      // اجعل true إذا أردت ظهور المشروع ضمن Featured Projects. و false (أو احذف السطر) لإخفائه من Featured.
      featured: true,
      // ترتيبه داخل Featured: 1 يظهر أولاً ثم 2 ... (المشاريع بلا رقم تأتي أخيراً)
      featuredOrder: 1,

      // الفئة: واحدة من id الموجودة في categories أعلاه
      category: "web-development",

      // سنة المشروع (اختياري)
      year: "2026",
      // اسم العميل (اختياري). اكتبه نصاً عادياً أو {ar,fr,en}
      client: "",

      // اسم المشروع
      title: { ar: "اكتب اسم المشروع بالعربية", fr: "Nom du projet en français", en: "Project name in English" },

      // وصف قصير يظهر على بطاقة المشروع وفي أعلى الصفحة وفي SEO (جملة أو جملتان)
      description: { ar: "وصف قصير بالعربية", fr: "Courte description en français", en: "Short description in English" },

      // صورة الغلاف: اسم الملف داخل assets/portfolio/project-name/
      cover: "cover.webp",
      // (اختياري) وصف الصورة لقارئات الشاشة. إن تركته يُولَّد تلقائياً من العنوان.
      coverAlt: { ar: "", fr: "", en: "" },
      // (اختياري) أبعاد الغلاف الحقيقية لتحسين الأداء
      // coverSize: { w: 1200, h: 900 },

      // نظرة عامة (اختياري): فقرة تعريفية أطول من الوصف
      overview: { ar: "", fr: "", en: "" },

      // التحدي / الهدف (اختياري)
      challenge: { ar: "", fr: "", en: "" },

      // الحل (اختياري)
      solution: { ar: "", fr: "", en: "" },

      // الخدمات المقدّمة (اختياري) — قائمة لكل لغة
      services: {
        ar: ["تصميم", "برمجة"],
        fr: ["Design", "Développement"],
        en: ["Design", "Development"]
      },

      // مراحل العمل (اختياري) — كل خطوة عنوان + نص قصير
      process: [
        // { title: { ar: "", fr: "", en: "" }, text: { ar: "", fr: "", en: "" } }
      ],

      // معرض الصور (اختياري): أسماء ملفات داخل assets/portfolio/project-name/gallery/
      // لإضافة وصف لصورة: { src: "01.webp", alt: { ar: "", fr: "", en: "" }, w: 1600, h: 1000 }
      gallery: [
        // "01.webp",
        // "02.webp"
      ],

      // قبل / بعد (اختياري): ملفات داخل assets/portfolio/project-name/before-after/
      beforeAfter: [
        // { before: "before.webp", after: "after.webp", label: { ar: "", fr: "", en: "" } }
      ],

      // الأدوات والتقنيات (اختياري) — أسماء عادية بلا ترجمة
      tools: [
        // "Figma", "Photoshop", "HTML", "CSS", "JavaScript"
      ],

      // النتائج (اختياري)
      results: { ar: "", fr: "", en: "" },
      // أرقام بارزة (اختياري): [{ value: "+40%", label: { ar: "", fr: "", en: "" } }]
      metrics: [],

      // الروابط (اختيارية). الرابط الفارغ لا يظهر. اكتب الرابط كاملاً بـ https://
      links: {
        live: "",        // الموقع المباشر
        github: "",      // GitHub
        behance: "",     // Behance
        instagram: "",   // منشور/حساب Instagram
        video: "",       // رابط فيديو (YouTube/TikTok/...)
        website: "",     // موقع خارجي آخر
        whatsapp: false, // true = زر واتساب برسالة جاهزة عن هذا المشروع
        other: []        // روابط أخرى: [{ label: { ar: "", fr: "", en: "" }, url: "https://..." }]
      }
    },
    ================= نهاية القالب ================= */
  ],

  // ---- SEO: عنوان ووصف كل صفحة بالثلاث لغات (يُحدَّثان تلقائياً عند تبديل اللغة) ----
  // {title} و{desc} في صفحات المشاريع تؤخذ من بيانات كل مشروع.
  seo: {
    home: {
      title: { ar: "Triple A — استوديو رقمي إبداعي | تطوير مواقع، تصميم، مونتاج وخدمات رقمية", fr: "Triple A — Creative Digital Studio | Développement web, design, montage vidéo et services digitaux", en: "Triple A — Creative Digital Studio | Web Development, Graphic Design, Video Editing & Digital Services" },
      description: { ar: "Triple A استوديو رقمي إبداعي: تطوير المواقع، التصميم الجرافيكي، مونتاج الفيديو والخدمات الرقمية — كل شيء تحت سقف واحد.", fr: "Triple A est un studio digital créatif : développement web, design graphique, montage vidéo et services digitaux, sous un même toit.", en: "Triple A is a creative digital studio: web development, graphic design, video editing and digital services — all under one roof." }
    },
    portfolio: {
      title: { ar: "الأعمال — Triple A | استوديو رقمي إبداعي", fr: "Réalisations — Triple A | Creative Digital Studio", en: "Portfolio — Triple A | Creative Digital Studio" },
      description: { ar: "تصفّح أعمال Triple A: مشاريع في تطوير المواقع والتصميم الجرافيكي والفيديو والخدمات الرقمية.", fr: "Découvrez les réalisations de Triple A : projets de développement web, design graphique, vidéo et services digitaux.", en: "Browse Triple A's work: projects in web development, graphic design, video and digital services." }
    },
    projectSuffix: " — Triple A",
    notfound: {
      title: { ar: "الصفحة غير موجودة — Triple A", fr: "Page introuvable — Triple A", en: "Page not found — Triple A" },
      description: { ar: "هذه الصفحة غير موجودة.", fr: "Cette page n'existe pas.", en: "This page doesn't exist." }
    }
  },

  why: [
    { t: { ar: "التصميم أولاً", fr: "LE DESIGN D'ABORD", en: "DESIGN FIRST" }, d: { ar: "كل مشروع يبدأ بتفكير بصري قوي.", fr: "Chaque projet commence par une vraie réflexion visuelle.", en: "Every project starts with strong visual thinking." } },
    { t: { ar: "من الشاشة إلى الورق", fr: "DE L'ÉCRAN AU PAPIER", en: "FROM SCREEN TO PAPER" }, d: { ar: "نربط التصميم الرقمي بالإنتاج المادي.", fr: "Nous relions le design digital à la production physique.", en: "We connect digital design with physical production." } },
    { t: { ar: "فريق إبداعي واحد", fr: "UNE ÉQUIPE CRÉATIVE", en: "ONE CREATIVE TEAM" }, d: { ar: "التصميم والطباعة والرقمي في مكان واحد.", fr: "Design, impression et digital au même endroit.", en: "Design, print and digital handled together." } },
    { t: { ar: "صُنع للمشاريع الصغيرة", fr: "PENSÉ POUR LES PETITES ENTREPRISES", en: "BUILT FOR SMALL BUSINESSES" }, d: { ar: "حلول بصرية احترافية بلا تعقيد.", fr: "Des solutions visuelles pro, sans complexité inutile.", en: "Professional visual solutions without unnecessary complexity." } }
  ],

  how: [
    { t: { ar: "أخبرنا", fr: "DITES-NOUS", en: "TELL US" }, d: { ar: "شاركنا فكرتك والكمية والموعد.", fr: "Partagez l'idée, la quantité et le délai.", en: "Share the idea, quantity and deadline." } },
    { t: { ar: "نصمّم", fr: "ON CONÇOIT", en: "WE DESIGN" }, d: { ar: "نعرض عليك أول تصور.", fr: "Nous vous montrons une première proposition.", en: "You get a first proposal to react to." } },
    { t: { ar: "توافق", fr: "VOUS VALIDEZ", en: "YOU APPROVE" }, d: { ar: "نعدّل حتى يعجبك.", fr: "Des retouches jusqu'à ce que ce soit juste.", en: "We adjust until it feels right." } },
    { t: { ar: "ننتج", fr: "ON PRODUIT", en: "WE PRODUCE" }, d: { ar: "طباعة وتشطيب ومراجعة.", fr: "Impression, finition, contrôle.", en: "Printed, finished and checked." } },
    { t: { ar: "تستلم", fr: "VOUS RECEVEZ", en: "YOU RECEIVE" }, d: { ar: "جاهز للاستخدام.", fr: "Livré, prêt à l'emploi.", en: "Delivered, ready to use." } }
  ],

  audiences: [
    {
      id: "biz", service: "Branding", cta: { ar: "ابنِ علامتي", fr: "CRÉER MA MARQUE", en: "BUILD MY BRAND" },
      name: { ar: "للشركات والمشاريع", fr: "POUR LES ENTREPRISES", en: "FOR BUSINESSES" },
      items: { en: ["Logo", "Business Cards", "Stickers", "Menus", "Social Media", "Website"], ar: ["شعار", "بطاقات عمل", "ستيكرات", "قوائم طعام", "سوشيال ميديا", "موقع إلكتروني"], fr: ["Logo", "Cartes de visite", "Stickers", "Menus", "Réseaux sociaux", "Site web"] }
    },
    {
      id: "evt", service: "Printing", cta: { ar: "جهّز فعاليتي", fr: "PRÉPARER MON ÉVÉNEMENT", en: "PREPARE MY EVENT" },
      name: { ar: "للفعاليات", fr: "POUR LES ÉVÉNEMENTS", en: "FOR EVENTS" },
      items: { en: ["Badges", "Certificates", "Invitations", "Tickets", "Posters", "Thank-you Cards"], ar: ["بادجات", "شهادات", "دعوات", "تذاكر", "بوسترات", "بطاقات شكر"], fr: ["Badges", "Certificats", "Invitations", "Billets", "Affiches", "Cartes de remerciement"] }
    }
  ],

  // Real testimonials only. Empty = section stays hidden. Example item:
  // { name: "Client name", role: {en:"Café owner"}, text: {en:"…", ar:"…", fr:"…"} }
  testimonials: [],

  // enabled:false hides a platform. Add one by appending an object.
  socials: [
    { id: "instagram", label: "Instagram", color: '#e4405f', icon: '<path fill="url(#igg)" d="M7 2h10a5 5 0 0 1 5 5v10a5 5 0 0 1-5 5H7a5 5 0 0 1-5-5V7a5 5 0 0 1 5-5zm0 2a3 3 0 0 0-3 3v10a3 3 0 0 0 3 3h10a3 3 0 0 0 3-3V7a3 3 0 0 0-3-3zm5 3a5 5 0 1 1 0 10 5 5 0 0 1 0-10zm0 2a3 3 0 1 0 0 6 3 3 0 0 0 0-6zm5.300-3.800a1.200 1.200 0 1 1 0 2.400 1.200 1.200 0 0 1 0-2.400z"/>', url: "https://www.instagram.com/triple_a_code?stkn=Z2FpZ3kwOHp5YTF3", enabled: true },
    { id: "facebook", label: "Facebook", color: '#1877f2', icon: '<path d="M13.500 22v-8.200h2.800l.5-3.300h-3.300V8.400c0-.9.4-1.700 1.800-1.700h1.600V3.800s-1.300-.2-2.500-.2c-2.600 0-4.200 1.500-4.200 4.300v2.600H7.400v3.300h2.800V22z"/>', url: "https://www.facebook.com/share/19qQS7XcLk/", enabled: true },
    { id: "tiktok", label: "TikTok", color: '#25f4ee', icon: '<path fill="#fe2c55" transform="translate(.7 .7)" d="M16.600 3c.3 2.300 1.600 3.700 3.900 3.800v3.200c-1.300.1-2.500-.3-3.800-1.100v5.800c0 7.400-8 9.700-11.200 4.400-2-3.300-.8-8.500 4.600-8.700v3.400c-.4.100-.8.200-1.200.4-1.100.4-1.700 1.200-1.600 2.500.3 2.600 5.100 3.400 4.700-1.700V3z"/><path fill="#25f4ee" transform="translate(-.7 -.7)" d="M16.600 3c.3 2.300 1.600 3.700 3.900 3.800v3.200c-1.300.1-2.500-.3-3.800-1.100v5.800c0 7.400-8 9.700-11.200 4.400-2-3.300-.8-8.500 4.600-8.700v3.400c-.4.100-.8.200-1.200.4-1.100.4-1.700 1.200-1.600 2.500.3 2.600 5.100 3.400 4.700-1.700V3z"/><path fill="var(--t)" d="M16.600 3c.3 2.300 1.600 3.700 3.900 3.800v3.200c-1.300.1-2.500-.3-3.800-1.100v5.800c0 7.400-8 9.700-11.200 4.400-2-3.300-.8-8.500 4.600-8.700v3.400c-.4.100-.8.200-1.200.4-1.100.4-1.700 1.200-1.600 2.500.3 2.600 5.100 3.400 4.700-1.700V3z"/>', url: "https://www.tiktok.com/@triple_a_code", enabled: true },
    { id: "linkedin", label: "LinkedIn", color: '#0a66c2', icon: '<path d="M4.980 3.500a2.500 2.500 0 1 1 0 5 2.500 2.500 0 0 1 0-5zM3 9.500h4V21H3zM9.500 9.500h3.800v1.600h.1c.5-1 1.800-2 3.800-2 4 0 4.800 2.600 4.800 6V21h-4v-5.200c0-1.300 0-2.900-1.800-2.900s-2.100 1.400-2.100 2.800V21h-4z"/>', url: "https://www.linkedin.com/in/abdennour-issalek-25809a418?utm_source=share_via&utm_content=profile&utm_medium=member_android", enabled: true },
    { id: "youtube", label: "YouTube", color: '#ff0000', icon: '<path d="M23.500 6.200a3 3 0 0 0-2.100-2.100C19.500 3.600 12 3.600 12 3.600s-7.500 0-9.400.5A3 3 0 0 0 .5 6.200C0 8.100 0 12 0 12s0 3.900.5 5.800a3 3 0 0 0 2.100 2.100c1.900.5 9.400.5 9.400.5s7.500 0 9.400-.5a3 3 0 0 0 2.100-2.100c.5-1.900.5-5.800.5-5.800s0-3.900-.5-5.800zM9.600 15.600V8.400l6.200 3.600z"/>', url: "", enabled: false }, // TODO: ضع رابط قناة YouTube الحقيقي هنا ثم اجعل enabled: true,
    { id: "whatsapp", label: "WhatsApp", color: '#25d366', icon: '<path d="M12 2a10 10 0 0 0-8.500 15.200L2 22l4.900-1.500A10 10 0 1 0 12 2zm0 2a8 8 0 1 1-4.300 14.800l-.4-.2-2.500.8.8-2.400-.3-.4A8 8 0 0 1 12 4zM8.600 7.500c-.3 0-.6.2-.8.5-.6.800-.6 1.900.4 3.400 1.400 2.100 3.200 3.300 4.800 3.600.9.200 1.800-.4 2-1.200l.1-.5-1.800-.9-.7.800c-1-.4-1.800-1.200-2.300-2.100l.6-.7-.8-1.800z"/>', url: "https://wa.me/212633740099", enabled: true },
    { id: "behance", label: "Behance", color: '#1769ff', icon: '<text x="12" y="16.500" text-anchor="middle" font-size="13" font-weight="700" font-family="Arial,sans-serif">Bē</text>', url: "https://behance.net/", enabled: false },
    { id: "github", label: "GitHub", color: '#8957e5', icon: '<path d="M12 .3a12 12 0 0 0-3.800 23.400c.6.1.8-.3.8-.6v-2c-3.300.7-4-1.600-4-1.600-.6-1.400-1.400-1.800-1.400-1.800-1-.7.100-.7.100-.7 1.200.1 1.800 1.200 1.800 1.200 1 1.800 2.800 1.300 3.500 1 .1-.8.4-1.300.7-1.600-2.700-.3-5.500-1.300-5.500-5.900 0-1.300.5-2.400 1.200-3.200-.1-.3-.5-1.500.1-3.200 0 0 1-.3 3.300 1.200a11.500 11.500 0 0 1 6 0c2.300-1.500 3.300-1.200 3.300-1.200.6 1.700.2 2.900.1 3.200.8.800 1.200 1.900 1.200 3.200 0 4.600-2.800 5.600-5.500 5.900.4.400.8 1.100.8 2.200v3.300c0 .3.2.7.8.6A12 12 0 0 0 12 .3z"/>', url: "https://github.com/CUBE-777", enabled: false },
    { id: "x", label: "X", color: '#1d9bf0', icon: '<path d="M18.900 1.200h3.700l-8 9.200L24 22.800h-7.400l-5.800-7.600-6.600 7.600H.5l8.600-9.800L0 1.200h7.600l5.200 6.900zm-1.300 19.500h2L6.500 3.200H4.300z"/>', url: "https://x.com/", enabled: false }
  ],
};
