<?php
header('Content-Type: application/json');

if ($_SERVER['REQUEST_METHOD'] !== 'POST') {
    http_response_code(405); 
    echo json_encode(['status' => 'error', 'message' => 'Invalid request method']);
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
    echo json_encode(['status' => 'error', 'message' => 'Database connection failed']);
    exit;
}
$username  = trim($_POST['username'] ?? '');
$age       = trim($_POST['age'] ?? '');
$dob       = trim($_POST['dob'] ?? '');
$email     = trim($_POST['email'] ?? '');
$password  = trim($_POST['password'] ?? '');
$contactno = trim($_POST['contactno'] ?? '');

if (empty($username) || empty($age) || empty($dob) || empty($email) || empty($password) || empty($contactno)) {
    echo json_encode(['status' => 'error', 'message' => 'All fields are required']);
    exit;
}

$stmt = $pdo->prepare("SELECT id FROM user_register WHERE username = ? OR email = ?");
$stmt->execute([$username, $email]);
if ($stmt->rowCount() > 0) {
    echo json_encode(['status' => 'error', 'message' => 'Username or Email already exists']);
    exit;
}
$hashedPassword = password_hash($password, PASSWORD_DEFAULT);

try {
    $stmt = $pdo->prepare("INSERT INTO user_register (username, age, dob, email, password, contactno) VALUES (?, ?, ?, ?, ?, ?)");
    $stmt->execute([$username, $age, $dob, $email, $hashedPassword, $contactno]);
    echo json_encode(['status' => 'success', 'message' => 'Registration successful']);
} catch (PDOException $e) {
    echo json_encode(['status' => 'error', 'message' => 'Registration failed: ' . $e->getMessage()]);
}
