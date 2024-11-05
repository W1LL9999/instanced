CTFd._internal.challenge.data = undefined


CTFd._internal.challenge.preRender = function () {
}

CTFd._internal.challenge.render = null

CTFd._internal.challenge.postRender = function () {
}

// Testing Buttons
function showInstanceButtons() {
    document.getElementById('button-boot').style.display = "none";
    document.getElementById('instance-buttons').style.display = "flex";
}
function hideInstanceButtons() {
    document.getElementById('button-boot').style.display = "inline-block";
    document.getElementById('instance-buttons').style.display = "none";
}
function renewInstance() {
    alert("Instance renewed!");
}


CTFd._internal.challenge.destroy = function () {
    var challenge_id = document.getElementById('challenge-id').value;
    var url = "";

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
                body: "Your instance has been destroyed!",
                button: "OK"
            });
        } else {
            buttonDestroy.innerHTML = "Destroy this instance";
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
    var url = "";

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

CTFd._internal.challenge.submit = function (preview) {
    var challenge_id = document.getElementById('challenge-id').value;
    var submission = document.getElementById('challenge-input').value;

    var body = {
        'challenge_id': challenge_id,
        'submission': submission,
    }
    var params = {};
    if (preview) params['preview'] = true;

    return CTFd.api.post_challenge_attempt(params, body).then(function (response) {
        if (response.status === 429) {
            return response;
        }
        if (response.status === 403) {
            return response;
        }
        return response;
    });
};


document.addEventListener("DOMContentLoaded", function() {
    loadInfo();
});