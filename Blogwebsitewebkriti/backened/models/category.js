
const mongoose = require('mongoose');

const  categoryschema = new mongoose.Schema({
                
              categoryname:{
                        type:String,
                        required:true,
                        unique: true
              },
              posts:[
                      {
                         type:mongoose.Schema.Types.ObjectId,
                         ref:"Blogpost"
                      }
              ],
              user:{
                          type:mongoose.Schema.Types.ObjectId,
                          ref:"User"
              }

});

const Category  = mongoose.model('Category',categoryschema);
module.exports = Category;