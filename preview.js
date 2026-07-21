/* ============================================================================
   InnovArte — Vista previa del panel de administración
   ----------------------------------------------------------------------------
   Si en este navegador hay cambios sin publicar (borrador de admin.html),
   el sitio los muestra y aparece un aviso para recordarlo.

   Importante: el borrador vive solo en TU navegador, así que los visitantes
   siempre ven la versión publicada. Este archivo no se modifica al exportar.
   ============================================================================ */
(function () {
  var CLAVE = 'innovarte_admin_borrador';
  var APAGADO = 'innov_preview_off';
  var b = null;

  try {
    if (sessionStorage.getItem(APAGADO) === '1') return;   // vista previa desactivada
    b = JSON.parse(localStorage.getItem(CLAVE) || 'null');
  } catch (e) { return; }
  if (!b) return;

  // Reemplazamos los datos del sitio por los del borrador.
  if (b.cats) window.INNOV_CATS = b.cats;
  if (b.products) window.INNOV_PRODUCTS = b.products;
  if (b.content) window.INNOV_CONTENT = b.content;
  window.INNOV_PREVIEW = true;

  function aviso() {
    if (!document.body || document.getElementById('innov-preview-bar')) return;
    var d = document.createElement('div');
    d.id = 'innov-preview-bar';
    d.setAttribute('role', 'status');
    d.style.cssText = 'position:fixed;left:50%;bottom:18px;transform:translateX(-50%);z-index:9999;' +
      'background:#39302A;color:#F6EFE7;padding:10px 14px;border-radius:40px;display:flex;align-items:center;' +
      'gap:13px;font-family:Jost,sans-serif;font-size:13px;line-height:1;max-width:94vw;' +
      'box-shadow:0 14px 34px -16px rgba(57,48,42,.7)';

    var t = document.createElement('span');
    t.textContent = 'Vista previa · cambios sin publicar';

    var a = document.createElement('a');
    a.href = 'admin.html';
    a.textContent = 'Panel';
    a.style.cssText = 'color:#EAD5CC;text-decoration:underline;white-space:nowrap';

    var x = document.createElement('button');
    x.type = 'button';
    x.textContent = 'Salir';
    x.style.cssText = 'background:#C89A8C;color:#fff;border:0;border-radius:30px;padding:6px 14px;' +
      'cursor:pointer;font:inherit;white-space:nowrap';
    x.addEventListener('click', function () {
      try { sessionStorage.setItem(APAGADO, '1'); } catch (e) {}
      location.reload();   // el borrador NO se borra, solo se deja de previsualizar
    });

    d.appendChild(t); d.appendChild(a); d.appendChild(x);
    document.body.appendChild(d);
  }

  // La página puede haber aplicado los textos antes de que cargue este archivo,
  // así que los volvemos a aplicar cuando ya está montada (es idempotente).
  function reaplicar() {
    try { if (window.InnovI18N && window.InnovI18N.apply) window.InnovI18N.apply(window.InnovI18N.lang); } catch (e) {}
    aviso();
  }
  if (document.readyState === 'loading') document.addEventListener('DOMContentLoaded', reaplicar);
  else reaplicar();
  window.addEventListener('load', reaplicar);
  setTimeout(reaplicar, 250);
  setTimeout(reaplicar, 900);
})();
