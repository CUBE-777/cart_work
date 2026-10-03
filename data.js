// Single source of truth. Text fields: {ar, fr, en}.
const TRIPLE_A = {
  brand: "TRIPLE A",
  logo: "avatar.png",
  phone: "+212600000000",
  whatsapp: "212600000000",
  whatsappMessage: { ar: "مرحبا Triple A", fr: "Bonjour Triple A", en: "Hello Triple A" },
  email: "hello@triplea.example",
  website: "https://triplea.example",
  theme: { default: "dark" },
  language: { default: "ar", available: ["ar", "fr", "en"] },
  contactForm: { enabled: false },
  tagline: { ar: "حلول رقمية بإتقان", fr: "Des solutions digitales soignées", en: "Digital solutions, done right" },
  description: {
    ar: "فريق رقمي صغير يجمع بين الإبداع والتقنية: مواقع، تصميم، حركة وفيديو.",
    fr: "Une petite équipe digitale qui allie créativité et technologie : web, design, motion et vidéo.",
    en: "A small digital team blending creativity and technology: web, design, motion and video."
  },
  about: {
    ar: "Triple A فريق رقمي يبني مواقع وهويات ومحتوى بصري واضح وسريع. نعمل بأسلوب بسيط ومباشر، ونهتم بالتفاصيل من الفكرة إلى التسليم.",
    fr: "Triple A est une équipe digitale qui conçoit sites, identités et contenus visuels clairs et rapides. Nous travaillons simplement, avec soin, de l'idée à la livraison.",
    en: "Triple A is a digital team building websites, identities and visual content that are clear and fast. We work simply and directly, caring for details from idea to delivery."
  },
  ui: {
    nav: { services: { ar: "الخدمات", fr: "Services", en: "Services" }, portfolio: { ar: "أعمالنا", fr: "Réalisations", en: "Work" }, about: { ar: "من نحن", fr: "À propos", en: "About" }, contact: { ar: "تواصل", fr: "Contact", en: "Contact" } },
    contactUs: { ar: "تواصل معنا", fr: "Nous contacter", en: "Contact us" },
    whatsapp: { ar: "واتساب", fr: "WhatsApp", en: "WhatsApp" },
    call: { ar: "اتصال", fr: "Appeler", en: "Call" },
    email: { ar: "بريد", fr: "E-mail", en: "Email" },
    save: { ar: "حفظ جهة الاتصال", fr: "Enregistrer le contact", en: "Save contact" },
    featured: { ar: "مميز", fr: "À la une", en: "Featured" },
    visit: { ar: "زيارة", fr: "Voir", en: "Visit" },
    send: { ar: "إرسال", fr: "Envoyer", en: "Send" },
    name: { ar: "الاسم", fr: "Nom", en: "Name" },
    message: { ar: "رسالتك", fr: "Message", en: "Message" },
    follow: { ar: "تابعنا", fr: "Suivez-nous", en: "Follow us" },
    footer: { ar: "حلول رقمية • ويب • تصميم • حركة", fr: "Solutions digitales • Web • Design • Animation", en: "Digital Solutions • Web • Design • Animation" },
    rights: { ar: "© 2026 Triple A — جميع الحقوق محفوظة", fr: "© 2026 Triple A — Tous droits réservés", en: "© 2026 Triple A — All Rights Reserved" },
    made: { ar: "من صنع Triple A", fr: "Réalisé par Triple A", en: "Made by Triple A" }
  },
  // enabled:false hides a platform. Add one by appending an object.
  socials: [
    { id: "instagram", label: "Instagram", color: '#e4405f', icon: '<path fill="url(#igg)" d="M7 2h10a5 5 0 0 1 5 5v10a5 5 0 0 1-5 5H7a5 5 0 0 1-5-5V7a5 5 0 0 1 5-5zm0 2a3 3 0 0 0-3 3v10a3 3 0 0 0 3 3h10a3 3 0 0 0 3-3V7a3 3 0 0 0-3-3zm5 3a5 5 0 1 1 0 10 5 5 0 0 1 0-10zm0 2a3 3 0 1 0 0 6 3 3 0 0 0 0-6zm5.300-3.800a1.200 1.200 0 1 1 0 2.400 1.200 1.200 0 0 1 0-2.400z"/>', url: "https://instagram.com/", enabled: true },
    { id: "facebook", label: "Facebook", color: '#1877f2', icon: '<path d="M13.500 22v-8.200h2.800l.5-3.300h-3.300V8.400c0-.9.4-1.700 1.800-1.700h1.600V3.800s-1.300-.2-2.500-.2c-2.600 0-4.200 1.500-4.200 4.300v2.600H7.400v3.300h2.800V22z"/>', url: "https://facebook.com/", enabled: true },
    { id: "tiktok", label: "TikTok", color: '#25f4ee', icon: '<path fill="#fe2c55" transform="translate(.7 .7)" d="M16.600 3c.3 2.300 1.600 3.700 3.900 3.800v3.200c-1.300.1-2.500-.3-3.800-1.100v5.800c0 7.400-8 9.700-11.200 4.400-2-3.300-.8-8.500 4.600-8.700v3.400c-.4.100-.8.200-1.200.4-1.100.4-1.700 1.200-1.600 2.500.3 2.600 5.100 3.400 4.700-1.700V3z"/><path fill="#25f4ee" transform="translate(-.7 -.7)" d="M16.600 3c.3 2.300 1.600 3.700 3.900 3.800v3.200c-1.300.1-2.500-.3-3.800-1.100v5.800c0 7.400-8 9.700-11.200 4.400-2-3.300-.8-8.500 4.600-8.700v3.400c-.4.100-.8.200-1.200.4-1.100.4-1.700 1.200-1.600 2.500.3 2.600 5.100 3.400 4.700-1.700V3z"/><path fill="var(--t)" d="M16.600 3c.3 2.300 1.600 3.700 3.900 3.800v3.200c-1.300.1-2.500-.3-3.800-1.100v5.800c0 7.400-8 9.700-11.200 4.400-2-3.300-.8-8.500 4.600-8.700v3.400c-.4.100-.8.200-1.200.4-1.100.4-1.700 1.200-1.600 2.500.3 2.600 5.100 3.400 4.700-1.700V3z"/>', url: "https://tiktok.com/", enabled: true },
    { id: "linkedin", label: "LinkedIn", color: '#0a66c2', icon: '<path d="M4.980 3.500a2.500 2.500 0 1 1 0 5 2.500 2.500 0 0 1 0-5zM3 9.500h4V21H3zM9.500 9.500h3.800v1.600h.1c.5-1 1.800-2 3.800-2 4 0 4.800 2.600 4.800 6V21h-4v-5.200c0-1.300 0-2.900-1.800-2.900s-2.100 1.400-2.100 2.800V21h-4z"/>', url: "https://linkedin.com/", enabled: true },
    { id: "youtube", label: "YouTube", color: '#ff0000', icon: '<path d="M23.500 6.200a3 3 0 0 0-2.100-2.100C19.500 3.600 12 3.600 12 3.600s-7.500 0-9.400.5A3 3 0 0 0 .5 6.200C0 8.100 0 12 0 12s0 3.900.5 5.800a3 3 0 0 0 2.100 2.100c1.900.5 9.400.5 9.400.5s7.500 0 9.400-.5a3 3 0 0 0 2.100-2.100c.5-1.900.5-5.800.5-5.800s0-3.900-.5-5.800zM9.600 15.600V8.400l6.200 3.600z"/>', url: "https://youtube.com/", enabled: true },
    { id: "whatsapp", label: "WhatsApp", color: '#25d366', icon: '<path d="M12 2a10 10 0 0 0-8.500 15.200L2 22l4.900-1.500A10 10 0 1 0 12 2zm0 2a8 8 0 1 1-4.300 14.800l-.4-.2-2.500.8.8-2.400-.3-.4A8 8 0 0 1 12 4zM8.600 7.500c-.3 0-.6.2-.8.5-.6.800-.6 1.900.4 3.400 1.400 2.100 3.200 3.300 4.800 3.600.9.200 1.800-.4 2-1.200l.1-.5-1.800-.9-.7.800c-1-.4-1.800-1.200-2.300-2.100l.6-.7-.8-1.800z"/>', url: "https://wa.me/212600000000", enabled: true },
    { id: "behance", label: "Behance", color: '#1769ff', icon: '<text x="12" y="16.500" text-anchor="middle" font-size="13" font-weight="700" font-family="Arial,sans-serif">Bē</text>', url: "https://behance.net/", enabled: false },
    { id: "github", label: "GitHub", color: '#8957e5', icon: '<path d="M12 .3a12 12 0 0 0-3.800 23.400c.6.1.8-.3.8-.6v-2c-3.300.7-4-1.600-4-1.600-.6-1.400-1.400-1.800-1.400-1.800-1-.7.100-.7.100-.7 1.200.1 1.800 1.200 1.800 1.200 1 1.800 2.800 1.300 3.500 1 .1-.8.4-1.300.7-1.600-2.700-.3-5.500-1.300-5.500-5.900 0-1.300.5-2.400 1.200-3.200-.1-.3-.5-1.500.1-3.200 0 0 1-.3 3.300 1.200a11.500 11.500 0 0 1 6 0c2.300-1.500 3.300-1.200 3.300-1.200.6 1.700.2 2.900.1 3.200.8.800 1.200 1.900 1.200 3.200 0 4.600-2.800 5.600-5.500 5.900.4.400.8 1.100.8 2.200v3.300c0 .3.2.7.8.6A12 12 0 0 0 12 .3z"/>', url: "https://github.com/", enabled: false },
    { id: "x", label: "X", color: '#1d9bf0', icon: '<path d="M18.900 1.200h3.700l-8 9.200L24 22.800h-7.400l-5.800-7.600-6.600 7.600H.5l8.600-9.800L0 1.200h7.600l5.200 6.900zm-1.300 19.500h2L6.500 3.200H4.300z"/>', url: "https://x.com/", enabled: false }
  ],
  // link: set a URL later to turn a card into a link to its own page.
  services: [
    { id: "web", link: "", name: { ar: "تطوير المواقع", fr: "Développement web", en: "Web Development" }, desc: { ar: "مواقع سريعة وجاهزة للجوال.", fr: "Sites rapides et mobile-first.", en: "Fast, mobile-first websites." } },
    { id: "uiux", link: "", name: { ar: "UI/UX والتصميم الجرافيكي", fr: "UI/UX & Design graphique", en: "UI/UX & Graphic Design" }, desc: { ar: "واجهات وتصاميم واضحة.", fr: "Interfaces et visuels clairs.", en: "Clear interfaces and visuals." } },
    { id: "motion", link: "", name: { ar: "الأنيميشن والموشن", fr: "Animation / Motion", en: "Animation / Motion Design" }, desc: { ar: "حركة تشرح وتجذب.", fr: "Du mouvement qui explique.", en: "Motion that explains." } },
    { id: "video", link: "", name: { ar: "مونتاج الفيديو", fr: "Montage vidéo", en: "Video Editing" }, desc: { ar: "مونتاج احترافي لكل منصة.", fr: "Montage pour chaque plateforme.", en: "Editing for every platform." } },
    { id: "brand", link: "", name: { ar: "الهوية البصرية", fr: "Branding", en: "Branding" }, desc: { ar: "هوية متكاملة لعلامتك.", fr: "Une identité cohérente.", en: "A consistent identity." } },
    { id: "social", link: "", name: { ar: "التسويق الرقمي", fr: "Réseaux sociaux / Marketing", en: "Social Media / Digital Marketing" }, desc: { ar: "محتوى وحملات مدروسة.", fr: "Contenu et campagnes ciblés.", en: "Focused content and campaigns." } },
    { id: "other", link: "", name: { ar: "خدمات رقمية أخرى", fr: "Autres services digitaux", en: "Other Digital Services" }, desc: { ar: "اطلب ما تحتاجه.", fr: "Dites-nous votre besoin.", en: "Tell us what you need." } }
  ],
  portfolio: [
    { name: "Project One", type: { ar: "موقع", fr: "Site web", en: "Website" }, image: "assets/images/p1.svg", description: { ar: "موقع تعريفي لشركة.", fr: "Site vitrine d'entreprise.", en: "Company showcase site." }, url: "", github: "", tags: ["Web", "UI"], featured: true },
    { name: "Project Two", type: { ar: "هوية", fr: "Branding", en: "Branding" }, image: "assets/images/p2.svg", description: { ar: "هوية بصرية كاملة.", fr: "Identité visuelle complète.", en: "Full visual identity." }, url: "", github: "", tags: ["Logo", "Brand"], featured: false },
    { name: "Project Three", type: { ar: "موشن", fr: "Motion", en: "Motion" }, image: "assets/images/p3.svg", description: { ar: "فيديو موشن قصير.", fr: "Court motion design.", en: "Short motion piece." }, url: "", github: "", tags: ["Motion"], featured: false },
    { name: "Project Four", type: { ar: "تطبيق ويب", fr: "Application web", en: "Web app" }, image: "assets/images/p4.svg", description: { ar: "أداة ويب بسيطة.", fr: "Outil web simple.", en: "A simple web tool." }, url: "", github: "", tags: ["JS", "App"], featured: false }
  ]
};
