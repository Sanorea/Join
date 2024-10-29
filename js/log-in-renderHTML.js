/**
 * Generates the HTML for the sign-up page.
 * 
 * @returns {string} The HTML string for the sign-up page.
 */

function SingUpHTML() {
    return /*HTML*/`
    <form onsubmit="addUserLogIn(); return false;" class="form-body">
            <div class="log-in-header">
                <span id="header" class="header">Sign up</span>
                <div class="underline-header"></div>
                <img onclick="backToLogIn()" class="header-arrow curser" src="./assets/img/arrow-left-line.svg" alt="">
            </div>
            <div id="log-in-input-container" class="sign-up-input-container input">
                    <div class="email-input-content">
                        <input id="sing-up-name" minlength="3" maxlength="30" required class="name-input" placeholder="Name" type="Text">
                    </div>
                    <div class="email-input-content">
                        <input id="sing-up-email" minlength="6" maxlength="30" required class="email-input" placeholder="Email" type="email">
                    </div>
                    <div class="password-input-content">
                        <input class="password-input"  minlength="5" maxlength="15" required id="sign-up-password-1" onclick="iconFirstSwitch('icon'); this.onclick=null;" placeholder="Password" type="password" > 
                        <img id="icon" onclick="showVisibility('sign-up-password-1','icon')" src="./assets/img/lock.svg">
                    </div>
                    <div class="password-input-content">
                        <input class="password-input" minlength="5" maxlength="15" required id="sign-up-password-2" onkeydown="check()" onkeyup="check()" onclick="iconFirstSwitch('icon-2'); this.onclick=null;" placeholder="Confirm Password" type="password" >
                        <img id="icon-2" onclick="showVisibility('sign-up-password-2','icon-2')" src="./assets/img/lock.svg">
                        <p id="notTheSamePassword"></p>
                    </div>
            </div>
            <div class="sign-up-remember-me">
                    <input class="form-check-input curser input-remember" required type="checkbox" value="" id="flexCheckDefault">
                    <label class="form-check-label" for="flexCheckDefault">
                      <span class="accapt-the-policy-text">i accept the <a class="p-none" href="privacy_policy.html"><span class="sign-in-policy">Privacy policy</span></a></span>
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
  `;
}

/**
 * Generates the HTML for the login page.
 * 
 * @returns {string} The HTML string for the login page.
 */

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
                        <input required id="log-in-email" minlength="6" maxlength="30" class="email-input" placeholder="Email" type="email">
                    </div>
                    <div class="password-input-content">
                        <input required class="password-input" minlength="5" maxlength="15" id="log-in-password-1"
                            onclick="iconFirstSwitch('icon-3'); this.onclick=null;" placeholder="Password"
                            type="password">
                        <img id="icon-3" onclick="showVisibility('log-in-password-1','icon-3')" src="./assets/img/lock.svg">
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

/**
 * Generates the HTML for a generic pop-up modal with a message and an "Okey" button.
 * 
 * @param {string} text - The message text to be displayed in the pop-up.
 * @returns {string} The HTML string for the pop-up modal.
 */

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

/**
 * Generates the HTML for a welcome pop-up modal.
 * 
 * @param {string} text - The welcome message text.
 * @param {string} name - The name to be included in the welcome message.
 * @returns {string} The HTML string for the welcome pop-up modal.
 */

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

/**
 * Generates the HTML for a check-in pop-up modal.
 * 
 * @returns {string} The HTML string for the check-in pop-up modal.
 */

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