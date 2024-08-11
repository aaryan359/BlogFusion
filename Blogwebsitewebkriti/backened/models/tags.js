const mongoose = require('mongoose');

const tagschema = new mongoose.Schema({
               
            tags:[
                {
                    type:String,
                    unique:true
                }
            ],
            posts:[
                {
                    type:mongoose.Schema.Types.ObjectId,
                    ref:"Blogpost"
                }
            ]
                
});

const Tag = mongoose.model('Tag',tagschema);
module.exports = Tag;