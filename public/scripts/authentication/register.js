async function registerUser() {
    try {
        let name = document.getElementById("name").value;
        let password = document.getElementById("password").value;
        let user = {
            name: name,
            password: password
        };
        let result = await register(user);
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