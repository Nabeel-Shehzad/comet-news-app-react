<?php
// Debug mode - uncomment these lines for troubleshooting
ini_set('display_errors', 1);
ini_set('display_startup_errors', 1);
error_reporting(E_ALL);

// Set headers to allow CORS from your domain
header('Access-Control-Allow-Origin: https://cometnews.ai');
header('Access-Control-Allow-Methods: GET, POST, OPTIONS');
header('Access-Control-Allow-Headers: Content-Type, X-Requested-With');
header('Content-Type: application/json');

// Handle preflight OPTIONS request
if ($_SERVER['REQUEST_METHOD'] === 'OPTIONS') {
  http_response_code(200);
  exit;
}

// API Key for NewsAPI.org
$api_key = '9e86b086579e4564ade2222bd30716ff';
$base_url = 'https://newsapi.org/v2';

// Get parameters from the request
$endpoint = isset($_GET['endpoint']) ? $_GET['endpoint'] : 'top-headlines';
$params = $_GET;

// Remove the endpoint parameter as we're using it to determine the API endpoint
unset($params['endpoint']);

// Add the API key
$params['apiKey'] = $api_key;

// Build the query string
$query_string = http_build_query($params);

// Build the full URL
$url = $base_url . '/' . $endpoint . '?' . $query_string;

// Make the request to the NewsAPI
$ch = curl_init();
curl_setopt($ch, CURLOPT_URL, $url);
curl_setopt($ch, CURLOPT_RETURNTRANSFER, true);
curl_setopt($ch, CURLOPT_SSL_VERIFYPEER, false);

// Add required User-Agent header
curl_setopt($ch, CURLOPT_HTTPHEADER, [
  'User-Agent: Comet News App/1.0 (cometnews.ai; contact@instrudentive.com)'
]);

// Enable debug mode
curl_setopt($ch, CURLOPT_VERBOSE, true);

$response = curl_exec($ch);

// Check for errors
if ($response === false) {
  $error = curl_error($ch);
  $http_code = curl_getinfo($ch, CURLINFO_HTTP_CODE);
  echo json_encode([
    'status' => 'error',
    'code' => $http_code,
    'message' => $error,
    'proxy_info' => 'Error in PHP proxy'
  ]);
  curl_close($ch);
  exit;
}

$http_code = curl_getinfo($ch, CURLINFO_HTTP_CODE);
curl_close($ch);

// Return the response with appropriate HTTP status code
http_response_code($http_code);
echo $response;
