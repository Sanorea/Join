function taskInput() {
    let addImg = docID('switch_img');
    let checkImg = docID('check-visibility');
    addImg.src = "assets/img/close.svg";
    checkImg.classList.remove('d-none');
}

/**
 * Adds the value from the subtasks input field to the subtaskArray and initializes its checked status.
 * Updates the rendered list and clears the input field after adding the subtask.
 * 
 * @function
 * @returns {void}
 */

function addToSubtaskArray() {
    let inputValue = docID('subtasks-input');
    let value = inputValue.value;
    if (value == "") {
        inputValue.value = '';
    } else {
    subtaskArray.push(value);
    subtaskCheckedArray.push("false");
    renderList();
    inputValue.value = '';
    }
}

/**
 * Renders the list of subtasks in the HTML element with the ID 'add-task-subtasks-list'.
 * Clears the existing list and appends each subtask from the `subtaskArray` by calling `renderSubtaskList`.
 * 
 * @function
 * @returns {void}
 */

function renderList() {
    let subtaskList = docID('add-task-subtasks-list');
    if (subtaskArray == undefined) {
        subtaskArray =  [];
    }
    subtaskList.innerHTML = '';
    for (let i = 0; i < subtaskArray.length; i++) {
        const element = subtaskArray[i];
        subtaskList.innerHTML += renderSubtaskList(element, i);
    }
}

/**
 * Clears the value of the input field with the ID 'subtasks-input'.
 * 
 * @function
 * @returns {void}
 */

function deleteValue() {
    let inputValue = docID('subtasks-input');
    inputValue.value = '';
}

/**
 * Deletes a subtask from `subtaskArray` based on its index.
 * 
 * @param {number} element - The index of the subtask to be removed from the array.
 * @returns {void}
 */

function deletTask(element) {
    subtaskArray.splice(element, 1);
    renderList();
}

/**
 * Switches a subtask at index `i` to edit mode.
 * Updates the relevant HTML elements to allow editing of the subtask.
 * 
 * @param {number} i - The index of the subtask to be edited.
 * @returns {void}
 */

function editSubtask(i) {
    let subtask = subtaskArray[i];
    let editTask = docID(`editId_${i}`);
    editTask.innerHTML = renderSwitchToInput(i);
    let edit = docID(`edit_content_${i}`);
    let newIdContent = docID(`newID_${i}`);
    newIdContent.value = subtask;
    edit.classList.add('aktiveInput');
    docID('newInputSwitchImg').innerHTML = `<img class="hover-img" onclick="deletTask(${i})" src="/assets/img/delete_icon.svg" alt=""></img>`;
    docID('otherInputSitchImg').innerHTML = `<img class="hover-img" onclick="finishEditInput(${i})" src="assets/img/check-task.svg" alt=""></img>`;
}

/**
 * Completes the editing of a subtask at index `i` and updates the displayed subtask.
 * 
 * @param {number} i - The index of the subtask being edited.
 * @returns {void}
 */

function finishEditInput(i) {
    let newElement = docID(`newID_${i}`).value;
    let editTask = docID(`editId_${i}`);
    subtaskArray[i] = newElement;
    let edit = subtaskArray[i];
    editTask.innerHTML = renderSubtaskList(edit, i);
}
