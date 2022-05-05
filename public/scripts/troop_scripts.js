



class troop{
    constructor(user_id,user_trp_id,name,health,init_movement,movement,attack,range, max_amount,x,y){
        this.user_id = user_id ;
        this.user_trp_id = user_trp_id;
        this.name = name;
        this.health = health;
        this.init_movement = init_movement;
        this.movement = movement;
        this.attack = attack;
        this.range = range;
        this.max_amount = max_amount;
        this.x = x ;
        this.y = y ;
        this.selected = false;
        this.attacker = false;
        this.defender = false;
        this.square_x = 0;
        this.square_y = 0
    }
    select() {
            this.selected = true;
            document.getElementById("troop").innerHTML = this.name;
            document.getElementById("movement").innerHTML = this.movement;
            document.getElementById("attack").innerHTML = this.attack;
    }

    unselect() {
        this.selected = false;
        document.getElementById("troop").innerHTML = '';
        document.getElementById("movement").innerHTML = '';
        document.getElementById("attack").innerHTML = '';
    }

}
async function draw_troops(matrix,troop_array,num_squares,user_id,square_size,diameter,x,y){
  
    let c = color(255, 204, 0);
    let w = color('white');
    let b = color('black');
    let r = color('red');
    let p = color('purple');
    let bl = color('blue');
    let g = color('gray');
    for (let i = 0; i < troop_array.length; i++) {
        if (matrix[troop_array[i].x][troop_array[i].y] == num_squares) {
            if (troop_array[i].user_id == user_id) {

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

async function key_troops(its_my_turn,troop_array,user_id){
    if (its_my_turn) {
        for (i = 0; i < troop_array.length; i++) {
            if (troop_array[i].user_id == user_id) {
                if (troop_array[i].selected) {
                    if (troop_array[i].movement > 0) {
                        switch (key) {
                            case 'd':
                            case 'D':
                                troop_array[i].x += 1;
                                troop_array[i].movement -= 1
                                await update_troops_id(user_id, troop_array[i].user_trp_id, troop_array[i].x, troop_array[i].y, troop_array[i].health, troop_array[i].movement);
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
                        case 'i':
                        case 'I':
                            set_attacker(troop_array,1)
                            break;
                    }
                    document.getElementById("movement").innerHTML = troop_array[i].movement;
                }
            }
        }
        switch (key) {
            case 'p':
            case 'P':
                make_attack(troop_array,1)
                break;
            case 'o':
            case 'O':
                set_defender(troop_array,1)
                break;
        }
    }
}

function mouse_pressed_troops(troop_array){
    for (let i = 0; i < troop_array.length; i++) {
        troop_array[i].selected = false;
        let distance = dist(mouseX, mouseY, troop_array[i].square_x, troop_array[i].square_y);
        if (distance < radius) {
            //troop_array[i].selected = true;
            troop_array[i].select()
            break
        } else {
            //troop_array[i].selected = false;
            troop_array[i].unselect()
        }
    }
}



function set_attacker(troop_array,user_id) {
    for (let i = 0; i < troop_array.length; i++) {
        if (troop_array[i].user_id == user_id) {
            if (troop_array[i].selected) {
                troop_array[i].attacker = true;
                break;
            }
        }
    }
}

function set_defender(troop_array,user_id) {
    for (let i = 0; i < troop_array.length; i++) {
        if (troop_array[i].user_id != user_id) {
            if (troop_array[i].selected) {
                troop_array[i].defender = true;
                break;
            }
        }
    }
}

async function make_attack(troop_array,user_id) {
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
        alert('defender health after attack : '+defender.health)
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

async function train(buildings,user_id,resources) {
    let troop_iron_cost = 5;
    let troop_food_cost = 5;
    for (let i = 0; i < buildings.length; i++) {
        if (buildings[i].bld_name == 'Training Camp') {
            if (buildings[i].user_id == user_id) {
                if ((resources[0].rsc_amount - troop_iron_cost >= 0) && (resources[1].rsc_amount - troop_food_cost >= 0)) {
                    alert("Troop Successfully Trained");
                    await train_troop(user_id, 1, buildings[i].bld_x, buildings[i].bld_y, 5, 2)
                    await update_resources_id(user_id, resources[0].rsc_amount - troop_iron_cost, 1)
                    await update_resources_id(user_id, resources[1].rsc_amount - troop_food_cost, 2)
                    document.location.reload(true)
                }
            }
        }
    }
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


