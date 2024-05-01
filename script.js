function docID(id) {
    return document.getElementById(id);
}

function renderHeader() {
    docID('body').innerHTML=/*html*/`
    <header>
        <img class="header-logo" src="./assets/img/logo_mobile.svg">
        <div class="header-user">
            <span class="header-user-initials">SM</span>
        </div>
    </header>`;
}

function renderNav() {
    docID('body').innerHTML+=`<nav></nav>`;
}

function renderHeaderNav() {
    renderHeader();
    renderNav();
}