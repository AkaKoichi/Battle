let id ;
let room ;
let userInfo;
async function enter_room() {
    window.location = "map.html"

  
    // try {
    //     console.log(id)
    //     let user = {
    //         id: id,
    //         room: room
    //     };
    //     let result = await room_enter(user);
    //     if (result.inserted) {
    //         alert("entered room");
    //         window.location = "map.html"
    //     } else {
    //         document.getElementById("result").innerHTML = "Not able to register";
    //     }
    // } catch (err) {
    //     console.log(err);
    // };
}

window.onload = async () => {
    get_user_info().then((user_info) => {

        let userInfo = user_info;
        document.getElementById("id").userInfo.user_user_id;
        // search_room().then((user_room) => {
        // //room=user_room
    
        // });
    });
}





