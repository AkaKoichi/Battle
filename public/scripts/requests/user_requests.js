async function login(name, password) {
    try {
        const response = await fetch(`/api/users/login`,
            {
                method: "POST",
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify({ name: name, password: password })
            });
        var result = await response.json();
        return { logged: response.status == 200, result: result };
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
        var result = await response.json();
        return { success: response.status == 200, result: result };
    } catch (err) {
        // Treat 500 errors here
        console.log(err);
    }
}

async function request_user_info() {
    try {
        const response = await fetch(`/api/users/profile`);
        var result = await response.json();
        return { logged: response.status != 401, result: result };
    } catch (err) {
        // Treat 500 errors here
        console.log(err);
    }
}

async function request_user_info_game() {
    try {
        const response = await fetch(`/api/users/profile_game`);
        var result = await response.json();
        return { logged: response.status != 401, result: result };
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
        var result = await response.json();
        return { inserted: response.status == 200, result: result };
    } catch (err) {
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

async function update_current_playing(id, user_id) {
    console.log('entrou request')

    try {
        const response = await fetch(`/api/users/update_current/${id}`, {
            method: "PUT",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({ user_id })
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

async function get_oponent_id(id, game_id) {
    try {
        const response = await fetch(`/api/users/oponent/${id}/${game_id}`);
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

async function get_game_id(id) {
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

async function end_turn_id(user_id, game_id,pile,oponent_id) {
    try {
        const response = await fetch(`/api/users/end_turn/${user_id}`, {
            method: "PUT",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({ game_id,pile ,oponent_id})
        });
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

async function create_game_id(game_name, user_id) {
    try {
        // TODO: Verify user information  and give errors
        const response = await fetch(`/api/users/create_game/${user_id}`,
            {
                method: "POST",
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify({ game_name })
            });
        var result = await response.json();
        return { inserted: response.status == 200, result: result };
    } catch (err) {
        // Treat 500 errors here
        console.log(err);
    }
}

async function get_player_active_games_id(user_id) {
    try {
        const response = await fetch(`/api/users/active_games/${user_id}`);
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

async function join_game_id(user_id, game_id) {
    try {
        // TODO: Verify user information  and give errors
        const response = await fetch(`/api/users/join_game/${game_id}`,
            {
                method: "POST",
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify({ user_id })
            });
        var result = await response.json();
        return { inserted: response.status == 200, result: result };
    } catch (err) {
        // Treat 500 errors here
        console.log(err);
    }
}

async function get_players_and_games_waiting_id(user_id) {
    try {
        const response = await fetch(`/api/users/games_waiting/${user_id}`);
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

async function delete_all_from_id(user_id, game_id,oponent_id) {
    try {
        const response = await fetch(`/api/users/delete/${user_id}/${game_id}/${oponent_id}`, {
            method: "DELETE",
            headers: {
                "Content-Type": "application/json"
            }
        });
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

async function check_if_game_started_id(user_id) {
    try {
        const response = await fetch(`/api/users/game_started/${user_id}`);
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

async function update_dice_number_id(user_id) {
    try {
        const response = await fetch(`/api/users/update_dice/${user_id}`, {
            method: "PUT",
            headers: {
                "Content-Type": "application/json"
            }
        });
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

async function check_if_dice_rolled_id(game_id) {
    try {
        const response = await fetch(`/api/users/dice_rolled/${game_id}`);
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

async function insert_initial_state_id(user_id, game_id,fac_id,oponent_id) {
    try {
        // TODO: Verify user information  and give errors
        const response = await fetch(`/api/users/insert_initial_state/${user_id}`,
            {
                method: "POST",
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify({ game_id,fac_id,oponent_id })
            });
        var result = await response.json();
        return { inserted: response.status == 200, result: result };
    } catch (err) {
        // Treat 500 errors here
        console.log(err);
    }
}

















