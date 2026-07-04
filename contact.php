<?php

declare(strict_types=1);

/**
 * Liftora — Independent Garage Door Matching Platform
 * File: contact.php
 * Handles contact/request form submissions and returns JSON.
 */

ini_set('display_errors', '0');
ini_set('log_errors', '1');

header('Content-Type: application/json; charset=utf-8');

$response = [
    'success' => false,
    'message' => 'Unable to process the request. Please try again.'
];

function send_json(array $payload, int $statusCode = 200): void
{
    http_response_code($statusCode);
    echo json_encode($payload, JSON_UNESCAPED_SLASHES | JSON_UNESCAPED_UNICODE);
    exit;
}

function clean_text(?string $value, int $maxLength = 1000): string
{
    $value = trim((string) $value);
    $value = strip_tags($value);
    $value = preg_replace('/[\x00-\x1F\x7F]/u', '', $value);
    $value = preg_replace('/\s+/', ' ', $value);

    if (mb_strlen($value, 'UTF-8') > $maxLength) {
        $value = mb_substr($value, 0, $maxLength, 'UTF-8');
    }

    return $value;
}

function clean_multiline(?string $value, int $maxLength = 4000): string
{
    $value = trim((string) $value);
    $value = strip_tags($value);
    $value = str_replace(["\r\n", "\r"], "\n", $value);
    $value = preg_replace('/[^\P{C}\n\t]/u', '', $value);
    $value = preg_replace("/\n{3,}/", "\n\n", $value);

    if (mb_strlen($value, 'UTF-8') > $maxLength) {
        $value = mb_substr($value, 0, $maxLength, 'UTF-8');
    }

    return $value;
}

function is_valid_phone(string $phone): bool
{
    $digits = preg_replace('/\D+/', '', $phone);
    return strlen($digits) >= 7 && strlen($digits) <= 16;
}

function has_header_injection(string $value): bool
{
    return preg_match('/[\r\n]/', $value) === 1;
}

if ($_SERVER['REQUEST_METHOD'] !== 'POST') {
    send_json([
        'success' => false,
        'message' => 'Invalid request method.'
    ], 405);
}

/**
 * Honeypot field.
 * Bots often fill hidden fields. If this is filled, return a generic success
 * without sending mail so real users are not exposed to anti-spam details.
 */
$website = clean_text($_POST['website'] ?? '', 300);

if ($website !== '') {
    send_json([
        'success' => true,
        'message' => 'Thank you. Your garage door request has been received.'
    ]);
}

$name = clean_text($_POST['name'] ?? '', 120);
$email = clean_text($_POST['email'] ?? '', 180);
$phone = clean_text($_POST['phone'] ?? '', 80);
$location = clean_text($_POST['location'] ?? ($_POST['zip'] ?? ''), 160);
$service = clean_text($_POST['service'] ?? '', 180);
$message = clean_multiline($_POST['message'] ?? '', 4000);

$allowedServices = [
    'Garage Door Repair',
    'Garage Door Installation',
    'Garage Door Replacement',
    'Garage Door Opener Services',
    'Spring & Cable Repair',
    'Track, Roller & Panel Repair',
    'Not Sure Yet'
];

$errors = [];

if ($name === '') {
    $errors[] = 'Name is required.';
}

if ($email === '') {
    $errors[] = 'Email is required.';
} elseif (!filter_var($email, FILTER_VALIDATE_EMAIL) || has_header_injection($email)) {
    $errors[] = 'Please enter a valid email address.';
}

if ($phone === '') {
    $errors[] = 'Phone is required.';
} elseif (!is_valid_phone($phone)) {
    $errors[] = 'Please enter a valid phone number.';
}

if ($location === '') {
    $errors[] = 'ZIP or city is required.';
}

if ($service === '') {
    $errors[] = 'Service need is required.';
} elseif (!in_array($service, $allowedServices, true)) {
    $errors[] = 'Please choose a valid service need.';
}

if ($message === '') {
    $errors[] = 'Project details are required.';
} elseif (mb_strlen($message, 'UTF-8') < 10) {
    $errors[] = 'Please add a few more details about your garage door request.';
}

if (!empty($errors)) {
    send_json([
        'success' => false,
        'message' => implode(' ', $errors)
    ], 422);
}

/**
 * Change this email to the real receiving inbox when the site is deployed.
 * It should match the brand email configured in assets/js/config.js.
 */
$recipient = 'support@liftora.com';

$subject = 'New Liftora Garage Door Request';

$submittedAt = date('Y-m-d H:i:s T');
$userIp = $_SERVER['REMOTE_ADDR'] ?? 'Unavailable';
$userAgent = $_SERVER['HTTP_USER_AGENT'] ?? 'Unavailable';

$emailBody = <<<BODY
New garage door request submitted through Liftora.

Name:
{$name}

Email:
{$email}

Phone:
{$phone}

ZIP / City:
{$location}

Service Need:
{$service}

Project Details:
{$message}

Platform Notice:
Liftora is an independent garage door matching platform. Liftora does not perform garage door repair, installation, replacement, inspection, manufacturing, or contracting services. Provider availability, pricing, credentials, licensing, insurance, warranties, timelines, and service terms are supplied by participating providers and should be reviewed directly with them.

Submission Metadata:
Submitted At: {$submittedAt}
IP Address: {$userIp}
User Agent: {$userAgent}
BODY;

$headers = [];

$headers[] = 'MIME-Version: 1.0';
$headers[] = 'Content-Type: text/plain; charset=UTF-8';
$headers[] = 'From: Liftora Website <no-reply@liftora.com>';
$headers[] = 'Reply-To: ' . $name . ' <' . $email . '>';
$headers[] = 'X-Mailer: PHP/' . phpversion();

$mailSent = @mail(
    $recipient,
    '=?UTF-8?B?' . base64_encode($subject) . '?=',
    $emailBody,
    implode("\r\n", $headers)
);

if (!$mailSent) {
    error_log('Liftora contact form mail() failed for recipient: ' . $recipient);

    send_json([
        'success' => false,
        'message' => 'Your request could not be sent right now. Please try again or contact the platform by email.'
    ], 500);
}

send_json([
    'success' => true,
    'message' => 'Thank you. Your garage door request has been received.'
]);
