window.onload = async function() {
    getUserInfo().then((user_info) => {
        userInfo = user_info;
        document.getElementById("name").innerHTML = userInfo.usr_name;
        document.getElementById("id").innerHTML = userInfo.usr_id;
        
        get_troops_by_id(userInfo.usr_id).then((troops) => {
            troop_movement = troops;
            let addTroopsToArray = troops_movement.map((troop) => {
                return new Promise(() => {
                    troops.push({
                        x:troop.troop_x,
                        y:troop.troop_y
                    })
                });
            })
            
            Promise.all(addTroopsToArray).then(() => redraw());          
        })
    })
}
var troop_movement;
var userInfo ;
let troops = [];

let tilesize = 1000/20;
let shape_x;
let shape_y;
let shape_movement = 2;
let shape_init_movement = 2;
let shape_name='Darius III'

const radius = tilesize/2;
const diameter = radius*2; 
let shape_move = false;
let shape_is_selected=false;
let troop_x =0;
let troop_y =0;


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
    noLoop();

}

function draw(){
    
    background("black");
    let square_size= width/20;
    let num_squares = 1;
    let is_troop = false;
    let troops = [{x:2,y:2},{x:4,y:4}]
  



    for (let x = 0; x < height; x += square_size) {
        for (let y = 0; y < width; y += square_size){
            rect(x, y, square_size,square_size);
            console.log(troops)
            for (const troop in troops){
                console.log(troop)
                if (!is_troop) {
                   
                    if(matrix[troop.x][troop.y] == num_squares)
                    {
                        is_troop = true;
                        
                        
                    
                    } else {
                        is_troop =false;
                    }
                    
                }
            }
        
            if(is_troop)
            {
                text("Troop" , x+square_size/2 -10, y+square_size/2);
            }else {
                text(num_squares , x + square_size/2 -10, y + square_size/2 );
            }
            num_squares ++

        }
    }
    circle(shape_x, shape_y, diameter);

}



async function keyPressed() {
    if (shape_movement > 0){
        switch(key) {
            case 'd':
            case 'D':
                shape_x  = shape_x  +tilesize;
                troop_x += 1;
                shape_movement-=1
            break;
            
            case 'a':
            case 'A':
                shape_x = shape_x  -tilesize;
                troop_x -= 1;
                shape_movement-=1
            break;
            
            case 'w':
            case 'W':
                shape_y  = shape_y  -tilesize;
                troop_y -= 1;
                shape_movement-=1
            break;
            
            case 's':
            case 'S': 
                shape_y  = shape_y  +tilesize;
                troop_y += 1;
                shape_movement-=1
                
            break;
        
            
            
        }
        if(shape_is_selected){
            document.getElementById("movement").innerHTML = shape_movement;
        }
    }
    switch(key) {
        case 'l':
        case 'L': 
            shape_movement = shape_init_movement;
        break;
    
    }
    switch(key) {
        case 'k':
        case 'K': 
            shape_movement = 500;
        break;
    
    }
    redraw()
}

function mousePressed(){
    let distance = dist(mouseX, mouseY, shape_x, shape_y);
    if(distance<radius){
        
        shape_move = true;
        shape_is_selected = true;
        shape_selected()
    }else {
        shape_is_selected = false
        shape_move = false;
        document.getElementById("movement").innerHTML = '';
        document.getElementById("troop").innerHTML = '';

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

function shape_selected(){
    if (shape_is_selected){
        shape_x + 1;
        print(shape_x)
        document.getElementById("troop").innerHTML =shape_name;

        document.getElementById("movement").innerHTML = shape_movement;
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

