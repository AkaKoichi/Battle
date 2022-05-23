

var user_info;
let resources;
var troop_selected_i;

var troop_images = {};
var hurt_troop_images = {};
var buildings_images = {}
let tile_image;
let tile_image2;

let troop_array = []
let troops = [];
let buildings_array = [];
let buildings = [];
let resources_places = [];
var can_move_troop = false;
var can_attack_troop = false;



let end_turn_button;
let move_button;
let attack_button;

let board_size = 16
let tilesize = 44   //700 / board_size;
let matrix = [];

let its_my_turn;

let dice_number = '';

let update_interval = 0;
let update_timer = 0;

const radius = tilesize / 2;
const diameter = radius * 2;

window.onload = async () => {
    user_info = await get_user_info();
    resources = await get_resources_by_id(1, user_info.user_id);
    let bol = await check_current_playing()
    if (bol[0].current_user_playing == user_info.user_id) {
        its_my_turn = true;
        enable_button(end_turn_button)
        enable_button(move_button)
        enable_button(attack_button)
    } else {
        its_my_turn = false;
        disable_button(end_turn_button)
        disable_button(move_button)
        disable_button(attack_button)


    }
    setInterval(() => {
        if (its_my_turn == false) initialize_game()

    }, 500);
    /* document.getElementById("name").innerHTML = user_info.username;
    document.getElementById("id").innerHTML = user_info.user_id;
    document.getElementById("iron").innerHTML = resources[0].rsc_amount;
    document.getElementById("food").innerHTML = resources[1].rsc_amount; */
}

async function setup() {
    initialize_game()
    tile_image = loadImage('./images/tile/tile.png')
    tile_image2 = loadImage('./images/tile/tile2.png')
    let troop_info = await get_troops();
    for (let troop of troop_info) {
        if (troop.trp_url)
            troop_images[troop.trp_id] = await loadImage(troop.trp_url);
    }

    for (let troop of troop_info) {
        if (troop.hurt_url)
            hurt_troop_images[troop.trp_id] = await loadImage(troop.hurt_url);
    }
    let buildings_info = await get_buildings();
    for (let building of buildings_info) {
        if (building.bld_url)
            buildings_images[building.bld_id] = await loadImage(building.bld_url);
    }
    let cnv = createCanvas(windowWidth, windowHeight);

    cnv.position(0, 50);
    //tilesize = width / board_size;

    let pos = 0;
    for (let x = 0; x < board_size; x++) {
        matrix[x] = []
        for (let y = 0; y < board_size; y++) {
            pos++;
            matrix[x][y] = pos;
        }
    }
    for (let i = 0; i < 4; i++) {
        let coordinate_iron = { x: Math.floor(Math.random() * (board_size - 1 - 1 + 1) + 1), y: Math.floor(Math.random() * (board_size - 1 - 1 + 1) + 1) }
        resources_places.push(coordinate_iron)
        console.log(resources_places)
    }
    end_turn_button = createButton('End Turn');
    end_turn_button.position(800, 155);
    end_turn_button.mousePressed(end_turn);

    move_button = createButton('Move');
    move_button.position(800, 350);
    move_button.mousePressed(async function () {
        can_move_troop = true;
    });
    attack_button = createButton('Attack');
    attack_button.position(850, 350);
    attack_button.mousePressed(async function () {
        can_attack_troop = true;
    });

    buildings_setup(user_info.user_id, buildings)

}

async function draw() {

    if (user_info == undefined)
        return;
    let square_size = tilesize; //width / board_size;
    let num_squares = 0;
    let hovered_tile = mouse_over_tile();

    for (let y = 0; y < square_size * board_size; y += square_size) {
        for (let x = 0; x < square_size * board_size; x += square_size) {
            if (hovered_tile.x * square_size == x && hovered_tile.y * square_size == y) {
                image(tile_image2, x, y, tilesize, tilesize);
            } else {
                image(tile_image, x, y, tilesize, tilesize);
            }
            num_squares++
            draw_buildings(matrix, buildings_array, num_squares, user_info.user_id, square_size, tilesize, x, y, buildings_images)
            for (let i = 0; i < resources_places.length; i++) {
                if (resources_places[i].x * square_size == x && resources_places[i].y * square_size == y) {
                    text('resource', x, y + square_size / 2)
                }
            }
        }

        draw_troops(matrix, troop_array, num_squares, user_info.user_id, square_size, diameter, x, y, troop_images, hurt_troop_images)
        draw_pop_up_buildings(buildings_array, square_size, buildings_images)
        draw_pop_up_troops(troop_array, square_size, troop_images)
        fill(color('white'))
        text('user id : ' + user_info.user_id, 800, 200)
        fill(color('black'))



    }
}



async function keyPressed() {
    await key_troops(its_my_turn, troop_array, user_info.user_id, buildings)
    await key_buildings(its_my_turn, troop_array, user_info.user_id, resources)
}

async function mousePressed() {
    let tile = mouse_over_tile()
    console.log(tile)
    let y = (int)(mouseX / tilesize)
    let x = (int)(mouseY / tilesize)
    mouse_pressed_troops(user_info.user_id, troop_array, buildings)
    mouse_pressed_buildings(buildings_array, x, y, troop_array, user_info.user_id)
}

async function check_current_playing() {
    let current_playing = await check_current_playing_by_game(1)
    return current_playing;
}

async function end_turn() {
    let resources_per_turn = 2

    for (let i = 0; i < buildings.length; i++) {
        if (buildings[i].user_id == user_info.user_id) {
            if (buildings[i].bld_name == 'Mine') {
                await update_resources_id(user_info.user_id, resources[0].rsc_amount + resources_per_turn, 1)
            }
            if (buildings[i].bld_name == 'Field') {
                await update_resources_id(user_info.user_id, resources[1].rsc_amount + resources_per_turn, 2)
            }
        }
    }
    for (let i = 0; i < troop_array.length; i++) {
        troop_array[i].movement = troop_array[i].init_movement
        await update_troops_id(
            user_info.user_id,
            troop_array[i].user_trp_id,
            troop_array[i].x, troop_array[i].y,
            troop_array[i].health, troop_array[i].movement);
    }
    let bol = await check_current_playing()
    if (bol[0].current_user_playing == user_info.user_id) {
        if (user_info.user_id == 2) {
            await update_current_playing(1, 1)

        } else {
            await update_current_playing(1, 2);
        }
        opponent_turn()
    } else {
        await update_current_playing(1, user_info.user_id);
        your_turn()
    }
    document.location.reload(true)
}

async function your_turn() {
    its_my_turn = true;
    end_turn_button.removeAttribute('disabled')
    move_button.removeAttribute('disabled')

}

function opponent_turn() {
    its_my_turn = false;
    end_turn_button.attribute('disabled', '');
    move_button.attribute('disabled', '');
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

function mouse_over_tile() {
    let x = mouseX > 0 ? (int)(mouseX / tilesize) : -1
    let y = mouseY > 0 ? (int)(mouseY / tilesize) : -1

    return { x: x, y: y };
}

async function initialize_game() {

    buildings = await get_buildings_by_id(1);
    troops = await get_troops_by_id(1);
    troop_array = []
    buildings_array = []
    for (let i = 0; i < troops.length; i++) {

        let temp_troop = new troop(
            troops[i].user_id,
            troops[i].trp_id,
            troops[i].user_trp_id,
            troops[i].trp_name,
            troops[i].troop_current_health,
            troops[i].trp_movement,
            troops[i].troop_current_movement,
            troops[i].trp_attack,
            troops[i].trp_range,
            troops[i].trp_max_amount,
            troops[i].troop_x,
            troops[i].troop_y,
            troops[i].trp_url
        )
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
    let bol = await check_current_playing()
    if (bol[0].current_user_playing == user_info.user_id) {
        its_my_turn = true;
        enable_button(end_turn_button)
        enable_button(move_button)
        enable_button(attack_button)
    } else {
        its_my_turn = false;
        disable_button(end_turn_button)
        disable_button(move_button)
        disable_button(attack_button)


    }

}
