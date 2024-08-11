<?php
$host = 'localhost';
$dbname = 'scanqr';
$username = 'root';
$password = '';

try {
    $pdo = new PDO("mysql:host=$host;dbname=$dbname", $username, $password);
    $pdo->setAttribute(PDO::ATTR_ERRMODE, PDO::ERRMODE_EXCEPTION);

    if ($_SERVER['REQUEST_METHOD'] === 'POST') {
        $data = json_decode(file_get_contents('php://input'), true);

        if (isset($data['link'])) {
            $link = $data['link'];

            // Generate QR code using a third-party API
            $qrCodeUrl = "https://api.qrserver.com/v1/create-qr-code/?size=150x150&data=" . urlencode($link);

            // Save link and QR code in the database
            $stmt = $pdo->prepare("INSERT INTO qr_codes (link, qr_code_url) VALUES (?, ?)");
            $stmt->execute([$link, $qrCodeUrl]);
            $id = $pdo->lastInsertId(); // Get the last inserted ID

            // Respond with the QR code URL and ID
            echo json_encode(['qr_code_url' => $qrCodeUrl, 'id' => $id]);
        } elseif (isset($_POST['scan'])) {
            // Handle QR code scan and add entry to qr_codes
            $id = $_POST['id'];
            $scannedBy = $_POST['scanned_by'];

            // Update the record with scan info
            $stmt = $pdo->prepare("UPDATE qr_codes SET scanned_by = ?, scanned_at = NOW() WHERE id = ?");
            $stmt->execute([$scannedBy, $id]);

            // Respond with success
            echo json_encode(['status' => 'success']);
        }
    } elseif ($_SERVER['REQUEST_METHOD'] === 'GET' && $_GET['action'] === 'get_history') {
        // Retrieve scan history
        $stmt = $pdo->query("SELECT id, link, qr_code_url, scanned_by, scanned_at 
                             FROM qr_codes 
                             ORDER BY scanned_at DESC");
        $history = $stmt->fetchAll(PDO::FETCH_ASSOC);

        echo json_encode(['history' => $history]);
    }
} catch (PDOException $e) {
    echo 'Connection failed: ' . $e->getMessage();
}
?>
