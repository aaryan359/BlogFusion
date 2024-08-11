const mongoose = require('mongoose');

const likeschema = new mongoose.Schema({
        
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
                             default: Date.now()

               }
});

const Like = mongoose.model('Like',likeschema);
module.exports = Like;