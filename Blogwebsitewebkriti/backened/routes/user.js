 const express = require('express');
 const router = express.Router();


 const{
            sendotp,
            signup,
            login,
 }                       = require('../controllers/auth');

const{
    resetpasswordtoken,
    resetpassword

}     = require('../controllers/resetpassword');

 // route for user login,signup,sendotp

 router.post("/login",login);
 router.post("/signup",signup);
 router.post("/sendotp",sendotp);
 router.post("/resetpasswordtoken",resetpasswordtoken);
 router.post("/resetpassword",resetpassword);

 module.exports = router;