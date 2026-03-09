<?php
header('Content-Type: application/json');

if ($_SERVER['REQUEST_METHOD'] !== 'POST') {
    echo json_encode(['success' => false, 'error' => 'Метод не поддерживается']);
    exit;
}

// Получаем данные
$name = trim($_POST['name'] ?? '');
$phone = trim($_POST['phone'] ?? '');
$email = trim($_POST['email'] ?? '');
$city = trim($_POST['city'] ?? '');
$message = trim($_POST['message'] ?? '');
$captcha = trim($_POST['captcha'] ?? '');
$captcha_result = trim($_POST['captcha_result'] ?? '');

// Простейшая валидация
if (empty($name) || empty($phone) || empty($email) || empty($city)) {
    echo json_encode(['success' => false, 'error' => 'Заполните обязательные поля']);
    exit;
}

if (!preg_match('/^\+7\s?[\(]?\d{3}[\)]?\s?\d{3}[\-]?\d{2}[\-]?\d{2}$/', $phone)) {
    echo json_encode(['success' => false, 'error' => 'Неверный формат телефона']);
    exit;
}

if (!filter_var($email, FILTER_VALIDATE_EMAIL)) {
    echo json_encode(['success' => false, 'error' => 'Неверный формат email']);
    exit;
}

// Проверка капчи
if (!is_numeric($captcha) || (int)$captcha !== (int)$captcha_result) {
    echo json_encode(['success' => false, 'error' => 'Неверный ответ на проверочный вопрос']);
    exit;
}

// Формируем письмо
$to = 'info@bio-ecopro.ru'; // замени на нужный email
$subject = 'Новая заявка с сайта БИОЭКОПРО';
$body = "Имя: $name\nТелефон: $phone\nEmail: $email\nГород: $city\nСообщение: $message";
$headers = "From: no-reply@bio-ecopro.ru\r\n";
$headers .= "Reply-To: $email\r\n";
$headers .= "X-Mailer: PHP/" . phpversion();

if (mail($to, $subject, $body, $headers)) {
    echo json_encode(['success' => true]);
} else {
    echo json_encode(['success' => false, 'error' => 'Ошибка отправки почты']);
}