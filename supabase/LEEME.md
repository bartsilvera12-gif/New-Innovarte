# Supabase — InnovArte

Base de datos del panel de administración.

- **Instancia:** Supabase self-hosted en `187.77.247.54`
- **API:** `http://187.77.247.54:8000`
- **Schema:** `new_innovarte`
- **Estado:** ✅ instalado y con datos cargados

---

## ⚠️ Paso pendiente (en el servidor)

PostgREST lee los schemas que expone desde una **variable de entorno**, no desde la
base de datos. Hay que agregar el nuestro:

1. En el servidor de Supabase (`.env`, `docker-compose` o variables de Coolify),
   buscá **`PGRST_DB_SCHEMAS`**
2. Agregá al final: **`,new_innovarte`**
3. Reiniciá el contenedor **`rest`** (PostgREST)

El valor completo listo para pegar está en `PGRST_DB_SCHEMAS.txt`.

Hasta que esto se haga, la API responde `PGRST106 - Invalid schema`.

---

## Crear tu usuario del panel

1. Crear el usuario en **Authentication → Users** (email + contraseña, *Auto Confirm*)
2. Habilitarlo como administrador:

```sql
insert into new_innovarte.perfiles (id, email, nombre, rol)
select id, email, 'Adriana', 'admin'
from auth.users where email = 'TU-EMAIL@ejemplo.com';
```

Sin ese registro en `perfiles`, el usuario puede iniciar sesión pero **no puede
modificar nada** (así lo exigen las políticas de seguridad).

---

## Qué se creó

| Tabla | Para qué |
|---|---|
| `perfiles` | Usuarios habilitados para entrar al panel |
| `categorias` | Velas, Aromatizadores, Cerámica, Concreto, Resina |
| `productos` | Catálogo (línea `decor` o `insumos`) |
| `producto_imagenes` | Galería de fotos por producto |
| `colecciones` | Colecciones por temporada, con fechas y estado |
| `coleccion_productos` / `coleccion_categorias` | Qué incluye cada colección |
| `coleccion_home` | Las 4 tarjetas con video del inicio |
| `textos` | Todos los textos del sitio (español e inglés) |
| `configuracion` | Portada, insumos, contacto y logo |

Más la vista `colecciones_visibles` (calcula sola qué colección corresponde según
la fecha) y el bucket de storage **`innovarte-medios`**.

**Datos cargados:** 5 categorías · 82 productos · 31 textos · 4 tarjetas · 4 ajustes.

---

## Seguridad

- **Visitantes:** solo *leen* lo publicado (productos publicados, categorías activas,
  colecciones dentro de fecha). No pueden escribir.
- **Panel:** para escribir hay que estar logueado **y** tener un registro activo en
  `perfiles`. Lo controla la función `es_admin()`.
- **Bajas lógicas:** categorías y productos se marcan como eliminados en lugar de
  borrarse, así nunca se pierde información.

### Recordatorios de seguridad pendientes

- **Rotar la contraseña de Postgres** (quedó expuesta durante la instalación).
- La conexión usa `sslmode=disable`: viaja **sin cifrar**. Conviene `require`.
- El acceso es con el usuario `postgres` (superusuario) sobre una base **compartida
  con otros ~66 proyectos**. Lo ideal sería un usuario limitado a este schema.

---

## Nota sobre la instancia compartida

Esta base aloja muchos proyectos. Por eso:

- El bucket se llama `innovarte-medios` (no `medios`), siguiendo la convención del resto.
- Las políticas de storage van prefijadas con `innovarte_`.
- Al tocar `PGRST_DB_SCHEMAS` hay que **agregar al final**, nunca reemplazar la lista.
