/* ============================================================================
   InnovArte — Datos en vivo desde Supabase
   ----------------------------------------------------------------------------
   Trae categorías, productos, textos y contenido desde la base y recién
   después arranca el sitio, para que se muestre siempre lo último publicado
   desde el panel de administración.

   Es a prueba de fallos:
   - Si hay datos en caché, la página abre al instante y se refresca por detrás.
   - Si Supabase tarda más de 2,5 s o falla, el sitio arranca igual con los
     archivos locales (products.js / content.js). Nunca se queda en blanco.
   ============================================================================ */
(function () {
  var CFG    = window.INNOV_SB || {};
  var CACHE  = 'innov_datos_v1';
  var LIMITE = 2500;                 // ms máximos de espera
  var arrancado = false;

  /* ---------- arrancar el sitio ---------- */
  function arrancar() {
    if (arrancado) return;
    arrancado = true;
    var s = document.createElement('script');
    s.src = './support.js';
    document.head.appendChild(s);
  }

  /* ---------- volcar los datos en las variables del sitio ---------- */
  function aplicar(d) {
    if (!d || !d.cats) return false;
    window.INNOV_CATS     = d.cats;
    window.INNOV_PRODUCTS = d.products;
    window.INNOV_CONTENT  = d.content;
    window.INNOV_REMOTO   = true;    // evita que products.js/content.js los pisen

    // Sub-secciones editadas desde el panel (mapa { seccion:[{slug,name}] }).
    // site-config.js las vuelca sobre INNOV_TAX. Dejamos la variable global y,
    // si site-config ya cargó, aplicamos en el acto (cubre ambos órdenes de carga).
    window.INNOV_SUBS_DB = (d.content && d.content.subsecciones) || null;
    if (window.INNOV_SUBS_DB && window.INNOV_setSubs) window.INNOV_setSubs(window.INNOV_SUBS_DB);

    // Mismo ayudante que define content.js (colecciones vigentes según la fecha)
    window.INNOV_activeCollections = function () {
      var hoy = new Date(); hoy.setHours(0, 0, 0, 0);
      return (window.INNOV_CONTENT.colecciones || []).filter(function (c) {
        if (c.estado === 'archivada' || c.estado === 'borrador') return false;
        if (c.inicio && new Date(c.inicio) > hoy) return false;
        if (c.fin && new Date(c.fin) < hoy) return false;
        return true;
      }).sort(function (a, b) { return (a.orden || 0) - (b.orden || 0); });
    };
    return true;
  }

  /* ---------- traducción de la base al formato del sitio ---------- */
  function convertir(cats, prods, textos, config, tarjetas) {
    var porId = {};
    cats.forEach(function (c) { porId[c.id] = c; });

    var es = {}, en = {};
    textos.forEach(function (t) {
      if (t.es != null) es[t.clave] = t.es;
      if (t.en != null) en[t.clave] = t.en;
    });

    var conf = {};
    config.forEach(function (r) { conf[r.clave] = r.valor || {}; });

    return {
      cats: cats.map(function (c) {
        return { id: c.slug, slug: c.slug, name: c.nombre, en: c.nombre_en,
                 order: c.orden, active: c.activa, featured: c.destacada,
                 descEs: c.descripcion, descEn: c.descripcion_en, img: c.imagen };
      }),
      products: prods.map(function (p) {
        return { id: p.slug, slug: p.slug, name: p.nombre,
                 cat: (porId[p.categoria_id] || {}).slug || '',
                 sub: p.subtitulo, img: p.imagen, linea: p.linea || 'decor',
                 subcat: p.subcat || '', desc: p.descripcion || '', precio: p.precio };
      }),
      content: {
        hero: conf.hero || {},
        insumos: conf.insumos || { publicado: false, mensaje: '' },
        cursos: conf.cursos || { publicado: false, mensaje: '' },
        subsecciones: conf.subsecciones || null,   // sub-secciones editables del panel
        textos: { es: es, en: en },
        colecciones: [],
        coleccion: tarjetas.map(function (t) {
          return { id: t.clave, title: t.titulo, subtitle: t.subtitulo,
                   video: t.video, videoMobile: t.video_movil, poster: t.poster,
                   href: t.enlace, order: t.orden, active: t.activa };
        })
      }
    };
  }

  /* ---------- consulta a Supabase ---------- */
  function traer() {
    if (!CFG.url || !CFG.anonKey) return Promise.reject(new Error('sin configuración'));
    var cab = {
      apikey: CFG.anonKey,
      Authorization: 'Bearer ' + CFG.anonKey,
      'Accept-Profile': CFG.schema
    };
    var base = CFG.url + '/rest/v1/';
    function pedir(ruta) {
      return fetch(base + ruta, { headers: cab }).then(function (r) {
        if (!r.ok) throw new Error(ruta + ' → ' + r.status);
        return r.json();
      });
    }
    return Promise.all([
      pedir('categorias?select=*&eliminada=eq.false&order=orden'),
      pedir('productos?select=*&eliminado=eq.false&order=orden'),
      pedir('textos?select=clave,es,en'),
      pedir('configuracion?select=clave,valor'),
      pedir('coleccion_home?select=*&order=orden')
    ]).then(function (r) { return convertir(r[0], r[1], r[2], r[3], r[4]); });
  }

  /* ---------- 1) ¿hay caché? entonces arrancamos ya ---------- */
  var hayCache = false;
  try {
    var guardado = sessionStorage.getItem(CACHE);
    if (guardado) hayCache = aplicar(JSON.parse(guardado));
  } catch (e) {}

  if (hayCache) {
    arrancar();                                   // apertura instantánea
    traer().then(function (d) {                   // y refresco en segundo plano
      try { sessionStorage.setItem(CACHE, JSON.stringify(d)); } catch (e) {}
    }).catch(function () {});
    return;
  }

  /* ---------- 2) sin caché: esperamos (con límite) ---------- */
  var reloj = setTimeout(arrancar, LIMITE);       // red de seguridad

  traer().then(function (d) {
    clearTimeout(reloj);
    if (!arrancado) {                             // si el reloj no se adelantó
      aplicar(d);
      try { sessionStorage.setItem(CACHE, JSON.stringify(d)); } catch (e) {}
    }
    arrancar();
  }).catch(function () {
    clearTimeout(reloj);
    arrancar();                                   // seguimos con los archivos locales
  });
})();
