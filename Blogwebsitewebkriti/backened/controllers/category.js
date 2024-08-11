const User = require('../models/user');
const  Category = require('../models/category');


//checked
exports.createcategory= async(req,res)=>{

       try{

       
                    
               //fetch data from req ki body
            
           const{category} = req.body;
     
        const userid = req.user.id;

        if(!category){
               
             return res.status(402).json({
                     
                success:true,
                message:'empty-field'
             })
        } 
 
        ///check user exit or not

        const user = await User.findById(userid);

        if(!user){
              
             return res.status(402).json({
                   
                  success:false,
                  message:'Not-register'
             })
        }


        const categoryresponse = await  Category.create({
                                             
                                               categoryname:category,
                                               user:userid,
        });

        return res.status(200).json({

                      success:true,
                      message:'category-created',
                      categoryresponse
                    
                     
        });



    }catch(error){
         
        console.log("error while create category",error)
          return  res.status(402).json({
                       
                        success:false,
                        message:'createcategory-api-fail'
          })
        
    }
          
                
}

//checked
exports.showallcategory = async(req,res)=>{


    try{

    
            
           
            
                


                 const categories = await Category.find({},{categoryname:true});

                 return res.status(200).json({
                     success:true,
                     message:'categories-fetch-successfully',
                     categories
                 })
                        
                }catch(error){

                    console.log('Error occur while fetching all categories : ',error)

                     return res.status(402).json({
                             
                         success:false,
                         message:'show-category-api-fail'
                     })
        
                } 
}

//checked
exports.getallpostundercategory = async(req,res)=>{
                       
                   try{

                   
                          
                        //fetch data from req ki body

                        const{category}=req.body;
                       
                        console.log(" before category post")
                        const userid = req.user.id;
                        
                        if(!category){
                             
                               return res.status(402).json({
                                         success:false,
                                         message:"empty-field"
                               })
                        }

                        //check user

                        const user = await  User.findById(userid);

                        if(!user){
                            return res.status(402).json({
                                      success:false,
                                      message:'Not-register'
                            })
                        }
            
                      
                        const categoryposts = await Category.find({categoryname:category}).populate("posts").exec();

                        return res.status(200).json({
                             success:true,
                             message:'getallposts-successfully',
                             categoryposts
                        })


                    }catch(error){

                          console.log('Error occur while fetching all post under same category : ',error)
                          return  res.status(402).json({
                                    
                                        success:false,
                                        message:'getallpost-api-fail'
                          })
                    
                    }

                    
}