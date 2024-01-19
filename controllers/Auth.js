const User = require("../models/User");
const bcrypt = require("bcrypt");
require("dotenv").config()
const jwt = require("jsonwebtoken")

exports.signUP = async(req, res) => {
    
    try{
        const {firstName, lastName, email, password} = req.body;

    // if user is already exists
  

    const alreadyExist = await User.findOne({email});

    

    // console.log(alreadyExist);


    if(alreadyExist){
        res.status(409).json({
            success: false,
            message: "User already exits",
        })
        return;
    }

    let hashedPassword;

    try{
        hashedPassword = await bcrypt.hash(password, 10)
    }
    catch(error){
        res.status(500).json({
            success: false,
            message: "Error in hashing password"
        })

    }


    const user = new User({
        firstName, lastName, email, password: hashedPassword
    });

    const savedUser = await user.save();

    res.status(200).json({
        post: savedUser,
        success: true,
        message: "User created Successfully"
    })

    }
    catch(error){
        console.error(error)
        res.status(500).json({
            success: false,
            message: "Unable to create user",
            
        })
    

    }
}

exports.login = async(req, res) => {

    try{

        const {email, password} = req.body;

    if(!email || !password){
        return res.status(400).json({
            success:false,
            message:"Fill all details"
        })
    }

    let user = await User.findOne({email});



    if(!user){
        return res.status(401).json({
            success:false,
            message:"User is not registered"
        })
    }

    const payload = {
        email: user.email,
        id : user._id,
        
    }

    if(await bcrypt.compare(password, user.password)){

        let token = jwt.sign(payload,
            process.env.JWT_SECRETE,
            // {
            //     expiresIN: "2h",
            // }
            )

            user = user.toObject();

            user.token = token;
            user.password = undefined;

            console.log(user)
        
            const options = {
                expires: new Date( Date.now( ) + 3 * 24 * 60 * 60 * 1000),
                httpOnly: true
            }
        
            res.cookie("RiteshCookie", token, options).status(200).json({
                success: true,
                token,
                user,
                message: "User logged in successfull"
            })
    }
    else{
        return res.status(403).json({
            success: false,
            message: "Password Incorrect"
        })
    }


    }catch(error){
        console.error(error)
        res.status(500).json({
            success: false,
            message: "Unable to Login",
            
        })
    

    }
}