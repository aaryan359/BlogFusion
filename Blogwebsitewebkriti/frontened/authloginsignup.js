let login = document.getElementById("login")
let signup = document.getElementById("signup")
let otpcontainer = document.querySelector('.otp-container')
let  createaccountbutton = document.querySelector('.signup-form');
 const mainauth = document.querySelector('.main-auth')

let loginbutton = document.getElementById("loginbutton")
let signupbutton = document.getElementById("signupbutton")
let loginbutton2 = document.getElementById("loginbutton2")
let signupbutton2 = document.getElementById("signupbutton2")
let signuphidebutton = document.getElementById("hide-signup-icon")
let loginhidebutton = document.getElementById("hide-login-icon")
let hideverifyemailbutton =document.getElementById("hide-email-icon");

    hideverifyemailbutton.addEventListener('click',()=>{
                                   mainauth.style.display= "none"
                           
    })
//  header  login sign up button
  loginbutton.addEventListener('click',()=>{
                             
                   login.style.display="flex"
                   signup.style.display="none"
                   otpcontainer.style.display = "none"
                   mainauth.style.display= "flex"
  })
  signupbutton.addEventListener('click',()=>{
                             
                             login.style.display="none"
                             otpcontainer.style.display = "none"
                             signup.style.display="flex"
                             mainauth.style.display= "flex"
            })


      // form login signup button
  loginbutton2.addEventListener('click',()=>{
                             
                             login.style.display="flex"
                             signup.style.display="none"
                             mainauth.style.display= "flex"
            })
   signupbutton2.addEventListener('click',()=>{
                                       
                                       login.style.display="none"
                                       signup.style.display="flex"
                                       mainauth.style.display= "flex"
                      })

    createaccountbutton.addEventListener('submit',(event)=>{
                                    event.preventDefault();
                                  mainauth.style.display= "flex"
                               login.style.display="none"
                               signup.style.display="none"
                              
                              otpcontainer.style.display = "flex"
                                 startInput();
                           
                      })

          // cancel login sign up icon            
          signuphidebutton.addEventListener('click',()=>{
                             
                             mainauth.style.display= "none"
            })



            loginhidebutton.addEventListener('click',()=>{
                             
                             mainauth.style.display= "none"
            })
                   

      const input = document.querySelectorAll(".input");
      const inputField = document.querySelector(".inputfield");
     
      
      let inputCount = 0,
        finalInput = "";
      
      //Update input
      const updateInputConfig = (element, disabledStatus) => {
        element.disabled = disabledStatus;
        if (!disabledStatus) {
          element.focus();
        } else {
          element.blur();
        }
      };
      
      input.forEach((element) => {
        element.addEventListener("keyup", (e) => {
          e.target.value = e.target.value.replace(/[^0-9]/g, "");
          let { value } = e.target;
      
          if (value.length == 1) {
            updateInputConfig(e.target, true);
            if (inputCount <= 5 && e.key != "Backspace") {
              finalInput += value;
              if (inputCount < 5) {
                updateInputConfig(e.target.nextElementSibling, false);
              }
            }
            inputCount += 1;
          } else if (value.length == 0 && e.key == "Backspace") {
            finalInput = finalInput.substring(0, finalInput.length - 1);
            if (inputCount == 0) {
              updateInputConfig(e.target, false);
              return false;
            }
            updateInputConfig(e.target, true);
            e.target.previousElementSibling.value = "";
            updateInputConfig(e.target.previousElementSibling, false);
            inputCount -= 1;
          } else if (value.length > 1) {
            e.target.value = value.split("")[0];
          }
          // submitButton.classList.add("hide");
        });
      });
      
      window.addEventListener("keyup", (e) => {
        if (inputCount > 5) {
          // submitButton.classList.remove("hide");
          // submitButton.classList.add("show");
          if (e.key == "Backspace") {
            finalInput = finalInput.substring(0, finalInput.length - 1);
            updateInputConfig(inputField.lastElementChild, false);
            inputField.lastElementChild.value = "";
            inputCount -= 1;
            // submitButton.classList.add("hide");
          }
        }
      });
      
      const validateOTP = () => {
        alert("Success");
      };
      
      //Start
      const startInput = () => {
        inputCount = 0;
        finalInput = "";
        input.forEach((element) => {
          element.value = "";
        });
        updateInputConfig(inputField.firstElementChild, false);
      };
       
// Ensure mainauth is hidden initially
     mainauth.style.display = "none";
          startInput();

