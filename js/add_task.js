
let subtaskCheckedArray = [];
let subtaskArray = [];
let arrIds = [];
let windowEvent;
let valueCheckedBoxes = [];
let arrIdTasks = "";
let names = [];
let acronyms = [];
let colors = [];
let prios = "medium";
let checkedAcronyms = [];
let checkedNames = [];
let checkedColors = [];
let checkedCategorys = "";
let searchedNames = [];
let searchedAcronyms = [];
let searchedColors = [];
let globalBoardCategory = "";

/*init-functions / general-functions*/

/**
 * This function is used to load the tasks from firefox
 * 
 * @param {string} path - This is the path of the task array in firefox
 * @returns - This return gives us the element from firebase as JSON
 */
async function addTaskLoadData(path = "") {
    let response = await fetch(BASE_URL + path + ".json");
    let responseToJson = await response.json();
    return responseToJson;
}

/**
 * This function start all the function that we need when the page is loaded
 * 
 */
async function addTaskInit() {
    await includeHTML();
    await addTaskLoadData("/contacts/contact-name");
    await addTaskLoadData("/tasks");
    renderContactListaddTasks();
    renderDropdownCategorieAddTasks();
    setStartPrio();
    renderDateInput();
}

/**
 * This function set the prio on medium when nothing is selected
 * 
 */
function setStartPrio() {
    docID(`priomedium`).classList.add(`medium-color`);
    docID(`mediumImg`).innerHTML = `
    <img src="/assets/img/medium-white.svg" alt="prio">`;
}

/**
  * Asynchronously includes HTML content from external files into elements 
 * with the attribute `w3-include-html`.
 *
 * This function searches for all elements in the document with the 
 * attribute `w3-include-html` and replaces their inner HTML with the 
 * content fetched from the URL specified by the attribute's value.
 * 
 */
async function includeHTML() {
    let includeElements = document.querySelectorAll('[w3-include-html]');
    for (let i = 0; i < includeElements.length; i++) {
        const element = includeElements[i];
        file = element.getAttribute("w3-include-html");
        let resp = await fetch(file);
        element.innerHTML = await resp.text();
    }
}

/*Prio*/

/**
 * Sets the priority level for a task and updates the UI accordingly.
 *
 * This function sets the priority (`prio`) of a task and applies a 
 * corresponding color style. It also resets the visual state of other 
 * priority buttons to their default state. The function modifies the UI 
 * by adding a specific color class to the priority button and updating 
 * the button's icon.
 *
 * @param {string} prio - The priority level to set ('urgent', 'medium', 'low').
 * @param {string} color - The CSS class name representing the color associated 
 * with the priority level.
 */
function setPrio(prio, color) {
    prios = prio;
    resettPrioButtons('urgent');
    resettPrioButtons('medium');
    resettPrioButtons('low');
    docID(`prio${prio}`).classList.add(color);
    docID(`${prio}Img`).innerHTML = `
        <img src="/assets/img/${prio}-white.svg" alt="prio">`;
}

/**
 * Resets the visual state of a priority button to its default appearance.
 *
 * This function removes the color class from a specified priority button 
 * and resets its icon to the default state. It is typically used to ensure 
 * that only the selected priority button is highlighted while others are 
 * in their default state.
 *
 * @param {string} prio - The priority level associated with the button to reset 
 * ('urgent', 'medium', 'low'). This parameter is used to target the specific 
 * button and icon elements.
 */
function resettPrioButtons(prio) {
    docID(`prio${prio}`).classList.remove(`${prio}-color`);
    docID(`${prio}Img`).innerHTML = `
    <img src="/assets/img/${prio}.svg" alt="${prio}">`;
}

/*Post Data on Firebase*/

/**
 * Sends a POST request to add a new task, posting data to a specified API endpoint.
 *
 * This asynchronous function sends task data to a specified API endpoint by 
 * making a POST request. The function expects a path to determine the API 
 * endpoint and the data to be sent. The data is sent as JSON. It returns 
 * the JSON response from the server.
 *
 * @param {string} [path=""] - The API endpoint path to append to the base URL. 
 * Defaults to an empty string, which may be used to target a root endpoint.
 * @param {Object} [data={}] - The data to be sent in the POST request. 
 * Defaults to an empty object.
 * @returns {Promise<Object>} A promise that resolves to the JSON response 
 * from the server, containing the result of the POST request.
 */
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

/**
 * Submits a new task by collecting input data, assigning an ID, and posting the task to the specified board category.
 *
 * This asynchronous function handles the submission of a task by:
 * 1. Collecting task details (title, description, date, category) from input fields.
 * 2. Reading assigned values for the task.
 * 3. Adding task IDs to an array to track them.
 * 4. Generating a new ID for the task.
 * 5. Posting the task data to the specified board category.
 * 6. Clearing input fields after submission.
 * 7. Displaying a confirmation message and redirecting to the board page.
 *
 * @param {string} boardCategory - The category of the board to which the task is being added.
 */
async function submitTask(boardCategory) {
    let { title, description, date, categorie } = setVariablesForDivs();
    readValueAssignedTo();
    await addTaskIdsToArray();
    let newId = setId();
    if (checkedNames.length <= 0) {
        checkedNames = "";
    }
    postAddTaskInputs(boardCategory, date, description, newId, title);
    clearFieldsDropDown(title, description, date, categorie);
    loadMessage();
    setTimeout(() => {
        window.location.href = "board.html";
    }, 1500);
}

/**
 * Displays the message box by removing its hidden state.
 *
 * This function shows the message box element by removing the 
 * `d-none-add-task` class, which is typically used to hide the element.
 * The message box is intended to display notifications or messages to the user.
 *
 */
function loadMessage() {
    let messageBox = docID('messageBoxBG');
    messageBox.classList.remove('d-none-add-task');
}

/**
 * Sends task data to the server for adding a new task.
 *
 * This function constructs a data object with the provided task details 
 * and sends it to the server using the `addTaskPostData` function. The data 
 * object includes information such as board category, task category, due date, 
 * description, priority, subtasks, and assigned names/acronyms. The function 
 * is used to submit the task data to the server endpoint responsible for managing 
 * tasks.
 *
 * @param {string} boardCategory - The category of the board where the task will be added.
 * @param {HTMLInputElement} date - The date input element containing the task's due date.
 * @param {HTMLInputElement} description - The description input element containing the task's description.
 * @param {string} newId - The unique identifier for the new task.
 * @param {HTMLInputElement} title - The title input element containing the task's title.
 */
function postAddTaskInputs(boardCategory, date, description, newId, title) {
    addTaskPostData("/tasks", {
        "boardCategory": boardCategory,
        "taskCategory": checkedCategorys,
        "date": date.value,
        "description": description.value,
        "id": newId,
        "prio": prios,
        "subtasks": subtaskArray,
        "title": title.value,
        "namesAssignedTo": checkedNames,
        "acronymsAssignedTo": checkedAcronyms,
        "subtasksChecked": subtaskCheckedArray,
    });
}

/**
 * Retrieves and returns the HTML elements for task input fields.
 *
 * This function selects and returns the HTML elements corresponding to the 
 * task's title, description, due date, and category input fields. It retrieves 
 * these elements by their IDs and packages them in an object for easy access 
 * in other parts of the code.
 *
 * @function
 * @returns {Object} An object containing the following properties:
 *   - {HTMLElement} title - The HTML element for the task's title input field.
 *   - {HTMLElement} description - The HTML element for the task's description input field.
 *   - {HTMLElement} date - The HTML element for the task's due date input field.
 *   - {HTMLElement} categorie - The HTML element for the task's category input field.
 */
function setVariablesForDivs() {
    let title = docID('add-task-input-title');
    let description = docID('add-task-input-description');
    let date = docID('add-task-input-date');
    let categorie = docID('categories');
    return { title, description, date, categorie };
}

/**
 * Clears the values of task input fields and resets the selected category.
 *
 * This function sets the values of the specified input fields (title, description, 
 * and date) to empty strings, effectively clearing any user input. It also resets 
 * the currently selected task category to an empty string.
 *
 * @function
 * @param {HTMLInputElement} title - The HTML input element for the task's title.
 * @param {HTMLInputElement} description - The HTML input element for the task's description.
 * @param {HTMLInputElement} date - The HTML input element for the task's due date.
 * @param {string} categorie - The currently selected task category to be cleared.
 */
function clearFieldsDropDown(title, description, date) {
    title.value = "";
    description.value = "";
    date.value = "";
    checkedCategorys = "";
}

/**
 * Searches for contacts based on the input in the search field and updates the contact dropdown list.
 *
 * This function retrieves the value from the search input field, converts it to lowercase, 
 * and then clears the current contact dropdown list. It also initializes arrays to store 
 * searched names, acronyms, and colors. The function then calls other functions to handle 
 * the search operation and update the UI with the filtered contact list.
 *
 */
function searchContacts() {
    let inputField = docID('searchField');
    let search = inputField.value.toLowerCase();
    let dropDown = document.getElementById('dropDownList');
    dropDown.innerHTML = "";
    searchedNames = [];
    searchedAcronyms = [];
    searchedColors = [];
    pushSearchedElements(search);
    renderSearchedContactListaddTasks();
}

/**
 * Filters and stores contacts that match the search query.
 *
 * This function iterates through a list of contacts (`arrContacts`) and checks if each contact's 
 * name includes the search query (case-insensitive). For each contact that matches the search query, 
 * the function adds the contact's name, acronym, and color to their respective arrays (`searchedNames`, 
 * `searchedAcronyms`, and `searchedColors`).
 *
 * @param {string} search - The search query used to filter the contacts. The search is case-insensitive.
 */
function pushSearchedElements(search) {
    for (let i = 0; i < arrContacts.length; i++) {
        const name = arrContacts[i]['contact-name'];
        const acronym = arrContacts[i]['contact-acronym'];
        const color = arrContacts[i]['contact-color'];
        if (name.toLowerCase().includes(search)) {
            searchedNames.push(name);
            searchedAcronyms.push(acronym);
            searchedColors.push(color);
        }
    }
}

/**
 * Stops the propagation of an event to parent elements.
 *
 * This function prevents the event from bubbling up to parent elements in the DOM. 
 * It is typically used to stop the event from being handled by other event listeners 
 * attached to ancestor elements.
 *
 * @param {Event} event - The event object whose propagation is to be stopped.
 */
function stopPropagation(event) {
    event.stopPropagation();
}

/**
 * Renders and displays the list of searched contacts in the dropdown.
 *
 * This asynchronous function iterates over arrays of searched contact details (`searchedNames`, 
 * `searchedAcronyms`, `searchedColors`) and appends HTML elements to the dropdown list. 
 * Each contact is rendered using the `renderSearchedContactListHTML` function. The function 
 * dynamically updates the dropdown's content based on the search results.
 *
 */
async function renderSearchedContactListaddTasks() {
    let dropDown = document.getElementById('dropDownList');
    for (let i = 0; i < searchedNames.length; i++) {
        const color = searchedColors[i];
        const name = searchedNames[i];
        const acronym = searchedAcronyms[i];
        dropDown.innerHTML += renderSearchedContactListHTML(color, acronym, name, i);
    }
}

/**
 * Sets the minimum date for the date input field to the current date.
 *
 * This function generates a date string in the format "YYYY-MM-DD" representing the
 * current date. If the month is less than 10, a leading zero is added to ensure the
 * proper format. The resulting date string is then set as the minimum allowable date
 * in the date input field with the ID 'add-task-input-date'.
 */
function renderDateInput() {
    let newDate = "";
    if (date.getMonth() + 1 <= 10) {
        newDate = date.getFullYear() + "-0" + (date.getMonth() + 1) + "-" + date.getDate();
        console.log('if :>> ', 'if');
    } else {
        newDate = date.getFullYear() + "-" + (date.getMonth() + 1) + "-" + date.getDate();
        console.log('else :>> ', 'else');
    }
    docID('add-task-input-date').min = newDate;
}

/**
 * Displays the date picker for the date input field.
 *
 * This function triggers the display of the date picker UI for the date input field
 * with the ID 'add-task-input-date'. It is useful for prompting the user to select a date.
 */
function emptyDate() {
    let date = document.getElementById("add-task-input-date");
    date.showPicker();
}

