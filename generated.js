document.getElementById('kembali').addEventListener('click', function() {
const redirectLink = 'index.html'; // Replace this with your actual link
        
    // Redirect the user to the link
    window.location.href = redirectLink;
}); 
document.getElementById('generateBtn').addEventListener('click', function() {
    
    const linkInput = document.getElementById('linkInput').value;
    if (linkInput) {
        // Make an AJAX request to the server to generate QR code
        fetch('config.php', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ link: linkInput })
        })
        .then(response => response.json())
        .then(data => {
            if (data.qr_code_url && data.id) {
                document.getElementById('qrCode').innerHTML = `<img src="${data.qr_code_url}" alt="QR Code" style="width: 250px;">`;
                loadHistory(); // Load history to include the newly added QR code
                // Simulate a scan to add to history
                scanQRCode(data.id);
            }
        })
        .catch(error => console.error('Error:', error));
    } else {
        alert('Please enter a valid link.');
    }
});

function scanQRCode(id) {
    const deviceType = getDeviceType(); // Get the device type

    fetch('config.php', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/x-www-form-urlencoded'
        },
        body: new URLSearchParams({
            scan: 'true',
            id: id,
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

function getDeviceType() {
    const ua = navigator.userAgent;
    if (/mobile/i.test(ua)) return 'Mobile';
    if (/tablet/i.test(ua)) return 'Tablet';
    if (/iPad|Android|Touch/.test(ua)) return 'Tablet';
    return 'Desktop';
}

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
