/* ============================================================================
   InnovArte — Conexión con Supabase
   ----------------------------------------------------------------------------
   La clave "anon" es PÚBLICA por diseño: puede ir en el navegador sin riesgo.
   Lo que protege los datos son las políticas de seguridad (RLS) del schema:
   un visitante solo puede LEER lo publicado, y para escribir hay que iniciar
   sesión con un usuario que tenga perfil de administrador.

   La clave "service_role" NUNCA debe ponerse acá ni en ningún archivo del sitio.
   ============================================================================ */
window.INNOV_SB = {
  url: 'http://187.77.247.54:8000',
  anonKey: 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJyb2xlIjoiYW5vbiIsImlzcyI6InN1cGFiYXNlIiwiaWF0IjoxNzc0MTAxNDYxLCJleHAiOjE5MzE3ODE0NjF9.7_wAph8IolPMXtgfpezSwS5XR62IdD__qhqCywLDp3Q',
  schema: 'new_innovarte',
  bucket: 'innovarte-medios'
};

/* Crea el cliente de Supabase. Devuelve null si la librería no cargó
   (en ese caso el sitio sigue funcionando con los archivos locales). */
window.INNOV_crearCliente = function () {
  if (!window.supabase || !window.supabase.createClient) return null;
  var c = window.INNOV_SB;
  return window.supabase.createClient(c.url, c.anonKey, {
    db: { schema: c.schema },
    auth: {
      persistSession: true,
      autoRefreshToken: true,
      storageKey: 'innovarte-sesion'
    }
  });
};
