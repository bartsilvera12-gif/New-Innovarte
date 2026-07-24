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
    '.ipm-media img{position:absolute;inset:0;width:100%;height:100%;object-fit:cover;}' +
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
    '.ipm-chip{font-size:12px;color:#4B3621;background:#EFE7D8;border:1px solid rgba(200,169,106,.45);border-radius:30px;padding:5px 12px;}' +
    '.ipm-aromas-nota{color:#7A6754;font-weight:300;font-size:12.5px;line-height:1.55;margin-top:12px;font-style:italic;}' +
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

  var overlay, elImg, elEye, elName, elSub, elDesc, elPrice, elNote, elAromas, elAdd, elWa, lastFocus, cur;

  function el(html) { var d = document.createElement('div'); d.innerHTML = html; return d.firstElementChild; }
  function esc(s) { return String(s == null ? '' : s).replace(/[&<>"]/g, function (c) { return { '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;' }[c]; }); }

  function build() {
    var style = document.createElement('style'); style.textContent = CSS; document.head.appendChild(style);
    overlay = el(
      '<div class="ipm-overlay" role="dialog" aria-modal="true" aria-label="Detalle del producto">' +
      '<div class="ipm-panel">' +
      '  <button type="button" class="ipm-close" aria-label="Cerrar">&times;</button>' +
      '  <div class="ipm-media"><img alt=""></div>' +
      '  <div class="ipm-info">' +
      '    <div class="ipm-eye"></div>' +
      '    <h2 class="ipm-name"></h2>' +
      '    <div class="ipm-sub"></div>' +
      '    <p class="ipm-desc"></p>' +
      '    <div class="ipm-price"></div>' +
      '    <div class="ipm-note"></div>' +
      '    <div class="ipm-aromas" style="display:none"></div>' +
      '    <div class="ipm-actions">' +
      '      <button type="button" class="ipm-btn ipm-btn-fill ipm-add">Añadir al carrito</button>' +
      '      <a class="ipm-btn ipm-btn-ghost ipm-wa" target="_blank" rel="noopener">Consultar por WhatsApp</a>' +
      '    </div>' +
      '  </div>' +
      '</div></div>');
    document.body.appendChild(overlay);
    elImg = overlay.querySelector('.ipm-media img');
    elEye = overlay.querySelector('.ipm-eye'); elName = overlay.querySelector('.ipm-name');
    elSub = overlay.querySelector('.ipm-sub'); elDesc = overlay.querySelector('.ipm-desc');
    elPrice = overlay.querySelector('.ipm-price'); elNote = overlay.querySelector('.ipm-note');
    elAromas = overlay.querySelector('.ipm-aromas');
    elAdd = overlay.querySelector('.ipm-add'); elWa = overlay.querySelector('.ipm-wa');

    overlay.querySelector('.ipm-close').addEventListener('click', close);
    overlay.addEventListener('mousedown', function (e) { if (e.target === overlay) close(); });
    document.addEventListener('keydown', function (e) {
      if (e.key === 'Escape' && overlay.classList.contains('on')) close();
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
      if (window.InnovCart && cur) { InnovCart.add(cur.id, cur.name, cur.img); InnovCart.openCart(); }
      close();
    });
  }

  function fmtPrecio(p) {
    var n = parseFloat(p);
    if (!isFinite(n) || n <= 0) return '';
    try { return 'Gs. ' + n.toLocaleString('es-PY'); } catch (e) { return 'Gs. ' + n; }
  }

  function waLink(name) {
    var msg = '¡Hola! Quiero consultar por: ' + (name || '');
    if (window.INNOV_waLink) return window.INNOV_waLink(msg);
    return 'https://wa.me/' + (window.INNOV_WA || '') + '?text=' + encodeURIComponent(msg);
  }

  function set(node, txt) { node.textContent = txt || ''; node.style.display = txt ? '' : 'none'; }

  function open(prod) {
    if (!overlay) build();
    cur = prod || {};
    lastFocus = document.activeElement;
    elImg.src = cur.img || ''; elImg.alt = cur.name || '';
    set(elEye, CATNOMBRE[cur.cat] || '');
    elName.textContent = cur.name || '';
    set(elSub, cur.sub || '');
    set(elDesc, (cur.desc || '').trim());
    var precio = fmtPrecio(cur.precio);
    set(elPrice, precio);
    set(elNote, precio ? '' : 'Consultá precio y disponibilidad por WhatsApp o agregando al carrito.');
    // Aromas disponibles (solo aromatizadores). La lista es editable desde el panel
    // y puede variar según la temporada; por eso se muestra la nota aclaratoria.
    var ar = (window.INNOV_CONTENT && window.INNOV_CONTENT.aromas) || window.INNOV_AROMAS || null;
    var esAroma = (cur.cat === 'aromatizadores' || cur.cat === 'aromas');
    if (esAroma && ar && ar.items && ar.items.length) {
      elAromas.innerHTML =
        '<div class="ipm-aromas-h">Aromas disponibles</div>' +
        '<div class="ipm-aromas-chips">' +
          ar.items.map(function (a) { return '<span class="ipm-chip">' + esc(a) + '</span>'; }).join('') +
        '</div>' +
        (ar.nota ? '<div class="ipm-aromas-nota">' + esc(ar.nota) + '</div>' : '');
      elAromas.style.display = '';
    } else {
      elAromas.style.display = 'none';
      elAromas.innerHTML = '';
    }
    elWa.href = waLink(cur.name);
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
