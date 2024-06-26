let arrTasks = [];

let currentDraggedElement;

async function initBoard(id, renderClass) {
    // document.getElementById('body-board').innerHTML = renderBoardHTML();
    // renderSideNavHTML(id, renderClass);
    renderHeaderNav(id, renderClass);
    updateHTML();
}

async function getTaskData() {
    let taskData = await loadData('/tasks');
    saveTaskDataInArray(taskData);
    return taskData;
}


async function updateHTML() {
    await getTaskData();
    let boardCategories = ['toDo', 'inProgress', 'awaitFeedback', 'done'];

    for (let i = 0; i < boardCategories.length; i++) {
        let category = boardCategories[i];
        let elements = arrTasks.filter(t => t['boardCategory'] == category);

        if (elements.length > 0) {
            docID(category).innerHTML ='';
        }

        for (let index = 0; index < elements.length; index++) {
            const element = elements[index];
            docID(category).innerHTML += renderCardHTML(element);
        }
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
        "assignetTo": arrTasks[index]['assignedTo'],
        "boardCategory": arrTasks[index]['boardCategory'],
        "date": arrTasks[index]['date'],
        "description": arrTasks[index]['description'],
        "id": arrTasks[index]['id'],
        "prio": arrTasks[index]['prio'],
        "subtasks": arrTasks[index]['subtasks'],
        "title": arrTasks[index]['title']
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

    console.log(arrTasks);
    console.log(arrTasks[0]['boardCategory']);
}


function renderCardHTML(element) {
    return /*HTML*/ `
    <div draggable="true" ondragstart="startDragging(${element['id']})" class="card-content">
        <div class="headline-card">User Story</div>
        <div class="card-title">${element['title']}</div>
        <div class="card-subtitle">${element['description']}</div>
        <div class="card-subtask">
            <div class="bar">
                <div class="w3-light-grey">
                    <div class="w3-container w3-green w3-center" style="width:50%"></div>
                </div><br>
            </div>
            <div class="subtask-content">
                <div class="counter">1/2</div>
                <div class="subtask">Subtask</div>
            </div>
        </div>
        <div class="card-info">
            <div class="card-prfile"></div>
            <div class="card-difficulty"></div>
        </div>
    </div>
    `;
}

function renderInToDo(){
    let body = document.getElementById('todo-body-card');
    body.innerHTML = renderCardHTML();
}

// function sideNavPolicy() {
//     let body = docID('body-summary-content');
//     body.classList.remove('body-summary');
//     body.innerHTML = renderLegalNotice();
// }

// function sideNavNotice() {
//     let body = docID('body-summary-content');
//     body.classList.remove('body-summary');
//     body.innerHTML = renderPrivacyPolice();
// }

// function backToSite() {
//     let body = docID('body-summary-content');
//     let greetBody = docID('greet-body');
//     body.innerHTML = renderSummaryHTML();
//     greetBody = loadTheWelcomeSreen();
//     body.classList.add('body-summary');
// }