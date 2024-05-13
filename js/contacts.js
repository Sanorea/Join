let arrContacts = [];

function init() {
    renderHeaderNav();
    getContactsData();
    renderContactList();
}


async function getContactsData() {
    let contactData = await loadData("/contacts");
    console.log(contactData);
    saveContactDataInArray(contactData);

    return contactData;
}


function saveContactDataInArray(contactData) {
    arrContacts = [];
    for (let i in contactData) {
        arrContacts.push([i, contactData[i]]);
    }
    console.log(arrContacts);
    console.log(arrContacts[0][1]['contact-email']);
}


async function addContact() {
    let contactInputValues = setContactInputValues();
    await postContactData(contactInputValues.name.value, contactInputValues.email.value, contactInputValues.phone.value, contactInputValues.firstLetterOfName, contactInputValues.acronym, contactInputValues.id);
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
        let lastUsedId = arrContacts[arrContacts.length - 1][1]['contact-id'];
        id = lastUsedId + 1;
    }

    return id;
}


function emptyContactsInput(name, email, phone) {
    name.value = "";
    email.value = "";
    phone.value = "";
}


async function postContactData(name, email, phone, firstLetterOfName, acronym, id) {
    await postData("/contacts", {
        "contact-name": name,
        "contact-email": email,
        "contact-tel": phone,
        "contact-acronym": acronym,
        "first-letter": firstLetterOfName,
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


function renderContactList() {
    let contactList = docID('contact-list');
    contactList.innerHTML = `
    <div class="width-70 contacts-headline-letter-padding">
        <div class="contacts-headline-letter">A</div>   
    </div>
    <div class="contacts-list-seperator width-80"></div>
    <div class="contacts-contact-entry width-70 contacts-df-row-ai-center">
        <div class="contacts-user-initials disp-flex-center-center">AM</div>
        <div class="contacts-disp-flex-ai-start-fd-col contacts-contact"">
            <p class="contacts-name">Anton Meyer</p>
            <p class="contacts-email">anton@meyer.de</p>
        </div>
    </div>

    <div class="width-70 contacts-headline-letter-padding">
        <div class="contacts-headline-letter">B</div>   
    </div>
    <div class="contacts-seperator width-80"></div>
    <div class="contacts-contact-entry width-70 contacts-df-row-ai-center">
        <div class="contacts-user-initials disp-flex-center-center">BS</div>
        <div class="contacts-disp-flex-ai-start-fd-col contacts-contact"">
            <p class="contacts-name">Beate Schulz</p>
            <p class="contacts-email">beate@web.de</p>
        </div>
    </div>
    <button id="show-contact-btn" onclick="openDialog('add-contact')" class="btn-primary btn-wo-icon btn-circle disp-flex-center-center"><img src="/assets/img/person_add.svg" alt=""></button>
    `
}


/* -- might be used later -- */
async function getHeadlineLetters() {
    let contactData = await getContactsData();
    
    for(i = 0; i < contactData.length; i++) {
        let firstLetter = contactData[i]['contact-name'].slice(0,1);
        console.log(firstLetter);
    }
} 
