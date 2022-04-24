let input_name;
let input_password;

function preload() {
    logo = createImg('/images/logo/logo.png');
    login_button = createImg('/images/buttons/login.png');
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
    logo.position(200,-50)
    login_button.position(520,400)
    register_button.position(520, 550);
    sound_button.position(1250, 650);
    music_button.position(1350, 650);
    login_button.mousePressed(login_user);
    register_button.mousePressed(go_to_register);
}

function draw() {
    textSize(20);
    text("User name:",600,270);
    text("Password:",600,350);
}

function go_to_register(){
    window.location = 'register.html'
}

async function login_user() {
    try {
        let name = input_name.value();
        let password = input_password.value();
        let result = await login(name, password);
        if (result.logged) {
            window.location = "mainpage.html"
        } else {
            document.getElementById("result").innerHTML = "Wrong username or password";
        }
    } catch (err) {
        console.log(err)
    }
}