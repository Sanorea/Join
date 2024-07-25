const BASE_URL = "https://join-192-default-rtdb.europe-west1.firebasedatabase.app/";

function docID(id) {
    return document.getElementById(id);
}

let localStorageName = getItemLocalStorage('user-name');


async function loadData(path = "") {
    let response = await fetch(BASE_URL + path + ".json");
    let responseToJson = await response.json();
    return responseToJson;
}


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



async function deleteData(path = "") {
    let response = await fetch(BASE_URL + path + ".json", {
        method: "DELETE",
    });
    return responseToJson = await response.json();
}


function getFirstLetter(value) {
    if (value === undefined) {
        string = '';
    } else {
        string = value.toString();
    }

    let firstLetter = string.slice(0, 1);

    return firstLetter;
}


function clearTheLocalStorage() {
    localStorage.clear();
}

function dropDownMenu() {
    document.getElementById("myDropdown").classList.toggle("show")
}

// Close the dropdown if the user clicks outside of it
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

function setActiveButton(containerId, btnClass) {
    // Get the container element
    var btnContainer = document.getElementById(containerId);

    // Get all buttons with class=x inside the container
    var btns = btnContainer.getElementsByClassName(btnClass);

    // Loop through the buttons and add the active class to the current/clicked button
    for (var i = 0; i < btns.length; i++) {
        btns[i].addEventListener("click", function () {
            var current = document.getElementsByClassName("active");

            // If there's no active class
            if (current.length > 0) {
                current[0].className = current[0].className.replace(" active", "");
            }

            // Add the active class to the current/clicked button
            this.className += " active";
        });
    }
}

function setActiveNavButton() {
    let currentPath = window.location.href;
    let currentSite = currentPath.substring(currentPath.lastIndexOf('/') + 1);
    let activeElement = document.querySelectorAll(`[href="/${currentSite}"]`);

    activeElement.forEach((element) => {
        element.className += " active";
    })
}

function setItemLocalStorage(key, data) {
    localStorage.setItem(key, JSON.stringify(data));
}

function getItemLocalStorage(key) {
    return JSON.parse(localStorage.getItem(key))
}
