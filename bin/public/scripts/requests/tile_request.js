async function get_tiles() {
    try {
        const response = await fetch(`/tile/resources`);
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


async function get_tiles_by_id(id) {
    try {
        const response = await fetch(`/api/tile/${id}`);
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