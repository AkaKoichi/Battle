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

 async function update_troops_id(id,user_trp_id,x,y,health,movement) {
     try {
         const response = await fetch(`/api/troops/update/${id}`,{
             method:"PUT",
             headers: {
                "Content-Type": "application/json"
              },
            body: JSON.stringify({user_trp_id,x,y,health,movement})
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
 
 async function train_troop(id,troop_id,troop_x,troop_y,troop_current_health,movement) {
    try {
        // TODO: Verify user information  and give errors
        const response = await fetch(`/api/troops/train/${id}`,
        {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
              },
            body: JSON.stringify({troop_id,troop_x,troop_y,troop_current_health,movement}) 
        });
        var result= await response.json();
        return {inserted: response.status==200 , result: result };
    }   catch (err) {
        // Treat 500 errors here
        console.log(err);
    }
} 

async function delete_troops_id(id) {
    try {
        const response = await fetch(`/api/troops/delete/${id}  `,{
            method:"DELETE"
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
