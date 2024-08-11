const OTPgenerator = require('otp-generator');
const bcrypt  = require('bcrypt');
// const mailsender = require("../utils/mailsender");
const OTP = require("../models/otp");
const User = require("../models/user");
const Profile = require('../models/profile');
const jwt = require('jsonwebtoken')

require('dotenv').config();



// send otp  api
//checked
exports.sendotp = async (req,res)=>{

    try{
            // fetching email from request ki body
            const {email} = req.body;

            if(!email){
                 return res.status(400).json({
                              success:false,
                              message: "empty-field"
                 })
            }
 
            const checkuserpresent = await  User.findOne( {email} );
 
            // check is user already exist
 
            if(checkuserpresent){
                
                 return res.status(409).json({
                          succes:false,
                          message: "already-present"
                 })
            }
 
            // generate otp
 
            var Otp = OTPgenerator.generate(6,{
                 upperCaseAlphabets:false,
                 lowerCaseAlphabets:false,
                 specialChars:false,
            })
 
            console.log( " otp is : ",Otp);
 
            // check is otp unique or not
 
            const result = await OTP.findOne( {otp:Otp} );
 
            while(result){
               
                    Otp = OTPgenerator.generate(6,{
 
                     upperCaseAlphabets:false,
                     lowerCaseAlphabets:false,
                     specialChars:false,
                        
                    });
 
                      result = await OTP.findOne( {otp:Otp} );
            }
 
            //create entry in db 
 
            const otpbody = await OTP.create({email:email ,otp:Otp});
 
            res.status(200).json({
                   success:true,
                   message: "otp send successfully",
                   otpbody
            })

    }catch(error){

        console.log(" Error occur during otp send  : ",error);

         return res.status(500).json({
                   success:false,
                   message:"sendotp-api-fail"
         })

    }
            
   

}



//signup api
//checked
exports.signup = async (req,res)=>{


    try{

   
                      
                   // fetch data from request ki body
                   const { firstname,
                            lastname,
                            username,
                            email,
                            password,
                            confirmpassword,
                            mobilenumber,
                            otp

                             
                         }     = req.body;

                   // check all data send by client or not
                   if(!firstname || !lastname || !email || !password || !confirmpassword || !username || !mobilenumber || !otp){
                          
                         return  res.status(400).json({
                             success:false,
                             message:"empty-field"
                         })
                   }


                   // check password and confirm password

                   if(confirmpassword!=password){
                        
                      return res.status(400).json({
                              success:false,
                              message:"password-confirm-notmatch"
                      })
                   }


                   // check if user already exist or not

                   const existinguser = await User.findOne({email:email});

                   if(existinguser){
                         
                              return res.status(400).json({
                                  success:false,
                                  message:"already-present"
                              })
                   }



                   //find most recent otp   send on the provided email

                   const recentotp = await OTP.findOne({email:email}).sort({createdat:-1}).limit(1);
                           console.log("recent otp is : ",recentotp)
                    if(recentotp ==0){
                             
                        //otp not found
                        return res.status(400).json({
                                success:false,
                                message:"zero-length"
                        })
                    } else if(otp!==recentotp.otp){

                          return res.status(409).json({
                             success:false,
                             message:"invalid-otp"
                          })
                    }

                    const hashedpassword = await  bcrypt.hash(password,10);


                    // entry create

                     const profiledetail =  await Profile.create({
                                                    gender:null,
                                                    dateofbirth:null,
                                                    bio:null,
                                                    address:null
                     });

                   

                    const user = await User.create({
                                                   firstname:firstname,
                                                   lastname:lastname,
                                                   username:username,
                                                   email:email,
                                                   password:hashedpassword,
                                                   mobilenumber:mobilenumber,
                                                   profiledetail:profiledetail._id,
                                                   profileimage:`https://api.dicebear.com/5.x/initials/svg?seed=${firstname} ${lastname}`

                    })

                    res.status(200).json({
                         success:true,
                         message:"user-create"
                    });

                }catch(error){
                    console.log("Error occur during signup : ",error);
                    return  res.status(500).json({
                        success:false,
                        message:"signup-api-fail"
                    })

                }

                
                
}


// login api

//checked
exports.login = async(req,res)=>{

     try{

    
    // fetch data from request ki body
              const {email,password} = req.body;

    // check dat send or not

    if(!email || !password){
        return res.status(400).json({
              success:false,
              message:"empty-field"
        })
    }
   
    const user = await User.findOne({email:email})
                                                            // .populate(" profiledetail").exec();
    if(!user){
         return res.status(401).json({
            success:false,
            message:"user-not-exist"
         })
    }

    // check password

     const payload = {
                        
        email: user.email,
        id:user._id
     }


     if( await bcrypt.compare(password,user.password)){
          const token = jwt.sign(payload,process.env.JWT_SECRET,{
                        expiresIn:"2h"
          })



             user.token =token;
             user.password =undefined;


             //create cookie and send response


             const options = {
                expires : new Date( Date.now()+ 3*24*60*60*1000),
                httpOnly: true,
             }

             res.cookie("token",token,options).status(200).json({
                success:true,
                token,user
                         })

     }else{
                   return res.status(401).json({
                             succes:false,
                             message:"password-incorrect"
                   })
     }

    }catch(error){
         
         console.log("Error occur during login : ",error)
         return  res.status(403).json({
            success:false,
            message :  "login-api-fail"
        })

    }
}




