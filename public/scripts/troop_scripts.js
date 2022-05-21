



let troop_shown = false;
let clicks = 0;
var attack = 0;


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
        // document.getElementById("troop").innerHTML = this.name;
        // document.getElementById("movement").innerHTML = this.movement;
        // document.getElementById("health").innerHTML = this.health;
        // document.getElementById("attack").innerHTML = this.attack;
    }

    unselect() {
        this.selected = false;
        // document.getElementById("troop").innerHTML = '';
        // document.getElementById("movement").innerHTML = '';
        // document.getElementById("attack").innerHTML = '';
        // document.getElementById("health").innerHTML = '';
    }

}

function draw_troops(matrix, troop_array, num_squares, user_id, square_size, diameter, x, y, images, hurt_images) {

    let c = color(255, 204, 0);
    let w = color('white');
    let b = color('black');
    let r = color('red');
    let p = color('purple');
    let bl = color('blue');
    let g = color('gray');

    for (let i = 0; i < troop_array.length; i++) {
        trp_image = images[troop_array[i].trp_id]

        //hurt_image = hurt_images[troop_array[i].trp_id]
        //if (matrix[troop_array[i].x][troop_array[i].y] == num_squares) {
        if (troop_array[i].user_id == user_id) {

            if (troop_array[i].hurt == true) {
                console.log('aa')
                image(hurt_image, troop_array[i].x * square_size + (square_size - trp_image.width / 7) / 2, troop_array[i].y * square_size - square_size / 2, trp_image.width / 7, trp_image.height / 7);
                troop_array[i].timer--
                if (troop_array[i].timer == 0) {
                    console.log(troop_array[i].timer == 0)
                    troop_array[i].hurt = false
                }
            } else image(trp_image, troop_array[i].x * square_size + (square_size - trp_image.width / 7) / 2, troop_array[i].y * square_size - square_size / 2, trp_image.width / 7, trp_image.height / 7);


            //tirei image(trp_image, troop_array[i].x * square_size + (square_size - trp_image.width / 7) / 2, troop_array[i].y * square_size - square_size / 2, trp_image.width / 7, trp_image.height / 7);x\


        } else {


            if (troop_array[i].hurt == true) {
                console.log('aa')
                image(hurt_image, troop_array[i].x * square_size + (square_size - trp_image.width / 7) / 2, troop_array[i].y * square_size - square_size / 2, trp_image.width / 7, trp_image.height / 7);

                troop_array[i].timer--
                console.log(i, troop_array[i].hurt, troop_array[i].timer)
                if (troop_array[i].timer == 0) {
                    console.log(troop_array[i].timer)
                    troop_array[i].hurt = false
                }
            }
            else {

                image(trp_image, troop_array[i].x * square_size + (square_size - trp_image.width / 7) / 2, troop_array[i].y * square_size - square_size / 2, trp_image.width / 7, trp_image.height / 7);


                //image(trp_image, troop_array[i].x * square_size + (square_size - trp_image.width / 7) / 2, troop_array[i].y * square_size - square_size / 2, trp_image.width / 7, trp_image.height / 7);

            }

        }

    }
}


async function key_troops(its_my_turn, troop_array, user_id, buildings) {
    if (its_my_turn) {
        for (i = 0; i < troop_array.length; i++) {
            if (troop_array[i].user_id == user_id) {
                if (i == troop_selected_i) {
                    if (troop_array[i].movement > 0) {
                        switch (key) {
                            case 'd':
                            case 'D':
                                troop_array[i].x += 1;
                                troop_array[i].movement -= 1
                                await update_troops_id(user_id, troop_array[i].user_trp_id, troop_array[i].x, troop_array[i].y, troop_array[i].health, troop_array[i].movement);
                                /* let response = await move_troop_id(user_id, troop_array[i].user_trp_id, 'right', troop_array[i].movement)
                                if (response != undefined) initialize_game()
                                else alert('there cant be 2 troops in the same tile')  */
                                break;
                            case 'a':
                            case 'A':
                                troop_array[i].x -= 1;
                                troop_array[i].movement -= 1
                                await update_troops_id(user_id, troop_array[i].user_trp_id, troop_array[i].x, troop_array[i].y, troop_array[i].health, troop_array[i].movement);
                                break;
                            case 'w':
                            case 'W':
                                troop_array[i].y -= 1;
                                troop_array[i].movement -= 1
                                await update_troops_id(user_id, troop_array[i].user_trp_id, troop_array[i].x, troop_array[i].y, troop_array[i].health, troop_array[i].movement);
                                break;
                            case 's':
                            case 'S':
                                troop_array[i].y += 1;
                                troop_array[i].movement -= 1
                                await update_troops_id(user_id, troop_array[i].user_trp_id, troop_array[i].x, troop_array[i].y, troop_array[i].health, troop_array[i].movement);
                                break;
                        }
                        /* document.getElementById("movement").innerHTML = troop_array[i].movement; */
                    }
                    switch (key) {
                        case 'l':
                        case 'L':
                            troop_array[i].movement = troop_array[i].init_movement;
                            /* document.getElementById("movement").innerHTML = troop_array[i].movement; */
                            break;

                        case 'k':
                        case 'K':
                            troop_array[i].movement = 500;
                            /* document.getElementById("movement").innerHTML = troop_array[i].movement; */
                            break;
                        case 'i':
                        case 'I':
                            set_attacker(troop_array, user_id)
                            break;
                    }
                }
            }
        }
        switch (key) {
            case 'p':
            case 'P':

                make_attack(troop_array, user_id, buildings)
                break;
            case 'o':
            case 'O':
                set_defender(troop_array, user_id, buildings)

                make_attack(troop_array, user_id)
                break;
            case 'o':
            case 'O':
                set_defender(troop_array, user_id)

                break;

        }
    }

}


async function mouse_pressed_troops(user_id, troop_array, buildings) {
    let tile = mouse_over_tile()
    for (let i = 0; i < troop_array.length; i++) {
        let can_move = get_dist_move(troop_array[i], tile)
        if (tile.x >= 0 && tile.x <= 15) {
            if ((can_move_troop) &&
                (troop_selected_i == i) &&
                (can_move) && (clicks > 0) &&
                (troop_array[i].user_id == user_id) &&
                (its_my_turn)) {
                troop_array[i].x = tile.x
                troop_array[i].y = tile.y
                can_move_troop = false
                troop_selected_i = 0
                clicks = 0
                await update_troops_id(user_id, troop_array[i].user_trp_id, troop_array[i].x, troop_array[i].y, troop_array[i].health, troop_array[i].movement);
                break
            }
        }
        if ((can_attack_troop) &&
            (troop_array[i].x == tile.x && troop_array[i].y == tile.y) &&
            (troop_array[i].user_id != user_id) &&
            (attack > 0)) {
            troop_array[i].select()
            set_defender(troop_array, user_id, buildings)
            make_attack(troop_array, user_id)
            can_attack_troop = false;
            attack = 0;
            break
        }

        if ((can_attack_troop) &&
            (troop_array[i].x == tile.x && troop_array[i].y == tile.y) &&
            (troop_array[i].user_id == user_id)) {
            troop_array[i].select()
            set_attacker(troop_array, user_id)
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
        }
    }
}





function set_attacker(troop_array, user_id) {
    for (let i = 0; i < troop_array.length; i++) {
        if (troop_array[i].user_id == user_id) {
            if (troop_array[i].selected) {
                troop_array[i].attacker = true;

                console.log('attacker')
                break;
            }
        }
    }
}

function set_defender(troop_array, user_id, buildings) {
    for (let i = 0; i < troop_array.length; i++) {
        if (troop_array[i].user_id != user_id) {
            if (troop_array[i].selected) {
                troop_array[i].defender = true;
                console.log('defender')
                break;
            }
        }
    }
    for (let i = 0; i < buildings.length; i++) {
        console.log(buildings[i].selected)
        if (buildings[i].user_id != user_id) {

            if (buildings[i].selected) {
                console.log('aaa')
                buildings[i].defender = true;
                console.log('defender')
                break;
            }
        }
    }
}

async function make_attack(troop_array, user_id, buildings) {
    var attacker = {};
    var defender = {};
    let attacker_index = null;
    let defender_index = null;
    let can_attack = false;
    let dice_dmg_multiplier = null;

    for (let i = 0; i < troop_array.length; i++) {
        if (troop_array[i].user_id == user_id) {
            if (troop_array[i].attacker) {
                attacker = troop_array[i]
                attacker_index = i
                break;
            }
        }
    }
    for (let i = 0; i < troop_array.length; i++) {
        if (troop_array[i].user_id != user_id) {
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
        troop_array[defender_index].hurt = true
        troop_array[defender_index].timer = 100

        console.log('made attack')
        defender.health -= attacker.attack * dice_dmg_multiplier;
        if (defender.health <= 0) {
            await delete_troops_id(troop_array[defender_index].user_trp_id)
        }
        await update_troops_id(defender.user_id, defender.user_trp_id, defender.x, defender.y, defender.health);
        alert('defender health after attack : ' + defender.health)
        troop_array[attacker_index].attacker = false;
        troop_array[defender_index].defender = false;
        document.location.reload(true)
    }
}
function get_dist_attack(attacker, defender) {
    distX = Math.abs(attacker.x - defender.x)
    distY = Math.abs(attacker.y - defender.y)
    return distX <= attacker.range && distY <= attacker.range;
}

function get_dist_move(troop, tile) {
    distX = Math.abs(troop.x - tile.x)
    distY = Math.abs(troop.y - tile.y)
    return distX <= troop.movement && distY <= troop.movement;
}



function roll_dice(min, sides) {
    dice_number = dice(1, sides);
    //document.getElementById("dice").innerHTML = dice_number;
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

async function train(user_id, troop_id, buildings) {
    console.log(buildings)
    for (let i = 0; i < buildings.length; i++) {
        console.log('qq')
        if ((buildings[i].bld_name == 'Training Camp') &&
            (buildings[i].user_id == user_id)) {
            /* (buildings[i].selected == true) */
            console.log('qq')
            let bld_id = buildings[i].user_bld_id
            let result = await train_troop(user_id, troop_id, bld_id)
            if (result.inserted) {
                alert('troop successfully trained')
                document.location.reload(true)
            }
        }
    }
}

function draw_pop_up_troops(troop_array, tilesize, images) {
    7
    let w = color('white');
    let b = color('black');
    for (let i = 0; i < troop_array.length; i++) {
        troop_image = images[troop_array[i].trp_id]
        if (troop_shown == false && troop_array[i].selected == true) {
            fill(170, 160, 85);
            rect(450, 0, 688, 688);
            noStroke()
            image(troop_image, 465, 20, tilesize, tilesize);
            fill(w);
            fill(b);
            text(troops[i].trp_health, 535, 210)
            fill(w);
            troop_shown = true;

        }
        else troop_shown = false;
    }
}