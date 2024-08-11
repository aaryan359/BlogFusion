const express = require('express')
const router = express.Router();
 
 
 const{
    createcategory,
    showallcategory,
    getallpostundercategory
               
 }  = require('../controllers/category');

   const{
    auth
   } = require('../middlewares/auth');

     router.post("/createcategory",auth,createcategory);
     router.get("/showallcategory",showallcategory);
     router.post("/getallpostundercategory",auth,getallpostundercategory);

module.exports = router; 