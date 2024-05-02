function docID(id) {
    return document.getElementById(id);
}

function renderHeader() {
    docID('header').innerHTML =/*html*/`

    <img class="header-logo" src="./assets/img/logo_mobile.svg">
    <div class="header-user">
        <span class="header-user-initials">SM</span>
    </div>
    `;
}

function renderNav() {
    docID('nav').innerHTML += `<nav></nav>`;
}

function renderHeaderNav() {
    renderHeader();
    renderNav();
}
