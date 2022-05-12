
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
      
    }

}


function draw_buildings(matrix, buildings_array, num_squares, user_id, square_size, tilesize, x, y) {
    let c = color(255, 204, 0);
    let w = color('white');
    let b = color('black');
    let r = color('red');
    let p = color('purple');
    let bl = color('blue');
    let g = color('gray');
    for (let i = 0; i < buildings_array.length; i++) {
        if (matrix[buildings_array[i].bld_x][buildings_array[i].bld_y] == num_squares) {
            if (buildings_array[i].user_id == user_id) {
                fill(bl);
                rect(x, y, tilesize, tilesize);
                fill(b);
                text(buildings_array[i].bld_name, x + square_size / 2 - 10, y + square_size / 2);
                fill(w);

            } else {

                fill(r);
                rect(x, y, tilesize, tilesize);
                fill(b);
                text(buildings_array[i].bld_name, x + square_size / 2 - 10, y + square_size / 2);
                fill(w);
            }
            if(buildings_array[i].selected == true)
            {
                fill(127, 129, 133,127); 
                rect(100, 100, tilesize, tilesize);
                fill(w)
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

function mouse_pressed_buildings(building_array,x,y) {
    for (let i = 0; i < building_array.length; i++) {
        if (x == building_array[i].bld_x && y == building_array[i].bld_y) {
            building_array[i].select()
            break
        } else {
            building_array[i].unselect()
        }
    }
}


