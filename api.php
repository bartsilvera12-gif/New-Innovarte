<?php
/* ============================================================================
   InnovArte — Puente hacia Supabase
   ----------------------------------------------------------------------------
   El navegador no puede consultar directamente la API de Supabase porque el
   sitio va por HTTPS y la API por HTTP (los navegadores lo bloquean).

   Este archivo actúa de intermediario: el navegador le habla a tu propio
   dominio (seguro) y el servidor reenvía la consulta a Supabase.

   Seguridad: solo reenvía a la dirección fija de abajo y únicamente a las
   rutas de la API (rest/auth/storage). No sirve para alcanzar otros destinos.
   ============================================================================ */

const SUPABASE = 'http://187.77.247.54:8000';
const PERMITIDAS = ['rest/', 'auth/', 'storage/'];

// --- Ruta pedida ---------------------------------------------------------
// Admite las dos formas:  /api.php/rest/v1/tabla?select=...   (la que usa la web)
//                         /api.php?p=rest/v1/tabla&select=... (alternativa)
$consulta = '';
if (!empty($_SERVER['PATH_INFO'])) {
  $ruta = ltrim($_SERVER['PATH_INFO'], '/');
  $consulta = isset($_SERVER['QUERY_STRING']) ? $_SERVER['QUERY_STRING'] : '';
} else {
  $ruta = isset($_GET['p']) ? ltrim($_GET['p'], '/') : '';
  $extra = $_GET; unset($extra['p']);
  $consulta = count($extra) ? http_build_query($extra) : '';
}

$ok = false;
foreach (PERMITIDAS as $pre) { if (strpos($ruta, $pre) === 0) { $ok = true; break; } }
if (!$ok) {
  http_response_code(400);
  header('Content-Type: application/json');
  echo json_encode(['error' => 'Ruta no permitida']);
  exit;
}

$destino = SUPABASE . '/' . $ruta . ($consulta !== '' ? '?' . $consulta : '');

// --- Cabeceras a reenviar ------------------------------------------------
$entrada = function_exists('getallheaders') ? getallheaders() : [];
$reenviar = [];
foreach ($entrada as $k => $v) {
  $kl = strtolower($k);
  if (in_array($kl, ['apikey','authorization','content-type','accept','accept-profile',
                     'content-profile','prefer','range','x-client-info'], true)) {
    $reenviar[] = $k . ': ' . $v;
  }
}

$metodo = $_SERVER['REQUEST_METHOD'];
$cuerpo = file_get_contents('php://input');

// --- Petición ------------------------------------------------------------
$ch = curl_init($destino);
curl_setopt_array($ch, [
  CURLOPT_RETURNTRANSFER => true,
  CURLOPT_CUSTOMREQUEST  => $metodo,
  CURLOPT_HTTPHEADER     => $reenviar,
  CURLOPT_HEADER         => true,
  CURLOPT_TIMEOUT        => 20,
  CURLOPT_CONNECTTIMEOUT => 8,
]);
if ($cuerpo !== '' && $metodo !== 'GET') curl_setopt($ch, CURLOPT_POSTFIELDS, $cuerpo);

$respuesta = curl_exec($ch);
if ($respuesta === false) {
  http_response_code(502);
  header('Content-Type: application/json');
  echo json_encode(['error' => 'No se pudo contactar con Supabase: ' . curl_error($ch)]);
  curl_close($ch);
  exit;
}

$estado    = curl_getinfo($ch, CURLINFO_HTTP_CODE);
$tamCab    = curl_getinfo($ch, CURLINFO_HEADER_SIZE);
curl_close($ch);

$cabeceras = substr($respuesta, 0, $tamCab);
$contenido = substr($respuesta, $tamCab);

// --- Devolvemos la respuesta --------------------------------------------
http_response_code($estado);
foreach (explode("\r\n", $cabeceras) as $linea) {
  if (stripos($linea, 'Content-Type:') === 0 ||
      stripos($linea, 'Content-Range:') === 0 ||
      stripos($linea, 'Range-Unit:') === 0) {
    header($linea);
  }
}
header('Access-Control-Allow-Origin: *');
header('Access-Control-Allow-Headers: apikey,authorization,content-type,accept-profile,content-profile,prefer,range,x-client-info');
header('Access-Control-Allow-Methods: GET,POST,PATCH,DELETE,OPTIONS');

echo $contenido;
