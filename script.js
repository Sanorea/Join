const BASE_URL = "https://join-192-default-rtdb.europe-west1.firebasedatabase.app/";

function docID(id) {
    return document.getElementById(id);
}

let localStorageName = getItemLocalStorage('user-name');


/**
 * Fetches data from a specified path and returns it as a JSON object.
 * 
 * This asynchronous function sends a GET request to the specified path, 
 * retrieves the response, and converts it to a JSON object.
 * 
 * @param {string} [path=""] - The path from which to load data. It will be appended to the BASE_URL.
 * @returns {Promise<Object>} A promise that resolves to the JSON object containing the fetched data.
 */

async function loadData(path = "") {
    let response = await fetch(BASE_URL + path + ".json");
    let responseToJson = await response.json();
    return responseToJson;
}

/**
 * Sends a POST request to the specified path with the provided data.
 * 
 * This asynchronous function sends a POST request to the specified path,
 * including the provided data in the request body, and returns the response as a JSON object.
 * 
 * @param {string} [path=""] - The path to which the data should be posted. It will be appended to the BASE_URL.
 * @param {Object} [data={}] - The data to be sent in the request body.
 * @returns {Promise<Object>} A promise that resolves to the JSON object containing the response data.
 */


async function postData(path = "", data = {}) {
    let response = await fetch(BASE_URL + path + ".json", {
        method: "POST",
        header: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify(data)
    });
    return responseToJson = await response.json();
}

/**
 * Sends a PUT request to the specified path with the provided data to update existing data.
 * 
 * This asynchronous function sends a PUT request to the specified path,
 * including the provided data in the request body, and returns the response as a JSON object.
 * 
 * @param {string} [path=""] - The path to which the data should be updated. It will be appended to the BASE_URL.
 * @param {Object} [data={}] - The data to be sent in the request body.
 * @returns {Promise<Object>} A promise that resolves to the JSON object containing the response data.
 */

async function updateData(path = "", data = {}) {
    let response = await fetch(BASE_URL + path + ".json", {
        method: "PUT",
        header: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify(data)
    });
    return responseToJson = await response.json();
}


/**
 * Sends a DELETE request to the specified path to delete data.
 * 
 * This asynchronous function sends a DELETE request to the specified path
 * and returns the response as a JSON object.
 * 
 * @param {string} [path=""] - The path to which the DELETE request should be sent. It will be appended to the BASE_URL.
 * @returns {Promise<Object>} A promise that resolves to the JSON object containing the response data.
 */

async function deleteData(path = "") {
    let response = await fetch(BASE_URL + path + ".json", {
        method: "DELETE",
    });
    return responseToJson = await response.json();
}

/**
 * Extracts and returns the first letter of a given value.
 * 
 * This function takes a value, converts it to a string if it is defined, and returns the first letter
 * of the string. If the value is undefined, an empty string is returned.
 * 
 * @param {*} value - The value from which the first letter should be extracted.
 * @returns {string} The first letter of the string representation of the value, or an empty string if the value is undefined.
 */

function getFirstLetter(value) {
    if (value === undefined) {
        string = '';
    } else {
        string = value.toString();
    }

    let firstLetter = string.slice(0, 1);

    return firstLetter;
}

/**
 * Clears all data from localStorage.
 * 
 * This function removes all key-value pairs from the local storage, effectively clearing it.
 */

function clearTheLocalStorage() {
    localStorage.clear();
}

/**
 * Toggles the visibility of the dropdown menu.
 * 
 * This function toggles the 'show' class on the element with the ID 'myDropdown',
 * making the dropdown menu appear or disappear.
 */

function dropDownMenu() {
    document.getElementById("myDropdown").classList.toggle("show")
}

// Close the dropdown if the user clicks outside of it

/**
 * Hides the dropdown menu when clicking outside of it.
 * 
 * This event listener function checks if the clicked target is not a dropdown element.
 * If true, it hides any open dropdown menus by removing the 'show' class.
 *
 * @param {Event} event - The click event object.
 */
window.onclick = function (event) {
    if (!event.target.matches('.dropdown')) {
        let dropdowns = document.getElementsByClassName("dropdown-content");
        let i;
        for (i = 0; i < dropdowns.length; i++) {
            var openDropdown = dropdowns[i];
            if (openDropdown.classList.contains('show')) {
                openDropdown.classList.remove('show');
            }
        }
    }
}

/**
 * Adds an event listener to buttons within a container to set the active button state.
 * 
 * This function finds all buttons with a specified class name within a given container.
 * When a button is clicked, it removes the "active" class from the currently active button
 * and adds it to the clicked button.
 *
 * @param {string} containerId - The ID of the container holding the buttons.
 * @param {string} btnClass - The class name of the buttons to be made active.
 */

function setActiveButton(containerId, btnClass) {
    var btnContainer = document.getElementById(containerId);

    var btns = btnContainer.getElementsByClassName(btnClass);

    for (var i = 0; i < btns.length; i++) {
        btns[i].addEventListener("click", function () {
            var current = document.getElementsByClassName("active");

            if (current.length > 0) {
                current[0].className = current[0].className.replace(" active", "");
            }
            this.className += " active";
        });
    }
}

/**
 * Sets the active navigation button based on the current URL.
 *
 * This function retrieves the current URL and extracts the last segment (i.e., the current site).
 * It then finds all elements with an `href` attribute that matches the current site and
 * adds the "active" class to those elements.
 */

function setActiveNavButton() {
    let currentPath = window.location.href;
    let currentSite = currentPath.substring(currentPath.lastIndexOf('/') + 1);
    let activeElement = document.querySelectorAll(`[href="/${currentSite}"]`);

    activeElement.forEach((element) => {
        element.className += " active";
    })
}

/**
 * save in Local storage
 * @param {key} key 
 * @param {key} data 
 */

function setItemLocalStorage(key, data) {
    localStorage.setItem(key, JSON.stringify(data));
}

/**
 * get in Local storage
 * @param {key} key 
 * @param {key} data 
 */

function getItemLocalStorage(key) {
    return JSON.parse(localStorage.getItem(key))
}
