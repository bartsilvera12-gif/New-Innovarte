-- ============================================================================
-- InnovArte — Datos iniciales (generado desde products.js y content.js)
-- Ejecutar DESPUÉS de 0001_schema_inicial.sql
-- ============================================================================

-- ---------- Categorías ----------
insert into new_innovarte.categorias (slug, nombre, nombre_en, descripcion, descripcion_en, imagen, orden, activa, destacada)
values ('velas', 'Velas', 'Candles', 'Velas artesanales de cera de soja, esculpidas a mano.', 'Handcrafted soy wax candles, sculpted by hand.', 'https://static.wixstatic.com/media/c78faf_32737f49c38a4b958effb92e55b9e90c~mv2.jpg', 1, true, true)
on conflict (slug) do nothing;
insert into new_innovarte.categorias (slug, nombre, nombre_en, descripcion, descripcion_en, imagen, orden, activa, destacada)
values ('aromatizadores', 'Aromatizadores', 'Home Fragrance', 'Difusores de varillas, home sprays y aromatizadores textiles.', 'Reed diffusers, home sprays and textile fresheners.', 'https://static.wixstatic.com/media/c78faf_c4a6f74e11c74863ba3ce68d723a09a6~mv2.jpg', 2, true, true)
on conflict (slug) do nothing;
insert into new_innovarte.categorias (slug, nombre, nombre_en, descripcion, descripcion_en, imagen, orden, activa, destacada)
values ('ceramica', 'Cerámica', 'Ceramics', 'Piezas decorativas de cerámica, hechas a mano.', 'Handmade decorative ceramic pieces.', 'https://static.wixstatic.com/media/c78faf_be7271a11aaa4d7d9c777aecb122788f~mv2.jpg', 3, false, false)
on conflict (slug) do nothing;
insert into new_innovarte.categorias (slug, nombre, nombre_en, descripcion, descripcion_en, imagen, orden, activa, destacada)
values ('concreto', 'Concreto', 'Concrete', 'Piezas decorativas de concreto, de diseño sobrio.', 'Decorative concrete pieces with a sober design.', 'https://static.wixstatic.com/media/c78faf_345da3bb2fc541789859077808654a76~mv2.jpg', 4, false, false)
on conflict (slug) do nothing;
insert into new_innovarte.categorias (slug, nombre, nombre_en, descripcion, descripcion_en, imagen, orden, activa, destacada)
values ('resina', 'Resina', 'Resin', 'Piezas artesanales en resina.', 'Handcrafted resin pieces.', 'https://static.wixstatic.com/media/c78faf_dcc35e71fbf04865868d42a6da27e4bc~mv2.jpg', 5, false, false)
on conflict (slug) do nothing;
insert into new_innovarte.categorias (slug, nombre, nombre_en, descripcion, descripcion_en, imagen, orden, activa, destacada)
values ('piezas-decorativas', 'Piezas Decorativas', 'Decorative Pieces', 'Velas escultóricas y piezas decorativas para regalar y ambientar.', 'Sculptural candles and decorative pieces to gift and adorn.', 'uploads/deco-osito-rosas.jpg', 6, false, false)
on conflict (slug) do nothing;
insert into new_innovarte.categorias (slug, nombre, nombre_en, descripcion, descripcion_en, imagen, orden, activa, destacada)
values ('bouquet', 'Bouquet', 'Bouquet', 'Arreglos de velas con forma de flores, en caja y canasta, listos para regalar.', 'Flower-shaped candle arrangements in boxes and baskets, ready to gift.', 'uploads/bouquet-crema-corazon.jpg', 7, false, false)
on conflict (slug) do nothing;

-- ---------- Productos ----------
insert into new_innovarte.productos (slug, nombre, categoria_id, subtitulo, imagen, linea, orden)
values ('iv-flores-bandeja', 'Flores en Bandeja', (select id from new_innovarte.categorias where slug='velas'), 'Colección Floral', 'uploads/WhatsApp Image 2026-07-20 at 13.32.07.jpeg', 'decor', 2)
on conflict (slug) do nothing;
insert into new_innovarte.productos (slug, nombre, categoria_id, subtitulo, imagen, linea, orden)
values ('iv-set-noir', 'Set Baño Noir', (select id from new_innovarte.categorias where slug='aromatizadores'), 'Difusor y dispensador', 'uploads/WhatsApp Image 2026-07-20 at 13.32.02.jpeg', 'decor', 7)
on conflict (slug) do nothing;
insert into new_innovarte.productos (slug, nombre, categoria_id, subtitulo, imagen, linea, orden)
values ('iv-set-arena', 'Set Baño Arena', (select id from new_innovarte.categorias where slug='aromatizadores'), 'Difusor y dispensador', 'uploads/WhatsApp Image 2026-07-20 at 13.32.02 (1).jpeg', 'decor', 8)
on conflict (slug) do nothing;
insert into new_innovarte.productos (slug, nombre, categoria_id, subtitulo, imagen, linea, orden)
values ('iv-difusor-flor', 'Difusor Flor', (select id from new_innovarte.categorias where slug='aromatizadores'), 'Difusor de aromas', 'uploads/WhatsApp Image 2026-07-20 at 13.32.04.jpeg', 'decor', 9)
on conflict (slug) do nothing;
insert into new_innovarte.productos (slug, nombre, categoria_id, subtitulo, imagen, linea, orden)
values ('iv-duo-cristal', 'Dúo Cristal', (select id from new_innovarte.categorias where slug='aromatizadores'), 'Difusor y dispensador', 'uploads/WhatsApp Image 2026-07-20 at 13.32.08.jpeg', 'decor', 10)
on conflict (slug) do nothing;
insert into new_innovarte.productos (slug, nombre, categoria_id, subtitulo, imagen, linea, orden)
values ('peonies', 'Peonies', (select id from new_innovarte.categorias where slug='velas'), 'Flower Collection', 'https://static.wixstatic.com/media/c78faf_32737f49c38a4b958effb92e55b9e90c~mv2.jpg', 'decor', 11)
on conflict (slug) do nothing;
insert into new_innovarte.productos (slug, nombre, categoria_id, subtitulo, imagen, linea, orden)
values ('tulip', 'Tulip', (select id from new_innovarte.categorias where slug='velas'), 'Flower Collection', 'https://static.wixstatic.com/media/c78faf_7f0a0696d27c4b389ee08f9feaf168b2~mv2.jpg', 'decor', 12)
on conflict (slug) do nothing;
insert into new_innovarte.productos (slug, nombre, categoria_id, subtitulo, imagen, linea, orden)
values ('daisies', 'Daisies', (select id from new_innovarte.categorias where slug='velas'), 'Flower Collection', 'https://static.wixstatic.com/media/c78faf_3d45f6132195430a8d7cbfaa1b3d9344~mv2.jpg', 'decor', 13)
on conflict (slug) do nothing;
insert into new_innovarte.productos (slug, nombre, categoria_id, subtitulo, imagen, linea, orden)
values ('sunflowers', 'Sunflowers', (select id from new_innovarte.categorias where slug='velas'), 'Flower Collection', 'https://static.wixstatic.com/media/c78faf_be7271a11aaa4d7d9c777aecb122788f~mv2.jpg', 'decor', 14)
on conflict (slug) do nothing;
insert into new_innovarte.productos (slug, nombre, categoria_id, subtitulo, imagen, linea, orden)
values ('carnation', 'Carnation', (select id from new_innovarte.categorias where slug='velas'), 'Flower Collection', 'https://static.wixstatic.com/media/c78faf_f288184b5a8c4fee90e948fc6d2f87dd~mv2.jpg', 'decor', 16)
on conflict (slug) do nothing;
insert into new_innovarte.productos (slug, nombre, categoria_id, subtitulo, imagen, linea, orden)
values ('rosecascade', 'Rose Cascade', (select id from new_innovarte.categorias where slug='velas'), 'Bouquet Collection', 'https://static.wixstatic.com/media/c78faf_1d1585f6443548209782d1603a66652c~mv2.jpg', 'decor', 17)
on conflict (slug) do nothing;
insert into new_innovarte.productos (slug, nombre, categoria_id, subtitulo, imagen, linea, orden)
values ('pinkrosesphere', 'Pink Rose Sphere', (select id from new_innovarte.categorias where slug='velas'), 'Bouquet Collection', 'https://static.wixstatic.com/media/c78faf_eb6c540246c3478b891d3b8d76724065~mv2.jpg', 'decor', 18)
on conflict (slug) do nothing;
insert into new_innovarte.productos (slug, nombre, categoria_id, subtitulo, imagen, linea, orden)
values ('floralsphere', 'Floral Sphere', (select id from new_innovarte.categorias where slug='velas'), 'Bouquet Collection', 'https://static.wixstatic.com/media/c78faf_345da3bb2fc541789859077808654a76~mv2.jpg', 'decor', 19)
on conflict (slug) do nothing;
insert into new_innovarte.productos (slug, nombre, categoria_id, subtitulo, imagen, linea, orden)
values ('rosegiftboxset', 'Rose Gift Box Set', (select id from new_innovarte.categorias where slug='velas'), 'Bouquet Collection', 'https://static.wixstatic.com/media/c78faf_3b86c2a9982e4691bfdb796f16906774~mv2.jpg', 'decor', 20)
on conflict (slug) do nothing;
insert into new_innovarte.productos (slug, nombre, categoria_id, subtitulo, imagen, linea, orden)
values ('tulipbouquet', 'Tulip Bouquet', (select id from new_innovarte.categorias where slug='velas'), 'Bouquet Collection', 'https://static.wixstatic.com/media/c78faf_a9465894389047dfb0ddf453276c0d9e~mv2.jpg', 'decor', 21)
on conflict (slug) do nothing;
insert into new_innovarte.productos (slug, nombre, categoria_id, subtitulo, imagen, linea, orden)
values ('hearts', 'Hearts', (select id from new_innovarte.categorias where slug='velas'), 'Figures Collection', 'https://static.wixstatic.com/media/c78faf_2b9a7710b6754ae0aecd346c3845e84a~mv2.jpg', 'decor', 23)
on conflict (slug) do nothing;
insert into new_innovarte.productos (slug, nombre, categoria_id, subtitulo, imagen, linea, orden)
values ('ladyblindfold', 'Lady with Blindfold', (select id from new_innovarte.categorias where slug='velas'), 'Figures Collection', 'https://static.wixstatic.com/media/c78faf_6357d05b27c543ce913c97df1203f602~mv2.jpg', 'decor', 25)
on conflict (slug) do nothing;
insert into new_innovarte.productos (slug, nombre, categoria_id, subtitulo, imagen, linea, orden)
values ('pearltower', 'Pearl Tower', (select id from new_innovarte.categorias where slug='velas'), 'Pearls Collection', 'https://static.wixstatic.com/media/c78faf_fc21ecf1b8d14ccdaca318a1e7b7f7d9~mv2.jpg', 'decor', 34)
on conflict (slug) do nothing;
insert into new_innovarte.productos (slug, nombre, categoria_id, subtitulo, imagen, linea, orden)
values ('pearlmartini', 'Pearl Martini', (select id from new_innovarte.categorias where slug='velas'), 'Pearls Collection', 'https://static.wixstatic.com/media/c78faf_7e46a3bf11f5437fb356094d00f6e70c~mv2.jpg', 'decor', 35)
on conflict (slug) do nothing;
insert into new_innovarte.productos (slug, nombre, categoria_id, subtitulo, imagen, linea, orden)
values ('cinnamonwood', 'Cinnamon Wood', (select id from new_innovarte.categorias where slug='velas'), 'Tin Candles', 'https://static.wixstatic.com/media/c78faf_5c3cc096bd3b46c98c8287246f890fbd~mv2.jpg', 'decor', 38)
on conflict (slug) do nothing;
insert into new_innovarte.productos (slug, nombre, categoria_id, subtitulo, imagen, linea, orden)
values ('minibloom', 'Mini Bloom', (select id from new_innovarte.categorias where slug='velas'), 'Flowers', 'https://static.wixstatic.com/media/c78faf_c700164e25a14ed482ddc3ddcf21c9ac~mv2.jpg', 'decor', 39)
on conflict (slug) do nothing;
insert into new_innovarte.productos (slug, nombre, categoria_id, subtitulo, imagen, linea, orden)
values ('daisygift', 'Daisy Gift', (select id from new_innovarte.categorias where slug='velas'), 'Flowers', 'https://static.wixstatic.com/media/c78faf_df4c0bccf70949e880086f04fccf9eb4~mv2.jpg', 'decor', 40)
on conflict (slug) do nothing;
insert into new_innovarte.productos (slug, nombre, categoria_id, subtitulo, imagen, linea, orden)
values ('glassbloom', 'Glass Bloom', (select id from new_innovarte.categorias where slug='velas'), 'Flowers', 'https://static.wixstatic.com/media/c78faf_a11505c147764cc29119b1c8635be6c1~mv2.jpg', 'decor', 41)
on conflict (slug) do nothing;
insert into new_innovarte.productos (slug, nombre, categoria_id, subtitulo, imagen, linea, orden)
values ('lion', 'Lion', (select id from new_innovarte.categorias where slug='velas'), 'Animals', 'https://static.wixstatic.com/media/c78faf_8c8558cca7d54564bf07de78779bde81~mv2.jpg', 'decor', 42)
on conflict (slug) do nothing;
insert into new_innovarte.productos (slug, nombre, categoria_id, subtitulo, imagen, linea, orden)
values ('cinnamonstar', 'Cinnamon Star', (select id from new_innovarte.categorias where slug='aromatizadores'), 'Closet Fresheners', 'https://static.wixstatic.com/media/c78faf_a4d5828cceca4b978d5bae940f5a30fc~mv2.jpg', 'decor', 47)
on conflict (slug) do nothing;
insert into new_innovarte.productos (slug, nombre, categoria_id, subtitulo, imagen, linea, orden)
values ('springdaisy', 'Spring Daisy', (select id from new_innovarte.categorias where slug='aromatizadores'), 'Closet Fresheners', 'https://static.wixstatic.com/media/c78faf_886c07977e8a466f8a12933b46bcd865~mv2.jpg', 'decor', 48)
on conflict (slug) do nothing;
insert into new_innovarte.productos (slug, nombre, categoria_id, subtitulo, imagen, linea, orden)
values ('wildflowerglass', 'Wildflower Glass', (select id from new_innovarte.categorias where slug='aromatizadores'), 'Closet Fresheners', 'https://static.wixstatic.com/media/c78faf_39a021c14f60490391186a999315c7a8~mv2.jpg', 'decor', 49)
on conflict (slug) do nothing;
insert into new_innovarte.productos (slug, nombre, categoria_id, subtitulo, imagen, linea, orden)
values ('leafbloom', 'Leaf Bloom', (select id from new_innovarte.categorias where slug='aromatizadores'), 'Closet Fresheners', 'https://static.wixstatic.com/media/c78faf_d2786a7bf83b418a8cd2e62ffb51d8e4~mv2.jpg', 'decor', 50)
on conflict (slug) do nothing;
insert into new_innovarte.productos (slug, nombre, categoria_id, subtitulo, imagen, linea, orden)
values ('rosecircle', 'Rose Circle', (select id from new_innovarte.categorias where slug='aromatizadores'), 'Closet Fresheners', 'https://static.wixstatic.com/media/c78faf_36cddaa101f64dae8ba1acc31a0c9229~mv2.jpg', 'decor', 51)
on conflict (slug) do nothing;
insert into new_innovarte.productos (slug, nombre, categoria_id, subtitulo, imagen, linea, orden)
values ('chocomini', 'Choco Mini', (select id from new_innovarte.categorias where slug='aromatizadores'), 'Wax Melts', 'https://static.wixstatic.com/media/c78faf_719c9e07e6ce4cd49fc1192d2d1c4dc7~mv2.jpg', 'decor', 52)
on conflict (slug) do nothing;
insert into new_innovarte.productos (slug, nombre, categoria_id, subtitulo, imagen, linea, orden)
values ('bloomysquares', 'Bloomy Squares', (select id from new_innovarte.categorias where slug='aromatizadores'), 'Wax Melts', 'https://static.wixstatic.com/media/c78faf_e427c09250b54326a6ea447f12f493c6~mv2.jpg', 'decor', 53)
on conflict (slug) do nothing;
insert into new_innovarte.productos (slug, nombre, categoria_id, subtitulo, imagen, linea, orden)
values ('joyfuljar', 'Joyful Jar', (select id from new_innovarte.categorias where slug='aromatizadores'), 'Wax Melts', 'https://static.wixstatic.com/media/c78faf_7ae1f3e94bc74b3a8b02876b2cbf27d8~mv2.jpg', 'decor', 54)
on conflict (slug) do nothing;
insert into new_innovarte.productos (slug, nombre, categoria_id, subtitulo, imagen, linea, orden)
values ('freshmist', 'Fresh Mist', (select id from new_innovarte.categorias where slug='aromatizadores'), 'Home Sprays', 'https://static.wixstatic.com/media/c78faf_1f21a9102d8e4e61a244da9b661754d7~mv2.jpg', 'decor', 55)
on conflict (slug) do nothing;
insert into new_innovarte.productos (slug, nombre, categoria_id, subtitulo, imagen, linea, orden)
values ('eleganttouch', 'Elegant Touch', (select id from new_innovarte.categorias where slug='aromatizadores'), 'Home Sprays', 'https://static.wixstatic.com/media/c78faf_88d1a5fdcb5c4427a7fe32cb0bd2b3c5~mv2.jpg', 'decor', 56)
on conflict (slug) do nothing;
insert into new_innovarte.productos (slug, nombre, categoria_id, subtitulo, imagen, linea, orden)
values ('crystalessence', 'Crystal Essence', (select id from new_innovarte.categorias where slug='aromatizadores'), 'Home Sprays', 'https://static.wixstatic.com/media/c78faf_0e77a635315244d79783549d7ad32824~mv2.jpg', 'decor', 57)
on conflict (slug) do nothing;
insert into new_innovarte.productos (slug, nombre, categoria_id, subtitulo, imagen, linea, orden)
values ('signaturemist', 'Signature Mist', (select id from new_innovarte.categorias where slug='aromatizadores'), 'Home Sprays', 'https://static.wixstatic.com/media/c78faf_10ce3f8e1a9d472c9291725b86bc10ea~mv2.jpg', 'decor', 58)
on conflict (slug) do nothing;
insert into new_innovarte.productos (slug, nombre, categoria_id, subtitulo, imagen, linea, orden)
values ('elegantnoir', 'Elegant Noir', (select id from new_innovarte.categorias where slug='aromatizadores'), 'Reed Diffusers', 'https://static.wixstatic.com/media/c78faf_c4a6f74e11c74863ba3ce68d723a09a6~mv2.jpg', 'decor', 59)
on conflict (slug) do nothing;
insert into new_innovarte.productos (slug, nombre, categoria_id, subtitulo, imagen, linea, orden)
values ('pasteldaisy', 'Pastel Daisy', (select id from new_innovarte.categorias where slug='aromatizadores'), 'Reed Diffusers', 'https://static.wixstatic.com/media/c78faf_005c6cb762774100bc755c18a8e4e33b~mv2.jpg', 'decor', 60)
on conflict (slug) do nothing;
insert into new_innovarte.productos (slug, nombre, categoria_id, subtitulo, imagen, linea, orden)
values ('bloomjar', 'Bloom Jar', (select id from new_innovarte.categorias where slug='aromatizadores'), 'Reed Diffusers', 'https://static.wixstatic.com/media/c78faf_46f6f551baf447cc983f6ba2aae318d6~mv2.jpg', 'decor', 61)
on conflict (slug) do nothing;
insert into new_innovarte.productos (slug, nombre, categoria_id, subtitulo, imagen, linea, orden)
values ('floralglass', 'Floral Glass', (select id from new_innovarte.categorias where slug='aromatizadores'), 'Reed Diffusers', 'https://static.wixstatic.com/media/c78faf_2f22f61ab5884e9dbc3ce31a60c0c352~mv2.jpg', 'decor', 62)
on conflict (slug) do nothing;
insert into new_innovarte.productos (slug, nombre, categoria_id, subtitulo, imagen, linea, orden)
values ('harmonyglowset', 'Harmony Glow Set', (select id from new_innovarte.categorias where slug='aromatizadores'), 'Diffuser Sets', 'https://static.wixstatic.com/media/c78faf_7ff5b1cdcec2408b84ef4d5e01a57708~mv2.jpg', 'decor', 63)
on conflict (slug) do nothing;
insert into new_innovarte.productos (slug, nombre, categoria_id, subtitulo, imagen, linea, orden)
values ('goldenauraset', 'Golden Aura Set', (select id from new_innovarte.categorias where slug='aromatizadores'), 'Diffuser Sets', 'https://static.wixstatic.com/media/c78faf_0049e02e2fd3478e9991c3a00e77c52f~mv2.jpg', 'decor', 64)
on conflict (slug) do nothing;
insert into new_innovarte.productos (slug, nombre, categoria_id, subtitulo, imagen, linea, orden)
values ('mysticjar', 'Mystic Jar', (select id from new_innovarte.categorias where slug='aromatizadores'), 'Vessels', 'https://static.wixstatic.com/media/c78faf_033d3bfbd7404eef841baa444bed3f51~mv2.jpg', 'decor', 65)
on conflict (slug) do nothing;
insert into new_innovarte.productos (slug, nombre, categoria_id, subtitulo, imagen, linea, orden)
values ('classicglow', 'Classic Glow', (select id from new_innovarte.categorias where slug='aromatizadores'), 'Vessels', 'https://static.wixstatic.com/media/c78faf_1626b2e30e604ecfba5718bdd9a9f3aa~mv2.jpg', 'decor', 66)
on conflict (slug) do nothing;
insert into new_innovarte.productos (slug, nombre, categoria_id, subtitulo, imagen, linea, orden)
values ('luxeflame', 'Luxe Flame', (select id from new_innovarte.categorias where slug='aromatizadores'), 'Vessels', 'https://static.wixstatic.com/media/c78faf_dcc35e71fbf04865868d42a6da27e4bc~mv2.jpg', 'decor', 67)
on conflict (slug) do nothing;
insert into new_innovarte.productos (slug, nombre, categoria_id, subtitulo, imagen, linea, orden)
values ('gardenglow', 'Garden Glow', (select id from new_innovarte.categorias where slug='aromatizadores'), 'Vessels', 'https://static.wixstatic.com/media/c78faf_a6d79fd5e5484f33a888306fb8f4bc15~mv2.jpg', 'decor', 68)
on conflict (slug) do nothing;
insert into new_innovarte.productos (slug, nombre, categoria_id, subtitulo, imagen, linea, orden)
values ('thermometer', 'Digital Wax Thermometer', (select id from new_innovarte.categorias where slug='insumos'), 'Tools', 'https://static.wixstatic.com/media/c78faf_7407f8aca32d4325a02f5ba024351396~mv2.jpg', 'insumos', 69)
on conflict (slug) do nothing;
insert into new_innovarte.productos (slug, nombre, categoria_id, subtitulo, imagen, linea, orden)
values ('cottonwick', 'Cotton Wick Set', (select id from new_innovarte.categorias where slug='insumos'), 'Wicks', 'https://static.wixstatic.com/media/c78faf_04165430f05b4977b30f15daa43dba99~mv2.jpg', 'insumos', 70)
on conflict (slug) do nothing;
insert into new_innovarte.productos (slug, nombre, categoria_id, subtitulo, imagen, linea, orden)
values ('woodenwickkit', 'Wooden Wick Kit', (select id from new_innovarte.categorias where slug='insumos'), 'Wicks', 'https://static.wixstatic.com/media/c78faf_da81c9e6e0c44cabb468fbbcf650d6c0~mv2.jpg', 'insumos', 71)
on conflict (slug) do nothing;
insert into new_innovarte.productos (slug, nombre, categoria_id, subtitulo, imagen, linea, orden)
values ('heatgun', 'Heat Gun', (select id from new_innovarte.categorias where slug='insumos'), 'Tools', 'https://static.wixstatic.com/media/c78faf_775cf7a5936243af8937f97212cd62d3~mv2.jpg', 'insumos', 72)
on conflict (slug) do nothing;
insert into new_innovarte.productos (slug, nombre, categoria_id, subtitulo, imagen, linea, orden)
values ('droppers', 'Droppers', (select id from new_innovarte.categorias where slug='insumos'), 'Tools', 'https://static.wixstatic.com/media/c78faf_c0b621d7e9fa43d0931997d1ce95786d~mv2.jpg', 'insumos', 73)
on conflict (slug) do nothing;
insert into new_innovarte.productos (slug, nombre, categoria_id, subtitulo, imagen, linea, orden)
values ('wickstickers', 'Wick Stickers Pack', (select id from new_innovarte.categorias where slug='insumos'), 'Wicks', 'https://static.wixstatic.com/media/c78faf_ab15c62ddf704ecfa1405434d8c3aeae~mv2.jpg', 'insumos', 74)
on conflict (slug) do nothing;
insert into new_innovarte.productos (slug, nombre, categoria_id, subtitulo, imagen, linea, orden)
values ('essentialoils', 'Essential Oils', (select id from new_innovarte.categorias where slug='insumos'), 'Fragrance', 'https://static.wixstatic.com/media/c78faf_eebbd59fc4274237b44b7c2bb556f01f~mv2.jpg', 'insumos', 75)
on conflict (slug) do nothing;
insert into new_innovarte.productos (slug, nombre, categoria_id, subtitulo, imagen, linea, orden)
values ('candlesand', 'Candle Sand', (select id from new_innovarte.categorias where slug='insumos'), 'Wax', 'https://static.wixstatic.com/media/c78faf_4ff3059166ca4ca1b32f89da2d49e197~mv2.jpg', 'insumos', 76)
on conflict (slug) do nothing;
insert into new_innovarte.productos (slug, nombre, categoria_id, subtitulo, imagen, linea, orden)
values ('micapowder', 'Mica Powder', (select id from new_innovarte.categorias where slug='insumos'), 'Color', 'https://static.wixstatic.com/media/c78faf_f75f6e54ae874460a828e12448c91681~mv2.jpg', 'insumos', 77)
on conflict (slug) do nothing;
insert into new_innovarte.productos (slug, nombre, categoria_id, subtitulo, imagen, linea, orden)
values ('wickholders', 'Wooden Wick Holders', (select id from new_innovarte.categorias where slug='insumos'), 'Wicks', 'https://static.wixstatic.com/media/c78faf_c93dfb51267f423480b2aeb5e6a67c2c~mv2.jpg', 'insumos', 78)
on conflict (slug) do nothing;
insert into new_innovarte.productos (slug, nombre, categoria_id, subtitulo, imagen, linea, orden)
values ('stearic', 'Stearic Acid Hardener', (select id from new_innovarte.categorias where slug='insumos'), 'Wax', 'https://static.wixstatic.com/media/c78faf_30a3a5f729e3402aa0922df3eba0f4c0~mv2.jpg', 'insumos', 79)
on conflict (slug) do nothing;
insert into new_innovarte.productos (slug, nombre, categoria_id, subtitulo, imagen, linea, orden)
values ('paraffin', 'Paraffin Wax Granules', (select id from new_innovarte.categorias where slug='insumos'), 'Wax', 'https://static.wixstatic.com/media/c78faf_8e1a318629414abea720ee54081c4cc0~mv2.jpg', 'insumos', 80)
on conflict (slug) do nothing;
insert into new_innovarte.productos (slug, nombre, categoria_id, subtitulo, imagen, linea, orden)
values ('soywax', 'Soy Wax', (select id from new_innovarte.categorias where slug='insumos'), 'Wax', 'https://static.wixstatic.com/media/c78faf_655300d79ced4f9dad2d7d316f86b4e4~mv2.jpg', 'insumos', 81)
on conflict (slug) do nothing;

-- Piezas decorativas (velas escultoricas y souvenirs de eventos)
insert into new_innovarte.productos (slug, nombre, categoria_id, subtitulo, imagen, linea, orden)
values ('deco-osito-rosas', 'Vela Osito de Rosas', (select id from new_innovarte.categorias where slug='velas'), 'Colección Floral', 'uploads/deco-osito-rosas.jpg', 'decor', 82)
on conflict (slug) do nothing;
insert into new_innovarte.productos (slug, nombre, categoria_id, subtitulo, imagen, linea, orden)
values ('deco-ramo-rosas', 'Vela Ramo de Rosas', (select id from new_innovarte.categorias where slug='velas'), 'Colección Floral', 'uploads/deco-ramo-rosas.jpg', 'decor', 83)
on conflict (slug) do nothing;
insert into new_innovarte.productos (slug, nombre, categoria_id, subtitulo, imagen, linea, orden)
values ('deco-margarita-rosada', 'Vela Margarita Rosada', (select id from new_innovarte.categorias where slug='velas'), 'Colección Floral', 'uploads/deco-margarita-rosada.jpg', 'decor', 84)
on conflict (slug) do nothing;
insert into new_innovarte.productos (slug, nombre, categoria_id, subtitulo, imagen, linea, orden)
values ('deco-jirafa', 'Velas Jirafa', (select id from new_innovarte.categorias where slug='velas'), 'Colección Baby', 'uploads/deco-jirafa.jpg', 'decor', 85)
on conflict (slug) do nothing;
insert into new_innovarte.productos (slug, nombre, categoria_id, subtitulo, imagen, linea, orden)
values ('deco-elefante', 'Vela Elefante', (select id from new_innovarte.categorias where slug='velas'), 'Colección Baby', 'uploads/deco-elefante.jpg', 'decor', 86)
on conflict (slug) do nothing;
insert into new_innovarte.productos (slug, nombre, categoria_id, subtitulo, imagen, linea, orden)
values ('deco-leoncito', 'Figura Leoncito', (select id from new_innovarte.categorias where slug='velas'), 'Colección Baby', 'uploads/deco-leoncito.jpg', 'decor', 87)
on conflict (slug) do nothing;
insert into new_innovarte.productos (slug, nombre, categoria_id, subtitulo, imagen, linea, orden)
values ('deco-mariposa', 'Vela Mariposa', (select id from new_innovarte.categorias where slug='velas'), 'Colección Naturaleza', 'uploads/deco-mariposa.jpg', 'decor', 88)
on conflict (slug) do nothing;
insert into new_innovarte.productos (slug, nombre, categoria_id, subtitulo, imagen, linea, orden)
values ('deco-angel', 'Yeso Aromático Ángel', (select id from new_innovarte.categorias where slug='velas'), 'Aromatizante decorativo', 'uploads/deco-angel.jpg', 'decor', 89)
on conflict (slug) do nothing;
insert into new_innovarte.productos (slug, nombre, categoria_id, subtitulo, imagen, linea, orden)
values ('deco-bautismo-cruz', 'Vela Bautismo Cruz', (select id from new_innovarte.categorias where slug='velas'), 'Souvenir personalizable', 'uploads/deco-bautismo-cruz.jpg', 'decor', 90)
on conflict (slug) do nothing;
insert into new_innovarte.productos (slug, nombre, categoria_id, subtitulo, imagen, linea, orden)
values ('deco-bautismo-flores', 'Vela Bautismo Flores Secas', (select id from new_innovarte.categorias where slug='velas'), 'Souvenir personalizable', 'uploads/deco-bautismo-flores.jpg', 'decor', 91)
on conflict (slug) do nothing;
insert into new_innovarte.productos (slug, nombre, categoria_id, subtitulo, imagen, linea, orden)
values ('deco-bautismo-rosario', 'Vela Bautismo con Rosario', (select id from new_innovarte.categorias where slug='velas'), 'Souvenir personalizable', 'uploads/deco-bautismo-rosario.jpg', 'decor', 92)
on conflict (slug) do nothing;
insert into new_innovarte.productos (slug, nombre, categoria_id, subtitulo, imagen, linea, orden)
values ('deco-cruz-comunion', 'Vela Cruz Comunión', (select id from new_innovarte.categorias where slug='velas'), 'Souvenir personalizable', 'uploads/deco-cruz-comunion.jpg', 'decor', 93)
on conflict (slug) do nothing;
insert into new_innovarte.productos (slug, nombre, categoria_id, subtitulo, imagen, linea, orden)
values ('deco-comunion-person', 'Vela Comunión Personalizada', (select id from new_innovarte.categorias where slug='velas'), 'Souvenir personalizable', 'uploads/deco-comunion-personalizada.jpg', 'decor', 94)
on conflict (slug) do nothing;
insert into new_innovarte.productos (slug, nombre, categoria_id, subtitulo, imagen, linea, orden)
values ('deco-corazon-manos', 'Vela Corazón Manos en Oración', (select id from new_innovarte.categorias where slug='velas'), 'Souvenir personalizable', 'uploads/deco-corazon-manos.jpg', 'decor', 95)
on conflict (slug) do nothing;
insert into new_innovarte.productos (slug, nombre, categoria_id, subtitulo, imagen, linea, orden)
values ('deco-marg-confesion', 'Vela Margarita Confesión', (select id from new_innovarte.categorias where slug='velas'), 'Souvenir personalizable', 'uploads/deco-margarita-confesion.jpg', 'decor', 96)
on conflict (slug) do nothing;
insert into new_innovarte.productos (slug, nombre, categoria_id, subtitulo, imagen, linea, orden)
values ('deco-confirmacion', 'Vela Confirmación', (select id from new_innovarte.categorias where slug='velas'), 'Souvenir personalizable', 'uploads/deco-confirmacion.jpg', 'decor', 97)
on conflict (slug) do nothing;
insert into new_innovarte.productos (slug, nombre, categoria_id, subtitulo, imagen, linea, orden)
values ('deco-marg-babyshower', 'Vela Margarita Baby Shower', (select id from new_innovarte.categorias where slug='velas'), 'Souvenir personalizable', 'uploads/deco-margarita-babyshower.jpg', 'decor', 98)
on conflict (slug) do nothing;
insert into new_innovarte.productos (slug, nombre, categoria_id, subtitulo, imagen, linea, orden)
values ('deco-marg-aniversario', 'Vela Margarita Aniversario', (select id from new_innovarte.categorias where slug='velas'), 'Souvenir personalizable', 'uploads/deco-margarita-aniversario.jpg', 'decor', 99)
on conflict (slug) do nothing;
insert into new_innovarte.productos (slug, nombre, categoria_id, subtitulo, imagen, linea, orden)
values ('deco-marg-caja', 'Vela Margarita en Caja', (select id from new_innovarte.categorias where slug='velas'), 'Souvenir personalizable', 'uploads/deco-margarita-caja.jpg', 'decor', 100)
on conflict (slug) do nothing;

-- Velas en recipiente (vidrio, ceramica, lata) - orden negativo para que vayan primero
insert into new_innovarte.productos (slug, nombre, categoria_id, subtitulo, imagen, linea, orden)
values ('velas-vidrio-clasica', 'Vela Vidrio Clásica', (select id from new_innovarte.categorias where slug='velas'), 'Recipiente de vidrio', 'uploads/velas-vidrio-clasica.jpg', 'decor', -20)
on conflict (slug) do nothing;
insert into new_innovarte.productos (slug, nombre, categoria_id, subtitulo, imagen, linea, orden)
values ('velas-vidrio-flor', 'Vela Vidrio con Flor', (select id from new_innovarte.categorias where slug='velas'), 'Recipiente de vidrio', 'uploads/velas-vidrio-flor.jpg', 'decor', -19)
on conflict (slug) do nothing;
insert into new_innovarte.productos (slug, nombre, categoria_id, subtitulo, imagen, linea, orden)
values ('velas-vidrio-girasol', 'Vela Vidrio Girasol', (select id from new_innovarte.categorias where slug='velas'), 'Recipiente de vidrio', 'uploads/velas-vidrio-girasol.jpg', 'decor', -18)
on conflict (slug) do nothing;
insert into new_innovarte.productos (slug, nombre, categoria_id, subtitulo, imagen, linea, orden)
values ('velas-vidrio-rosa', 'Vela Vidrio Rosa', (select id from new_innovarte.categorias where slug='velas'), 'Recipiente de vidrio', 'uploads/velas-vidrio-rosa.jpg', 'decor', -17)
on conflict (slug) do nothing;
insert into new_innovarte.productos (slug, nombre, categoria_id, subtitulo, imagen, linea, orden)
values ('velas-vidrio-tallado', 'Vela Vidrio Tallado', (select id from new_innovarte.categorias where slug='velas'), 'Recipiente de vidrio', 'uploads/velas-vidrio-tallado.jpg', 'decor', -16)
on conflict (slug) do nothing;
insert into new_innovarte.productos (slug, nombre, categoria_id, subtitulo, imagen, linea, orden)
values ('velas-vidrio-acanalado', 'Vela Vidrio Acanalado', (select id from new_innovarte.categorias where slug='velas'), 'Recipiente de vidrio', 'uploads/velas-vidrio-acanalado.jpg', 'decor', -15)
on conflict (slug) do nothing;
insert into new_innovarte.productos (slug, nombre, categoria_id, subtitulo, imagen, linea, orden)
values ('velas-vidrio-corcho', 'Vela Vidrio Tapa Corcho', (select id from new_innovarte.categorias where slug='velas'), 'Recipiente de vidrio', 'uploads/velas-vidrio-corcho.jpg', 'decor', -14)
on conflict (slug) do nothing;
insert into new_innovarte.productos (slug, nombre, categoria_id, subtitulo, imagen, linea, orden)
values ('velas-ceramica-travertino', 'Vela Concreto Travertino', (select id from new_innovarte.categorias where slug='velas'), 'Recipiente de concreto', 'uploads/velas-ceramica-travertino.jpg', 'decor', -13)
on conflict (slug) do nothing;
insert into new_innovarte.productos (slug, nombre, categoria_id, subtitulo, imagen, linea, orden)
values ('velas-ceramica-tapa', 'Vela Concreto con Tapa', (select id from new_innovarte.categorias where slug='velas'), 'Recipiente de concreto', 'uploads/velas-ceramica-tapa.jpg', 'decor', -12)
on conflict (slug) do nothing;
insert into new_innovarte.productos (slug, nombre, categoria_id, subtitulo, imagen, linea, orden)
values ('velas-ceramica-arena', 'Vela Concreto Arena', (select id from new_innovarte.categorias where slug='velas'), 'Recipiente de concreto', 'uploads/velas-ceramica-arena.jpg', 'decor', -11)
on conflict (slug) do nothing;
insert into new_innovarte.productos (slug, nombre, categoria_id, subtitulo, imagen, linea, orden)
values ('velas-ceramica-texturada', 'Vela Concreto Texturada', (select id from new_innovarte.categorias where slug='velas'), 'Recipiente de concreto', 'uploads/velas-ceramica-texturada.jpg', 'decor', -10)
on conflict (slug) do nothing;
insert into new_innovarte.productos (slug, nombre, categoria_id, subtitulo, imagen, linea, orden)
values ('velas-ceramica-blanca', 'Vela Concreto Blanca', (select id from new_innovarte.categorias where slug='velas'), 'Recipiente de concreto', 'uploads/velas-ceramica-blanca.jpg', 'decor', -9)
on conflict (slug) do nothing;
insert into new_innovarte.productos (slug, nombre, categoria_id, subtitulo, imagen, linea, orden)
values ('velas-ceramica-perlas', 'Vela Concreto con Perlas', (select id from new_innovarte.categorias where slug='velas'), 'Recipiente de concreto', 'uploads/velas-ceramica-perlas.jpg', 'decor', -8)
on conflict (slug) do nothing;
insert into new_innovarte.productos (slug, nombre, categoria_id, subtitulo, imagen, linea, orden)
values ('velas-ceramica-duo', 'Vela Concreto Dúo', (select id from new_innovarte.categorias where slug='velas'), 'Recipiente de concreto', 'uploads/velas-ceramica-duo.jpg', 'decor', -7)
on conflict (slug) do nothing;
insert into new_innovarte.productos (slug, nombre, categoria_id, subtitulo, imagen, linea, orden)
values ('velas-lata-dorada', 'Vela Lata Dorada', (select id from new_innovarte.categorias where slug='velas'), 'Recipiente de metal', 'uploads/velas-lata-dorada.jpg', 'decor', -6)
on conflict (slug) do nothing;

-- Velas decorativas (esculToricas) - orden -40..-25, antes de las de recipiente
insert into new_innovarte.productos (slug, nombre, categoria_id, subtitulo, imagen, linea, orden)
values ('velas-peonia', 'Vela Peonía', (select id from new_innovarte.categorias where slug='velas'), 'Vela decorativa', 'uploads/velas-peonia.jpg', 'decor', -40)
on conflict (slug) do nothing;
insert into new_innovarte.productos (slug, nombre, categoria_id, subtitulo, imagen, linea, orden)
values ('velas-capullo-rosa', 'Vela Capullo de Rosa', (select id from new_innovarte.categorias where slug='velas'), 'Vela decorativa', 'uploads/velas-capullo-rosa.jpg', 'decor', -39)
on conflict (slug) do nothing;
insert into new_innovarte.productos (slug, nombre, categoria_id, subtitulo, imagen, linea, orden)
values ('velas-loto', 'Vela Loto', (select id from new_innovarte.categorias where slug='velas'), 'Vela decorativa', 'uploads/velas-loto.jpg', 'decor', -38)
on conflict (slug) do nothing;
insert into new_innovarte.productos (slug, nombre, categoria_id, subtitulo, imagen, linea, orden)
values ('velas-rosa-grande', 'Vela Rosa Grande', (select id from new_innovarte.categorias where slug='velas'), 'Vela decorativa', 'uploads/velas-rosa-grande.jpg', 'decor', -37)
on conflict (slug) do nothing;
insert into new_innovarte.productos (slug, nombre, categoria_id, subtitulo, imagen, linea, orden)
values ('velas-busto', 'Vela Busto Dama', (select id from new_innovarte.categorias where slug='velas'), 'Vela decorativa', 'uploads/velas-busto.jpg', 'decor', -36)
on conflict (slug) do nothing;
insert into new_innovarte.productos (slug, nombre, categoria_id, subtitulo, imagen, linea, orden)
values ('velas-espiral', 'Vela Espiral', (select id from new_innovarte.categorias where slug='velas'), 'Vela decorativa', 'uploads/velas-espiral.jpg', 'decor', -35)
on conflict (slug) do nothing;
insert into new_innovarte.productos (slug, nombre, categoria_id, subtitulo, imagen, linea, orden)
values ('velas-burbuja', 'Vela Burbuja', (select id from new_innovarte.categorias where slug='velas'), 'Vela decorativa', 'uploads/velas-burbuja.jpg', 'decor', -34)
on conflict (slug) do nothing;
insert into new_innovarte.productos (slug, nombre, categoria_id, subtitulo, imagen, linea, orden)
values ('velas-concha', 'Vela Concha de Mar', (select id from new_innovarte.categorias where slug='velas'), 'Vela decorativa', 'uploads/velas-concha.jpg', 'decor', -33)
on conflict (slug) do nothing;
insert into new_innovarte.productos (slug, nombre, categoria_id, subtitulo, imagen, linea, orden)
values ('velas-rosa-vidrio', 'Vela Rosa en Vidrio', (select id from new_innovarte.categorias where slug='velas'), 'Vela decorativa', 'uploads/velas-rosa-vidrio.jpg', 'decor', -32)
on conflict (slug) do nothing;
insert into new_innovarte.productos (slug, nombre, categoria_id, subtitulo, imagen, linea, orden)
values ('velas-pilar-acanalado', 'Vela Pilar Acanalado', (select id from new_innovarte.categorias where slug='velas'), 'Vela decorativa', 'uploads/velas-pilar-acanalado.jpg', 'decor', -31)
on conflict (slug) do nothing;
insert into new_innovarte.productos (slug, nombre, categoria_id, subtitulo, imagen, linea, orden)
values ('velas-arco', 'Vela Arco', (select id from new_innovarte.categorias where slug='velas'), 'Vela decorativa', 'uploads/velas-arco.jpg', 'decor', -30)
on conflict (slug) do nothing;
insert into new_innovarte.productos (slug, nombre, categoria_id, subtitulo, imagen, linea, orden)
values ('velas-peonia-caja', 'Velas Peonía en Caja', (select id from new_innovarte.categorias where slug='velas'), 'Vela decorativa', 'uploads/velas-peonia-caja.jpg', 'decor', -29)
on conflict (slug) do nothing;
insert into new_innovarte.productos (slug, nombre, categoria_id, subtitulo, imagen, linea, orden)
values ('velas-rosa-corazon', 'Velas Rosa y Corazón', (select id from new_innovarte.categorias where slug='velas'), 'Vela decorativa', 'uploads/velas-rosa-corazon.jpg', 'decor', -28)
on conflict (slug) do nothing;
insert into new_innovarte.productos (slug, nombre, categoria_id, subtitulo, imagen, linea, orden)
values ('velas-coleccion-flores', 'Colección Flores', (select id from new_innovarte.categorias where slug='velas'), 'Surtido decorativo', 'uploads/velas-coleccion-flores.jpg', 'decor', -27)
on conflict (slug) do nothing;
insert into new_innovarte.productos (slug, nombre, categoria_id, subtitulo, imagen, linea, orden)
values ('velas-coleccion-formas', 'Colección de Formas', (select id from new_innovarte.categorias where slug='velas'), 'Surtido decorativo', 'uploads/velas-coleccion-formas.jpg', 'decor', -26)
on conflict (slug) do nothing;
insert into new_innovarte.productos (slug, nombre, categoria_id, subtitulo, imagen, linea, orden)
values ('velas-coleccion-surtido', 'Colección Surtido', (select id from new_innovarte.categorias where slug='velas'), 'Surtido decorativo', 'uploads/velas-coleccion-surtido.jpg', 'decor', -25)
on conflict (slug) do nothing;

-- Velas decorativas estudio (fondo crema)
insert into new_innovarte.productos (slug, nombre, categoria_id, subtitulo, imagen, linea, orden)
values ('velas-pilares-acanalados', 'Set Pilares Acanalados', (select id from new_innovarte.categorias where slug='velas'), 'Vela decorativa', 'uploads/velas-pilares-acanalados.jpg', 'decor', -46)
on conflict (slug) do nothing;
insert into new_innovarte.productos (slug, nombre, categoria_id, subtitulo, imagen, linea, orden)
values ('velas-esferas-espiral', 'Set Esferas Espiral', (select id from new_innovarte.categorias where slug='velas'), 'Vela decorativa', 'uploads/velas-esferas-espiral.jpg', 'decor', -45)
on conflict (slug) do nothing;
insert into new_innovarte.productos (slug, nombre, categoria_id, subtitulo, imagen, linea, orden)
values ('velas-esfera-burbujas', 'Vela Esfera de Burbujas', (select id from new_innovarte.categorias where slug='velas'), 'Vela decorativa', 'uploads/velas-esfera-burbujas.jpg', 'decor', -44)
on conflict (slug) do nothing;
insert into new_innovarte.productos (slug, nombre, categoria_id, subtitulo, imagen, linea, orden)
values ('velas-cubo-burbujas', 'Vela Cubo de Burbujas', (select id from new_innovarte.categorias where slug='velas'), 'Vela decorativa', 'uploads/velas-cubo-burbujas.jpg', 'decor', -43)
on conflict (slug) do nothing;
insert into new_innovarte.productos (slug, nombre, categoria_id, subtitulo, imagen, linea, orden)
values ('velas-candelabro', 'Velas Candelabro', (select id from new_innovarte.categorias where slug='velas'), 'Vela decorativa', 'uploads/velas-candelabro.jpg', 'decor', -42)
on conflict (slug) do nothing;
insert into new_innovarte.productos (slug, nombre, categoria_id, subtitulo, imagen, linea, orden)
values ('velas-espiral-oval', 'Vela Espiral Oval', (select id from new_innovarte.categorias where slug='velas'), 'Vela decorativa', 'uploads/velas-espiral-oval.jpg', 'decor', -41)
on conflict (slug) do nothing;

-- Bouquet (arreglos de velas flor)
insert into new_innovarte.productos (slug, nombre, categoria_id, subtitulo, imagen, linea, orden)
values ('bouquet-crema-corazon', 'Bouquet Crema con Corazón', (select id from new_innovarte.categorias where slug='velas'), 'Arreglo en caja', 'uploads/bouquet-crema-corazon.jpg', 'decor', 1)
on conflict (slug) do nothing;
insert into new_innovarte.productos (slug, nombre, categoria_id, subtitulo, imagen, linea, orden)
values ('bouquet-marfil', 'Bouquet Marfil', (select id from new_innovarte.categorias where slug='velas'), 'Arreglo en caja', 'uploads/bouquet-marfil.jpg', 'decor', 2)
on conflict (slug) do nothing;
insert into new_innovarte.productos (slug, nombre, categoria_id, subtitulo, imagen, linea, orden)
values ('bouquet-dorado', 'Bouquet Dorado', (select id from new_innovarte.categorias where slug='velas'), 'Arreglo en caja', 'uploads/bouquet-dorado.jpg', 'decor', 3)
on conflict (slug) do nothing;
insert into new_innovarte.productos (slug, nombre, categoria_id, subtitulo, imagen, linea, orden)
values ('bouquet-flores', 'Bouquet Flores', (select id from new_innovarte.categorias where slug='velas'), 'Velas con flores', 'uploads/bouquet-flores.jpg', 'decor', 4)
on conflict (slug) do nothing;
insert into new_innovarte.productos (slug, nombre, categoria_id, subtitulo, imagen, linea, orden)
values ('bouquet-verde-canasta', 'Bouquet Verde en Canasta', (select id from new_innovarte.categorias where slug='velas'), 'Arreglo en canasta', 'uploads/bouquet-verde-canasta.jpg', 'decor', 5)
on conflict (slug) do nothing;
insert into new_innovarte.productos (slug, nombre, categoria_id, subtitulo, imagen, linea, orden)
values ('bouquet-tulipanes-caja', 'Bouquet Tulipanes en Caja', (select id from new_innovarte.categorias where slug='velas'), 'Arreglo en caja', 'uploads/bouquet-tulipanes-caja.jpg', 'decor', 6)
on conflict (slug) do nothing;
insert into new_innovarte.productos (slug, nombre, categoria_id, subtitulo, imagen, linea, orden)
values ('bouquet-duo', 'Bouquet Dúo', (select id from new_innovarte.categorias where slug='velas'), 'Set de regalo', 'uploads/bouquet-duo.jpg', 'decor', 7)
on conflict (slug) do nothing;
insert into new_innovarte.productos (slug, nombre, categoria_id, subtitulo, imagen, linea, orden)
values ('bouquet-dia-madre', 'Bouquet Día de la Madre', (select id from new_innovarte.categorias where slug='velas'), 'Bolsa de regalo', 'uploads/bouquet-dia-madre.jpg', 'decor', 8)
on conflict (slug) do nothing;
insert into new_innovarte.productos (slug, nombre, categoria_id, subtitulo, imagen, linea, orden)
values ('bouquet-rosa', 'Bouquet Rosa', (select id from new_innovarte.categorias where slug='velas'), 'Arreglo en caja', 'uploads/bouquet-rosa.jpg', 'decor', 9)
on conflict (slug) do nothing;

-- ---------- "Nuestra Colección" (tarjetas del home) ----------
insert into new_innovarte.coleccion_home (clave, titulo, subtitulo, video, video_movil, poster, enlace, orden, activa)
values ('velas', 'Velas artesanales', 'Cera de soja esculpida a mano', 'uploads/coleccion-velas.mp4', '', 'uploads/WhatsApp Image 2026-07-20 at 13.33.26.jpeg', 'catalogo.dc.html#velas', 1, true)
on conflict (clave) do nothing;
insert into new_innovarte.coleccion_home (clave, titulo, subtitulo, video, video_movil, poster, enlace, orden, activa)
values ('aromas', 'Aromatizadores', 'Difusores, home sprays y textiles', 'uploads/WhatsApp Video 2026-07-20 at 13.32.10.mp4', '', 'uploads/WhatsApp Image 2026-07-20 at 13.32.08.jpeg', 'catalogo.dc.html#aromatizadores', 2, true)
on conflict (clave) do nothing;
insert into new_innovarte.coleccion_home (clave, titulo, subtitulo, video, video_movil, poster, enlace, orden, activa)
values ('ceramica', 'Cerámica', 'Piezas decorativas hechas a mano', 'uploads/WhatsApp Video 2026-07-20 at 13.32.11.mp4', '', 'uploads/WhatsApp Image 2026-07-20 at 13.32.07.jpeg', 'catalogo.dc.html#ceramica', 3, true)
on conflict (clave) do nothing;
insert into new_innovarte.coleccion_home (clave, titulo, subtitulo, video, video_movil, poster, enlace, orden, activa)
values ('concreto', 'Concreto decorativo', 'Diseño sobrio para tu hogar', 'uploads/WhatsApp Video 2026-07-20 at 13.32.13.mp4', '', 'uploads/WhatsApp Image 2026-07-20 at 13.32.02.jpeg', 'catalogo.dc.html#concreto', 4, true)
on conflict (clave) do nothing;

-- ---------- Textos del sitio ----------
insert into new_innovarte.textos (clave, es, en, grupo, tipo, orden)
values ('ann', 'Diseño artesanal para tu hogar · Velas · Cerámica · Concreto decorativo · Aromatizadores', 'Artisan design for your home · Candles · Ceramics · Decorative concrete · Home fragrance', 'franja', 'area', 0)
on conflict (clave) do nothing;
insert into new_innovarte.textos (clave, es, en, grupo, tipo, orden)
values ('hero_eye', 'Diseño artesanal para el hogar', 'Artisan design for the home', 'portada', 'texto', 1)
on conflict (clave) do nothing;
insert into new_innovarte.textos (clave, es, en, grupo, tipo, orden)
values ('hero_h1', 'Inspiramos hogares con diseño, aroma y arte.', 'We inspire homes with<br>design, scent &amp; art', 'portada', 'texto', 2)
on conflict (clave) do nothing;
insert into new_innovarte.textos (clave, es, en, grupo, tipo, orden)
values ('hero_sub', 'En Innovarte convertimos materiales nobles en piezas que cuentan historias. Creamos velas artesanales de cera de soja, aromatizadores para el hogar, difusores de varillas y piezas decorativas de cerámica y concreto, elaboradas una a una con pasión y dedicación.', 'At Innovarte we turn noble materials into pieces that tell stories. We craft soy candles, home fragrance, reed diffusers and decorative ceramic and concrete pieces, made one by one with passion and dedication.', 'portada', 'area', 3)
on conflict (clave) do nothing;
insert into new_innovarte.textos (clave, es, en, grupo, tipo, orden)
values ('cta_shop', 'Explorar la colección', 'Explore the collection', 'portada', 'texto', 4)
on conflict (clave) do nothing;
insert into new_innovarte.textos (clave, es, en, grupo, tipo, orden)
values ('cta_story', 'Nuestra historia', 'Our story', 'portada', 'texto', 5)
on conflict (clave) do nothing;
insert into new_innovarte.textos (clave, es, en, grupo, tipo, orden)
values ('ncol_eye', 'Nuestra colección', 'Our collection', 'coleccion', 'texto', 6)
on conflict (clave) do nothing;
insert into new_innovarte.textos (clave, es, en, grupo, tipo, orden)
values ('ncol_h', 'Piezas que transforman tu hogar', 'Pieces that transform your home', 'coleccion', 'texto', 7)
on conflict (clave) do nothing;
insert into new_innovarte.textos (clave, es, en, grupo, tipo, orden)
values ('ncol_sub', 'Velas, aromatizadores, cerámica y concreto decorativo — creados a mano, pieza por pieza.', 'Candles, home fragrance, ceramics and decorative concrete — crafted by hand.', 'coleccion', 'area', 8)
on conflict (clave) do nothing;
insert into new_innovarte.textos (clave, es, en, grupo, tipo, orden)
values ('marca_eye', 'Sobre Innovarte', 'About Innovarte', 'marca', 'texto', 9)
on conflict (clave) do nothing;
insert into new_innovarte.textos (clave, es, en, grupo, tipo, orden)
values ('marca_h', 'Creamos espacios que inspiran calma, belleza y bienestar.', 'We create spaces that inspire calm, beauty and well-being.', 'marca', 'texto', 10)
on conflict (clave) do nothing;
insert into new_innovarte.textos (clave, es, en, grupo, tipo, orden)
values ('marca_sub', 'Velas artesanales • Home Decor • Aromatizadores • Piezas de cerámica y concreto decorativo', 'Artisan candles • Home decor • Home fragrance • Ceramic & decorative concrete pieces', 'marca', 'area', 11)
on conflict (clave) do nothing;
insert into new_innovarte.textos (clave, es, en, grupo, tipo, orden)
values ('marca_p', 'En Innovarte diseñamos y elaboramos a mano cada pieza para transformar tu hogar. Descubre nuestras velas de cera de soja, difusores de varillas, home sprays, aromatizadores textiles y piezas decorativas de cerámica y concreto, además de detalles únicos creados con dedicación para regalar o disfrutar cada día.', 'At Innovarte we design and handcraft every piece to transform your home. Discover our soy candles, reed diffusers, home sprays, textile fresheners and decorative ceramic and concrete pieces, plus unique details created with dedication to gift or enjoy every day.', 'marca', 'area', 12)
on conflict (clave) do nothing;
insert into new_innovarte.textos (clave, es, en, grupo, tipo, orden)
values ('marca_cta1', 'Explorar la colección', 'Explore the collection', 'marca', 'texto', 13)
on conflict (clave) do nothing;
insert into new_innovarte.textos (clave, es, en, grupo, tipo, orden)
values ('marca_cta2', 'Conoce nuestra historia', 'Discover our story', 'marca', 'texto', 14)
on conflict (clave) do nothing;
insert into new_innovarte.textos (clave, es, en, grupo, tipo, orden)
values ('insumos_pagetitle', 'Insumos para crear', 'Supplies to create', 'insumos', 'texto', 15)
on conflict (clave) do nothing;
insert into new_innovarte.textos (clave, es, en, grupo, tipo, orden)
values ('insumos_p', 'Próximamente: insumos seleccionados para tus propias creaciones.', 'Coming soon: selected supplies for your own creations.', 'insumos', 'area', 16)
on conflict (clave) do nothing;
insert into new_innovarte.textos (clave, es, en, grupo, tipo, orden)
values ('insumos_note', 'Estamos preparando una línea de insumos para que crees tus propias piezas. Dejanos un mensaje y te avisamos cuando esté disponible.', 'We''re preparing a line of supplies so you can create your own pieces. Leave us a message and we''ll let you know when it launches.', 'insumos', 'area', 17)
on conflict (clave) do nothing;
insert into new_innovarte.textos (clave, es, en, grupo, tipo, orden)
values ('insumos_cta', 'Quiero que me avisen', 'Notify me', 'insumos', 'texto', 18)
on conflict (clave) do nothing;
insert into new_innovarte.textos (clave, es, en, grupo, tipo, orden)
values ('cursos_eye', 'Aprende con nosotros', 'Learn with us', 'cursos', 'texto', 18)
on conflict (clave) do nothing;
insert into new_innovarte.textos (clave, es, en, grupo, tipo, orden)
values ('cursos_pagetitle', 'Cursos y talleres', 'Courses & workshops', 'cursos', 'texto', 18)
on conflict (clave) do nothing;
insert into new_innovarte.textos (clave, es, en, grupo, tipo, orden)
values ('cursos_p', 'Próximamente: cursos y talleres para crear tus propias piezas.', 'Coming soon: courses and workshops to create your own pieces.', 'cursos', 'area', 18)
on conflict (clave) do nothing;
insert into new_innovarte.textos (clave, es, en, grupo, tipo, orden)
values ('cursos_note', 'Estamos preparando cursos y talleres, presenciales y online, para que aprendas el arte de las velas, los aromatizadores y las piezas decorativas. Dejanos tu mensaje y te avisamos cuando abramos las inscripciones.', 'We''re preparing in-person and online courses so you can learn the art of candles, home fragrance and decorative pieces. Leave us a message and we''ll let you know when enrollment opens.', 'cursos', 'area', 18)
on conflict (clave) do nothing;
insert into new_innovarte.textos (clave, es, en, grupo, tipo, orden)
values ('cursos_cta', 'Quiero que me avisen', 'Notify me', 'cursos', 'texto', 18)
on conflict (clave) do nothing;
insert into new_innovarte.textos (clave, es, en, grupo, tipo, orden)
values ('foot_desc', 'Velas artesanales de cera de soja, aromatizadores, difusores y piezas decorativas de cerámica y concreto para transformar tu hogar. Hechas a mano entre Paraguay y Estados Unidos.', 'Handcrafted soy candles, home fragrance, reed diffusers and decorative ceramic and concrete pieces to transform your home. Handmade between Paraguay and the USA.', 'pie', 'area', 19)
on conflict (clave) do nothing;
insert into new_innovarte.textos (clave, es, en, grupo, tipo, orden)
values ('foot_ship', 'Envíos a todo EE. UU.', 'Shipping across the USA', 'pie', 'texto', 20)
on conflict (clave) do nothing;
insert into new_innovarte.textos (clave, es, en, grupo, tipo, orden)
values ('marcapg_eye', 'Sobre la marca', 'About the brand', 'historia', 'texto', 21)
on conflict (clave) do nothing;
insert into new_innovarte.textos (clave, es, en, grupo, tipo, orden)
values ('marcapg_h', 'Creamos espacios que inspiran', 'We create spaces that inspire', 'historia', 'texto', 22)
on conflict (clave) do nothing;
insert into new_innovarte.textos (clave, es, en, grupo, tipo, orden)
values ('marcapg_sub', 'Velas artesanales • Home Decor • Aromatizadores • Piezas de cerámica y concreto decorativo', 'Artisan candles • Home decor • Home fragrance • Ceramic & decorative concrete', 'historia', 'area', 23)
on conflict (clave) do nothing;
insert into new_innovarte.textos (clave, es, en, grupo, tipo, orden)
values ('founder_eye', 'Nuestra historia', 'Our story', 'historia', 'texto', 24)
on conflict (clave) do nothing;
insert into new_innovarte.textos (clave, es, en, grupo, tipo, orden)
values ('founder_h', 'La historia detrás de Innovarte', 'The story behind Innovarte', 'historia', 'texto', 25)
on conflict (clave) do nothing;
insert into new_innovarte.textos (clave, es, en, grupo, tipo, orden)
values ('founder_p1', 'Soy Adriana Saieg, fundadora de Innovarte. Nací en Paraguay y actualmente vivo en Estados Unidos. Innovarte nació del deseo de crear objetos que transformen los espacios y despierten emociones.', 'I''m Adriana Saieg, founder of Innovarte. I was born in Paraguay and now live in the United States. Innovarte was born from the desire to create objects that transform spaces and awaken emotions.', 'historia', 'area', 26)
on conflict (clave) do nothing;
insert into new_innovarte.textos (clave, es, en, grupo, tipo, orden)
values ('founder_p2', 'Lo que comenzó con velas artesanales fue creciendo con el tiempo. Hoy Innovarte reúne una colección de velas aromáticas, difusores de varillas, home sprays, aromatizadores textiles y piezas decorativas de cerámica, todos elaborados cuidadosamente a mano.', 'What began with handcrafted candles grew over time. Today Innovarte brings together a collection of scented candles, reed diffusers, home sprays, textile fresheners and decorative ceramic pieces, all carefully handmade.', 'historia', 'area', 27)
on conflict (clave) do nothing;
insert into new_innovarte.textos (clave, es, en, grupo, tipo, orden)
values ('founder_p3', 'Cada producto está diseñado para aportar armonía, belleza y personalidad a tu hogar. Creemos que los pequeños detalles tienen el poder de hacer que un espacio se sienta más cálido, acogedor y especial.', 'Every product is designed to bring harmony, beauty and personality to your home. We believe small details have the power to make a space feel warmer, cozier and more special.', 'historia', 'area', 28)
on conflict (clave) do nothing;
insert into new_innovarte.textos (clave, es, en, grupo, tipo, orden)
values ('founder_p4', 'Más que vender productos, en Innovarte buscamos crear experiencias, acompañar momentos importantes y ofrecer piezas que combinen diseño, calidad y artesanía.', 'More than selling products, at Innovarte we seek to create experiences, accompany important moments and offer pieces that combine design, quality and craftsmanship.', 'historia', 'area', 29)
on conflict (clave) do nothing;
insert into new_innovarte.textos (clave, es, en, grupo, tipo, orden)
values ('founder_quote', 'En Innovarte creemos que un hogar no solo se decora… se siente. Cada aroma, cada textura y cada pieza están creados para convertir los momentos cotidianos en recuerdos inolvidables.', 'At Innovarte we believe a home isn''t just decorated… it''s felt. Every scent, texture and piece is created to turn everyday moments into unforgettable memories.', 'historia', 'area', 30)
on conflict (clave) do nothing;

-- ---------- Configuración (hero, insumos, contacto) ----------
insert into new_innovarte.configuracion (clave, valor)
values ('hero', '{"videoDesktop":"","videoMobile":"","poster":"uploads/portada-velas-artesanales.jpg","fallback":"uploads/portada-velas-artesanales.jpg"}'::jsonb)
on conflict (clave) do nothing;
insert into new_innovarte.configuracion (clave, valor)
values ('insumos', '{"publicado":true,"mensaje":"Próximamente: insumos seleccionados para tus propias creaciones."}'::jsonb)
on conflict (clave) do nothing;
insert into new_innovarte.configuracion (clave, valor)
values ('cursos', '{"publicado":false,"mensaje":"Próximamente: cursos y talleres para crear tus propias piezas."}'::jsonb)
on conflict (clave) do nothing;
insert into new_innovarte.configuracion (clave, valor)
values ('contacto', '{"email":"innovartecandles@gmail.com","ig":"https://www.instagram.com/innovartecandles","igHandle":"@innovartecandles"}'::jsonb)
on conflict (clave) do nothing;
insert into new_innovarte.configuracion (clave, valor)
values ('logo', '{"url":"https://static.wixstatic.com/media/c78faf_6406c07728144968971366602127833a~mv2.png/v1/crop/x_61,y_135,w_396,h_208/fill/w_350,h_184,al_c,q_90,enc_auto/logo.png"}'::jsonb)
on conflict (clave) do nothing;
