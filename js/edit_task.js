


function editCard(key) {
    console.log('key :>> ', key);
/*     let title = docID('add-task-input-title');
    let description = docID('add-task-input-description');
    let date = docID('add-task-input-date');
    let categorie = docID('categories');
    title.value = 'test';
    description.value = 'test';
    date.value = '1991-05-14';
    categorie.value = 'Technical Task'; */
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