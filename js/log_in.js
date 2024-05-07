
function init(){
    
}


function showVisibility(){
   
        var x = document.getElementById("password");
        if (x.type === "password") {
          x.type = "text";
          document.getElementById('icon').src = `assets/img/show_password.svg`;
        } else {
          x.type = "password";
          document.getElementById('icon').src = `assets/img/hide_password.svg`;
        }
      
}

function iconSwitch(){
  document.getElementById('icon').src = `assets/img/show_password.svg`;
}

function renderSignUp(){
  let header = docID('header');
  let container = docID('log-in-container');
  let logInContent = docID('log-in-input-container');
  container.style.height = '595px';
  header.innerHTML = 'Sing up';
  header.style.width = '173px';
  logInContent.style.height = '296px'; 
  logInContent.style.width = '364px'; 
  logInContent.style.gap  = '24px'; 
  logInContent.innerHTML = SingUpHTML();
}

function SingUpHTML(){
  return /*HTML*/`
  <form class="sign-up-container" action="">
    <input class="sign-up-input" id="sign-up-name" placeholder="Name" type="text">
    <input class="sign-up-input" id="sign-up-email" placeholder="Email" type="email">
    <input class="sign-up-input" id="sign-up-password" placeholder="Password" type="new-password">
    <input class="sign-up-input" id="sign-up-confirm-password" placeholder="Confirm Password" type="current-password">
  </form>
  `;
}