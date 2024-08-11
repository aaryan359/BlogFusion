 
 const mongoose = require('mongoose');

 const profileschema = new mongoose.Schema({
               
             gender:{
                     type:String
             },
             dateofbirth:{
                               type:String,

             },
             bio:{
                          type:String
             },
             address:{
                           type:String
             },
             user:{
                    type:mongoose.Schema.Types.ObjectId,
                    ref: "User"

             }
             
 });

 const Profile = mongoose.model('Profile',profileschema);
 module.exports = Profile;