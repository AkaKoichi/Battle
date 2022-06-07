let id;
let room;
let userInfo;
let userid;;
var username;
let game_id
let user_board = [];

var trophies;
let x = 950;
let y = 130;

window.onload = async () => {
    get_user_info().then((user_info) => {

        let userInfo = user_info;
        username = userInfo.username;
        userid = userInfo.user_id;
        trophies = userInfo.user_trophies;



    });


}

async function enter_room() {
    res = await check_if_game_started_id(userid)
    if (res == false) {
        window.location = "roll_page.html";

    } else if (res == true) window.location = "gamelib.html";


}

async function how_to_play_link() {
    window.location = "https://www.youtube.com/watch?v=xvFZjo5PgG0";
}

function preload() {
    //font_regular = loadFont('Founts/Track-Regular.otf')

    leader_board_img = loadImage('images/leader_board.png')
    avatar_img = loadImage('/images/avatar.png');
    how_to_play_button = createImg('/images/buttons/how_to_play.png');
    join_lobby_button = createImg('/images/buttons/join_lobby.png');
    create_lobby_button = createImg('/images/buttons/create_lobby.png')

    //image1 = loadImage('/images/buttons/how_to_play.png');
    //image2 = loadImage('/images/buttons/join_lobby.png');

    sound_button = createImg('/images/buttons/som.png');
    music_button = createImg('/images/buttons/musica.png');
    trophies_img = loadImage('/images/trophie.png');

}




function setup() {
    createCanvas(windowWidth, windowHeight);
    //textFont(font_regular)
    /* button1 = new Button(400, 100, image1,image2)
    button1.mousePressed() */

    //buttons
    create_lobby_button.position(windowWidth /2.5, windowHeight / 5)
    join_lobby_button.position(windowWidth / 2.5, windowHeight / 2.2);
    how_to_play_button.position(windowWidth /  2.39, windowHeight / 1.4);
    sound_button.position(windowWidth / 2, windowHeight / 1.1);
    music_button.position(windowWidth /2.2, windowHeight / 1.1);
    create_lobby_button.mousePressed(async function () {
        let result = await create_game_id(input_game_name.value(), userid)
        if (result.inserted) alert(result.result.msg)
        enter_room()

    });
    create_lobby_button.mouseOver(function () {
        create_lobby_button.attribute('src', '/images/buttons/create_lobby_over.png')
    })
    create_lobby_button.mouseOut(function () {
        create_lobby_button.attribute('src', '/images/buttons/create_lobby.png')
    })
    join_lobby_button.mousePressed(enter_room);
    join_lobby_button.mouseOver(function () {
        join_lobby_button.attribute('src', '/images/buttons/join_lobby_over.png')
    })
    join_lobby_button.mouseOut(function () {
        join_lobby_button.attribute('src', '/images/buttons/join_lobby.png')
    })
    how_to_play_button.mousePressed(how_to_play_link);
    how_to_play_button.mouseOver(function () {
        how_to_play_button.attribute('src', '/images/buttons/how_to_play_over.png')
    })
    how_to_play_button.mouseOut(function () {
        how_to_play_button.attribute('src', '/images/buttons/how_to_play.png')
    })

    input_game_name = createInput();
    input_game_name.position(windowWidth /2.2, windowHeight / 6);


    join_game_button = createButton('join game');
    join_game_button.position(500, 650);
    join_game_button.mousePressed(async function () {
        res = await get_players_and_games_waiting_id(userid)
        join_game_id(userid, res[0].game_id)
        if (res.inserted) alert(res.msg)
    }
    )

}

async function draw() {
    clear()

    /* user_board = await leader_board();
    for (let i = 0; i < user_board.length; i++) {
        text(user_board[i].username,x,y);
        y += 90;  
    } */
    /* button1.display(); */

    image(avatar_img, windowWidth / 20, windowHeight / 15);
    image(trophies_img, windowWidth / 8.5, windowHeight / 1.4);
    image(leader_board_img, windowWidth / 1.4, windowHeight / 8);
    textSize(22);
    text(username, windowWidth / 6.8, windowHeight / 1.6);
    text(trophies, windowWidth / 7.15, windowHeight / 1.3);



}