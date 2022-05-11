let id;
let room;
let userInfo;
let userid;;
var username;
let user_board=[];

var trophies;
let x = 950;
let y= 130;

window.onload = async () => {
    get_user_info().then((user_info) => {

        let userInfo = user_info;
        username = userInfo.username;
        userid = userInfo.user_id;
        trophies = userInfo.user_trophies;

    });
}
async function enter_room() {
    window.location = "gamelib.html";
}

async function how_to_play_link() {
    window.location = "https://www.youtube.com/watch?v=xvFZjo5PgG0";
}

function preload() {
    leader_board_img = loadImage('images/leader_board.png')
    avatar_img = loadImage('/images/avatar.png');
    how_to_play_button = createImg('/images/buttons/how_to_play.png');
    join_lobby_button = createImg('/images/buttons/join_lobby.png');
    sound_button = createImg('/images/buttons/som.png');
    music_button = createImg('/images/buttons/musica.png');
    trophies_img = loadImage('/images/trophie.png');
    
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

async function draw() {

    user_board = await leader_board();
    for (let i = 0; i < user_board.length; i++) {
        text(user_board[i].username,x,y);
        y += 90;  
    }
    
    image(avatar_img, 75, 20);
    image(trophies_img, 215,535);
    image(leader_board_img, 1050,10);
    textSize(20);
    text(username,275,500);
    text(trophies,270,590);
   
    
    
}