async function login_user() {
    try {
        let name = document.getElementById("name").value;
        let password = document.getElementById("password").value;
        let result = await login(name, password);
        if (result.logged) {
            window.location = "room.html"
        } else {
            document.getElementById("result").innerHTML = "Wrong username or password";
        }
    } catch (err) {
        console.log(err)
    }
}