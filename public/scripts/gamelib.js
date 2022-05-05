

var userInfo;
let resources;

let troop_array = []
let troops = [];
let buildings_array = [];
let buildings = [];

let end_turn_button;
let train_troop_button;

let tilesize = 700 / 20;
let matrix = [];

let its_my_turn;

let dice_number = '';

const radius = tilesize / 2;
const diameter = radius * 2;

window.onload = async () => {
     setInterval(() => {
        if (its_my_turn == false) {
           // troops = await get_troops_by_id(1);
        }
    },4000) 

    let user_info = await get_user_info();
    userInfo = user_info;
    let bol = await check_current_playing()
    if (bol[0].current_user_playing == userInfo.user_id) {
        its_my_turn = true;
        enable_button(train_troop_button)
        enable_button(end_turn_button)
    } else {
        its_my_turn = false;
        disable_button(train_troop_button)
        disable_button(end_turn_button)

    }
    document.getElementById("name").innerHTML = userInfo.username;
    document.getElementById("id").innerHTML = userInfo.user_id;

    buildings = await get_buildings_by_id(1);
    resources = await get_resources_by_id(1, userInfo.user_id);
    document.getElementById("iron").innerHTML = resources[0].rsc_amount;
    document.getElementById("food").innerHTML = resources[1].rsc_amount;
    let troops = await get_troops_by_id(1);

    for (let i = 0; i < troops.length; i++) {
        
        let temp_troop = new troop(
            troops[i].user_id,
            troops[i].user_trp_id,
            troops[i].trp_name,
            troops[i].troop_current_health,
            troops[i].trp_movement,
            troops[i].troop_current_movement,
            troops[i].trp_attack,
            troops[i].trp_range,
            troops[i].trp_max_amount,
            troops[i].troop_x,
            troops[i].troop_y)
        troop_array.push(
            temp_troop,
        );
    }

    for (let i = 0; i < buildings.length; i++) {
        let temp_building = new building(
            buildings[i].user_id,
            buildings[i].user_bld_id,
            buildings[i].bld_id,
            buildings[i].bld_name,
            buildings[i].bld_health,
            buildings[i].bld_x,
            buildings[i].bld_y)
        buildings_array.push(
            temp_building,
        );
    }
} 

function setup() {
    let cnv = createCanvas(700, 700);
    cnv.position(700, 30);
    tilesize = width / 20;

    let pos = 0;
    for (let x = 0; x < 20; x++) {
        matrix[x] = []
        for (let y = 0; y < 20; y++) {
            pos++;
            matrix[x][y] = pos;
        }
    }
    
    end_turn_button = createButton('End Turn');
    end_turn_button.position(500, 155);
    end_turn_button.mousePressed(end_turn);

    train_troop_button = createButton('train troop');
    train_troop_button.position(500, 245);
    train_troop_button.mousePressed(function(){
        train(buildings,1,resources)
    });

}

async function draw() {
    if (userInfo == undefined)
        return;

    background("black");
    let square_size = width / 20;
    let num_squares = 0;
    let c = color(255, 204, 0);
    let w = color('white');
    let b = color('black');
    let r = color('red');
    let p = color('purple');
    let bl = color('blue');
    let g = color('gray');
    let hovered_tile = mouse_over_tile();
   
     

    for (let y = 0; y < height; y += square_size) {
        for (let x = 0; x < width; x += square_size) {
            if (matrix[hovered_tile.y][hovered_tile.x-1] == num_squares){
                fill(p)
                rect(x, y, square_size, square_size);
                fill(w)

            }else{
                rect(x, y, square_size, square_size);
            }

            
            fill(b);
            text(num_squares,x+square_size/2 - 10,y+square_size/2)
            fill(w)
            num_squares++
            await draw_buildings(matrix,buildings_array,num_squares,userInfo.user_id,square_size,tilesize,x,y)
            await draw_troops(matrix,troop_array,num_squares,userInfo.user_id,square_size,diameter,x,y)
        }
    }
}

async function keyPressed() {
    await key_troops(its_my_turn,troop_array,userInfo.user_id)
    await key_buildings(its_my_turn,troop_array,userInfo.user_id,resources)
}
 
function mousePressed() {
    let x =(int)(mouseX / tilesize)
    let y= (int)(mouseY / tilesize)
    mouse_pressed_troops(troop_array)
    
    console.log(x,y)  

}

async function check_current_playing() {
    let current_playing = await check_current_playing_by_game(1)
    return current_playing;
}

async function end_turn() {
    let resources_per_turn = 2

    for (let i = 0; i < buildings.length; i++) {
        if (buildings[i].user_id == userInfo.user_id) {
            if (buildings[i].bld_name == 'Mine') {
                await update_resources_id(userInfo.user_id, resources[0].rsc_amount + resources_per_turn, 1)
            }
            if (buildings[i].bld_name == 'Field') {
                await update_resources_id(userInfo.user_id, resources[1].rsc_amount + resources_per_turn, 2)
            }
        }
    }
    for (let i = 0; i < troop_array.length; i++) {
        troop_array[i].movement = troop_array[i].init_movement
        await update_troops_id(
            userInfo.user_id,
            troop_array[i].user_trp_id,
            troop_array[i].x, troop_array[i].y,
            troop_array[i].health, troop_array[i].movement);
    }
    let bol = await check_current_playing()
    console.log(bol)
    if (bol[0].current_user_playing == userInfo.user_id) {
        console.log('end_turn')
        if (userInfo.user_id == 2) {
            await update_current_playing(1, 1)

        } else {
            await update_current_playing(1, 2);
        }
        opponent_turn()
    } else {
        await update_current_playing(1, userInfo.user_id);
        your_turn()
    }
    document.location.reload(true)
}

async function your_turn() {
    its_my_turn = true;
    end_turn_button.removeAttribute('disabled')
    train_troop_button.removeAttribute('disabled')
}

function opponent_turn() {
    console.log('o')
    its_my_turn = false;
    end_turn_button.attribute('disabled', '');
    train_troop_button.attribute('disabled', '');
}

function toggle_button(button) {
    if (button.hasAttribute('disabled')) {
        button.removeAttribute('disabled')
    } else button.attribute('disabled', '');
}

function enable_button(button) {
    button.removeAttribute('disabled')
}

function disable_button(button) {
    button.attribute('disabled', '');
}

function mouse_over_tile(){
    return { x: (int)(mouseX / tilesize), y: (int)(mouseY / tilesize) };
}
