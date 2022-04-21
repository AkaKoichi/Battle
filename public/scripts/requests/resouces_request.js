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


async function get_buildings_by_id(id) {
    try {
        const response = await fetch(`/api/resources/${id}`);
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