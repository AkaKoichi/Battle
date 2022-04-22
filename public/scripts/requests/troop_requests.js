async function get_troops() {
    try {
        const response = await fetch(`/api/troops`);
        if (response.status == 200) {
           var troops = await response.json();
           return troops;
        } else {
            // Treat errors like 404 here
            console.log(response);
        }
    } catch (err) {
        // Treat 500 errors here    
        console.log(err);
    }
}           

async function get_troops_by_id(id) {
    try {
        const response = await fetch(`/api/troops/${id}`);
        if (response.status == 200) {
           var troops = await response.json();
           return troops;
        } else {
            // Treat errors like 404 here
            console.log(response);
        }
    } catch (err) {
        // Treat 500 errors here    
        console.log(err);
    }
}   

 async function update_troops_id(id,user_trp_id,x,y) {
     console.log({id, user_trp_id,x,y})
     try {
         const response = await fetch(`/api/troops/update/${id}`,{
             method:"PUT",
             headers: {
                "Content-Type": "application/json"
              },
            body: JSON.stringify({user_trp_id,x,y})

         });
         if (response.status == 200) {
            var troops = await response.json();
            return troops;
         } else {
             // Treat errors like 404 here
             console.log('aa'+ response);
         }
     } catch (err) {
         // Treat 500 errors here    
         console.log(err);
     }
 }   