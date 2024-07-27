let arrTasks = [];
let searchResults = [];
let boardCategories = ['toDo', 'inProgress', 'awaitFeedback', 'done'];

let currentDraggedElement;

async function initBoard() {
    await includeHTML();
    renderHeaderNav();
    await renderContactListaddTasks();
    updateHTML();
}

async function getTaskData() {
    let taskData = await loadData('/tasks');
    saveTaskDataInArray(taskData);
    return taskData;
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
                    <div id="editBar_${index}"  class="w3-container bar-color w3-center" style="width:${percent}%"></div>
                </div><br>
            </div>
            <div id='subtask-counter' class="subtask-content">
                <div><span>${finishedTasks}/${list}Subtasks</span></div>
            </div>`;
    }
}

function ContactsArray(element) {
        let elementContact = "";
        let contact = element['acronymsAssignedTo'];
        if (!element['acronymsAssignedTo'] || !Array.isArray(element['acronymsAssignedTo'])) {
            elementContact = `<div></div>`;
        } else
            for (let i = 0; i < contact.length; i++) {
                let user = contact[i];
                let findContact = acronyms.findIndex((x) => x == user);
                let color = colors[findContact];
                elementContact += `<div class="user-content" style="background-color: ${color}">${user}</div>`;
            }
        return elementContact;
    }

function contactCardArray(keyToObject) {
    let list = keyToObject['acronymsAssignedTo'];
    let nameArray = keyToObject['namesAssignedTo']
    let array = "";
    if (!list) {
        array = `<div></div>`;
    } else {
        for (let i = 0; i < list.length; i++) {
            const element = list[i];
            let name = nameArray[i];
            let findContact = acronyms.findIndex((x) => x == element);
            let color = colors[findContact];
            array += ` 
        <div class="reder-card">
          <div class="user-content-array" style="background: ${color}">${element}</div>
          <div class="nameClass"> ${name}</div>
        </div>
        `;
        }
    }
    return array;
}

function taskArray(keyToObject) {
    let content = "";
    let list = keyToObject['subtasks'];
    if (!list) {
        content = `<div></div>`;
    } else {
        for (let i = 0; i < list.length; i++) {
            const element = list[i];
            content += `
        <div class="list-card-subtaskarray">
            <input onclick="subtaskCardCheckbox('${keyToObject['unique-key']}')" id="contactCardId${i}" type="checkbox" value="${element}">
            <div>
                <div class="subtasksClass" >${element}</div>
            </div>    
         </div>       
            `;
        }
    }
    return content;
}

function renderPopupCardHTML(element, taskCategoryResult, contactCardArrayResult, subtaskListArray, prioImg) {
    return /*HTML*/ `
      <div id="popUp-animation" class="card-popUp">
            <div class="card-popUp-top">
                <div class="categorie">${taskCategoryResult}</div>
                <div class="back-arrow"><img class="cursor" onclick="timeOut()" src="assets/img/close.svg" alt=""></div>
            </div>
            <div class="card-popUp-headline">${element['title']}</div>
            <div class="card-popUp-subline">${element['description']}</div>
            <div class="card-popUp-DueDate">
                <div class="title">Due date:</div>
                <div class="date">${element['date']}</div>
            </div>
            <div class="card-popUp-priority">
                <div class="title">Priority:</div>
                <div class="difficulty">${element['prio']} ${prioImg}</div>
            </div>
            <div class="card-popUp-assignet">
                <div class="title">Assigned to:</div>
                <div class="assignet-list">${contactCardArrayResult}</div>
            </div>
            <div class="card-popUp-subtask">
                <div class="title">Subtask</div>
                <div class="subtask-list">${subtaskListArray}</div>
            </div>
            <div class="edit-and-delete">
                <div onclick="deleteCard('${element['unique-key']}')" class="delete cursor"><img src="assets/img/delete.svg" alt=""><span>Delete</span></div>
                <div class="line"></div>
                <div onclick="editCard('${element['unique-key']}')" class="edit cursor"><img class="edit" src="assets/img/edit.svg" alt=""><span>Edit</span></div>
            </div>
        </div>    
    `;
}

function renderCardHTML(element, subTaskResult, prioResult, taskCategory, ContactsArrayResult) {
    let uniqueKey = element['unique-key'];
    return /*HTML*/ `
    <div class="card-with-arrows">
        <div onclick="switchCategory('${element['id']}', 'up')" class="move-arrow move-arrow-up">
            <img class="move-menu-icon" src="/assets/img/arrow_drop_down_up.svg" alt="">
        </div>
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
        <div onclick="switchCategory('${element['id']}', 'down')" class="move-arrow move-arrow-down">
            <img class="move-menu-icon" src="/assets/img/arrow_drop_down_down.svg" alt="">
        </div>
    </div>
    `;
}

function switchCategory(id, direction) {
    let currentBoardCategory = '';
    let currentBoardCategoryIndex = 0;

    for (let i = 0; i < arrTasks.length; i++) {
        if (arrTasks[i]['id'] == id) {
            currentBoardCategory = arrTasks[i]['boardCategory'];
            currentBoardCategoryIndex = boardCategories.indexOf(currentBoardCategory);
            currentDraggedElement = id;
        }
    }

    if (direction === 'down') {
        if (currentBoardCategoryIndex === boardCategories.length - 1) {
            moveTo(boardCategories[0]);
        } else {
            moveTo(boardCategories[currentBoardCategoryIndex + 1])
        }
    } else if (direction == 'up') {
        if (currentBoardCategoryIndex === 0) {
            moveTo(boardCategories[boardCategories.length - 1]);
        } else {
            moveTo(boardCategories[currentBoardCategoryIndex - 1])
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

function taskCategoryPopup(element) {
    let category = element['taskCategory'];
    let categoryVal = "";

    switch (category) {
        case 'User Story':
            categoryVal = `<div class="headline-card-popup">User Story</div>`;
            break;
        case 'Technical Task':
            categoryVal = `<div class="headline-card-Technical-popup">Technical Task</div>`;
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

function checkFinishedTasks(element) {
    let trueList = [];
    let list = element['subtasks'];
    let checkedList = element['subtasksChecked'];
    if (!checkedList) {
        return '0'
    } else {
        trueList = checkedList.filter((y) => y == 'true');
    }
    subtaskBar(trueList.length, list.length);
    return trueList.length;
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
        "subtasksChecked": arrTasks[index]['subtasksChecked'],
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
    let body = docID('body-board');
    body.classList.add('fixed');
    docID('card-popUp-background').hidden = false;
    let keyToObject = arrTasks.find((y) => y['unique-key'] === element);
    let taskCategoryResult = taskCategoryPopup(keyToObject);
    let subtaskListArray = taskArray(keyToObject);
    let contactCardArrayResult = contactCardArray(keyToObject);
    let prioImg = findoutPrio(keyToObject);
    container.innerHTML = renderPopupCardHTML(keyToObject, taskCategoryResult, contactCardArrayResult, subtaskListArray, prioImg);
    checkboxCheck(element);
}

async function deleteCard(key) {
    let keyToObject = arrTasks.find((y) => y['unique-key'] === key);
    arrTasks.splice(keyToObject);
    await deleteTaskPostData("/tasks/" + key);
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

async function subtaskCardCheckbox(element) {
    let object = arrTasks.find((y) => y['unique-key'] === element);
    let list = object['subtasks'];
    let booleanArray = object['subtasksChecked'];
    for (let i = 0; i < list.length; i++) {
        let id = docID(`contactCardId${i}`);
        let value = id.value;
        let index = list.findIndex((i) => i === value);
        let boolean = booleanArray[index];

        if (id.checked === true && boolean == 'false') {
            await updateCheckedBoolean(element, index, 'true');
            checkFinishedTasks(object);
            subtaskBar();
            updateHTML();
        }
        if (id.checked === false && boolean == 'true') {
            await updateCheckedBoolean(element, index, 'false');
            checkFinishedTasks(object);
            subtaskBar();
            updateHTML();
        }
    }
}

async function updateCheckedBoolean(uniqueKey, index, boolean) {
    await updateData("/tasks/" + uniqueKey + "/subtasksChecked/" + index, boolean);
}

function checkboxCheck(element) {
        let object = arrTasks.find((y) => y['unique-key'] === element);
        let list = object['subtasks'];
        let checked = object['subtasksChecked']
        if (!list) {
            return `zero`
        } else {
        for (let i = 0; i < list.length; i++) {
            let id = docID(`contactCardId${i}`);
            let value = id.value;
            let checkIndex = list.findIndex((y) => y === value);
            let booleanIndex = checked[checkIndex];

            if (booleanIndex == 'true') {
                id.checked = true;
            }
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
    let body = docID('body-board');
    body.classList.remove('fixed');
}

function renderInToDo() {
    let body = document.getElementById('todo-body-card');
    body.innerHTML = renderCardHTML();
}

function search() {
    let searchValue = document.getElementById('searchbar').value.toLowerCase();
    searchResults = [];

    for (i = 0; i < arrTasks.length; i++) {
        let searchResult = arrTasks[i];
        if (arrTasks[i]['title'].toLowerCase().includes(searchValue) || arrTasks[i]['description'].toLowerCase().includes(searchValue)) {
            searchResults.push(searchResult);
        }
    }

    renderTasksBasedOnSearchInput();
}

async function updateHTML() {
    await getTaskData();
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
            let subTaskResult = subtaskList(element, index)
            let prioResult = findoutPrio(element);
            let prioImg = findoutPrio(elements);
            let ContactsArrayResult = ContactsArray(element);
            docID(category).innerHTML += renderCardHTML(element, subTaskResult, prioResult, taskCategoryResult, ContactsArrayResult, prioImg);
        }
    }
}

function renderTasksBasedOnSearchInput() {
    let boardCategories = ['toDo', 'inProgress', 'awaitFeedback', 'done'];
    let boardCategorieNames = ['To-do', 'In progress', 'Await feedback', 'Done'];

    for (let i = 0; i < boardCategories.length; i++) {
        let category = boardCategories[i];
        let elements = searchResults.filter(t => t['boardCategory'] == category);

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

function timeOut() {
    docID('popUp-animation').classList.add('card-animation-back');
    setTimeout(closeCardPopUp, 200);
};