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


function sideNavPolicy() {
    let body = docID('body-summary-content');
    body.classList.remove('body-summary');
    body.innerHTML = renderLegalNotice();
}

function sideNavNotice() {
    let body = docID('body-summary-content');
    body.classList.remove('body-summary');
    body.innerHTML = renderPrivacyPolice();
}

function backToSite() {
    let body = docID('body-summary-content');
    let greetBody = docID('greet-body');
    body.innerHTML = renderSummaryHTML();
    greetBody = loadTheWelcomeSreen();
    body.classList.add('body-summary');
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

async function renderContactListInput() {
    await getContactsData();
    names = await renderNames();
    acronyms = await renderAcronym();
    return { names, acronyms };
}

async function renderNames() {
    for (let i = 0; i < arrContacts.length; i++) {
        let name = arrContacts[i]['contact-name'];
        names.push(name);
    }
    return names;
}

async function renderAcronym() {
    for (let i = 0; i < arrContacts.length; i++) {
        let acronym = arrContacts[i]['contact-acronym'];
        acronyms.push(acronym);
    }
    return acronyms;
}

async function renderContactListaddTasks() {
    let { names, acronyms } = await renderContactListInput();
    let dropDown = document.getElementById('dropDown');
    for (let i = 0; i < names.length; i++) {
        const name = names[i];
        const acronym = acronyms[i];
        dropDownList.innerHTML += `   
        <table>
            <tr>
                <td>
                    <div>${acronym}</div>
                </td>
                <td>
                <div>${name}</div>
            </td>
                <td>                
                    <input type="checkbox" value="${name}">
                </td>
            </tr>
        </table>`;
        console.log('name :>> ', name);
    }

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

}



function openContactListTasks() {
    /* enfernt d-none von Listencontainer*/
    /* passt Bildpfad an (Pfeil hoch anstelle von runter)*/
    /* passt Text in inputfeld zu suchfeld an*/
}

// function setItemLocalStorage(key, data) {
//     localStorage.setItem(key, JSON.stringify(data));
// }

// function getItemLocalStorage(key) {
//     return JSON.parse(localStorage.getItem(key))
// }

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

function setItemLocalStorage(key, data) {
    localStorage.setItem(key, JSON.stringify(data));
}

function getItemLocalStorage(key) {
    return JSON.parse(localStorage.getItem(key))
}
