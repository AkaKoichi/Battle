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
    console.log('a')
    try {
        const response = await fetch(`/api/users/profile`);
        var result = await response.json();
        console.log(result)
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

