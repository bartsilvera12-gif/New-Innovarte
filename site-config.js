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
