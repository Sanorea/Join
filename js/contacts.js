async function getContactsData() {
    let contactData = await loadData("/contacts");
    console.log(contactData);
    return contactData;
}

function addContact() {
    let name = docID('contact-name').value;
    let email = docID('contact-email').value;
    let phone = docID('contact-phone').value;
    let firstLetterOfName = getFirstLetter(name);
    let firstLetterofLastName = getFirstLetter(name.split(' ').pop());
    let acronym = firstLetterOfName + firstLetterofLastName;

    postData("/contacts", {
        "contact-name": name,
        "contact-email": email,
        "contact-tel": phone,
        "contact-acronym": acronym,
        "first-letter": firstLetterOfName
    })
}

/* -- might be used later -- */
async function getHeadlineLetters() {
    let contactData = await getContactsData();
    
    for(i = 0; i < contactData.length; i++) {
        let firstLetter = contactData[i]['contact-name'].slice(0,1);
        console.log(firstLetter);
    }
} 


function test() {
    return /*html*/ `<section class="contacts-list contacts-disp-flex-ai-center-fd-col">
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
</section>`;   
}