let id ;
let room ;
let userInfo;

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

async function enter_room() {
    window.location = "map.html"
}


function setup() {
    createCanvas(900,900);
}

function draw(){
    square(10, 30, 150, 20);
    describe(
      'white square with black outline and round edges in mid-right of canvas'
    );
}