const BASE_URL = "https://join-192-default-rtdb.europe-west1.firebasedatabase.app/";

// let date = new Date();
// let time =  date.getHours();
// console.log(time);

// function init(){
//     loadFocus();
// renderSideNavHTML()
// }

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
    <div class="header-text">Kanban Project Management Tool</div>
    <div class="top-right-infos">
    <img class="info-img" src="./assets/img/help.svg" alt="">
    <div class="header-user dropdown" onclick="dropDownMenu()">
        <span class="header-user-initials dropdown">${firstLetter}</span>
        <div id="myDropdown" class="dropdown-content">
        <a class="help-d-none" href="#">Help</a>
        <a href="#">Legal Notice</a>
        <a href="#">Privacy Policy</a>
        <a onclick="clearTheLocalStorage()" href="index.html">Log out</a>
  </div>
    </div>
  </div>
    `;
}

function clearTheLocalStorage() {
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

function renderSideNavHTML() {
    docID('sideNav').innerHTML = /*HTML*/`<div class="sideNav-logo">
    <img src="assets/img/Capa 1.svg" alt="">
</div>
<div class="sideNav-links">
    <div class="sideNav-summary" id="summary-link">
        <img src="assets/img/Vector.svg" alt="">
        <a href="summary.html" class="sideNav-text">Summary</a>
    </div>
    <div class="sideNav-summary" id="add-task-link">
        <img src="assets/img/edit_square.svg" alt="">
        <a href="add_tasks.html" class="sideNav-text">Add Task</a>
    </div>
    <div class="sideNav-summary" id="board-link">
        <img src="assets/img/vec.svg" alt="">
        <a href="board.html" class="sideNav-text">Board</a>
    </div>
    <div class="sideNav-summary" id="">
        <img src="assets/img/perm_contact_calendar.svg" alt="">
        <a href="contacts.html"  class="sideNav-text">Contacts</a>
    </div>
</div>
<div class="sideNav-policy-content">
    <span class="sideNav-policy">Privacy Policy</span>
    <span class="sideNav-notice">Legal notice</span>
</div>`;
}


function renderHeaderNav() {
    let finishFirstletter = getFirstLetter(localStorageName);
    renderHeader(finishFirstletter);
    renderNav();
    renderSideNavHTML();
}


/*addTask*/



async function addTaskContactsToArray() {
    let addTaskContacts = [];
    let addTaskResponseToJson = await addTaskLoadData(path = "");
    addTaskContacts.push(addTaskResponseToJson);
}

const BASE_URL_Isa = "https://join-50399-default-rtdb.europe-west1.firebasedatabase.app/";

function addTaskInit() {
    addTaskLoadData("/contacts/contact-name");
    renderContactListaddTasks();
    renderDropdownCategorieAddTasks();
    addTaskContactsToArray();
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

function submitTask() {
    let title = docID('add-task-input-title');
    let description = docID('add-task-input-description');
    let assignedTo = docID('add-task-input-assigned');
    let date = docID('add-task-input-date');
    /*     let categorie = docID('add-task-input-categorie') */

    addTaskPostData("/tasks", {
        "title": title.value,
        "description": description.value,
        "assignedTo": assignedTo.value,
        "date": date.value,
        "prio": "prio",
        /*         "categorie": categorie.value, */
        "subtasks": "subtasks",
    });
    title.value = "";
    description.value = "";
    assignedTo.value = "";
    date.value = "";
    /*     categorie.value = ""; */
    subtasks = "";
}

async function addTaskLoadData(path = "") {
    let response = await fetch(BASE_URL + path + ".json");
    let responseToJson = await response.json();
    return responseToJson;
}

let names = [];
let acronyms = [];
    
async function renderContactListInput(){
    await getContactsData();
    names = await renderNames();
    acronyms = await renderAcronym();
    return {names, acronyms};
}

async function renderNames(){
    for (let i = 0; i < arrContacts.length; i++) {
        let name = arrContacts[i]['contact-name'];
        names.push(name);
    }
    return names;
}

async function renderAcronym(){
    for (let i = 0; i < arrContacts.length; i++) {
        let acronym = arrContacts[i]['contact-acronym'];
        acronyms.push(acronym);
    }
    return acronyms;
}

async function renderContactListaddTasks() {
    let {names, acronyms} = await renderContactListInput();
    let dropDown = document.getElementById('dropDown');
    for (let i = 0; i < names.length; i++) {
        const name = names[i];
        const acronym = acronyms[i];
        dropDown.innerHTML += `                
        <li>
            <label class="dropdown-content">
                <div>
                    <div>${acronym}</div>
                    <div>${name}</div>
                </div>    
                <input type="checkbox" value="${name}">
            </label>
        </li>`;
    }
    attachCheckboxHandlers();
}

async function renderDropdownCategorieAddTasks() {
    let categories = [];
    let dropDown = document.getElementById('dropDown');
    for (let i = 0; i < categories.length; i++) {
        const categorie = categories[i];
        dropDown.innerHTML += `                
        <li>
            <label>
                <div>

                    <div>${categorie}</div>
                </div>    
                <input type="checkbox" value="${categorie}">
            </label>
        </li>`;
    }
    attachCheckboxHandlers();
}

function openContactListTasks(){
    /* enfernt d-none von Listencontainer*/
    /* passt Bildpfad an (Pfeil hoch anstelle von runter)*/
    /* passt Text in inputfeld zu suchfeld an*/
}

function getItemLocalStorage(key) {
    return JSON.parse(localStorage.getItem(key))
}