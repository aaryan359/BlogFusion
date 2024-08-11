 const nodemailer = require('nodemailer');
 require('dotenv').config();


 const  mailsender =  async (email ,title ,body)=>{

      try{
         
                let transporter =   nodemailer.createTransport({
                                host:process.env.MAIL_HOST,
                                auth:{
                                     user:process.env.MAIL_USER,
                                     pass:process.env.MAIL_PASS
                                }
                }) ;

                // send mail

                let info = await transporter.sendMail({
                         
                        from: "Vikas pal",
                        to: `${email}`,
                        subject:`${title}`,
                        html:`${body}`
                })
   
                      console.log( " email sent info is : ",info);
                      return info;





      }catch(error){
                           console.log(" Error come during sending mail : ",error);

      }
        
              
 }

 module.exports = mailsender;