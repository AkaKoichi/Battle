

let prepare_to_train = false;
let buttons = [];
let troops_resources = [];
let y;
let x;
let y_pop_buttons = 240


class building {
    constructor(user_id, user_bld_id, bld_id, name, health, bld_x, bld_y) {
        this.user_id = user_id;
        this.user_bld_id = user_bld_id;
        this.bld_id = bld_id;
        this.bld_x = bld_x;
        this.bld_y = bld_y;
        this.bld_name = name;
        this.bld_health = health;
        this.selected = false;
    }

    select() {
        this.selected = true;
        document.getElementById("building").innerHTML = this.bld_name;

    }

    unselect() {
        this.selected = false;
        document.getElementById("building").innerHTML = '';
        for (let i = 0; i < buttons.length; i++)  buttons[i].hide()
    }

}

<<<<<<< HEAD
async function buildings_setup(user_id, buildings) {
=======
async function resources_for_troops() {

}

async function buildings_setup(/* user_id,buildings */) {
>>>>>>> 45252d2b2e4282e73b7926c7311eeec2cd5bf84a
    let last_name;
    let troop = 0
    troops_resources = await get_troops_resources();
    for (let i = 0; i < troops_resources.length; i++) {
        if (last_name == troops_resources[i].trp_name) {
            console.log('a')
        } else {
            let temp_button = createButton('Train');
            temp_button.position(1350, y_pop_buttons);
            /*  temp_button.mousePressed(async function () {
                 train(user_id, 1, buildings)
             }); */
            temp_button.hide();
            buttons.push(temp_button);
            last_name = troops_resources[i].trp_name;

        }
        y_pop_buttons += 15
        /*   for (let i = 0; i < troops_resources.length; i++) {
              let temp_button = createButton('T');
              temp_button.position(1320, y_pop_buttons);
              temp_button.hide();
              buttons.push(temp_button);
              y_pop_buttons += 15
          } */
    }
}

function draw_buildings(matrix, buildings_array, num_squares, user_id, square_size, tilesize, x, y, images) {
    let c = color(255, 204, 0);
    let w = color('white');
    let b = color('black');
    let r = color('red');
    let p = color('purple');
    let bl = color('blue');
    let g = color('gray');
    for (let i = 0; i < buildings_array.length; i++) {
        bulding_image = images[buildings_array[i].bld_id]

        if (matrix[buildings_array[i].bld_x][buildings_array[i].bld_y] == num_squares) {
            if (buildings_array[i].user_id == user_id) {
                // fill(bl);
                //rect(x, y, tilesize, tilesize);
                image(bulding_image, x, y, tilesize, tilesize);
                //fill(b);
                //text(buildings_array[i].bld_name, x + square_size / 2 - 10, y + square_size / 2);
                // fill(w);

            } else {

                //fill(r);
                // rect(x, y, tilesize, tilesize);
                image(bulding_image, x, y, tilesize, tilesize);
                // fill(b);
                //text(buildings_array[i].bld_name, x + square_size / 2 - 10, y + square_size / 2);
                //fill(w);
            }

        }
    }
}

async function key_buildings(its_my_turn, troop_array, user_id, resources) {
    if (its_my_turn) {
        for (i = 0; i < troop_array.length; i++) {
            if (troop_array[i].user_id == user_id) {
                if (troop_array[i].selected) {
                    if (troop_array[i].movement > 0) {
                        switch (key) {
                            case 'b':
                            case 'B':
                                build_building(troop_array, user_id, resources);
                                break;
                        }
                    }
                }
            }
        }
    }
}



async function build_building(troop_array, user_id, resources) {
    let building_iron_cost = 4;
    let building_food_cost = 4;

    for (let i = 0; i < troop_array.length; i++) {
        if (troop_array[i].user_id == user_id) {
            if (troop_array[i].selected) {
                if ((resources[0].rsc_amount - building_iron_cost >= 0) && (resources[1].rsc_amount - building_food_cost >= 0)) {
                    alert("Building Successfully Built");
                    await build(user_id, 2, troop_array[i].x, troop_array[i].y, 5)
                    await update_resources_id(user_id, resources[0].rsc_amount - building_iron_cost, 1)
                    await update_resources_id(user_id, resources[1].rsc_amount - building_food_cost, 2)
                    document.location.reload(true)
                    break
                }
            }
        }
    }
}

function mouse_pressed_buildings(building_array, x, y) {
    for (let i = 0; i < building_array.length; i++) {
        if (x == building_array[i].bld_x && y == building_array[i].bld_y) {
            building_array[i].select();

            break
        } else {
            building_array[i].unselect()
        }
    }
}

function draw_pop_up_buildings(buildings_array, tilesize, images) {7
    let w = color('white');
    let b = color('black');
    for (let i = 0; i < buildings_array.length; i++) {
        bulding_image = images[buildings_array[i].bld_id]
        if (prepare_to_train == false && buildings_array[i].selected == true && buildings_array[i].bld_name == 'Training Camp') {

            if (troops_resources == []) {
                return
            } else {

                let last_name;

                fill(15, 166, 55);
                rect(450, 0, 688, 688);
                image(bulding_image, 465, 20, tilesize, tilesize);
                fill(w);
                fill(b);
                text(buildings[i].bld_health, 535, 210)
                fill(w);
                let y_pop = 250;
                for (let i = 0; i < troops_resources.length; i++) {
                    if (last_name == troops_resources[i].trp_name) {
                        text(troops_resources[i].rsc_amount, 620, y_pop - 15)
                        for (let i = 0; i < buttons.length; i++)  buttons[i].show()
                    } else {
                        text(troops_resources[i].trp_name, 455, y_pop)
                        text(troops_resources[i].rsc_amount, 575, y_pop)
                        last_name = troops_resources[i].trp_name;
                    }
                    y_pop += 15

                    prepare_to_train = true;
                }

            }

        }
        else if((prepare_to_train == false && buildings_array[i].selected == true) && (buildings_array[i].bld_name == 'tc1'||buildings_array[i].bld_name == 'tc2'||buildings_array[i].bld_name =='tc3' || buildings_array[i].bld_name =='tc4')){
            console.log(buildings_array[i].selected)
            console.log(buildings_array[i].bld_name)
            fill(15, 166, 55);
            rect(450, 0, 688, 688);
            image(bulding_image, 465, 20, tilesize, tilesize);
            fill(w);
            fill(b);
            text(buildings[i].bld_health, 535, 210)
            fill(w);
            prepare_to_train = true;
        }
        else if(prepare_to_train == false && buildings_array[i].selected == true && (buildings_array[i].bld_name == 'Field' || buildings_array[i].bld_name == 'Mine')){
            fill(15, 166, 55);
            rect(450, 0, 688, 688);
            image(bulding_image, 465, 20, tilesize, tilesize);
            fill(w);
            fill(b);
            text(buildings[i].bld_health, 535, 210)
            fill(w);
            prepare_to_train = true;
        }
        else prepare_to_train = false;
    }
}
