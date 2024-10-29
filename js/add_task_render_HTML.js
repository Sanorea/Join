/**
 * Generates an HTML string for a contact list item.
 *
 * This function creates and returns an HTML string representing a contact list item, including:
 * - A colored initial display based on the contact's color and acronym.
 * - The contact's name.
 * - A checkbox for assigning the contact to a task, with a unique ID and value.
 *
 * The HTML string is formatted with template literals and can be directly inserted into the DOM.
 *
 * @param {string} color - The background color for the contact's initials.
 * @param {string} acronym - The contact's acronym, displayed as initials.
 * @param {string} name - The contact's name.
 * @param {number} i - The index of the contact, used to create a unique ID for the checkbox.
 * @returns {string} The HTML string representing the contact list item.
 */
function renderContactListHTML(color, acronym, name, i) {
    return /*html*/`   
        <table>
            <div id="dropDownListContainer${i}" class ="dropDownList-contact-container"  onclick = "checkTheBoxByClickOnDiv(${i})">
                <div class ="dropDownList-contact-element">
                    <div class ="add-task-details-user-initials" style="background-color: ${color}">${acronym}</div>
                    <div class ="dropDownList-contact-element">${name}</div>
                </div>
                <div class ="dropDownList-contact-element">
                    <input id="checkboxes${i}" type="checkbox" value="${acronym};${color};${name}"onclick = "checkTheBoxByClickOnDiv(${i})">
                </div>
            </div>
        </table>
        `;
}

/**
 * Generates an HTML string for a dropdown category item.
 *
 * This function creates and returns an HTML string representing a category item in a dropdown menu.
 * The generated HTML includes:
 * - A label containing the category name.
 * - A checkbox input element associated with the category.
 *
 * The HTML string is formatted with template literals and can be directly inserted into the DOM.
 *
 * @param {string} categorie - The name of the category to be displayed.
 * @returns {string} The HTML string representing the category item.
 */
function templateRenderHTMLDropdownCategory(categorie) {
    return /*html*/ `                
    <li>
        <label>
            <div>
                <div>${categorie}</div>
            </div>    
            <input type="checkbox" value="${categorie}">
        </label>
    </li>`;
}

/**
 * Generates an HTML string for a subtask list item.
 *
 * This function creates and returns an HTML string representing a subtask item in a list. The HTML includes:
 * - The subtask content.
 * - Edit and delete icons with click handlers for editing and deleting the subtask.
 *
 * The HTML string is formatted with template literals and can be directly inserted into the DOM.
 *
 * @param {string} element - The content of the subtask to be displayed.
 * @param {number} i - The index of the subtask, used to create unique IDs and attach event handlers.
 * @returns {string} The HTML string representing the subtask list item.
 */
function renderSubtaskList(element, i) {
    return /*HTML*/`
    <div id="editId_${i}" class="list hover cursor">
       <div class="subtask-content">${element}</div>
       <div class="img-content hover">
           <img class="hover-img" onclick="editSubtask(${i})" src="./assets/img/edit_icon.svg" alt="Bearbeiten">
           <div class="split"></div>
           <img class="hover-img" onclick="deletTask(${i})" src="./assets/img/delete_icon.svg" alt="Löschen">
       </div>
    </div>
    `;
}

/**
 * Generates an HTML string for a subtask item with an input field for editing.
 *
 * This function creates and returns an HTML string that includes:
 * - An input field for editing the subtask content.
 * - Icons for saving the changes or deleting the subtask, with associated click handlers.
 *
 * The HTML string is formatted with template literals and can be directly inserted into the DOM.
 *
 * @param {number} i - The index of the subtask, used to create unique IDs and attach event handlers.
 * @returns {string} The HTML string representing the editable subtask item.
 */
function renderSwitchToInput(i) {
    return /*HTML*/ `
    <div id="edit_content_${i}" class="list-edit">
        <input class="newEditInput" id="newID_${i}" type="text">
        <div class="img-content hover">
        <div id="newInputSwitchImg"><img onclick="editSubtask(${i})" src="./assets/img/edit_icon.svg" alt="Bearbeiten"></div>
           <div class="split"></div>
           <div id="otherInputSitchImg"><img onclick="deletTask(${i})" src="./assets/img/delete_icon.svg" alt="Löschen"></div>
           </div>
    </div>
    `;
}

/**
 * Generates an HTML string for a searched contact list item.
 *
 * This function creates and returns an HTML string that represents a contact item in a search results list. 
 * The HTML includes:
 * - The contact's initials, styled with a background color.
 * - The contact's name.
 * - A checkbox input for selecting the contact, with an associated click handler.
 *
 * The HTML string is formatted with template literals and can be directly inserted into the DOM.
 *
 * @param {string} color - The background color for the contact's initials.
 * @param {string} acronym - The initials of the contact.
 * @param {string} name - The name of the contact.
 * @param {number} i - The index of the contact, used to create a unique ID for the checkbox.
 * @returns {string} The HTML string representing the searched contact list item.
 */
function renderSearchedContactListHTML(color, acronym, name, i) {
    return /*html*/`   
            <table>
            <div class ="dropDownList-contact-container">
                <div class ="dropDownList-contact-element">
                    <div class ="add-task-details-user-initials" style="background-color: ${color}">${acronym}</div>
                    <div class ="dropDownList-contact-element">${name}</div>
                </div>
                <div class ="dropDownList-contact-element" >
                    <input onclick = "readValueAssignedTo()" id="checkboxes${i}" type="checkbox" value="${acronym};${color};${name}">
                </div>
            </div>
        </table>
            `;
}
