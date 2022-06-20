let input_name;
let input_password;

function preload() {
    font_regular = loadFont('Founts/Track-Regular.otf')
    logo = createImg('/images/logo/logo.png');
    register_button = createImg('/images/buttons/registo.png');
    sound_button = createImg('/images/buttons/som.png');
    music_button = createImg('/images/buttons/musica.png');
}

function setup() {
    textFont(font_regular)
    input_name = createInput();
    input_name.position(windowWidth/2.3, windowHeight/2.1);
    input_password = createInput();
    input_password.position(windowWidth/2.3, windowHeight/1.75);
    createCanvas(windowWidth,windowHeight);
    buttons
    logo.position(windowWidth/5.2, windowHeight/20)
    register_button.position(windowWidth/2.58, windowHeight/1.5);
    sound_button.position(windowWidth/1.06, windowHeight/1.1);
    music_button.position(windowWidth/1.1, windowHeight/1.1);
    register_button.mousePressed(register_user);
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

