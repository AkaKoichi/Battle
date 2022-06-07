
async function get_buildings() {
    try {
        const response = await fetch(`/api/buildings`);
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


async function get_buildings_by_id(id) {
    try {
        const response = await fetch(`/api/buildings/${id}`);
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

async function build(user_id, troop_id,bld_id,game_id,fac_id) {
    try {
        // TODO: Verify user information  and give errors
        const response = await fetch(`/api/buildings/build/${user_id}`,
        {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
              },
            body: JSON.stringify({troop_id,bld_id,game_id,fac_id}) 
        });
        var result= await response.json();
        
        return {inserted: response.status==200 , result: result };
    }   catch (err) {
        // Treat 500 errors here
        console.log(err);
    }
} 

async function delete_building_id(id) {
    try {
        const response = await fetch(`/api/buildings/delete/${id}`, {
            
            method: "DELETE"
        });
        console.log(response)
        if (response.status == 200) {
            var building = await response.json();
            return building;
        } else {
            // Treat errors like 404 here
            console.log( response);
        }
    } catch (err) {
        // Treat 500 errors here    
        console.log(err);
    }
}

async function update_building_id(id, user_bld_id, health) {
    try {
        const response = await fetch(`/api/buildings/update/${user_bld_id}`, {
            method: "PUT",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({id, health })
        });
        if (response.status == 200) {
            var troops = await response.json();
            return troops;
        } else {
            // Treat errors like 404 here
            console.log( response); 
        }
    } catch (err) {
        // Treat 500 errors here    
        console.log(err);
    }
}

async function get_all_buildings_cost_id(user_id,fac_id) {
    try {
        const response = await fetch(`/api/buildings/buildings_cost/${user_id}/${fac_id}`);
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
