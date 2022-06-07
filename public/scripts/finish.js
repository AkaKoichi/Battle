
let mc_win;
let per_win;
let user_info

function preload() {
    mc_win = loadImage('/images/win/mc_win.png');
    per_win = loadImage('/images/win/per_win.png');
}

window.onload = async () => {
    user_info = await get_user_info_game()
    console.log(user_info.player_fac_id)
    createCanvas(windowWidth,windowHeight)
    
};

async function draw() {
    clear()
    if (user_info.player_fac_id == 1) {
        image(mc_win,0,0)
    } else if (user_info.player_fac_id == 2) {
        image(per_win, 0, 0)
    }
}


