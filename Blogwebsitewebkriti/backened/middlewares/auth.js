const jwt = require('jsonwebtoken');
require('dotenv').config();


exports.auth = async(req,res,next)=>{
    try{
         
               //extract token

               console.log("before token");
               const token = req.header("Authorization")?.replace("Bearer", "")
               console.log('jwt:',token);
           
               if(!token){
                     
                  return res.status(400).json({
                      success:false,
                      message:'token-missing'
                  })
               }  
                //verify token

                try{
                    console.log('before jwt token')
                    const payload = await jwt.verify(token,process.env.JWT_SECRET);
                    req.user = payload;
                    console.log('after jwt token') 
                }catch(error){
                            
                         return res.status(400).json({
                             success:false,
                             message:'token-invalid'
                         })
                }

                 console.log(" auth complete")
                 next();

    }catch(error){
               
         return res.status(402).json({
             success:false,
             message:'authorisation-fail'
         })
    }
         
}