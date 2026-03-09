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
$host = "localhost"; // Généralement localhost chez Hostinger
$dbname = "u665404360_NOM_DE_VOTRE_BASE"; // Remplacer par le nom de la base
$username = "u665404360_UTILISATEUR";     // Remplacer par l'utilisateur
$password = "VOTRE_MOT_DE_PASSE";         // Le mot de passe que vous avez choisi

try {
    // Connexion PDO
    $pdo = new PDO("mysql:host=$host;dbname=$dbname;charset=utf8", $username, $password);
    $pdo->setAttribute(PDO::ATTR_ERRMODE, PDO::ERRMODE_EXCEPTION);

    // Vérifier si la méthode est bien POST
    if ($_SERVER['REQUEST_METHOD'] !== 'POST') {
        echo json_encode(['error' => 'Méthode non autorisée. Utilisez POST.']);
        exit();
    }

    // Récupérer les données envoyées par React (JSON format)
    $data = json_decode(file_get_contents("php://input"));

    if (empty($data->email) || !filter_var($data->email, FILTER_VALIDATE_EMAIL)) {
        echo json_encode(['error' => 'Adresse email invalide.']);
        exit();
    }

    $email = $data->email;

    // Préparer la requête d'insertion
    $stmt = $pdo->prepare("INSERT INTO subscribers (email) VALUES (:email)");
    $stmt->bindParam(':email', $email);

    try {
        $stmt->execute();
        http_response_code(200);
        echo json_encode(['success' => true, 'message' => 'Inscription réussie.']);
    } catch (PDOException $e) {
        // Erreur 23000 = violation de contrainte unique (l'email existe déjà)
        if ($e->getCode() == 23000) {
            http_response_code(409); // Conflict
            echo json_encode(['error' => 'Cet email est déjà inscrit à la newsletter.']);
        } else {
            http_response_code(500); // Internal Server Error
            echo json_encode(['error' => "Erreur de base de données : " . $e->getMessage()]);
        }
    }

} catch(PDOException $e) {
    http_response_code(500);
    echo json_encode(['error' => "Erreur de connexion : " . $e->getMessage()]);
}
?>
