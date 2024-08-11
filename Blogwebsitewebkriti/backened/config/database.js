const mongoose = require('mongoose');

require('dotenv').config();


const dbconnect = ()=>{
       
           mongoose.connect(process.env.MONGODB_URL,{


                             useNewUrlParser: true,
                             useUnifiedTopology: true,
           })
           .then( ()=>{
                   console.log("db connection  successfully ")
           } )
           .catch(  (error)=>{
                  
                     console.log( " db connection fail")
                     console.error(error);
                     process.exit(1);
           }  )
}


module.exports = dbconnect;