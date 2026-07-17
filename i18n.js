/* Traducción ES/EN global. ES = texto original en el HTML; EN = este diccionario. */
window.InnovI18N = {
  lang: (function () { try { return localStorage.getItem('innov_lang') || 'es'; } catch (e) { return 'es'; } })(),
  orig: new WeakMap(),
  en: {
    ann: "Handmade with love · 100% natural soy wax · Made to order",
    nav_home: "Home", nav_shop: "Shop", nav_hist: "Story", nav_pers: "Custom", nav_gal: "Gallery", nav_contact: "Contact", nav_menu: "Menu",
    cart_title: "Your cart", cart_empty: "Your cart is empty", cart_empty_sub: "Add your favorite pieces to request them.",
    cart_remove: "Remove", cart_items: "Items", cart_checkout: "Request by email",
    cart_note: "We'll confirm price and availability by email.", add: "Add", added: "Added to cart",
    promo_eye: "Featured", promo_h: "Featured collections", promo_btn: "View collection",
    vel_eye: "More candles", vel_h: "Discover our candles",
    foot_desc: "Hand-poured decorative & scented soy candles, home fragrance and candle-making supplies. Handmade with love between Paraguay and the USA.",
    foot_shop: "Shop", foot_contact: "Contact", foot_made: "Made by Neura", foot_follow: "Follow",

    hero_eye: "Handmade soy candles",
    hero_h1: "The art of<br>light &amp; scent", hero_h1b: "The art of light & scent",
    hero_sub: "Sculptural soy candles, home fragrance and everything to create your own — poured by hand, one piece at a time.",
    cta_shop: "Explore the shop", cta_story: "Our story", portada: "Cover", scroll: "Scroll",

    col_eye: "Explore", col_h: "Our collections", col_sub: "Four worlds of handmade craft, from sculptural candles to the tools that make them.",
    explore: "Explore",
    feat_eye: "Favorites", feat_h: "Signature pieces", feat_sub: "A selection of our most-loved designs.", see_all: "View full shop",
    about_eye: "Our story", about_h: "Poured by hand,<br>made to be felt",
    about_p: "Innovarte Candles was born from Adriana Saieg’s love of turning wax into small works of art — between Paraguay and the United States. Every candle is sculpted, poured and finished by hand with 100% natural soy wax.",
    about_cta: "Read our story",
    v1_h: "Handcrafted", v1_p: "Sculpted and poured one by one.",
    v2_h: "Natural soy wax", v2_p: "Clean, slow, long-lasting burn.",
    v3_h: "Paraguay & USA", v3_p: "Our roots, in every piece.",
    pers_eye: "Custom orders", pers_h: "Designed for your moments",
    pers_p: "Weddings, events, corporate gifts or a one-of-a-kind detail. We craft the shape, color, scent and label with you.",
    pers_cta: "Request a quote",
    gal_eye: "@innovartecandles", gal_h: "From our studio", gal_cta: "Follow on Instagram",
    contact_eye: "Get in touch", contact_h: "Let's create something beautiful",
    contact_p: "Write to us for orders, custom pieces or wholesale. We'd love to hear from you.",
    contact_cta: "Write to us",

    catpg_eye: "The full collection", catpg_h: "Shop",
    catpg_sub: "Every piece is hand-poured in small batches with natural soy wax. Add your favorites and request them by message.",
    filter_all: "All",

    histpg_eye: "About us", histpg_h: "The story behind<br>each flame",
    founder: "Founder",
    histpg_lead: "From Paraguay to the USA — Adriana Saieg turns her passion into candles that inspire.",
    histpg_s1_h: "It began by hand", histpg_s1_p: "I’m Adriana Saieg, founder of Innovarte Candles. I was born in Paraguay and now live in the United States. My brand was born on June 3, 2024, but my passion for art and creativity has been with me for as long as I can remember. When I arrived here I wanted to create something meaningful — I began crafting by hand until I found my true passion: the art of candle making.",
    histpg_s2_h: "More than a candle", histpg_s2_p: "Every candle I create is more than a product: it’s a piece of my story, a reflection of dedication, love and craftsmanship. Along the way I realized I could also inspire other women to start their own businesses, and today I lead and connect with groups of women entrepreneurs around the world.",
    histpg_s3_h: "My mission", histpg_s3_p: "To inspire women of all ages to follow their dreams, start from home if they wish, and never give up — because when you truly love what you do, there are no limits.",
    histpg_values: "What guides us",

    perspg_eye: "Custom orders", perspg_h: "Designed with you",
    perspg_lead: "Candles and details created for your most special moments.",
    step1_h: "Choose the occasion", step1_p: "Wedding, birthday, corporate event or a personal gift — tell us the moment.",
    step2_h: "Shape, color & scent", step2_p: "We guide you through forms, pastel tones and fragrances to match your idea.",
    step3_h: "Custom label", step3_p: "Names, dates or your brand — we design a label just for you.",
    step4_h: "We craft & deliver", step4_p: "We pour your batch by hand and deliver it ready to gift.",
    form_h: "Request your quote", form_name: "Name", form_email: "Email / Phone", form_type: "Type of event",
    form_qty: "Approx. quantity", form_msg: "Tell us your idea", form_send: "Send by email",
    form_sent: "Opening your email…",

    galpg_eye: "Gallery", galpg_h: "Moments of light",
    galpg_sub: "A look at our pieces, our studio and the homes they now live in.",
    gal_follow: "Follow on Instagram"
  },
  apply: function (lang) {
    this.lang = lang;
    try { localStorage.setItem('innov_lang', lang); } catch (e) {}
    var self = this;
    document.querySelectorAll('[data-i18n]').forEach(function (el) {
      if (!self.orig.has(el)) self.orig.set(el, el.innerHTML);
      var k = el.getAttribute('data-i18n');
      if (lang === 'en') { if (self.en[k] != null) el.innerHTML = self.en[k]; }
      else { el.innerHTML = self.orig.get(el); }
    });
    document.querySelectorAll('[data-lang-label]').forEach(function (el) { el.textContent = lang === 'es' ? 'EN' : 'ES'; });
    document.querySelectorAll('[data-i18n-ph]').forEach(function (el) {
      var pair = el.getAttribute('data-i18n-ph').split('|');
      el.setAttribute('placeholder', lang === 'en' ? pair[1] : pair[0]);
    });
  },
  toggle: function () { this.apply(this.lang === 'es' ? 'en' : 'es'); },
  t: function (k, es) { return this.lang === 'en' && this.en[k] != null ? this.en[k] : es; }
};
