
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

async function build(id,bld_id,bld_x,bld_y,bld_current_health) {
    console.log('aaaaaaaaaaaaaaaaaaaaaaaa')
    try {
        // TODO: Verify user information  and give errors
        const response = await fetch(`/api/buildings/build/${id}`,
        {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
              },
            body: JSON.stringify({bld_id,bld_x,bld_y,bld_current_health}) 
        });
        var result= await response.json();
        return {inserted: response.status==200 , result: result };
    }   catch (err) {
        // Treat 500 errors here
        console.log(err);
    }
} 