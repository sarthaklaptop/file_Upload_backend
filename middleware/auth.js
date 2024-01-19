const jwt = require("jsonwebtoken");

require("dotenv").config();

//Authintication

exports.auth = (req, res, next) =>{

    try{
        const token = req.body.token;

        // console.log("Found Token ")
        // console.log(token)

    if(!token){
        return res.status(401).json({
            success: false,
            message: "Token not found",
        })
    }

    try{
        const decode = jwt.verify(token, process.env.JWT_SECRETE);
        console.log(decode);

        req.user= decode;

    }catch(error){
        res.status(401).json({
            success: false,
            message: "Invalid Token",
        })

    }

    //to check the net middleware
    next();


    }catch(error){
        res.status(401).json({
            success: false,
            message: "Something went wrong while verifying the token"
        })

    }

}

//Authourisation for student

exports.isStudent = (req, res, next) =>{
    try{

        if(req.user.role != "Student"){
            return res.status(401).json({
                success: false,
                message: "This is protectd route for student"
            })
        }
        next();

    }catch(error){
        res.status(500).json({
            success: false,
            message: "User role is not matchine"
        })

    }
}

//Authourisation for admin

exports.isAdmin = (req, res, next) =>{
    try{

        if(req.user.role != "Admin"){
            return res.status(401).json({
                success: false,
                message: "This is protectd route for admin"
            })
        }
        next();

    }catch(error){
        res.status(500).json({
            success: false,
            message: "User role is not matchine"
        })

    }
}