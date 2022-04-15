async function getRoom(roomId) {
    try {
        const response = await fetch(`/api/rooms/${roomId}`);
        if (response.status == 200) {
           var room = await response.json();
           return room;
        } else {
            // Treat errors like 404 here
            console.log(response);
        }
    } catch (err) {
        // Treat 500 errors here    
        console.log(err);
    }
}   

async function room_enter(user) {
    try {
        // TODO: Verify user information  and give errors
        const response = await fetch(`/api/rooms/enter`,
        {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
              },
            body: JSON.stringify(user) 
        });
        var result= await response.json();
        return {inserted: response.status==200 , result: result };
    }   catch (err) {
        // Treat 500 errors here
        console.log(err);
    }
} 

async function search_room() {
    try {
        const response = await fetch(`/api/rooms/search`);
        if (response.status == 200) {
           var rooms = await response.json();
           return rooms;
        } else {
            // Treat errors like 404 here
            console.log(response);
        }
    } catch (err) {
        // Treat 500 errors here    
        console.log(err);
    }
}           
