


// test mf test testttttttt



let troop_shown = false;
let trp_image;
let clicks = 0;
var attack = 0;
let attacker_index = null;
let defender_index = null;
let building_defender_index = null;




class troop {
    constructor(user_id, trp_id, user_trp_id, name, health, init_movement, movement, attack, range, max_amount, x, y, url) {
        this.user_id = user_id;
        this.trp_id = trp_id;
        this.user_trp_id = user_trp_id;
        this.name = name;
        this.health = health;
        this.init_movement = init_movement;
        this.movement = movement;
        this.attack = attack;
        this.range = range;
        this.max_amount = max_amount;
        this.x = x;
        this.y = y;
        this.selected = false;
        this.attacker = false;
        this.defender = false;
        this.hurt = false;
        this.square_x = 0;
        this.square_y = 0;
        this.url = url;
    }
    select() {
        this.selected = true;

    }

    unselect() {
        this.selected = false;

    }

}

function draw_troops(matrix, troop_array, num_squares, user_id, square_size, diameter, x, y, images, hurt_images) {

    for (let i = 0; i < troop_array.length; i++) {
        trp_image = images[troop_array[i].trp_id]

        hurt_image = hurt_images[troop_array[i].trp_id]


        if (troop_array[i].user_id == user_id) {
            if (troop_array[i].hurt == true) {

                image(hurt_image, troop_array[i].x * square_size + (square_size - trp_image.width / 7) / 2, troop_array[i].y * square_size - square_size / 2, trp_image.width / 7, trp_image.height / 7);
                troop_array[i].timer--
                if (troop_array[i].timer == 0) {

                    troop_array[i].hurt = false
                    initialize_game()

                }
            } else image(trp_image, troop_array[i].x * square_size + (square_size - trp_image.width / 7) / 2, troop_array[i].y * square_size - square_size / 2, trp_image.width / 7, trp_image.height / 7);


        } else {
            if (troop_array[i].hurt == true) {

                image(hurt_image, troop_array[i].x * square_size + (square_size - trp_image.width / 7) / 2, troop_array[i].y * square_size - square_size / 2, trp_image.width / 7, trp_image.height / 7);
                console.log(troop_array[i].timer)
                troop_array[i].timer--
                if (troop_array[i].timer == 0) {

                    troop_array[i].hurt = false
                    initialize_game()
                }
            }
            else image(trp_image, troop_array[i].x * square_size + (square_size - trp_image.width / 7) / 2, troop_array[i].y * square_size - square_size / 2, trp_image.width / 7, trp_image.height / 7);
        }


    }

}



async function key_troops(its_my_turn, troop_array, user_id, buildings) {
    if (its_my_turn) {
        for (i = 0; i < troop_array.length; i++) {
            if (troop_array[i].user_id == user_id) {
                if (i == troop_selected_i) {
                    switch (key) {
                        case 'l':
                        case 'L':
                            troop_array[i].movement = troop_array[i].init_movement;
                            await update_troops_id(troop_array[i].user_id, troop_array[i].user_trp_id, troop_array[i].x, troop_array[i].y, troop_array[i].health, troop_array[i].movement)
                            /* document.getElementById("movement").innerHTML = troop_array[i].movement; */
                            break;

                        case 'k':
                        case 'K':
                            troop_array[i].movement = 500;
                            await update_troops_id(troop_array[i].user_id, troop_array[i].user_trp_id, troop_array[i].x, troop_array[i].y, troop_array[i].health, troop_array[i].movement)
                            /* document.getElementById("movement").innerHTML = troop_array[i].movement; */
                            break;
                    }
                }
            }
        };
    }

}
async function mouse_pressed_troops(user_id, troop_array, buildings, game_id) {
    let tile = mouse_over_tile()
    for (let i = 0; i < troop_array.length; i++) {
        let can_move = get_dist_move(troop_array[i], tile)

        if (tile.x >= 0 && tile.x <= board_size - 1 && tile.y >= 0 && tile.y <= board_size - 1) {
            if ((can_move_troop) &&
                (troop_selected_i == i) &&
                (can_move.can_move) && (clicks > 0) &&
                (troop_array[i].user_id == user_id) &&
                (its_my_turn)) {
                let res = await move_troop_id(user_id, troop_array[i].user_trp_id, tile.x, tile.y, game_id)
                console.log(res.troops)
                if (res.troops.msg == 'troop moved succesfuly') {
                    walking_sound.play()
                    walking_sound.rate(3)
                }
                if (res.troops.msg != undefined) {
                    initialize_game()
                    can_move_troop = false
                    troop_selected_i = 0
                    clicks = 0
                    break
                }

            } else if (can_move_troop) {

            } else {
                troop_array[i].unselect()
                /* troop_selected_i=undefined */
                pop_up_open = false;
            }
            if ((can_attack_troop) &&
                (troop_array[i].x == tile.x && troop_array[i].y == tile.y) &&
                (troop_array[i].user_id != user_id) &&
                (attack > 0)) {
                troop_array[i].select()
                defender_index = i;
                make_attack_roll(troop_array, user_id, buildings, 0, game_id)
                can_attack_troop = false;
                attack = 0;
                break
            }

            if ((can_attack_troop) &&
                (troop_array[i].x == tile.x && troop_array[i].y == tile.y) &&
                (troop_array[i].user_id == user_id)) {

                troop_array[i].select()
                attacker_index = i;
                troop_selected_i = i
                attack = 1
                break

            } else if (troop_array[i].x == tile.x && troop_array[i].y == tile.y) {
                troop_array[i].select()
                troop_selected_i = i
                clicks = 1
                break
            } else {
                troop_array[i].unselect()
                pop_up_open = false;
                /* troop_selected_i = undefined */

            }
        }
    }
}




async function make_attack_roll(troop_array, user_id, buildings, bit, game_id) {
    var attacker = troop_array[attacker_index].user_trp_id;
    if (bit == 0) var defender = troop_array[defender_index].user_trp_id;
    else var defender = buildings[building_defender_index].user_bld_id;
    if (bit == 0) {
        roll_attack_number = 0;
        res = await get_dice_rolls_id(troop_array[attacker_index].trp_id, troop_array[defender_index].trp_id)
        rolls_to_hit = res.msg
        roll_attack_button.show()
        roll_attack_button.mousePressed(async function () {
            make_attack(troop_array, user_id, bit, game_id, attacker, defender)
            roll_attack_button.hide()
        }
        )

    } else if (bit == 1) make_attack(troop_array, user_id, bit, game_id, attacker, defender)

}

async function make_attack(troop_array, user_id, bit, game_id, attacker, defender) {
    let res = await attack_troop_id(user_id, attacker, defender, bit, game_id)
    if (res.msg == 'success attack' && bit == 0) {
        attacking_sound.play()
        attacking_sound.rate(3)
        roll_attack_number = res.number
        troop_array[defender_index].hurt = true
        troop_array[defender_index].timer = 2500

    } else initialize_game()
    if (res.msg == 'success attack' && bit == 1) {
        attacking_sound.play()
        attacking_sound.rate(3)

        alert('attacked building')
        initialize_game()

    } else if (res.msg == 'you won') {
        attacking_sound.play()
        attacking_sound.rate(3)
        alert('you WOOOOOOOON')
        initialize_game()
        await delete_all_from_id(user_id, game_id,oponent_info.user_player)
        window.location = "finish.html"
    } else if (res.msg == "cannot attack") {
        alert('A troop can only attack once per turn')
    } else if (res.msg == 'success missed') {
        roll_attack_number = res.number
    }
    attacker_index = -1
    defender_index = -1
    building_defender_index = -1

}
function get_dist_attack(attacker, defender) {
    distX = Math.abs(attacker.x - defender.x)
    distY = Math.abs(attacker.y - defender.y)
    return distX <= attacker.range && distY <= attacker.range;
}

function get_dist_move(troop, tile) {
    distX = Math.abs(troop.x - tile.x)
    distY = Math.abs(troop.y - tile.y)
    return {
        can_move: (troop.movement - distX - distY >= 0),
        x: distX,
        y: distY
    };
}



function roll_dice(min, sides) {
    dice_number = dice(1, sides);
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

async function train(user_id, troop_id, buildings, game_id) {

    for (let i = 0; i < buildings.length; i++) {

        if ((buildings[i].bld_name == 'Training Camp') &&
            (buildings[i].user_id == user_id) &&
            (i == buildings_selected_i)) {

            let bld_id = buildings[i].user_bld_id
            let result = await train_troop(user_id, troop_id, bld_id, game_id)
            if (result.inserted) {
                alert('troop successfully trained')
                initialize_game()
            }
        }
    }
}


function draw_pop_up_troops(troop_array, tilesize, images) {
    let w = color('white');
    let b = color('black');
    for (let i = 0; i < troop_array.length; i++) {
        troop_image = images[troop_array[i].trp_id]
        if (troop_shown == false && troop_array[i].selected == true) {
            pop_up_open = true;
            fill(170, 160, 85);
            rect(windowWidth / 1.5, 0, 501, windowHeight);
            noStroke()
            image(troop_image, windowWidth / 1.4, windowHeight / 20, troop_image.width, troop_image.height);
            fill(b)
            text('Name :' + troop_array[i].name, windowWidth / 1.4, windowHeight / 20 + troop_image.height + 50)
            text('Health :' + troop_array[i].health, windowWidth / 1.4, windowHeight / 20 + troop_image.height + 70)
            text('movement :' + troop_array[i].movement, windowWidth / 1.4, windowHeight / 20 + troop_image.height + 90)
            text('Attack :' + troop_array[i].attack, windowWidth / 1.4, windowHeight / 20 + troop_image.height + 110)
            text('Range :' + troop_array[i].range, windowWidth / 1.4, windowHeight / 20 + troop_image.height + 130)
            fill(w);
            fill(b);
            //text(troops[i].trp_health, windowWidth / 1.4, windowHeight / 1.7)
            fill(w);
            troop_shown = true;

        }
        else troop_shown = false;
    }
}


function setup_troop() {
    roll_attack_button = createButton('ROLL');
    roll_attack_button.position(windowWidth /2.3, windowHeight / 1.8);

    roll_attack_button.hide()
} 