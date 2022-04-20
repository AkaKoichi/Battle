async function logout_user() {
    try {
        let result = await logout();
        window.location = "login.html"
    } catch (err) {
        console.log(err);
    }
}

async function get_user_info() {
    try {
        let result = await request_user_info();
        if (result.logged) {
           return result.result;
        } else {
            alert ("You are not logged in\nWe will send you to login page");
            window.location = "index.html"
        }
    } catch(err) {
        console.log(err);
    }
}