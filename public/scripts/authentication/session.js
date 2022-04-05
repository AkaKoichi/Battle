async function logoutUser() {
    try {
        let result = await logout();
        window.location = "login.html"
    } catch (err) {
        console.log(err);
    }
}

async function getUserInfo() {
    try {
        let result = await requestUserInfo();
        if (result.logged) {
           return result.result;
        } else {
            alert ("You are not logged in\nWe will send you to login page");
            window.location = "login.html"
        }
    } catch(err) {
        console.log(err);
    }
}