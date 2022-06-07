
let prepare_to_train = false;
let buttons = [];
let troops_resources = [];
let y;
let x;
let y_pop_buttons = 0;
let mc_tc;
let per_tc;


function preload() {
    mc_tc = loadImage('/images/mc_tc.png');
    per_tc = loadImage('/images/per_tc.png');
}

class building {
    constructor(user_id, user_bld_id, bld_id, name, health, current_health, bld_x, bld_y) {
        this.user_id = user_id;
        this.user_bld_id = user_bld_id;
        this.bld_id = bld_id;
        this.x = bld_x;
        this.y = bld_y;
        this.bld_name = name;
        this.health = health;
        this.current_health = current_health;
        this.selected = false;
        this.defender = false;
    }

    select() {
        this.selected = true;
    }

    unselect() {
        this.selected = false;
        for (let i = 0; i < buttons.length; i++)  buttons[i].hide()
    }

}
function mouse_pressed_buildings(building_array, x, y, troop_array, user_id, game_id) {
    let tile = mouse_over_tile()

    for (let i = 0; i < building_array.length; i++) {
        if ((tile.x >= 0 && tile.x <= 15) && (tile.y >= 0 && tile.y <= 15)) {
            if ((can_attack_troop) &&
                (building_array[i].x == tile.x && building_array[i].y == tile.y) &&
                (building_array[i].user_id != user_id) &&
                (attack > 0)) {
                building_defender_index = i;

                make_attack_roll(troop_array, user_id, building_array, 1, game_id)
                can_attack_troop = false;
                attack = 0;
                break
            }
            if (y == building_array[i].x && x == building_array[i].y) {
                building_array[i].select();
                buildings_selected_i = i

                break
            } else {
                building_array[i].unselect()
                pop_up_open = false;
            }
        }
    }
}

async function buildings_setup(user_id, buildings, fac_id, game_id) {
    let last_name;
    console.log(fac_id)
    troops_resources = await get_troops_resources(fac_id,user_id);
    console.log(troops_resources)
    for (let i = 0; i < troops_resources.length; i++) {
        if (last_name == troops_resources[i].trp_name) {

        } else {
            let temp_button = createButton('Train');
            temp_button.position(windowWidth / 1.05, windowHeight / 1.59 + y_pop_buttons);
            temp_button.mousePressed(async function () {
                train(user_id, troops_resources[i].trp_id, buildings, game_id)

            });
            temp_button.hide();
            buttons.push(temp_button);
            last_name = troops_resources[i].trp_name;

        }
        y_pop_buttons += 15
    }
}

function draw_buildings(matrix, buildings_array, num_squares, user_id, square_size, tilesize, x, y, images) {


    for (let i = 0; i < buildings_array.length; i++) {
        if (buildings_array == 'unedefined') return
        bulding_image = images[buildings_array[i].bld_id]

        if (matrix[buildings_array[i].y][buildings_array[i].x] == num_squares) {
            if (buildings_array[i].user_id == user_id) {
                image(bulding_image, x, y, tilesize, tilesize);
            } else {
                image(bulding_image, x, y, tilesize, tilesize);

            }
        }
    }
}

async function key_buildings(its_my_turn, troop_array, user_id, game_id, fac_id) {
    if (its_my_turn) {
        for (i = 0; i < troop_array.length; i++) {
            if (troop_array[i].user_id == user_id) {
                if (troop_array[i].selected) {
                    switch (key) {
                        case 'b':
                        case 'B':
                            build_building(troop_array, user_id, game_id, fac_id);
                            break;
                    }

                }
            }
        }
    }
}



async function build_building(troop_array, user_id, game_id, fac_id) {
    let built = false;


    if (troop_array[troop_selected_i].selected) {
        for (let j = 0; j < resources_places.length; j++) {
            if (troop_array[troop_selected_i].x == resources_places[j].x && troop_array[troop_selected_i].y == resources_places[j].y) {
                if (resources_places[j].resource == 'iron') {
                    let res = await build(user_id, troop_array[troop_selected_i].user_trp_id, 1, game_id, fac_id)//tirar hard code
                    if (res.result.msg == 'building exists here') {
                        alert('cannot build here , building already exists in this tile')
                        return
                    }
                    building_sound.play()
                    building_sound.rate(2)
                    alert("Building Successfully Built");
                    initialize_game()
                    built = true;
                    break
                }

                if (resources_places[j].resource == 'food') {
                    console.log('fff')
                    let res = await build(user_id, troop_array[troop_selected_i].user_trp_id, 2, game_id, fac_id)// tirar hard code
                    console.log(res)
                    if (res.result.msg == 'building exists here') {
                        alert('cannot build here , building already exists in this tile')
                        return
                    }
                    building_sound.play()
                    building_sound.rate(2)
                    alert("Building Successfully Built");
                    initialize_game()
                    built = true;
                    break
                }
            }
        }
        if (!built) {
            let res = await build(user_id, troop_array[troop_selected_i].user_trp_id, 3, game_id, fac_id)// tirar hard code
            if (res.result.msg == 'building exists here') {
                alert('cannot build here , building already exists in this tile')
                return
            }
            building_sound.play()
            building_sound.rate(2)
            alert("Building Successfully Built");
            initialize_game();
            location.reload()
        }
    }
}





function set_defender_building(buildings, user_id) {
    for (let i = 0; i < buildings.length; i++) {
        if (buildings[i].user_id != user_id) {
            if (buildings[i].selected) {
                buildings[i].defender = true;
                break;
            }
        }
    }
}


function draw_pop_up_buildings(buildings_array, tilesize, images, troops) {

    let w = color('white');
    let b = color('black');
    for (let i = 0; i < buildings_array.length; i++) {
        bulding_image = images[buildings_array[i].bld_id]
        for (let i = 0; i < troops.length; i++) {
            if (troops[i].selected) {
                return
            }
        }

        if (prepare_to_train == false && buildings_array[i].selected == true && buildings_array[i].bld_name == 'Training Camp') {

            if (troops_resources == []) {
                return
            } else {
                pop_up_open = true;

                let last_name;

                fill(170, 160, 85);
                rect(windowWidth / 1.5, 0, 501, windowHeight);
                noStroke()
                image(bulding_image, windowWidth / 1.4, windowHeight / 20, bulding_image.width, bulding_image.height);
                fill(w);
                fill(b);
                text("Name :" + buildings_array[i].bld_name, windowWidth / 1.4, windowHeight / 2.3)
                text("Health : " + buildings_array[i].current_health, windowWidth / 1.4, windowHeight / 2.1)
                text("FOOD", windowWidth / 1.31, windowHeight / 1.8)
                text("IRON", windowWidth / 1.21, windowHeight / 1.8)
                fill(w);
                let y_pop = 250;
                for (let i = 0; i < troops_resources.length; i++) {
                    if (last_name == troops_resources[i].trp_name) {
                        text(troops_resources[i].rsc_amount, windowWidth / 1.2, windowHeight / 3 + y_pop - 15)
                        for (let i = 0; i < buttons.length; i++)  buttons[i].show()
                    } else {
                        text(troops_resources[i].trp_name, windowWidth / 1.45, windowHeight / 3 + y_pop)
                        text(troops_resources[i].rsc_amount, windowWidth / 1.3, windowHeight / 3 + y_pop)
                        last_name = troops_resources[i].trp_name;
                    }
                    y_pop += 15

                    prepare_to_train = true;
                }
            }
        }
        else if ((prepare_to_train == false && buildings_array[i].selected == true) && (buildings_array[i].bld_name == 'tc1' || buildings_array[i].bld_name == 'tc2' || buildings_array[i].bld_name == 'tc3' || buildings_array[i].bld_name == 'tc4')) {
            pop_up_open = true;
            fill(170, 160, 85);
            rect(windowWidth / 1.5, 0, 501, windowHeight);
            noStroke()
            if (buildings_array[i].bld_name == 'tc1' || buildings_array[i].bld_name == 'tc2') {
                image(per_tc, windowWidth / 1.35, windowHeight / 20, per_tc.width/1.5, per_tc.height/1.5);
            } else image(mc_tc, windowWidth / 1.35, windowHeight / 20, mc_tc.width/1.5, mc_tc.height/1.5);

            fill(w);
            fill(b);
            text('Town Center', windowWidth / 1.3, windowHeight / 1.8)
            text(buildings_array[i].current_health, windowWidth / 1.4, windowHeight / 1.8)
            fill(w);
            prepare_to_train = true;
        }
        else if (prepare_to_train == false && buildings_array[i].selected == true && buildings_array[i].bld_name == 'Field') {
            fill(170, 160, 85);
            rect(windowWidth / 1.5, 0, 501, windowHeight);
            noStroke()
            image(bulding_image, windowWidth / 1.4, windowHeight / 20, bulding_image.width, bulding_image.height);
            fill(w);
            fill(b);
            text(buildings_array[i].bld_name, windowWidth / 1.3, windowHeight / 2.3)
            text(buildings_array[i].current_health, windowWidth / 1.4, windowHeight / 2)
            fill(w);
            prepare_to_train = true;
        }
        else if (prepare_to_train == false && buildings_array[i].selected == true && buildings_array[i].bld_name == 'Mine') {
            pop_up_open = true;
            fill(170, 160, 85);
            rect(windowWidth / 1.5, 0, 501, windowHeight);
            noStroke()
            image(bulding_image, windowWidth / 1.4, windowHeight / 20, bulding_image.width, bulding_image.height);
            fill(w);
            fill(b);
            text(buildings_array[i].bld_name, windowWidth / 1.3, windowHeight / 2.8)
            text(buildings_array[i].current_health, windowWidth / 1.4, windowHeight / 2.5)
            fill(w);
            prepare_to_train = true;
        }
        else if (buildings_array[i].selected == false) {
            prepare_to_train = false
        }
    }
} 