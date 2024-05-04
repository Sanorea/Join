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
    docID('nav').innerHTML += /*html*/`

        <div class="nav-bar-icon-bg">
            <div class="nav-bar-container">
                <img class="nav-bar-icon" src="/assets/img/summary_icon.svg" alt="summary">
                <p>Summary</p>
            </div>
        </div>
        <div class="nav-bar-icon-bg">
            <div class="nav-bar-container">
                <img class="nav-bar-icon" src="/assets/img/board_icon.svg" alt="board">
                <p>Board</p>
            </div>
        </div>
        <div class="nav-bar-icon-bg">
            <div class="nav-bar-container">
                <img class="nav-bar-icon" src="/assets/img/addTask_icon.svg" alt="addTask">
                <p>Add Task</p>
            </div>
        </div>
        <div class="nav-bar-icon-bg">
            <div class="nav-bar-container">
                <img class="nav-bar-icon" src="/assets/img/contacts_icon.svg" alt="contacts">
                <p>Contacts</p>
            </div>
        </div>
    `;
}

function renderHeaderNav() {
    renderHeader();
    renderNav();
}
