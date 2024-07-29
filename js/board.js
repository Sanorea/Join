let arrTasks = [];
let searchResults = [];
let boardCategories = ['toDo', 'inProgress', 'awaitFeedback', 'done'];

let currentDraggedElement;

async function initBoard() {
    await includeHTML();
    renderHeaderNav();
    await renderContactListaddTasks();
    updateHTML();
    renderDateInput();
}

/**
 * Fetches task data from the server and saves it.
 * 
 * @async
 * @function
 * @returns {Promise<Object>} The task data from the server.
 * 
 * @example
 * getTaskData().then(taskData => console.log(taskData));
 */

async function getTaskData() {
    let taskData = await loadData('/tasks');
    saveTaskDataInArray(taskData);
    return taskData;
}

/**
 * Switches the category of a task based on the direction provided.
 * 
 * @param {string} id - The ID of the task whose category is to be switched.
 * @param {'up' | 'down'} direction - The direction to switch the category; 'up' or 'down'.
 * 
 * @example
 * switchCategory('task123', 'down'); // Moves the task with ID 'task123' to the next category.
 */

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

/**
 * Generates HTML for displaying a task's category.
 * 
 * @param {Object} element - The task element containing category information.
 * @param {string} element.taskCategory - The category of the task.
 * @returns {string} HTML string representing the task category.
 * 
 * @example
 * const taskElement = { taskCategory: 'User Story' };
 * const html = taskCategory(taskElement);
 * console.log(html); // Outputs: <div class="headline-card">User Story</div>
 */

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

/**
 * Generates HTML for displaying a task's category in a popup.
 * 
 * @param {Object} element - The task element containing category information.
 * @param {string} element.taskCategory - The category of the task.
 * @returns {string} HTML string representing the task category for the popup.
 * 
 * @example
 * const taskElement = { taskCategory: 'Technical Task' };
 * const html = taskCategoryPopup(taskElement);
 * console.log(html); // Outputs: <div class="headline-card-Technical-popup">Technical Task</div>
 */

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

/**
 * Generates HTML to display the priority level of a task.
 * 
 * @param {Object} element - The task element containing priority information.
 * @param {string} element.prio - The priority level of the task.
 * @returns {string} HTML string representing the task's priority.
 * 
 * @example
 * const taskElement = { prio: 'medium' };
 * const html = findoutPrio(taskElement);
 * console.log(html); // Outputs: <div><img src="assets/img/Capa 2.svg" alt=""></div>
 */

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

/**
 * Counts and processes the number of completed subtasks for a given task.
 * 
 * @param {Object} element - The task element containing subtask information.
 * @param {Array<string>} element.subtasks - The list of subtasks.
 * @param {Array<string>} [element.subtasksChecked] - The list of checked subtasks, where each entry is either 'true' or 'false'.
 * @returns {number} The number of completed subtasks.
 * 
 * @example
 * const taskElement = {
 *   subtasks: ['Task 1', 'Task 2', 'Task 3'],
 *   subtasksChecked: ['true', 'false', 'true']
 * };*/

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

/**
 * @param {string} id - The ID of the element being dragged.
 * */
function startDragging(id) {
    currentDraggedElement = id;
}
/**
 * Prevents the default behavior of the drag-and-drop event to allow dropping.
 * 
 * @param {DragEvent} event - The drag event.

**/
function allowDrop(event) {
    event.preventDefault();
}

/**
 * Moves the currently dragged task to a new category and updates the task data in the backend.
 * 
 * @param {string} category - The new category to move the task to.
 * 
 * @returns {Promise<void>} - A promise that resolves when the task data is updated and the HTML is refreshed.
 **/

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



/**
 * Saves task data into a global array `arrTasks`.
 * 
 * This function processes the `taskData` object to populate the global `arrTasks` array.
 * It extracts task objects from the `taskData`, assigns each a unique key, and updates the `arrTasks` array
 * with these tasks.
 * 
 * @param {Object} taskData - An object containing task data, where each key-value pair represents a task.
 * 
 * @returns {void} - This function does not return a value.
*/

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

/**
 * Opens a card popup with detailed information about a specific task.
 * 
 * This function displays a popup card containing details of a task specified by the given `element` ID.
 * It updates the popup with information such as task category, subtasks, contacts, and priority.
 * Additionally, it applies necessary styling and checks checkboxes based on the task's data.
 * 
 * @param {string} element - The unique key of the task to be displayed in the popup.
 * 
 * @returns {void} - This function does not return a value.
 */

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

/**
 * Deletes a task by its unique key and updates the UI.
 * @param {string} key - The unique key of the task to delete.
 * @returns {Promise<void>} - Resolves when the task is deleted and UI is updated.
 * @async
 */

async function deleteCard(key) {
    let keyToObject = arrTasks.find((y) => y['unique-key'] === key);
    arrTasks.splice(keyToObject);
    await deleteTaskPostData("/tasks/" + key);
    closeCardPopUp();
    updateHTML();
}

/**
 * Calculates the percentage of completed subtasks as a bar value.
 * 
 * @param {number} length - The number of completed subtasks.
 * @param {number} list - The total number of subtasks.
 * @returns {number} - The calculated percentage value for the subtask bar.
 */

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

/**
 * Updates the subtask completion status based on checkbox inputs.
 * @async
 * @param {string} element - The unique key of the task.
 * @returns {Promise<void>} - Resolves when the subtask completion status is updated.
 */

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

/**
 * Updates the checked status of a subtask in the database. 
 * @async
 * @param {string} uniqueKey - The unique key of the task.
 * @param {number} index - The index of the subtask in the list.
 * @param {string} boolean - The new checked status ('true' or 'false').
 * @returns {Promise<void>} - Resolves when the update operation is complete.
 */

async function updateCheckedBoolean(uniqueKey, index, boolean) {
    await updateData("/tasks/" + uniqueKey + "/subtasksChecked/" + index, boolean);
}

/**
 * Updates the checkbox states based on the subtask completion status.
 * 
 * @param {string} element - The unique key of the task.
 * @returns {string} - Returns 'zero' if there are no subtasks, otherwise updates checkboxes.
 */

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

/**
 * Sends a DELETE request to remove a task from the database.
 * 
 * @param {string} path - The endpoint path for the task to be deleted.
 * @returns {Promise<Object>} - The response JSON from the DELETE request.
 */

async function deleteTaskPostData(path = "") {
    let responseAddTask = await fetch(BASE_URL + path + ".json", {
        method: "DELETE",
    }
    );
    return responseToJson = await responseAddTask.json();
}

/**
 * Closes the card popup by hiding the popup background and removing the fixed positioning from the body.
 */

function closeCardPopUp() {
    docID('card-popUp-background').hidden = true;
    let body = docID('body-board');
    body.classList.remove('fixed');
}

function renderInToDo() {
    let body = document.getElementById('todo-body-card');
    body.innerHTML = renderCardHTML();
}

/**
 * Renders the HTML content for the "To Do" section by updating the innerHTML of the 'todo-body-card' element.
 */

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

/**
 * Applies a CSS animation to the popup element and then closes the popup after a short delay.
 * 
 * Adds the `card-animation-back` class to the element with the ID `popUp-animation` to trigger the animation.
 * Uses `setTimeout` to call `closeCardPopUp` after a 200ms delay to ensure the animation completes before closing.
**/

function timeOut() {
    docID('popUp-animation').classList.add('card-animation-back');
    setTimeout(closeCardPopUp, 200);
};