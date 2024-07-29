let arrContacts = [];
let arrHeadlineLetters = [];
let currentId = 0;
let currentOpenedContact = 0;

/**
 * Initiate the contacts site.
 */
async function contactsInit() {
    renderHeaderNav();
    await getContactsData();
    renderContactList();
    setActiveButton("contact-list-table", "contacts-contact-entry");
}

/**
 * This function is used to reload the contact list with the currently stored data.
 */
async function reloadContacts() {
    await getContactsData();
    renderContactList();
}

/** 
 * Gets the stored data from the backend and converts it into an array.
 * @returns an array with all the contact data.
 */
async function getContactsData() {
    let contactData = await loadData("/contacts");
    saveContactDataInArray(contactData);

    return contactData;
}

/**
 * Determines the headline letters for the contacts list in upper case. Sorts through the headline letters to save it in alphabetical order.
 */
function getHeadlineLetters() {
    arrHeadlineLetters = [];
    for (i = 0; i < arrContacts.length; i++) {
        let firstLetter = getFirstLetter(arrContacts[i]['contact-name']);
        let letter = firstLetter.toUpperCase();
        if (arrHeadlineLetters.indexOf(letter) === -1) {
            arrHeadlineLetters.push(letter);
        }
        arrHeadlineLetters.sort();
    }
}

/**
 * Renders the contact list with the contacts put in the correct categories (headline letters).
 */
function renderContactList() {
    let arrContactsInList = [];
    let contactList = docID('contact-list');
    contactList.innerHTML = `
    <button id="add-contact-desktop-btn" onclick="openDialog('add-contact')" class="btn-primary btn-add-contact disp-flex-center-center">Add new contact</button>
    <div id="contact-list-table" class="contacts-disp-flex-ai-center-fd-col"></div>`;
    let contactListTable = docID('contact-list-table');
    getHeadlineLetters();
    for (let i = 0; i < arrHeadlineLetters.length; i++) {
        contactListTable.innerHTML += generateContactListHTML(arrHeadlineLetters[i]);
        for (let j = 0; j < arrContacts.length; j++) {
            let firstLetter = getFirstLetter(arrContacts[j]['contact-name']);
            if (arrHeadlineLetters[i].includes(firstLetter.toUpperCase()) == true) {
                arrContactsInList.push(arrContacts[j]);
            }
        }
        arrContactsInList.sort((a, b) => (a['contact-name'] > b['contact-name'] ? 1 : -1));
        for (let k = 0; k < arrContactsInList.length; k++) {
            currentId = arrContactsInList[k]['contact-id'];
            contactListTable.innerHTML += generateContactHTML(arrContactsInList[k], currentId);
        }
        arrContactsInList = [];
    }
    contactListTable.innerHTML += `<button id="show-contact-btn" onclick="openDialog('add-contact')" class="btn-primary btn-wo-icon btn-circle disp-flex-center-center"><img src="/assets/img/person_add.svg" alt=""></button>`
}

/**
 * Shows the contact details for the currently selected contact.
 * @param {number} id - The ID of the currently selected contact.
 */
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


/**
 * Generates the HTML for the contact details.
 * @param {array} contact - Array with all information of the currently generated contact.
 * @returns {string} - The HTML string representing the contact details.
 */
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
    </div>`
}

/**
 * Generates the contact entry in the contact list.
 * @param {array} contact - Array with all information of the currently generated contact list entry.
 * @param {number} id - The ID of the currently generated contact list entry.
 * @returns {string} - The HTML string representing the contact list entry.
 */
function generateContactHTML(contact, id) {
    return `
    <div id="contact${id}" onclick="openContactDetails(${id})" class="contacts-contact-entry width-70 contacts-df-row-ai-center">
        <div class="contacts-user-initials disp-flex-center-center" style="background-color: ${contact['contact-color']}">${contact['contact-acronym']}</div>
        <div class="contacts-disp-flex-ai-start-fd-col contacts-contact"">
            <p class="contacts-name">${contact['contact-name']}</p>
            <p class="contacts-email">${contact['contact-email']}</p>
        </div>
    </div>`
}

/**
 * Generates the headlines for the contact list.
 * @param {string} headlineLetter - First letter of all the contacts listed in the category.
 * @returns - The HTML string representing the contact list headlines.
 */
function generateContactListHTML(headlineLetter) {
    return `
    <div class="width-70 contacts-headline-letter-padding">
        <div class="contacts-headline-letter">${headlineLetter}</div>   
    </div>
    <div class="contacts-list-seperator width-80"></div>`
}

/**
 * Converts the data from backend to an array and also saves the unique key per entry in this array.
 * @param {Object} contactData - An object containing contact data, where each key-value pair represents a contact.
 */
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
}

/**
 * Saves new contacts to the backend storage.
 */
async function addContact() {
    let contactInputValues = setContactInputValues();
    await postContactData(contactInputValues.name.value, contactInputValues.email.value, contactInputValues.phone.value, contactInputValues.acronym.toUpperCase(), contactInputValues.id);
    emptyContactsInput(contactInputValues.name, contactInputValues.email, contactInputValues.phone);
    openDialog('contact-created-popup');

    setTimeout(() => {
        closeDialog('contact-created-popup');
      }, 1500);

    closeDialog('add-contact');
    reloadContacts();
}

/**
 * Deletes currently selected contact.
 * @param {number} id - The ID of the currently selected contact.
 */
async function deleteContact(id) {
    let contact = getCurrentContactById(id);
    let key = contact['unique-key'];
    await deleteData("/contacts/" + key);
    closeDialog('contacts-details');
    emptyContactDetails();
    reloadContacts();
}

/**
 * Clears the contact detail HTML element.
 */
function emptyContactDetails() {
    let details = docID('contact-detail');
    details.innerHTML = '';
}

/**
 * Saves edited contact data to backend storage.
 * @param {number} id - The ID of the currently selected contact.
 */
async function editContact(id) {
    let contact = getCurrentContactById(id);
    let contactDetail = docID('contact-detail');
    let key = contact['unique-key'];
    let name = docID('contact-name-saved').value;
    let email = docID('contact-email-saved').value;
    let phone = docID('contact-phone-saved').value;
    let acronym = setInitials(name);

    await updateData("/contacts/" + key, {
        "contact-name": name,
        "contact-email": email,
        "contact-tel": phone,
        "contact-acronym": acronym.toUpperCase(),
        "contact-id": id,
        "contact-color": getRandomColor()
    })

    closeDialog('edit-contact');
    closeDialog('delete-edit-menu');
    await reloadContacts();
    contact = getCurrentContactById(id);
    contactDetail.innerHTML = generateContactDetailHTML(contact);
}

/**
 * Opens dialog to edit the contact and show the currently saved contact data in the input
 * fields.
 * @param {number} id - The ID of the currently selected contact.
 */
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

/**
 * Determines the currently selected contact by finding the ID in the contact array.
 * @param {number} id - The ID of the currently selected contact.
 * @returns {array} - Contact data determined based on the ID.
 */
function getCurrentContactById(id) {
    let contact = arrContacts.find(entry => entry['contact-id'] === id);
    return contact;
}

/**
 * Sets the input data from the add contact form.
 * @returns {array} - Array of all input data.
 */
function setContactInputValues() {
    let name = docID('contact-name');
    let email = docID('contact-email');
    let phone = docID('contact-phone');
    let acronym = setInitials(name);
    let id = setID();

    return {
        name,
        email,
        phone,
        acronym,
        id
    }
}

/**
 * Sets the first letter of the name and the first letter of the last name if a last name exists.
 * @param {string} name - Complete name of the currently added contact.
 * @returns {string} - Initials determined by the first letters of the name.
 */
function setInitials(name) {
    let names = name.value.split(' ');
    let firstLetterOfName = getFirstLetter(names[0]);
    let firstLetterOfLastName;
    
    if (names.length > 1) {
        firstLetterOfLastName = getFirstLetter(names[names.length - 1]);
    } else {
        firstLetterOfLastName = '';
    }
    
    let initials = firstLetterOfName + firstLetterOfLastName;

    return initials;
}

/**
 * Gets random color of a pre-defined array.
 * @returns {string} - Random color string.
 */
function getRandomColor() {
    const colors = [
      "#9327FF", "#6E52FF", "#FC71FF", "#FFBB2B", "#1FD7C1", "#FF7A00", "#FFC700"
    ];
    let randomColorIndex = Math.floor(Math.random() * colors.length);
    return colors[randomColorIndex];
}

/**
 * Sets the ID based on the last entry of the contact data by incrementing the determined value by 1.
 * @returns {number} - ID for newly added contact.
 */
function setID() {
    let id = 0;
    if (arrContacts.length == 0) {
        id = 100;
    } else {
        let sort = arrContacts.sort((a,b) => (a['contact-id'] - b['contact-id']));
        let lastUsedId = sort[arrContacts.length - 1]['contact-id'];
        id = lastUsedId + 1;
    }

    return id;
}

/**
 * Empties input fields of add contact form. 
 * @param {string} name - Emptied name input field.
 * @param {string} email - Emptied email input field. 
 * @param {string} phone  - Emptied phone input field.
 */
function emptyContactsInput(name, email, phone) {
    name.value = "";
    email.value = "";
    phone.value = "";
}

/**
 * Posts newly added contact to backend storage.
 * @param {string} name - Name of newly added contact.
 * @param {string} email - Email of newly added contact.
 * @param {string} phone - Phone number of newly added contact. 
 * @param {string} acronym - Initials of newly added contact. 
 * @param {number} id - ID of newly added contact.
 */
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

/**
 * Opens dialog popup.
 * @param {string} dialog - Document ID of HTML element.
 */
function openDialog(dialog) {
    let dialogContainer = docID(dialog);
    dialogContainer.classList.remove('closed');
    dialogContainer.classList.add('opened');
    if (dialog == 'delete-edit-menu') {
        element = docID('delete-edit');
        element.classList.remove('d-none')
    }
}

/**
 * Closes dialog popup.
 * @param {string} dialog - Document ID of HTML element.
 */
function closeDialog(dialog) {
    let dialogContainer = docID(dialog);
    dialogContainer.classList.remove('opened');
    dialogContainer.classList.add('closed');
    if (dialog == 'delete-edit-menu') {
        element = docID('delete-edit');
        element.classList.add('d-none')
    }
}