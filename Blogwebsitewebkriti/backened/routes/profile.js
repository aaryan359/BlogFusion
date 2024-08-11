 const express = require('express')
 const router = express.Router();
  
  const{
    auth
  } = require('../middlewares/auth.js')
 const {
      
    updateprofiledetails,
   
    getuserdetail

 } = require('../controllers/profile')


 router.post("/updateprofile",auth,updateprofiledetails);
 router.get("/getuserdetail",auth,getuserdetail);



 module.exports = router; 