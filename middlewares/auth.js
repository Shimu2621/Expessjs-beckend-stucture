require('dotenv').config("../.env")
const jwt = require("jsonwebtoken");

//Create auth(custom) middleware to get user access(reference) for the valid token to using in the profile 
const auth = (req, res, next) => {
    const token = req.header('auth-token') //auth-token receiving from header(Postman) and stored at token
    
    //Token valid or not
    if(!token) {
        return res.status(400).json({
            message: "Authorization Failed"
        })
    }
    
    //Decoded token using verify method and JWT SECRET
    try {
        const decoded = jwt.verify(token, process.env.JWT_SECRET)
        
        //storing req.user
        req.user = decoded.user;
        //Passing in the next middleware
        next();
    } catch (error) {
        res.status(401).json({
            message: "Unauthorized Token"
        })
    }
}

module.exports = auth;