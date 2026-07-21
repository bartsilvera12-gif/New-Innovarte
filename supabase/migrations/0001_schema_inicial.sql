-- ============================================================================
-- InnovArte — Schema inicial
-- Ejecutar en: Supabase > SQL Editor > New query > Run
--
-- Crea el schema new_innovarte con todas las tablas del proyecto,
-- índices, restricciones, políticas de seguridad (RLS) y storage.
-- ============================================================================

create schema if not exists new_innovarte;

-- Necesario para gen_random_uuid()
create extension if not exists "pgcrypto";


-- ============================================================================
-- 1. PERFILES  (usuarios del panel, enlazados al login de Supabase)
-- ============================================================================
create table if not exists new_innovarte.perfiles (
  id          uuid primary key references auth.users(id) on delete cascade,
  email       text,
  nombre      text,
  rol         text not null default 'editor' check (rol in ('admin', 'editor')),
  activo      boolean not null default true,
  creado_en   timestamptz not null default now()
);

comment on table new_innovarte.perfiles is 'Usuarios habilitados para entrar al panel.';

-- Devuelve true si el usuario logueado puede administrar.
create or replace function new_innovarte.es_admin()
returns boolean
language sql
security definer
stable
set search_path = new_innovarte, public
as $$
  select exists (
    select 1 from new_innovarte.perfiles p
    where p.id = auth.uid() and p.activo = true
  );
$$;


-- ============================================================================
-- 2. CATEGORÍAS
-- ============================================================================
create table if not exists new_innovarte.categorias (
  id             uuid primary key default gen_random_uuid(),
  slug           text not null unique,
  nombre         text not null,
  nombre_en      text,
  descripcion    text,
  descripcion_en text,
  imagen         text,
  orden          integer not null default 0,
  activa         boolean not null default true,
  destacada      boolean not null default false,
  eliminada      boolean not null default false,   -- baja lógica
  creado_en      timestamptz not null default now(),
  actualizado_en timestamptz not null default now()
);

create index if not exists idx_categorias_orden  on new_innovarte.categorias (orden);
create index if not exists idx_categorias_activa on new_innovarte.categorias (activa) where eliminada = false;


-- ============================================================================
-- 3. PRODUCTOS
-- ============================================================================
create table if not exists new_innovarte.productos (
  id             uuid primary key default gen_random_uuid(),
  slug           text not null unique,
  nombre         text not null,
  categoria_id   uuid references new_innovarte.categorias(id) on delete set null,
  subtitulo      text,
  descripcion    text,
  imagen         text,
  linea          text not null default 'decor' check (linea in ('decor', 'insumos')),
  precio         numeric(10,2),
  stock          integer,
  destacado      boolean not null default false,
  orden          integer not null default 0,
  publicado      boolean not null default true,
  eliminado      boolean not null default false,   -- baja lógica
  seo_titulo     text,
  seo_descripcion text,
  creado_en      timestamptz not null default now(),
  actualizado_en timestamptz not null default now()
);

create index if not exists idx_productos_categoria on new_innovarte.productos (categoria_id);
create index if not exists idx_productos_linea     on new_innovarte.productos (linea);
create index if not exists idx_productos_visible   on new_innovarte.productos (publicado, eliminado);
create index if not exists idx_productos_orden     on new_innovarte.productos (orden);


-- ============================================================================
-- 4. IMÁGENES ADICIONALES DE PRODUCTO  (galería por producto)
-- ============================================================================
create table if not exists new_innovarte.producto_imagenes (
  id           uuid primary key default gen_random_uuid(),
  producto_id  uuid not null references new_innovarte.productos(id) on delete cascade,
  url          text not null,
  alt          text,
  orden        integer not null default 0,
  creado_en    timestamptz not null default now()
);

create index if not exists idx_prod_img on new_innovarte.producto_imagenes (producto_id, orden);


-- ============================================================================
-- 5. COLECCIONES POR TEMPORADA
-- ============================================================================
create table if not exists new_innovarte.colecciones (
  id             uuid primary key default gen_random_uuid(),
  slug           text not null unique,
  nombre         text not null,
  descripcion    text,
  portada        text,
  video          text,
  inicio         date,
  fin            date,
  estado         text not null default 'borrador'
                 check (estado in ('borrador', 'programada', 'activa', 'archivada')),
  destacada      boolean not null default false,
  orden          integer not null default 0,
  temporada      text,
  seo_titulo     text,
  seo_descripcion text,
  creado_en      timestamptz not null default now(),
  actualizado_en timestamptz not null default now(),
  constraint fechas_coherentes check (fin is null or inicio is null or fin >= inicio)
);

create index if not exists idx_colecciones_estado on new_innovarte.colecciones (estado);
create index if not exists idx_colecciones_fechas on new_innovarte.colecciones (inicio, fin);

-- Relación colecciones <-> productos
create table if not exists new_innovarte.coleccion_productos (
  coleccion_id uuid not null references new_innovarte.colecciones(id) on delete cascade,
  producto_id  uuid not null references new_innovarte.productos(id)  on delete cascade,
  orden        integer not null default 0,
  primary key (coleccion_id, producto_id)
);

-- Relación colecciones <-> categorías
create table if not exists new_innovarte.coleccion_categorias (
  coleccion_id uuid not null references new_innovarte.colecciones(id)  on delete cascade,
  categoria_id uuid not null references new_innovarte.categorias(id)   on delete cascade,
  primary key (coleccion_id, categoria_id)
);

-- Vista: colecciones que deben mostrarse hoy (estado + fechas)
create or replace view new_innovarte.colecciones_visibles as
  select *
  from new_innovarte.colecciones
  where estado in ('activa', 'programada')
    and (inicio is null or inicio <= current_date)
    and (fin    is null or fin    >= current_date)
  order by orden;


-- ============================================================================
-- 6. "NUESTRA COLECCIÓN"  (las 4 tarjetas con video del home)
-- ============================================================================
create table if not exists new_innovarte.coleccion_home (
  id             uuid primary key default gen_random_uuid(),
  clave          text not null unique,          -- velas, aromas, ceramica, concreto
  titulo         text not null,
  subtitulo      text,
  video          text,
  video_movil    text,
  poster         text,
  enlace         text,
  orden          integer not null default 0,
  activa         boolean not null default true,
  actualizado_en timestamptz not null default now()
);


-- ============================================================================
-- 7. TEXTOS DEL SITIO  (lo que se edita en el panel > Textos e Historia)
-- ============================================================================
create table if not exists new_innovarte.textos (
  clave          text primary key,              -- hero_h1, founder_quote, ...
  es             text,
  en             text,
  grupo          text,                          -- portada, historia, pie...
  etiqueta       text,                          -- nombre amigable en el panel
  tipo           text not null default 'texto' check (tipo in ('texto', 'area')),
  orden          integer not null default 0,
  actualizado_en timestamptz not null default now()
);

create index if not exists idx_textos_grupo on new_innovarte.textos (grupo, orden);


-- ============================================================================
-- 8. CONFIGURACIÓN  (hero, insumos y ajustes sueltos, en formato JSON)
-- ============================================================================
create table if not exists new_innovarte.configuracion (
  clave          text primary key,              -- 'hero', 'insumos', 'contacto'
  valor          jsonb not null default '{}'::jsonb,
  actualizado_en timestamptz not null default now()
);


-- ============================================================================
-- 9. ACTUALIZACIÓN AUTOMÁTICA DE actualizado_en
-- ============================================================================
create or replace function new_innovarte.tocar_actualizado_en()
returns trigger
language plpgsql
as $$
begin
  new.actualizado_en = now();
  return new;
end;
$$;

do $$
declare t text;
begin
  foreach t in array array['categorias','productos','colecciones','coleccion_home','textos','configuracion']
  loop
    execute format(
      'drop trigger if exists trg_%1$s_touch on new_innovarte.%1$I;
       create trigger trg_%1$s_touch before update on new_innovarte.%1$I
       for each row execute function new_innovarte.tocar_actualizado_en();', t);
  end loop;
end $$;


-- ============================================================================
-- 10. SEGURIDAD (RLS)
--     Público: solo lectura de lo publicado.  Panel: todo, si está logueado.
-- ============================================================================
alter table new_innovarte.perfiles            enable row level security;
alter table new_innovarte.categorias          enable row level security;
alter table new_innovarte.productos           enable row level security;
alter table new_innovarte.producto_imagenes   enable row level security;
alter table new_innovarte.colecciones         enable row level security;
alter table new_innovarte.coleccion_productos enable row level security;
alter table new_innovarte.coleccion_categorias enable row level security;
alter table new_innovarte.coleccion_home      enable row level security;
alter table new_innovarte.textos              enable row level security;
alter table new_innovarte.configuracion       enable row level security;

-- --- Perfiles: cada quien ve el suyo; solo admin gestiona ---
drop policy if exists perfil_propio on new_innovarte.perfiles;
create policy perfil_propio on new_innovarte.perfiles
  for select to authenticated using (id = auth.uid());

-- --- Lectura pública (solo contenido visible) ---
drop policy if exists categorias_lectura on new_innovarte.categorias;
create policy categorias_lectura on new_innovarte.categorias
  for select to anon, authenticated using (activa = true and eliminada = false);

drop policy if exists productos_lectura on new_innovarte.productos;
create policy productos_lectura on new_innovarte.productos
  for select to anon, authenticated using (publicado = true and eliminado = false);

drop policy if exists prod_img_lectura on new_innovarte.producto_imagenes;
create policy prod_img_lectura on new_innovarte.producto_imagenes
  for select to anon, authenticated using (true);

drop policy if exists colecciones_lectura on new_innovarte.colecciones;
create policy colecciones_lectura on new_innovarte.colecciones
  for select to anon, authenticated using (
    estado in ('activa','programada')
    and (inicio is null or inicio <= current_date)
    and (fin    is null or fin    >= current_date)
  );

drop policy if exists col_prod_lectura on new_innovarte.coleccion_productos;
create policy col_prod_lectura on new_innovarte.coleccion_productos
  for select to anon, authenticated using (true);

drop policy if exists col_cat_lectura on new_innovarte.coleccion_categorias;
create policy col_cat_lectura on new_innovarte.coleccion_categorias
  for select to anon, authenticated using (true);

drop policy if exists home_lectura on new_innovarte.coleccion_home;
create policy home_lectura on new_innovarte.coleccion_home
  for select to anon, authenticated using (activa = true);

drop policy if exists textos_lectura on new_innovarte.textos;
create policy textos_lectura on new_innovarte.textos
  for select to anon, authenticated using (true);

drop policy if exists config_lectura on new_innovarte.configuracion;
create policy config_lectura on new_innovarte.configuracion
  for select to anon, authenticated using (true);

-- --- Escritura: solo usuarios del panel ---
do $$
declare t text;
begin
  foreach t in array array['categorias','productos','producto_imagenes','colecciones',
                           'coleccion_productos','coleccion_categorias','coleccion_home',
                           'textos','configuracion']
  loop
    execute format(
      'drop policy if exists %1$s_escritura on new_innovarte.%1$I;
       create policy %1$s_escritura on new_innovarte.%1$I
         for all to authenticated
         using (new_innovarte.es_admin())
         with check (new_innovarte.es_admin());', t);
  end loop;
end $$;


-- ============================================================================
-- 11. PERMISOS DE ACCESO AL SCHEMA (para la API de Supabase)
-- ============================================================================
grant usage on schema new_innovarte to anon, authenticated;
grant select on all tables in schema new_innovarte to anon, authenticated;
grant insert, update, delete on all tables in schema new_innovarte to authenticated;

alter default privileges in schema new_innovarte
  grant select on tables to anon, authenticated;
alter default privileges in schema new_innovarte
  grant insert, update, delete on tables to authenticated;


-- ============================================================================
-- 12. STORAGE  (imágenes y videos)
-- ============================================================================
-- NOTA: storage.buckets y storage.objects son TABLAS COMPARTIDAS con los demás
-- proyectos de esta instancia. Por eso el bucket y las políticas van prefijados
-- con "innovarte", siguiendo la convención del resto (saltatop-, tesapp-, etc.).

insert into storage.buckets (id, name, public)
values ('innovarte-medios', 'innovarte-medios', true)
on conflict (id) do nothing;

drop policy if exists innovarte_medios_lectura on storage.objects;
create policy innovarte_medios_lectura on storage.objects
  for select to anon, authenticated using (bucket_id = 'innovarte-medios');

drop policy if exists innovarte_medios_subida on storage.objects;
create policy innovarte_medios_subida on storage.objects
  for insert to authenticated with check (bucket_id = 'innovarte-medios');

drop policy if exists innovarte_medios_edicion on storage.objects;
create policy innovarte_medios_edicion on storage.objects
  for update to authenticated using (bucket_id = 'innovarte-medios');

drop policy if exists innovarte_medios_borrado on storage.objects;
create policy innovarte_medios_borrado on storage.objects
  for delete to authenticated using (bucket_id = 'innovarte-medios');
