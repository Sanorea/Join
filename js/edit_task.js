let addArrTasks = [];
let uniqueKey = "";

/**
 * Opens a popup for editing a card and populates it with existing data.
 *
 * This asynchronous function performs several tasks to set up the card editing interface:
 * - Displays the popup for editing the card.
 * - Resets the priority levels to their default states.
 * - Retrieves and displays the saved inputs for the card.
 * - Shows the previously saved priority, assigned users, and subtasks for the card.
 * - Hides the category capture element.
 * - Adjusts the scale of the popup.
 *
 * @param {string} key - The unique identifier for the card to be edited.
 */
async function editCard(key) {

    await showPopUp();
    resetStartPrios('low');
    resetStartPrios('medium');
    resetStartPrios('urgent');
    await saveInputs(key);
    showSavedPrio(key);
    showSavedAssignedTo(key);
    showSubtasks(key);
    docID('categorieCapture').classList.add('d-none-add-task');
    scalePopUp();
}

/**
 * Resets the styling for a specified priority level.
 *
 * This function removes the color class associated with the given priority level
 * and updates the priority icon to its default state.
 *
 * @param {string} prio - The priority level to reset. This should be one of 'low', 'medium', or 'urgent'.
 */
function resetStartPrios(prio) {
    docID(`prio${prio}`).classList.remove(`${prio}-color`);
    docID(`${prio}Img`).innerHTML = `
    <img src="/assets/img/${prio}.svg" alt="prio">`;
}

/**
 * Displays the popup for editing a card and prepares it for interaction.
 *
 * This asynchronous function performs the following actions:
 * - Makes the popup element visible by removing the `d-none-add-task` class.
 * - Makes the OK button visible by removing the `d-none-add-task` class.
 * - Adjusts the styling for subtasks by removing the `add-task-margin-buttom` class.
 * - Closes any currently open card popup.
 * - Loads task contacts data into an array.
 */
async function showPopUp() {
    let popUp = docID('cardPopUpBGEdit');
    popUp.classList.remove("d-none-add-task");
    let button = docID('buttonPopUpOK');
    button.classList.remove("d-none-add-task");
    let subtasks = docID('addTaskMarginButtom');
    subtasks.classList.remove('add-task-margin-buttom');
    closeCardPopUp();
    await addTaskContactsToArray();
}

/**
 * Saves and populates input fields with values from a task object.
 *
 * This asynchronous function retrieves specific values (title, description, and date) from a task object
 * using the provided key and populates the corresponding input fields in the DOM with these values.
 * 
 * @async
 * @function
 * @param {string} key - The unique key used to access the task object in the `addArrTasks` array.
 */
async function saveInputs(key) {
    uniqueKey = key;
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

/**
 * Adjusts the styling of various elements to fit the pop-up layout.
 *
 * This function modifies the CSS classes of several elements to transition them from their default
 * layout to a pop-up layout. It hides or shows elements as necessary and updates their appearance
 * to suit the pop-up design.
 * 
 * Specifically, the function:
 * - Changes the class of the `templateWrapper` to alter its styling.
 * - Hides the `separator` element.
 * - Updates the styling of `leftSide` and `rightSide` to fit the pop-up layout.
 * - Hides the `cancelButton` element.
 */
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
    let cancel = docID('cancelButton');
    cancel.classList.add('d-none-add-task');
}

/**
 * Updates the priority button color based on the saved priority value.
 *
 * This function retrieves the priority value (`prio`) associated with a specific key from the 
 * `addArrTasks` array and updates the priority button's color to reflect this saved priority.
 * The priority can be one of `'low'`, `'medium'`, or `'urgent'`.
 * 
 * Specifically, the function:
 * - Retrieves the priority value for the given `key`.
 * - Calls `changeColorPrioButton` with the appropriate priority level to update the button color.
 * @param {string} key - The key used to retrieve the saved priority value from `addArrTasks`.
 */
function showSavedPrio(key) {
    let savedPrio = addArrTasks[0][key]['prio'];
    if (savedPrio === 'low') {
        changeColorPrioButton('low');
    } else if (savedPrio === 'medium') {
        changeColorPrioButton('medium');
    } else if (savedPrio === 'urgent') {
        changeColorPrioButton('urgent');
    } else {
    }
}

/**
 * Updates the state of checkboxes to reflect the names assigned to a task.
 *
 * This function retrieves the list of names assigned to a task from the `addArrTasks` array 
 * using a specified key. It then updates the checkboxes to match this list, checking 
 * the boxes that correspond to the assigned names and unchecking the others.
 * After updating the checkboxes, it calls `readValueAssignedTo` to further process the changes.
 * 
 * @param {string} key - The key used to retrieve the list of assigned names from `addArrTasks`.
 */
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

/**
 * Displays the subtasks for a given task and updates the UI accordingly.
 *
 * This function retrieves the subtasks and their checked status from the `addArrTasks` array
 * using the provided key. It then calls `renderList` to update the user interface with this 
 * information.
 * 
 * @param {string} key - The key used to retrieve the subtasks and their checked status 
 *                       from the `addArrTasks` array.

 */
function showSubtasks(key) {
    subtaskArray = addArrTasks[0][key]['subtasks'];
    subtaskCheckedArray = addArrTasks[0][key]['subtasksChecked'];
    renderList();
}

/**
 * Updates the priority button's color and image based on the provided priority level.
 *
 * This function changes the color of a priority button and updates its icon to reflect
 * the specified priority level. It adds a corresponding color class to the button element
 * and updates the button's image to a version with a white icon.
 * @param {('low' | 'medium' | 'urgent')} prio - The priority level for which to update the button's appearance.
 *                                               Can be 'low', 'medium', or 'urgent'.
 */
function changeColorPrioButton(prio) {
    docID(`prio${prio}`).classList.add(`${prio}-color`);
    docID(`${prio}Img`).innerHTML = `
    <img src="/assets/img/${prio}-white.svg" alt="prio">`;
}

/**
 * Closes the card edit popup and restores the visibility of associated UI elements.
 *
 * This function hides the card edit popup by adding a class to make it invisible,
 * and also hides additional buttons related to the popup. It restores the visibility
 * of the category capture element and resets the margin of the subtasks section.
 */
function closeEditCard() {
    let popUp = docID('cardPopUpBGEdit');
    popUp.classList.add("d-none-add-task");
    docID('categorieCapture').classList.remove('d-none-add-task');
    let buttonOK = docID('buttonPopUpOK');
    buttonOK.classList.add("d-none-add-task");
    let buttonAdd = docID('buttonPopUpAdd');
    buttonAdd.classList.add("d-none-add-task")
    let subtasks = docID('addTaskMarginButtom');
    subtasks.classList.remove('add-task-margin-buttom');
}

/**
 * Loads task data from a specified path and returns it as a JSON object.
 *
 * This function performs a fetch request to retrieve data from a given path, 
 * appends the `.json` extension to the URL, and converts the response to a JSON object.
 * 
 * @param {string} [path=""] - The path to the data endpoint, appended to the base URL and `.json` extension.
 * 
 * @returns {Promise<Object>} A promise that resolves to the JSON object containing the loaded task data.
 */
async function addTaskLoadData(path = "") {
    let response = await fetch(BASE_URL + path + ".json");
    let responseToJson = await response.json();
    return responseToJson;
}

/**
 * Fetches task data from the "/tasks" endpoint and stores it in the `addArrTasks` array.
 *
 * This function asynchronously retrieves task data from the specified endpoint using 
 * the `addTaskLoadData` function. The fetched data is then stored in the `addArrTasks` array.
 */
async function addTaskContactsToArray() {
    let addTaskResponseToJson = await addTaskLoadData(path = "/tasks");
    addArrTasks = [];
    addArrTasks.push(addTaskResponseToJson);
}

/**
 * Edits a contact by updating its details and refreshing the user interface.
 *
 * This function retrieves the current values for title, description, and date from the input fields,
 * as well as the board category, task category, and ID from the `addArrTasks` array using the `uniqueKey`.
 * It then calls `pushNewDatas` to update the contact with the retrieved data and subsequently closes 
 * the edit card and updates the HTML to reflect the changes.
 */
async function editContact() {
    let title = docID('add-task-input-title');
    let description = docID('add-task-input-description');
    let date = docID('add-task-input-date');
    let savedBoardCategory = addArrTasks[0][uniqueKey]['boardCategory'];
    let savedTaskCategory = addArrTasks[0][uniqueKey]['taskCategory'];
    let savedID = addArrTasks[0][uniqueKey]['id'];
    await pushNewDatas(savedBoardCategory, savedTaskCategory, savedID, date, description, title);
    closeEditCard();
    updateHTML();
}

/**
 * Updates the contact data with new values.
 *
 * This function sends an update request to the server to modify the contact data at the specified path.
 * It includes details such as board category, task category, date, description, ID, priority, subtasks,
 * and names and acronyms assigned to the contact.
 * @param {string} savedBoardCategory - The board category to be updated for the contact.
 * @param {string} savedTaskCategory - The task category to be updated for the contact.
 * @param {string|number} savedID - The ID of the contact to be updated.
 * @param {HTMLInputElement} date - The HTML input element containing the new date value for the contact.
 * @param {HTMLInputElement} description - The HTML input element containing the new description value for the contact.
 * @param {HTMLInputElement} title - The HTML input element containing the new title value for the contact.
 */
async function pushNewDatas(savedBoardCategory, savedTaskCategory, savedID, date, description, title) {
    await updateData("/tasks/" + uniqueKey, {
        "boardCategory": savedBoardCategory,
        "taskCategory": savedTaskCategory,
        "date": date.value,
        "description": description.value,
        "id": savedID,
        "prio": prios,
        "subtasks": subtaskArray,
        "subtasksChecked": subtaskCheckedArray,
        "title": title.value,
        "namesAssignedTo": checkedNames,
        "acronymsAssignedTo": checkedAcronyms,
    })
}

/**
 * Opens a popup for creating a new task and sets its initial state.
 *
 * This function configures the popup for adding a new task by clearing the form,
 * scaling the popup to the appropriate size, setting the priority button color,
 * and displaying the necessary UI elements. It also sets a global board category
 * for the new task.
 * 
 * @param {string} boardCategory - The category of the board where the new task will be added.
 */
function openNewTaskPopUp(boardCategory) {
    clearFormular();
    scalePopUp();
    changeColorPrioButton('medium');
    let popUp = docID('cardPopUpBGEdit');
    let button = docID('buttonPopUpAdd');
    popUp.classList.remove("d-none-add-task");
    button.classList.remove("d-none-add-task");
    let cancel = docID('cancelButton');
    cancel.classList.remove("d-none-add-task");
    globalBoardCategory = boardCategory;
}

/**
 * Clears the form inputs and resets associated data for a new task.
 *
 * This function resets the values of the title, description, and date input fields,
 * clears the array of subtasks, and performs various UI and state resets. Specifically, 
 * it clears the task list, resets checked contacts, and resets priority buttons to their default state.
 */
function clearFormular() {
    let title = docID('add-task-input-title');
    let description = docID('add-task-input-description');
    let date = docID('add-task-input-date');
    title.value = "";
    description.value = "";
    date.value = "";
    subtaskArray = [];
    renderList();
    resettCheckedContacts();
    resettPrioButtons('urgent');
    resettPrioButtons('medium');
    resettPrioButtons('low');
}

/**
 * Resets all checked contact checkboxes and updates the displayed list of checked contacts.
 *
 * This function iterates through a list of checkboxes, unchecks any that are currently checked,
 * and then updates the displayed list of checked contacts by calling `rendercheckedContacts()`.
 */
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

