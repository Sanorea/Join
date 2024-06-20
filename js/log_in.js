
const EDU_FIREBASE = 'https://remotestorage-79ec8-default-rtdb.europe-west1.firebasedatabase.app/';


function initLogIn() {
    loadData(path = "-NxdlUHdMDgqDya6QkiU/login");
    docID('body-login').innerHTML = LogInHTML();
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
            <div class="privacy-policy"><a class="sideNav-policy-a" href="legal_notice.html"><span class="policy-text">Privacy Policy</span></a></div>
            <div class="legal-notice"><a class="sideNav-policy-a" href="privacy_policy.html"><span class="notice-text">Legal notice</span></a></div>
        </div>
        </form>
        <!-- <div id="sign-up-popup" class="modal-dialog modal-fullscreen-sm-down d-none popup"></div> -->
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
                    <button type="button" onclick="guestLogIn()" class="log-in-btn-white btn-secondary curser"><span class="guest-btn-text">Guest Log in</span></button>
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
            <div class="privacy-policy"><a class="sideNav-policy-a" href="legal_notice.html"><span class="policy-text">Privacy Policy</span></a></div>
            <div class="legal-notice"><a class="sideNav-policy-a" href="privacy_policy.html"><span class="notice-text">Legal notice</span></a></div>
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

function WelcomePopUp(text, name) {
    return /*HTML*/ `
<div class="modal fade" id="exampleModal" tabindex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
  <div class="modal-dialog">
    <div class="modal-content modalContent">
      <div class="modal-header">
        <h1 class="modal-title fs-5" id="exampleModalLabel">${text} ${name}</h1>
      </div>
    </div>
  </div>
</div>
    `;
}

function checkInPopup() {
    return /*HTML*/ `
    <div class="modal fade" id="exampleModal" tabindex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
      <div class="modal-dialog">
        <div class="modal-content modalContent">
          <div class="modal-header">
          <div class="circle-loader">
          <div class="wrapper"> <svg class="checkmark" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 52 52"> <circle class="checkmark__circle" cx="26" cy="26" r="25" fill="none"/> <path class="checkmark__check" fill="none" d="M14.1 27.2l7.1 7.2 16.7-16.8"/></svg></div>
          </div>
        </div>
      </div>
    </div> 
    `}

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
    let body = docID('body-login');
    let container = docID('log-in-container');
    let bodyLogIn = docID('log-in-body');
    bodyLogIn.style.height = '515px';
    container.style.height = '515px';
    body.innerHTML = LogInHTML();
}

function guestLogIn(){
    let popUp = docID('sign-up-popup');
    popUp.classList.remove("d-none");
        popUp.innerHTML = WelcomePopUp('Welcome', 'Guest');
        setItemLocalStorage('user-name', 'Guest');
        setTimeout(function () { window.location.href = "summary.html"; }, 1400);
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
        password.value = ``;
        passwordSecond.value = ``;
    } else {
        postData("-NxdlUHdMDgqDya6QkiU/login", signUpDAta);
        popUp.classList.remove("d-none");
        popUp.innerHTML = checkInPopup();
        setTimeout(function () { popUp.classList.add("d-none"); }, 2000);
        setTimeout(backToLogIn, 2000);
        let contactInputValue = setContactInputValuesSignUp();
        postContactData(contactInputValue.name.value, contactInputValue.email.value, contactInputValue.phone, contactInputValue.acronym, contactInputValue.id);
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

async function loadData(path = "") {
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

async function userLogIn() {
    let popUp = docID('sign-up-popup');
    let response = await loadData("-NxdlUHdMDgqDya6QkiU");
    let users = Object.values(response.login);
    let email = docID('log-in-email');
    let password = docID('log-in-password-1');
    let user = users.find(u => u.email == email.value && u.password == password.value);
    if (user) {
        popUp.classList.remove("d-none");
        popUp.innerHTML = WelcomePopUp('Welcome', user.name);
        email.value = ``;
        password.value = ``;
        setItemLocalStorage('user-name', user.name)
        setTimeout(function () { window.location.href = "summary.html"; }, 1400);
    } else {
        popUp.classList.remove("d-none");
        popUp.innerHTML = renderPopUp('Email or Password are wrong');
        password.value = ``;
    }
}

function setContactInputValuesSignUp() {
    let name = docID('sing-up-name'); // Input für Name
    let email = docID('sing-up-email'); // Inputfeld für E-Mail
    let phone = "";
    let firstLetterOfName = getFirstLetter(name.value);
    let firstLetterOfLastName = getFirstLetter(name.value.split(' ').pop()); 
    let acronym = firstLetterOfName + firstLetterOfLastName;
    let id = setID();

    return {
        name,
        email,
        phone,
        firstLetterOfName,
        firstLetterOfLastName,
        acronym,
        id
    }
}

async function postContactData(name, email, phone, acronym, id) {
    await postData("/contacts", {
        "contact-name": name,
        "contact-email": email,
        "contact-tel": phone,
        "contact-acronym": acronym,
        "contact-id": id,
        "contact-color": getRandomColor()
    })
}
