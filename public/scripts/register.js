let register_button;
let sound_button;
let music_button;
let link;

function preload(){
    register_button = createImg('/images/buttons/registo.png');
    sound_button = createImg('/images/buttons/som.png');
    music_button = createImg('/images/buttons/musica.png');
}

function setup() {
    createCanvas(1420,700);
    register_button.position(520,480);
    sound_button.position(1250,650);
    music_button.position(1350,650);
    register_button.Button(mousePressed);
}

function draw(){
}

function mousePressed(){
    window.location = 'mainpage.html';
}
