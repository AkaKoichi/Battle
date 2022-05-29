

var user_info;
var oponent_info;
var game_info;
let resources;
var troop_selected_i;
var buildings_selected_i;

let game_initialized = false;
let buildings_setup_done = false;

var troop_images = {};
var hurt_troop_images = {};
var buildings_images = {}
let tile_image;
let tile_image2;
let farm_image;
let mine_image;
let iron_amount_img;
let food_amount_img;
let win_img;

let troop_array = []
let troops = [];
let buildings_array = [];
let buildings = [];
var resources_places = [];

var can_move_troop = false;
var can_attack_troop = false;
var pop_up_open = false;


let end_turn_button;
let move_button;
let attack_button;

var board_size = 16;
let tilesize = 44;  //700 / board_size;
let matrix = [];

let its_my_turn;

let dice_number = '';

let update_interval = 0;
let update_timer = 0;

const radius = tilesize / 2;
const diameter = radius * 2;

window.onload = async () => {
    user_info = await get_user_info();
    game_info = await get_game_id(user_info.user_id)
    oponent_info = await get_oponent_id(user_info.user_id, game_info.game_id);
    resources = await get_resources_by_id(game_info.game_id, user_info.user_id);
    let bol = await check_current_playing_by_game(game_info.game_id)
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
        if (its_my_turn == false && pop_up_open == false) initialize_game()

    }, 500);



}

async function setup() {

    for (let i = 0; i < 4; i++) {
        let coordinate
        if (i < 2) {
            coordinate = { x: Math.floor(Math.random() * (board_size - 2) + 1), y: Math.floor(Math.random() * (board_size - 1 + 1) + 1), resource: 'iron' }
        } else {
            coordinate = { x: Math.floor(Math.random() * (board_size - 2) + 1), y: Math.floor(Math.random() * (board_size - 1 + 1) + 1), resource: 'food' }
        }
        resources_places.push(coordinate)
    }
    initialize_game()
    //textFont(TRACK)
    tile_image = loadImage('./images/tile/tile.png')
    tile_image2 = loadImage('./images/tile/tile2.png')
    farm_image = loadImage('./images/tile/farm_start.png')
    mine_image = loadImage('./images/tile/mine_start.png')
    iron_amount_img = loadImage('./images/iron.png')
    food_amount_img = loadImage('./images/food.png')
    let troop_info = await get_troops();
    for (let troop of troop_info) {
        if (troop.trp_normal_url)
            troop_images[troop.trp_id] = await loadImage(troop.trp_normal_url);
    }

    for (let troop of troop_info) {
        if (troop.trp_hurt_url)
            hurt_troop_images[troop.trp_id] = await loadImage(troop.trp_hurt_url);
    }
    let buildings_info = await get_buildings();
    for (let building of buildings_info) {
        if (building.bld_url)
            buildings_images[building.bld_id] = await loadImage(building.bld_url);
    }
    let cnv = createCanvas(windowWidth, windowHeight);

    cnv.position(150, 50);
    //tilesize = width / board_size;
    // 380 (marwan)

    let pos = 0;
    for (let x = 0; x < board_size; x++) {
        matrix[x] = []
        for (let y = 0; y < board_size; y++) {
            pos++;
            matrix[x][y] = pos;
        }
    }


    end_turn_button = createButton('End Turn');
    end_turn_button.position(30, 150);
    end_turn_button.mousePressed(end_turn);

    move_button = createButton('Move');
    move_button.position(30, 175);
    move_button.mousePressed(async function () {
        update_troop(user_info.user_id, 0)
    }
    )

    attack_button = createButton('Attack');
    attack_button.position(30, 200);
    attack_button.mousePressed(async function () {
        update_troop(user_info.user_id, 1)
    }
    )
};

async function draw() {
    if (game_info != undefined && game_initialized == false) {
        initialize_game()
        game_initialized = true;
    }
    if (buildings_array.length != 0 && user_info != undefined && game_initialized == true && buildings_setup_done == false) {
        buildings_setup(user_info.user_id, buildings_array, user_info.player_fac_id, game_info.game_id)
        buildings_setup_done = true;
    }
    clear();
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

            for (let i = 0; i < resources_places.length; i++) {
                if (resources_places[i].x * square_size == x && resources_places[i].y * square_size == y) {
                    if (resources_places[i].resource == 'iron') {

                        image(mine_image, x + 4, y, tilesize * 0.8, tilesize * 0.8)
                    } else {

                        image(farm_image, x + 4, y, tilesize * 0.8, tilesize * 0.8)
                    }

                }
            }
            draw_buildings(matrix, buildings_array, num_squares, user_info.user_id, square_size, tilesize, x, y, buildings_images)
        }

        draw_troops(matrix, troop_array, num_squares, user_info.user_id, square_size, diameter, x, y, troop_images, hurt_troop_images)
        draw_pop_up_buildings(buildings_array, square_size, buildings_images, troop_array)
        draw_pop_up_troops(troop_array, tilesize, troop_images)
        fill(color('white'))
        text('user id : ' + user_info.user_id, 800, 200)
        fill(color('black'))
        image(iron_amount_img, 920, 600, iron_amount_img.width * 0.5, iron_amount_img.height * 0.5)
        image(food_amount_img, 770, 600, food_amount_img.width * 0.5, food_amount_img.height * 0.5)
        if (resources[0] != undefined) {
            text(resources[0].rsc_amount, 935, 660)
            text(resources[1].rsc_amount, 805, 660)
        }

    }
}
async function keyPressed() {
    await key_troops(its_my_turn, troop_array, user_info.user_id, buildings)
    await key_buildings(its_my_turn, troop_array, user_info.user_id, game_info.game_id, user_info.player_fac_id)
}

async function mousePressed() {
    let tile = mouse_over_tile()
    console.log(tile)
    let y = (int)(mouseX / tilesize)
    let x = (int)(mouseY / tilesize)
    mouse_pressed_troops(user_info.user_id, troop_array, buildings, game_info.game_id)
    mouse_pressed_buildings(buildings_array, x, y, troop_array, user_info.user_id, game_info.game_id)
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
    }
    let bol = await check_current_playing_by_game(game_info.game_id)
    if (bol[0].current_user_playing == user_info.user_id) {
        if (user_info.user_id == oponent_info.user_player) {//opponent id
            await update_current_playing(game_info.game_id, user_info.user_id)

        } else {
            await update_current_playing(game_info.game_id, oponent_info.user_player);
        }
        opponent_turn()
    } else {
        await update_current_playing(game_info.game_id, user_info.user_id);
        your_turn()
    }
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

    buildings = await get_buildings_by_id(game_info.game_id);
    troops = await get_troops_by_id(game_info.game_id);
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
            buildings[i].bld_current_health,
            buildings[i].bld_x,
            buildings[i].bld_y)
        buildings_array.push(
            temp_building,
        );
    }
    let bol = await check_current_playing_by_game(game_info.game_id)
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


function endGame() {
    for (let i = 0; i < building_array.length; i++) {
        if (building_array[i].health == 0) {
            if (buildings_array[i].user_id == user_id)
                win_img = loadImage('./images/food.png')
        } else {
            win_img = loadImage('./images/food.png')
        }

    }
}

async function update_troop(user_id, bit) {
    console.log('entrou')
    if (bit == 0) {
        update_troop_id(user_id, bit)
        can_move_troop = true;
    } else if (bit == 1) {
        update_troop_id(user_id, bit)
        can_attack_troop = true;
    }
}

