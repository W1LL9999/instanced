// Utility functions
function getCsrfToken() {
    const nonceElement = document.getElementById('nonce');
    if (nonceElement && nonceElement.value) {
        return nonceElement.value;
    }
    console.error('CSRF token not found');
    return null;
}

function displayResponse(elementId, response, isError = false) {
    const element = document.getElementById(elementId);
    if (element) {
        const displayText = typeof response === 'object' ? 
            JSON.stringify(response, null, 2) : response;
        element.className = isError ? 'error-response' : 'success-response';
        element.textContent = displayText;
    } else {
        console.error(`Element with id "${elementId}" not found`);
    }
}

// Test the Status API
function testStatusAPI() {
    fetch('/plugins/instanced/api/status', {
        method: 'GET',
        headers: {
            'CSRF-Token': getCsrfToken()
        },
        credentials: 'same-origin'
    })
    .then(response => response.json())
    .then(data => displayResponse('status-response', data))
    .catch(error => displayResponse('status-response', `Error: ${error}`, true));
}

function testDataSubmission() {
    try {
        const inputData = JSON.parse(document.getElementById('data-input').value);
        fetch('/plugins/instanced/api/senddata', {
            method: 'POST',
            headers: {
                'CSRF-Token': getCsrfToken(),
                'Content-Type': 'application/json',
                'Accept': 'application/json'
            },
            credentials: 'same-origin',
            body: JSON.stringify(inputData)
        })
        .then(response => response.json())
        .then(data => displayResponse('data-response', data))
        .catch(error => displayResponse('data-response', `Error: ${error}`, true));
    } catch (e) {
        displayResponse('data-response', 'Invalid JSON input: ' + e.message, true);
    }
}

// Test Admin Metrics
function testAdminMetrics() {
    fetch('/plugins/instanced/api/admin/metrics', {
        method: 'GET',
        headers: {
            'CSRF-Token': getCsrfToken()
        },
        credentials: 'same-origin'
    })
    .then(response => response.json())
    .then(data => displayResponse('metrics-response', data))
    .catch(error => displayResponse('metrics-response', `Error: ${error}`, true));
}
