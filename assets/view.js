CTFd._internal.challenge.data = undefined


CTFd._internal.challenge.preRender = function () {
}

CTFd._internal.challenge.render = null

CTFd._internal.challenge.postRender = function () {
}

// CSRF for POST 
function getCsrfToken() {
    const nonceElement = document.getElementById('nonce');
    if (nonceElement && nonceElement.value) {
        return nonceElement.value;
    }
    console.error('CSRF token not found');
    return null;
}

// Create Instance 
function createInstance() {
    var challenge_id = document.getElementById('challenge-id').value;
    document.getElementById('button-boot').style.display = "none";
    document.getElementById('instance-buttons').style.display = "flex";
    
    CTFd.fetch("/plugins/instanced/api/create", {
        method: 'PUT',
        credentials: 'same-origin',
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({
            challenge_id: challenge_id
        })
    })
    .then(response => response.json())
    .then(data => {
        console.log("API Response:", data);

        const cardTitle = document.querySelector('.card-title');
        if (cardTitle) {
            cardTitle.innerHTML = `<a href="${data.data.url}" target="_blank">${data.data.url}</a>`;
        }
    })
    .catch(error => console.error("Error fetching status:", error));
}

function deleteInstance() {
    document.getElementById('button-boot').style.display = "inline-block";
    document.getElementById('instance-buttons').style.display = "none";
    
    var challenge_id = document.getElementById('challenge-id').value;
    
    CTFd.fetch("/plugins/instanced/api/delete", {
        method: 'POST',
        credentials: 'same-origin',
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({
            challenge_id: challenge_id
        })
    })
    .then(response => response.json())
    .then(data => {
        console.log("API Response:", data);
        const cardTitle = document.querySelector('.card-title');
        if (cardTitle) {
            cardTitle.innerHTML = 'Info';
        }
    })
    .catch(error => console.error("Error fetching status:", error));
 }

// Testing Buttons
function showInstanceButtons() {
    document.getElementById('button-boot').style.display = "none";
    document.getElementById('instance-buttons').style.display = "flex";
}

function renewInstance() {
    alert("Instance renewed!");
}


CTFd._internal.challenge.destroy = function () {
    var challenge_id = document.getElementById('challenge-id').value;
    var user_id = document.getElementById('user-id').value;

    var buttonDestroy = document.getElementById('button-destroy');
    buttonDestroy.innerHTML = "Waiting...";
    buttonDestroy.disabled = true;

    var params = {};

    CTFd.fetch(url, {
        method: 'DELETE',
        credentials: 'same-origin',
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(params)
    })
    
    .then(function (response) {
        if (response.status === 429) { // User ratelimited
            return response.json();
        }
        if (response.status === 403) { // User not logged in or CTF paused
            return response.json();
        }
        return response.json();

    }).then(function (response) {
        if (response.success) {
            loadInfo();
            CTFd.ui.ezq.ezAlert({
                title: "Success",
                body: "Your instance has been destroyed!",
                button: "OK"
            });
        } else {
            buttonDestroy.disabled = false;
            CTFd.ui.ezq.ezAlert({
                title: "Fail",
                body: response.message,
                button: "OK"
            });
        }
    });
};


CTFd._internal.challenge.renew = function () {
    var challenge_id = document.getElementById('challenge-id').value;
    var url = "instanced/assets/test.js";

    var buttonRenew = document.getElementById('button-renew');
    buttonRenew.innerHTML = "Waiting...";
    buttonRenew.disabled = true;

    var params = {};

    CTFd.fetch(url, {
        method: 'PATCH',
        credentials: 'same-origin',
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(params)
    }).then(function (response) {
        if (response.status === 429) {
            return response.json();
        }
        if (response.status === 403) {
            return response.json();
        }
        return response.json();
    }).then(function (response) {
        if (response.success) {
            loadInfo();
            CTFd.ui.ezq.ezAlert({
                title: "Success",
                body: "Your instance has been renewed!",
                button: "OK"
            });
        } else {
            buttonRenew.innerHTML = "Renew this instance";
            buttonRenew.disabled = false;
            CTFd.ui.ezq.ezAlert({
                title: "Fail",
                body: response.message,
                button: "OK"
            });
        }
    });
};

CTFd._internal.challenge.boot = function () {
    var challenge_id = document.getElementById('challenge-id').value;
    var url = "";

    var buttonBoot = document.getElementById('button-boot');
    buttonBoot.innerHTML = "Waiting...";
    buttonBoot.disabled = true;

    var params = {};

    CTFd.fetch(url, {
        method: 'POST',
        credentials: 'same-origin',
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(params)
    }).then(function (response) {
        if (response.status === 429) {
            return response.json();
        }
        if (response.status === 403) {
            return response.json();
        }
        return response.json();
    }).then(function (response) {
        if (response.success) {
            loadInfo();
            CTFd.ui.ezq.ezAlert({
                title: "Success",
                body: "Your instance has been deployed!",
                button: "OK"
            });
        } else {
            buttonBoot.innerHTML = "Launch an instance";
            buttonBoot.disabled = false;
            CTFd.ui.ezq.ezAlert({
                title: "Fail",
                body: response.message,
                button: "OK"
            });
        }
    });
};


document.addEventListener("DOMContentLoaded", function() {
    loadInfo();
});