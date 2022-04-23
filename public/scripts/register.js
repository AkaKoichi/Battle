let register_button;
let sound_button;
let music_button;
let register_img;
let sound_img;
let music_img;
let link;

function preload(){
    register_img = loadImage('/images/buttons/registo.png');
    sound_button = createImg('/images/buttons/som.png');
    music_button = createImg('/images/buttons/musica.png');
}

function setup() {
    createCanvas(1420,700);
    register_button = new Button(520,480,register_img);
    sound_button.position(1250,650);
    music_button.position(1350,650);
}

function draw(){
    register_button.display();
}

class Button {

    constructor(inX, inY, inImg) {
        this.x = inX;
        this.y = inY;
        this.img = inImg;
    }

    display() {
        stroke(0);


        image(this.img, this.x, this.y);
    }
}

function mousePressed(){
    console.log('a  ')
    if (mouseX > this.x && mouseX < this.x + this.img.width && mouseY > this.y && mouseY < this.y + this.img.height){

        window.location = 'mainpage.html';
    }
    
}
