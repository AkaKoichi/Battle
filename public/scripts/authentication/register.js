let input_name;
let input_password;

function preload() {
    register_button = createImg('/images/buttons/registo.png');
    sound_button = createImg('/images/buttons/som.png');
    music_button = createImg('/images/buttons/musica.png');
}

function setup() {
    
    input_name = createInput();
    input_name.position(600, 300);
    
    input_password = createInput();
    input_password.position(600, 370);
    createCanvas(1420, 700);
    //buttons
    register_button.position(520, 480);
    sound_button.position(1250, 650);
    music_button.position(1350, 650);
    register_button.mousePressed(register_user);
}

function draw() {
    textSize(20);
    text("User name:",600,270);
    text("Password:",600,350);
}

async function register_user() {
    try {
        let name = input_name.value();
        let password = input_password.value();
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

