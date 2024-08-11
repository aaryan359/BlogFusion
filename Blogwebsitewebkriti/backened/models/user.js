
  const mongoose = require('mongoose');

  const  userschema = new mongoose.Schema({


        firstname:{
             type:String,
             required:true,
             trim:true

        },
        lastname:{
            type:String,
            required:true,
            trim:true

       },
       username:{
                         type:String,
                         required:true,
                         trim:true
                 
       },
       email:{
                 type:String,
                 required:true,
                 trim:true,
       },
       password:{
                  type:String,
                  required:true,
       },
       mobilenumber:{
                    type:Number,
                     trim:true
       },
       token:{
                type:String,
               default:null
                   
       },
       resetpasswordexpires:{
                    type:Date
       },
       profileimage:{
                      type:String,
                      required:true,
                   
       },
       profiledetail:{
                        type:mongoose.Schema.Types.ObjectId,
                        ref:"Profile"
       },
       blogposts:[
               {
                     type:mongoose.Schema.Types.ObjectId,
                     ref:"Blogpost"

               }
       ] ,
       like:[
               {
                   type:mongoose.Schema.Types.ObjectId,
                   ref:"Like"
               }
       ] ,
       comment:[
                  {
                     type:mongoose.Schema.Types.ObjectId,
                     ref:"Comment"
                  }
       ],
       followers:[
             {
                 type:mongoose.Schema.Types.ObjectId,
                 ref:"User"
             }
       ],
       following:[
             {
                 type:mongoose.Schema.Types.ObjectId,
                 ref:"User"

             }
       ]







  });
  const  User  = mongoose.model('User',userschema);
  module.exports = User;