/* Catálogo real recuperado de innovartehandmadec.wixsite.com — imágenes desde el CDN de Wix */
(function () {
  // Si los datos ya llegaron desde Supabase, no los sobrescribimos.
  if (window.INNOV_REMOTO) return;

  var M = 'https://static.wixstatic.com/media/';

  // Mapa de categorías antiguas -> nueva taxonomía de marca (home decor).
  // Los insumos se separan en su propia "línea" para no mezclarlos con la decoración.
  var CATMAP = { signature: 'velas', souvenirs: 'velas', fragrance: 'aromatizadores', supplies: 'insumos' };
  function P(id, name, cat, sub, media) {
    var c = CATMAP[cat] || cat;
    return { id: id, name: name, cat: c, linea: (c === 'insumos' ? 'insumos' : 'decor'), sub: sub, img: M + media };
  }

  // Igual que P(), pero para fotos propias guardadas en /uploads.
  var U = 'uploads/';
  function L(id, name, cat, sub, file) {
    var c = CATMAP[cat] || cat;
    return { id: id, name: name, cat: c, linea: (c === 'insumos' ? 'insumos' : 'decor'), sub: sub, img: U + file };
  }

  // Categorías del catálogo decorativo. Editables: nombre, slug, orden, activa,
  // destacada y descripción. (Cerámica, Concreto y Resina aún sin productos.)
  window.INNOV_CATS = [
    { id: 'velas', slug: 'velas', name: 'Velas', es: 'Velas', en: 'Candles',
      order: 1, active: true, featured: true,
      descEs: 'Velas artesanales de cera de soja, esculpidas a mano.',
      descEn: 'Handcrafted soy wax candles, sculpted by hand.',
      img: M + 'c78faf_32737f49c38a4b958effb92e55b9e90c~mv2.jpg' },
    { id: 'aromatizadores', slug: 'aromatizadores', name: 'Aromatizadores', es: 'Aromatizadores', en: 'Home Fragrance',
      order: 2, active: true, featured: true,
      descEs: 'Difusores de varillas, home sprays y aromatizadores textiles.',
      descEn: 'Reed diffusers, home sprays and textile fresheners.',
      img: M + 'c78faf_c4a6f74e11c74863ba3ce68d723a09a6~mv2.jpg' },
    // Cerámica: desactivada hasta tener piezas cargadas (poner active:true para mostrarla).
    { id: 'ceramica', slug: 'ceramica', name: 'Cerámica', es: 'Cerámica', en: 'Ceramics',
      order: 3, active: false, featured: false,
      descEs: 'Piezas decorativas de cerámica, hechas a mano.',
      descEn: 'Handmade decorative ceramic pieces.',
      img: M + 'c78faf_be7271a11aaa4d7d9c777aecb122788f~mv2.jpg' },
    // Concreto: desactivada hasta tener piezas cargadas (poner active:true para mostrarla).
    { id: 'concreto', slug: 'concreto', name: 'Concreto', es: 'Concreto', en: 'Concrete',
      order: 4, active: false, featured: false,
      descEs: 'Piezas decorativas de concreto, de diseño sobrio.',
      descEn: 'Decorative concrete pieces with a sober design.',
      img: M + 'c78faf_345da3bb2fc541789859077808654a76~mv2.jpg' },
    // Resina: desactivada hasta tener piezas cargadas (poner active:true para mostrarla).
    { id: 'resina', slug: 'resina', name: 'Resina', es: 'Resina', en: 'Resin',
      order: 5, active: false, featured: false,
      descEs: 'Piezas artesanales en resina.',
      descEn: 'Handcrafted resin pieces.',
      img: M + 'c78faf_dcc35e71fbf04865868d42a6da27e4bc~mv2.jpg' },
    // Piezas decorativas y Bouquet: sus productos pasaron a sub-secciones dentro
    // de Velas (ver subcatDe() en catalogo.dc.html); las categorías quedan
    // desactivadas para no duplicar la navegación.
    { id: 'piezas-decorativas', slug: 'piezas-decorativas', name: 'Piezas Decorativas', es: 'Piezas Decorativas', en: 'Decorative Pieces',
      order: 6, active: false, featured: false,
      descEs: 'Velas escultoricas y piezas decorativas para regalar y ambientar.',
      descEn: 'Sculptural candles and decorative pieces to gift and adorn.',
      img: U + 'deco-osito-rosas.jpg' },
    { id: 'bouquet', slug: 'bouquet', name: 'Bouquet', es: 'Bouquet', en: 'Bouquet',
      order: 7, active: false, featured: false,
      descEs: 'Arreglos de velas con forma de flores, en caja y canasta, listos para regalar.',
      descEn: 'Flower-shaped candle arrangements in boxes and baskets, ready to gift.',
      img: U + 'bouquet-crema-corazon.jpg' },
    // Difusores para autos: frascos de aroma para el coche.
    { id: 'difusores-auto', slug: 'difusores-auto', name: 'Difusores para Autos', es: 'Difusores para Autos', en: 'Car Diffusers',
      order: 8, active: true, featured: false,
      descEs: 'Difusores de aroma para el auto, en frasco con tapa de madera.',
      descEn: 'Car air diffusers in a glass bottle with wooden cap.',
      img: U + 'difusor-auto.jpg' }
  ];

  window.INNOV_PRODUCTS = [
    // ---- Piezas decorativas (velas escultóricas y souvenirs de eventos) ----
    L('deco-osito-rosas',       'Vela Osito de Rosas',            'velas', 'Colección Floral',        'deco-osito-rosas.jpg'),
    L('deco-ramo-rosas',        'Vela Ramo de Rosas',             'velas', 'Colección Floral',        'deco-ramo-rosas.jpg'),
    L('deco-margarita-rosada',  'Vela Margarita Rosada',          'velas', 'Colección Floral',        'deco-margarita-rosada.jpg'),
    L('deco-jirafa',            'Velas Jirafa',                   'velas', 'Colección Baby',          'deco-jirafa.jpg'),
    L('deco-elefante',          'Vela Elefante',                  'velas', 'Colección Baby',          'deco-elefante.jpg'),
    L('deco-leoncito',          'Figura Leoncito',                'velas', 'Colección Baby',          'deco-leoncito.jpg'),
    L('deco-mariposa',          'Vela Mariposa',                  'velas', 'Colección Naturaleza',    'deco-mariposa.jpg'),
    L('deco-angel',             'Yeso Aromático Ángel',           'velas', 'Aromatizante decorativo', 'deco-angel.jpg'),
    L('deco-bautismo-cruz',     'Vela Bautismo Cruz',             'velas', 'Souvenir personalizable', 'deco-bautismo-cruz.jpg'),
    L('deco-bautismo-flores',   'Vela Bautismo Flores Secas',     'velas', 'Souvenir personalizable', 'deco-bautismo-flores.jpg'),
    L('deco-bautismo-rosario',  'Vela Bautismo con Rosario',      'velas', 'Souvenir personalizable', 'deco-bautismo-rosario.jpg'),
    L('deco-cruz-comunion',     'Vela Cruz Comunión',             'velas', 'Souvenir personalizable', 'deco-cruz-comunion.jpg'),
    L('deco-comunion-person',   'Vela Comunión Personalizada',    'velas', 'Souvenir personalizable', 'deco-comunion-personalizada.jpg'),
    L('deco-corazon-manos',     'Vela Corazón Manos en Oración',  'velas', 'Souvenir personalizable', 'deco-corazon-manos.jpg'),
    L('deco-marg-confesion',    'Vela Margarita Confesión',       'velas', 'Souvenir personalizable', 'deco-margarita-confesion.jpg'),
    L('deco-confirmacion',      'Vela Confirmación',              'velas', 'Souvenir personalizable', 'deco-confirmacion.jpg'),
    L('deco-marg-babyshower',   'Vela Margarita Baby Shower',     'velas', 'Souvenir personalizable', 'deco-margarita-babyshower.jpg'),
    L('deco-marg-aniversario',  'Vela Margarita Aniversario',     'velas', 'Souvenir personalizable', 'deco-margarita-aniversario.jpg'),
    L('deco-marg-caja',         'Vela Margarita en Caja',         'velas', 'Souvenir personalizable', 'deco-margarita-caja.jpg'),

    // ---- Fotos propias (nombres y subtítulos editables) ----
    // Velas decorativas (escultóricas)
    L('velas-pilares-acanalados', 'Set Pilares Acanalados',   'velas', 'Vela decorativa',        'velas-pilares-acanalados.jpg'),
    L('velas-esferas-espiral',    'Set Esferas Espiral',      'velas', 'Vela decorativa',        'velas-esferas-espiral.jpg'),
    L('velas-esfera-burbujas',    'Vela Esfera de Burbujas',  'velas', 'Vela decorativa',        'velas-esfera-burbujas.jpg'),
    L('velas-cubo-burbujas',      'Vela Cubo de Burbujas',    'velas', 'Vela decorativa',        'velas-cubo-burbujas.jpg'),
    L('velas-candelabro',         'Velas Candelabro',         'velas', 'Vela decorativa',        'velas-candelabro.jpg'),
    L('velas-espiral-oval',       'Vela Espiral Oval',        'velas', 'Vela decorativa',        'velas-espiral-oval.jpg'),
    L('velas-peonia',             'Vela Peonía',              'velas', 'Vela decorativa',        'velas-peonia.jpg'),
    L('velas-capullo-rosa',       'Vela Capullo de Rosa',     'velas', 'Vela decorativa',        'velas-capullo-rosa.jpg'),
    L('velas-loto',               'Vela Loto',                'velas', 'Vela decorativa',        'velas-loto.jpg'),
    L('velas-rosa-grande',        'Vela Rosa Grande',         'velas', 'Vela decorativa',        'velas-rosa-grande.jpg'),
    L('velas-busto',              'Vela Busto Dama',          'velas', 'Vela decorativa',        'velas-busto.jpg'),
    L('velas-espiral',            'Vela Espiral',             'velas', 'Vela decorativa',        'velas-espiral.jpg'),
    L('velas-burbuja',            'Vela Burbuja',             'velas', 'Vela decorativa',        'velas-burbuja.jpg'),
    L('velas-concha',             'Vela Concha de Mar',       'velas', 'Vela decorativa',        'velas-concha.jpg'),
    L('velas-rosa-vidrio',        'Vela Rosa en Vidrio',      'velas', 'Vela decorativa',        'velas-rosa-vidrio.jpg'),
    L('velas-pilar-acanalado',    'Vela Pilar Acanalado',     'velas', 'Vela decorativa',        'velas-pilar-acanalado.jpg'),
    L('velas-arco',               'Vela Arco',                'velas', 'Vela decorativa',        'velas-arco.jpg'),
    L('velas-peonia-caja',        'Velas Peonía en Caja',     'velas', 'Vela decorativa',        'velas-peonia-caja.jpg'),
    L('velas-rosa-corazon',       'Velas Rosa y Corazón',     'velas', 'Vela decorativa',        'velas-rosa-corazon.jpg'),
    L('velas-coleccion-flores',   'Colección Flores',         'velas', 'Surtido decorativo',     'velas-coleccion-flores.jpg'),
    L('velas-coleccion-formas',   'Colección de Formas',      'velas', 'Surtido decorativo',     'velas-coleccion-formas.jpg'),
    L('velas-coleccion-surtido',  'Colección Surtido',        'velas', 'Surtido decorativo',     'velas-coleccion-surtido.jpg'),

    // Velas en recipiente (primero vidrio, luego cerámica, luego lata)
    L('velas-vidrio-clasica',     'Vela Vidrio Clásica',      'velas', 'Recipiente de vidrio',   'velas-vidrio-clasica.jpg'),
    L('velas-vidrio-flor',        'Vela Vidrio con Flor',     'velas', 'Recipiente de vidrio',   'velas-vidrio-flor.jpg'),
    L('velas-vidrio-girasol',     'Vela Vidrio Girasol',      'velas', 'Recipiente de vidrio',   'velas-vidrio-girasol.jpg'),
    L('velas-vidrio-rosa',        'Vela Vidrio Rosa',         'velas', 'Recipiente de vidrio',   'velas-vidrio-rosa.jpg'),
    L('velas-vidrio-tallado',     'Vela Vidrio Tallado',      'velas', 'Recipiente de vidrio',   'velas-vidrio-tallado.jpg'),
    L('velas-vidrio-acanalado',   'Vela Vidrio Acanalado',    'velas', 'Recipiente de vidrio',   'velas-vidrio-acanalado.jpg'),
    L('velas-vidrio-corcho',      'Vela Vidrio Tapa Corcho',  'velas', 'Recipiente de vidrio',   'velas-vidrio-corcho.jpg'),
    L('velas-ceramica-travertino','Vela Concreto Travertino', 'velas', 'Recipiente de concreto', 'velas-ceramica-travertino.jpg'),
    L('velas-ceramica-tapa',      'Vela Concreto con Tapa',   'velas', 'Recipiente de concreto', 'velas-ceramica-tapa.jpg'),
    L('velas-ceramica-arena',     'Vela Concreto Arena',      'velas', 'Recipiente de concreto', 'velas-ceramica-arena.jpg'),
    L('velas-ceramica-texturada', 'Vela Concreto Texturada',  'velas', 'Recipiente de concreto', 'velas-ceramica-texturada.jpg'),
    L('velas-ceramica-blanca',    'Vela Concreto Blanca',     'velas', 'Recipiente de concreto', 'velas-ceramica-blanca.jpg'),
    L('velas-ceramica-perlas',    'Vela Concreto con Perlas', 'velas', 'Recipiente de concreto', 'velas-ceramica-perlas.jpg'),
    L('velas-ceramica-duo',       'Vela Concreto Dúo',        'velas', 'Recipiente de concreto', 'velas-ceramica-duo.jpg'),
    L('velas-lata-dorada',        'Vela Lata Dorada',         'velas', 'Recipiente de metal',    'velas-lata-dorada.jpg'),

    // Bouquet (arreglos de velas flor)
    L('bouquet-crema-corazon', 'Bouquet Crema con Corazón',  'velas', 'Arreglo en caja',     'bouquet-crema-corazon.jpg'),
    L('bouquet-marfil',        'Bouquet Marfil',             'velas', 'Arreglo en caja',     'bouquet-marfil.jpg'),
    L('bouquet-dorado',        'Bouquet Dorado',             'velas', 'Arreglo en caja',     'bouquet-dorado.jpg'),
    L('bouquet-flores',        'Bouquet Flores',             'velas', 'Velas con flores',    'bouquet-flores.jpg'),
    L('bouquet-verde-canasta', 'Bouquet Verde en Canasta',   'velas', 'Arreglo en canasta',  'bouquet-verde-canasta.jpg'),
    L('bouquet-tulipanes-caja','Bouquet Tulipanes en Caja',  'velas', 'Arreglo en caja',     'bouquet-tulipanes-caja.jpg'),
    L('bouquet-duo',           'Bouquet Dúo',                'velas', 'Set de regalo',       'bouquet-duo.jpg'),
    L('bouquet-dia-madre',     'Bouquet Día de la Madre',    'velas', 'Bolsa de regalo',     'bouquet-dia-madre.jpg'),
    L('bouquet-rosa',          'Bouquet Rosa',               'velas', 'Arreglo en caja',     'bouquet-rosa.jpg'),

    // Difusores para autos
    L('difusor-auto',          'Difusor para Auto',          'difusores-auto', 'Frasco 9 ml con varillas', 'difusor-auto.jpg'),
    L('difusor-auto-colgante', 'Difusor Colgante para Auto', 'difusores-auto', 'Para colgar · 9 ml',       'difusor-auto-colgante.jpg'),

    // Velas (colección artesanal previa)
    L('iv-flores-bandeja',   'Flores en Bandeja',        'velas', 'Colección Floral',    'WhatsApp Image 2026-07-20 at 13.32.07.jpeg'),
    // Aromatizadores
    L('iv-set-noir',         'Set Baño Noir',            'aromatizadores', 'Difusor y dispensador', 'WhatsApp Image 2026-07-20 at 13.32.02.jpeg'),
    L('iv-set-arena',        'Set Baño Arena',           'aromatizadores', 'Difusor y dispensador', 'WhatsApp Image 2026-07-20 at 13.32.02 (1).jpeg'),
    L('iv-difusor-flor',     'Difusor Flor',             'aromatizadores', 'Difusor de aromas',     'WhatsApp Image 2026-07-20 at 13.32.04.jpeg'),
    L('iv-duo-cristal',      'Dúo Cristal',              'aromatizadores', 'Difusor y dispensador', 'WhatsApp Image 2026-07-20 at 13.32.08.jpeg'),

    // Signature — Flower Collection
    P('peonies', 'Peonies', 'signature', 'Flower Collection', 'c78faf_32737f49c38a4b958effb92e55b9e90c~mv2.jpg'),
    P('tulip', 'Tulip', 'signature', 'Flower Collection', 'c78faf_7f0a0696d27c4b389ee08f9feaf168b2~mv2.jpg'),
    P('daisies', 'Daisies', 'signature', 'Flower Collection', 'c78faf_3d45f6132195430a8d7cbfaa1b3d9344~mv2.jpg'),
    P('sunflowers', 'Sunflowers', 'signature', 'Flower Collection', 'c78faf_be7271a11aaa4d7d9c777aecb122788f~mv2.jpg'),
    P('carnation', 'Carnation', 'signature', 'Flower Collection', 'c78faf_f288184b5a8c4fee90e948fc6d2f87dd~mv2.jpg'),
    // Signature — Bouquet Collection
    P('rosecascade', 'Rose Cascade', 'signature', 'Bouquet Collection', 'c78faf_1d1585f6443548209782d1603a66652c~mv2.jpg'),
    P('pinkrosesphere', 'Pink Rose Sphere', 'signature', 'Bouquet Collection', 'c78faf_eb6c540246c3478b891d3b8d76724065~mv2.jpg'),
    P('floralsphere', 'Floral Sphere', 'signature', 'Bouquet Collection', 'c78faf_345da3bb2fc541789859077808654a76~mv2.jpg'),
    P('rosegiftboxset', 'Rose Gift Box Set', 'signature', 'Bouquet Collection', 'c78faf_3b86c2a9982e4691bfdb796f16906774~mv2.jpg'),
    P('tulipbouquet', 'Tulip Bouquet', 'signature', 'Bouquet Collection', 'c78faf_a9465894389047dfb0ddf453276c0d9e~mv2.jpg'),
    // Signature — Figures
    P('hearts', 'Hearts', 'signature', 'Figures Collection', 'c78faf_2b9a7710b6754ae0aecd346c3845e84a~mv2.jpg'),
    P('ladyblindfold', 'Lady with Blindfold', 'signature', 'Figures Collection', 'c78faf_6357d05b27c543ce913c97df1203f602~mv2.jpg'),
    // Signature — Classic
    // Signature — Pearls
    P('pearltower', 'Pearl Tower', 'signature', 'Pearls Collection', 'c78faf_fc21ecf1b8d14ccdaca318a1e7b7f7d9~mv2.jpg'),
    P('pearlmartini', 'Pearl Martini', 'signature', 'Pearls Collection', 'c78faf_7e46a3bf11f5437fb356094d00f6e70c~mv2.jpg'),
    // Signature — Tin Candles
    P('cinnamonwood', 'Cinnamon Wood', 'signature', 'Tin Candles', 'c78faf_5c3cc096bd3b46c98c8287246f890fbd~mv2.jpg'),

    // Souvenirs — Flowers
    P('minibloom', 'Mini Bloom', 'souvenirs', 'Flowers', 'c78faf_c700164e25a14ed482ddc3ddcf21c9ac~mv2.jpg'),
    P('daisygift', 'Daisy Gift', 'souvenirs', 'Flowers', 'c78faf_df4c0bccf70949e880086f04fccf9eb4~mv2.jpg'),
    P('glassbloom', 'Glass Bloom', 'souvenirs', 'Flowers', 'c78faf_a11505c147764cc29119b1c8635be6c1~mv2.jpg'),
    // Souvenirs — Animals
    P('lion', 'Lion', 'souvenirs', 'Animals', 'c78faf_8c8558cca7d54564bf07de78779bde81~mv2.jpg'),

    // Home Fragrance — Closet Fresheners
    P('cinnamonstar', 'Cinnamon Star', 'fragrance', 'Closet Fresheners', 'c78faf_a4d5828cceca4b978d5bae940f5a30fc~mv2.jpg'),
    P('springdaisy', 'Spring Daisy', 'fragrance', 'Closet Fresheners', 'c78faf_886c07977e8a466f8a12933b46bcd865~mv2.jpg'),
    P('wildflowerglass', 'Wildflower Glass', 'fragrance', 'Closet Fresheners', 'c78faf_39a021c14f60490391186a999315c7a8~mv2.jpg'),
    P('leafbloom', 'Leaf Bloom', 'fragrance', 'Closet Fresheners', 'c78faf_d2786a7bf83b418a8cd2e62ffb51d8e4~mv2.jpg'),
    P('rosecircle', 'Rose Circle', 'fragrance', 'Closet Fresheners', 'c78faf_36cddaa101f64dae8ba1acc31a0c9229~mv2.jpg'),
    // Home Fragrance — Wax Melts
    P('chocomini', 'Choco Mini', 'fragrance', 'Wax Melts', 'c78faf_719c9e07e6ce4cd49fc1192d2d1c4dc7~mv2.jpg'),
    P('bloomysquares', 'Bloomy Squares', 'fragrance', 'Wax Melts', 'c78faf_e427c09250b54326a6ea447f12f493c6~mv2.jpg'),
    P('joyfuljar', 'Joyful Jar', 'fragrance', 'Wax Melts', 'c78faf_7ae1f3e94bc74b3a8b02876b2cbf27d8~mv2.jpg'),
    // Home Fragrance — Sprays
    P('freshmist', 'Fresh Mist', 'fragrance', 'Home Sprays', 'c78faf_1f21a9102d8e4e61a244da9b661754d7~mv2.jpg'),
    P('eleganttouch', 'Elegant Touch', 'fragrance', 'Home Sprays', 'c78faf_88d1a5fdcb5c4427a7fe32cb0bd2b3c5~mv2.jpg'),
    P('crystalessence', 'Crystal Essence', 'fragrance', 'Home Sprays', 'c78faf_0e77a635315244d79783549d7ad32824~mv2.jpg'),
    P('signaturemist', 'Signature Mist', 'fragrance', 'Home Sprays', 'c78faf_10ce3f8e1a9d472c9291725b86bc10ea~mv2.jpg'),
    // Home Fragrance — Reed Diffusers
    P('elegantnoir', 'Elegant Noir', 'fragrance', 'Reed Diffusers', 'c78faf_c4a6f74e11c74863ba3ce68d723a09a6~mv2.jpg'),
    P('pasteldaisy', 'Pastel Daisy', 'fragrance', 'Reed Diffusers', 'c78faf_005c6cb762774100bc755c18a8e4e33b~mv2.jpg'),
    P('bloomjar', 'Bloom Jar', 'fragrance', 'Reed Diffusers', 'c78faf_46f6f551baf447cc983f6ba2aae318d6~mv2.jpg'),
    P('floralglass', 'Floral Glass', 'fragrance', 'Reed Diffusers', 'c78faf_2f22f61ab5884e9dbc3ce31a60c0c352~mv2.jpg'),
    // Home Fragrance — Diffusers with candles
    P('harmonyglowset', 'Harmony Glow Set', 'fragrance', 'Diffuser Sets', 'c78faf_7ff5b1cdcec2408b84ef4d5e01a57708~mv2.jpg'),
    P('goldenauraset', 'Golden Aura Set', 'fragrance', 'Diffuser Sets', 'c78faf_0049e02e2fd3478e9991c3a00e77c52f~mv2.jpg'),
    // Home Fragrance — Vessels
    P('mysticjar', 'Mystic Jar', 'fragrance', 'Vessels', 'c78faf_033d3bfbd7404eef841baa444bed3f51~mv2.jpg'),
    P('classicglow', 'Classic Glow', 'fragrance', 'Vessels', 'c78faf_1626b2e30e604ecfba5718bdd9a9f3aa~mv2.jpg'),
    P('luxeflame', 'Luxe Flame', 'fragrance', 'Vessels', 'c78faf_dcc35e71fbf04865868d42a6da27e4bc~mv2.jpg'),
    P('gardenglow', 'Garden Glow', 'fragrance', 'Vessels', 'c78faf_a6d79fd5e5484f33a888306fb8f4bc15~mv2.jpg'),

    // Candle Making Supplies
    P('thermometer', 'Digital Wax Thermometer', 'supplies', 'Tools', 'c78faf_7407f8aca32d4325a02f5ba024351396~mv2.jpg'),
    P('cottonwick', 'Cotton Wick Set', 'supplies', 'Wicks', 'c78faf_04165430f05b4977b30f15daa43dba99~mv2.jpg'),
    P('woodenwickkit', 'Wooden Wick Kit', 'supplies', 'Wicks', 'c78faf_da81c9e6e0c44cabb468fbbcf650d6c0~mv2.jpg'),
    P('heatgun', 'Heat Gun', 'supplies', 'Tools', 'c78faf_775cf7a5936243af8937f97212cd62d3~mv2.jpg'),
    P('droppers', 'Droppers', 'supplies', 'Tools', 'c78faf_c0b621d7e9fa43d0931997d1ce95786d~mv2.jpg'),
    P('wickstickers', 'Wick Stickers Pack', 'supplies', 'Wicks', 'c78faf_ab15c62ddf704ecfa1405434d8c3aeae~mv2.jpg'),
    P('essentialoils', 'Essential Oils', 'supplies', 'Fragrance', 'c78faf_eebbd59fc4274237b44b7c2bb556f01f~mv2.jpg'),
    P('candlesand', 'Candle Sand', 'supplies', 'Wax', 'c78faf_4ff3059166ca4ca1b32f89da2d49e197~mv2.jpg'),
    P('micapowder', 'Mica Powder', 'supplies', 'Color', 'c78faf_f75f6e54ae874460a828e12448c91681~mv2.jpg'),
    P('wickholders', 'Wooden Wick Holders', 'supplies', 'Wicks', 'c78faf_c93dfb51267f423480b2aeb5e6a67c2c~mv2.jpg'),
    P('stearic', 'Stearic Acid Hardener', 'supplies', 'Wax', 'c78faf_30a3a5f729e3402aa0922df3eba0f4c0~mv2.jpg'),
    P('paraffin', 'Paraffin Wax Granules', 'supplies', 'Wax', 'c78faf_8e1a318629414abea720ee54081c4cc0~mv2.jpg'),
    P('soywax', 'Soy Wax', 'supplies', 'Wax', 'c78faf_655300d79ced4f9dad2d7d316f86b4e4~mv2.jpg')
  ];

  window.INNOV_LOGO = M + 'c78faf_6406c07728144968971366602127833a~mv2.png/v1/crop/x_61,y_135,w_396,h_208/fill/w_350,h_184,al_c,q_90,enc_auto/logo.png';
  window.INNOV_CONTACT = { email: 'innovartecandles@gmail.com', ig: 'https://www.instagram.com/innovartecandles', igHandle: '@innovartecandles' };
})();
