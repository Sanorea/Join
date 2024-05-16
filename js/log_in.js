
const EDU_FIREBASE = 'https://remotestorage-79ec8-default-rtdb.europe-west1.firebasedatabase.app/';


function init() {
    let body = docID('body');
    loadData(path="-NxdlUHdMDgqDya6QkiU/login");
    body.innerHTML = LogInHTML();
}

function SingUpHTML() {
    return /*HTML*/`
    <form onsubmit="addUserLogIn(); return false;" class="form-body">
            <div class="log-in-header">
                <span id="header" class="header">Sign up</span>
                <div class="underline-header"></div>
                <img onclick="backToLogIn()" class="header-arrow curser" src="/assets/img/arrow-left-line.svg" alt="">
            </div>
            <div id="log-in-input-container" class="sign-up-input-container input">
                    <div class="email-input-content">
                        <input id="sing-up-name" minlength="3" maxlength="20" required class="name-input" placeholder="Name" type="Text">
                    </div>
                    <div class="email-input-content">
                        <input id="sing-up-email" minlength="6" maxlength="20" required class="email-input" placeholder="Email" type="email">
                    </div>
                    <div class="password-input-content">
                        <input class="password-input"  minlength="5" maxlength="15" required id="sign-up-password-1" onclick="iconFirstSwitch('icon'); this.onclick=null;" placeholder="Password" type="password" > 
                        <img id="icon" onclick="showVisibility('sign-up-password-1','icon')" src="assets/img/lock.svg">
                    </div>
                    <div class="password-input-content">
                        <input class="password-input" minlength="5" maxlength="15" required id="sign-up-password-2" onkeydown="check()" onkeyup="check()" onclick="iconFirstSwitch('icon-2'); this.onclick=null;" placeholder="Confirm Password" type="password" >
                        <img id="icon-2" onclick="showVisibility('sign-up-password-2','icon-2')" src="assets/img/lock.svg">
                        <p id="notTheSamePassword"></p>
                    </div>
            </div>
            <div class="sign-up-remember-me">
                    <input class="form-check-input curser input-remember" required type="checkbox" value="" id="flexCheckDefault">
                    <label class="form-check-label" for="flexCheckDefault">
                      <span class="accapt-the-policy-text">i accept the <span class="sign-in-policy">Privacy policy</span></span>
                    </label>
            </div>
                <div class="sign-up-btn">
                    <button type="submit" class="log-in-btn-black btn-primary curser"><span class="log-in-btn-text">Sign up</span></button>           
                </div>
           </div>
        <div class="bottom-body">
            <div class="Not-a-Join-user">
                <span class="bottom-text-not-joiner"></span>
            </div>
        </div>
        <div class="policy-notice">
            <div class="privacy-policy"><span class="policy-text">Privacy Policy</span></div>
            <div class="legal-notice"><span class="notice-text">Legal notice</span></div>
        </div>
        </form>
        <div id="sign-up-popup" class="modal-dialog modal-fullscreen-sm-down d-none popup"></div>
  `;
}

function LogInHTML() {
    return /*HTML*/ `
    <div id="log-in-body" class="log-in-body">
        <div id="log-in-container" class="log-in-container">
            <div class="log-in-header">
                <span id="header" class="header">Log in</span>
                <div class="underline-header"></div>
            </div>
            <div id="log-in-input-container" class="log-in-input-container">
                <form onsubmit="userLogIn(); return false;" class="input">
                    <div class="email-input-content">
                        <input required id="log-in-email" minlength="6" maxlength="20" class="email-input" placeholder="Email" type="email">
                    </div>
                    <div class="password-input-content">
                        <input required class="password-input" minlength="5" maxlength="15" id="log-in-password-1"
                            onclick="iconFirstSwitch('icon-3'); this.onclick=null;" placeholder="Password"
                            type="password">
                        <img id="icon-3" onclick="showVisibility('log-in-password-1','icon-3')" src="assets/img/lock.svg">
                    </div>
                    <div class="log-in-remember-me">
                        <input class="form-check-input input-remember curser" type="checkbox" id="flexCheckDefault">
                        <label class="form-check-label" for="flexCheckDefault">
                            <span class="remember-text">Remember me</span>
                        </label>
                    </div>
            <div class="log-in-btn">
                <div class="log-in-button">
                    <button type="submit" class="log-in-btn-black btn-primary curser"><span class="log-in-btn-text">Log In</span></button>
                </div>
            </form>
                <div class="log-in-guest">
                    <button class="log-in-btn-white btn-secondary curser"><span class="guest-btn-text">Guest Log in</span></button>
                </div>
            </div>
        </div>
        <div id="bottom-body-1" class="bottom-body">
            <div class="Not-a-Join-user">
                <span class="bottom-text-not-joiner">Not a Join user?</span>
            </div>
            <div class="Sing-up-button">
                <button onclick="renderSignUp()" class="Sing-up-btn btn-primary curser"><span class="bottom-text-sing-up">Sign up</span></button>
            </div>
        </div>
        <div class="policy-notice">
            <div class="privacy-policy"><span class="policy-text">Privacy Policy</span></div>
            <div class="legal-notice"><span class="notice-text">Legal notice</span></div>
        </div>
    </div>
    `;
}

function renderPopUp(text) {
    return /*HTML*/ `
<div class="modal fade" id="exampleModal" tabindex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
  <div class="modal-dialog">
    <div class="modal-content modalContent">
      <div class="modal-header">
        <h1 class="modal-title fs-5" id="exampleModalLabel">${text}</h1>
      </div>
      <div class="modal-footer">
        <button onclick="fromPopUpToSignUp()" type="button" class="btn btn-primary">Okey</button>
      </div>
    </div>
  </div>
</div>
    `;
}

function fromPopUpToSignUp() {
    let popUp = docID('sign-up-popup');
    popUp.classList.add("d-none");
}

function renderSignUp() {
    let container = docID('log-in-container');
    let bodyLogIn = docID('log-in-body');
    bodyLogIn.style.height = '595px';
    container.style.height = '100%';
    container.innerHTML = SingUpHTML();
}

function backToLogIn() {
    let body = docID('body');
    let container = docID('log-in-container');
    let bodyLogIn = docID('log-in-body');
    bodyLogIn.style.height = '515px';
    container.style.height = '515px';
    body.innerHTML = LogInHTML();
}

function showVisibility(id, icon) {

    let x = document.getElementById(`${id}`);
    if (x.type === "password") {
        x.type = "text";
        document.getElementById(`${icon}`).src = `assets/img/show_password.svg`;
    } else {
        x.type = "password";
        document.getElementById(`${icon}`).src = `assets/img/hide_password.svg`;
    }
}

function iconFirstSwitch(icon) {
    docID(`${icon}`).src = `assets/img/hide_password.svg`;
}

function addUserLogIn() {
    let popUp = docID('sign-up-popup');
    let name = docID('sing-up-name');
    let email = docID('sing-up-email');
    let password = docID('sign-up-password-1');
    let passwordSecond = docID('sign-up-password-2');
    let signUpDAta = {
        'name': name.value,
        'email': email.value,
        'password': password.value,
    }
    if (password.value != docID('sign-up-password-2').value) {
        popUp.classList.remove("d-none");
        popUp.innerHTML = renderPopUp('Password does not match');
    } else {
        postData("-NxdlUHdMDgqDya6QkiU/login", signUpDAta);
        name.value = ``;
        email.value = ``;
        password.value = ``;
        passwordSecond.value = ``;
    }
}

async function postData(path = "", data = {}) {
    let response = await fetch(EDU_FIREBASE + path + ".json", {
        method: "POST",
        header: {
            "Content-Type": "application/array"
        },
        body: JSON.stringify(data)
    });
    return responseToJson = await response.json();
}

async function loadData(path="") {
    let response = await fetch(EDU_FIREBASE + path + ".json");
    let responseToJson = await response.json();
    return responseToJson;
}

function check() {
    let textfiled = docID('notTheSamePassword');
    let input = docID('sign-up-password-1');
    if (input.value != docID('sign-up-password-2').value) {
        textfiled.style.visibility = "visible"
        textfiled.innerHTML = 'Ups! your password don´t match';
    } else {
        textfiled.style.visibility = "hidden"
    }
}

async function userLogIn(){
    let popUp = docID('sign-up-popup');
    let response = await loadData("-NxdlUHdMDgqDya6QkiU");
    let users = Object.values(response.login);
    let email = docID('log-in-email');
    let password = docID('log-in-password-1');
    let user = users.find(u => u.email == email.value && u.password == password.value);
    if (user) {
        popUp.classList.remove("d-none");
        popUp.innerHTML = renderPopUp('Welcome');
        email.value = ``;
        password.value = ``;
    } else {
        popUp.classList.remove("d-none");
        popUp.innerHTML = renderPopUp('Email or Password are wrong');
        password.value = ``;
    }
}
