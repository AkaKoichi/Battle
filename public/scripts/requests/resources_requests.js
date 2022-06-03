async function get_resources() {
    try {
        const response = await fetch(`/api/resources`);
        if (response.status == 200) {
            var buildings = await response.json();
            return buildings;
        } else {
            // Treat errors like 404 here
            console.log(response);
        }
    } catch (err) {
        // Treat 500 errors here    
        console.log(err);
    }
}


async function get_resources_by_id(id, user_id) {
    try {
        const response = await fetch(`/api/resources/${id}/${user_id}`);
        if (response.status == 200) {
            var resources = await response.json();
            return resources;
        } else {
            // Treat errors like 404 here
            console.log(response);
        }
    } catch (err) {
        // Treat 500 errors here    
        console.log(err);
    }
}

async function update_resources_id(id, rsc_amount, rsc_id) {
    try {
        const response = await fetch(`/api/resources/update/${id}`, {
            method: "PUT",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({ rsc_amount, rsc_id })

        });
        if (response.status == 200) {
            var resources = await response.json();
            return resources;
        } else {
            // Treat errors like 404 here
            console.log('aa' + response);
        }
    } catch (err) {
        // Treat 500 errors here    
        console.log(err);
    }
} 

async function get_resources_places_by_id(game_id) {
    try {
        const response = await fetch(`/api/resources/places/${game_id}`);
        if (response.status == 200) {
            var resources = await response.json();
            return resources;
        } else {
            // Treat errors like 404 here
            console.log(response);
        }
    } catch (err) {
        // Treat 500 errors here    
        console.log(err);
    }
}