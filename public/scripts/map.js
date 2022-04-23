

let userInfo;

let troop_array = []

let troop_movement = [];
let buildings_place = [];

let tilesize = 600 / 20;
let matrix = [];
let iron =16;
let food=16;


const radius = tilesize / 2;
const diameter = radius * 2;

let deffender ;
let attacker;

window.onload = async () => {

    let user_info = await get_user_info();
    //get_user_info().then((user_info) => {

    userInfo = user_info;
    document.getElementById("name").innerHTML = userInfo.username;
    document.getElementById("id").innerHTML = userInfo.user_id;
    console.log()


    buildings_place = await get_buildings_by_id(1);
    
     
    let troops = await get_troops_by_id(1);

    troop_movement = troops;
    for (i = 0; i < troop_movement.length; i++) {
        troop_array.push({
            user_id:troop_movement[i].user_id,
            user_trp_id:troop_movement[i].user_trp_id,
            name: troop_movement[i].trp_name,
            health: troop_movement[i].trp_health,
            init_movement: troop_movement[i].trp_movement,
            movement: troop_movement[i].trp_movement,
            attack: troop_movement[i].trp_atack,
            range: troop_movement[i].trp_range,
            max_amount: troop_movement[i].trp_max_amount,
            x: troop_movement[i].troop_x,
            y: troop_movement[i].troop_y,
            selected: false,
            square_x: 0,
            square_y: 0

        });
    }
}

function setup() {

    createCanvas(600, 600);
    tilesize = width / 20;
    let pos = 0;
    for (let x = 0; x < 20; x++) {

        matrix[x] = []

        for (let y = 0; y < 20; y++) {

            pos++;
            matrix[x][y] = pos;

        }
    }
}
function draw() {

    background("black");
    let square_size = width / 20;
    let num_squares = 0;
    let c = color(255, 204, 0);
    let w= color('white');
    let b= color('black');
    let r= color('red');
    let p= color('purple');
    let bl= color('blue');
    let g= color('gray');

    for (let x = 0; x < height; x += square_size) {
        for (let y = 0; y < width; y += square_size) {
            
            rect(x, y, square_size, square_size);
            fill(b);
            text(num_squares, x + square_size / 2 - 10, y + square_size / 2);
            fill(w);
            num_squares++

            for (let i = 0; i < buildings_place.length; i++) {
                if (matrix[buildings_place[i].bld_x][buildings_place[i].bld_y] == num_squares) {
                    if(buildings_place[i].user_id == userInfo.user_id){
                        if (buildings_place[i].bld_name == 'Town Center'){
                            fill(bl);
                            rect(x , y , tilesize, tilesize);
                            fill(b);
                            text('TC', x + square_size / 2 - 10, y + square_size / 2);
                            fill(w);
                        }
                        
                    }else{
                        if (buildings_place[i].bld_name == 'Town Center'){
                        fill(r);
                        rect(x , y , tilesize, tilesize);
                        fill(b);
                        text('TC', x + square_size / 2 - 10, y + square_size / 2);
                            fill(w);
                        fill(w);
                        }
                    }
                }
            }
            for (let i = 0; i < troop_array.length; i++) {
                if (matrix[troop_array[i].x][troop_array[i].y] == num_squares) {
                    if(troop_array[i].user_id == userInfo.user_id){
                        
                        fill(bl);
                        circle(x + square_size / 2, y + square_size / 2, diameter);
                        fill(w);
                        troop_array[i].square_x = x + square_size / 2
                        troop_array[i].square_y = y + square_size / 2
                        
                    }else{
                        fill(r);
                        circle(x + square_size / 2, y + square_size / 2, diameter);
                        fill(w);
                        troop_array[i].square_x = x + square_size / 2
                        troop_array[i].square_y = y + square_size / 2
                    } 
                }
            } 
        }
    }
}

async function keyPressed() {
    
    for (i = 0; i < troop_array.length; i++) {
        if(troop_array[i].user_id == userInfo.user_id){

            if (troop_array[i].selected) {
                if (troop_array[i].movement > 0) {
                    switch (key) {
                        case 'd':
                        case 'D':
                            troop_array[i].x += 1;
                            troop_array[i].movement -= 1

                            break;

                        case 'a':
                        case 'A':

                            troop_array[i].x -= 1;
                            troop_array[i].movement -= 1

                            break;

                        case 'w':
                        case 'W':

                            troop_array[i].y -= 1;
                            troop_array[i].movement -= 1

                            break;

                        case 's':
                        case 'S':

                            troop_array[i].y += 1;
                            troop_array[i].movement -= 1

                            break;
                    }
                }

                switch (key) {
                    case 'l':
                    case 'L':
                        troop_array[i].movement = troop_array[i].init_movement;
                        document.getElementById("movement").innerHTML = troop_array[i].movement;
                        break;
                
                    case 'k':
                    case 'K':
                        troop_array[i].movement = 500;
                        document.getElementById("movement").innerHTML = troop_array[i].movement;
                        break;

                    case 'b':
                    case 'B':
                        build_building();
                        break;
                }
                    
                
                document.getElementById("movement").innerHTML = troop_array[i].movement;
            }
        }
        
    }
}

function mousePressed() {

    for (i = 0; i < troop_array.length; i++) {
        troop_array[i].selected = false;
        let distance = dist(mouseX, mouseY, troop_array[i].square_x, troop_array[i].square_y);
        if (distance < radius) {
            troop_array[i].selected = true;
            shape_selected()
        } else {
            troop_array[i].selected = false
            document.getElementById("movement").innerHTML = '';
            document.getElementById("troop").innerHTML = '';

        }
    }
}




function shape_selected() {
    for (i = 0; i < troop_array.length; i++) {

        if (troop_array[i].selected) {

            document.getElementById("troop").innerHTML = troop_array[i].name;

            document.getElementById("movement").innerHTML = troop_array[i].movement;
        };
    };
}



function object() {
    var canvas = document.getElementById('circle');
    if (canvas.getContext) {
        var ctx = canvas.getContext('2d');
        var X = canvas.width / 2;
        var Y = canvas.height / 2;
    }
}

async function end_turn() {
     for (i = 0 ; i < troop_array.length; i++) {
        let update = await update_troops_id(userInfo.user_id,troop_array[i].user_trp_id,troop_array[i].x,troop_array[i].y,);
     }
 }

async function build_building(){
    for (i = 0 ; i < troop_array.length; i++) {
        if (troop_array[i].user_id == userInfo.user_id){
            if (troop_array[i].selected){
                await build(userInfo.user_id,1,troop_array[i].x,troop_array[i].y,5)
                break
            }
        } 
    }        
}
    
 

function attack(){

}

