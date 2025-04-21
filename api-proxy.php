<?php
// Set headers to allow CORS
header('Access-Control-Allow-Origin: *');
header('Content-Type: application/json');
header('Access-Control-Allow-Methods: GET');

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
  'User-Agent: Comet News App/1.0 (instrudentive.com; contact@instrudentive.com)'
]);

// Enable debug mode if needed
// curl_setopt($ch, CURLOPT_VERBOSE, true);

$response = curl_exec($ch);
$http_code = curl_getinfo($ch, CURLINFO_HTTP_CODE);

// Debug error if the request failed
if ($response === false) {
  $error = curl_error($ch);
  echo json_encode(['error' => $error, 'status' => 'error', 'code' => $http_code]);
  curl_close($ch);
  exit;
}

curl_close($ch);

// Return the response with appropriate HTTP status code
http_response_code($http_code);
echo $response;
