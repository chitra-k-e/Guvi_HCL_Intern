<?php
header('Content-Type: application/json');

if ($_SERVER['REQUEST_METHOD'] !== 'POST') {
    http_response_code(405);
    echo json_encode(['status'=>'error', 'message'=>'Invalid request method']);
    exit;
}

$host = "localhost";
$dbname = "user_management";
$user = "root";   // change if different
$pass = "";       // add your password if MySQL root has one

try {
    $pdo = new PDO("mysql:host=$host;dbname=$dbname;charset=utf8", $user, $pass, [
        PDO::ATTR_ERRMODE => PDO::ERRMODE_EXCEPTION
    ]);
} catch (PDOException $e) {
    echo json_encode(['status'=>'error', 'message'=>'Database connection failed']);
    exit;
}

$email = trim($_POST['email'] ?? '');
$password = trim($_POST['password'] ?? '');

if (empty($email) || empty($password)) {
    echo json_encode(['status'=>'error','message'=>'Email and Password are required']);
    exit;
}

$stmt = $pdo->prepare("SELECT id, username, email, password FROM user_register WHERE email=?");
$stmt->execute([$email]);

if ($stmt->rowCount() === 0) {
    echo json_encode(['status'=>'error','message'=>'User not found']);
    exit;
}

$user = $stmt->fetch(PDO::FETCH_ASSOC);

// Verify password
if (password_verify($password, $user['password'])) {
    echo json_encode([
        'status'=>'success',
        'message'=>'Login successful',
        'data' => [
            'id' => $user['id'],
            'username' => $user['username'],
            'email' => $user['email']
        ]
    ]);
} else {
    echo json_encode(['status'=>'error','message'=>'Incorrect password']);
}
