<?php
// 1. Leemos el archivo .env
$env = parse_ini_file(__DIR__ . '/.env');
$apiKey = $env['MAKE_API_KEY'];
$webhookUrl = $env['MAKE_WEBHOOK_URL'];

// 2. Recibimos los datos del JavaScript
$inputJSON = file_get_contents('php://input');
$datos = json_decode($inputJSON, true);

// Verificamos si los datos llegaron bien desde el JS
if (!$datos) {
    http_response_code(400); // Bad Request
    echo "Error: No se recibieron datos validos del formulario.";
    exit;
}

// 3. Preparamos el paquete perfecto con cURL para Make.com
$payload = json_encode($datos); // Re-empaquetamos a JSON estricto

$ch = curl_init($webhookUrl);
curl_setopt($ch, CURLOPT_RETURNTRANSFER, true);
curl_setopt($ch, CURLOPT_POST, true);
curl_setopt($ch, CURLOPT_POSTFIELDS, $payload);
curl_setopt($ch, CURLOPT_HTTPHEADER, [
    'Content-Type: application/json',
    'x-make-apikey: ' . $apiKey,
    'Content-Length: ' . strlen($payload) // Make.com a veces exige saber el tamaño exacto
]);

// 4. Enviamos y vemos qué responde Make
$respuestaMake = curl_exec($ch);
$codigoEstado = curl_getinfo($ch, CURLINFO_HTTP_CODE);
$errorCurl = curl_error($ch);
curl_close($ch);

// 5. Le devolvemos la respuesta a tu JavaScript
if ($errorCurl) {
    http_response_code(500);
    echo "Error en el servidor al conectar con Make: " . $errorCurl;
} else {
    http_response_code($codigoEstado); // Le pasamos el código 200 (Éxito) de Make
    echo $respuestaMake; // Make suele devolver "Accepted"
}
?>