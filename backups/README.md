# Respaldos de contenido — InnovArte

Cada archivo `innovarte-backup-AAAA-MM-DD.json` es una **copia completa del contenido editable**
de la base (Supabase, schema `new_innovarte`) al momento de generarlo.

## Qué contiene cada respaldo
- `tablas.productos` — todos los productos (todas las columnas, incluidos los marcados como eliminados).
- `tablas.categorias` — categorías.
- `tablas.configuracion` — hero, aromas, sub-secciones, insumos, etc.
- `tablas.coleccion_home` — las 4 tarjetas de "Nuestra Colección".
- `tablas.textos` — textos del sitio.
- `nombres_descriptivos_git` — mapa `slug → nombre descriptivo` tomado de `products.js` (git),
  útil como referencia para restaurar nombres si en la base quedaron como código (V001, D001…).

## Cómo restaurar (referencia rápida)
La restauración se hace escribiendo de vuelta en la base (paquete `pg`, conexión directa a Postgres),
emparejando por `slug`. Por ejemplo, para volver a poner los nombres descriptivos:
recorrer `nombres_descriptivos_git` y hacer
`UPDATE new_innovarte.productos SET nombre=$nombre WHERE slug=$slug`.

> Nota: estos archivos son solo datos públicos del catálogo (no contienen claves ni datos sensibles).
