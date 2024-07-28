/**
 * Renders tasks in the HTML based on search results, organized by board category.
 * Clears the current content of each category and repopulates it with tasks that match the search criteria.
 * Displays a message if no tasks are available in a category after filtering.
 * 
 * @function
 */

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

/**
 * Updates the HTML content of task categories based on current task data.
 * Clears and repopulates each category section (e.g., 'To-do', 'In progress') with tasks.
 * If no tasks are available in a category, displays a message indicating so.
 * 
 * @async
 * @function
 */

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

/**
 * Highlights the specified categories by adding a CSS class to their corresponding elements.
 * 
 * @param {string} category1 - The ID of the first category element to highlight.
 * @param {string} category2 - The ID of the second category element to highlight.
 * @param {string} category3 - The ID of the third category element to highlight.
 * 
 * @returns {void} - This function does not return a value.
 * 
 * @example
 * highlight('category1', 'category2', 'category3');
 * // Adds 'drag-area-highlight' class to elements with IDs 'category1', 'category2', and 'category3'.
 */

function highlight(category1, category2, category3) {
    document.getElementById(category1).classList.add('drag-area-highlight');
    document.getElementById(category2).classList.add('drag-area-highlight');
    document.getElementById(category3).classList.add('drag-area-highlight');
}

/**
 * Removes the highlight CSS class from all category elements.
 * 
 * This function targets specific elements by their IDs and removes the 'drag-area-highlight' class from each,
 * effectively removing the highlight effect from the categories.
 * 
 * @returns {void} - This function does not return a value.
 * 
 * @example
 * removeHighlight();
 * // Removes 'drag-area-highlight' class from elements with IDs 'toDo', 'inProgress', 'awaitFeedback', and 'done'.
 */

function removeHighlight() {
    document.getElementById('toDo').classList.remove('drag-area-highlight');
    document.getElementById('inProgress').classList.remove('drag-area-highlight');
    document.getElementById('awaitFeedback').classList.remove('drag-area-highlight');
    document.getElementById('done').classList.remove('drag-area-highlight');
}