
function init() {

}


function showVisibility() {

    var x = document.getElementById("password-1");
    if (x.type === "password") {
        x.type = "text";
        document.getElementById('icon').src = `assets/img/show_password.svg`;
    } else {
        x.type = "password";
        document.getElementById('icon').src = `assets/img/hide_password.svg`;
    }

    var y = document.getElementById("password-2");
    if (y.type === "password") {
        y.type = "text";
        document.getElementById('icon-2').src = `assets/img/show_password.svg`;
    } else {
        y.type = "password";
        document.getElementById('icon-2').src = `assets/img/hide_password.svg`;
    }

}

function iconFirstSwitch() {
    document.getElementById('icon').src = `assets/img/show_password.svg`;
}
function iconSecondSwitch() {
    document.getElementById('icon-2').src = `assets/img/show_password.svg`;
}

function renderSignUp() {
    let container = docID('log-in-container');
    let bottomBody = docID('bottom-body');
    container.style.height = '595px';
    container.innerHTML = SingUpHTML();
    bottomBody.style.display = 'none'; 
}

function backToLogIn() {
    let container = docID('log-in-container');
    let bottomBody = docID('bottom-body');
    container.style.height = '515px';
    container.innerHTML = LogInHTML();
    bottomBody.style.display = 'flex';
}

function SingUpHTML() {
    return /*HTML*/`
            <div class="log-in-header">
                <span id="header" class="header">Sign up</span>
                <div class="underline-header"></div>
                <img onclick="backToLogIn()" class="header-arrow" src="/assets/img/arrow-left-line.svg" alt="">
            </div>
            <div id="log-in-input-container" class="sign-up-input-container">
                <form class="input">
                    <div class="email-input-content">
                        <input class="name-input" placeholder="Name" type="Text">
                    </div>
                    <div class="email-input-content">
                        <input class="email-input" placeholder="Email" type="email">
                    </div>
                    <div class="password-input-content">
                        <input class="password-input" id="password-1" onclick="iconFirstSwitch(); this.onclick=null;" placeholder="Password" type="current-password">
                        <img id="icon" onclick="showVisibility()" src="assets/img/lock.svg">
                    </div>
                    <div class="password-input-content">
                        <input class="password-input" id="password-2" onclick="iconSecondSwitch(); this.onclick=null;" placeholder="Confirm Password" type="current-password">
                        <img id="icon-2" onclick="showVisibility()" src="assets/img/lock.svg">
                    </div>
                </form>
            </div>
            <div class="sign-up-remember-me">
                    <input class="form-check-input curser input-remember" type="checkbox" value="" id="flexCheckDefault">
                    <label class="form-check-label" for="flexCheckDefault">
                      <span class="accapt-the-policy-text">i accept the <span class="sign-in-policy">Privacy policy</span></span>
                    </label>
                  </div>
                <div class="sign-up-btn">
                    <button class="log-in-btn-black btn-primary curser"><span class="log-in-btn-text">Sign up</span></button>           
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
  `;
}

function LogInHTML() {
    return /*HTML*/ `
    <div class="log-in-body">
        <div id="log-in-container" class="log-in-container">
            <div class="log-in-header">
                <span id="header" class="header">Log in</span>
                <div class="underline-header"></div>
            </div>
            <div id="log-in-input-container" class="log-in-input-container">
                <form class="input">
                    <div class="email-input-content">
                        <input class="email-input" placeholder="Email" type="email">
                    </div>
                    <div class="password-input-content">
                        <input class="password-input" id="password-1" onclick="iconFirstSwitch(); this.onclick=null;"
                            placeholder="Password" type="current-password">
                        <img id="icon" onclick="showVisibility()" src="assets/img/lock.svg">
                    </div>
                </form>
                <div class="log-in-remember-me">
                    <input class="form-check-input input-remember" type="checkbox" value="" id="flexCheckDefault">
                    <label class="form-check-label" for="flexCheckDefault">
                        <span class="remember-text">Remember me</span>
                    </label>
                </div>
            </div>
            <div class="log-in-btn">
                <div class="log-in-button">
                    <button class="log-in-btn-black btn-primary"><span class="log-in-btn-text">Log In</span></button>
                </div>
                <div class="log-in-guest">
                    <button class="log-in-btn-white btn-secondary"><span class="guest-btn-text">Guest Log
                            in</span></button>
                </div>
            </div>
        </div>
        <div id="bottom-body" class="bottom-body">
            <div class="Not-a-Join-user">
                <span class="bottom-text-not-joiner">Not a Join user?</span>
            </div>
            <div class="Sing-up-button">
                <button class="Sing-up-btn btn-primary"><span onclick="renderSignUp()" class="bottom-text-sing-up">Sign up</span></button>
            </div>
        </div>
        <div class="policy-notice">
            <div class="privacy-policy"><span class="policy-text">Privacy Policy</span></div>
            <div class="legal-notice"><span class="notice-text">Legal notice</span></div>
        </div>
    </div>`;
}