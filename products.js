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
      img: M + 'c78faf_dcc35e71fbf04865868d42a6da27e4bc~mv2.jpg' }
  ];

  window.INNOV_PRODUCTS = [
    // ---- Fotos propias (nombres y subtítulos editables) ----
    // Velas
    L('iv-vela-piedra',      'Vela Piedra Natural',      'velas', 'Colección Artesanal', 'WhatsApp Image 2026-07-20 at 13.32.01.jpeg'),
    L('iv-pilares',          'Set Pilares Texturados',   'velas', 'Colección Artesanal', 'WhatsApp Image 2026-07-20 at 13.32.05.jpeg'),
    L('iv-flores-bandeja',   'Flores en Bandeja',        'velas', 'Colección Floral',    'WhatsApp Image 2026-07-20 at 13.32.07.jpeg'),
    L('iv-travertino',       'Vela Travertino',          'velas', 'Línea Premium',       'WhatsApp Image 2026-07-20 at 13.33.26.jpeg'),
    L('iv-noir',             'Vela Noir',                'velas', 'Línea Premium',       'WhatsApp Image 2026-07-20 at 13.33.27.jpeg'),
    L('iv-perla',            'Vela Perla',               'velas', 'Línea Premium',       'WhatsApp Image 2026-07-20 at 13.33.29.jpeg'),
    L('iv-velas-flor',       'Velas Flor',               'velas', 'Colección Floral',    'WhatsApp Image 2026-07-20 at 13.33.29 (1).jpeg'),
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
    P('roses', 'Roses', 'signature', 'Flower Collection', 'c78faf_4e5180be2d5a4310bdff00342c134eae~mv2.jpg'),
    P('carnation', 'Carnation', 'signature', 'Flower Collection', 'c78faf_f288184b5a8c4fee90e948fc6d2f87dd~mv2.jpg'),
    // Signature — Bouquet Collection
    P('rosecascade', 'Rose Cascade', 'signature', 'Bouquet Collection', 'c78faf_1d1585f6443548209782d1603a66652c~mv2.jpg'),
    P('pinkrosesphere', 'Pink Rose Sphere', 'signature', 'Bouquet Collection', 'c78faf_eb6c540246c3478b891d3b8d76724065~mv2.jpg'),
    P('floralsphere', 'Floral Sphere', 'signature', 'Bouquet Collection', 'c78faf_345da3bb2fc541789859077808654a76~mv2.jpg'),
    P('rosegiftboxset', 'Rose Gift Box Set', 'signature', 'Bouquet Collection', 'c78faf_3b86c2a9982e4691bfdb796f16906774~mv2.jpg'),
    P('tulipbouquet', 'Tulip Bouquet', 'signature', 'Bouquet Collection', 'c78faf_a9465894389047dfb0ddf453276c0d9e~mv2.jpg'),
    P('pearlrose', 'Pearl Rose', 'signature', 'Bouquet Collection', 'c78faf_90f99b4512ba4a218f6845b79cb555a2~mv2.jpg'),
    // Signature — Figures
    P('hearts', 'Hearts', 'signature', 'Figures Collection', 'c78faf_2b9a7710b6754ae0aecd346c3845e84a~mv2.jpg'),
    P('bears', 'Bears', 'signature', 'Figures Collection', 'c78faf_135a9dc00924467fba7c64f3dcfe718e~mv2.jpg'),
    P('ladyblindfold', 'Lady with Blindfold', 'signature', 'Figures Collection', 'c78faf_6357d05b27c543ce913c97df1203f602~mv2.jpg'),
    // Signature — Classic
    P('wavesphere', 'Wave Sphere', 'signature', 'Classic Collection', 'c78faf_def70f9361164c7e8c6eddd8d94e49b3~mv2.jpg'),
    P('tallwave', 'Tall Wave', 'signature', 'Classic Collection', 'c78faf_6fe7286cf8c8407987a8a2422d4a0c56~mv2.jpg'),
    P('tallripple', 'Tall Ripple', 'signature', 'Classic Collection', 'c78faf_7ae475a6edac4e96b791259fafe9a3f1~mv2.jpg'),
    P('bubblecube', 'Bubble Cube', 'signature', 'Classic Collection', 'c78faf_753cc176c10e4a05ad1929afe6387b7e~mv2.jpg'),
    P('hextower', 'Hex Tower', 'signature', 'Classic Collection', 'c78faf_7d60223e9e354f06a9c7bc82bbc22683~mv2.jpg'),
    P('bubbledome', 'Bubble Dome', 'signature', 'Classic Collection', 'c78faf_a0bb096ce4c244cd9b90c0775c371f2f~mv2.jpg'),
    // Signature — Pearls
    P('pearlshell', 'Pearl Shell', 'signature', 'Pearls Collection', 'c78faf_903cb88bacf84c388c64468dc10633b4~mv2.jpg'),
    P('goldenpearlbowl', 'Golden Pearl Bowl', 'signature', 'Pearls Collection', 'c78faf_dbbe8b6198624ffab14dd268621313c3~mv2.jpg'),
    P('pearltower', 'Pearl Tower', 'signature', 'Pearls Collection', 'c78faf_fc21ecf1b8d14ccdaca318a1e7b7f7d9~mv2.jpg'),
    P('pearlmartini', 'Pearl Martini', 'signature', 'Pearls Collection', 'c78faf_7e46a3bf11f5437fb356094d00f6e70c~mv2.jpg'),
    // Signature — Tin Candles
    P('goldenblossom', 'Golden Blossom', 'signature', 'Tin Candles', 'c78faf_6fc3232e3e0f43bfbd666ef5e89e37a4~mv2.jpg'),
    P('coffeecoconut', 'Coffee & Coconut', 'signature', 'Tin Candles', 'c78faf_d45ba56cea45491795413e1fd0ff8ea6~mv2.jpg'),
    P('cinnamonwood', 'Cinnamon Wood', 'signature', 'Tin Candles', 'c78faf_5c3cc096bd3b46c98c8287246f890fbd~mv2.jpg'),

    // Souvenirs — Flowers
    P('minibloom', 'Mini Bloom', 'souvenirs', 'Flowers', 'c78faf_c700164e25a14ed482ddc3ddcf21c9ac~mv2.jpg'),
    P('daisygift', 'Daisy Gift', 'souvenirs', 'Flowers', 'c78faf_df4c0bccf70949e880086f04fccf9eb4~mv2.jpg'),
    P('glassbloom', 'Glass Bloom', 'souvenirs', 'Flowers', 'c78faf_a11505c147764cc29119b1c8635be6c1~mv2.jpg'),
    // Souvenirs — Animals
    P('lion', 'Lion', 'souvenirs', 'Animals', 'c78faf_8c8558cca7d54564bf07de78779bde81~mv2.jpg'),
    P('teddybear', 'Teddy Bear', 'souvenirs', 'Animals', 'c78faf_eb01eb031f7e41ababf562f368836c4a~mv2.jpg'),
    P('giraffe', 'Giraffe', 'souvenirs', 'Animals', 'c78faf_c622679d0cfe4322ad0d553c0d88be51~mv2.jpg'),
    P('minimalistbear', 'Minimalist Bear', 'souvenirs', 'Animals', 'c78faf_34ea9798506d426a8ce725bd33f6c5eb~mv2.jpg'),
    P('angel', 'Angel', 'souvenirs', 'Animals', 'c78faf_ecd16610f1264b8caee8d45e490a7929~mv2.jpg'),

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
