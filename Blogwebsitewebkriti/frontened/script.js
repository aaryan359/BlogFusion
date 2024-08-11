const loginsignupdiv = document.querySelector('.login-signup-button');
const  profilesectiondiv = document.querySelector('.profile-section');
   
function showdashboardornot(loginsignup,profilesection,mainauthdiv){
                    
 loginsignupdiv.style.display= loginsignup;
 console.log( loginsignupdiv);
 profilesectiondiv.style.display = profilesection;
 console.log( profilesectiondiv);
  mainauth.style.display = mainauthdiv;
}

function isTokenExpired(token) {
 const decodedToken = jwt_decode(token);
 const currentTime = Date.now() / 1000; // in seconds
 console.log("current time is  : ",currentTime);
 console.log("decodedtoken time is  : ",decodedToken.exp);
 return decodedToken.exp < currentTime;
 }


 const token = JSON.parse(localStorage.getItem("token"));
 const userdetails = JSON.parse(localStorage.getItem("user"))
 if(token){
           
             imgelement.src = userdetails.profileimage;
 }

 function checksession(token) {
  
                      console.log("token is : ",token);

   if (token && !isTokenExpired(token)) {
      
     showdashboardornot("none","flex","none")
     console.log("if condition run");
       
   }else{
            console.log("else condition run");

            showdashboardornot("flex","none","none")
   }
  
}
   checksession(token);

let authloading = false;
let loadingToast;

//toast  basic setup
document.addEventListener('DOMContentLoaded', function() {
  toastr.options = {
      "closeButton": true,
      "debug": false,
      "newestOnTop": false,
      "progressBar": false,
      "positionClass": "toast-top-center",
      "preventDuplicates": false,
      "onclick": null,
      "showDuration": "300",
      "hideDuration": "1000",
      "timeOut": "5000",
      "extendedTimeOut": "1000",
      "showEasing": "swing",
      "hideEasing": "linear",
      "showMethod": "fadeIn",
      "hideMethod": "fadeOut"
  };
})



  // function to show loading toast
  function showloadingtoast(authloading){
             if(authloading){
                  
           loadingToast =   toastr.info('<div class="spinner"></div> Please wait...', 'Loading', {
                iconClass: 'toast-loading',
                closeButton: false,
                timeOut: 0, // Prevent auto-hide
                extendedTimeOut: 0,
                escapeHtml: false // Allow HTML content
            });
                        
             }else{
              if (loadingToast) {
                toastr.clear(loadingToast);
            }
             }
  }


/// BASE_URL

const BASE_URL = 'http://localhost:9060/api/v1'


  const  SENDOTP_API= BASE_URL + "/auth/sendotp";
  const  SIGNUP_API= BASE_URL + "/auth/signup";
  
  const  LOGIN_API= BASE_URL + "/auth/login";
  const  RESETPASSTOKEN_API=BASE_URL + "/auth/resetpasswordtoken";
  const  RESETPASSWORD_API=BASE_URL + "/auth/resetpassword";
    const GETTRANDINGPOST_API =BASE_URL+"/blog/gettrending"
  const   GETLATESTPOST_API = BASE_URL+ "/blog/getlatest"






// creating axios instance
const axiosinstance = axios.create({});


const apiconnector = (method ,url ,bodydata ,headers ,params)=>{
                    
    return   axiosinstance({
                
        method: `${method}`,
        url: `${url}`,
        data:  bodydata ? bodydata :null,
        headers: headers? headers : null,
        params: params ? params:null
})

}


// creating formadata object to store signup information

 let formdata = {
                   
               firstname: "",
               lastname: "",
               username:"",
               email:"",
               mobilenumber:"",
               password:"",
               confirmpassword:"",
               otp:""
 }

  

  

async function sendotp(email){
  
                 authloading = true;
                   showloadingtoast(authloading);
         try{
               
               const response = await  apiconnector("POST",SENDOTP_API, {email}  )

               console.log("SENDOTP API RESPONSE............", response)
               console.log(response.data.success)

             
                if (!response.data.success) {

                 
                  throw new Error(response.data.message)
                }
               
                toastr.success('Your OTP is being sent.');

         }catch(error){
                       
          console.log("SENDOTP API ERROR............", error)
          if (error.response && error.response.status === 409) {
            toastr.error('User already exists. Please try logging in.', 'Error');
           } else {
            toastr.error('Oops! Signup failed. Please try again.', 'Error');
        }

         }
         authloading = false;
         showloadingtoast(authloading);
}

async function  signUP(firstname,lastname,username,email,password,confirmpassword,mobilenumber,otp){
                   let result = "valid";
                    authloading = true;
                    showloadingtoast(authloading);
                    try{
                              
                        const response =  await apiconnector("POST", SIGNUP_API,{firstname,lastname,username,email,password,confirmpassword,mobilenumber,otp});

                        console.log("SIGN_UP API RESPONSE............", response);
                        if (!response.data.success) {
                          
                           if(error.response && error.response.status === 409){
                                 
                                     toastr.error('Invalid OTP, Enter correct otp','Error');
                           }
                          throw new Error(response.data.message)
                        }
                         
                        toastr.success('Signup successful! Please log in now.', 'Success');

                    }catch(error){
                       
                      if (error.response && error.response.status === 409) {
                        toastr.error('Invalid OTP, Enter correct OTP', 'Error');
                        result = "Invalid-otp"

                       }else{
                        toastr.error('Oops! Signup failed. Please try again.', 'Error');
                       }
                        
                       }
                    
                       authloading = false;
                       showloadingtoast(authloading);
                       
                       return result;
                    
}

async function Login(email,password){
  authloading = true;
  showloadingtoast(authloading);

  try{
                
                 const response = await apiconnector("POST",LOGIN_API,{
                              email,
                              password,
                 })

                 if (!response.data.success) {
                    
                     if(response.data.message==="user-not-exist"){
                      toastr.error('Please check your credentials and try again.', 'User Not Exist');     
                     }
                  throw new Error(response.data.message)
                }
             
                userimage = `https://api.dicebear.com/5.x/initials/svg?seed=${response.data?.user?.firstname} ${response.data?.user?.lastname}`;
                imgelement.src = userimage;

                localStorage.setItem("token", JSON.stringify(response.data.token))
                localStorage.setItem("user", JSON.stringify(response.data.user))
                    
              
                   if(response.data.token){
                                
                
         
                      showdashboardornot("none","flex","none");
              
                          
                             
                   }
                toastr.success('Login Successfully.','success');







                 
  }catch(error){
                       
    console.log("SENDOTP API ERROR............", error)
    toastr.error('Oops! Login failed. Please try again .', 'Error');
   }
   authloading = false;
   showloadingtoast(authloading);

                      
}


function logout() {
  
    localStorage.removeItem("token")
    localStorage.removeItem("user")
    toastr.success("Logged Out",'success');
    showdashboardornot("flex","none","none");
   
  }



 const firstname = document.getElementById('firstname');
 const lastname = document.getElementById('lastname');
 const signupemail = document.querySelector('.signupemail');
 const mobilenumber = document.getElementById('mobilenumber');
 const password = document.getElementById('signpassword');
 const confirmpassword = document.getElementById('confirmpassword')
 const verifyemailbutton = document.querySelector('.verify-email-button');
 


createaccountbutton.addEventListener('submit',()=>{
                                  
                    formdata.firstname = firstname.value;
                   
                    formdata.lastname = lastname.value;
                     formdata.username =  "username_"+firstname.value+lastname.value
                    formdata.email =  signupemail.value;
                    
                    formdata.mobilenumber = mobilenumber.value;
                    formdata.password = password.value;
                    formdata.confirmpassword = confirmpassword.value;

                    if( formdata.password===formdata.confirmpassword){
                      sendotp(formdata.email);
                    }else{
                            toast.error('Confirm password does not match with password.','Error')
                    }
                     
                     console.log("formdata is : ",formdata );
                  
})



verifyemailbutton.addEventListener( 'click', async ()=>{
                                      

                                    formdata.otp =  finalInput;
                                    console.log('otp is : ',finalInput);
                                   console.log("formdata is : ",formdata )
                               let result =  await  signUP(formdata.firstname,formdata.lastname,formdata.username,formdata.email,formdata.password,formdata.confirmpassword,formdata.mobilenumber,formdata.otp);
                                      console.log("result is : ",result)
                                   if(result!=="Invalid-otp"){
                                            
                                    mainauth.style.display = "none";
                                   }  
                                    
                                
}  )

 let loginformdata = {
             
                email:"",
                password:"",
 }


                 
          const loginemail = document.querySelector('.loginemail');
          const  loginpassword = document.querySelector('.loginpassword');

                    
            const  loginform = document.querySelector('.login-form');




            loginform.addEventListener('submit',(event)=>{
                      
                            event.preventDefault();

                            loginformdata.email= loginemail.value;
                            loginformdata.password = loginpassword.value;

                            console.log(' login formdata is : ',loginformdata);
                             

                            Login(loginformdata.email,loginformdata.password);

                            

                              
            })



         const logoutbutton =       document.querySelector('.logout-button');


                    logoutbutton.addEventListener('click',()=>{
                                         
                                      logout();
                    })







// fetch latest blog bpost
function formatDate(dateString) {
  const date = new Date(dateString);

  // Options for formatting the date
  const options = { year: 'numeric', month: 'long', day: 'numeric' };

  // Format the date
  return date.toLocaleDateString('en-US', options);
}

// Example usage



let latestblogsarray ;

async function getlatest() {



  authloading = true;
  showloadingtoast(authloading);
  try{
            
      const response =  await apiconnector("GET", GETLATESTPOST_API,);

      console.log("LATEST API RESPONSE............", response);
      if (!response.data.success) {
        
        
        throw new Error(response.data.message)
      }
      latestblogsarray = response.data.latestBlogs   ;
          console.log("api :",response.data.latestBlogs)  ;    
      // toastr.success(' latest blogs loades successfully', 'Success');

  }catch(error){
     
         console.log('error is : ',error)

      toastr.error('latest api fail ', 'Error');
     
      
     }
  
     authloading = false;
     showloadingtoast(authloading);
     
    
  
}

async function handleLatestBlogs() {
  await getlatest();
  console.log("Latest blogs:", latestblogsarray); 

              document.getElementById('lat1-img').src=latestblogsarray[0].images[0];
              document.getElementById('lat1-p').innerText=latestblogsarray[0].title;
              document.getElementById('lat1-pi').src =latestblogsarray[0].author.profileimage

              document.getElementById('lat2-img').src=latestblogsarray[1].images[0];
              document.getElementById('lat2-p').innerText=latestblogsarray[1].title;
              document.getElementById('lat2-pf').innerText = `By ${latestblogsarray[1].author.firstname+" "+latestblogsarray[1].author.lastname } . ${formatDate(latestblogsarray[1].createdat)}`

              document.getElementById('lat3-img').src=latestblogsarray[2].images[0];
              document.getElementById('lat3-p').innerText=latestblogsarray[2].title;
              document.getElementById('lat3-pf').innerText = `By ${latestblogsarray[2].author.firstname+" "+latestblogsarray[2].author.lastname } . ${formatDate(latestblogsarray[2].createdat)}`


              document.getElementById('lat4-img').src=latestblogsarray[3].images[0];
              document.getElementById('lat4-p').innerText=latestblogsarray[3].title;
              document.getElementById('lat4-pf').innerText = `By ${latestblogsarray[3].author.firstname+" "+latestblogsarray[3].author.lastname } . ${formatDate(latestblogsarray[3].createdat)}`

}

if(window.location.href.includes('index.html'))
handleLatestBlogs();




// Add a click event listener to the title element

if( window.location.href.includes('index.html')){



document.getElementById('lat1-p').addEventListener("click", function() {
 
  const encodedPostId = encodeURIComponent(latestblogsarray[0]._id);
  window.location.href = `previewblog.html?postid=${encodedPostId}`;
  });

  document.getElementById('lat2-p').addEventListener("click", function() {
        
    const encodedPostId = encodeURIComponent(latestblogsarray[1]._id);
    window.location.href = `previewblog.html?postid=${encodedPostId}`;
  });

  document.getElementById('lat3-p').addEventListener("click", function() {
 
    const encodedPostId = encodeURIComponent(latestblogsarray[2]._id);
    window.location.href = `previewblog.html?postid=${encodedPostId}`;
  });

  document.getElementById('lat4-p').addEventListener("click", function() {
       
    const encodedPostId = encodeURIComponent(latestblogsarray[3]._id);
    window.location.href = `previewblog.html?postid=${encodedPostId}`;
  });

}

let trendingblogsarray ;

async function gettrending() {

  try{
            
      const response =  await apiconnector("GET", GETTRANDINGPOST_API,);

      console.log("trending API RESPONSE............", response);
      if (!response.data.success) {
        
        
        throw new Error(response.data.message)
      }
      trendingblogsarray = response.data.trendingBlogs ;
          console.log("api :",response.data.trendingBlogs)  ;    
      // toastr.success(' trending blogs loades successfully', 'Success');

  }catch(error){
     
         console.log('error is : ',error)

      toastr.error('trending api failed ', 'Error');
     
      
     }
  
     
}
  


async function handletrendingBlogs() {
  await gettrending();
  console.log(" trending loaders is : ",authloading);
  console.log("trending blogs:", trendingblogsarray); 

              document.getElementById('tr1-img').src=trendingblogsarray[0].images[0];
              document.getElementById('tr1-p').innerText=trendingblogsarray[0].title;
              document.getElementById('tr1-pi').src =trendingblogsarray[0].author.profileimage

              document.getElementById('tr2-img').src=trendingblogsarray[1].images[0];
              document.getElementById('tr2-p').innerText=trendingblogsarray[1].title;
              document.getElementById('tr2-pf').innerText = `By ${trendingblogsarray[1].author.firstname+" "+trendingblogsarray[1].author.lastname } . ${formatDate(trendingblogsarray[1].createdat)}`

              document.getElementById('tr3-img').src=trendingblogsarray[2].images[0];
              document.getElementById('tr3-p').innerText=trendingblogsarray[2].title;
              document.getElementById('tr3-pf').innerText = `By ${trendingblogsarray[2].author.firstname+" "+trendingblogsarray[2].author.lastname } . ${formatDate(trendingblogsarray[2].createdat)}`


              document.getElementById('tr4-img').src=trendingblogsarray[3].images[0];
              document.getElementById('tr4-p').innerText=trendingblogsarray[3].title;
              document.getElementById('tr4-pf').innerText = `By ${trendingblogsarray[3].author.firstname+" "+trendingblogsarray[3].author.lastname } . ${formatDate(trendingblogsarray[3].createdat)}`

}

if(window.location.href.includes('index.html')){
  handletrendingBlogs();
}






if( window.location.href.includes('index.html')){



document.getElementById('tr1-p').addEventListener("click", function() {
 
  const encodedPostId = encodeURIComponent(trendingblogsarray[0]._id);
  window.location.href = `previewblog.html?postid=${encodedPostId}`;
  });

  document.getElementById('tr2-p').addEventListener("click", function() {
        
    const encodedPostId = encodeURIComponent(trendingblogsarray[1]._id);
    window.location.href = `previewblog.html?postid=${encodedPostId}`;
  });

  document.getElementById('tr3-p').addEventListener("click", function() {
 
    const encodedPostId = encodeURIComponent(trendingblogsarray[2]._id);
    window.location.href = `previewblog.html?postid=${encodedPostId}`;
  });

  document.getElementById('tr4-p').addEventListener("click", function() {
       
    const encodedPostId = encodeURIComponent(trendingblogsarray[3]._id);
    window.location.href = `previewblog.html?postid=${encodedPostId}`;
  });

}


let featureblogarray =[] ;


const GETFEATURED_API = BASE_URL + "/blog/getrandom"

async function getfeatured() {

  try{
            
      const response =  await apiconnector("GET", GETFEATURED_API,);

      console.log(" featured API RESPONSE............", response);
      if (!response.data.success) {
        
        
        throw new Error(response.data.message)
      }
      featureblogarray = response.data.randomBlogs ;
          console.log("api featured :",response.data.randomBlogs)  ;    
      // toastr.success(' featured blogs loades successfully', 'Success');

  }catch(error){
     
         console.log('error is : ',error)

      toastr.error('failed to get featured blogs', 'Error');
     
      
     }
  
     
}


async function handlefeatureBlogs() {
  await getfeatured();
  console.log(" trending loaders is : ",authloading);
  console.log("trending blogs:", featureblogarray); 

              document.getElementById('f1-img').src= featureblogarray[0].images[0];
              document.getElementById('f1-p').innerText= featureblogarray[0].title;
              document.getElementById('f1-pi').src = featureblogarray[0].author.profileimage

              document.getElementById('f2-img').src= featureblogarray[1].images[0];
              document.getElementById('f2-p').innerText= featureblogarray[1].title;
              document.getElementById('f2-pi').src = featureblogarray[1].author.profileimage


              document.getElementById('f3-img').src=featureblogarray[2].images[0];
              document.getElementById('f3-p').innerText=featureblogarray[2].title;
              document.getElementById('f3-pf').innerText = `By ${featureblogarray[2].author.firstname+" "+ featureblogarray[2].author.lastname } . ${formatDate(featureblogarray[2].createdat)}`


              document.getElementById('f4-img').src=featureblogarray[3].images[0];
              document.getElementById('f4-p').innerText=featureblogarray[3].title;
              document.getElementById('f4-pf').innerText = `By ${featureblogarray[3].author.firstname+" "+featureblogarray[3].author.lastname } . ${formatDate(featureblogarray[3].createdat)}`

              document.getElementById('f5-img').src=featureblogarray[4].images[0];
              document.getElementById('f5-p').innerText=featureblogarray[4].title;
              document.getElementById('f5-pf').innerText = `By ${featureblogarray[4].author.firstname+" "+featureblogarray[4].author.lastname } . ${formatDate(featureblogarray[4].createdat)}`


              document.getElementById('pf1-img').src = featureblogarray[0].author.profileimage;
               document.getElementById('pf1-n').innerText = `By ${featureblogarray[0].author.firstname+" "+ featureblogarray[0].author.lastname } `

                 document.getElementById('pf2-img').src = featureblogarray[1].author.profileimage;
               document.getElementById('pf2-n').innerText = `By ${featureblogarray[1].author.firstname+" "+ featureblogarray[1].author.lastname } `

                document.getElementById('pf3-img').src = featureblogarray[2].author.profileimage;
               document.getElementById('pf3-n').innerText = `By ${featureblogarray[2].author.firstname+" "+ featureblogarray[2].author.lastname } `

}

if(window.location.href.includes('index.html')){
  handlefeatureBlogs();
}






if( window.location.href.includes('index.html')){



document.getElementById('f1-p').addEventListener("click", function() {
 
  const encodedPostId = encodeURIComponent(featureblogarray[0]._id);
  window.location.href = `previewblog.html?postid=${encodedPostId}`;
  });

  document.getElementById('f2-p').addEventListener("click", function() {
        
    const encodedPostId = encodeURIComponent(featureblogarray[1]._id);
    window.location.href = `previewblog.html?postid=${encodedPostId}`;
  });

  document.getElementById('f3-p').addEventListener("click", function() {
 
    const encodedPostId = encodeURIComponent(featureblogarray[2]._id);
    window.location.href = `previewblog.html?postid=${encodedPostId}`;
  });

  document.getElementById('f4-p').addEventListener("click", function() {
       
    const encodedPostId = encodeURIComponent(featureblogarray[3]._id);
    window.location.href = `previewblog.html?postid=${encodedPostId}`;
  });

  document.getElementById('f5-p').addEventListener("click", function() {
       
    const encodedPostId = encodeURIComponent(featureblogarray[3]._id);
    window.location.href = `previewblog.html?postid=${encodedPostId}`;
  });

}

console.log(" use loda lassan",userdetails._id);
document.querySelector('.dashboard-button').addEventListener("click",()=>{
  const encodedUserId = encodeURIComponent(userdetails._id);
  window.location.href = `userprofile.html?userId=${encodedUserId}`;
  
})
