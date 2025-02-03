const UserModel = require("../models/users");
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

const signup = async (req,res)=>{
    try{
        const {name,email,password}=req.body;
        const user = await UserModel.findOne({email});
        if(user){
            return res.status(409)
            .json({message:"User Already Exist", success:false});
        }
        const userModel = new UserModel({name,email,password});
        userModel.password = await bcrypt.hash(password,10);
        await userModel.save();
        res.status(201)
        .json({message:"SignUp Succesfully",success: true});
    }
    catch (err){
        console.error('Error during user creation:', err);
        res.status(500)
        .json({message:"Internal Server Error",error: err.message})
    }
}

const login = async (req,res)=>{
    try{
        const {email,password}=req.body;
        const user = await UserModel.findOne({email});
        const errorMesssage = "Invalid Email or Password";
        if(!user){
            return res.status(403)
            .json({message:errorMesssage, success:false});
        }
        const isPasswordValid = await bcrypt.compare(password,user.password);
        if(!isPasswordValid){
            return res.status(403)
            .json({message:errorMesssage, success:false});
        }
        const jwtToken = jwt.sign(
            {email:user.email, _id:user._id},
            process.env.JWT_SECRET,
            {expiresIn:"1h"}
        );
        res.status(200)
        .json({message:"Login Success",
            success: true,
            token: jwtToken,
            email: user.email,
            name: user.name
            });
    }
    catch (err){
        console.error('Error during user creation:', err);
        res.status(500)
        .json({message:"Internal Server Error",error: err.message})
    }
}

module.exports={
    signup,login
}