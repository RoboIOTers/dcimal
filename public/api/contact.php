<?php
/**
 * DCIMAL Contact Form Backend
 *
 * Sends email via Hostinger SMTP (authenticated) instead of mail().
 * SMTP credentials are injected at deploy time via smtp_config.php.
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
// CONFIGURATION
// ============================================
$config_file = __DIR__ . '/smtp_config.php';
if (!file_exists($config_file)) {
    http_response_code(500);
    echo json_encode(['error' => 'Server mail configuration missing']);
    exit();
}
require $config_file;
// Expects: $smtp_host, $smtp_port, $smtp_user, $smtp_pass

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

// Build email content
$subject = "New Contact: {$name}" . ($company !== 'Not specified' ? " ({$company})" : '');

$body  = "New contact form submission from {$site_name}\r\n";
$body .= "=============================================\r\n\r\n";
$body .= "Name:    {$name}\r\n";
$body .= "Email:   {$email}\r\n";
$body .= "Company: {$company}\r\n\r\n";
$body .= "Message:\r\n";
$body .= "---------------------------------------------\r\n";
$body .= "{$message}\r\n";
$body .= "---------------------------------------------\r\n\r\n";
$body .= "Sent at: " . date('Y-m-d H:i:s T') . "\r\n";

// ============================================
// SMTP SEND (SSL, port 465)
// ============================================
function smtp_send($host, $port, $user, $pass, $from, $to, $subject, $body, $reply_to, $from_name) {
    $socket = @stream_socket_client(
        "ssl://{$host}:{$port}",
        $errno, $errstr, 30,
        STREAM_CLIENT_CONNECT,
        stream_context_create(['ssl' => ['verify_peer' => false, 'verify_peer_name' => false]])
    );

    if (!$socket) {
        return "Connection failed: {$errstr} ({$errno})";
    }

    $resp = fgets($socket, 512);
    if (substr($resp, 0, 3) !== '220') return "Server didn't respond with 220: {$resp}";

    // EHLO
    fwrite($socket, "EHLO dcimal.in\r\n");
    $resp = '';
    while ($line = fgets($socket, 512)) {
        $resp .= $line;
        if (substr($line, 3, 1) === ' ') break;
    }

    // AUTH LOGIN
    fwrite($socket, "AUTH LOGIN\r\n");
    $resp = fgets($socket, 512);
    if (substr($resp, 0, 3) !== '334') return "AUTH LOGIN failed: {$resp}";

    fwrite($socket, base64_encode($user) . "\r\n");
    $resp = fgets($socket, 512);
    if (substr($resp, 0, 3) !== '334') return "Username rejected: {$resp}";

    fwrite($socket, base64_encode($pass) . "\r\n");
    $resp = fgets($socket, 512);
    if (substr($resp, 0, 3) !== '235') return "Authentication failed: {$resp}";

    // MAIL FROM
    fwrite($socket, "MAIL FROM:<{$from}>\r\n");
    $resp = fgets($socket, 512);
    if (substr($resp, 0, 3) !== '250') return "MAIL FROM rejected: {$resp}";

    // RCPT TO
    fwrite($socket, "RCPT TO:<{$to}>\r\n");
    $resp = fgets($socket, 512);
    if (substr($resp, 0, 3) !== '250') return "RCPT TO rejected: {$resp}";

    // DATA
    fwrite($socket, "DATA\r\n");
    $resp = fgets($socket, 512);
    if (substr($resp, 0, 3) !== '354') return "DATA rejected: {$resp}";

    // Headers + body
    $msg  = "From: {$from_name} <{$from}>\r\n";
    $msg .= "To: <{$to}>\r\n";
    $msg .= "Reply-To: {$reply_to}\r\n";
    $msg .= "Subject: {$subject}\r\n";
    $msg .= "MIME-Version: 1.0\r\n";
    $msg .= "Content-Type: text/plain; charset=UTF-8\r\n";
    $msg .= "X-Mailer: DCIMAL-Contact/2.0\r\n";
    $msg .= "\r\n";
    $msg .= str_replace("\r\n.\r\n", "\r\n..\r\n", $body);
    $msg .= "\r\n.\r\n";

    fwrite($socket, $msg);
    $resp = fgets($socket, 512);
    if (substr($resp, 0, 3) !== '250') return "Message rejected: {$resp}";

    // QUIT
    fwrite($socket, "QUIT\r\n");
    fclose($socket);

    return true;
}

$result = smtp_send(
    $smtp_host, $smtp_port, $smtp_user, $smtp_pass,
    $smtp_user,          // from address (noreply@dcimal.in)
    $recipient,          // to address (info@dcimal.in)
    $subject,
    $body,
    "{$name} <{$email}>", // reply-to
    $site_name             // from name
);

if ($result === true) {
    http_response_code(200);
    echo json_encode(['success' => true, 'message' => 'Message sent successfully']);
} else {
    http_response_code(500);
    echo json_encode(['error' => 'Failed to send message. Please try again.', 'debug' => $result]);
}
?>
