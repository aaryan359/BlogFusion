const bcrypt = require('bcrypt');
const mailsender =require('../utils/mailsender');
const crypto = require('crypto');


const User = require('../models/user');


// checked

exports.resetpasswordtoken = async(req,res)=>{
                           
        try{
                   //fetch email from request ki body

                   const {email}= req.body;

                   // check is there any user register with this emailor not
                   
                    const user =  await User.findOne( {email:email});

                    if(!user){
                         return res.status(402).json({
                             success:false,
                             message:"Not-register"
                         })
                    }

                    //generate token

                    const token = crypto.randomUUID();
                    // update user by this token

                    const updatefields = await User.findOneAndUpdate({email:email},{  token:token,resetpasswordexpires:Date.now() + 5*60*1000 },{new:true});

                     // create url

                     const url = `http://localhost:3000/update-password/${token}`

                     const mailresponse = await mailsender (email,"Password rest link from blogwebsite", `Password reset link is ${url}`)

                     console.log( "mail response is : ",mailresponse);

                     return res.status(200).json({
                          success:true,
                          message: "email sent successfully ",
                          updatefields
                     })

        }catch(error){

            console.log( "Error occur while create reset password token and sending frontend link : ",error);
            return res.status(402).json({
                 success:true,
                 message:" reset-password-token-api-fail"
            })


        }
}

//checked
exports.resetpassword = async(req,res)=>{

    try{

          
          const{newpassword,confirmpassword,token} = req.body;

           if(!newpassword || !confirmpassword || !token){
                    return res.status(402).json({
                         success:false,
                         message:"empty-field"
                    })
           }

           if(newpassword!==confirmpassword){
              return res.status(402).json({
                   success:true,
                   message:"password-not-match"
              })
           }


           // fnde user using token

           const user = await User.findOne({token:token});

           // chelk is user or not
           if(!user){
                       return res.status(402).json({
                                 success:false,
                                 message:"token-not-generate"
                       })
           }

           if(user.resetpasswordexpires<Date.now()){
                           return res.status(402).json({
                                     success:false,
                                     message:"token-expired"
                           })
           }

           // hash password

           const hashedpassword =  await bcrypt.hash(newpassword,10);

           await  User.findOneAndUpdate({token:token},{password:hashedpassword},{new:true});

           return res.status(200).json({
                        success:true,
                        message:"password-reset-successfully"
           })

      
    }catch(error){

          return res.status(402).json({
                 
             success:false,
             message:"password-reset-api-fail"
          })
        
    }
}

