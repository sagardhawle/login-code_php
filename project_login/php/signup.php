<?php
header('Content-Type: application/json');
require_once 'db.php';

if ($_SERVER['REQUEST_METHOD'] === 'POST') {
    $username = $_POST['username'] ?? '';
    $email = $_POST['email'] ?? '';
    $password = $_POST['password'] ?? '';

    if (strlen($username) < 3 || !filter_var($email, FILTER_VALIDATE_EMAIL) || strlen($password) < 6) {
        echo json_encode(['success' => false, 'message' => 'Invalid input data']);
        exit;
    }

    $hashedPassword = password_hash($password, PASSWORD_DEFAULT);

    try {
        $stmt = $pdo->prepare("INSERT INTO users (username, email, password) VALUES (?, ?, ?)");
        $stmt->execute([$username, $email, $hashedPassword]);
        echo json_encode(['success' => true]);
    } catch (PDOException $e) {
        if ($e->getCode() == 23000) { // Duplicate entry
            echo json_encode(['success' => false, 'message' => 'Username or email already exists']);
        } else {
            echo json_encode(['success' => false, 'message' => 'Signup failed']);
        }
    }
}
?>
