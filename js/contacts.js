async function getContactsData() {
    let contactData = await loadData("/contacts");
    console.log(contactData);
    return contactData;
}


async function addContact() {
    let name = docID('contact-name');
    let email = docID('contact-email');
    let phone = docID('contact-phone');
    let firstLetterOfName = getFirstLetter(name.value);
    let firstLetterOfLastName = getFirstLetter(name.value.split(' ').pop()); // need solution for cases without last name
    let acronym = firstLetterOfName + firstLetterOfLastName;

    await postContactData(name.value, email.value, phone.value, firstLetterOfName, acronym);
    emptyContactsInput(name, email, phone);
}


function emptyContactsInput(name, email, phone) {
    name.value = "";
    email.value = "";
    phone.value = "";
}


async function postContactData(name, email, phone, firstLetterOfName, acronym) {
    await postData("/contacts", {
        "contact-name": name,
        "contact-email": email,
        "contact-tel": phone,
        "contact-acronym": acronym,
        "first-letter": firstLetterOfName
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


function renderAddContact() {
    let addContactSite = docID('add-contact');
    addContactSite.innerHTML = `
    <section id="add-contact" class="contacts-disp-flex-ai-center-fd-col">
        <div class="bg">
            <div class="contacts-top-half contacts-disp-flex-center-center-col">
                <div class="width-80 contacts-disp-flex-ai-start-fd-col gap-16">
                    <h1 class="color-white fw-700">Add contact</h1>
                    <p class="color-white fw-400">Tasks are better with a team!</p>
                    <div class="contacts-details-seperator"></div>
                </div>
            </div>
            <div class="contacts-management-user-initials disp-flex-center-center">AM</div>
            <div class="contacts-bottom-half contacts-disp-flex-center-center-col gap-22">
                <form class="contacts-disp-flex-center-center-col gap-16 mt-60 width-100" action="">
                    <input required id="contact-name" class="icon-contact-person contacts-input width-80" placeholder="Name" type="text">
                    <input required id="contact-email" class="icon-contact-mail contacts-input width-80" placeholder="EMail" type="email">
                    <input required id="contact-phone" class="icon-contact-phone contacts-input width-80" placeholder="Phone" type="tel">
                </form>
                <button onclick="addContact()" class="btn-primary btn-create disp-flex-center-center">Create contact</button>
            </div> 
        </div>
    </section>`
}


/* -- might be used later -- */
async function getHeadlineLetters() {
    let contactData = await getContactsData();
    
    for(i = 0; i < contactData.length; i++) {
        let firstLetter = contactData[i]['contact-name'].slice(0,1);
        console.log(firstLetter);
    }
} 
