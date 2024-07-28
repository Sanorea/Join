
const EDU_FIREBASE = "https://join-192-default-rtdb.europe-west1.firebasedatabase.app/";



/**
 * Initializes the login page by loading data and setting up the login form.
 * 
 * This function:
 * 1. Loads data from the specified path ("/login").
 * 2. Sets the inner HTML of the login body to the generated login page HTML.
 * 3. Clears any previously entered values in the email and password input fields.
 */
function initLogIn() {
    loadData(path = "/login");
    docID('body-login').innerHTML = LogInHTML();
    docID('log-in-email').value = "";
    docID('log-in-password-1').value = "";
}

    /**
 * Hides the sign-up pop-up.
 * Adds the "d-none" class to the pop-up element to make it invisible.
 */

function fromPopUpToSignUp() {
    let popUp = docID('sign-up-popup');
    popUp.classList.add("d-none");
}

/**
 * Renders the sign-up page.
 * Adjusts the height of specific elements and sets the inner HTML of the container to the sign-up page HTML.
 */
// Set the height of login body and container elements
// Replace the inner HTML of the container with the sign-up page HTML

function renderSignUp() {
    let container = docID('log-in-container');
    let bodyLogIn = docID('log-in-body');
    bodyLogIn.style.height = '595px';
    container.style.height = '100%';
    container.innerHTML = SingUpHTML();
}

/**
 * Redirects the user back to the login page.
 * Adjusts the height of specific elements and sets the inner HTML of the body to the login page HTML.
 */
// Set the height of login body and container elements
// Replace the inner HTML of the body with the login page HTML

function backToLogIn() {
    let body = docID('body-login');
    let container = docID('log-in-container');
    let bodyLogIn = docID('log-in-body');
    bodyLogIn.style.height = '515px';
    container.style.height = '515px';
    body.innerHTML = LogInHTML();
}

/**
 * Handles the guest login process.
 * Displays a welcome pop-up message, sets the user name in local storage, 
 * and redirects the user to the summary page after a short delay.
 */

function guestLogIn() {
    let popUp = docID('sign-up-popup');
    popUp.classList.remove("d-none");
    popUp.innerHTML = WelcomePopUp('Welcome', 'Guest');
    setItemLocalStorage('user-name', 'Guest');
    setTimeout(function () { window.location.href = "summary.html"; }, 1400);
}

/**
 * Toggles the visibility of a password input field and changes the associated icon.
 * 
 * @param {string} id - The ID of the input element whose type is to be toggled.
 * @param {string} icon - The ID of the image element whose source is to be changed.
 */

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

/**
 * Switches the source of an image element to display a "hide password" icon.
 * 
 * @param {string} icon - The ID of the image element whose source is to be changed.
 */

function iconFirstSwitch(icon) {
    docID(`${icon}`).src = `assets/img/hide_password.svg`;
}

/**
 * Handles user sign-up process.
 * Validates user input, displays appropriate messages, and sends data to the server.
 */
 /**
     * Object containing user sign-up data.
     * @type {{name: string, email: string, password: string}}
     */
    // Check if passwords match
    // Check if email ends with .de or .com

async function addUserLogIn() {
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
    }
    if (email.value.includes(".de") || email.value.includes(".com")) {
        postData("/login", signUpDAta);
        popUp.classList.remove("d-none");
        popUp.innerHTML = checkInPopup();
        setTimeout(function () { popUp.classList.add("d-none"); }, 2000);
        setTimeout(backToLogIn, 2000);
        let contactInputValue = await setContactInputValuesSignUp();
        postContactData(contactInputValue.name.value, contactInputValue.email.value, contactInputValue.phone, contactInputValue.acronym, contactInputValue.id);
    } else {

        popUp.classList.remove("d-none");
        popUp.innerHTML = renderPopUp('Email need to End with .de or .com');
    }

}

/**
 * This Function Post the Data in Firebase.
 * 
 * @param {string} path 
 * @param {jason} data 
 * @returns Send the responsed to Firebase.
 */

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

/**
 * Asynchronously fetches data from a specified path and returns it as a JSON object.
 * 
 * This function performs the following steps:
 * 1. Sends a fetch request to the URL constructed with the base URL (`EDU_FIREBASE`) and the specified path, appending ".json" to the path.
 * 2. Waits for the response and converts it to a JSON object.
 * 3. Returns the parsed JSON object.
 * 
 * @param {string} [path=""] - The relative path to append to the base URL for fetching data. Defaults to an empty string if not provided.
 * @returns {Promise<Object>} A promise that resolves to the JSON object representing the fetched data.*/

async function loadData(path = "") {
    let response = await fetch(EDU_FIREBASE + path + ".json");
    let responseToJson = await response.json();
    return responseToJson;
}

/**
 * Validates if the values in the password and confirm password input fields match.
 * 
 * This function compares the values of the password and confirm password input fields. 
 * If the values do not match, it displays an error message indicating that the passwords do not match.
 * If the values match, any existing error message is hidden.
 * 
 * @returns {void}
 * 
 * @example
 * // Example usage:
 * // Call this function on the `keyup` or `input` event of the confirm password field to validate passwords in real-time.
 * check();
 */

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

/**
 * Handles the user login process by validating credentials against stored data.
 * 
 * This function:
 * 1. Fetches user data from the server.
 * 2. Searches for a user with matching email and password.
 * 3. If a matching user is found:
 *    - Displays a welcome message in a popup.
 *    - Clears the email and password input fields.
 *    - Stores the user's name in local storage.
 *    - Redirects the user to the "summary.html" page after a short delay.
 * 4. If no matching user is found:
 *    - Displays an error message in a popup.
 *    - Clears the password input field.
 * 
 * @returns {Promise<void>} A promise that resolves when the login process is complete.
 * 
 * @example
 * // Example usage:
 * userLogIn().then(() => {
 *     console.log("Login process completed.");
 * }).catch(error => {
 *     console.error("Error during login process:", error);
 * });
 */

async function userLogIn() {
    let popUp = docID('sign-up-popup');
    let response = await loadData("/login");
    let users = Object.values(response);
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

/**
 * Collects and returns contact input values from the sign-up form.
 * 
 * This function retrieves input values for name and email from the sign-up form and generates additional data
 * such as initials and a unique ID. It returns an object containing these values, which can be used for further processing.
 * 
 * @returns {Object} An object containing the following properties:
 * - {HTMLElement} name - The input element for the user's name.
 * - {HTMLElement} email - The input element for the user's email.
 * - {string} phone - An empty string, placeholder for a phone number.
 * - {string} acronym - The initials of the user's name.
 * - {string} id - A unique identifier for the user.
 * 
 * @example
 * // Example usage:
 * const contactInfo = setContactInputValuesSignUp();
 * // Output might be: 
 * // { 
 * //   name: <input element>, 
 * //   email: <input element>, 
 * //   phone: "", 
 * //   acronym: "JS", 
 * //   id: "12345" 
 * // }
 */

async function setContactInputValuesSignUp() {
    let name = docID('sing-up-name'); // Input für Name
    let email = docID('sing-up-email'); // Inputfeld für E-Mail
    let phone = "";
    let acronym = setInitials(name);
    await getContactsData();
    let id = setID();

    return {
        name,
        email,
        phone,
        acronym,
        id
    }
}

/**
 * Sends contact data to the server.
 * 
 * This function constructs a contact data object with the provided parameters and sends it to the server using a POST request.
 * It includes a randomly generated color for the contact.
 * 
 * @param {string} name - The name of the contact.
 * @param {string} email - The email address of the contact.
 * @param {string} phone - The phone number of the contact.
 * @param {string} acronym - The acronym for the contact, typically derived from the name.
 * @param {string} id - A unique identifier for the contact.
 * 
 * @returns {Promise<void>} A promise that resolves when the POST request is complete.
 * */

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
