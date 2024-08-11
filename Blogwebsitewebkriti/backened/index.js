 // creating instance
const express = require('express');
const app = express();
const multer = require('multer');
//env
require("dotenv").config()
//multer
 

 
//fetch routes
const userroutes = require("./routes/user");
const profileroutes = require('./routes/profile');
const likeroutes = require("./routes/like");
const categoryroutes = require("./routes/category")
const  blogpostroutes = require("./routes/blogpost");

// db connection function 

const dbconnect = require("./config/database");

const cookieparser = require('cookie-parser');
const cors =require('cors');

//cloudinary connection
const  {cloudinaryconnect} = require("./config/cloudinary");
const fileupload = require("express-fileupload");

//port intialisation
const PORT = process.env.PORT || 7005

//db connection call

dbconnect();

//middlewares
app.use(express.json()); 
// app.use(cookieparser());

app.use(
     
      cors({
               origin: process.env.FRONTENED_HOST,
               credentials:true
      })
)

app.use( 
               fileupload({
                       useTempFiles:true,
                    tempFileDir: "/tmp"
               })
)

//cloudinary connection call
cloudinaryconnect();

//routes
app.use("/api/v1/auth",userroutes);
app.use("/api/v1/profile",profileroutes)
app.use("/api/v1/like",likeroutes);
app.use("/api/v1/category",categoryroutes);
app.use('/api/v1/blog',blogpostroutes);

//default route
app.get("/",(req,res)=>{
       
     console.log(' GET  request recieved');
     return res.json({
              success:true,
              message:"your server is up" 
     });
})


app.listen(PORT,()=>{
           console.log(`app is running at ${PORT}`);
})
