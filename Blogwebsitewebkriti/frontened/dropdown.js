let dropdownopen = false;
const dropdown = document.querySelector('.dashboard-logout');
const   dropbutton =  document.querySelector('.drop-down');


  function setdropdowndisplay(property){
                         
                     dropdown.style.display = property;
                       
  }
   
   dropbutton.addEventListener('click',(e)=>{
                    if(dropdownopen===false){
                           dropdownopen=true;
                    }else{
                            dropdownopen=false;
                    }
                console.log(dropdownopen);
             if(dropdownopen){
                   
              setdropdowndisplay('flex');
             

             }else{
                        setdropdowndisplay('none');
             } 
                       
                      
   })
  dropdown.addEventListener('click',(e)=>{
                     e.stopPropagation();
  })

  


  function listener(event){
             
     if(dropdown.contains(event.target)){
               return;
     }

     setdropdowndisplay('none');
     dropdownopen=false;
               
  }


  document.addEventListener("mousedown", listener);
  document.addEventListener("touchstart", listener);

  if(!dropdownopen){
                 
                 setdropdowndisplay('none')
    }