# Handoff: InnovArte Handmade — Tienda de velas artesanales

## Overview
Sitio web multi-página (rediseño) para **InnovArte Handmade / Innovarte Candles**, marca de velas de soya artesanales, fragancia para el hogar, souvenirs e insumos para hacer velas. Fundadora: **Adriana Saieg** (Paraguay & Estados Unidos). Estética elegante estilo editorial de lujo, en tonos **pastel rosado/blush + crema/beige**, con carrito funcional, idioma ES/EN y animaciones suaves.

## About the Design Files
Los archivos incluidos son **referencias de diseño hechas en HTML** (prototipos que muestran el look & feel y el comportamiento deseado), **no** código de producción para copiar tal cual. Están escritos como "Design Components" (`.dc.html`) con un runtime propio (`support.js`) que renderiza plantillas tipo React con estilos inline. La tarea es **recrear estos diseños en el entorno del proyecto destino** (React/Next, Vue, etc.) usando sus patrones y librerías; si no hay entorno aún, elegir el framework más apropiado (recomendado: React + Vite o Next.js) e implementarlos ahí.

## Fidelity
**Alta fidelidad (hifi).** Colores, tipografía, espaciado e interacciones son finales. Recrear la UI con fidelidad usando el sistema del codebase destino.

## Tech / Estructura actual
- Cada `.dc.html` = una página o un componente. El runtime (`support.js`) compila la plantilla (markup con holes `{{ }}` y `<sc-for>`/`<sc-if>`) + una clase `Component extends DCLogic` (equivalente a un componente React con estado).
- **Estilos: inline** (sin CSS externo salvo `@keyframes`, `@font-face`, media queries en `<helmet><style>`).
- **Estado compartido entre páginas** vía `window` globals + `localStorage` + `BroadcastChannel` (ver Carrito e Idioma).

### Mapa de archivos
| Archivo | Rol |
|---|---|
| `InnovArte Handmade.dc.html` | **Inicio** (hero + marquee + colecciones destacadas + carrusel de velas + colecciones + historia teaser + personalización teaser + galería teaser) |
| `catalogo.dc.html` | **Tienda**: filtros por colección + grid de productos |
| `historia.dc.html` | **Historia**: sobre Adriana + valores |
| `personalizacion.dc.html` | **Personalización**: 4 pasos + formulario (mailto) |
| `galeria.dc.html` | **Galería**: grid tipo masonry + CTA Instagram |
| `SiteNav.dc.html` | Cabecera reutilizable: barra anuncio + nav + toggle idioma + carrito (drawer) |
| `SiteFooter.dc.html` | Pie reutilizable: contacto + navegación |
| `PromoCard.dc.html` | Card reutilizable de "Colección destacada" (imagen + título + aroma + botón) |
| `cart-store.js` | Carrito: `window.InnovCart` (localStorage + BroadcastChannel entre páginas) |
| `i18n.js` | Traducción ES/EN: `window.InnovI18N` (ES = texto en HTML; EN = diccionario) |
| `products.js` | Datos: `window.INNOV_PRODUCTS`, `INNOV_CATS`, `INNOV_LOGO`, `INNOV_CONTACT` |
| `image-slot.js` | Web component `<image-slot>` (placeholder de imagen arrastrable) |
| `support.js` | Runtime del Design Component (no reimplementar; sustituir por el framework destino) |

## Design Tokens

### Colores
- Fondo principal (blush pastel): `#F9EBEB`
- Banda beige/crema (nav, pie, marquee, valores): `#EAD5CC`
- Superficie crema (botones claros / campos): `#FBF4E7`
- Panel de card producto: `#F3EBDC`
- Placeholder imagen: `#ECDDD2`
- Texto principal (ink): `#39302A`
- Texto secundario (taupe): `#6B5D51`
- Acento dorado (eyebrows, links): `#9C7A50`
- Acento rosa (botones/CTA, badge): `#C89A8C` (hover `#B98979`)
- Rosa profundo (títulos sobre pastel / botón promo hover): `#7E5A52` / `#7E3B44`
- Texto sobre imágenes: `#fff` / `#F3E4D8`

### Tipografía
- Display / títulos: **Cormorant Garamond** (400/500; itálica para descripciones)
- Cuerpo / UI: **Jost** (300/400/500)
- Eyebrows: 12px, `letter-spacing:.4em`, `text-transform:uppercase`, color `#9C7A50`
- H1 hero: `clamp(44px,7vw,94px)`; H2 sección: `clamp(34px,4.5vw,58px)`

### Radios / sombras
- Cards: 8–12px; botones píldora: 40px; botones rectos: 2px
- Sombra card: `0 14px 34px -26px rgba(57,48,42,.4)`; hover: `0 36px 56px -30px rgba(200,154,140,.6)`
- Transiciones: 0.4–0.6s `cubic-bezier(.22,.61,.36,1)`

## Screens / Views

### Inicio (`InnovArte Handmade.dc.html`)
- **Hero** (88vh): imagen a pantalla completa (`object-fit:cover`) con **paneo/zoom lento** (`@keyframes panzoom`), **degradado** para legibilidad, y overlays animados: **pétalos cayendo** (`.petal`, `@keyframes petal` animando `top` -6%→106% + `translateX(--dx)` + rotación), **resplandor de llamas** (`.flame-glow`, `@keyframes glowp`), **rayos de amanecer** (`.cine-rays`, `@keyframes rays`), **cortina** (`.cine-curtain`, `@keyframes sway`). Texto centrado (eyebrow + H1 + subtítulo + 2 CTAs). Selector de 3 variantes de portada (dots 1/2/3).
- **Marquee** infinito (banda `#EAD5CC`).
- **Colecciones destacadas**: 3 `PromoCard` grandes (imagen vertical, overlay, título + aroma en itálica + botón "Ver colección"). Grid 3 col → 2 (≤1000px) → carrusel scroll-snap 86% (≤640px). Datos en array `promos` de la lógica.
- **Descubre nuestras velas**: carrusel horizontal (flechas + scroll-snap, sin scrollbar) de 14 productos reales.
- **Nuestras colecciones**: 4 cards editoriales (categorías) con título blanco sobre imagen.
- **Historia teaser**, **Personalización teaser** (banda pastel), **Galería teaser** (4 imágenes + CTA IG).

### Tienda (`catalogo.dc.html`)
Encabezado + barra de filtros sticky (Todo + 4 categorías, activa en `#C89A8C`) + grid 4 col de cards de producto (imagen 1:1, nombre, colección, botón **Añadir** crema). Filtro por `location.hash` (#signature, #souvenirs, #fragrance, #supplies).

### Historia (`historia.dc.html`)
Encabezado (banda pastel) + **una sección** con foto de Adriana + relato combinado (3 párrafos, cierre en itálica) + sección **Valores** (3 columnas, banda `#EAD5CC`).

### Personalización (`personalizacion.dc.html`)
Encabezado + 4 pasos numerados + formulario (Nombre, Correo/Tel, Tipo de evento, Cantidad, Idea) que arma un **mailto** a `innovartecandles@gmail.com`.

### Galería (`galeria.dc.html`)
Encabezado + grid tipo masonry (algunas celdas `grid-row:span 2`) con hover zoom + CTA "Seguir en Instagram".

## Interactions & Behavior
- **Carrito** (`window.InnovCart`): `add/inc/dec/remove`, persistente en `localStorage` (`innov_cart_v1`). Como las páginas son documentos separados, se sincroniza vía `BroadcastChannel('innov-cart')`: al añadir se emite `update` (refresca badge/drawer) y `open` (abre drawer). Checkout = `mailto` con el listado. En el codebase destino esto se reemplaza por estado global (Context/store) y, si aplica, backend real.
- **Idioma ES/EN** (`window.InnovI18N`): ES = texto literal en el HTML; EN = diccionario. `apply(lang)` recorre `[data-i18n]` y `[data-i18n-ph]` (placeholders) y hace swap; se re-aplica en cada render. En destino: usar i18n del framework (react-i18next, etc.).
- **Reveal on scroll**: `IntersectionObserver` sobre `[data-reveal]` (opacity/translateY).
- **Hover**: cards elevan + sombra; imágenes `scale(1.04–1.07)`; botones cambian a rosa/crema.
- **Carruseles**: `scroll-snap-type:x mandatory`, scrollbar oculto; flechas hacen `scrollBy`.

## State Management
- `cart`: array `{id,name,img,qty}` (localStorage + broadcast).
- `lang`: `'es'|'en'` (localStorage `innov_lang`).
- Home: `hero` (1|2|3) para variante de portada.
- Catálogo: `filter` (categoría activa).

## Assets
- **Logo**: `INNOV_LOGO` en `products.js` (PNG en CDN de Wix, fondo transparente).
- **Fotos de producto**: URLs del CDN de Wix en `products.js` (`static.wixstatic.com`). Recomendado: descargar y alojar en el codebase destino / CDN propio.
- **Portada** e imagen de Adriana: en `uploads/`.
- **Contacto** (`INNOV_CONTACT`): email `innovartecandles@gmail.com`, Instagram `@innovartecandles`.

## Notas
- Sin precios (por decisión del cliente): el carrito funciona como "solicitud" por correo.
- Marca y textos reales recuperados del sitio anterior (Wix). Ubicación: Paraguay & Estados Unidos.
