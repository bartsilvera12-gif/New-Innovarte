/* ============================================================================
   InnovArte — CONTENIDO EDITABLE (fuente única)
   ----------------------------------------------------------------------------
   Este archivo es el "panel de administración" provisional: editá SOLO acá para
   cambiar videos, textos, colecciones e insumos, sin tocar el resto del código.
   Cada vez que guardes y publiques (deploy), la web se actualiza sola.

   Formatos recomendados:
   - Videos: .mp4 (H.264) comprimido, ideal < 6 MB. Subilos a la carpeta /uploads.
   - Imágenes de portada (poster): .jpg/.png, 1600px de ancho aprox.
   - Fechas de colección: formato 'AAAA-MM-DD' (ej. '2026-12-01').
   ============================================================================ */
(function () {
  var U = 'uploads/';                                   // carpeta local de medios
  var CDN = 'https://static.wixstatic.com/media/';      // CDN de imágenes existente

  window.INNOV_CONTENT = {

    /* ---------------------------------------------------------------------
       1) PORTADA PRINCIPAL (HERO)
       ACTUALMENTE: portada de IMAGEN (la de siempre), con paneo suave.

       ¿Querés volver al video? Poné la ruta de tu video en 'videoDesktop'
       (y opcionalmente una versión vertical en 'videoMobile'), por ejemplo:
         videoDesktop: U + 'mi-video.mp4',
       Si ambos quedan vacíos (''), se muestra la imagen de 'fallback'.
       --------------------------------------------------------------------- */
    hero: {
      videoDesktop: '',                              // '' = usar imagen de portada
      videoMobile:  '',                              // '' = usar imagen de portada
      poster:       U + 'ChatGPT Image 17 jul 2026, 12_57_03.png',
      fallback:     U + 'ChatGPT Image 17 jul 2026, 12_57_03.png'
    },

    /* ---------------------------------------------------------------------
       2) "NUESTRA COLECCIÓN" — 4 videos administrables
       Editá título, subtítulo, video (desktop/mobile), portada, enlace, orden
       y si está activo. Si un item no tiene 'video', muestra solo la portada.
       --------------------------------------------------------------------- */
    coleccion: [
      { id: 'velas',    order: 1, active: true,
        title: 'Velas artesanales', subtitle: 'Cera de soja esculpida a mano',
        video: U + 'WhatsApp Video 2026-07-20 at 13.32.09.mp4', videoMobile: '',
        poster: U + 'WhatsApp Image 2026-07-20 at 13.33.26.jpeg',
        href: 'catalogo.dc.html#velas' },

      { id: 'aromas',   order: 2, active: true,
        title: 'Aromatizadores', subtitle: 'Difusores, home sprays y textiles',
        video: U + 'WhatsApp Video 2026-07-20 at 13.32.10.mp4', videoMobile: '',
        poster: U + 'WhatsApp Image 2026-07-20 at 13.32.04.jpeg',
        href: 'catalogo.dc.html#aromatizadores' },

      { id: 'ceramica', order: 3, active: true,
        title: 'Cerámica', subtitle: 'Piezas decorativas hechas a mano',
        video: U + 'WhatsApp Video 2026-07-20 at 13.32.11.mp4', videoMobile: '',
        poster: U + 'WhatsApp Image 2026-07-20 at 13.32.07.jpeg',
        href: 'catalogo.dc.html#ceramica' },

      { id: 'concreto', order: 4, active: true,
        title: 'Concreto decorativo', subtitle: 'Diseño sobrio para tu hogar',
        video: U + 'WhatsApp Video 2026-07-20 at 13.32.13.mp4', videoMobile: '',
        poster: U + 'WhatsApp Image 2026-07-20 at 13.32.02.jpeg',
        href: 'catalogo.dc.html#concreto' }
    ],

    /* ---------------------------------------------------------------------
       3) COLECCIONES POR TEMPORADA
       'estado': 'borrador' | 'programada' | 'activa' | 'archivada'.
       Si 'inicio'/'fin' tienen fecha, la colección se muestra/oculta sola
       según la fecha actual (además de respetar 'estado').
       Dejá el arreglo vacío [] si todavía no hay colecciones.
       --------------------------------------------------------------------- */
    colecciones: [
      // Ejemplo (borrar o editar):
      // { slug:'navidad-2026', nombre:'Navidad 2026', descripcion:'Aromas y piezas para las fiestas.',
      //   portada: CDN+'...~mv2.jpg', video:'', inicio:'2026-12-01', fin:'2026-12-31',
      //   estado:'programada', destacada:true, orden:1, temporada:'Navidad',
      //   categorias:['velas','aromatizadores'], productos:[], seoTitle:'', seoDesc:'' }
    ],

    /* ---------------------------------------------------------------------
       4) INSUMOS (línea futura)
       Mientras 'publicado' sea false, la página muestra el estado "Próximamente".
       Cuando tengas insumos para vender, poné 'publicado: true'.
       --------------------------------------------------------------------- */
    insumos: {
      publicado: false,
      mensaje: 'Próximamente: insumos seleccionados para tus propias creaciones.'
    }
  };

  /* Ayudante: devuelve las colecciones que deben verse hoy (estado + fechas). */
  window.INNOV_activeCollections = function () {
    var hoy = new Date(); hoy.setHours(0, 0, 0, 0);
    return (window.INNOV_CONTENT.colecciones || [])
      .filter(function (c) {
        if (c.estado === 'archivada' || c.estado === 'borrador') return false;
        if (c.inicio && new Date(c.inicio) > hoy) return false;   // aún no empieza
        if (c.fin && new Date(c.fin) < hoy) return false;         // ya terminó
        return true;
      })
      .sort(function (a, b) { return (a.orden || 0) - (b.orden || 0); });
  };
})();
