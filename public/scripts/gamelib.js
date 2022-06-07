



var user_info;
var oponent_info;
var game_info;
let resources;
var troop_selected_i;
var buildings_selected_i;
var won = false;

let pop_rolls = false;
var trp_id1_array;
var trp_id2_array;

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
let win_img2;

let bg_music;
var building_sound;
var building_falling_sound;
var attacking_sound;
var walking_sound;

let pile = []
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
let roll_button;
let buldings_cost_button;

var board_size = 16;
let tilesize = 44;  //700 / board_size;
let matrix = [];

let its_my_turn;

let dice_number = '';

let update_interval = 0;
let update_timer = 0;

const radius = tilesize / 2;
const diameter = radius * 2;

var roll_attack_number = 0
var rolls_to_hit = 0

window.onload = async () => {

    font_regular = loadFont('Founts/Track-Regular.otf')
    user_info = await get_user_info_game();
    game_info = await get_game_id(user_info.user_id)
    oponent_info = await get_oponent_id(user_info.user_id, game_info.game_id);
    console.log(oponent_info)
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
    let res = await get_resources_places_by_id(game_info.game_id)
    console.log(res[0])
    for (let i = 0; i < res.length; i++) {
        let coordinate = { x: res[i].rsc_x, y: res[i].rsc_y, resource: res[i].rsc }

        resources_places.push(coordinate)
    }

    setInterval(() => {
        if (its_my_turn == false && pop_up_open == false) initialize_game()

    }, 500);



}

async function setup() {
    textFont(font_regular)
    initialize_game()
    bg_music = loadSound('./music/musica_de_fundo.mp3')
    building_sound = loadSound('./music/building.mp3')
    building_falling_sound = loadSound('./music/destruir edificios.mp3')
    attacking_sound = loadSound('./music/espada_ataque.mp3')
    walking_sound = loadSound('./music/passos.mp3')

    end_turn_button = createImg('/images/buttons/end_turn_button.png');

    attack_button = createImg('/images/buttons/attack_button.png');

    move_button = createImg('/images/buttons/move_button.png');

    buldings_cost_button = createImg('/images/buttons/button_building_cost.png')

    tile_image = loadImage('./images/tile/tile.png')
    tile_image2 = loadImage('./images/tile/tile2.png')
    tile_image_move = loadImage('./images/tile/tile5.png')
    tile_image_attack = loadImage('./images/tile/tile_attack.png')
    farm_image = loadImage('./images/tile/farm_start.png')
    mine_image = loadImage('./images/tile/mine_start.png')
    iron_amount_img = loadImage('./images/iron.png')
    food_amount_img = loadImage('./images/food.png')
    win_img = loadImage('./images/win/per_win.png')
    win_img2 = loadImage('./images/win/mc_win.png')
    pile_bottom_right = loadImage('./images/tile/pile_bottom_right.png')
    pile_bottom_left = loadImage('./images/tile/pile_bottom_left.png')
    pile_top_right = loadImage('./images/tile/pile_top_right.png')
    pile_top_left = loadImage('./images/tile/pile_top_left.png')


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
    pile.push({ x: 7, y: 7 })
    pile.push({ x: 7, y: 8 })
    pile.push({ x: 8, y: 7 })
    pile.push({ x: 8, y: 8 })
    console.log(pile)



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

    setup_troop()

    end_turn_button.position(windowWidth / 2.9, windowWidth / 2.2);
    end_turn_button.mousePressed(end_turn);
    end_turn_button.mouseOver(function () {
        end_turn_button.attribute('src', '/images/buttons/end_turn_button_over.png')
    })
    end_turn_button.mouseOut(function () {
        end_turn_button.attribute('src', '/images/buttons/end_turn_button.png')
    })

    move_button.position(windowWidth / 2.2, windowWidth / 2.2);
    move_button.mousePressed(async function () {
        update_troop(user_info.user_id, 0)
    }
    )
    move_button.mouseOver(function () {
        move_button.attribute('src', '/images/buttons/move_button_over.png')
    })
    move_button.mouseOut(function () {
        move_button.attribute('src', '/images/buttons/move_button.png')
    })


    attack_button.position(windowWidth / 1.77, windowWidth / 2.2);
    attack_button.mousePressed(async function () {
        update_troop(user_info.user_id, 1)
    }
    )
    attack_button.mouseOver(function () {
        attack_button.attribute('src', '/images/buttons/attack_button_over.png')
    })
    attack_button.mouseOut(function () {
        attack_button.attribute('src', '/images/buttons/attack_button.png')
    })

    buldings_cost_button.position(windowWidth / 2.2, windowWidth / 2.1);
    buldings_cost_button.mousePressed(async function () {
        draw_pop_up_buildings_cost(buildings_array, square_size, buildings_images, troop_array)
    }
    )
    buldings_cost_button.mouseOver(function () {
        buldings_cost_button.attribute('src', '/images/buttons/button_building_cost_over.png')
    })
    buldings_cost_button.mouseOut(function () {
        buldings_cost_button.attribute('src', '/images/buttons/button_building_cost.png')
    })
    /*  roll_button = createButton('Check Roll');
     roll_button.position(30, 230);
     roll_button.mousePressed(  async function () {
         pop_rolls = true
     }
     ) */
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
    if (won) {
        clear();
        draw_endGame(user_info.player_fac_id)
        return
    }

    for (let y = 0; y < square_size * board_size; y += square_size) {
        for (let x = 0; x < square_size * board_size; x += square_size) {
            if (troop_selected_i != undefined && troop_array[troop_selected_i].selected != undefined) {

                if (hovered_tile.x * square_size == x && hovered_tile.y * square_size == y) {
                    image(tile_image2, x, y, tilesize, tilesize);

                } else if (troop_array[troop_selected_i].selected) {
                    let tile = { x: x / square_size, y: y / square_size }

                    if (get_dist_move(troop_array[troop_selected_i], tile).can_move) {
                        image(tile_image_move, x, y, tilesize, tilesize);

                    } else if (hovered_tile.x * square_size == x && hovered_tile.y * square_size == y) {
                        image(tile_image2, x, y, tilesize, tilesize);

                    } else {
                        image(tile_image, x, y, tilesize, tilesize);
                    }
                    if (get_dist_attack(troop_array[troop_selected_i], tile) && can_attack_troop) {
                        image(tile_image_attack, x, y, tilesize, tilesize);
                    }

                } else {
                    image(tile_image, x, y, tilesize, tilesize);
                }

            } else if (hovered_tile.x * square_size == x && hovered_tile.y * square_size == y) {
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
            if (x / square_size == 7 && y / square_size == 7) {
                image(pile_top_left, x, y, tilesize, tilesize);
            }
            if (x / square_size == 8 && y / square_size == 7) {
                image(pile_top_right, x, y, tilesize, tilesize);
            }
            if (x / square_size == 7 && y / square_size == 8) {
                image(pile_bottom_left, x, y, tilesize, tilesize);
            }
            if (x / square_size == 8 && y / square_size == 8) {
                image(pile_bottom_right, x, y, tilesize, tilesize);
            }
            draw_buildings(matrix, buildings_array, num_squares, user_info.user_id, square_size, tilesize, x, y, buildings_images)
            draw_troops(matrix, troop_array, num_squares, user_info.user_id, square_size, diameter, x, y, troop_images, hurt_troop_images)
            draw_pop_up_buildings(buildings_array, square_size, buildings_images, troop_array)
            draw_pop_up_troops(troop_array, tilesize, troop_images)
            fill(color('white'))
            textSize(20);
            text('user id : ' + user_info.user_id, 800, 200)
            text('actions : ' + user_info.player_actions, 900, 200)
            fill(color('black'))
            image(iron_amount_img, 920, 600, iron_amount_img.width * 0.5, iron_amount_img.height * 0.5)
            image(food_amount_img, 770, 600, food_amount_img.width * 0.5, food_amount_img.height * 0.5)
            if (resources[0] != undefined) {
                text(resources[2].rsc_amount, 935, 660)
                text(resources[0].rsc_amount, 805, 660)
            }
            text(roll_attack_number, 850, 550)
            text(rolls_to_hit, 850, 535)

            /* if(pop_rolls == true){
                draw_pop_up_rolls()
            } */
        }
    }

}
async function keyPressed() {
    if (its_my_turn) {
        switch (key) {
            case 'ç':
            case 'Ç':
                console.log('aaa')
                await update_resources_id(user_info.user_id, 100, 2)
                await update_resources_id(user_info.user_id, 100, 1)
                initialize_game()
                break;
        }
    }

    await key_troops(its_my_turn, troop_array, user_info.user_id, buildings)
    await key_buildings(its_my_turn, troop_array, user_info.user_id, game_info.game_id, user_info.player_fac_id)
}

async function mousePressed() {
    //bg_music.loop()
    //bg_music.rate(2)
    let tile = mouse_over_tile()
    console.log(tile)
    let y = (int)(mouseX / tilesize)
    let x = (int)(mouseY / tilesize)
    mouse_pressed_troops(user_info.user_id, troop_array, buildings, game_info.game_id)
    mouse_pressed_buildings(buildings_array, x, y, troop_array, user_info.user_id, game_info.game_id)
}

async function end_turn() {
    let res = await end_turn_id(user_info.user_id, game_info.game_id, pile, oponent_info.user_player)
    console.log(res.msg)
    if (res.msg == 'updated') initialize_game()
}

async function your_turn() {
    its_my_turn = true;
    end_turn_button.removeAttribute('disabled');
    end_turn_button.show()
    move_button.removeAttribute('disabled');
    move_button.show()
    attack_button.removeAttribute('disabled');
    attack_button.show()

}

function opponent_turn() {
    its_my_turn = false;
    end_turn_button.attribute('disabled', '');
    end_turn_button.hide()
    move_button.attribute('disabled', '');
    move_button.hide()
    attack_button.attribute('disabled', '');
    attack_button.hide()

}

function toggle_button(button) {
    if (button.hasAttribute('disabled')) {
        button.removeAttribute('disabled')
    } else button.attribute('disabled', '');
}

function enable_button(button) {
    button.removeAttribute('disabled')
    button.show()
}

function disable_button(button) {
    button.attribute('disabled', '');
    button.hide()
}

function mouse_over_tile() {
    let x = mouseX > 0 ? (int)(mouseX / tilesize) : -1
    let y = mouseY > 0 ? (int)(mouseY / tilesize) : -1

    return { x: x, y: y };
}



function draw_endGame(fac_id) {
    if (fac_id == 1) image(win_img, 0, 0, win_img.width, win_img.height)
    else image(win_img2, 0, 0, win_img2.width, win_img2.height)

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
    if (its_my_turn) {
        resources = []
        resources = await get_resources_by_id(game_info.game_id, user_info.user_id);
        user_info = []
        user_info = await get_user_info_game();
    }
}

