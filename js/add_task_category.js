/*Category*/

/**
 * Updates the UI to reflect the selected task category and manages 
 * the visibility of certain UI elements related to category selection.
 *
 * This function:
 * 1. Hides the category dropdown list.
 * 2. Displays the selected category in a specified field.
 * 3. Toggles the visibility of buttons for opening and closing the category dropdown.
 *
 * @param {string} taskCategory - The name of the selected task category.
 */
function checkedCategory(taskCategory) {
    const contactListTasks = docID("categoryDropDownList");
    contactListTasks.classList.add("d-none-add-task");
    const selectedButton = docID("categorySelectfieldTask");
    selectedButton.classList.remove("d-none-add-task");
    const closeButton = docID("categorySelectfieldClose");
    closeButton.classList.add("d-none-add-task");
    const openButton = docID("categorySelectfieldOpen");
    openButton.classList.add("d-none-add-task");
    checkedCategorys = taskCategory;
    let selectField = docID('categorySelectfieldTask');
    selectField.innerHTML = `
    <span>${checkedCategorys}</span>
    <img src="./assets/img/arrow_down.svg" alt="">`;
}

/**
 * Resets the category selection UI by hiding the selected category display 
 * and showing the category dropdown list.
 *
 * This function:
 * 1. Hides the UI element that displays the selected category.
 * 2. Shows the button or UI element that opens the category selection dropdown.
 * 3. Displays the dropdown list containing all category options.
 *
 */
function closeCheckedCategory() {
    const selectfieldTask = docID('categorySelectfieldTask');
    selectfieldTask.classList.add("d-none-add-task");
    const selectfieldOpen = docID('categorySelectfieldOpen');
    selectfieldOpen.classList.remove("d-none-add-task");
    const contactListTasks = docID("categoryDropDownList");
    contactListTasks.classList.remove("d-none-add-task");
}

/**
 * Renders a dropdown menu with categories for task addition.
 *
 * This asynchronous function fetches category data and populates a dropdown
 * menu with HTML content for each category. It uses the `templateRenderHTMLDropdownCategory`
 * function to generate the HTML for each category.
 *
 */
async function renderDropdownCategorieAddTasks() {
    let categories = [];
    let dropDown = document.getElementById('dropDown');
    for (let i = 0; i < categories.length; i++) {
        const categorie = categories[i];
        dropDown.innerHTML += templateRenderHTMLDropdownCategory(categorie);
    }
}

/**
 * Opens the category list in the UI for selecting a task category.
 *
 * This function makes UI changes to display the category dropdown list:
 * 1. Hides the element that triggers the opening of the dropdown.
 * 2. Shows the element that allows the dropdown to be closed.
 * 3. Displays the dropdown list containing all available category options.
 *
 */
function openCategoryList() {
    const selectfieldOpen = docID("categorySelectfieldOpen");
    selectfieldOpen.classList.add("d-none-add-task");
    const selectfieldClose = docID("categorySelectfieldClose");
    selectfieldClose.classList.remove("d-none-add-task");
    const contactListTasks = docID("categoryDropDownList");
    contactListTasks.classList.remove("d-none-add-task");
}

/**
 * Closes the category list in the UI, hiding the dropdown of categories.
 *
 * This function manages the visibility of UI elements related to the 
 * category dropdown list:
 * 1. Shows the element that triggers the opening of the dropdown.
 * 2. Hides the element that allows the dropdown to be closed.
 * 3. Hides the dropdown list containing all available category options.
 *
 */
function closeCategoryList() {
    const selectfieldOpen = docID("categorySelectfieldOpen");
    selectfieldOpen.classList.remove("d-none-add-task");
    const selectfieldClose = docID("categorySelectfieldClose");
    selectfieldClose.classList.add("d-none-add-task");
    const contactListTasks = docID("categoryDropDownList");
    contactListTasks.classList.add("d-none-add-task");
}