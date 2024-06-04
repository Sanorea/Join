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

function renderPrivacyPolice() {
    return /*HTML*/ `
    <div id="legal_notice-container" class="legal_notice-container">
    <div class="top">
            <div class="headline">legal Notice</div>
            <div onclick="backToSite()"><img class="back-arrow-img" src="assets/img/arrow-left-line.svg" alt=""></div>
        </div>
        <div class="notice-text">
            <h1>Impressum</h1>

            <p>Gruppe 192<br />
                KanBan-Board<br />
                GoodCoding 113<br />
                90210 M&uuml;nchen</p>

            <p>Partnerschaftsregister: HRB 99369934329<br />
                Registergericht: Amtsgericht M&uuml;nchen</p>

            <h2>Kontakt</h2>
            <p>Telefon: +49 (0) 123 44 55 66<br />
                Telefax: +49 (0) 123 44 55 99<br />
                E-Mail: Join-Gruppe-192@gmail.com</p>

            <h2>Umsatzsteuer-ID</h2>
            <p>Umsatzsteuer-Identifikationsnummer gem&auml;&szlig; &sect; 27 a Umsatzsteuergesetz:<br />
                DE01894910</p>

            <h2>Wirtschafts&shy;identifikations&shy;nummer</h2>
            <p>242930&szlig;</p>

            <h2>Gewerbeanmeldung</h2>
            <p>Die Gewerbeerlaubnis nach &sect; 34c GewO wurde am 01.01.2015 von folgender Stelle erteilt: Ordnungsamt
                M&uuml;nchen.</p>

            <h2>Angaben zur Berufs&shy;haftpflicht&shy;versicherung</h2>
            <p><strong>Name und Sitz des Versicherers:</strong><br />
                192 Versicherung AG<br />
                GoodCoding 10<br />
                90210 M&uuml;nchen</p>
            <p><strong>Geltungsraum der Versicherung:</strong><br />Deutschland</p>

            <h2>Redaktionell verantwortlich</h2>
            <p>Gruppe 192<br />
                GoodCoding 110<br />
                90210 M&uuml;nchen</p>

            <h2>EU-Streitschlichtung</h2>
            <p>Die Europ&auml;ische Kommission stellt eine Plattform zur Online-Streitbeilegung (OS) bereit: <a
                    href="https://ec.europa.eu/consumers/odr/" target="_blank"
                    rel="noopener noreferrer">https://ec.europa.eu/consumers/odr/</a>.<br /> Unsere E-Mail-Adresse
                finden Sie oben im Impressum.</p>

            <h2>Verbraucher&shy;streit&shy;beilegung/Universal&shy;schlichtungs&shy;stelle</h2>
            <p>Wir sind nicht bereit oder verpflichtet, an Streitbeilegungsverfahren vor einer
                Verbraucherschlichtungsstelle teilzunehmen.</p>

            <p>Quelle: <a href="https://www.e-recht24.de">eRecht24</a></p>
        </div>
</div>`;
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
    <span onclick="sideNavPolicy()" class="sideNav-policy">Privacy Policy</span>
    <span onclick="sideNavNotice()" class="sideNav-notice">Legal notice</span>
</div>`;
}

function sideNavPolicy(){
   let body =  docID('body-summary-content');
   body.classList.remove('body-summary');
   body.innerHTML = renderPrivacyPolice();
}

function backToSite() {
    let body =  docID('body-summary-content');
    let greetBody = docID('greet-body');
    body.innerHTML = renderSummaryHTML();
    greetBody = loadTheWelcomeSreen();
    body.classList.add('body-summary');
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

function setActiveButton(containerId, btnClass) {
    // Get the container element
    var btnContainer = document.getElementById(containerId);

    // Get all buttons with class=x inside the container
    var btns = btnContainer.getElementsByClassName(btnClass);

    // Loop through the buttons and add the active class to the current/clicked button
    for (var i = 0; i < btns.length; i++) {
        btns[i].addEventListener("click", function() {
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