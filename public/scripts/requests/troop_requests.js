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

async function update_troops_id(id, user_trp_id, x, y, health, movement) {
    try {
        const response = await fetch(`/api/troops/update/${id}`, {
            method: "PUT",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({ user_trp_id, x, y, health, movement })
        });
        if (response.status == 200) {
            var troops = await response.json();
            return troops;
        } else {
            // Treat errors like 404 here
            console.log('aa' + response);
        }
    } catch (err) {
        // Treat 500 errors here    
        console.log(err);
    }
}

async function train_troop(user_id, troop_id, bld_id,game_id) {
    try {
        // TODO: Verify user information  and give errors
        const response = await fetch(`/api/troops/train/${troop_id}`,
            {
                method: "POST",
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify({ user_id,bld_id,game_id})
            });
        var result = await response.json();
        console.log('aaaa')
        return { inserted: response.status == 200, result: result };
    } catch (err) {
        // Treat 500 errors here
        console.log(err);
    }
}

async function delete_troops_id(id) {
    try {
        const response = await fetch(`/api/troops/delete/${id}  `, {
            method: "DELETE"
        });
        if (response.status == 200) {
            var troops = await response.json();
            return troops;
        } else {
            // Treat errors like 404 here
            console.log('aa' + response);
        }
    } catch (err) {
        // Treat 500 errors here    
        console.log(err);
    }
}

async function get_troops_resources(id) {
    try {
        const response = await fetch(`/api/troops/resources/${id}`);
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

async function move_troop_id(user_id, troop_id, direction, movement) {
    try {
        const response = await fetch(`/api/troops/move/${troop_id}`, {
            method: "PUT",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({ user_id, direction, movement })
        });
        if (response.status == 200) {
            var troops = await response.json();
            return { troops: troops, response: response };
        } else {
            // Treat errors like 404 here
            console.log('aa' + response);
        }
    } catch (err) {
        // Treat 500 errors here    
        console.log(err);
    }
}

async function attack_troop_id(user_id, attacker, defender, bit) {
    try {
        const response = await fetch(`/api/troops/attack/${user_id}`, {
            method: "PUT",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({ attacker, defender, bit })
        });
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


