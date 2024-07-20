let addArrTasks = [];
let uniqueKey = "";
/* let globalBoardCategory = ""; */

async function editCard(key) {
    await showPopUp();
    saveInputs(key);
    showSavedPrio(key);
    showSavedAssignedTo(key);
    showSubtasks(key);
    docID('categorieCapture').classList.add('d-none-add-task');
    scalePopUp();
}

async function showPopUp() {
    let popUp = docID('cardPopUpBGEdit');
    popUp.classList.remove("d-none-add-task");
    let button = docID('buttonPopUpOK');
    button.classList.remove("d-none-add-task");
    closeCardPopUp();
    await addTaskContactsToArray();
}

function saveInputs(key) {
    uniqueKey=key;
    let savedTitle = addArrTasks[0][key]['title'];
    let savedDescription = addArrTasks[0][key]['description'];
    let savedDate = addArrTasks[0][key]['date'];
    let title = docID('add-task-input-title');
    let description = docID('add-task-input-description');
    let date = docID('add-task-input-date');
    title.value = savedTitle;
    description.value = savedDescription;
    date.value = savedDate;
}

function scalePopUp() {
    let templateWrapper = docID('templateWrapper');
    templateWrapper.classList.remove("template-wrapper");
    templateWrapper.classList.add("pop-up-wrapper");
    let separator = docID('separator');
    separator.classList.add('d-none-add-task');
    let leftSide = docID('leftSide');
    leftSide.classList.remove('left-side-desktop');
    leftSide.classList.add('left-side-pop-up');
    let rightSide = docID('rightSide');
    rightSide.classList.remove('right-side-desktop');
    rightSide.classList.add('right-side-pop-up');
}

function showSavedPrio(key) {
    let savedPrio = addArrTasks[0][key]['prio'];
    if (savedPrio==='low') {
        changeColorPrioButton('low');
    } else {
        if (savedPrio==='medium') {
            changeColorPrioButton('medium');
        } else {
            changeColorPrioButton('urgent');
        }
    }
}

function showSavedAssignedTo(key) {
    let savedAssignedTo = addArrTasks[0][key]['namesAssignedTo'];
    for (let i = 0; i < 6; i++) {
        let value = docID(`checkboxes${i}`).value;
        let valueName = value.slice(11);
        if (savedAssignedTo.includes(valueName)) {
            docID(`checkboxes${i}`).checked = true;
        } else {
            docID(`checkboxes${i}`).checked = false;
        }
    }
    readValueAssignedTo();
}

function showSubtasks(key) {
    subtaskArray = addArrTasks[0][key]['subtasks'];
    renderList();
}

function changeColorPrioButton(prio) {
    docID(`prio${prio}`).classList.add(`${prio}-color`);
    docID(`${prio}Img`).innerHTML = `
    <img src="/assets/img/${prio}-white.svg" alt="prio">`;
}

function closeEditCard () {
    let popUp = docID('cardPopUpBGEdit');
    popUp.classList.add("d-none-add-task");
    docID('categorieCapture').classList.remove('d-none-add-task');
    let buttonOK = docID('buttonPopUpOK');
    buttonOK.classList.add("d-none-add-task");
    let buttonAdd = docID('buttonPopUpAdd');
    buttonAdd.classList.add("d-none-add-task")
}

async function addTaskLoadData(path = "") {
    let response = await fetch(BASE_URL + path + ".json");
    let responseToJson = await response.json();
    return responseToJson;
}

async function addTaskContactsToArray() {
    let addTaskResponseToJson = await addTaskLoadData(path = "/tasks");
    addArrTasks.push(addTaskResponseToJson);
}

async function editContact() {
    let title = docID('add-task-input-title');
    let description = docID('add-task-input-description');
    let date = docID('add-task-input-date');
    let savedBoardCategory = addArrTasks[0][uniqueKey]['boardCategory'];
    let savedTaskCategory = addArrTasks[0][uniqueKey]['taskCategory'];
    let savedID = addArrTasks[0][uniqueKey]['id'];
    pushNewDatas(savedBoardCategory, savedTaskCategory, savedID, date, description, title);
    updateHTML();
    closeEditCard(); 
}

function pushNewDatas(savedBoardCategory, savedTaskCategory, savedID, date, description, title) {
    updateData("/tasks/" + uniqueKey, {
        "boardCategory": savedBoardCategory,
        "taskCategory": savedTaskCategory,
        "date": date.value,
        "description": description.value,
        "id": savedID,
        "prio": prios,
        "subtasks": subtaskArray,
        "title": title.value,
        "namesAssignedTo": checkedNames,
        "acronymsAssignedTo": checkedAcronyms,
    })
}

function openNewTaskPopUp(boardCategory) {
    clearFormular();
    let popUp = docID('cardPopUpBGEdit');
    let button = docID('buttonPopUpAdd');
    popUp.classList.remove("d-none-add-task");
    button.classList.remove("d-none-add-task");
    globalBoardCategory = boardCategory;
}

function clearFormular() {
    let title = docID('add-task-input-title');
    let description = docID('add-task-input-description');
    let date = docID('add-task-input-date');
    title.value = "";
    description.value = "";
    date.value = "";
    resettCheckedContacts();
    resettPrioButtons('urgent');
    resettPrioButtons('medium');
    resettPrioButtons('low');
}

function resettCheckedContacts() {
    valueCheckedBoxes = [];
    for (let j = 0; j < names.length; j++) {
        let name = document.getElementById(`checkboxes${j}`);
        if (name.checked = true) {
            name.checked = false
        }
    rendercheckedContacts();
    }
}

