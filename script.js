// Define the link and QR code URL
const predefinedLink = 'https://example.com'; // Replace this with your actual link
const qrCodeUrl = `https://api.qrserver.com/v1/create-qr-code/?size=150x150&data=${encodeURIComponent(predefinedLink)}`;

// Display the QR code
document.getElementById('qrCode').innerHTML = `<img src="${qrCodeUrl}" alt="QR Code">`;
document.getElementById('generateBtn').addEventListener('click', function() {
    // Define the link to redirect to
    const redirectLink = 'buatqr.html'; // Replace this with your actual link
    
    // Redirect the user to the link
    window.location.href = redirectLink;
});
// Function to simulate QR code scan
function scanQRCode() {
    const deviceType = getDeviceType(); // Get the device type

    fetch('backend.php', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/x-www-form-urlencoded'
        },
        body: new URLSearchParams({
            scan: 'true',
            link: predefinedLink,
            qr_code_url: qrCodeUrl,
            scanned_by: deviceType
        })
    })
    .then(response => response.json())
    .then(data => {
        if (data.status === 'success') {
            loadHistory(); // Reload history after recording a scan
        }
    })
    .catch(error => console.error('Error:', error));
}

// Function to determine device type
function getDeviceType() {
    const ua = navigator.userAgent;
    if (/mobile/i.test(ua)) return 'Mobile';
    if (/tablet/i.test(ua)) return 'Tablet';
    return 'Desktop';
}

// Load scan history
function loadHistory() {
    fetch('backend.php?action=get_history')
        .then(response => response.json())
        .then(data => {
            const historyTable = document.getElementById('historyTable');
            historyTable.innerHTML = '';
            if (data.history && data.history.length > 0) {
                data.history.forEach((item, index) => {
                    historyTable.innerHTML += `
                        <tr>
                            <th scope="row">${index + 1}</th>
                            <td>${item.link}</td>
                            <td><img src="${item.qr_code_url}" alt="QR Code" style="width: 100px;"></td>
                            <td>${item.scanned_by || 'N/A'}</td>
                            <td>${item.scanned_at || 'N/A'}</td>
                        </tr>`;
                });
            } else {
                historyTable.innerHTML = '<tr><td colspan="5">No history available</td></tr>';
            }
        })
        .catch(error => console.error('Error:', error));
}

// Load history on page load
document.addEventListener('DOMContentLoaded', loadHistory);

// Simulate QR code scan when the button is clicked
document.getElementById('scanBtn').addEventListener('click', scanQRCode);
