const Joi = require('joi');

const signupValidation = (req,res,next)=>{
    console.log('Validation is Working & Request Body:', req.body);
    const schema = new Joi.object({
        name: Joi.string().min(3).max(100).required(),
        email: Joi.string().email().required(),
        password: Joi.string().min(4).max(100).required()
    });
    const { error }= schema.validate(req.body);
    if(error){
        return res.status(400)
        .json({message:"Error In SignUp Validation", error});
    }
    next();
}

const loginValidation = (req,res,next)=>{
    const schema = new Joi.object({
        name: Joi.string().min(3).max(100).required(),
        email: Joi.string().email().required(),
        password: Joi.string().min(4).max(100).required()
    });
    const {err}= schema.validate(req.body);
    if(err){
        return res.status(400).
        json({message:"Error in Login Validation", err})
    }
    next();
}

module.exports={
    signupValidation, loginValidation
}