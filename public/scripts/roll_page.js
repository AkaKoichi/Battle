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
let font_regular;

function preload(){
   // font_regular = loadFont('Founts/Track-Regular.otf')

    roll_button = createImg('/images/buttons/roll_dice_button.png');
    persia_button = createImg('/images/buttons/persian_button.png');
    macedonia_button = createImg('/images/buttons/macedonia_button.png')

}

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
    createCanvas(windowWidth, windowHeight);
    //textFont(font_regular);

    roll_button.position(windowWidth / 2.5, windowHeight /1.5);
    roll_button.mousePressed(async function () {
        let res = await update_dice_number_id(userid)
        dice_number = res.msg
        roll_button.attribute('disabled', '');

        //
    }
    )
    roll_button.mouseOver(function () {
        roll_button.attribute('src', '/images/buttons/roll_dice_button_over.png')
    })
    roll_button.mouseOut(function () {
        roll_button.attribute('src', '/images/buttons/roll_dice_button.png')
    })

    persia_button.position(windowWidth / 20, windowHeight / 4);
    persia_button.mousePressed(async function () {
       await insert_initial_state_id(userid, game_id,1,oponent_id)
       window.location = "gamelib.html";

    }
    )
    persia_button.mouseOver(function () {
        persia_button.attribute('src', '/images/buttons/persian_button_over.png')
    })
    persia_button.mouseOut(function () {
        persia_button.attribute('src', '/images/buttons/persian_button.png')
    })
    persia_button.hide()

    macedonia_button.position(windowWidth / 1.5, windowHeight / 4);
    macedonia_button.mousePressed(async function () {
        await insert_initial_state_id(userid, game_id,2,oponent_id)
        window.location = "gamelib.html";


    }
    )
    macedonia_button.mouseOver(function () {
        macedonia_button.attribute('src', '/images/buttons/macedonia_button_over.png')
    })
    macedonia_button.mouseOut(function () {
        macedonia_button.attribute('src', '/images/buttons/macedonia_button.png')
    })
    macedonia_button.hide()
}

async function draw() {
    clear()
    
    textSize(45);
    text(dice_number,windowWidth /2.3, windowHeight / 2.5)
    textSize(30);
    if (pop_up) {
        text('Choose your Faction',windowWidth /2.9, windowHeight / 5)
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