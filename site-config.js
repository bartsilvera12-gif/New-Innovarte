/* ============================================================================
   InnovArte — Configuración compartida del sitio
   ----------------------------------------------------------------------------
   Una sola fuente de verdad para la navegación (categorías + subcategorías) y
   los datos de contacto. La usan el encabezado (SiteNav), el pie (SiteFooter)
   y las páginas de categoría, para no repetir la estructura en varios lugares.
   ============================================================================ */

/* --- WhatsApp del negocio -------------------------------------------------
   TODO: reemplazar por el número REAL, en formato internacional, solo dígitos
   (sin +, espacios ni guiones). Ejemplo Paraguay: 595985123456              */
window.INNOV_WA = '595000000000';

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

/* --- Mapeo de la taxonomía nueva a los productos que YA existen en la base ---
   Cada categoría nueva se arma con una o más categorías reales de Supabase
   (`dbcats`) y una función `sub(p)` que clasifica cada producto en una
   subcategoría por su slug/subtítulo. Así el catálogo filtra por categoría y
   subcategoría sin necesidad de renombrar nada en la base todavía.
   `img` es la imagen del banner de la categoría.                            */
window.INNOV_CATMAP = {
  velas: {
    dbcats: ['velas', 'bandeja-con-flores'],
    img: 'uploads/velas-peonia.jpg',
    sub: function (p) {
      var s = String(p.slug || p.id || ''), t = (s + ' ' + (p.sub || '')).toLowerCase();
      if (/especial|edici[oó]n|limitad/.test(t)) return 'especiales';
      if (/souvenir|baby/.test(t)) return 'souvenir';
      if (/^velas-vidrio-|^velas-lata-|recipiente/.test(s)) return 'recipiente';
      if (/^bouquet-|^bandeja-flores-|^iv-flores-bandeja$/.test(s)) return 'bouquets';
      return 'decorativas';
    }
  },
  aromas: {
    dbcats: ['aromatizadores', 'difusores-para-autos'],
    img: 'uploads/difusor-varillas-natural.jpg',
    sub: function (p) {
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
  ceramicas: { dbcats: [], img: 'uploads/difusor-varillas-ceramica-taupe.jpg', sub: function () { return null; } },
  kits:      { dbcats: [], img: 'uploads/bandeja-flores-ovalada-rosa.jpg',    sub: function () { return null; } }
};
