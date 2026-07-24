/* ============================================================================
   InnovArte — Configuración compartida del sitio
   ----------------------------------------------------------------------------
   Una sola fuente de verdad para la navegación (categorías + subcategorías) y
   los datos de contacto. La usan el encabezado (SiteNav), el pie (SiteFooter)
   y las páginas de categoría, para no repetir la estructura en varios lugares.
   ============================================================================ */

/* --- WhatsApp del negocio -------------------------------------------------
   Número en formato internacional, solo dígitos (sin +, espacios ni guiones).
   Actual: +1 (385) 230-9294  (Estados Unidos).                              */
window.INNOV_WA = '13852309294';

/* Devuelve un enlace wa.me con un mensaje opcional ya codificado. */
window.INNOV_waLink = function (texto) {
  var base = 'https://wa.me/' + (window.INNOV_WA || '');
  return texto ? base + '?text=' + encodeURIComponent(texto) : base;
};

/* --- Taxonomía principal --------------------------------------------------
   `slug` = categoría; `subs` = subcategorías. Los enlaces apuntan al catálogo
   filtrado:  catalogo.dc.html?cat=<slug>            (categoría completa)
              catalogo.dc.html?cat=<slug>&sub=<sub>  (subcategoría)          */
window.INNOV_TAX = [
  { slug:'velas', name:'Velas', desc:'Velas artesanales de cera de soja.', subs:[
    { slug:'recipiente',  name:'Velas en recipiente' },
    { slug:'decorativas', name:'Velas decorativas' },
    { slug:'souvenir',    name:'Souvenir' },
    { slug:'bouquets',    name:'Bouquets de velas' },
    { slug:'especiales',  name:'Ediciones especiales' }
  ]},
  { slug:'aromas', name:'Aromas para el Hogar', desc:'Fragancia para cada ambiente.', subs:[
    { slug:'home-spray',           name:'Home Spray' },
    { slug:'spray-textil',         name:'Spray Textil' },
    { slug:'difusores-varillas',   name:'Difusores de Varillas' },
    { slug:'difusores-auto',       name:'Difusores para Auto' },
    { slug:'wax-melts',            name:'Wax Melts' },
    { slug:'hornitos',             name:'Hornitos' },
    { slug:'difusores-electricos', name:'Difusores Eléctricos' }
  ]},
  { slug:'ceramicas', name:'Cerámicas Decorativas', desc:'Piezas decorativas hechas a mano.', subs:[
    { slug:'bandejas',   name:'Bandejas' },
    { slug:'cuencos',    name:'Cuencos' },
    { slug:'floreros',   name:'Floreros' },
    { slug:'portavelas', name:'Portavelas' },
    { slug:'piezas',     name:'Piezas Decorativas' }
  ]},
  { slug:'kits', name:'Kits y Regalos', desc:'Regalos listos y personalizados.', subs:[
    { slug:'kits-velas',             name:'Kits de velas' },
    { slug:'kits-aromas',            name:'Kits de aromas' },
    { slug:'kits-ceramica',          name:'Kits de cerámica' },
    { slug:'regalos-personalizados', name:'Regalos personalizados' }
  ]}
];

/* Enlaces del menú que no son categorías de tienda (se mantienen a pedido). */
window.INNOV_NAV_EXTRA = [
  { href:'insumos.dc.html', name:'Insumos', i18n:'nav_insumos' },
  { href:'cursos.dc.html',  name:'Cursos',  i18n:'nav_cursos' }
];

/* Busca una categoría o subcategoría por slug (útil para breadcrumbs). */
window.INNOV_findCat = function (slug) {
  return (window.INNOV_TAX || []).filter(function (c) { return c.slug === slug; })[0] || null;
};

/* Devuelve la sección de INNOV_TAX cuya `dbcats` incluye ese slug de categoría de
   la base — sirve para poblar el selector de sub-sección en el panel admin. */
window.INNOV_seccionDeCat = function (catSlug) {
  var tax = window.INNOV_TAX || [], map = window.INNOV_CATMAP || {};
  for (var i = 0; i < tax.length; i++) {
    var m = map[tax[i].slug];
    if (m && (m.dbcats || []).indexOf(catSlug) >= 0) return tax[i];
  }
  return null;
};

/* --- Sub-secciones editables desde el panel -------------------------------
   El panel de administración guarda las sub-secciones en la base
   (`configuracion.subsecciones`) como un mapa { seccion: [{slug,name}, …] }.
   `datos-remotos.js` lo deja en `window.INNOV_SUBS_DB` y esta función lo vuelca
   sobre INNOV_TAX, para que el menú (SiteNav), el catálogo y el selector del
   panel muestren siempre las sub-secciones vigentes. Si una sección no viene en
   el mapa, conserva las de fábrica de arriba (red de seguridad).            */
window.INNOV_setSubs = function (map) {
  if (!map || typeof map !== 'object') return;
  (window.INNOV_TAX || []).forEach(function (sec) {
    var arr = map[sec.slug];
    if (Array.isArray(arr)) {
      sec.subs = arr
        .filter(function (s) { return s && s.slug && s.name; })
        .map(function (s) { return { slug: String(s.slug), name: String(s.name) }; });
    }
  });
};

/* --- Mapeo de la taxonomía nueva a los productos que YA existen en la base ---
   Cada categoría nueva se arma con una o más categorías reales de Supabase
   (`dbcats`) y una función `sub(p)` que clasifica cada producto en una
   subcategoría por su slug/subtítulo. Así el catálogo filtra por categoría y
   subcategoría sin necesidad de renombrar nada en la base todavía.
   `img` es la imagen del banner de la categoría.                            */
window.INNOV_CATMAP = {
  velas: {
    dbcats: ['velas'],
    img: 'uploads/velas-peonia.jpg',
    video: 'uploads/portada-velas-animada.mp4',   // banner animado (autoplay/loop); img queda de fallback
    sub: function (p) {
      if (p && p.subcat) return p.subcat;   // sub-sección elegida en el panel manda
      var s = String(p.slug || p.id || ''), t = (s + ' ' + (p.sub || '')).toLowerCase();
      if (/especial|edici[oó]n|limitad/.test(t)) return 'especiales';
      if (/souvenir|baby/.test(t)) return 'souvenir';
      if (/^velas-vidrio-|^velas-lata-|recipiente/.test(s)) return 'recipiente';
      if (/^bouquet-|^bandeja-flores-|^iv-flores-bandeja$/.test(s)) return 'bouquets';
      return 'decorativas';
    }
  },
  aromas: {
    dbcats: ['aromatizadores'],
    img: 'uploads/difusor-varillas-natural.jpg',
    sub: function (p) {
      if (p && p.subcat) return p.subcat;   // sub-sección elegida en el panel manda
      var s = String(p.slug || p.id || ''), t = (s + ' ' + (p.sub || '')).toLowerCase();
      if (/^difusor-auto/.test(s)) return 'difusores-auto';
      if (/^difusor-varillas-|^difusor-flor-tela-/.test(s)) return 'difusores-varillas';
      if (/^aroma-hornillo-|hornito/.test(t)) return 'hornitos';
      if (/^aroma-waxmelt-/.test(s)) return 'wax-melts';
      if (/^aroma-homespray-set/.test(s)) return 'spray-textil';
      if (/^aroma-homespray-/.test(s)) return 'home-spray';
      if (/textil/.test(t)) return 'spray-textil';
      if (/wax\s*melt/.test(t)) return 'wax-melts';
      if (/el[eé]ctric/.test(t)) return 'difusores-electricos';
      if (/varilla/.test(t)) return 'difusores-varillas';
      return null;
    }
  },
  ceramicas: {
    dbcats: ['ceramica'],
    img: 'uploads/difusor-varillas-ceramica-taupe.jpg',
    sub: function (p) {
      if (p && p.subcat) return p.subcat;   // sub-sección elegida en el panel manda
      var s = String(p.slug || p.id || ''), t = (s + ' ' + (p.sub || '')).toLowerCase();
      if (/bandeja/.test(t)) return 'bandejas';
      if (/cuenco|bowl/.test(t)) return 'cuencos';
      if (/florero|jarr[oó]n|vasija/.test(t)) return 'floreros';
      if (/portavela|candelabro|porta\s*vela/.test(t)) return 'portavelas';
      return 'piezas';
    }
  },
  kits: {
    dbcats: ['kits'],
    img: 'uploads/bandeja-flores-ovalada-rosa.jpg',
    sub: function (p) {
      if (p && p.subcat) return p.subcat;   // sub-sección elegida en el panel manda
      var s = String(p.slug || p.id || ''), t = (s + ' ' + (p.sub || '')).toLowerCase();
      if (/cer[aá]mica/.test(t)) return 'kits-ceramica';
      if (/aroma|difusor|spray/.test(t)) return 'kits-aromas';
      if (/vela/.test(t)) return 'kits-velas';
      return 'regalos-personalizados';
    }
  }
};

/* Si los datos en vivo (datos-remotos.js) ya trajeron sub-secciones editadas
   desde el panel, aplicarlas ahora sobre INNOV_TAX. (La otra vía: datos-remotos
   llama a INNOV_setSubs en cuanto esta función existe.) */
if (window.INNOV_SUBS_DB) window.INNOV_setSubs(window.INNOV_SUBS_DB);
