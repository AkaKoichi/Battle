async function draw_buildings(matrix, buildings_place, num_squares, user_id, square_size, tilesize, x, y) {
    let c = color(255, 204, 0);
    let w = color('white');
    let b = color('black');
    let r = color('red');
    let p = color('purple');
    let bl = color('blue');
    let g = color('gray');
    for (let i = 0; i < buildings_place.length; i++) {
        if (matrix[buildings_place[i].bld_x][buildings_place[i].bld_y] == num_squares) {
            //console.log(userInfo)
            if (buildings_place[i].user_id == user_id) {
                fill(bl);
                rect(x, y, tilesize, tilesize);
                fill(b);
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
}

async function key_buildings(its_my_turn,troop_array,user_id,resources) {
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
    console.log(troop_array)

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
