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


function getFirstLetter(string) {
    let firstLetter = string.slice(0, 1);
    return firstLetter;
}


function renderHeader(firstLetter) {
    docID('header').innerHTML =/*html*/`

    <img class="header-logo" src="./assets/img/logo_mobile.svg">
    <div class="header-user dropdown" onclick="dropDownMenu()">
        <span class="header-user-initials">${firstLetter}</span>
        <div id="myDropdown" class="dropdown-content">
        <a href="#">Help</a>
        <a href="#">Legal Notice</a>
        <a href="#">Privacy Policy</a>
        <a onclick="clearTheLocalStorage()" href="index.html">Log out</a>
  </div>
  </div>
    `;
}

function clearTheLocalStorage(){
    localStorage.clear();
}


function renderNav() {
    docID('nav').innerHTML += /*html*/`
        <div class="nav-bar-input">
            <a class="nav-bar-icon-bg" href="/summary.html">
                <div class="nav-bar-container">
                    <img class="nav-bar-icon" src="/assets/img/summary_icon.svg" alt="summary">
                    <p class="nav-bar-links">Summary</p>
                </div>
            </a>
            <a class="nav-bar-icon-bg" href="/board.html">
                <div class="nav-bar-container">
                    <img class="nav-bar-icon" src="/assets/img/board_icon.svg" alt="board">
                    <p class="nav-bar-links">Board</p>
                </div>
            </a>
            <a class="nav-bar-icon-bg" href="/add_tasks.html">
                <div class="nav-bar-container">
                    <img class="nav-bar-icon" src="/assets/img/addTask_icon.svg" alt="addTask">
                    <p class="nav-bar-links">Add Task</p>
                </div>
            </a>
            <a class="nav-bar-icon-bg" href="/contacts.html">
                <div class="nav-bar-container">
                    <img class="nav-bar-icon" src="/assets/img/contacts_icon.svg" alt="contacts">
                    <p class="nav-bar-links">Contacts</p>
                </div>
            </a>
        </div>
    `;
}


function renderHeaderNav() {
    let finishFirstletter = getFirstLetter(localStorageName);
    renderHeader(finishFirstletter);
    renderNav();
}


/*addTask*/



const BASE_URL_Isa = "https://join-50399-default-rtdb.europe-west1.firebasedatabase.app/";

function addTaskInit(path) {
    addTaskLoadData(path);
    renderNames();

}

async function addTaskPostData(path = "", data = {}) {
    let responseAddTask = await fetch(BASE_URL_Isa + path + ".json", {
        method: "POST",
        header: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify(data)
    }

    );
    return responseToJson = await responseAddTask.json();
}

async function addTaskLoadData(path = "") {
    let responseAddTask = await fetch(BASE_URL_Isa + path + ".json");
    return responseToJson = await responseAddTask.json();
}

function submitTask() {
    let title = docID('add-task-input-title');
    let description = docID('add-task-input-description');
    let assignedTo = docID('add-task-input-assigned');
    let date = docID('add-task-input-date');
    let categorie = docID('add-task-input-categorie')

    addTaskPostData("/tasks", {
        "title": title.value,
        "description": description.value,
        "assignedTo": assignedTo.value,
        "date": date.value,
        "prio": "prio",
        "categorie": categorie.value,
        "subtasks": "subtasks",
    });
    title.value = "";
    description.value = "";
    assignedTo.value = "";
    date.value = "";
    categorie.value = "";
    subtasks = "";
}

function renderNames() {
    let names = ['isabel', 'peter', 'alex'];
    let dropDown = document.getElementById('dropDown');
    for (let i = 0; i < names.length; i++) {
        const element = names[i];
        dropDown.innerHTML += `                
        <li>
            <label>
                ${element}
                <input type="checkbox" value="${element}">
            </label>
        </li>`;
    }
    attachCheckboxHandlers();
}

function handleCB() {
    let mySelectedListItems = [];
    let mySelectedListItemsText = '';

    chBoxes.forEach((checkbox) => {
        if (checkbox.checked) {
            mySelectedListItems.push(checkbox.value);
            mySelectedListItemsText += checkbox.value + ', ';
        }
    });

    dpBtn.innerText =
        mySelectedListItems.length > 0
            ? mySelectedListItemsText.slice(0, -2) : 'Select';
    console.log(mySelectedListItems);
}

function attachCheckboxHandlers() {
    chBoxes = document.querySelectorAll('.dropdown-menu input[type="checkbox"]');
    dpBtn = document.getElementById('multiSelectDropdown');
    chBoxes.forEach((checkbox) => {
        checkbox.addEventListener('change', handleCB);
    });
}

let chBoxes;
let dpBtn;


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

function setItemLocalStorage(key, data) {
    localStorage.setItem(key, JSON.stringify(data));
}

function getItemLocalStorage(key) {
    return JSON.parse(localStorage.getItem(key))
}
