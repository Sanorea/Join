

function renderBoardHTML() {
    return /*HTML*/ `
    <div class="top">
            <div class="left-side">
                <div class="board-content"><span class="board-title">Board</span></div>
            <img class="board-add-task cursor" src="assets/img/add-img.svg" alt="">
            </div>
            <div class="board-input-content">
                <input class="board-input" placeholder="Find Task" type="text">
                <button class="board-add-btn cursor">Add Task <img class="board-add-btn-img" src="assets/img/add-white.svg" alt=""></button>
            </div>
        </div>
        <div class="task-body">
            <div class="todo-content">
                <div class="board-body-todo">
                    <div class="body-title-todo">To do</div>
                    <img class="cursor" src="assets/img/plus button mobile.svg#" alt="">
                </div>
                <div id="todo-body-card">
                    <div class="board-todo-drag"><span class="empty-task-text">No Task To do</span></div>
                </div>
            </div>
            <div class="progress-content">
                <div class="board-body-todo">
                    <div class="body-title-progress"> In progress</div>
                    <img class="cursor" src="assets/img/plus button mobile.svg#" alt="">
                </div>
                <div id="progress-body-card">
                    <div class="board-todo-drag"><span class="empty-task-text">No Task in progress</span></div>
                </div>
            </div>
            <div class="feedback-content">
                <div class="board-body-todo">
                    <div class="body-title-feedback">Await feedback</div>
                    <img class="cursor" src="assets/img/plus button mobile.svg#" alt="">
                </div>
                <div id="feedback-body-card">
                    <div class="board-todo-drag"><span class="empty-task-text">No task in Feedback</span></div>
                </div>
            </div>
            <div class="done-content">
                <div class="board-body-todo">
                    <div class="body-title-done">Done</div>
                    <img class="cursor" src="assets/img/plus button mobile.svg#" alt="">
                </div>
                <div id="done-body-card">
                    <div class="board-todo-drag"><span class="empty-task-text">No Task in done</span></div>
                </div>
            </div>
        </div>
    </div>
    `;
}

function renderCardHTML() {
    return /*HTML*/ `
    <div class="card-content">
        <div class="headline-card">User Story</div>
        <div class="card-title">Kochwelt Page & Recipe Recommender</div>
        <div class="card-subtitle">Build start page with recipe recommendation wjkfviwjfviw</div>
        <div class="card-subtask">
            <div class="bar">
                <div class="w3-light-grey">
                    <div class="w3-container w3-green w3-center" style="width:50%"></div>
                </div><br>
            </div>
            <div class="subtask-content">
                <div class="counter">1/2</div>
                <div class="subtask">Subtask</div>
            </div>
        </div>
        <div class="card-info">
            <div class="card-prfile"></div>
            <div class="card-difficulty"></div>
        </div>
    </div>
    `;
}

function renderSideNavHTML(id, renderClass) {
    docID('sideNav').innerHTML = /*HTML*/`<div class="sideNav-logo">
    <img src="assets/img/Capa 1.svg" alt="">
</div>
<a href="summary.html"><div id="edit-sideNav" class="sideNav-links">
    <div class="sideNav-summary" id="summary-link">
        <img src="assets/img/Vector.svg" alt="">
        <span class="sideNav-text">Summary</span>
    </div></a>
    <a href="add_tasks.html"><div class="sideNav-summary" id="add-task-link">
        <img src="assets/img/edit_square.svg" alt="">
        <span class="sideNav-text">Add Task</span>
    </div></a>
    <a href="board.html"><div class="sideNav-summary" id="board-link">
        <img src="assets/img/vec.svg" alt="">
        <span class="sideNav-text">Board</span>
    </div></a>
     <a href="contacts.html"><div class="sideNav-summary" id="">
        <img src="assets/img/perm_contact_calendar.svg" alt="">
        <span class="sideNav-text">Contacts</span>
    </div></a>
</div>
<div id="edit-content" class="sideNav-policy-content">
    <a class="sideNav-policy-a" href="../legal_notice.html"><span class="sideNav-policy">Privacy Policy</span></a>
    <a class="sideNav-policy-a" href="../privacy_policy.html"><span class="sideNav-notice">Legal notice</span></a>
</div>`;
}


function renderNav() {
    docID('nav').innerHTML += /*html*/`
        <div class="nav-bar-input">
            <a class="nav-bar-icon-bg" href="/summary.html">
                <div class="nav-bar-container">
                    <img class="nav-bar-icon" src="/assets/img/summary_icon.svg" alt="summary">
                    <p class="nav-bar-links">Summary</p>
                </div>
            </a>
            <a class="nav-bar-icon-bg" href="/board.html">
                <div class="nav-bar-container">
                    <img class="nav-bar-icon" src="/assets/img/board_icon.svg" alt="board">
                    <p class="nav-bar-links">Board</p>
                </div>
            </a>
            <a class="nav-bar-icon-bg" href="/add_tasks.html">
                <div class="nav-bar-container">
                    <img class="nav-bar-icon" src="/assets/img/addTask_icon.svg" alt="addTask">
                    <p class="nav-bar-links">Add Task</p>
                </div>
            </a>
            <a class="nav-bar-icon-bg" href="/contacts.html">
                <div class="nav-bar-container">
                    <img class="nav-bar-icon" src="/assets/img/contacts_icon.svg" alt="contacts">
                    <p class="nav-bar-links">Contacts</p>
                </div>
            </a>
        </div>
    `;
}

function renderHeader(firstLetter, id, renderClass) {
    docID('header').innerHTML =/*html*/`

    <img class="header-logo" src="./assets/img/logo_mobile.svg">
    <div class="header-text">Kanban Project Management Tool</div>
    <div class="top-right-infos">
    <img class="info-img" src="./assets/img/help.svg" alt="">
    <div class="header-user dropdown" onclick="dropDownMenu()">
        <span class="header-user-initials dropdown">${firstLetter}</span>
        <div id="myDropdown" class="dropdown-content">
        <a class="help-d-none" href="#">Help</a>
        <a href="../legal_notice.html">Legal Notice</a>
        <a href="../privacy_policy.html">Privacy Policy</a>
        <a onclick="clearTheLocalStorage()" href="index.html">Log out</a>
  </div>
    </div>
  </div>
    `;
}

function renderHeaderNav(id, renderClass) {
    switchId = id;
    switchClass = renderClass;
    let finishFirstletter = getFirstLetter(localStorageName);
    renderHeader(finishFirstletter, id, renderClass);
    renderNav();
    renderSideNavHTML(id, renderClass);
}