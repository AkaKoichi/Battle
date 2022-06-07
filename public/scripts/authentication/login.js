let input_name;
let input_password;

function preload() {
    //font_regular = loadFont('Founts/Track-Regular.otf')
    logo = createImg('/images/logo/logo.png');
    login_button = createImg('/images/buttons/login.png');
    register_button = createImg('/images/buttons/registo.png');
    sound_button = createImg('/images/buttons/som.png');
    music_button = createImg('/images/buttons/musica.png');
}

function setup() {
   // textFont(font_regular)
    input_name = createInput();
    input_name.position(windowWidth/2.3, windowHeight/2.1);
    input_password = createInput();
    input_password.position(windowWidth/2.3, windowHeight/1.75);
    createCanvas(windowWidth,windowHeight);
    //buttons
    logo.position(windowWidth/5.2, windowHeight/20)
    login_button.position(windowWidth/2.4, windowHeight/1.5)
    register_button.position(windowWidth/2.58, windowHeight/1.3);
    sound_button.position(windowWidth/1.06, windowHeight/1.1);
    music_button.position(windowWidth/1.1, windowHeight/1.1);
    login_button.mousePressed(login_user);
    login_button.mouseOver( function(){
        login_button.attribute('src','/images/buttons/login_over.png')
    })
    login_button.mouseOut( function(){
        login_button.attribute('src','/images/buttons/login.png')
    })
    register_button.mousePressed(go_to_register);
    register_button.mouseOver( function(){
        register_button.attribute('src','/images/buttons/registo_over.png')
    })
    register_button.mouseOut( function(){
        register_button.attribute('src','/images/buttons/registo.png')
    })
}

function draw() {
    textSize(20);
    text("User name:",windowWidth/2.3, windowHeight/2.2);
    text("Password:",windowWidth/2.3, windowHeight/1.8);
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