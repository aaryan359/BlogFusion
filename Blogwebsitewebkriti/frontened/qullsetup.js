  // function to show loading toast



// loader
document.addEventListener('DOMContentLoaded', function() {
    // Function to check if all images are loaded
   

    // Function to check if the editor is initialized (example for Quill editor)
    function editorInitialized() {
        const editorElement = document.getElementById('editor');
        return editorElement && editorElement.querySelector('.ql-editor') !== null;
    }

    // Function to check if content is fully loaded
    function checkContentLoaded() {
        if (editorInitialized()) {
            // Hide loader and show content
            document.querySelector('.loader').style.display = 'none';
            document.querySelector('.create-blog-div').style.display = 'flex';
        } else {
            // Retry checking if not all content is loaded
            setTimeout(checkContentLoaded, 100); // Check every 100ms
        }
    }

    // Start checking when DOM content is loaded
    checkContentLoaded();
});













// Initialize Quill editor
const quill = new Quill('#editor', {
  modules: {
    syntax: true,
    toolbar: '#toolbar-container',
  },
  placeholder: 'Compose an epic...',
  theme: 'snow',
});

// Array to store image files
let images = [];

// Extend the image button functionality
const toolbar = quill.getModule('toolbar');
toolbar.addHandler('image', () => {
    const input = document.getElementById('imageUpload');
    input.click();
});

// Handle image file selection
document.getElementById('imageUpload').addEventListener('change', async function() {
    const files = this.files;
    for (let i = 0; i < files.length; i++) {
        const file = files[i];
        images.push(file); // Store the image file

        // Convert file to Base64
        const base64Url = await fileToBase64(file);
        
        // Insert image with Base64 URL into Quill
        const range = quill.getSelection();
        if (range) {
            quill.insertEmbed(range.index, 'image', base64Url);
            quill.setSelection(range.index + 1); // Move cursor after the image
        }
    }
});

console.log(images);

// Function to convert file to Base64
function fileToBase64(file) {
    return new Promise((resolve, reject) => {
        const reader = new FileReader();
        reader.onloadend = () => resolve(reader.result);
        reader.onerror = reject;
        reader.readAsDataURL(file);
    });
}

// handle the case when images is remove


 

let blogpostid ="";

 
function previewBlog() {
 
  const encodedPostId = encodeURIComponent(blogpostid);

  window.location.href = `previewblog.html?postid=${encodedPostId}`;
}





const publishblogbutton = document.querySelector('.publish-blog-form');




    CREATEPOST_API = BASE_URL + "/blog/createpost";
    UPDATEPOST_API  = BASE_URL + "/blog/updatepost";


  async function createblog(formdata,token) {
    authloading = true;
    showloadingtoast(authloading);
    try{
         // Adjust 'token' if your key is different

        // Prepare headers with Authorization
        

       

       console.log('jwt token:',token);
       
        const response = await  apiconnector("POST",CREATEPOST_API,formdata,  {
            "Content-Type": "multipart/form-data",
            Authorization:`Bearer${token}`,
          } )

        console.log("SENDOTP API RESPONSE............", response)
        console.log(response.data.success)

      
         if (!response.data.success) {

          
           throw new Error(response.data.message)
         }


         const secureUrls = response.data.blogpostresult.images;
           console.log("secureurl array is : ",secureUrls);
         const quillContent = quill.root.innerHTML;
          console.log("before updated content : ",quillContent);
         const parser = new DOMParser();

         const doc = parser.parseFromString(quillContent, 'text/html');
 
           console.log("doc is : ",doc);
         // Get all img tags from the content
         const imgTags = doc.querySelectorAll('img');
                 
         console.log(imgTags);
         // Replace the src of each img tag with the corresponding secure URL
         imgTags.forEach((imgTag, index) => {
             if (index < secureUrls.length) {
                 imgTag.src = secureUrls[index];
             }
         });
                 
         quill.root.innerHTML = doc.body.innerHTML;
        
         // Prepare the data to send to the updateBlogPost API
         const updatedTitle = response.data.blogpostresult.title; // Assuming you have an input for title
         const updatedContent = quill.root.innerHTML;
         const postid =  response.data.blogpostresult._id;
            console.log("updated content is  : ",updatedContent)
         const response2 = await apiconnector("POST",UPDATEPOST_API,{updatedTitle,updatedContent,postid},{
          "Content-Type": "multipart/form-data",
          Authorization:`Bearer${token}`,
        } );
         console.log("SENDOTP API RESPONSE2............", response)
         console.log(response2.data.success)
 
       
          if (!response2.data.success) {
 
           
            throw new Error(response2.data.message)
          }
 
            blogpostid = response.data.blogpostresult._id;
         toastr.success('Your Blog is created successfully');
 

    }catch(error){
              
        console.log("SENDOTP API ERROR............", error)
         toastr.error(' Fail to create Blog . Try agin later','Error');
          
    }
    authloading = false;
    showloadingtoast(authloading);
  }



publishblogbutton.addEventListener('submit',(event)=>{
                     event.preventDefault();   
            const formdata = new FormData();


            const blogtitleinput = document.querySelector('.blog-title-input');
            const blogcontent =     quill.root.innerHTML;
            

            formdata.append("title",blogtitleinput.value);
            formdata.append("content",blogcontent);

            for(let  i= 0;i<images.length;i++){
                 formdata.append('images',images[i]);
            }
                    
            console.log('jwt token is s : ',token);
              createblog(formdata,token);
              images.length = 0;
              blogtitleinput.value="";
          
              console.log("blogcontent",blogcontent," title is : ",blogtitleinput.value,"array of images : ",images);
            console.log(...formdata);
})
const url = new URL(window.location.href);
const postId = url.searchParams.get('postId');

console.log("edit button pr click kr diya or data aaya ya nhi",postId);


if(postId){
   console.log('mai hu if condition ke andar:');
     
   const GETBLOGPOST_API = BASE_URL + '/blog/getpost';

   async function geteditpost(postid){
  //                      console.log("edit button wali post id ",postId)
                       try{
                        console.log("edit button wali post id ",postid)
                                const response =  await apiconnector("POST",GETBLOGPOST_API,{postid},{
                                  "Content-Type": "multipart/form-data",
                                  Authorization:`Bearer${token}`
                                })    
                                console.log(' response of edit   api ',response)
                               document.querySelector('.blog-title-input').value = response.data.blogpostresult.title;
                               
                       }catch(error){
                        console.log("edit krne ke liye post nhi aayi hai",error);
                       }

   }

   geteditpost(postId);
}