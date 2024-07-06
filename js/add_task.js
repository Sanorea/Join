
let subtaskArray = [];
let arrIds = [];

let windowEvent;



/*addTask*/

let valueCheckedBoxes = [];
let valueCheckedRadios = [];
let counterOfId = 1;
let arrIdTasks = "";



async function addTaskContactsToArray() {
    let addTaskContacts = [];
    let addTaskResponseToJson = await addTaskLoadData(path = "");
    addTaskContacts.push(addTaskResponseToJson);
}

async function addTaskIdsToArray() {
    let addTaskIdsData = await loadData("/tasks");
    console.log('addTaskIdsData :>> ', addTaskIdsData);
    saveAddTaskIdsInArray(addTaskIdsData);
    /*     let addTaskIds = [];
        let addTaskResponseToJson = await addTaskLoadData(path = "");
        addTaskIds.push(addTaskResponseToJson); */
}

function saveAddTaskIdsInArray(addTaskIdsData) {
    let tempArrIds = [];
    arrIds = [];
    for (let i in addTaskIdsData) {
        tempArrIds.push([i, addTaskIdsData[i]]);
    }
    for (let i in tempArrIds) {
        arrIds.push(tempArrIds[i][1]);
        arrIds[i]['unique-key'] = tempArrIds[i][0];
    }
}


/* const BASE_URL_Isa = "https://join-50399-default-rtdb.europe-west1.firebasedatabase.app/"; */

async function addTaskInit() {
    await addTaskLoadData("/contacts/contact-name");
    await addTaskLoadData("/tasks");
    setId();
    renderContactListaddTasks();
    renderDropdownCategorieAddTasks();
    addTaskContactsToArray();
    addTaskIdsToArray();
    rendercheckedContacts();
    /*     console.log('addTaskIds :>> ', addTaskIds); */
}

async function addTaskPostData(path = "", data = {}) {
    let responseAddTask = await fetch(BASE_URL + path + ".json", {
        method: "POST",
        header: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify(data)
    }
    );
    return responseToJson = await responseAddTask.json();
}

async function submitTask() {
    let title = docID('add-task-input-title');
    let description = docID('add-task-input-description');
    let assignedTo = docID('dropDownList');
    let date = docID('add-task-input-date');
    let categorie = docID('categories');
    readValueAssignedTo();
    await addTaskIdsToArray();
    let newId = setId();
    addTaskPostData("/tasks", {
        "boardCategory": categorie.value,
        "date": date.value,
        "description": description.value,
        "id": newId,
        "prio": prios,
        "subtasks": subtaskArray,
        "title": title.value,
        "assignedTo": valueCheckedBoxes,
    });
    title.value = "";
    description.value = "";
    assignedTo.value = "";
    date.value = "";
    categorie.value = "";
    subtasks = "";



}

function setId() {
    let id = 0;
    if (arrIds.length == 0) {
        id = 1;
    } else {
        let lastUsedId = arrIds[arrIds.length - 1]['id'];
        id = lastUsedId + 1;
    }

    return id;
}

async function addTaskLoadData(path = "") {
    let response = await fetch(BASE_URL + path + ".json");
    let responseToJson = await response.json();
    return responseToJson;
}

let names = [];
let acronyms = [];
let prios = "";

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
    let dropDown = document.getElementById('dropDownList');
    for (let i = 0; i < names.length; i++) {
        const name = names[i];
        const acronym = acronyms[i];
        dropDown.innerHTML += `   
        <table>
            <tr>
                <td>
                    <div>${acronym}</div>
                </td>
                <td>
                <div>${name}</div>
            </td>
                <td>                
                    <input onclick = "readValueAssignedTo()" id="checkboxes${i}" type="checkbox" value="${acronym}">
                </td>
            </tr>
        </table>`;
    }
    readValueAssignedTo();
}

async function rendercheckedContacts() {
    let checkedContacts = document.getElementById('checkedContacts');
    checkedContacts.innerHTML = "";
    checkedContacts.innerHTML += `
    <div>${valueCheckedBoxes}`;
}

function readValueAssignedTo() {
    valueCheckedBoxes = [];
    for (let j = 0; j < names.length; j++) {
        let name = document.getElementById(`checkboxes${j}`);
        let value = name.value;
        if (name.checked === true) {
            valueCheckedBoxes.push(value);
        }
    }
    rendercheckedContacts();
}

function setPrio(prio) {
    prios = prio;
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

function toggleVisibility(elementId, show = true, className = "d-none-add-task") {
    const element = document.getElementById(elementId);
    show ? element.classList.remove(className) : element.classList.add(className); //wenn show = true, dann führe aus, ansonsten das andere
}

function openContactListTasks() {
    const selectfieldOpen = document.getElementById("selectfieldOpen");
    selectfieldOpen.classList.add("d-none-add-task");
    const selectfieldClose = document.getElementById("selectfieldClose");
    selectfieldClose.classList.remove("d-none-add-task");
    const contactListTasks = document.getElementById("dropDownList");
    contactListTasks.classList.remove("d-none-add-task")
}


function closeContactListTasks() {
    const selectfieldOpen = document.getElementById("selectfieldOpen");
    selectfieldOpen.classList.remove("d-none-add-task");
    const selectfieldClose = document.getElementById("selectfieldClose");
    selectfieldClose.classList.add("d-none-add-task");
    const contactListTasks = document.getElementById("dropDownList");
    contactListTasks.classList.add("d-none-add-task")

}






/*Subtasks*/


function taskInput() {
    // let windowEvent = docID('add-task-subtasks-inputfield');
    let addImg = docID('switch_img');
    let checkImg = docID('check-visibility');
    // windowEvent.classList.add('eyy');
    addImg.src = "assets/img/close.svg";
    checkImg.classList.remove('d-none');
}

// windowEvent = docID('add-task-subtasks-inputfield');
// function switchEdit() {
//     document.getElementById("add-task-subtasks-inputfield").classList.toggle("eyy")
// }

// window.onclick = function (event) {
//     if (!event.target.matches('add-task-subtasks-inputfield')) {
//         let dropdowns = document.getElementsByClassName("add-task-subtasks-inputfield");
//         let i;
//         for (i = 0; i < dropdowns.length; i++) {
//             var openDropdown = dropdowns[i];
//             if (openDropdown.classList.contains('eyy')) {
//                 openDropdown.classList.remove('eyy');
//             }
//         }
//     }
// }

function addToSubtaskArray() {
    let inputValue = docID('subtasks-input');
    let value = inputValue.value;
    subtaskArray.push(value);
    renderList();
    inputValue.value = '';
}

function renderList() {
    let subtaskList = docID('add-task-subtasks-list');
    subtaskList.innerHTML = '';
    for (let i = 0; i < subtaskArray.length; i++) {
        const element = subtaskArray[i];
        subtaskList.innerHTML += renderSubtaskList(element, i);
    }
}

function renderSubtaskList(element, i) {
    return /*HTML*/`
    <div id="editId_${i}" class="list hover">
       <li>${element}</li>
       <div class="img-content hover">
           <img onclick="editSubtask(${i})" src="/assets/img/edit_icon.svg" alt="Bearbeiten">
           <div class="split"></div>
           <img onclick="deletTask(${i})" src="/assets/img/delete_icon.svg" alt="Löschen">
       </div>
    </div>
    `;
}

function deleteValue() {
    let inputValue = docID('subtasks-input');
    inputValue.value = '';
}

function deletTask(element) {
    subtaskArray.splice(element, 1);
    renderList();
}

function editSubtask(i) {
    // let subtaskList = docID('add-task-subtasks-list');
    let subtask = subtaskArray[i];
    let editTask = docID(`editId_${i}`);
    editTask.innerHTML = renderSwitchToInput(i);
    let edit = docID(`edit_content_${i}`);
    let newIdContent = docID(`newID_${i}`);
    newIdContent.value = subtask;
    edit.classList.add('aktiveInput');
    docID('newInputSwitchImg').innerHTML = `<img onclick="deletTask(${i})" src="/assets/img/delete_icon.svg" alt=""></img>`;
    docID('otherInputSitchImg').innerHTML = `<img onclick="finishEditInput(${i})" src="assets/img/check-task.svg" alt=""></img>`;
}

function renderSwitchToInput(i) {
    return /*HTML*/ `
    <div id="edit_content_${i}" class="list">
        <li><input class="newEditInput" id="newID_${i}" type="text"></li>
        <div class="img-content hover">
        <div id="newInputSwitchImg"><img onclick="editSubtask(${i})" src="/assets/img/edit_icon.svg" alt="Bearbeiten"></div>
           <div class="split"></div>
           <div id="otherInputSitchImg"><img onclick="deletTask(${i})" src="/assets/img/delete_icon.svg" alt="Löschen"></div>
           </div>
    </div>
    `;
}

function finishEditInput(i) {
    let newElement = docID(`newID_${i}`).value;
    let editTask = docID(`editId_${i}`);
    subtaskArray[i] = newElement;
    let edit = subtaskArray[i];
    editTask.innerHTML = renderSubtaskList(edit, i);
}



