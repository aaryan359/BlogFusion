const user = {
    firstname: 'N/',
    lastname: 'A'
  };

    // Create the image URL
    let userimage = `https://api.dicebear.com/5.x/initials/svg?seed=${user.firstname} ${user.lastname}`;

   // Set the src attribute of the img element
 const imgelement = document.querySelector('.profile-image');
 imgelement.src = userimage;