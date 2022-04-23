// let id;
// let room;
// let userInfo;
// let logo_img;

window.onload = async () => {
    get_user_info().then((user_info) => {

        let userInfo = user_info;
        userInfo = user_info;
        document.getElementById("name").innerHTML = userInfo.username;
        document.getElementById("id").innerHTML = userInfo.user_id;
        document.getElementById("trophies").innerHTML = userInfo.user_trophies;
        console.log()

    });
}

// function preload() {
//     logo_img = loadImage('/images/avatar.png');
// }

// async function enter_room() {
//     window.location = "map.html";
// }


// function setup() {
//     createCanvas(1420, 700);
//     image(logo_img, 50, 50);

// }

// function draw() {
// }