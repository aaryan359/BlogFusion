const express = require('express')
const router = express.Router();
 
 
 const{
    like,
    unlike,
    getalllikeofapost
 
               
 }  = require('../controllers/like');

   const{
    auth
   } = require('../middlewares/auth');

     router.post("/like",auth,like);
     router.post("/unlike",auth,unlike);
     router.post("/getlikesofapost",getalllikeofapost);

module.exports = router; 