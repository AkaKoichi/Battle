async function register_user() {
    try {
        let name = document.getElementById("name").value;
        let password = document.getElementById("password").value;
        let user = {
            name: name,
            password: password
        };
        let result = await register(user);
        console.log(result)
        if (result.inserted) {
            alert("Register was successful");
            window.location = "index.html"
        } else {
            document.getElementById("result").innerHTML = "Not able to register";
        }
    } catch (err) {
        console.log(err);
    }
}