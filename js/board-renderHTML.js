
/**
 * Generates HTML for displaying the subtask progress bar and counter for a given task element.
 * 
 * This function checks if the `element` has subtasks and calculates the completion percentage based on 
 * the number of finished subtasks. It then returns an HTML string that includes a progress bar and 
 * a counter showing the number of completed versus total subtasks.
 * 
 * @param {Object} element - The task object containing subtasks and their completion status.
 * @param {number} index - The index of the task used for generating a unique ID for the progress bar.
 * @returns {string} The HTML string for the subtask progress bar and counter.
 */

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

/**
 * Generates HTML for displaying assigned contacts based on acronyms in a task element.
 * 
 * This function creates a list of contact elements by matching acronyms assigned to a task with 
 * corresponding colors. It returns an HTML string with a colored background for each contact based 
 * on their acronym.
 * 
 * @param {Object} element - The task object containing an array of acronyms assigned to it.
 * @returns {string} The HTML string for displaying contacts with background colors.
 */

function ContactsArray(element) {
    
    let elementContact = "";
    let contact = element['acronymsAssignedTo'];
    if (!element['acronymsAssignedTo'] || !Array.isArray(element['acronymsAssignedTo'])) {
        elementContact = `<div></div>`;
    } else {
        let len = contact.length > 5 ? 5: contact.length;
        for (let i = 0; i < len; i++) {
            let user = contact[i];
            let findContact = acronyms.findIndex((x) => x == user);
            let color = colors[findContact];
            elementContact += `<div class="user-content" style="background-color: ${color}">${user}</div>`;
        }
        if (contact.length > 5) {
            let user = contact.length - len;
            elementContact += `<div class="user-content" style="background-color: #979797">+${user}</div>`;
        }
    }
    return elementContact;
}


/**
* Generates HTML for displaying contact cards based on acronyms and names assigned to a task.
* 
* This function creates a series of contact cards by matching acronyms and names from the task object 
* with their corresponding colors. Each card displays the acronym with a background color and the name 
* associated with the acronym.
* 
* @param {Object} keyToObject - The task object containing arrays of acronyms and names assigned to it.
* @returns {string} The HTML string for displaying contact cards, including acronyms with background colors and names.
*/
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

/**
 * Generates HTML for displaying a list of subtasks with checkboxes for a specific task.
 * 
 * This function creates HTML elements for each subtask in the provided task object. Each subtask is represented
 * by a checkbox and a label, allowing users to check off completed subtasks.
 * 
 * @param {Object} keyToObject - The task object containing the subtasks to be displayed.
 * @returns {string} The HTML string for displaying subtasks, each with a checkbox and a label.
 */

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

/**
 * Renders the HTML for a popup card displaying detailed information about a task.
 * 
 * This function generates the HTML for a popup card that shows detailed information about a task,
 * including its category, title, description, due date, priority, assigned contacts, subtasks, 
 * and options to delete or edit the task.
 * 
 * @param {Object} element - The task object containing details to be displayed in the popup.
 * @param {string} taskCategoryResult - HTML for displaying the task category.
 * @param {string} contactCardArrayResult - HTML for displaying the assigned contacts.
 * @param {string} subtaskListArray - HTML for displaying the subtasks.
 * @param {string} prioImg - HTML for displaying the priority image.
 * @returns {string} The HTML string for rendering the popup card.
 */

function renderPopupCardHTML(element, taskCategoryResult, contactCardArrayResult, subtaskListArray, prioImg) {
    return /*HTML*/ `
      <div id="popUp-animation" class="card-popUp">
            <div class="card-popUp-top">
                <div class="categorie">${taskCategoryResult}</div>
                <div class="back-arrow"><img class="cursor" onclick="timeOut()" src="./assets/img/close.svg" alt=""></div>
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
                <div onclick="deleteCard('${element['unique-key']}')" class="delete cursor"><img src="./assets/img/delete.svg" alt=""><span>Delete</span></div>
                <div class="line"></div>
                <div onclick="editCard('${element['unique-key']}')" class="edit cursor"><img class="edit" src="./assets/img/edit.svg" alt=""><span>Edit</span></div>
            </div>
        </div>    
    `;
}

/**
 * Renders the HTML for a task card to be displayed in the task board.
 * 
 * This function generates the HTML for a task card, including elements for task category, 
 * title, description, subtasks, assigned contacts, and priority. It also includes functionality 
 * for moving the task card up or down and opening a detailed view of the task.
 * 
 * @param {Object} element - The task object containing details to be displayed on the card.
 * @param {string} subTaskResult - HTML for displaying the subtasks.
 * @param {string} prioResult - HTML for displaying the priority image.
 * @param {string} taskCategory - HTML for displaying the task category.
 * @param {string} ContactsArrayResult - HTML for displaying the assigned contacts.
 * @returns {string} The HTML string for rendering the task card.
 */

function renderCardHTML(element, subTaskResult, prioResult, taskCategory, ContactsArrayResult) {
    let uniqueKey = element['unique-key'];
    return /*HTML*/ `
    <div class="card-with-arrows">
        <div onclick="switchCategory('${element['id']}', 'up')" class="move-arrow move-arrow-up">
            <img class="move-menu-icon" src="./assets/img/arrow_drop_down_up.svg" alt="">
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
            <img class="move-menu-icon" src="./assets/img/arrow_drop_down_down.svg" alt="">
        </div>
    </div>
    `;
}