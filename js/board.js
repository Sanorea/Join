let arrTasks = [];

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


async function updateHTML() {
    await getTaskData();
    let test = await getTaskData();
/*     console.log(test); */
    let boardCategories = ['toDo', 'inProgress', 'awaitFeedback', 'done'];

    for (let i = 0; i < boardCategories.length; i++) {
        let category = boardCategories[i];
        let elements = arrTasks.filter(t => t['boardCategory'] == category);

        if (elements.length > 0) {
            docID(category).innerHTML = '';
        } else {
            docID(category).innerHTML = '<span class="empty-task-text">No Task in ...</span>';
        }

        for (let index = 0; index < elements.length; index++) {
            const element = elements[index];
            let taskCategoryResult = taskCategory(element);
            let subTaskResult = subtaskList(element);
            let prioResult = findoutPrio(element);
            let ContactsArrayResult = ContactsArray(element);
            docID(category).innerHTML += renderCardHTML(element, subTaskResult, prioResult, taskCategoryResult, ContactsArrayResult);
        }
    }
}

function deleteCard(element) {
   console.log(arrTasks);
}

function taskCategory(element) {
    let category = element['taskCategory']
    let categoryVal = "";

    switch (category) {
        case 'User Story':
            categoryVal = `<div class="headline-card">User Story</div>`;
            break;
        case 'Technical Task':
            categoryVal = `<div class="headline-card-Technical">Technical Task</div>`;
            break;

        default:
            categoryVal = `<div>Not Found</div>`;
            break;
    }
    return categoryVal;
}

function findoutPrio(element) {
/*     console.log(element); */
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
            prioVal = `<div>Not Found</div>`;
            break;
    }
    return prioVal;
}

function ContactsArray(element) {
    let elementContact = "";
    let contact = element['acronymsAssignedTo'];
    if (!element['acronymsAssignedTo'] || !Array.isArray(element['acronymsAssignedTo'])) {
        elementContact = `<div>not contact</div>`;
    } else
        for (let i = 0; i < contact.length; i++) {
            let user = contact[i];
            elementContact += `<div class="user-content">${user}</div>`;
        }
    return elementContact;
}

function subtaskList(element) {
    let stylee = document.querySelectorAll('.card-subtask');
    if (!element['subtasks'] || !Array.isArray(element['subtasks'])) {
        stylee.forEach(function (el) {
        });
        return ``;
    } else {
        let list = element['subtasks'].length
        return ` <div class="bar">
                <div class="w3-light-grey">
                    <div class="w3-container w3-green w3-center" style="width:50%"></div>
                </div><br>
            </div>
            <div id='subtask-counter' class="subtask-content">
                <div><span>0/${list}</span></div>
            </div>`;
    }
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
        "taskCategory":  arrTasks[index]['taskCategory'],
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

    // console.log(arrTasks);
    // console.log(arrTasks[0]['boardCategory']);
}


function renderCardHTML(element, subTaskResult, prioResult, taskCategory, ContactsArrayResult) {
console.log(element);
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

function renderPopupCardHTML(element, key) {
    return /*HTML*/ `
      <div class="card-popUp">
            <div class="card-popUp-top">
                <div class="categorie">${element['title']}</div>
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
                <div class="assignet-list"></div>
            </div>
            <div class="card-popUp-subtask">
                <div class="title">Subtask</div>
                <div class="subtask-list"></div>
            </div>
            <div class="edit-and-delete">
                <div onclick="deleteCard(${element['unique-key']})" class="delete cursor"><img src="assets/img/delete.svg" alt=""><span>Delete</span></div>
                <div class="line"></div>
                <div onclick="editCard(${element['unique-key']})" class="edit cursor"><img src="assets/img/edit.svg" alt=""><span>Edit</span></div>
            </div>
        </div>    
    `;
}

function openCard(element, key) {
   let container = docID('card-popUp-background');
    docID('card-popUp-background').hidden = false;
    let keyToObject = arrTasks.find((y) => y = element);
    container.innerHTML = renderPopupCardHTML(keyToObject, key);
}

function closeCardPopUp() {
    docID('card-popUp-background').hidden = true;
}

function renderInToDo() {
    let body = document.getElementById('todo-body-card');
    body.innerHTML = renderCardHTML();
}
