let arrContacts = [];
let arrHeadlineLetters = [];
let currentId = 0;
let currentOpenedContact = 0;

async function contactsInit() {
    renderHeaderNav();
    await getContactsData();
    renderContactList();
    setActiveButton("contact-list-table", "contacts-contact-entry");
}


async function reloadContacts() {
    await getContactsData();
    renderContactList();
}


async function getContactsData() {
    let contactData = await loadData("/contacts");
    console.log(contactData);
    saveContactDataInArray(contactData);

    return contactData;
}


function getHeadlineLetters() {
    arrHeadlineLetters = [];
    for (i = 0; i < arrContacts.length; i++) {
        let letter = getFirstLetter(arrContacts[i]['contact-name']);
        if (arrHeadlineLetters.indexOf(letter) === -1) {
            arrHeadlineLetters.push(letter);
        }
        arrHeadlineLetters.sort();
    }
    console.log(arrHeadlineLetters);
}


function renderContactList() {
    let arrContactsInList = [];
    let contactList = docID('contact-list');
    contactList.innerHTML = `
    <button id="add-contact-desktop-btn" onclick="openDialog('add-contact')" class="btn-primary btn-add-contact disp-flex-center-center">Add new contact</button>
    <div id="contact-list-table" class="contacts-disp-flex-ai-center-fd-col"></div>`;
    let contactListTable = docID('contact-list-table');
    getHeadlineLetters();
    // for loop to go through every headline letter that exists
    for (let i = 0; i < arrHeadlineLetters.length; i++) {
        contactListTable.innerHTML += generateContactListHTML(arrHeadlineLetters[i]);
        // for loop to check which contacts start with the current headline letter
        for (let j = 0; j < arrContacts.length; j++) {
            let firstLetter = getFirstLetter(arrContacts[j]['contact-name']);
            if (arrHeadlineLetters[i].includes(firstLetter) == true) {
                arrContactsInList.push(arrContacts[j]);
            }
        }
        arrContactsInList.sort((a, b) => (a['contact-name'] > b['contact-name'] ? 1 : -1));
        // for loop to generate HTML for every contact for current headline letter
        for (let k = 0; k < arrContactsInList.length; k++) {
            currentId = arrContactsInList[k]['contact-id'];
            contactListTable.innerHTML += generateContactHTML(arrContactsInList[k], currentId);
        }
        arrContactsInList = [];
    }
    contactListTable.innerHTML += `<button id="show-contact-btn" onclick="openDialog('add-contact')" class="btn-primary btn-wo-icon btn-circle disp-flex-center-center"><img src="/assets/img/person_add.svg" alt=""></button>`
}


function openContactDetails(id) {
    let contact = getCurrentContactById(id);
    let contactDetail = docID('contact-detail');
    currentOpenedContact = id;
    currentScreenWidth = window.innerWidth;
    if (currentScreenWidth < 1017) {
        openDialog('contacts-details');
    }
    contactDetail.innerHTML = generateContactDetailHTML(contact);
    
}

function generateContactDetailHTML(contact) {
    return `
    <div class="contacts-df-row-ai-center contacts-details-contact">
        <div class="contacts-details-user-initials disp-flex-center-center" style="background-color: ${contact['contact-color']}">
            ${contact['contact-acronym']}
        </div>
        <div>
        <p class="contacts-details-name">${contact['contact-name']}</p>
        <div id="edit-delete-desktop-container">
            <div id="edit-btn-desktop" onclick="loadCurrentContact(currentOpenedContact)" class="del-edit-menu-btn"><img id="edit-img" src="/assets/img/edit.svg" alt="">Edit</div>
            <div id="del-btn-desktop" onclick="deleteContact(currentOpenedContact)" class="del-edit-menu-btn"><img id="delete-img" src="/assets/img/delete.svg" alt="">Delete</div>
        </div>
        </div>
    </div>
    <p>Contact Information</p>
    <div class="contacts-disp-flex-ai-start-fd-col gap-22">
        <div class="">
            <p class="fw-700">Email</p>
            <p class="contacts-email">${contact['contact-email']}</p>
        </div>
        <div class="">
            <p class="fw-700">Phone</p>
            <p>${contact['contact-tel']}</p>
        </div>
    </div>
    `
}


function generateContactHTML(contact, id) {
    return `
    <div id="contact${id}" onclick="openContactDetails(${id})" class="contacts-contact-entry width-70 contacts-df-row-ai-center">
        <div class="contacts-user-initials disp-flex-center-center" style="background-color: ${contact['contact-color']}">${contact['contact-acronym']}</div>
        <div class="contacts-disp-flex-ai-start-fd-col contacts-contact"">
            <p class="contacts-name">${contact['contact-name']}</p>
            <p class="contacts-email">${contact['contact-email']}</p>
        </div>
    </div>
    `
}


function generateContactListHTML(headlineLetter) {
    return `
    <div class="width-70 contacts-headline-letter-padding">
        <div class="contacts-headline-letter">${headlineLetter}</div>   
    </div>
    <div class="contacts-list-seperator width-80"></div>
    `
}


function saveContactDataInArray(contactData) {
    let tempArrContacts = [];
    arrContacts = [];
    for (let i in contactData) {
        tempArrContacts.push([i, contactData[i]]);
    }

    for (let i in tempArrContacts) {
        arrContacts.push(tempArrContacts[i][1]);
        arrContacts[i]['unique-key'] = tempArrContacts[i][0];
    }
    console.log(tempArrContacts);
    console.log(arrContacts);
    console.log(arrContacts[0]['contact-email']);
}


async function addContact() {
    let contactInputValues = setContactInputValues();
    await postContactData(contactInputValues.name.value, contactInputValues.email.value, contactInputValues.phone.value, contactInputValues.acronym, contactInputValues.id);
    emptyContactsInput(contactInputValues.name, contactInputValues.email, contactInputValues.phone);
    closeDialog('add-contact');
    reloadContacts();
}


async function deleteContact(id) {
    let contact = getCurrentContactById(id);
    let key = contact['unique-key'];
    await deleteData("/contacts/" + key);
    closeDialog('contacts-details');
    reloadContacts();
}

async function editContact(id) {
    let contact = getCurrentContactById(id);
    let contactDetail = docID('contact-detail');
    let key = contact['unique-key'];
    let name = docID('contact-name-saved').value;
    let email = docID('contact-email-saved').value;
    let phone = docID('contact-phone-saved').value;
    let firstLetterOfName = getFirstLetter(name);
    let firstLetterOfLastName = getFirstLetter(name.split(' ').pop()); // need solution for cases without last name
    let acronym = firstLetterOfName + firstLetterOfLastName;

    await updateData("/contacts/" + key, {
        "contact-name": name,
        "contact-email": email,
        "contact-tel": phone,
        "contact-acronym": acronym,
        "contact-id": id,
        "contact-color": getRandomColor()
    })

    closeDialog('edit-contact');
    closeDialog('delete-edit-menu');
    await reloadContacts();
    contact = getCurrentContactById(id);
    contactDetail.innerHTML = generateContactDetailHTML(contact);
}

function loadCurrentContact(id) {
    let contact = getCurrentContactById(id);
    let name = docID('contact-name-saved');
    let email = docID('contact-email-saved');
    let phone = docID('contact-phone-saved');
    let initials = docID('contacts-user-initials-saved')

    openDialog('edit-contact');

    name.value = contact['contact-name'];
    email.value = contact['contact-email'];
    phone.value = contact['contact-tel'];
    initials.innerHTML = `${contact['contact-acronym']}`
    initials.style = `background-color: ${contact['contact-color']}`
}


function getCurrentContactById(id) {
    let contact = arrContacts.find(entry => entry['contact-id'] === id);
    return contact;
}

function setContactInputValues() {
    let name = docID('contact-name');
    let email = docID('contact-email');
    let phone = docID('contact-phone');
    let firstLetterOfName = getFirstLetter(name.value);
    let firstLetterOfLastName = getFirstLetter(name.value.split(' ').pop()); // need solution for cases without last name
    let acronym = firstLetterOfName + firstLetterOfLastName;
    let id = setID();

    return {
        name,
        email,
        phone,
        firstLetterOfName,
        firstLetterOfLastName,
        acronym,
        id
    }
}


function getRandomColor() {
    const colors = [
      "#9327FF", "#6E52FF", "#FC71FF", "#FFBB2B", "#1FD7C1", "#FF7A00", "#FFC700"
    ];
    let randomColorIndex = Math.floor(Math.random() * colors.length);
    return colors[randomColorIndex];
}


function setID() {
    let id = 0;
    if (arrContacts.length == 0) {
        id = 1;
    } else {
        let lastUsedId = arrContacts[arrContacts.length - 1]['contact-id'];
        id = lastUsedId + 1;
    }

    return id;
}


function emptyContactsInput(name, email, phone) {
    name.value = "";
    email.value = "";
    phone.value = "";
}


async function postContactData(name, email, phone, acronym, id) {
    await postData("/contacts", {
        "contact-name": name,
        "contact-email": email,
        "contact-tel": phone,
        "contact-acronym": acronym,
        "contact-id": id,
        "contact-color": getRandomColor()
    })
}


function openDialog(dialog) {
    let dialogContainer = docID(dialog);
    dialogContainer.classList.remove('closed');
    dialogContainer.classList.add('opened');
    if (dialog == 'delete-edit-menu') {
        element = docID('delete-edit');
        element.classList.remove('d-none')
    }
}


function closeDialog(dialog) {
    let dialogContainer = docID(dialog);
    dialogContainer.classList.remove('opened');
    dialogContainer.classList.add('closed');
    if (dialog == 'delete-edit-menu') {
        element = docID('delete-edit');
        element.classList.add('d-none')
    }
}