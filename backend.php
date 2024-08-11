<?php
$host = 'localhost';
$dbname = 'scanqr';
$username = 'root';
$password = '';

try {
    $pdo = new PDO("mysql:host=$host;dbname=$dbname", $username, $password);
    $pdo->setAttribute(PDO::ATTR_ERRMODE, PDO::ERRMODE_EXCEPTION);

    if ($_SERVER['REQUEST_METHOD'] === 'POST') {
        if (isset($_POST['scan'])) {
            // Handle QR code scan and add entry to qr_codes
            $link = $_POST['link'];
            $qrCodeUrl = $_POST['qr_code_url'];
            $scannedBy = $_POST['scanned_by'];

            // Save the scanned QR code in the database
            $stmt = $pdo->prepare("INSERT INTO qr_codes (link, qr_code_url, scanned_by, scanned_at) VALUES (?, ?, ?, NOW())");
            $stmt->execute([$link, $qrCodeUrl, $scannedBy]);

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
