/*Assigned to*/

/**
 * Retrieves task IDs from a remote source and saves them to an array.
 *
 * This asynchronous function fetches task IDs data from a specified endpoint using the 
 * `loadData` function. After retrieving the data, it calls `saveAddTaskIdsInArray` to store 
 * the task IDs in an internal array for further processing or use.
 *
 */
async function addTaskIdsToArray() {
    let addTaskIdsData = await loadData("/tasks");
    saveAddTaskIdsInArray(addTaskIdsData);
}

/**
 * Saves task IDs data into an internal array with additional metadata.
 *
 * This function processes the given `addTaskIdsData`, which is expected to be an object with task IDs, 
 * and transforms it into an array where each element contains the task ID and a unique key. 
 * The function populates the global `arrIds` array with this transformed data, assigning each element 
 * a `unique-key` property based on the original object's keys.
 *
 * @param {Object} addTaskIdsData - An object where each property represents a task ID with its corresponding key.
 *   - {string} key - The unique key for the task ID.
 *   - {Object} value - The task ID data associated with the key.
 */
function saveAddTaskIdsInArray(addTaskIdsData) {
    let tempArrIds = [];
    arrIds = [];
    for (let i in addTaskIdsData) {
        tempArrIds.push([i, addTaskIdsData[i]]);
    }
    for (let i in tempArrIds) {
        arrIds.push(tempArrIds[i][1]);
        arrIds[i]['unique-key'] = tempArrIds[i][0];
    }
}

/**
 * Generates a new unique ID based on the existing IDs in the array.
 *
 * This function determines the next available unique ID by examining the `arrIds` array, which 
 * contains previously used IDs. If the array is empty, it starts with ID `1`. Otherwise, it 
 * increments the highest existing ID by `1` to ensure uniqueness. The newly generated ID is 
 * then returned.
 *
 * @returns {number} The next available unique ID.
 */
function setId() {
    let id = 0;
    if (arrIds.length == 0) {
        id = 1;
    } else {
        let lastUsedId = arrIds[arrIds.length - 1]['id'];
        id = lastUsedId + 1;
    }
    return id;
}

/**
 * Retrieves and renders contact data for input fields.
 *
 * This asynchronous function performs the following tasks:
 * 1. Fetches contact data by calling `getContactsData()`.
 * 2. Renders names by awaiting the result of `renderNames()`.
 * 3. Renders acronyms by awaiting the result of `renderAcronym()`.
 * 4. Renders colors by awaiting the result of `renderColors()`.
 * 
 * It aggregates the rendered names, acronyms, and colors, and returns them as an object.
 *
 * @returns {Promise<Object>} A promise that resolves to an object containing:
 *   - {Array<string>} names - An array of contact names.
 *   - {Array<string>} acronyms - An array of contact acronyms.
 *   - {Array<string>} colors - An array of contact colors.
 */
async function renderContactListInput() {
    await getContactsData();
    names = await renderNames();
    acronyms = await renderAcronym();
    colors = await renderColors();
    return { names, acronyms, colors };
}

/**
 * Extracts and returns a list of contact names from the global contacts array.
 *
 * This asynchronous function iterates through the `arrContacts` array, which contains contact
 * objects. For each contact, it retrieves the `contact-name` property and adds it to the 
 * `names` array. The function then returns the populated `names` array.
 *
 * @returns {Promise<Array<string>>} A promise that resolves to an array of contact names.
 */
async function renderNames() {
    for (let i = 0; i < arrContacts.length; i++) {
        let name = arrContacts[i]['contact-name'];
        names.push(name);
    }
    return names;
}

/**
 * Extracts and returns a list of contact acronyms from the global contacts array.
 *
 * This asynchronous function iterates through the `arrContacts` array, which contains contact
 * objects. For each contact, it retrieves the `contact-acronym` property and adds it to the 
 * `acronyms` array. The function then returns the populated `acronyms` array.
 *
 * @returns {Promise<Array<string>>} A promise that resolves to an array of contact acronyms.
 */
async function renderAcronym() {
    for (let i = 0; i < arrContacts.length; i++) {
        let acronym = arrContacts[i]['contact-acronym'];
        acronyms.push(acronym);
    }
    return acronyms;
}

/**
 * Extracts and returns a list of contact colors from the global contacts array.
 *
 * This asynchronous function iterates through the `arrContacts` array, which contains contact
 * objects. For each contact, it retrieves the `contact-color` property and adds it to the 
 * `colors` array. The function then returns the populated `colors` array.
 *
 * @returns {Promise<Array<string>>} A promise that resolves to an array of contact colors.
 */
async function renderColors() {
    for (let i = 0; i < arrContacts.length; i++) {
        let color = arrContacts[i]['contact-color'];
        colors.push(color);
    }
    return colors;
}

/**
 * Processes checked box values to extract and store names, acronyms, and colors.
 *
 * This function iterates over the `valueCheckedBoxes` array, which contains values from
 * checked checkboxes. For each value, it extracts:
 * - The acronym by slicing the first two characters and adds it to the `checkedAcronyms` array.
 * - The name by slicing the string from the 11th character and adds it to the `checkedNames` array.
 * - The color by slicing the substring from the 3rd to the 10th character and adds it to the
 *   `checkedColors` array.
 */
function renderNamesCheckedBoxes() {
    for (let i = 0; i < valueCheckedBoxes.length; i++) {
        const acronymString = valueCheckedBoxes[i];
        let acronymToString = acronymString.slice(0, 2);
        checkedAcronyms.push(acronymToString);
        const nameString = valueCheckedBoxes[i];
        let nameToString = nameString.slice(11);
        checkedNames.push(nameToString);
        const colorString = valueCheckedBoxes[i];
        let colorToString = colorString.slice(3, 10);
        checkedColors.push(colorToString);
    }
}

/**
 * Renders a contact list for task assignment and updates the dropdown menu.
 *
 * This asynchronous function performs the following tasks:
 * 1. Retrieves contact data including names, acronyms, and colors by calling `renderContactListInput()`.
 * 2. Iterates over the retrieved contact data and appends HTML to the dropdown menu element with ID `dropDownList`
 *    using the `renderContactListHTML` function.
 * 3. Calls `readValueAssignedTo()` to process or update the values assigned to tasks.
 */
async function renderContactListaddTasks() {
    let { names, acronyms, colors } = await renderContactListInput();
    let dropDown = document.getElementById('dropDownList');
    for (let i = 0; i < names.length; i++) {
        const color = colors[i];
        const name = names[i];
        const acronym = acronyms[i];
        dropDown.innerHTML += renderContactListHTML(color, acronym, name, i);
    }
    readValueAssignedTo();
}

/**
 * Renders a list of checked contacts with their acronyms and colors.
 *
 * This asynchronous function performs the following tasks:
 * 1. Clears the arrays `checkedAcronyms`, `checkedNames`, and `checkedColors`.
 * 2. Calls `renderNamesCheckedBoxes()` to populate the `checkedAcronyms`, `checkedNames`, and `checkedColors` arrays
 *    based on the current state of checked checkboxes.
 * 3. Clears the inner HTML of the element with ID `checkedContacts`.
 * 4. Iterates over the `checkedAcronyms` array and generates HTML for each checked contact, displaying
 *    the contact's acronym with a background color taken from `checkedColors`. This HTML is then appended to
 *    the `checkedContacts` element.
 */
async function rendercheckedContacts() {
    checkedAcronyms = [];
    checkedNames = [];
    checkedColors = [];
    renderNamesCheckedBoxes();
    let checkedContacts = document.getElementById('checkedContacts');
    checkedContacts.innerHTML = "";
    for (let i = 0; i < checkedAcronyms.length; i++) {
        const acronym = checkedAcronyms[i];
        const checkedColor = checkedColors[i];
        checkedContacts.innerHTML += `
    <div class="add-task-details-user-initials"  style="background-color: ${checkedColor}">${acronym}`;
    }
}

/**
 * Collects values from checked checkboxes and updates the list of assigned contacts.
 *
 * This function performs the following tasks:
 * 1. Clears the `valueCheckedBoxes` array.
 * 2. Iterates through checkboxes associated with contact names, identified by IDs in the format `checkboxes{j}`,
 *    where `j` is the index of the checkbox.
 * 3. For each checkbox, if it is checked, its value is added to the `valueCheckedBoxes` array.
 * 4. Calls `rendercheckedContacts()` to update the display of checked contacts based on the collected values.
 */
function readValueAssignedTo() {
    valueCheckedBoxes = [];
    for (let j = 0; j < names.length; j++) {
        let name = document.getElementById(`checkboxes${j}`);
        let value = name.value;
        if (name.checked === true) {
            valueCheckedBoxes.push(value);
        }
    }
    rendercheckedContacts();
}

/**
 * Opens the contact list dropdown and sets up event listeners for closing it.
 *
 * This function performs the following tasks:
 * 1. Updates the visibility of UI elements related to the contact list:
 *    - Hides the element with ID `selectfieldOpen` by adding the class `d-none-add-task`.
 *    - Shows the element with ID `selectfieldClose` by removing the class `d-none-add-task`.
 *    - Displays the contact list dropdown menu (element with ID `dropDownList`) by removing the class `d-none-add-task`.
 * 2. Adds event listeners to close the dropdown when clicking outside of it:
 *    - If the element with ID `addTaskBG` exists, adds a click event listener to it that triggers the `closeClickOutside` function.
 *    - If the elements with IDs `cardPopUpBGEditContainer` and `cardPopUpBGEdit` exist, adds click event listeners to both that trigger the `closeClickOutside` function.
 */
function openContactListTasks() {
    const selectfieldOpen = document.getElementById("selectfieldOpen");
    selectfieldOpen.classList.add("d-none-add-task");
    const selectfieldClose = document.getElementById("selectfieldClose");
    selectfieldClose.classList.remove("d-none-add-task");
    const contactListTasks = document.getElementById("dropDownList");
    contactListTasks.classList.remove("d-none-add-task");
    if (docID('addTaskBG')) {
        docID('addTaskBG').addEventListener('click', closeClickOutside);
    }
    if (docID('cardPopUpBGEditContainer')) {
        docID('cardPopUpBGEditContainer').addEventListener('click', closeClickOutside);
        docID('cardPopUpBGEdit').addEventListener('click', closeClickOutside);
    }
}

/**
 * Closes the contact list dropdown and updates the visibility of related UI elements.
 *
 * This function performs the following tasks:
 * 1. Updates the visibility of UI elements related to the contact list:
 *    - Shows the element with ID `selectfieldOpen` by removing the class `d-none-add-task`.
 *    - Hides the element with ID `selectfieldClose` by adding the class `d-none-add-task`.
 *    - Hides the contact list dropdown menu (element with ID `dropDownList`) by adding the class `d-none-add-task`.
 */
function closeContactListTasks() {
    const selectfieldOpen = document.getElementById("selectfieldOpen");
    selectfieldOpen.classList.remove("d-none-add-task");
    const selectfieldClose = document.getElementById("selectfieldClose");
    selectfieldClose.classList.add("d-none-add-task");
    const contactListTasks = document.getElementById("dropDownList");
    contactListTasks.classList.add("d-none-add-task");
}

/**
 * Closes the contact list dropdown if the click occurs outside of the dropdown or related elements.
 *
 * This function performs the following tasks:
 * 1. Checks if the click event (`e`) occurred inside the contact list dropdown (`dropDownList`) or on elements related to it.
 * 2. If the click is detected outside the dropdown and its associated elements, it calls the `closeContactListTasks()` function to close the dropdown.
 * 
 * The function evaluates the following conditions:
 * - The click is outside the dropdown menu (`dropDownList`) and its child elements.
 * - The click is on any elements with the class `dropDownList-contact-element`.
 * - The click is on the open dropdown indicator (`selectFieldOpenIMG`).
 *
 * @param {MouseEvent} e - The mouse event triggered by a click.
 */
function closeClickOutside(e) {
    let myUL = docID('dropDownList');
    let myDiv = document.querySelectorAll(".dropDownList-contact-element");
    let inside = false;
    for (let i = 0; i < myUL.children.length; i++) {
        if (e.target === myUL.children[i] || e.target === docID(`checkboxes${i}`)) {
            inside = true;
        }
    }
    for (let j = 0; j < myDiv.length; j++) {
        e.target === myDiv[j] ? inside = true : '';
    }
    e.target === docID('selectFieldOpenIMG') || e.target === myUL ? inside = true : '';
    !inside ? closeContactListTasks() : '';
}