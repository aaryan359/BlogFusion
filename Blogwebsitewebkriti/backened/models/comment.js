const  mongoose = require('mongoose');


const commentschema = new mongoose.Schema({

          comment:{
                          
               type:String
                        
          },
               
          post:{
                     type:mongoose.Schema.Types.ObjectId,
                     ref:"Blogpost"
          },
           user:{
                     type:mongoose.Schema.Types.ObjectId,
                      ref:"User"
             },
          createdat:{
                           type:Date,
                           default:Date.now(),

                    }
});

const Comment = mongoose.model('Comment',commentschema);
module.exports = Comment;