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


<<<<<<< HEAD
=======
            <p>Telefon: +49 (0) 123 44 55 66<br />
                E-Mail: info@Gruppe-192.de</p>
            <p>Verantwortliche Stelle ist die nat&uuml;rliche oder juristische Person, die allein oder gemeinsam mit
                anderen &uuml;ber die Zwecke und Mittel der Verarbeitung von personenbezogenen Daten (z.&nbsp;B. Namen,
                E-Mail-Adressen o. &Auml;.) entscheidet.</p>

            <h3>Speicherdauer</h3>
            <p>Soweit innerhalb dieser Datenschutzerkl&auml;rung keine speziellere Speicherdauer genannt wurde,
                verbleiben Ihre personenbezogenen Daten bei uns, bis der Zweck f&uuml;r die Datenverarbeitung
                entf&auml;llt. Wenn Sie ein berechtigtes L&ouml;schersuchen geltend machen oder eine Einwilligung zur
                Datenverarbeitung widerrufen, werden Ihre Daten gel&ouml;scht, sofern wir keine anderen rechtlich
                zul&auml;ssigen Gr&uuml;nde f&uuml;r die Speicherung Ihrer personenbezogenen Daten haben (z.&nbsp;B.
                steuer- oder handelsrechtliche Aufbewahrungsfristen); im letztgenannten Fall erfolgt die L&ouml;schung
                nach Fortfall dieser Gr&uuml;nde.</p>
            <h3>Allgemeine Hinweise zu den Rechtsgrundlagen der Datenverarbeitung auf dieser Website</h3>
            <p>Sofern Sie in die Datenverarbeitung eingewilligt haben, verarbeiten wir Ihre personenbezogenen Daten auf
                Grundlage von Art. 6 Abs. 1 lit. a DSGVO bzw. Art. 9 Abs. 2 lit. a DSGVO, sofern besondere
                Datenkategorien nach Art. 9 Abs. 1 DSGVO verarbeitet werden. Im Falle einer ausdr&uuml;cklichen
                Einwilligung in die &Uuml;bertragung personenbezogener Daten in Drittstaaten erfolgt die
                Datenverarbeitung au&szlig;erdem auf Grundlage von Art. 49 Abs. 1 lit. a DSGVO. Sofern Sie in die
                Speicherung von Cookies oder in den Zugriff auf Informationen in Ihr Endger&auml;t (z.&nbsp;B. via
                Device-Fingerprinting) eingewilligt haben, erfolgt die Datenverarbeitung zus&auml;tzlich auf Grundlage
                von &sect; 25 Abs. 1 TDDDG. Die Einwilligung ist jederzeit widerrufbar. Sind Ihre Daten zur
                Vertragserf&uuml;llung oder zur Durchf&uuml;hrung vorvertraglicher Ma&szlig;nahmen erforderlich,
                verarbeiten wir Ihre Daten auf Grundlage des Art. 6 Abs. 1 lit. b DSGVO. Des Weiteren verarbeiten wir
                Ihre Daten, sofern diese zur Erf&uuml;llung einer rechtlichen Verpflichtung erforderlich sind auf
                Grundlage von Art. 6 Abs. 1 lit. c DSGVO. Die Datenverarbeitung kann ferner auf Grundlage unseres
                berechtigten Interesses nach Art. 6 Abs. 1 lit. f DSGVO erfolgen. &Uuml;ber die jeweils im Einzelfall
                einschl&auml;gigen Rechtsgrundlagen wird in den folgenden Abs&auml;tzen dieser Datenschutzerkl&auml;rung
                informiert.</p>
            <h3>Empfänger von personenbezogenen Daten</h3>
            <p>Im Rahmen unserer Gesch&auml;ftst&auml;tigkeit arbeiten wir mit verschiedenen externen Stellen zusammen.
                Dabei ist teilweise auch eine &Uuml;bermittlung von personenbezogenen Daten an diese externen Stellen
                erforderlich. Wir geben personenbezogene Daten nur dann an externe Stellen weiter, wenn dies im Rahmen
                einer Vertragserf&uuml;llung erforderlich ist, wenn wir gesetzlich hierzu verpflichtet sind (z.&nbsp;B.
                Weitergabe von Daten an Steuerbeh&ouml;rden), wenn wir ein berechtigtes Interesse nach Art. 6 Abs. 1
                lit. f DSGVO an der Weitergabe haben oder wenn eine sonstige Rechtsgrundlage die Datenweitergabe
                erlaubt. Beim Einsatz von Auftragsverarbeitern geben wir personenbezogene Daten unserer Kunden nur auf
                Grundlage eines g&uuml;ltigen Vertrags &uuml;ber Auftragsverarbeitung weiter. Im Falle einer gemeinsamen
                Verarbeitung wird ein Vertrag &uuml;ber gemeinsame Verarbeitung geschlossen.</p>
            <h3>Widerruf Ihrer Einwilligung zur Datenverarbeitung</h3>
            <p>Viele Datenverarbeitungsvorg&auml;nge sind nur mit Ihrer ausdr&uuml;cklichen Einwilligung m&ouml;glich.
                Sie k&ouml;nnen eine bereits erteilte Einwilligung jederzeit widerrufen. Die Rechtm&auml;&szlig;igkeit
                der bis zum Widerruf erfolgten Datenverarbeitung bleibt vom Widerruf unber&uuml;hrt.</p>
            <h3>Widerspruchsrecht gegen die Datenerhebung in besonderen F&auml;llen sowie gegen Direktwerbung (Art. 21
                DSGVO)</h3>
            <p>WENN DIE DATENVERARBEITUNG AUF GRUNDLAGE VON ART. 6 ABS. 1 LIT. E ODER F DSGVO ERFOLGT, HABEN SIE
                JEDERZEIT DAS RECHT, AUS GR&Uuml;NDEN, DIE SICH AUS IHRER BESONDEREN SITUATION ERGEBEN, GEGEN DIE
                VERARBEITUNG IHRER PERSONENBEZOGENEN DATEN WIDERSPRUCH EINZULEGEN; DIES GILT AUCH F&Uuml;R EIN AUF DIESE
                BESTIMMUNGEN GEST&Uuml;TZTES PROFILING. DIE JEWEILIGE RECHTSGRUNDLAGE, AUF DENEN EINE VERARBEITUNG
                BERUHT, ENTNEHMEN SIE DIESER DATENSCHUTZERKL&Auml;RUNG. WENN SIE WIDERSPRUCH EINLEGEN, WERDEN WIR IHRE
                BETROFFENEN PERSONENBEZOGENEN DATEN NICHT MEHR VERARBEITEN, ES SEI DENN, WIR K&Ouml;NNEN ZWINGENDE
                SCHUTZW&Uuml;RDIGE GR&Uuml;NDE F&Uuml;R DIE VERARBEITUNG NACHWEISEN, DIE IHRE INTERESSEN, RECHTE UND
                FREIHEITEN &Uuml;BERWIEGEN ODER DIE VERARBEITUNG DIENT DER GELTENDMACHUNG, AUS&Uuml;BUNG ODER
                VERTEIDIGUNG VON RECHTSANSPR&Uuml;CHEN (WIDERSPRUCH NACH ART. 21 ABS. 1 DSGVO).</p>
            <p>WERDEN IHRE PERSONENBEZOGENEN DATEN VERARBEITET, UM DIREKTWERBUNG ZU BETREIBEN, SO HABEN SIE DAS RECHT,
                JEDERZEIT WIDERSPRUCH GEGEN DIE VERARBEITUNG SIE BETREFFENDER PERSONENBEZOGENER DATEN ZUM ZWECKE
                DERARTIGER WERBUNG EINZULEGEN; DIES GILT AUCH F&Uuml;R DAS PROFILING, SOWEIT ES MIT SOLCHER
                DIREKTWERBUNG IN VERBINDUNG STEHT. WENN SIE WIDERSPRECHEN, WERDEN IHRE PERSONENBEZOGENEN DATEN
                ANSCHLIESSEND NICHT MEHR ZUM ZWECKE DER DIREKTWERBUNG VERWENDET (WIDERSPRUCH NACH ART. 21 ABS. 2 DSGVO).
            </p>
            <h3>Beschwerde&shy;recht bei der zust&auml;ndigen Aufsichts&shy;beh&ouml;rde</h3>
            <p>Im Falle von Verst&ouml;&szlig;en gegen die DSGVO steht den Betroffenen ein Beschwerderecht bei einer
                Aufsichtsbeh&ouml;rde, insbesondere in dem Mitgliedstaat ihres gew&ouml;hnlichen Aufenthalts, ihres
                Arbeitsplatzes oder des Orts des mutma&szlig;lichen Versto&szlig;es zu. Das Beschwerderecht besteht
                unbeschadet anderweitiger verwaltungsrechtlicher oder gerichtlicher Rechtsbehelfe.</p>
            <h3>Recht auf Daten&shy;&uuml;bertrag&shy;barkeit</h3>
            <p>Sie haben das Recht, Daten, die wir auf Grundlage Ihrer Einwilligung oder in Erf&uuml;llung eines
                Vertrags automatisiert verarbeiten, an sich oder an einen Dritten in einem g&auml;ngigen,
                maschinenlesbaren Format aush&auml;ndigen zu lassen. Sofern Sie die direkte &Uuml;bertragung der Daten
                an einen anderen Verantwortlichen verlangen, erfolgt dies nur, soweit es technisch machbar ist.</p>
            <h3>Auskunft, Berichtigung und L&ouml;schung</h3>
            <p>Sie haben im Rahmen der geltenden gesetzlichen Bestimmungen jederzeit das Recht auf unentgeltliche
                Auskunft &uuml;ber Ihre gespeicherten personenbezogenen Daten, deren Herkunft und Empf&auml;nger und den
                Zweck der Datenverarbeitung und ggf. ein Recht auf Berichtigung oder L&ouml;schung dieser Daten. Hierzu
                sowie zu weiteren Fragen zum Thema personenbezogene Daten k&ouml;nnen Sie sich jederzeit an uns wenden.
            </p>
            <h3>Recht auf Einschr&auml;nkung der Verarbeitung</h3>
            <p>Sie haben das Recht, die Einschr&auml;nkung der Verarbeitung Ihrer personenbezogenen Daten zu verlangen.
                Hierzu k&ouml;nnen Sie sich jederzeit an uns wenden. Das Recht auf Einschr&auml;nkung der Verarbeitung
                besteht in folgenden F&auml;llen:</p>
            <ul>
                <li>Wenn Sie die Richtigkeit Ihrer bei uns gespeicherten personenbezogenen Daten bestreiten,
                    ben&ouml;tigen wir in der Regel Zeit, um dies zu &uuml;berpr&uuml;fen. F&uuml;r die Dauer der
                    Pr&uuml;fung haben Sie das Recht, die Einschr&auml;nkung der Verarbeitung Ihrer personenbezogenen
                    Daten zu verlangen.</li>
                <li>Wenn die Verarbeitung Ihrer personenbezogenen Daten unrechtm&auml;&szlig;ig geschah/geschieht,
                    k&ouml;nnen Sie statt der L&ouml;schung die Einschr&auml;nkung der Datenverarbeitung verlangen.</li>
                <li>Wenn wir Ihre personenbezogenen Daten nicht mehr ben&ouml;tigen, Sie sie jedoch zur Aus&uuml;bung,
                    Verteidigung oder Geltendmachung von Rechtsanspr&uuml;chen ben&ouml;tigen, haben Sie das Recht,
                    statt der L&ouml;schung die Einschr&auml;nkung der Verarbeitung Ihrer personenbezogenen Daten zu
                    verlangen.</li>
                <li>Wenn Sie einen Widerspruch nach Art. 21 Abs. 1 DSGVO eingelegt haben, muss eine Abw&auml;gung
                    zwischen Ihren und unseren Interessen vorgenommen werden. Solange noch nicht feststeht, wessen
                    Interessen &uuml;berwiegen, haben Sie das Recht, die Einschr&auml;nkung der Verarbeitung Ihrer
                    personenbezogenen Daten zu verlangen.</li>
            </ul>
            <p>Wenn Sie die Verarbeitung Ihrer personenbezogenen Daten eingeschr&auml;nkt haben, d&uuml;rfen diese Daten
                &ndash; von ihrer Speicherung abgesehen &ndash; nur mit Ihrer Einwilligung oder zur Geltendmachung,
                Aus&uuml;bung oder Verteidigung von Rechtsanspr&uuml;chen oder zum Schutz der Rechte einer anderen
                nat&uuml;rlichen oder juristischen Person oder aus Gr&uuml;nden eines wichtigen &ouml;ffentlichen
                Interesses der Europ&auml;ischen Union oder eines Mitgliedstaats verarbeitet werden.</p>
            <p>Quelle: <a href="https://www.e-recht24.de">https://www.e-recht24.de</a></p>
        </div>
        </div>
    `;
}

function renderSideNavHTML() {
    docID('sideNav').innerHTML = /*HTML*/`<div class="sideNav-logo">
    <img src="assets/img/Capa 1.svg" alt="">
</div>
<a href="summary.html"><div class="sideNav-links">
    <div class="sideNav-summary" id="summary-link">
        <img src="assets/img/Vector.svg" alt="">
        <span class="sideNav-text">Summary</span>
    </div></a>
    <a href="add_tasks.html"><div class="sideNav-summary" id="add-task-link">
        <img src="assets/img/edit_square.svg" alt="">
        <span class="sideNav-text">Add Task</span>
    </div></a>
    <a href="board.html"><div class="sideNav-summary" id="board-link">
        <img src="assets/img/vec.svg" alt="">
        <span class="sideNav-text">Board</span>
    </div></a>
     <a href="contacts.html"><div class="sideNav-summary" id="">
        <img src="assets/img/perm_contact_calendar.svg" alt="">
        <span class="sideNav-text">Contacts</span>
    </div></a>
</div>
<div class="sideNav-policy-content">
    <span onclick="sideNavPolicy()" class="sideNav-policy">Privacy Policy</span>
    <span onclick="sideNavNotice()" class="sideNav-notice">Legal notice</span>
</div>`;
}

>>>>>>> dc18408128d6dc6bd4e6fb7e07677a7da75ecc71
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


<<<<<<< HEAD
/*addTask*/
=======
function renderHeaderNav() {
    let finishFirstletter = getFirstLetter(localStorageName);
    renderHeader(finishFirstletter);
    renderNav();
    renderSideNavHTML();
}

function setItemLocalStorage(key, data) {
    localStorage.setItem(key, JSON.stringify(data));
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

/*-------------addTask-------------*/
>>>>>>> dc18408128d6dc6bd4e6fb7e07677a7da75ecc71



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
<<<<<<< HEAD
    let dropDown = document.getElementById('dropDown');
=======
    let dropDownList = document.getElementById('dropDownList');
    dropDownList.innerHTML = "";
>>>>>>> dc18408128d6dc6bd4e6fb7e07677a7da75ecc71
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
<<<<<<< HEAD
=======
    let dropDown = document.getElementById('dropDown');

>>>>>>> dc18408128d6dc6bd4e6fb7e07677a7da75ecc71
    /* enfernt d-none von Listencontainer*/
    /* passt Bildpfad an (Pfeil hoch anstelle von runter)*/
    /* passt Text in inputfeld zu suchfeld an*/
}

<<<<<<< HEAD
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
=======


>>>>>>> dc18408128d6dc6bd4e6fb7e07677a7da75ecc71
