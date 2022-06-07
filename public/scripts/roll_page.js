

let id;
let room;
let userInfo;
let userid;;
var username;
let game_id
let user_board = [];
let pop_up = false;
let dice_number = ''

let persia_button;
let macedonia_button;

window.onload = async () => {
    get_user_info().then((user_info) => {

        let userInfo = user_info;

        username = userInfo.username;
        userid = userInfo.user_id;
        trophies = userInfo.user_trophies;
        get_game_id(userid).then((game_info) => {
            game_id = game_info.game_id
            get_oponent_id(userid,game_id).then((oponent_info) => {
                oponent_id = oponent_info.user_player
            })
        })
    });

    setInterval(() => {
        if (pop_up == false) {
            check_dice()
        }

    }, 1000);
}


function setup() {
    createCanvas(1470, 730);
    roll_button = createButton('roll dice');
    roll_button.position(1470 / 2, 650);
    roll_button.mousePressed(async function () {
        let res = await update_dice_number_id(userid)
        dice_number = res.msg
        roll_button.attribute('disabled', '');

        //
    }
    )

    persia_button = createButton('pesia');
    persia_button.position(450, 200);
    persia_button.mousePressed(async function () {
       await insert_initial_state_id(userid, game_id,1,oponent_id)
       window.location = "gamelib.html";

    }
    )
    persia_button.hide()

    macedonia_button = createButton('macedonia');
    macedonia_button.position(850, 200);
    macedonia_button.mousePressed(async function () {
        await insert_initial_state_id(userid, game_id,2,oponent_id)
        window.location = "gamelib.html";


    }
    )
    macedonia_button.hide()
}

async function draw() {
    clear()

    text(dice_number, 1470 / 2, 730 / 2)
    if (pop_up) {
        rect(300, 100, 800, 400)
    }
}

async function check_dice() {
    if (pop_up == false) {
        res = await check_if_dice_rolled_id(game_id)
        console.log(res.msg)
        if (res.msg == userid) {
            pop_up = true
            persia_button.show()
            macedonia_button.show()
        }else if (res.msg == 'not rolled');  
        else window.location = "gamelib.html";
       

    }
}