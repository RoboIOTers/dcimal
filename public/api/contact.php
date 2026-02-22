<?php
/**
 * DCIMAL Contact Form Backend
 *
 * Designed for Hostinger hosting — uses PHP mail() which works natively
 * with Hostinger's built-in email service.
 *
 * Configuration:
 * - Set $recipient to your Hostinger email address
 * - Ensure your Hostinger email account is set up (hPanel > Emails)
 * - This file should be deployed to your Hostinger public_html/api/ directory
 */

header('Content-Type: application/json');
header('Access-Control-Allow-Origin: *');
header('Access-Control-Allow-Methods: POST, OPTIONS');
header('Access-Control-Allow-Headers: Content-Type');

// Handle preflight
if ($_SERVER['REQUEST_METHOD'] === 'OPTIONS') {
    http_response_code(200);
    exit();
}

if ($_SERVER['REQUEST_METHOD'] !== 'POST') {
    http_response_code(405);
    echo json_encode(['error' => 'Method not allowed']);
    exit();
}

// ============================================
// CONFIGURATION — Update these for your setup
// ============================================
$recipient = 'info@dcimal.in';
$site_name = 'DCIMAL Website';
// ============================================

$input = json_decode(file_get_contents('php://input'), true);

if (!$input) {
    http_response_code(400);
    echo json_encode(['error' => 'Invalid request body']);
    exit();
}

$name    = htmlspecialchars(strip_tags(trim($input['name'] ?? '')));
$email   = filter_var(trim($input['email'] ?? ''), FILTER_VALIDATE_EMAIL);
$company = htmlspecialchars(strip_tags(trim($input['company'] ?? 'Not specified')));
$message = htmlspecialchars(strip_tags(trim($input['message'] ?? '')));

// Validation
if (empty($name) || !$email || empty($message)) {
    http_response_code(400);
    echo json_encode(['error' => 'Name, valid email, and message are required']);
    exit();
}

// Build email
$subject = "New Contact: {$name}" . ($company !== 'Not specified' ? " ({$company})" : '');

$body = "New contact form submission from {$site_name}\n";
$body .= "=============================================\n\n";
$body .= "Name:    {$name}\n";
$body .= "Email:   {$email}\n";
$body .= "Company: {$company}\n\n";
$body .= "Message:\n";
$body .= "---------------------------------------------\n";
$body .= "{$message}\n";
$body .= "---------------------------------------------\n\n";
$body .= "Sent at: " . date('Y-m-d H:i:s T') . "\n";

$headers  = "From: {$site_name} <noreply@dcimal.in>\r\n";
$headers .= "Reply-To: {$name} <{$email}>\r\n";
$headers .= "X-Mailer: DCIMAL-Contact/1.0\r\n";
$headers .= "Content-Type: text/plain; charset=UTF-8\r\n";

$sent = mail($recipient, $subject, $body, $headers);

if ($sent) {
    http_response_code(200);
    echo json_encode(['success' => true, 'message' => 'Message sent successfully']);
} else {
    http_response_code(500);
    echo json_encode(['error' => 'Failed to send message. Please try again.']);
}
?>
