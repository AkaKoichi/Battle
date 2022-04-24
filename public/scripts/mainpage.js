let id;
let room;
let userInfo;
let userid;;
var username;
let username_leader_board

var trophies;

window.onload = async () => {
    get_user_info().then((user_info) => {

        let userInfo = user_info;
        username = userInfo.username;
        userid = userInfo.user_id;
        trophies = userInfo.user_trophies;
        console.log();

    });

    let user_board = await leader_board();
    console.log(user_board)

    username_leader_board = user_board.username;
    userid = user_board.user_id;
    trophies = user_board.user_trophies;
    console.log(user_board[1].username);

}
async function enter_room() {
    window.location = "map.html";
}

async function how_to_play_link() {
    window.location = "https://www.youtube.com/watch?v=xvFZjo5PgG0";
}

function preload() {
    avatar_img = loadImage('/images/avatar.png');
    how_to_play_button = createImg('/images/buttons/how_to_play.png');
    join_lobby_button = createImg('/images/buttons/join_lobby.png');
    sound_button = createImg('/images/buttons/som.png');
    music_button = createImg('/images/buttons/musica.png');
    trophies_img = loadImage('/images/trophie.png');
    leader_board_img = loadImage('images/leader_board.png')
}




function setup() {
    createCanvas(1470, 730);
    
    //buttons
    join_lobby_button.position(550,250);
    how_to_play_button.position(595,550);
    sound_button.position(675, 650);
    music_button.position(735, 650);
    join_lobby_button.mousePressed(enter_room);
    how_to_play_button.mousePressed(how_to_play_link);
}

function draw() {
    image(avatar_img, 75, 20);
    image(trophies_img, 215,535);
    image(leader_board_img, 1050,10);
    textSize(20);
    text(username,275,500);
    text(trophies,270,590);
}