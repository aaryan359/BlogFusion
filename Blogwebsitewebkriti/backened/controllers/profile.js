
const User = require('../models/user');
const Profile = require("../models/profile");


//checked
exports.updateprofiledetails = async(req,res)=>{
          
       try{   
               //fetch data from request body

               const{ username,bio} = req.body;

               if(!bio || !username){
                 return  res.status(402).json({
                       success:false,
                       message:'empty-field'
                 })
               }

               const userid = req.user.id;

               //  find user using this  id


               const user = await User.findById(userid);

               const profileid = user.profiledetail;
                console.log("profile id is : ",profileid);
               // find and update the profile using ths id

                const profile = await Profile.findByIdAndUpdate(profileid,{ 
                                                        
                                                         bio:bio,
                                                         
                                                        },{new:true}
                )

                const username_usermodel = await User.findByIdAndUpdate(user._id,{
                  username:username
                },{new:true});

                 console.log( "profile data is : ",profile);
                 console.log( "user name data is : ",username_usermodel);
                 return res.status(200).json({
                         success:true,
                         message:'profile-updated',
                         profile,username_usermodel
                 })


                }catch(error){
                     
                         console.log('Error occur during updating profile : ',error)
                            res.status(402).json({
                         
                                 success:false,
                                 message:'updateprofile-api-fail'
                            })
                }

}


exports.deleteaccount = async(req,res)=>{
             //get user id
             // get profile id and delete the profile of thid user from profile collection
             // by using user id delete all blogpost of the user from blogpost collection
             // by using user id delete all like of the user from every post  by removing user from Like collection
             //// by using user id delete all comment of the user from evry post by removing user from comment  collection
             //delete all post from category schema that was created by this user
              // delete all post from tag schema that was created by this user

}

//checked
exports.getuserdetail = async(req,res)=>{

    try{

              const id = req.user.id;

              const user = await User.findById(id).populate("profiledetail").exec();

               return res.status(200).json({
                         success:true,
                         message:"Get all detail of user successfully",
                         user
               })

            }catch(error){
                console.log("Error occur while fetching user details : ",error);

                return res.status(402).json({
                            
                         success:true,
                         message:'get-userdetail-api-fail'

                })
           }



}