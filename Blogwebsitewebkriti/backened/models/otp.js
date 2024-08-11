const mongoose = require('mongoose');
const mailsender = require('../utils/mailsender');
const  emailotptemplate = require('../mail/emailotptemplate')

const otpschema = new mongoose.Schema({
              
             email:{
                  type:String,
                  required:true,
             },
             otp:{
                           type:String,
                           required:true,
             },
             createdat:{
                              type:Date,
                              default:Date.now(),
                              expires:5*60

             }
})




// function to send email

              async function sendverificationemail(email,otp){
                 try{
                       const mailresponse  =       await   mailsender(email,"Verification email from blogwebsite", emailotptemplate(otp));
                       console.log(" mail response is : ",mailresponse)
                 } catch(error){
                        
                    console.log( "error occur while sending email" ,error.message);
                    throw error;
                 }

              }

otpschema.pre('save', async function(next){
                     await sendverificationemail(this.email,this.otp);
                     next();
});



const OTP = mongoose.model('OTP',otpschema);
module.exports = OTP;