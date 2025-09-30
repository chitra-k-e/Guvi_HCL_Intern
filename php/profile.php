<?php
header('Content-Type: application/json');

if ($_SERVER['REQUEST_METHOD'] !== 'POST') {
    http_response_code(405);
    echo json_encode(['status'=>'error', 'message'=>'Invalid request method']);
    exit;
}

$host = "sql211.infinityfree.com";
$dbname = "if0_40060612_user_management";
$user = "if0_40060612";
$pass = "Chitrake27";

try {
    $pdo = new PDO("mysql:host=$host;dbname=$dbname;charset=utf8", $user, $pass, [
        PDO::ATTR_ERRMODE => PDO::ERRMODE_EXCEPTION
    ]);
} catch (PDOException $e) {
    echo json_encode(['status'=>'error', 'message'=>'Database connection failed']);
    exit;
}

$email = trim($_POST['email'] ?? '');

if (empty($email)) {
    echo json_encode(['status'=>'error','message'=>'Email is required']);
    exit;
}

$stmt = $pdo->prepare("SELECT username, email, age, dob, contactno FROM user_register WHERE email=?");
$stmt->execute([$email]);

if ($stmt->rowCount() === 0) {
    echo json_encode(['status'=>'error','message'=>'User not found']);
    exit;
}

$user = $stmt->fetch(PDO::FETCH_ASSOC);

echo json_encode([
    'status' => 'success',
    'data' => $user
]);
