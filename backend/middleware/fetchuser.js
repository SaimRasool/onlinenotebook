var jwt = require('jsonwebtoken');


const getUser = (req,res,next)=>{
    //get the user from the JWT Token and add id to req object
    const token=req.header('auth-token');
    
    if(!token)
    {
        res.status(401).send({error:"please authenticate using valid token"});
    }
    try {
        const data = jwt.verify(token,"saimsignature");
        console.log(data);
    req.user = data.user;
    next();
    } catch (error) {
        res.status(401).send({ error: "Internal error while authentication" });
    }
    
}
module.exports = getUser;