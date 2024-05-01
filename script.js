function docID(id) {
    return document.getElementById(id);
}

function renderHeader() {
    docID('body').innerHTML=/*html*/`
    <header>
        <img src="./assets/img/logo_mobile.svg">
        <div class="">G</div>
    </header>`;
}

function renderNav() {
    docID('body').innerHTML+=`<nav></nav>`;
}

function renderHeaderNav() {
    renderHeader();
    renderNav();
}


