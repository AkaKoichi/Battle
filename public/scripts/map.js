

let userInfo;
let troop_array = []

let troop_movement = [];
let buildings_place = [];

let tilesize = 800 / 20;
let matrix = [];

const radius = tilesize / 2;
const diameter = radius * 2;

window.onload = async () => {
    let user_info = await get_user_info();
    //get_user_info().then((user_info) => {

    userInfo = user_info;
    document.getElementById("name").innerHTML = userInfo.username;
    document.getElementById("id").innerHTML = userInfo.user_id;
    console.log()

    // get_buildings_by_id(userInfo.usr_id).then((buildings) => {

    //     buildings_place = buildings; 
    // });
    let troops = await get_troops_by_id(userInfo.user_id);

    troop_movement = troops;
    for (i = 0; i < troop_movement.length; i++) {
        troop_array.push({
            name: troop_movement[i].trp_name,
            health: troop_movement[i].trp_health,
            init_movement: troop_movement[i].trp_movement,
            movement: troop_movement[i].trp_movement,
            attack: troop_movement[i].trp_atack,
            range: troop_movement[i].trp_range,
            max_amount: troop_movement[i].trp_max_amount,
            x: troop_movement[i].troop_x,
            y: troop_movement[i].troop_y,
            selected: false,
            square_x: 0,
            square_y: 0

        });
    }
    //})
    // update_troops_id().then((update) => {
    //     update_troops=update
    // });
}

function setup() {

    createCanvas(900, 900);
    tilesize = width / 20;
    let pos = 0;
    for (let x = 0; x < 20; x++) {

        matrix[x] = []

        for (let y = 0; y < 20; y++) {

            pos++;
            matrix[x][y] = pos;

        }
    }
}
function draw() {

    background("black");
    let square_size = width / 20;
    let num_squares = 0;

    for (let x = 0; x < height; x += square_size) {
        for (let y = 0; y < width; y += square_size) {
            rect(x, y, square_size, square_size);
            text(num_squares, x + square_size / 2 - 10, y + square_size / 2);
            num_squares++
            for (let i = 0; i < troop_array.length; i++) {
                if (matrix[troop_array[i].x][troop_array[i].y] == num_squares) {

                    circle(x + square_size / 2, y + square_size / 2, diameter);
                    troop_array[i].square_x = x + square_size / 2
                    troop_array[i].square_y = y + square_size / 2
                }
            }

            for (let i = 0; i < buildings_place.length; i++) {
                if (matrix[buildings_place[i].build_x][buildings_place[i].build_y] == num_squares) {
                    rect(x + square_size / 2 - 10, y + square_size / 2 - 10, 20, 20);
                }
            }

        }
    }

}

async function keyPressed() {
    for (i = 0; i < troop_array.length; i++) {
        if (troop_array[i].selected) {
            if (troop_array[i].movement > 0) {
                switch (key) {
                    case 'd':
                    case 'D':

                        troop_array[i].x += 1;
                        troop_array[i].movement -= 1

                        break;

                    case 'a':
                    case 'A':

                        troop_array[i].x -= 1;
                        troop_array[i].movement -= 1

                        break;

                    case 'w':
                    case 'W':

                        troop_array[i].y -= 1;
                        troop_array[i].movement -= 1

                        break;

                    case 's':
                    case 'S':

                        troop_array[i].y += 1;
                        troop_array[i].movement -= 1

                        break;
                }
                document.getElementById("movement").innerHTML = troop_array[i].movement;
            }
        }
        switch (key) {
            case 'l':
            case 'L':
                troop_array[i].movement = troop_array[i].init_movement;
                document.getElementById("movement").innerHTML = troop_array[i].movement;
                break;
        }
        switch (key) {
            case 'k':
            case 'K':
                troop_array[i].movement = 500;
                document.getElementById("movement").innerHTML = troop_array[i].movement;
                break;
        }
    }
}

function mousePressed() {

    for (i = 0; i < troop_array.length; i++) {
        console.log(i)
        let distance = dist(mouseX, mouseY, troop_array[i].square_x, troop_array[i].square_y);
        if (distance < radius) {
            console.log('a')
            troop_array[i].selected = true;
            console.log(troop_array[i].selected)
            shape_selected()
        } else {
            troop_array[i].selected = false
            document.getElementById("movement").innerHTML = '';
            document.getElementById("troop").innerHTML = '';

        }
    }
}




function shape_selected() {
    for (i = 0; i < troop_array.length; i++) {

        if (troop_array[i].selected) {

            document.getElementById("troop").innerHTML = troop_array[i].name;

            document.getElementById("movement").innerHTML = troop_array[i].movement;
        };
    };
}



function object() {
    var canvas = document.getElementById('circle');
    if (canvas.getContext) {
        var ctx = canvas.getContext('2d');
        var X = canvas.width / 2;
        var Y = canvas.height / 2;
    }
}

// function end_turn(){
//     for (i = 0 ; i < troop_array.length; i++) {
//         console.log(i)
//         update_troops(userInfo.usr_id,troop_array[i].health,troop_array[i].x,troop_array[i].y,troop_array[i].user_troop_id);

//     }
// }

