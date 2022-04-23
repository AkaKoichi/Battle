// let register_button;
// let sound_button;
// let music_button;

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

// function preload() {
//     register_button = createImg('/images/buttons/registo.png');
//     sound_button = createImg('/images/buttons/som.png');
//     music_button = createImg('/images/buttons/musica.png');
// }

// function setup() {
//     createCanvas(1420, 700);
//     //buttons
//     register_button.position(520, 480);
//     sound_button.position(1250, 650);
//     music_button.position(1350, 650);
//     register_button.mousePressed();
// }

// function draw() {
// }

// function mousePressed() {
//     if (mouseX > 520 && mouseX < 520 + register_button.width && mouseY > 480 && mouseY < 480 + register_button.height) {
//         register_user();
//     }
//     return false;
//
