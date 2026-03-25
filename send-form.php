<?php
header('Content-Type: application/json');

// ============================================
// ⚙️ НАСТРОЙКИ
// ============================================
define('BOT_TOKEN', '8605692326:AAFwtLvSH5Dxt-jo_mmVrgo5mg6mTWWKMPA');
define('CHAT_ID', '-1003897560126');
define('ADMIN_EMAIL', 'info@bio-ecopro.ru');

// ============================================
// ПОЛУЧАЕМ ДАННЫЕ
// ============================================
if ($_SERVER['REQUEST_METHOD'] !== 'POST') {
    echo json_encode(['success' => false, 'error' => 'Метод не поддерживается']);
    exit;
}

$name = trim($_POST['name'] ?? '');
$phone = trim($_POST['phone'] ?? '');
$email = trim($_POST['email'] ?? '');
$city = trim($_POST['city'] ?? '');
$message = trim($_POST['message'] ?? '');
$captcha = trim($_POST['captcha'] ?? '');
$captcha_result = trim($_POST['captcha_result'] ?? '');
$selected_model = trim($_POST['selected_model'] ?? '');

// Валидация
if (empty($name) || empty($phone) || empty($city)) {
    echo json_encode(['success' => false, 'error' => 'Заполните обязательные поля (имя, телефон, город)']);
    exit;
}

$cleanPhone = preg_replace('/\D/', '', $phone);
if (!preg_match('/^7\d{10}$/', $cleanPhone)) {
    echo json_encode(['success' => false, 'error' => 'Неверный формат телефона']);
    exit;
}

if (!empty($email) && !filter_var($email, FILTER_VALIDATE_EMAIL)) {
    echo json_encode(['success' => false, 'error' => 'Неверный формат email']);
    exit;
}

if (!is_numeric($captcha) || (int)$captcha !== (int)$captcha_result) {
    echo json_encode(['success' => false, 'error' => 'Неверный ответ на проверочный вопрос']);
    exit;
}

// ============================================
// ТЕКСТ СООБЩЕНИЯ
// ============================================
$text = "🔥 <b>Новая заявка с сайта БИОЭКОПРО</b>\n\n";
$text .= "👤 <b>Имя:</b> $name\n";
$text .= "📞 <b>Телефон:</b> $phone\n";
$text .= "📧 <b>Email:</b> $email\n";
$text .= "🏙️ <b>Город:</b> $city\n";
if (!empty($selected_model)) {
    $text .= "🚽 <b>Выбрана модель:</b> $selected_model\n";
}
if (!empty($message)) {
    $text .= "💬 <b>Сообщение:</b> $message\n";
}
$text .= "\n⏱️ <i>" . date('d.m.Y H:i:s') . "</i>";

// ============================================
// ФУНКЦИЯ ОТПРАВКИ В TELEGRAM (file_get_contents)
// ============================================
function sendTelegramMessage($text) {
    $url = "https://api.telegram.org/bot" . BOT_TOKEN . "/sendMessage";
    $data = [
        'chat_id' => CHAT_ID,
        'text' => $text,
        'parse_mode' => 'HTML'
    ];
    $options = [
        'http' => [
            'header'  => "Content-type: application/x-www-form-urlencoded\r\n",
            'method'  => 'POST',
            'content' => http_build_query($data),
            'timeout' => 10
        ]
    ];
    $context = stream_context_create($options);
    $result = @file_get_contents($url, false, $context);
    if ($result === false) {
        $error = error_get_last();
        error_log("Telegram error: " . ($error['message'] ?? 'unknown'));
        return false;
    }
    $response = json_decode($result, true);
    return $response['ok'] ?? false;
}

// ============================================
// ОТПРАВКА
// ============================================
$body = "Имя: $name\nТелефон: $phone\nEmail: $email\nГород: $city\n";
if (!empty($selected_model)) {
    $body .= "Выбрана модель: $selected_model\n";
}
$body .= "Сообщение: $message";

$mailSent = mail(ADMIN_EMAIL, 'Новая заявка с сайта', $body, "From: info@bio-ecopro.ru\r\n" . (!empty($email) ? "Reply-To: $email\r\n" : ""));
$telegramSent = sendTelegramMessage($text);

// ============================================
// ОТВЕТ
// ============================================
$response = ['success' => $mailSent || $telegramSent];
if (!$response['success']) {
    $response['error'] = 'Не удалось отправить заявку. Пожалуйста, позвоните нам.';
}
echo json_encode($response);