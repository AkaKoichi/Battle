let userInfo;

let troop_movement =[];
let buildings_place =[];

let tilesize = 800 / 20;
let matrix = [];

const radius = tilesize / 2;
const diameter = radius * 2; 

window.onload = async () => {

    getUserInfo().then((user_info) => {

        userInfo = user_info;
        document.getElementById("name").innerHTML = userInfo.usr_name;
        document.getElementById("id").innerHTML = userInfo.usr_id;

        get_buildings_by_id(userInfo.usr_id).then((buildings) => {

            buildings_place = buildings; 
        });
        get_troops_by_id(userInfo.usr_id).then((troops) => {

            troop_movement = troops;
            console.log(troop_movement)
            
        });

        
    })
}

function setup() {

    createCanvas(800,800);

    tilesize = width / 20;
    shape_x = width / 20 - tilesize / 2;
    
    shape_y = height / 20 - tilesize / 2;

    
    
    let pos = 0;

    for (let y = 0; y < 20; y++) {

        matrix[y] = []

        for (let x = 0; x < 20; x++){

            pos++;
            matrix[y][x] = pos;

        }
    }
}
function draw(){
    
    background("black");
    let square_size= width/20;
    let num_squares = 1;
    
  

    //

    for (let x = 0; x < height; x += square_size) {
        
        for (let y = 0; y < width; y += square_size){
            rect(x, y, square_size,square_size);
            for (i = 0; i < troop_movement.length; i++) {
             
                if(matrix[troop_movement[i].troop_x][troop_movement[i].troop_y] == num_squares)
                {
                    circle(x+square_size/2 -10, y+square_size/2, diameter);
                } else if (matrix[buildings_place[0].build_x][buildings_place[0].build_y] == num_squares ){
                    rect(x+square_size/2 -10, y+square_size/2-10, 20,20);
                }else {
                    text(num_squares , x + square_size/2 -10, y + square_size/2 );
                }
                num_squares ++
                break
            }
        }
    }
}

async function keyPressed() {
    for (i = 0 ; i < troop_movement.length; i++) {
        if (troop_movement[i].selected){
            if (troop_movement[i].trp_movement > 0){
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
    }
}

function mousePressed(){
    for (i = 0 ; i < troop_movement.length; i++) {
        let distance = dist(mouseX, mouseY, troop_movement[i].troop_x, troop_movement[i].troop_y);
        if(distance<radius){
            
          
            troop_movement[i].selected = true;
            shape_selected()
        }else {
            shape_is_selected = false
            document.getElementById("movement").innerHTML = '';
            document.getElementById("troop").innerHTML = '';

        }
    }
}




function shape_selected(){
    for (i = 0 ; i < troop_movement.length; i++) {

        if (troop_movement[1].selected){
        
            document.getElementById("troop").innerHTML =troop_movement[i].trp_name;
    
            document.getElementById("movement").innerHTML = troop_movement[i].trp_movement;
        };
    };
}



function object(){
    var canvas = document. getElementById('circle');
    if (canvas. getContext){
        var ctx = canvas. getContext('2d');
        var X = canvas.width/2;
        var Y = canvas.height/2;
    }
}

