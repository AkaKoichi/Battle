
const tokenExpiration = 4*60*60*1000; // 4 hours


// Middleware
module.exports.check_authentication = function (req,res,next) {
    console.log(req.signedCookies);
    let user_id = req.signedCookies.userId;
    console.log('AAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAA')
    console.log(req.signedCookies.userId)
    if (!user_id) {
        res.status(401).send({msg: "You are not logged in."});       
    } else {
        // refresh token (not sure if there is a way of changing only the maxAge)
        res.cookie("userId", user_id, 
            {  maxAge: tokenExpiration,  httpOnly: true, signed:true});
        req.userId = user_id;
        next();
    }
}

// functions
module.exports.save_user_id = function (res,userId) {    
    res.cookie("userId", userId, {  maxAge: tokenExpiration, httpOnly: true, signed:true });
}

module.exports.logout = function (res) {
    res.clearCookie("userId", {  httpOnly: true, signed:true});
}