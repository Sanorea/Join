let addArrTasks = [];
let uniqueKey = "";


async function editCard(key) {
    uniqueKey=key;
    
    let popUp = docID('cardPopUpBGEdit');
    popUp.classList.remove("d-none-add-task");
    await addTaskContactsToArray();
    let savedTitle = addArrTasks[0][key]['title'];
    let savedDescription = addArrTasks[0][key]['description'];
    let savedDate = addArrTasks[0][key]['date'];

    let title = docID('add-task-input-title');
    let description = docID('add-task-input-description');
    let date = docID('add-task-input-date');
    title.value = savedTitle;
    description.value = savedDescription;
    date.value = savedDate;
    showSavedPrio(key);
    showSavedAssignedTo(key);
    showSubtasks(key);
    docID('categorieCapture').classList.add('d-none-add-task');
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

    await updateData("/tasks/" + uniqueKey, {
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
    updateHTML();
/*     setTimeout(); */
    closeEditCard(); 
}