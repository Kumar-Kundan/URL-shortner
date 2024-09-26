const { getUser } = require("../services/auth");

function checkForAuthentication(req,res,next){
    //retreiving token
    const userToken=req.cookies?.token;
    req.user=null;

    //if token not found
    if(!userToken )
        return next();

    const user=getUser(userToken);  //verify token

    req.user=user;
    return next();
}

//for authorization
function restrictTo(roles){
    return function(req,res,next){
        //user not logged in
        if(!req.user) return res.redirect("/login");

        console.log(req.user);
        //user is not authorized
        if(!roles.includes(req.user.role)) 
            return res.end("unauthorized");

        return next();
    };
}
module.exports={checkForAuthentication,restrictTo};