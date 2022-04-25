let userInfo;
let resources;

let troop_array = []
let troop_movement = [];
let buildings_place = [];

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
            document.location.reload(true)
        }
    }, 5000)

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

    buildings_place = await get_buildings_by_id(1);
    resources = await get_resources_by_id(1, userInfo.user_id);
    document.getElementById("iron").innerHTML = resources[0].rsc_amount;
    document.getElementById("food").innerHTML = resources[1].rsc_amount;
    let troops = await get_troops_by_id(1);
    troop_movement = troops;
    for (let i = 0; i < troop_movement.length; i++) {
        troop_array.push({
            user_id: troop_movement[i].user_id,
            user_trp_id: troop_movement[i].user_trp_id,
            name: troop_movement[i].trp_name,
            health: troop_movement[i].troop_current_health,
            init_movement: troop_movement[i].trp_movement,
            movement: troop_movement[i].troop_current_movement,
            attack: troop_movement[i].trp_attack,
            range: troop_movement[i].trp_range,
            max_amount: troop_movement[i].trp_max_amount,
            x: troop_movement[i].troop_x,
            y: troop_movement[i].troop_y,
            selected: false,
            attacker: false,
            defender: false,
            square_x: 0,
            square_y: 0
        });
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
    train_troop_button.mousePressed(train);

}
function draw() {

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

    for (let x = 0; x < height; x += square_size) {
        for (let y = 0; y < width; y += square_size) {

            rect(x, y, square_size, square_size);
            
            num_squares++

            for (let i = 0; i < buildings_place.length; i++) {
                if (matrix[buildings_place[i].bld_x][buildings_place[i].bld_y] == num_squares) {
                    if (buildings_place[i].user_id == userInfo.user_id) {
                        fill(bl);
                        rect(x, y, tilesize, tilesize);
                        fill(b);
                        textWrap(CHAR);
                        text(buildings_place[i].bld_name, x + square_size / 2 - 10, y + square_size / 2);
                        fill(w);

                    } else {

                        fill(r);
                        rect(x, y, tilesize, tilesize);
                        fill(b);
                        text(buildings_place[i].bld_name, x + square_size / 2 - 10, y + square_size / 2);
                        fill(w);
                    }
                }
            }
            for (let i = 0; i < troop_array.length; i++) {
                if (matrix[troop_array[i].x][troop_array[i].y] == num_squares) {
                    if (troop_array[i].user_id == userInfo.user_id) {

                        fill(bl);
                        circle(x + square_size / 2, y + square_size / 2, diameter);
                        fill(w);
                        troop_array[i].square_x = x + square_size / 2
                        troop_array[i].square_y = y + square_size / 2
                    } else {
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
    if (its_my_turn) {
        for (i = 0; i < troop_array.length; i++) {
            if (troop_array[i].user_id == userInfo.user_id) {
                if (troop_array[i].selected) {
                    if (troop_array[i].movement > 0) {
                        switch (key) {
                            case 'd':
                            case 'D':
                                troop_array[i].x += 1;
                                troop_array[i].movement -= 1
                                await update_troops_id(userInfo.user_id, troop_array[i].user_trp_id, troop_array[i].x, troop_array[i].y, troop_array[i].health, troop_array[i].movement);
                                break;

                            case 'a':
                            case 'A':

                                troop_array[i].x -= 1;
                                troop_array[i].movement -= 1
                                await update_troops_id(userInfo.user_id, troop_array[i].user_trp_id, troop_array[i].x, troop_array[i].y, troop_array[i].health, troop_array[i].movement);
                                break;

                            case 'w':
                            case 'W':

                                troop_array[i].y -= 1;
                                troop_array[i].movement -= 1
                                await update_troops_id(userInfo.user_id, troop_array[i].user_trp_id, troop_array[i].x, troop_array[i].y, troop_array[i].health, troop_array[i].movement);
                                break;

                            case 's':
                            case 'S':
                                
                                troop_array[i].y += 1;
                                troop_array[i].movement -= 1
                                await update_troops_id(userInfo.user_id, troop_array[i].user_trp_id, troop_array[i].x, troop_array[i].y, troop_array[i].health, troop_array[i].movement);
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

                        case 'i':
                        case 'I':
                            set_attacker()
                            break;
                    }
                    document.getElementById("movement").innerHTML = troop_array[i].movement;
                }
            }
        }
        switch (key) {
            case 'p':
            case 'P':
                make_attack()
                break;
            case 'o':
            case 'O':
                set_defender()
                break;
        }
    }
}

function mousePressed() {
    for (let i = 0; i < troop_array.length; i++) {
        troop_array[i].selected = false;
        let distance = dist(mouseX, mouseY, troop_array[i].square_x, troop_array[i].square_y);
        if (distance < radius) {
            troop_array[i].selected = true;
            troop_selected(troop_array[i])
            break
        } else {
            troop_array[i].selected = false;
            troop_selected('')
        }
    }
}

function troop_selected(troop) {
    if (troop != '') {
        document.getElementById("troop").innerHTML = troop.name;
        document.getElementById("movement").innerHTML = troop.movement;
        document.getElementById("attack").innerHTML = troop.attack;
    } else {
        document.getElementById("movement").innerHTML = '';
        document.getElementById("troop").innerHTML = '';
        document.getElementById("attack").innerHTML = '';
    }
}

async function build_building() {
    let building_iron_cost = 4;
    let building_food_cost = 4;

    for (let i = 0; i < troop_array.length; i++) {
        if (troop_array[i].user_id == userInfo.user_id) {
            if (troop_array[i].selected) {
                if ((resources[0].rsc_amount - building_iron_cost >= 0) && (resources[1].rsc_amount - building_food_cost >= 0)) {
                    alert("Building Successfully Built");
                    await build(userInfo.user_id, 2, troop_array[i].x, troop_array[i].y, 5)
                    await update_resources_id(userInfo.user_id, resources[0].rsc_amount - building_iron_cost, 1)
                    await update_resources_id(userInfo.user_id, resources[1].rsc_amount - building_food_cost, 2)
                    document.location.reload(true)
                    break
                }
            }
        }
    }
}

function set_attacker() {
    for (let i = 0; i < troop_array.length; i++) {
        if (troop_array[i].user_id == userInfo.user_id) {
            if (troop_array[i].selected) {
                troop_array[i].attacker = true;
                break;
            }
        }
    }
}

function set_defender() {
    for (let i = 0; i < troop_array.length; i++) {
        if (troop_array[i].user_id != userInfo.user_id) {
            if (troop_array[i].selected) {
                troop_array[i].defender = true;
                break;
            }
        }
    }
}

async function make_attack() {
    var attacker = {};
    var defender = {};
    let attacker_index = null;
    let defender_index = null;
    let can_attack = false;
    let dice_dmg_multiplier = null;

    for (let i = 0; i < troop_array.length; i++) {
        if (troop_array[i].user_id == userInfo.user_id) {
            if (troop_array[i].attacker) {
                attacker = troop_array[i]
                attacker_index = i
                break;
            }
        }
    }
    for (let i = 0; i < troop_array.length; i++) {
        if (troop_array[i].user_id != userInfo.user_id) {
            if (troop_array[i].defender) {
                defender = troop_array[i]
                defender_index = i
                break;
            }
        }
    }
    can_attack = get_dist_attack(attacker, defender)
    dice_dmg_multiplier = roll_dice(3, 6)
    if (can_attack && dice_dmg_multiplier >= 1) {
        defender.health -= attacker.attack * dice_dmg_multiplier;
        if (defender.health <= 0) {
            await delete_troops_id(troop_array[defender_index].user_trp_id)
        }
        await update_troops_id(defender.user_id, defender.user_trp_id, defender.x, defender.y, defender.health);
        alert('defender health after attack'+defender.health)
        troop_array[attacker_index].attacker = false;
        troop_array[defender_index].defender = false;
    }
    document.location.reload(true)
}

function get_dist_attack(attacker, defender) {
    distX = Math.abs(attacker.x - defender.x)
    distY = Math.abs(attacker.y - defender.y)
    return distX <= attacker.range && distY <= attacker.range;
}

async function train() {
    let troop_iron_cost = 5;
    let troop_food_cost = 5;
    for (let i = 0; i < buildings_place.length; i++) {
        if (buildings_place[i].bld_name == 'Training Camp') {
            if (buildings_place[i].user_id == userInfo.user_id) {
                if ((resources[0].rsc_amount - troop_iron_cost >= 0) && (resources[1].rsc_amount - troop_food_cost >= 0)) {
                    alert("Troop Successfully Trained");
                    await train_troop(userInfo.user_id, 1, buildings_place[i].bld_x, buildings_place[i].bld_y, 5, 2)
                    await update_resources_id(userInfo.user_id, resources[0].rsc_amount - troop_iron_cost, 1)
                    await update_resources_id(userInfo.user_id, resources[1].rsc_amount - troop_food_cost, 2)
                    document.location.reload(true)
                }
            }
        }
    }
}

async function check_current_playing() {
    let current_playing = await check_current_playing_by_game(1)
    return current_playing;
}

async function end_turn() {
    let resources_per_turn = 2

    for (let i = 0; i < buildings_place.length; i++) {
        if (buildings_place[i].user_id == userInfo.user_id) {
            if (buildings_place[i].bld_name == 'Mine') {
                await update_resources_id(userInfo.user_id, resources[0].rsc_amount + resources_per_turn, 1)
            }
            if (buildings_place[i].bld_name == 'Field') {
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

    console.log('y')
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

function roll_dice(min, sides) {
    dice_number = dice(1, sides);
    document.getElementById("dice").innerHTML = dice_number;
    if (dice_number == sides) {
        return 2
    } else if (dice_number >= min) {
        return 1
    }
    return 0
}

function dice(min, max) {
    return Math.floor(Math.random() * (max - min + 1) + min);
}