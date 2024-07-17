let addArrTasks = [];


async function editCard(key) {
    let popUp = docID('cardPopUpBGEdit');
    popUp.classList.remove("d-none-add-task");
    await addTaskContactsToArray();

    console.log('addArrTasks :>> ', addArrTasks);
    let savedTitle = addArrTasks[0][key]['title'];
    let savedDescription = addArrTasks[0][key]['description'];
    let savedDate = addArrTasks[0][key]['date'];
    let title = docID('add-task-input-title');
    let description = docID('add-task-input-description');
    let date = docID('add-task-input-date');
    title.value = savedTitle;
    description.value = savedDescription;
    date.value = savedDate;
    showSavedPrio(key);
    showSavedAssignedTo(key);

    docID('categorieCapture').classList.add('d-none-add-task');
}

function showSavedPrio(key) {
    let savedPrio = addArrTasks[0][key]['prio'];
    console.log('savedPrio :>> ', savedPrio);
    if (savedPrio==='low') {
        changeColorPrioButton('low');
    } else {
        if (savedPrio==='medium') {
            changeColorPrioButton('medium');
        } else {
            changeColorPrioButton('urgent');
        }
    }
}

function showSavedAssignedTo(key) {
    let savedAssignedTo = addArrTasks[0][key]['namesAssignedTo'];
    console.log('savedAssignedTo :>> ', savedAssignedTo);
    for (let i = 0; i < 6; i++) {
        let value = docID(`checkboxes${i}`).value;
        let valueName = value.slice(11);
        if (savedAssignedTo.includes(valueName)) {
            console.log('geschaft :>> ', 'geschafft');
            docID(`checkboxes${i}`).checked = true;
        } else {
            console.log('nicht geschaft :>> ', 'nicht geschafft');
            docID(`checkboxes${i}`).checked = false;
        }
    }
    readValueAssignedTo();
}

function changeColorPrioButton(prio) {
    docID(`prio${prio}`).classList.add(`${prio}-color`);
    docID(`${prio}Img`).innerHTML = `
    <img src="/assets/img/${prio}-white.svg" alt="prio">`;
}

function closeEditCard () {
    let popUp = docID('cardPopUpBGEdit');
    popUp.classList.add("d-none-add-task");
    docID('categorieCapture').classList.remove('d-none-add-task');
}

async function addTaskLoadData(path = "") {
    let response = await fetch(BASE_URL + path + ".json");
    let responseToJson = await response.json();
    
    return responseToJson;
    
}

async function addTaskContactsToArray() {
    let addTaskResponseToJson = await addTaskLoadData(path = "/tasks");
    addArrTasks.push(addTaskResponseToJson);
}

function editTaskLoadCardCheckedFields() {
    let checkedAssignedTo = ['a','b','c'];
    let allContacts = ['a','b','c','d','e'];
    for (let i = 0; i < allContacts.length; i++) {
        const contact = allContacts[i];
        if (checkedAssignedTo.includes(contact)) {
            /*checkboxen auf checked setzen*/
            console.log('jeah :>> ', i);
        }
        else (console.log('schade :>> ', i));
    }
}


/* async function editContact(id) {
    let key = task['unique-key'];
    let title = docID('add-task-input-title');
    let description = docID('add-task-input-description');
    let date = docID('add-task-input-date');
    let categorie = docID('categories');

    await updateData("/tasks/" + key, {
        "boardCategory": "toDo",
        "taskCategory": checkedCategorys,
        "date": date.value,
        "description": description.value,
        "id": newId,
        "prio": prios,
        "subtasks": subtaskArray,
        "title": title.value,
        "namesAssignedTo": checkedNames,
        "acronymsAssignedTo": checkedAcronyms,
    })

    closeDialog('edit-contact');
    closeDialog('delete-edit-menu');
    await reloadContacts();
    contact = getCurrentContactById(id);
    contactDetail.innerHTML = generateContactDetailHTML(contact);
} */