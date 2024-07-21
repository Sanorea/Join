let arrTasks = [];
let checkboxSubtask = [];
let checkedSubtasks = [];

let currentDraggedElement;

async function initBoard(id, renderClass) {
    // document.getElementById('body-board').innerHTML = renderBoardHTML();
    // renderSideNavHTML(id, renderClass);
    await includeHTML();
    renderHeaderNav(id, renderClass);
    updateHTML();
    renderContactListaddTasks();
}

async function getTaskData() {
    let taskData = await loadData('/tasks');
    saveTaskDataInArray(taskData);
    return taskData;
}

function ContactsArray(element) {
    let elementContact = "";
    let contact = element['acronymsAssignedTo'];
    if (!element['acronymsAssignedTo'] || !Array.isArray(element['acronymsAssignedTo'])) {
        elementContact = `<div></div>`;
    } else
        for (let i = 0; i < contact.length; i++) {
            let user = contact[i];
            elementContact += `<div class="user-content">${user}</div>`;
        }
    return elementContact;
}

function subtaskList(element, index) {
    let stylee = document.querySelectorAll('.card-subtask');
    if (!element['subtasks'] || !Array.isArray(element['subtasks'])) {
        stylee.forEach(function (el) {
        });
        return ``;
    } else {
        let list = element['subtasks'].length
        let finishedTasks = checkFinishedTasks(element, list);
        let percent = subtaskBar(finishedTasks, list);
        return ` <div class="bar">
                <div class="w3-light-grey">
                    <div id="editBar_${index}"  class="w3-container w3-green w3-center" style="width:${percent}%"></div>
                </div><br>
            </div>
            <div id='subtask-counter' class="subtask-content">
                <div><span>${finishedTasks}/${list}</span></div>
            </div>`;
    }
}

function contactCardArray(keyToObject) {
    let list = keyToObject['acronymsAssignedTo'];
    let nameArray = keyToObject['namesAssignedTo']
    let array = "";
    for (let i = 0; i < list.length; i++) {
        const element = list[i];
        let name = nameArray[i];
        array += ` 
        <div class="reder-card">
          <div class="user-content-array">${element}</div>
          <div> ${name}</div>
        </div>
        `;
    }
    return array;
}

function taskArray(keyToObject) {
    let content = "";
    let list = keyToObject['subtasks'];
    for (let i = 0; i < list.length; i++) {
        const element = list[i];
        content += `
        <div class="list-card-subtaskarray">
            <input onclick="subtaskCardCheckbox('${keyToObject['unique-key']}')" id="contactCardId${i}" type="checkbox"  value="${element}">
            <div>
                <div>${element}</div>
            </div>    
         </div>       
            `;
    }
    return content;
}

function renderPopupCardHTML(element, taskCategoryResult, contactCardArrayResult, subtaskListArray) {
    return /*HTML*/ `
      <div class="card-popUp">
            <div class="card-popUp-top">
                <div class="categorie">${taskCategoryResult}</div>
                <div class="back-arrow"><img class="cursor" onclick="closeCardPopUp()" src="assets/img/close.svg" alt=""></div>
            </div>
            <div class="card-popUp-headline">${element['title']}</div>
            <div class="card-popUp-subline">${element['description']}</div>
            <div class="card-popUp-DueDate">
                <div class="title">Due date:</div>
                <div class="date">${element['date']}</div>
            </div>
            <div class="card-popUp-priority">
                <div class="title">Priority</div>
                <div class="difficulty">${element['prio']}</div>
            </div>
            <div class="card-popUp-assignet">
                <div class="title">Assignet to:</div>
                <div class="assignet-list">${contactCardArrayResult}</div>
            </div>
            <div class="card-popUp-subtask">
                <div class="title">Subtask</div>
                <div class="subtask-list">${subtaskListArray}</div>
            </div>
            <div class="edit-and-delete">
                <div onclick="deleteCard('${element['unique-key']}')" class="delete cursor"><img src="assets/img/delete.svg" alt=""><span>Delete</span></div>
                <div class="line"></div>
                <div onclick="editCard('${element['unique-key']}')" class="edit cursor"><img src="assets/img/edit.svg" alt=""><span>Edit</span></div>
            </div>
        </div>    
    `;
}

function renderCardHTML(element, subTaskResult, prioResult, taskCategory, ContactsArrayResult) {
    let uniqueKey = element['unique-key'];
    return /*HTML*/ `
    <div onclick="openCard('${uniqueKey}')" draggable="true" ondragstart="startDragging(${element['id']})" class="card-content cursor">
        <div>${taskCategory}</div>
        <div class="card-title">${element['title']}</div>
        <div class="card-subtitle">${element['description']}</div>
        <div class="card-subtask">
          <div id='subtask-counter'>${subTaskResult}</div>
        </div>
        <div class="card-info">
            <div class="card-profil">${ContactsArrayResult}</div>
            <div class="card-difficulty">${prioResult}</div>
        </div>
    </div>
    `;
}

async function updateHTML() {
    await getTaskData();
    let test = await getTaskData();
    let boardCategories = ['toDo', 'inProgress', 'awaitFeedback', 'done'];
    let boardCategorieNames = ['To-do', 'In progress', 'Await feedback', 'Done'];

    for (let i = 0; i < boardCategories.length; i++) {
        let category = boardCategories[i];
        let elements = arrTasks.filter(t => t['boardCategory'] == category);

        if (elements.length > 0) {
            docID(category).innerHTML = '';
        } else {
            docID(category).innerHTML = `<span class="empty-task-text">No Task in ${boardCategorieNames[i]}</span>`;
        }

        for (let index = 0; index < elements.length; index++) {
            const element = elements[index];
            let taskCategoryResult = taskCategory(element);
            let subTaskResult = subtaskList(element, index);
            let prioResult = findoutPrio(element);
            let ContactsArrayResult = ContactsArray(element);
            docID(category).innerHTML += renderCardHTML(element, subTaskResult, prioResult, taskCategoryResult, ContactsArrayResult);
        }
    }
}

function taskCategory(element) {
    let category = element['taskCategory'];
    let categoryVal = "";

    switch (category) {
        case 'User Story':
            categoryVal = `<div class="headline-card">User Story</div>`;
            break;
        case 'Technical Task':
            categoryVal = `<div class="headline-card-Technical">Technical Task</div>`;
            break;

        default:
            categoryVal = `<div></div>`;
            break;
    }
    return categoryVal;
}

function findoutPrio(element) {
    let prio = element['prio'];
    let prioVal = "";

    switch (prio) {
        case 'urgent':
            prioVal = `<div><img src="assets/img/prio high.svg" alt=""></div>`;
            break;
        case 'medium':
            prioVal = `<div><img src="assets/img/Capa 2.svg" alt=""></div>`;
            break;
        case 'low':
            prioVal = `<div><img src="assets/img/Prio low.svg" alt=""></img></div>`;
            break;

        default:
            prioVal = `<div></div>`;
            break;
    }
    return prioVal;
}

function checkFinishedTasks(element, length) {
    checkedSubtasks = [];
    let list = element['subtasks'];
    for (let i = 0; i < list.length; i++) {
        const subtask = list[i];
        let check = checkboxSubtask.find((y) => y == subtask);
        if (check) {
            checkedSubtasks.push(check);
        }
    }
    subtaskBar(checkedSubtasks.length, length);
    return checkedSubtasks.length;
}

function startDragging(id) {
    currentDraggedElement = id;
}

function allowDrop(event) {
    event.preventDefault();
}

async function moveTo(category) {
    let index = arrTasks.findIndex(obj => obj.id == currentDraggedElement);
    let key = arrTasks[index]['unique-key'];
    arrTasks[index]['boardCategory'] = category;

    await updateData("/tasks/" + key, {
        "taskCategory": arrTasks[index]['taskCategory'],
        "boardCategory": arrTasks[index]['boardCategory'],
        "date": arrTasks[index]['date'],
        "description": arrTasks[index]['description'],
        "id": arrTasks[index]['id'],
        "prio": arrTasks[index]['prio'],
        "subtasks": arrTasks[index]['subtasks'],
        "title": arrTasks[index]['title'],
        "namesAssignedTo": arrTasks[index]['namesAssignedTo'],
        "acronymsAssignedTo": arrTasks[index]['acronymsAssignedTo']
    })
    updateHTML();
}

function highlight(category1, category2, category3) {
    document.getElementById(category1).classList.add('drag-area-highlight');
    document.getElementById(category2).classList.add('drag-area-highlight');
    document.getElementById(category3).classList.add('drag-area-highlight');
}

function removeHighlight() {
    document.getElementById('toDo').classList.remove('drag-area-highlight');
    document.getElementById('inProgress').classList.remove('drag-area-highlight');
    document.getElementById('awaitFeedback').classList.remove('drag-area-highlight');
    document.getElementById('done').classList.remove('drag-area-highlight');
}

function saveTaskDataInArray(taskData) {
    let tempArrTasks = [];
    arrTasks = [];
    for (let i in taskData) {
        tempArrTasks.push([i, taskData[i]]);
    }
    for (let i in tempArrTasks) {
        arrTasks.push(tempArrTasks[i][1]);
        arrTasks[i]['unique-key'] = tempArrTasks[i][0];
    }
}

function openCard(element) {
    let container = docID('card-popUp-background');
    docID('card-popUp-background').hidden = false;
    let keyToObject = arrTasks.find((y) => y['unique-key'] === element);
    let taskCategoryResult = taskCategory(keyToObject);
    let subtaskListArray = taskArray(keyToObject);
    let contactCardArrayResult = contactCardArray(keyToObject);
    container.innerHTML = renderPopupCardHTML(keyToObject, taskCategoryResult, contactCardArrayResult, subtaskListArray);
    checkboxCheck(element);
}

function deleteCard(key) {
    let keyToObject = arrTasks.find((y) => y['unique-key'] === key);
    arrTasks.splice(keyToObject);
    deleteTaskPostData("/tasks/" + key);
    closeCardPopUp();
    updateHTML();
}

function subtaskBar(length, list) {
    let a = list * 100;
    let y = a / list
    let b = y / list;
    let c = length * b;

    if (length === 0) {
        return 0
    } else {
        return c;
    }
}

function subtaskCardCheckbox(element) {
// let i = 0;
    // checkboxSubtask = []; 
    let object = arrTasks.find((y) => y['unique-key'] === element);
    let list = object['subtasks'];
    for (let i = 0; i < list.length; i++) {
        let id = docID(`contactCardId${i}`);
        let value = id.value;
        let check = checkboxSubtask.find((y) => y === value);
        let index = checkboxSubtask.findIndex((i) => i === value);

        if (id.checked === true && check !== value) {
            checkboxSubtask.push(value);
            checkFinishedTasks(object);
            subtaskBar();
            updateHTML();
        }
        if (id.checked === false && check == value) {
            checkboxSubtask.splice(index, 1);
            checkFinishedTasks(object);
            subtaskBar();
            updateHTML();
        }
    }
}

function checkboxCheck(element) {
    let object = arrTasks.find((y) => y['unique-key'] === element);
    let list = object['subtasks'];
    for (let i = 0; i < list.length; i++) {
        let id = docID(`contactCardId${i}`);
        let value = id.value;
        let check = checkboxSubtask.find((y) => y === value);

        if (check == value && id.checked == false) {
            id.checked = true;
        }
    }
}

async function deleteTaskPostData(path = "") {
    let responseAddTask = await fetch(BASE_URL + path + ".json", {
        method: "DELETE",
    }
    );
    return responseToJson = await responseAddTask.json();
}

function closeCardPopUp() {
    docID('card-popUp-background').hidden = true;
}

function renderInToDo() {
    let body = document.getElementById('todo-body-card');
    body.innerHTML = renderCardHTML();
}
