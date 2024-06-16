
let subtaskArray = [];

let windowEvent;

function taskInput() {
    let windowEvent = docID('add-task-subtasks-inputfield');
    let addImg = docID('switch_img');
    let checkImg = docID('check-visibility');
    // windowEvent.classList.add('eyy');
    addImg.src = "assets/img/close.svg";
    checkImg.classList.remove('d-none');
}

// windowEvent = docID('add-task-subtasks-inputfield');
// function switchEdit() {
//     document.getElementById("add-task-subtasks-inputfield").classList.toggle("eyy")
// }

// window.onclick = function (event) {
//     if (!event.target.matches('add-task-subtasks-inputfield')) {
//         let dropdowns = document.getElementsByClassName("add-task-subtasks-inputfield");
//         let i;
//         for (i = 0; i < dropdowns.length; i++) {
//             var openDropdown = dropdowns[i];
//             if (openDropdown.classList.contains('eyy')) {
//                 openDropdown.classList.remove('eyy');
//             }
//         }
//     }
// }

function addToSubtaskArray() {
    let inputValue = docID('subtasks-input');
    let value = inputValue.value;
    subtaskArray.push(value);
    renderList();
    inputValue.value = '';
}

function renderList() {
    let subtaskList = docID('add-task-subtasks-list');
    subtaskList.innerHTML = '';
    for (let i = 0; i < subtaskArray.length; i++) {
        const element = subtaskArray[i];
        subtaskList.innerHTML += renderSubtaskList(element, i);
    }
}

function renderSubtaskList(element,i) {
    return /*HTML*/`
    <div id="editId_${i}" class="list">
       <li>${element}</li>
       <div class="img-content">
           <img onclick="editSubtask(${i})" src="/assets/img/edit_icon.svg" alt="Bearbeiten">
           <div class="split"></div>
           <img onclick="deletTask(${i})" src="/assets/img/delete_icon.svg" alt="Löschen">
       </div>
    </div>
    `;
}

function deleteValue() {
    let inputValue = docID('subtasks-input');
    inputValue.value = '';
}

function deletTask(element) {
    subtaskArray.splice(element, 1);
    renderList();
}

function editSubtask(i) { 
    // let subtaskList = docID('add-task-subtasks-list');
    let subtask = subtaskArray[i];
    let editTask = docID(`editId_${i}`);
    editTask.innerHTML = renderSwitchToInput(i);
    let edit = docID(`edit_content_${i}`);
    let hallo = docID(`newID_${i}`);
    hallo.value = subtask;
    docID('newInputSwitchImg').innerHTML = `<img onclick="deletTask(${i})" src="/assets/img/delete_icon.svg" alt=""></img>`;
    docID('otherInputSitchImg').innerHTML = `<img onclick="finishEditInput(${i})" src="assets/img/check-task.svg" alt=""></img>`;
    edit.classList.add('aktiveInput');
}

function renderSwitchToInput(i) {
    return /*HTML*/ `
    <div id="edit_content_${i}" class="list">
        <li><input class="newEditInput" id="newID_${i}" type="text"></li>
        <div class="img-content">
        <div id="newInputSwitchImg"><img onclick="editSubtask(${i})" src="/assets/img/edit_icon.svg" alt="Bearbeiten"></div>
           <div class="split"></div>
           <div id="otherInputSitchImg"><img onclick="deletTask(${i})" src="/assets/img/delete_icon.svg" alt="Löschen"></div>
           </div>
    </div>
    `;
}

function finishEditInput(i) {
    let newElement = docID(`newID_${i}`).value;
    let editTask = docID(`editId_${i}`);
    subtaskArray[i] = newElement; 
    let edit = subtaskArray[i];
    editTask.innerHTML = renderSubtaskList(edit,i);
}

                         