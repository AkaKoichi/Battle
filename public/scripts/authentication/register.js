async function registerUser() {
    try {
        let name = document.getElementById("name").value;
        let password = document.getElementById("password").value;
        let player = {
            name: name,
            password: password
        };
        let result = await register(player);
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