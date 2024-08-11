// Create a new blog post:
// Get all blog posts:
// Get a single blog post by ID:
// Update a blog post by ID:
// Delete a blog post by ID:
//Get blog posts by category:
//Increase the view count of a blog post: 

const Blogpost = require("../models/blogpost")
const {uploadimagetocloudinary }= require('../utils/imageuploader')
require('dotenv').config();
const User = require('../models/user');



exports.createblogpost = async(req,res)=>{

    try{

             console.log(" create blog start");
                   
              const {title,content} = req.body;
              console.log(" create blog title fetxh");

              const files = req.files.images; // 'images' is the key used in FormData
              console.log(" create blog files fetch : ",files);

             

              const userid =  req.user.id;
                
              console.log(" user id");
              console.log(" create blog files userid : ",userid);;


              const userresult = await User.findById(userid);
         console.log( 'before userresult')

              if(!userresult){
                   return res.status(400).json({
                        success:false,
                        message: "user-not-exist"
                   })
              }
              console.log( 'after userresult')
           let secure_url =[] ;
              if (Array.isArray(files)) {
              
                const uploadPromises = files.map(file => uploadimagetocloudinary(file, process.env.FOLDER_NAME));
        
                // Wait for all uploads to complete
                const results = await Promise.all(uploadPromises);
                
                // Extract secure URLs from results in the same order
                secure_url = results.map(result => result.secure_url);

                
            } else {
                const imageresult = await uploadimagetocloudinary(files, process.env.FOLDER_NAME);
                       
                secure_url.push(imageresult.secure_url);
            }
            console.log( 'after secureurl:',secure_url);


                   const blogpostresult = await Blogpost.create( { title:title ,content:content,images:secure_url,author:userid,createdat:Date.now()    } );
                   console.log( 'before blogpostresult')
                   if(!blogpostresult){
                           
                    return res.status(400).json({
                        success:false,
                        message: "unable-to-upload",blogpostresult,secure_url
                    })
                   }

                   console.log( 'after blogpostresult')
                   const updateuserblog = await  User.findByIdAndUpdate(userid,{ $push:{blogposts:blogpostresult._id} },{new:true} );

                   if(!updateuserblog){
                           
                    return res.status(400).json({
                        success:false,
                        message: "unable-to-setinusermodal"
                    })
                   }


                       console.log('blogcreate successfully')
                   return   res.status(200).json({
                            
                               success:true,
                               message:"blog createsuccessfully",blogpostresult,
                               

                   })

                }catch(error){
                    console.log("error is : ",error);
                    return   res.status(400).json({
                            
                        success:false,
                        message:"blog-creation-fail",
                        

                        })     
                }

}

exports.updateblogpost = async(req,res)=>{
                  
    try{

     
               console.log("updated api start")
         const {updatedTitle,updatedContent,postid} = req.body;
       



        

         const userid =  req.user.id;
    


         const userresult = await User.findById(userid);
  

         if(!userresult){
              return res.status(400).json({
                   success:false,
                   message: "user-not-exist"
              })
         }
     


              const blogpostresult = await Blogpost.findByIdAndUpdate(postid , { title:updatedTitle ,content:updatedContent},{new:true} );
             console.log(' after updated ')
              if(!blogpostresult){
                      
               return res.status(400).json({
                   success:false,
                   message: "unable-to-upload"
               })
              }

             



              return   res.status(200).json({
                       
                          success:true,
                          message:"blog updatesuccessfully",blogpostresult
                          

              })

           }catch(error){
               console.log("error is : ",error);
               return   res.status(400).json({
                       
                   success:false,
                   message:"blog-updation-fail",
                   

                   })     
           }

}

exports.getblogpost = async(req,res)=>{
                  
    try{

     
               console.log("get api start")
         const {postid} = req.body;
       
          console.log("postid:",postid);


        

         const userid =  req.user.id;
    


         const userresult = await User.findById(userid);
  

         if(!userresult){
              return res.status(400).json({
                   success:false,
                   message: "user-not-exist"
              })
         }
     


              const blogpostresult = await Blogpost.findById(postid).populate("author");
            //  console.log(' before blogpost result ',blogpostresult);
              if(!blogpostresult){
                      
               return res.status(400).json({
                   success:false,
                   message: "unable-to-get" 
               })
              }

              console.log(' after blogpost result ')



              return   res.status(200).json({
                       
                          success:true,
                          message:"blog updatesuccessfully",blogpostresult
                          

              })

           }catch(error){
               console.log("error is : ",error);
               return   res.status(400).json({
                       
                   success:false,
                   message:"blog-updation-fail",
                   

                   })     
           }

}

exports.getlatestblogpost = async(req,res)=>{
                  
    try{

     
               console.log("get latest api start")
   

               const latestBlogs = await Blogpost.find().populate("author").sort({ createdat: -1 }).limit(5);  
           
              if(!latestBlogs){
                      
               return res.status(400).json({
                   success:false,
                   message: "unable-to-get-latest" 
               })
              }

            //   console.log(' after  latest blogpost result ')



              return   res.status(200).json({
                       
                          success:true,
                          message:"latest  blog successfully",latestBlogs
                          

              })

           }catch(error){
               console.log("error is : ",error);
               return   res.status(400).json({
                       
                   success:false,
                   message:"blog-getlatestapi-fail",
                   

                   })     
           }

}



exports.getTrendingBlogPosts = async (req, res) => {
    try {
    //   console.log("Get trending API start");
  
    
      
      
      const trendingBlogs = await Blogpost.find().populate("author").sort({ views:-1 }).limit(5)
  
    //   console.log('Before trending blogpost result:', trendingBlogs);
  
      if (!trendingBlogs ) {
        return res.status(400).json({
          success: false,
          message: "Unable to get trending blogs"
        });
      }
  
    //  npm run dev

  
      return res.status(200).json({
        success: true,
        message: "Trending blogs retrieved successfully",
        trendingBlogs
      });
  
    } catch (error) {
      console.log("Error is:", error);
      return res.status(400).json({
        success: false,
        message: "Failed to get trending blogs"
      });
    }
  }
  
  
exports.getRandomBlogPosts = async (req, res) => {
    try {
      
  
      // Use MongoDB's aggregation pipeline to randomly sample 5 blog posts
      const randomBlogIds = await Blogpost.aggregate([
        { $sample: { size: 5 } }, // Randomly select 5 documents
        { $project: { _id: 1 } } // Only return the _id field
      ]);
      
      const randomBlogs = await Blogpost.find({ _id: { $in: randomBlogIds.map(doc => doc._id) } })
        .populate('author'); // Populate the author field
  
     
  
      if (!randomBlogs ) {
        return res.status(400).json({
          success: false,
          message: "Unable to get random blogs"
        });
      }
  
    
  
      return res.status(200).json({
        success: true,
        message: "Random blogs retrieved successfully",
        randomBlogs
      });
  
    } catch (error) {
      console.log("Error is:", error);
      return res.status(400).json({
        success: false,
        message: "Failed to get random blogs"
      });
    }
  };
  

  exports.getBlogPostByUser = async (req,res) =>{

  try {
      const { userId } = req.body;

      const userAllPost = await Blogpost.find({author:userId}).populate({
                          path:'author',
                          populate:{
                                   path:'profiledetail'
                          }
      }).exec();


     if(!userAllPost){
      return res.status(400).json({
        success:false,
        message:"Failed to load  all from userId"
      })
     }
     return res.status(200).json({
      success: true,
      message: " blogs retrieved successfully",
      userAllPost
    });


  } catch (error) {
      console.log(" error in getting all blogs on the basis of userId",error)
      return res.status(400).json({
        success: false,   
        message: "Failed to load all user from userId"
      });
  }

  };

  exports.deletePost = async (req,res) =>{
    console.log("delete krne wali api");
    const { postId} = req.body;

    try {
      const postAfterDelete = await Blogpost.findByIdAndDelete({_id:postId});

      if(!postAfterDelete){
        return res.status(400).json({
          success:false,
          message:"Failed to delete userId"
        })
       }

       return res.status(200).json({
        success:true,
        message:'post delete succesfully',
        postAfterDelete
       })
      }
     catch (error) {
       return res.status(400).json({
        success:false,
        message: 'error while deleting post'
       })
    }
    

     }

  