window.onload = async function() {
    let userInfo = await getUserInfo();
    document.getElementById("name").innerHTML = userInfo.usr_name;
    let troop_info = await get_troops();
    document.getElementById("troop").innerHTML = troop_info[2].trp_name;
}
let tilesize = 900/20;
let shape_x;
let shape_y;
const radius = tilesize/2;
const diameter = radius*2; 
let shape_move = false;

let matrix = [];

function setup(){
    createCanvas(1000,1000)
    tilesize = width/20;
    shape_x =  width/20 - tilesize/2;
    shape_y = height/20 - tilesize/2;
    
    let pos = 0;
    for(let y = 0; y< 20 ; y ++){
        matrix[y] = []
        for(let x =0; x< 20; x ++ ){
            pos++;
            matrix[y][x] = pos;
        }
    }

    print("Total: " + pos);

}

function draw(){
    
    background("black");
    let square_size= width/20;
    let num_squares = 1

    let dbX = 19;
    let dbY = 3;

    
    for (let y = 0; y < height; y += square_size) {
        for (let x = 0; x < width; x += square_size){
            rect(x, y, square_size,square_size);
            
            if(matrix[dbX][dbY] == num_squares)
            {
                  text("Hello" , x+square_size/2 -10, y+square_size/2);
            } else {
                text(num_squares , x + square_size/2 -10, y + square_size/2 );
            }
            num_squares ++

        }
    }
    circle(shape_x, shape_y, diameter);

}

async function keyPressed() {
  
    switch(key) {
        case 'd':
        case 'D':
            shape_x  = shape_x  +tilesize;
        break;
        
        case 'a':
        case 'A':
            shape_x = shape_x  -tilesize;
        break;
        
        case 'w':
        case 'W':
            shape_y  = shape_y  -tilesize;
        break;
        
        case 's':
        case 'S': 
            shape_y  = shape_y  +tilesize;
        break;
    }
}

function mousePressed(){
    let distance = dist(mouseX, mouseY, shape_x, shape_y);
    if(distance<radius){
        
        shape_move = true;
    }else {

        shape_move = false;
    }
}

function mouseReleased(){
    shape_move = false;
}

function mouseDragged(){

    if (shape_move){

        shape_x = mouseX;
        shape_y = mouseY;
    }
}

function object(){
    var canvas = document. getElementById('circle');
    if (canvas. getContext){
        var ctx = canvas. getContext('2d');
        var X = canvas.width/2;
        var Y = canvas.height/2;
    }
}

