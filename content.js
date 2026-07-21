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
        poster: U + 'WhatsApp Image 2026-07-20 at 13.32.08.jpeg',
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
    },

    /* ---------------------------------------------------------------------
       5) TEXTOS DEL SITIO
       Se editan desde el panel (admin.html > Textos e Historia).
       'es' es lo que se ve por defecto; 'en' son las traducciones al inglés
       (si una clave no está en 'en', se usa el diccionario de i18n.js).
       --------------------------------------------------------------------- */
    textos: {
      es: {
        // Franja superior
        ann: 'Diseño artesanal para tu hogar · Velas · Cerámica · Concreto decorativo · Aromatizadores',
        // Portada
        hero_eye: 'Diseño artesanal para el hogar',
        hero_h1: 'Inspiramos hogares con diseño, aroma y arte.',
        hero_sub: 'En Innovarte convertimos materiales nobles en piezas que cuentan historias. Creamos velas artesanales de cera de soja, aromatizadores para el hogar, difusores de varillas y piezas decorativas de cerámica y concreto, elaboradas una a una con pasión y dedicación.',
        cta_shop: 'Explorar la colección',
        cta_story: 'Nuestra historia',
        // Nuestra Colección
        ncol_eye: 'Nuestra colección',
        ncol_h: 'Piezas que transforman tu hogar',
        ncol_sub: 'Velas, aromatizadores, cerámica y concreto decorativo — creados a mano, pieza por pieza.',
        // Sobre la marca
        marca_eye: 'Sobre Innovarte',
        marca_h: 'Creamos espacios que inspiran calma, belleza y bienestar.',
        marca_sub: 'Velas artesanales • Home Decor • Aromatizadores • Piezas de cerámica y concreto decorativo',
        marca_p: 'En Innovarte diseñamos y elaboramos a mano cada pieza para transformar tu hogar. Descubre nuestras velas de cera de soja, difusores de varillas, home sprays, aromatizadores textiles y piezas decorativas de cerámica y concreto, además de detalles únicos creados con dedicación para regalar o disfrutar cada día.',
        marca_cta1: 'Explorar la colección',
        marca_cta2: 'Conoce nuestra historia',
        // Insumos
        insumos_pagetitle: 'Insumos para crear',
        insumos_p: 'Próximamente: insumos seleccionados para tus propias creaciones.',
        insumos_note: 'Estamos preparando una línea de insumos para que crees tus propias piezas. Dejanos un mensaje y te avisamos cuando esté disponible.',
        insumos_cta: 'Quiero que me avisen',
        // Pie de página
        foot_desc: 'Velas artesanales de cera de soja, aromatizadores, difusores y piezas decorativas de cerámica y concreto para transformar tu hogar. Hechas a mano entre Paraguay y Estados Unidos.',
        foot_ship: 'Envíos a todo EE. UU.',
        // Página "Nuestra historia"
        marcapg_eye: 'Sobre la marca',
        marcapg_h: 'Creamos espacios que inspiran',
        marcapg_sub: 'Velas artesanales • Home Decor • Aromatizadores • Piezas de cerámica y concreto decorativo',
        founder_eye: 'Nuestra historia',
        founder_h: 'La historia detrás de Innovarte',
        founder_p1: 'Soy Adriana Saieg, fundadora de Innovarte. Nací en Paraguay y actualmente vivo en Estados Unidos. Innovarte nació del deseo de crear objetos que transformen los espacios y despierten emociones.',
        founder_p2: 'Lo que comenzó con velas artesanales fue creciendo con el tiempo. Hoy Innovarte reúne una colección de velas aromáticas, difusores de varillas, home sprays, aromatizadores textiles y piezas decorativas de cerámica, todos elaborados cuidadosamente a mano.',
        founder_p3: 'Cada producto está diseñado para aportar armonía, belleza y personalidad a tu hogar. Creemos que los pequeños detalles tienen el poder de hacer que un espacio se sienta más cálido, acogedor y especial.',
        founder_p4: 'Más que vender productos, en Innovarte buscamos crear experiencias, acompañar momentos importantes y ofrecer piezas que combinen diseño, calidad y artesanía.',
        founder_quote: 'En Innovarte creemos que un hogar no solo se decora… se siente. Cada aroma, cada textura y cada pieza están creados para convertir los momentos cotidianos en recuerdos inolvidables.'
      },
      en: {}
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
