/* ============================================================================
   InnovArte — Modal "Ver detalle" de producto (compartido entre páginas).
   Uso:  window.InnovProductModal.open({ id, name, img, sub, desc, precio, cat })
   No depende de la web: se autoconstruye la primera vez que se abre.
   ============================================================================ */
(function () {
  if (window.InnovProductModal) return;

  var CSS =
    '.ipm-overlay{position:fixed;inset:0;z-index:9000;display:flex;align-items:center;justify-content:center;' +
    'padding:20px;background:rgba(60,44,28,.55);-webkit-backdrop-filter:blur(4px);backdrop-filter:blur(4px);' +
    'opacity:0;visibility:hidden;transition:opacity .3s ease,visibility .3s ease;}' +
    '.ipm-overlay.on{opacity:1;visibility:visible;}' +
    '.ipm-panel{position:relative;width:100%;max-width:900px;max-height:90vh;overflow:hidden;background:#F7F1E6;' +
    'color:#4B3621;border-radius:10px;box-shadow:0 40px 90px -30px rgba(60,44,28,.7);display:grid;' +
    'grid-template-columns:1fr 1fr;transform:translateY(16px) scale(.98);' +
    'transition:transform .3s cubic-bezier(.22,.61,.36,1);}' +
    '.ipm-overlay.on .ipm-panel{transform:none;}' +
    '.ipm-media{position:relative;background:#EFE7D8;min-height:360px;}' +
    '.ipm-media img{position:absolute;inset:0;width:100%;height:100%;object-fit:contain;object-position:center;padding:18px;box-sizing:border-box;}' +
    '.ipm-nav{position:absolute;top:50%;transform:translateY(-50%);z-index:3;width:40px;height:40px;border-radius:50%;' +
    'border:none;background:rgba(247,241,230,.9);color:#4B3621;font-size:24px;line-height:1;cursor:pointer;' +
    'display:flex;align-items:center;justify-content:center;box-shadow:0 4px 14px rgba(60,44,28,.22);transition:background .25s;}' +
    '.ipm-nav:hover{background:#E7D6B8;}' +
    '.ipm-prev{left:12px;}.ipm-next{right:12px;}' +
    '.ipm-dots{position:absolute;left:0;right:0;bottom:12px;z-index:3;display:flex;gap:7px;justify-content:center;}' +
    '.ipm-dot{width:8px;height:8px;border-radius:50%;border:none;padding:0;background:rgba(75,54,33,.28);cursor:pointer;' +
    'transition:background .25s,transform .25s;}' +
    '.ipm-dot.on{background:#4B3621;transform:scale(1.25);}' +
    '.ipm-info{padding:clamp(26px,4vw,46px);overflow-y:auto;display:flex;flex-direction:column;}' +
    '.ipm-eye{font-size:11px;letter-spacing:.22em;text-transform:uppercase;color:#9C7A50;margin-bottom:14px;}' +
    '.ipm-name{font-family:"Cormorant Garamond",serif;font-weight:400;font-size:clamp(28px,3.4vw,42px);' +
    'line-height:1.05;color:#4B3621;margin:0;}' +
    '.ipm-sub{color:#7A6754;font-size:13px;letter-spacing:.05em;margin-top:12px;}' +
    '.ipm-desc{color:#5f5346;font-weight:300;font-size:15px;line-height:1.75;margin-top:18px;}' +
    '.ipm-price{font-family:"Cormorant Garamond",serif;font-size:28px;color:#4B3621;margin-top:18px;}' +
    '.ipm-note{color:#7A6754;font-weight:300;font-size:13.5px;line-height:1.6;margin-top:16px;font-style:italic;}' +
    '.ipm-aromas{margin-top:22px;}' +
    '.ipm-aromas-h{font-size:11px;letter-spacing:.18em;text-transform:uppercase;color:#9C7A50;margin-bottom:11px;}' +
    '.ipm-aromas-chips{display:flex;flex-wrap:wrap;gap:7px;}' +
    '.ipm-chip{font-size:12px;color:#4B3621;background:#EFE7D8;border:1px solid rgba(200,169,106,.45);border-radius:30px;padding:6px 13px;cursor:pointer;font-family:inherit;transition:background .2s,color .2s,border-color .2s;}' +
    '.ipm-chip:hover{border-color:#C8A96A;}' +
    '.ipm-chip.on{background:#4B3621;color:#fff;border-color:#4B3621;}' +
    '.ipm-aromas-nota{color:#7A6754;font-weight:300;font-size:12.5px;line-height:1.55;margin-top:12px;font-style:italic;}' +
    '.ipm-colores{margin-top:22px;}' +
    '.ipm-colores-h{font-size:11px;letter-spacing:.18em;text-transform:uppercase;color:#9C7A50;margin-bottom:12px;}' +
    '.ipm-colores-sel{color:#4B3621;font-weight:500;text-transform:none;letter-spacing:0;margin-left:5px;}' +
    '.ipm-swatches{display:flex;flex-wrap:wrap;gap:12px;}' +
    '.ipm-swatch{background:none;border:none;padding:0;cursor:pointer;line-height:0;}' +
    '.ipm-swatch-dot{display:block;width:30px;height:30px;border-radius:50%;border:2px solid rgba(75,54,33,.15);' +
    'box-shadow:inset 0 0 0 2px #F7F1E6;transition:transform .2s,border-color .2s;}' +
    '.ipm-swatch:hover .ipm-swatch-dot{border-color:#C8A96A;transform:scale(1.06);}' +
    '.ipm-swatch.on .ipm-swatch-dot{border-color:#4B3621;transform:scale(1.1);}' +
    '.ipm-actions{display:flex;gap:12px;flex-wrap:wrap;margin-top:auto;padding-top:28px;}' +
    '.ipm-btn{flex:1 1 auto;min-width:150px;text-align:center;padding:15px 20px;font-family:"Jost",sans-serif;' +
    'font-size:12px;letter-spacing:.18em;text-transform:uppercase;cursor:pointer;border-radius:3px;' +
    'border:1px solid #4B3621;transition:all .35s ease;text-decoration:none;display:inline-block;line-height:1.1;}' +
    '.ipm-btn-fill{background:#4B3621;color:#fff;}' +
    '.ipm-btn-fill:hover{background:#C8A96A;color:#4B3621;border-color:#C8A96A;letter-spacing:.24em;}' +
    '.ipm-btn-ghost{background:transparent;color:#4B3621;}' +
    '.ipm-btn-ghost:hover{background:#4B3621;color:#fff;}' +
    '.ipm-close{position:absolute;top:12px;right:12px;z-index:2;width:40px;height:40px;border-radius:50%;' +
    'border:none;background:rgba(247,241,230,.92);color:#4B3621;font-size:24px;line-height:1;cursor:pointer;' +
    'display:flex;align-items:center;justify-content:center;box-shadow:0 4px 14px rgba(60,44,28,.25);' +
    'transition:background .3s;}' +
    '.ipm-close:hover{background:#E7D6B8;}' +
    '@media (max-width:720px){.ipm-panel{grid-template-columns:1fr;max-height:92vh;overflow-y:auto;}' +
    '.ipm-media{min-height:0;aspect-ratio:4/3;}}' +
    '@media (prefers-reduced-motion:reduce){.ipm-overlay,.ipm-overlay .ipm-panel{transition:none;}}';

  var CATNOMBRE = {
    velas: 'Velas', aromas: 'Aromas para el Hogar', aromatizadores: 'Aromas para el Hogar',
    ceramicas: 'Cerámicas Decorativas', ceramica: 'Cerámicas Decorativas', kits: 'Kits y Regalos'
  };
  var CATNOMBRE_EN = {
    velas: 'Candles', aromas: 'Home Fragrance', aromatizadores: 'Home Fragrance',
    ceramicas: 'Decorative Ceramics', ceramica: 'Decorative Ceramics', kits: 'Gifts & Kits'
  };
  function T(k, es) { return (window.InnovI18N && InnovI18N.t) ? InnovI18N.t(k, es) : es; }
  function enOn() { return !!(window.InnovI18N && InnovI18N.lang === 'en'); }
  function catNombre(cat) { return (enOn() && CATNOMBRE_EN[cat]) ? CATNOMBRE_EN[cat] : (CATNOMBRE[cat] || ''); }

  /* --- Colores disponibles por cerámica --------------------------------------
     Leídos de la tira "Colores disponibles" de cada foto. Cada pieza lista sus
     tonos reales; el cliente elige uno y se suma al pedido (carrito + WhatsApp).
     Los floreros de rostro y la compotera son de un solo color: no llevan tira.
     Para agregar/quitar un color, editá la lista del slug correspondiente.     */
  var COLOR_HEX = {
    'Marmolado Beige': '#dcc7a4', 'Beige Veich Marmolado': '#d3c1a4', 'Veich': '#cdc0ad',
    'Marmolado Negro': '#8f8f8f', 'Negro Marmolado': '#8f8f8f',
    'Marmolado Rosa': '#eabecb', 'Marmolado Rosado': '#eabecb', 'Rosado Marmolado': '#eabecb',
    'Marmolado Dorado': '#e4d3a0', 'Blanco con Bordes Dorados': '#f0e6cb',
    'Blanco Liso': '#f3efe7', 'Blanco': '#f3efe7', 'Blanco Marmolado': '#e9e5db',
    'Amarillo Pastel': '#f1e29a', 'Amarillo': '#f1e29a',
    'Rosa Pastel': '#edb7bf', 'Rosa': '#edb7bf',
    'Negro Pastel': '#3a3a3a', 'Negro': '#3a3a3a',
    'Verde Pastel': '#bcd6ac', 'Verde Claro': '#bcd6ac', 'Verde Selva': '#7f9475',
    'Celeste Pastel': '#bcd0e0', 'Ocre': '#d69a3c'
  };
  var CERAMICA_COLORES = {
    // Bandejas
    'ceramica-bandeja-rectangular': ['Marmolado Beige', 'Marmolado Negro', 'Marmolado Rosa', 'Marmolado Dorado', 'Blanco Liso'],
    'ceramica-bandeja-perlas':      ['Marmolado Beige', 'Marmolado Negro', 'Marmolado Rosa', 'Marmolado Dorado', 'Blanco Liso'],
    'ceramica-bandeja-barroca':     ['Marmolado Beige', 'Marmolado Negro', 'Marmolado Rosa', 'Marmolado Dorado', 'Blanco con Bordes Dorados'],
    'ceramica-bandeja-dorada':      ['Marmolado Beige', 'Marmolado Negro', 'Marmolado Rosa', 'Marmolado Dorado', 'Blanco con Bordes Dorados'],
    'ceramica-bandeja-triangular':  ['Blanco Marmolado', 'Rosado Marmolado', 'Negro Marmolado', 'Beige Veich Marmolado'],
    'ceramica-bandeja-ovalada':     ['Amarillo Pastel', 'Rosa Pastel', 'Negro Pastel', 'Verde Pastel', 'Blanco'],
    // Cuencos
    'ceramica-cuenco-petalos':      ['Marmolado Beige', 'Marmolado Negro', 'Marmolado Rosa', 'Marmolado Dorado', 'Blanco Liso'],
    'ceramica-cuenco-flor':         ['Marmolado Beige', 'Marmolado Rosado', 'Marmolado Negro', 'Blanco Liso'],
    'ceramica-cuenco-venera':       ['Marmolado Rosado', 'Blanco Marmolado', 'Marmolado Negro', 'Blanco con Bordes Dorados'],
    'ceramica-cuenco-corazon':      ['Amarillo', 'Rosa', 'Negro', 'Verde Claro', 'Blanco'],
    'ceramica-cuenco-flor-petalos': ['Amarillo', 'Rosa', 'Negro', 'Verde Claro', 'Blanco'],
    'ceramica-cuenco-redondo':      ['Amarillo Pastel', 'Rosa Pastel', 'Negro', 'Verde Pastel', 'Blanco'],
    'ceramica-cuenco-estrella':     ['Blanco', 'Celeste Pastel', 'Rosa Pastel', 'Amarillo Pastel', 'Verde Pastel'],
    'ceramica-cuenco-caracol':      ['Blanco', 'Celeste Pastel', 'Rosa Pastel', 'Amarillo Pastel', 'Verde Pastel'],
    'ceramica-cuenco-concha':       ['Blanco', 'Celeste Pastel', 'Rosa Pastel', 'Amarillo Pastel', 'Verde Pastel'],
    'ceramica-cuenco-esfera':       ['Blanco', 'Veich', 'Negro', 'Verde Selva', 'Ocre'],
    // Piezas
    'ceramica-pieza-arco':          ['Marmolado Beige', 'Marmolado Rosado', 'Blanco', 'Marmolado Negro'],
    'ceramica-pieza-jabonera-ondas':['Amarillo', 'Rosa', 'Negro', 'Verde Claro', 'Blanco'],
    'ceramica-pieza-joyero':        ['Amarillo Pastel', 'Rosa Pastel', 'Negro Pastel', 'Verde Pastel', 'Blanco'],
    'ceramica-pieza-panuelera':     ['Marmolado Beige', 'Marmolado Rosa', 'Blanco', 'Marmolado Negro']
  };

  var overlay, elImg, elEye, elName, elSub, elDesc, elPrice, elNote, elAromas, elColores, elAdd, elWa, lastFocus, cur;
  var elPrev, elNext, elDots, galImgs = [], galIdx = 0, galToken = 0, galCache = {};

  function el(html) { var d = document.createElement('div'); d.innerHTML = html; return d.firstElementChild; }
  function esc(s) { return String(s == null ? '' : s).replace(/[&<>"]/g, function (c) { return { '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;' }[c]; }); }

  function build() {
    var style = document.createElement('style'); style.textContent = CSS; document.head.appendChild(style);
    overlay = el(
      '<div class="ipm-overlay" role="dialog" aria-modal="true" aria-label="Detalle del producto">' +
      '<div class="ipm-panel">' +
      '  <button type="button" class="ipm-close" aria-label="Cerrar">&times;</button>' +
      '  <div class="ipm-media">' +
      '    <img alt="">' +
      '    <button type="button" class="ipm-nav ipm-prev" aria-label="Imagen anterior">&lsaquo;</button>' +
      '    <button type="button" class="ipm-nav ipm-next" aria-label="Imagen siguiente">&rsaquo;</button>' +
      '    <div class="ipm-dots"></div>' +
      '  </div>' +
      '  <div class="ipm-info">' +
      '    <div class="ipm-eye"></div>' +
      '    <h2 class="ipm-name"></h2>' +
      '    <div class="ipm-sub"></div>' +
      '    <p class="ipm-desc"></p>' +
      '    <div class="ipm-price"></div>' +
      '    <div class="ipm-note"></div>' +
      '    <div class="ipm-aromas" style="display:none"></div>' +
      '    <div class="ipm-colores" style="display:none"></div>' +
      '    <div class="ipm-actions">' +
      '      <button type="button" class="ipm-btn ipm-btn-fill ipm-add">Añadir al carrito</button>' +
      '      <a class="ipm-btn ipm-btn-ghost ipm-wa" target="_blank" rel="noopener">Consultar por WhatsApp</a>' +
      '    </div>' +
      '  </div>' +
      '</div></div>');
    document.body.appendChild(overlay);
    elImg = overlay.querySelector('.ipm-media img');
    elPrev = overlay.querySelector('.ipm-prev'); elNext = overlay.querySelector('.ipm-next');
    elDots = overlay.querySelector('.ipm-dots');
    elEye = overlay.querySelector('.ipm-eye'); elName = overlay.querySelector('.ipm-name');
    elSub = overlay.querySelector('.ipm-sub'); elDesc = overlay.querySelector('.ipm-desc');
    elPrice = overlay.querySelector('.ipm-price'); elNote = overlay.querySelector('.ipm-note');
    elAromas = overlay.querySelector('.ipm-aromas');
    elColores = overlay.querySelector('.ipm-colores');
    elAdd = overlay.querySelector('.ipm-add'); elWa = overlay.querySelector('.ipm-wa');

    overlay.querySelector('.ipm-close').addEventListener('click', close);
    overlay.addEventListener('mousedown', function (e) { if (e.target === overlay) close(); });
    document.addEventListener('keydown', function (e) {
      if (!overlay.classList.contains('on')) return;
      if (e.key === 'Escape') { close(); return; }
      if (galImgs.length > 1 && (e.key === 'ArrowLeft' || e.key === 'ArrowRight')) {
        galShow(galIdx + (e.key === 'ArrowRight' ? 1 : -1));
      }
    });
    // Carrusel de imágenes del producto (flechas + puntitos).
    elPrev.addEventListener('click', function () { galShow(galIdx - 1); });
    elNext.addEventListener('click', function () { galShow(galIdx + 1); });
    elDots.addEventListener('click', function (e) {
      var d = e.target.closest('.ipm-dot'); if (!d) return;
      var k = [].indexOf.call(elDots.children, d); if (k >= 0) galShow(k);
    });
    // Trampa de foco simple (Tab cicla entre los controles del modal).
    overlay.addEventListener('keydown', function (e) {
      if (e.key !== 'Tab') return;
      var f = [].slice.call(overlay.querySelectorAll('.ipm-close,.ipm-add,.ipm-wa'));
      if (!f.length) return;
      var first = f[0], last = f[f.length - 1];
      if (e.shiftKey && document.activeElement === first) { e.preventDefault(); last.focus(); }
      else if (!e.shiftKey && document.activeElement === last) { e.preventDefault(); first.focus(); }
    });
    elAdd.addEventListener('click', function () {
      if (window.InnovCart && cur) {
        // El color/aroma elegido diferencia la línea del carrito y se ve en el nombre.
        var variante = cur.color || cur.aroma || '';
        var lineId = cur.id + (variante ? '::' + variante : '');
        var nombre = cur.name + (cur.color ? ' — ' + cur.color : '');
        InnovCart.add(lineId, nombre, cur.img, { aroma: cur.aroma || '', color: cur.color || '', slug: cur.id, cat: cur.cat });
        InnovCart.openCart();
      }
      close();
    });
    // Selección de aroma (chips): un aroma a la vez; volver a tocarlo lo des-selecciona.
    elAromas.addEventListener('click', function (e) {
      var chip = e.target.closest('.ipm-chip'); if (!chip) return;
      var was = chip.classList.contains('on');
      elAromas.querySelectorAll('.ipm-chip').forEach(function (c) { c.classList.remove('on'); c.setAttribute('aria-pressed', 'false'); });
      if (!was) { chip.classList.add('on'); chip.setAttribute('aria-pressed', 'true'); cur.aroma = chip.getAttribute('data-aroma') || ''; }
      else { cur.aroma = ''; }
      elAdd.textContent = cur.aroma ? ((enOn() ? 'Add' : 'Añadir') + ' · ' + cur.aroma) : T('modal_add', 'Añadir al carrito');
      elWa.href = waLink();
    });
    // Selección de color (swatches): un color a la vez; volver a tocarlo lo des-selecciona.
    elColores.addEventListener('click', function (e) {
      var sw = e.target.closest('.ipm-swatch'); if (!sw) return;
      var was = sw.classList.contains('on');
      elColores.querySelectorAll('.ipm-swatch').forEach(function (s) { s.classList.remove('on'); s.setAttribute('aria-pressed', 'false'); });
      if (!was) { sw.classList.add('on'); sw.setAttribute('aria-pressed', 'true'); cur.color = sw.getAttribute('data-color') || ''; }
      else { cur.color = ''; }
      var sel = elColores.querySelector('.ipm-colores-sel');
      if (sel) sel.textContent = cur.color || (enOn() ? 'Choose a color' : 'Elegí un color');
      elAdd.textContent = cur.color ? ((enOn() ? 'Add' : 'Añadir') + ' · ' + cur.color) : T('modal_add', 'Añadir al carrito');
      elWa.href = waLink();
    });
  }

  function fmtPrecio(p) {
    var n = parseFloat(p);
    if (!isFinite(n) || n <= 0) return '';
    try { return 'Gs. ' + n.toLocaleString('es-PY'); } catch (e) { return 'Gs. ' + n; }
  }

  function prodLink(slug) {
    var origin = (typeof location !== 'undefined' && location.origin) ? location.origin : '';
    return origin + '/catalogo.dc.html?producto=' + encodeURIComponent(slug || '');
  }
  function waLink() {
    var extra = [];
    if (cur && cur.aroma) extra.push('Aroma: ' + cur.aroma);
    if (cur && cur.color) extra.push('Color: ' + cur.color);
    var msg = '¡Hola! Quiero consultar por: ' + ((cur && cur.name) || '') +
      (extra.length ? ' (' + extra.join(', ') + ')' : '') + '\n' + prodLink(cur && cur.id);
    if (window.INNOV_waLink) return window.INNOV_waLink(msg);
    return 'https://wa.me/' + (window.INNOV_WA || '') + '?text=' + encodeURIComponent(msg);
  }

  function set(node, txt) { node.textContent = txt || ''; node.style.display = txt ? '' : 'none'; }

  // ---- Carrusel ----
  function galShow(i) {
    if (!galImgs.length) return;
    galIdx = (i + galImgs.length) % galImgs.length;
    elImg.src = galImgs[galIdx];
    var dots = elDots.children;
    for (var k = 0; k < dots.length; k++) dots[k].classList.toggle('on', k === galIdx);
  }
  function galRender(imgs) {
    galImgs = (imgs || []).filter(Boolean);
    galIdx = 0;
    var multi = galImgs.length > 1;
    elPrev.style.display = multi ? '' : 'none';
    elNext.style.display = multi ? '' : 'none';
    elDots.style.display = multi ? '' : 'none';
    elDots.innerHTML = multi
      ? galImgs.map(function (_, k) { return '<button type="button" class="ipm-dot" aria-label="Imagen ' + (k + 1) + '"></button>'; }).join('')
      : '';
    galShow(0);
  }

  // Red de seguridad: si INNOV_PRODUCTS todavía no trae la galería (respaldo
  // local products.js, caché vieja o datos aún cargando), buscamos las imágenes
  // del producto directo en la base y refrescamos el carrusel. Cachea por slug.
  function applyGal(imgs, token) {
    if (token !== galToken) return;            // el usuario ya abrió otro producto
    if (imgs.length > 1 && imgs.length > galImgs.length) galRender(imgs);
  }
  function ensureGallery(slug, token) {
    if (!slug) return;
    if (galCache[slug]) { applyGal(galCache[slug], token); return; }
    var cfg = window.INNOV_SB;
    if (!cfg || !cfg.url || !cfg.anonKey) return;
    fetch(cfg.url + '/rest/v1/productos?select=imagen,producto_imagenes(url,orden)&slug=eq.' + encodeURIComponent(slug),
      { headers: { apikey: cfg.anonKey, Authorization: 'Bearer ' + cfg.anonKey, 'Accept-Profile': cfg.schema } })
      .then(function (r) { return r.ok ? r.json() : []; })
      .then(function (j) {
        var p = j && j[0]; if (!p) return;
        var extra = (p.producto_imagenes || []).slice()
          .sort(function (a, b) { return (a.orden || 0) - (b.orden || 0); })
          .map(function (x) { return x.url; });
        var imgs = [p.imagen].concat(extra).filter(Boolean);
        galCache[slug] = imgs;
        applyGal(imgs, token);
      })
      .catch(function () {});
  }

  function open(prod) {
    if (!overlay) build();
    cur = prod || {};
    var token = ++galToken;
    lastFocus = document.activeElement;
    // Galería del producto: usamos cur.imgs si vino; si no, la buscamos en el
    // catálogo global por id/slug; como último recurso, la imagen suelta.
    var imgs = cur.imgs;
    if ((!imgs || !imgs.length) && cur.id && window.INNOV_PRODUCTS) {
      var full = window.INNOV_PRODUCTS.filter(function (p) {
        return String(p.id) === String(cur.id) || String(p.slug) === String(cur.id);
      })[0];
      if (full) imgs = full.imgs;
    }
    if (!imgs || !imgs.length) imgs = cur.img ? [cur.img] : [];
    elImg.alt = cur.name || '';
    galRender(imgs);
    if (imgs.length <= 1 && cur.id) ensureGallery(cur.id, token);
    set(elEye, catNombre(cur.cat));
    elName.textContent = cur.name || '';
    set(elSub, cur.sub || '');
    set(elDesc, (cur.desc || '').trim());
    var precio = fmtPrecio(cur.precio);
    set(elPrice, precio);
    set(elNote, precio ? '' : T('modal_note', 'Consultá precio y disponibilidad por WhatsApp o agregando al carrito.'));
    // Aromas disponibles (solo aromatizadores). La lista es editable desde el panel
    // y puede variar según la temporada; por eso se muestra la nota aclaratoria.
    var ar = (window.INNOV_CONTENT && window.INNOV_CONTENT.aromas) || window.INNOV_AROMAS || null;
    var esAroma = (cur.cat === 'aromatizadores' || cur.cat === 'aromas');
    cur.aroma = '';
    elAdd.textContent = T('modal_add', 'Añadir al carrito');
    elWa.textContent = T('modal_wa', 'Consultar por WhatsApp');
    if (esAroma && ar && ar.items && ar.items.length) {
      elAromas.innerHTML =
        '<div class="ipm-aromas-h">' + esc(T('modal_aroma_h', 'Elegí tu aroma')) + '</div>' +
        '<div class="ipm-aromas-chips">' +
          ar.items.map(function (a) { return '<button type="button" class="ipm-chip" data-aroma="' + esc(a) + '" aria-pressed="false">' + esc(a) + '</button>'; }).join('') +
        '</div>' +
        (ar.nota ? '<div class="ipm-aromas-nota">' + esc(ar.nota) + '</div>' : '');
      elAromas.style.display = '';
    } else {
      elAromas.style.display = 'none';
      elAromas.innerHTML = '';
    }
    // Colores disponibles (solo cerámicas con variantes). Se leen por slug (cur.id).
    var cols = CERAMICA_COLORES[cur.id || cur.slug || ''] || null;
    cur.color = '';
    if (cols && cols.length) {
      elColores.innerHTML =
        '<div class="ipm-colores-h">' + esc(enOn() ? 'Color' : 'Color') +
          '<span class="ipm-colores-sel">' + esc(enOn() ? 'Choose a color' : 'Elegí un color') + '</span></div>' +
        '<div class="ipm-swatches">' +
          cols.map(function (name) {
            var hex = COLOR_HEX[name] || '#cccccc';
            return '<button type="button" class="ipm-swatch" data-color="' + esc(name) + '" title="' + esc(name) + '" aria-label="' + esc(name) + '" aria-pressed="false">' +
              '<span class="ipm-swatch-dot" style="background:' + hex + '"></span></button>';
          }).join('') +
        '</div>';
      elColores.style.display = '';
    } else {
      elColores.style.display = 'none';
      elColores.innerHTML = '';
    }
    elWa.href = waLink();
    overlay.classList.add('on');
    document.documentElement.style.overflow = 'hidden';
    setTimeout(function () { try { overlay.querySelector('.ipm-close').focus(); } catch (e) {} }, 30);
  }

  function close() {
    if (!overlay) return;
    overlay.classList.remove('on');
    document.documentElement.style.overflow = '';
    try { if (lastFocus && lastFocus.focus) lastFocus.focus(); } catch (e) {}
  }

  window.InnovProductModal = { open: open, close: close };
})();
