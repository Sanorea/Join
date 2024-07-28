
/**
 * Validates required fields for task submission and initiates task submission if all fields are filled.
 *
 * This function checks whether the necessary fields for task creation (title, date, and category) 
 * are filled in and visible. If any required field is missing or hidden, it triggers a function 
 * to handle the validation feedback. If all fields are correctly filled and visible, it proceeds 
 * to submit the task using the `submitTask` function.
 *
 * @param {string} boardCategory - The category of the board where the task is to be submitted.
 * @returns {void}
 */
function requiredFields(boardCategory) {
    let { title, titleRequired } = requiredFieldTitle();
    let { date, dateRequired } = requiredFieldDate();
    let { categoryRequired, categoryField, categoryFieldOpen } = requiredFieldCategory();
    if (title.value === "" || date.value === "" || categoryField.classList.contains('d-none-add-task')) {
        if (title.value === "") {
            ifConditionRequiredFields(titleRequired, title);
        }
        if (date.value === "") {
            ifConditionRequiredFields(dateRequired, date);
        }
        if (categoryField.classList.contains('d-none-add-task')) {
            ifConditionRequiredFields(categoryRequired, categoryFieldOpen);
        }
    } else {
        submitTask(boardCategory);
    }
}

/**
 * Retrieves and prepares the elements related to the task title input field for validation.
 *
 * This function selects the HTML elements related to the task title, specifically the element 
 * that indicates whether the title field is required and the title input field itself. It 
 * ensures that the "required" indicator is hidden and that the title input field does not 
 * have the "required" CSS class applied. The function returns these elements for use in 
 * validation and submission processes.
 *
 * @returns {Object} An object containing the following properties:
 *   - {HTMLElement} title - The HTML input element for the task's title.
 *   - {HTMLElement} titleRequired - The HTML element that indicates if the title field is required.
 */
function requiredFieldTitle() {
    let titleRequired = docID('titleRequired');
    let title = docID('add-task-input-title');
    titleRequired.classList.add('d-none-add-task');
    title.classList.remove('required-input-fields');
    return { title, titleRequired };
}

/**
 * Retrieves and prepares the elements related to the task date input field for validation.
 *
 * This function selects the HTML elements associated with the task date input, including the 
 * element that indicates if the date field is required and the date input field itself. 
 * It ensures that the "required" indicator is hidden and that the date input field does not 
 * have the "required" CSS class applied. The function returns these elements for use in 
 * validation and form handling processes.
 *
 * @returns {Object} An object containing the following properties:
 *   - {HTMLElement} date - The HTML input element for the task's due date.
 *   - {HTMLElement} dateRequired - The HTML element that indicates if the date field is required.
 */
function requiredFieldDate() {
    let dateRequired = docID('dateRequired');
    let date = docID('add-task-input-date');
    dateRequired.classList.add('d-none-add-task');
    date.classList.remove('required-input-fields');
    return { date, dateRequired };
}

/**
 * Retrieves and prepares the elements related to the task category input field for validation.
 *
 * This function selects the HTML elements associated with the task category input, including 
 * the element that indicates if the category field is required, the category field itself, 
 * and the element representing the open state of the category field. It ensures that the 
 * "required" indicator is hidden and that the category field open element does not have 
 * the "required" CSS class applied. The function returns these elements for use in validation 
 * and form handling processes.
 *
 * @returns {Object} An object containing the following properties:
 *   - {HTMLElement} categoryRequired - The HTML element that indicates if the category field is required.
 *   - {HTMLElement} categoryField - The HTML element for the category input field.
 *   - {HTMLElement} categoryFieldOpen - The HTML element representing the open state of the category field.
 */
function requiredFieldCategory() {
    let categoryRequired = docID('categoryRequired');
    let categoryField = docID('categorySelectfieldTask');
    let categoryFieldOpen = docID('categorySelectfieldOpen');
    categoryRequired.classList.add('d-none-add-task');
    categoryFieldOpen.classList.remove('required-input-fields');
    return { categoryRequired, categoryField, categoryFieldOpen };
}

/**
 * Updates the display of required fields by showing an error message and applying a CSS class.
 *
 * This function handles the display of validation feedback for required input fields. It makes 
 * an error message element visible and applies a CSS class to the input field to indicate that 
 * it is required. This helps in guiding the user to fill in the necessary fields.
 *
 * @param {HTMLElement} text - The HTML element that displays the error message or validation text.
 * @param {HTMLElement} color - The HTML input element to which a CSS class indicating a required field is applied.
 */
function ifConditionRequiredFields(text, color) {
    text.classList.remove('d-none-add-task');
    color.classList.add('required-input-fields');
}