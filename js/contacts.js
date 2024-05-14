let arrContacts = [];
let arrHeadlineLetters = [];
let currentId = 0;

async function init() {
    renderHeaderNav();
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
    getHeadlineLetters();
    // for loop to go through every headline letter that exists
    for (let i = 0; i < arrHeadlineLetters.length; i++) {
        contactList.innerHTML += generateContactListHTML(arrHeadlineLetters[i]);
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
            contactList.innerHTML += generateContactHTML(arrContactsInList[k], currentId);
        }
        arrContactsInList = [];
    }
    contactList.innerHTML += `<button id="show-contact-btn" onclick="openDialog('add-contact')" class="btn-primary btn-wo-icon btn-circle disp-flex-center-center"><img src="/assets/img/person_add.svg" alt=""></button>`
}


function generateContactHTML(contact, id) {
    return `
    <div id="contact${id}" class="contacts-contact-entry width-70 contacts-df-row-ai-center">
        <div class="contacts-user-initials disp-flex-center-center">${contact['contact-acronym']}</div>
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
    getContactsData();
    renderContactList();
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
        "contact-id": id
    })
}


function openDialog(dialog) {
    let dialogContainer = docID(dialog);
    dialogContainer.classList.remove('closed');
    dialogContainer.classList.add('opened');
}


function closeDialog(dialog) {
    let dialogContainer = docID(dialog);
    dialogContainer.classList.remove('opened');
    dialogContainer.classList.add('closed');
}