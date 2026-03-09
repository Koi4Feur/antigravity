<?php
// Active CORS pour permettre à React de communiquer avec ce script
header("Access-Control-Allow-Origin: *");
header("Access-Control-Allow-Headers: Content-Type");
header("Access-Control-Allow-Methods: POST, OPTIONS");
header("Content-Type: application/json; charset=UTF-8");

// Traiter les requêtes preflight CORS
if ($_SERVER['REQUEST_METHOD'] === 'OPTIONS') {
    http_response_code(200);
    exit();
}

// ---------------------------------------------------------
// PARAMÈTRES DE BASE DE DONNÉES (À REMPLIR SUR HOSTINGER)
// ---------------------------------------------------------
$host = "localhost";
$dbname = "u665404360_NOM_DE_VOTRE_BASE";
$username = "u665404360_UTILISATEUR";
$password = "VOTRE_MOT_DE_PASSE";

// Récupérer les données brutes envoyées par React (JSON format)
$data = json_decode(file_get_contents("php://input"));
$emailInput = $data->email ?? '';

$email = filter_var($emailInput, FILTER_VALIDATE_EMAIL);

if (!$email) {
    http_response_code(400);
    echo json_encode(['error' => 'Email invalide.']);
    exit();
}

try {
    $pdo = new PDO(
        "mysql:host=$host;dbname=$dbname;charset=utf8mb4",
        $username,
        $password,
        [PDO::ATTR_ERRMODE => PDO::ERRMODE_EXCEPTION]
    );

    $stmt = $pdo->prepare("INSERT INTO subscribers (email, created_at) VALUES (:email, NOW()) ON DUPLICATE KEY UPDATE created_at = created_at");

    $stmt->execute([':email' => $email]);

    http_response_code(200);
    echo json_encode(['success' => true, 'message' => 'Inscription réussie.']);

} catch (PDOException $e) {
    http_response_code(500);
    echo json_encode(['error' => "Erreur de connexion : " . $e->getMessage()]);
}
?>