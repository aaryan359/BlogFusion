const  cloudinary = require('cloudinary').v2


exports.uploadimagetocloudinary = async (file ,folder ,hieght,quality)=>{

                              const options = {folder};
                        
                              if(hieght){
                                           
                                   options.hieght = hieght;
                              }
                              if(quality){
                                 options.quality = quality;
                              }
                         
                         
                             
                               options.resource_type = "auto"

                           return await   cloudinary.uploader.upload(file.tempFilePath,options)
              
                 
}