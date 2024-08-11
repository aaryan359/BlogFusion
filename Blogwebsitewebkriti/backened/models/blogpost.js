 const mongoose = require('mongoose');


 const  blogpostschema = new mongoose.Schema({


            title:{
                    type:String,
                 
            },
            content:{
                       type:String,
            },
            summary:{
                type:String,
            },
            author:{
                         type:mongoose.Schema.Types.ObjectId,
                         ref:"User"
            },
            createdat:{
                          type:Date,
                          
            },
            updatedat:{
                         type:Date,
            },
            tags:[
                 {
                     type:String
                 }
            ],
            category:
                {
                     type:String
                }
            ,
            comment:[
                        {
                             type:mongoose.Schema.Types.ObjectId,
                              ref:"Comment"
                        }
            ],
            like:[
                {
                    type:mongoose.Schema.Types.ObjectId,
                              ref:"Like"
                }
            ],
            views:{
                         type:Number,
                         default:0
            },
            images:[
                             {
                                type:String

                             }
            ],
           

              
        
 });

 const Blogpost = mongoose.model('Blogpost',blogpostschema);

 module.exports = Blogpost;
