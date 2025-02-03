const { signup } = require('../controllers/AuthControllers');
const { signupValidation } = require('../middlewares/AuthValidation');
const { login } = require('../controllers/AuthControllers');
const { loginValidation } = require('../middlewares/AuthValidation');
const router = require('express').Router();

// router.post('/login', (req,res)=>{
//     res.send("Login Successfully");
// })

router.post('/login', loginValidation, login);

router.post('/signup', signupValidation, signup);

module.exports=router;