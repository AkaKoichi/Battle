async function login(name, password) {
    try {
        const response = await fetch(`/api/users/login`,
        {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
              },
            body: JSON.stringify({ name: name, password: password}) 
        });
        var  result= await response.json();
        return {logged: response.status==200 , result: result };
    } catch (err) {
        // Treat 500 errors here
        console.log(err);
    }
}

async function logout() {
    try {
        const response = await fetch(`/api/users/logout`,
        {
            method: "POST",
        });
        var  result= await response.json();
        return {success: response.status==200 , result: result };
    } catch (err) {
        // Treat 500 errors here
        console.log(err);
    }
}

async function request_user_info() {
    try {
        const response = await fetch(`/api/users/profile`);
        var result = await response.json();
        return {logged: response.status!=401 , result: result };
    } catch (err) {
        // Treat 500 errors here
        console.log(err);
    }
}

async function register(user) {
    try {
        // TODO: Verify user information  and give errors
        const response = await fetch(`/api/users/register`,
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

async function get_player_by_game(id) {
    try {
        const response = await fetch(`/api/users/game/${id}`);
        if (response.status == 200) {
           var user = await response.json();
           return user;
        } else {
            // Treat errors like 404 here
            console.log(response);
        }
    } catch (err) {
        // Treat 500 errors here    
        console.log(err);
    }
}

async function leader_board() {
    try {
        const response = await fetch(`/api/users/leader_board`);
        if (response.status == 200) {
           var user = await response.json();
           return user;
        } else {
            // Treat errors like 404 here
            console.log(response);
        }
    } catch (err) {
        // Treat 500 errors here    
        console.log(err);
    }
}

async function check_current_playing_by_game(id) {
    try {
        const response = await fetch(`/api/users/current/${id}`);
        if (response.status == 200) {
           var user = await response.json();
           return user;
        } else {
            // Treat errors like 404 here
            console.log(response);
        }
    } catch (err) {
        // Treat 500 errors here    
        console.log(err);
    }
}

async function update_current_playing(id,user_id) {
    console.log('entrou request')

    try {
        const response = await fetch(`/api/users/update_current/${id}`,{
            method:"PUT",
            headers: {
               "Content-Type": "application/json"
             },
           body: JSON.stringify({user_id})
        });
        if (response.status == 200) {
           var user = await response.json();
           return user;
        } else {
            // Treat errors like 404 here
        }
    } catch (err) {
        // Treat 500 errors here    
        console.log(err);
    }
} 

