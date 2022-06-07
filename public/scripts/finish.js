
let mc_win;
let per_win;
let user_info

function preload() {
    mc_win = loadImage('/images/win/mc_win.png');
    per_win = loadImage('/images/win/per_win.png');
    main_page_button = createImg('/images/buttons/main_page.png');
}

window.onload = async () => {
    user_info = await get_user_info_game()
    console.log(user_info.player_fac_id)
    createCanvas(windowWidth,windowHeight)
    
};

function setup(){
    createCanvas(windowWidth,windowWidth)
    main_page_button.position(windowWidth /2.35, windowHeight / 1.85)
    main_page_button.mousePressed(back_to_lobby);
    main_page_button.mouseOver(function () {
        main_page_button.attribute('src', '/images/buttons/main_page_over.png')
    })
    main_page_button.mouseOut(function () {
        main_page_button.attribute('src', '/images/buttons/main_page.png')
    })
}

async function draw() {
    clear()
    if (user_info.player_fac_id == 1) {
        image(mc_win,0,0)
    } else if (user_info.player_fac_id == 2) {
        image(per_win, 0, 0)
    }
}


function back_to_lobby(){
    window.location = "mainpage.html"
}