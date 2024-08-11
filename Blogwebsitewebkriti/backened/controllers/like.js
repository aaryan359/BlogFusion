const User = require('../models/user')
const Blogpost = require("../models/blogpost")
const Like = require('../models/like');


//like a psot
//unlike a post
//get all like ofa specific post

exports.like=async(req,res)=>{

    try{

   

            //fetch dat from request ki body

            const{ postid,userid,}=req.body;

            if(!postid || !userid){
                 return  res.status(402).json({
                      
                      success:false,
                      message:'empty-field'
                 })
            }


            // check is user register or not

            const user = await  User.findById(userid);

            if(!user){
                return res.status(402).json({
                          
                     success:false,
                     message:'Not-register'
                })
            }

            //check is post exit or not

            const post = await  Blogpost.findById(postid);

            if(!post){
                          
                    return res.status(402).json({
                          
                        success:false,
                        message:'posts-not-found'
                   })
                 
            }

            // create entry in like collections

            const like = await Like.create({post:post._id,user:user._id});

            const blogpost = await  Blogpost.findByIdAndUpdate(post._id,{ $push:{like:like._id} },{new:true});
            

            return res.status(200).json({
                         
                    success:true,
                    message:'Liked-successfully'
            })

        }catch(error){

            console.log('Error occur during like a post : ',error)
             
                 return res.status(402).json({
                     success:false,
                     message:'Like-api-fail'
                 })
        
        }   
     
}


exports.unlike = async(req,res)=>{
                   


    try{

    
              const{ postid,userid} = req.body;

              
            if(!postid || !userid){
                return  res.status(402).json({
                     
                     success:false,
                     message:'empty-field'
                })
           }


           // check is user register or not

           const user = await  User.findById(userid);
               
           if(!user){
            return res.status(402).json({
                      
                 success:false,
                 message:'Not-register'
            })
        }

           //check is post exit or not

           const post = await  Blogpost.findById(postid);
                 
           if(!post){
                          
            return res.status(402).json({
                  
                success:false,
                message:'posts-not-found'
           })
         
              }

              const unlike = await Like.findOneAndDelete({post:postid,user:userid})

              return res.status(200).json({
                         
                success:true,
                message:'unliked-successfully'
        })

    }catch(error){
        console.log('Error occur while unlike a post : ',error);
         return res.status(402).json({
             success:false,
         message:'unlike-api-fail'

         })    
    }
}

exports.getalllikeofapost = async(req,res)=>{

    try{

    
                       
                       const{postid}=req.body;
                       
                  
                        if(!postid){
                              return res.status(402).json({
                                      success:false,
                                      message:'empty-field'
                              })
                        }

                     
                        const  alllikes = await  Like.countDocuments({post:postid});

                        return res.status(200).json({
                                      
                                success:true,
                                message:"getalllikes-successfully"
                        })

                    }catch(error){
                        console.log('Error occur while fetching alllikes on a post : ',error);
                         
                         return  res.status(402).json({
                                        
                                  success:false,
                                  message:'likesonapost-api-fail'
                         })

                    }
}