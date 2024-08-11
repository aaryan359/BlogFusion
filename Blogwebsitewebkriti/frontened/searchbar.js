let searchbaropen = false
 const searchbar = document.getElementById("searchbox");
 const  searchbutton = document.getElementById('search-icon')
 console.log(searchbar)
 searchbutton.addEventListener('click',()=>{
                     
                   if(searchbaropen===false){
                      searchbaropen=true;
                   }else{
                             searchbaropen = false;
                   }

                   if(searchbaropen){
                                searchbar.style.display="flex"
                   }else{
                                searchbar.style.display='none';
                   }
                   
 })

 if(!searchbaropen){
             
   searchbar.style.display = "none";
 }