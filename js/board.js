function initBoard(id, renderClass) {
    document.getElementById(id).innerHTML = renderBoardHTML();
    // renderSideNavHTML(id, renderClass);
    renderHeaderNav(id, renderClass);
    renderInToDo();
}

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

function renderInToDo(){
    let body = document.getElementById('todo-body-card');
    body.innerHTML = renderCardHTML();
}

// function sideNavPolicy() {
//     let body = docID('body-summary-content');
//     body.classList.remove('body-summary');
//     body.innerHTML = renderLegalNotice();
// }

// function sideNavNotice() {
//     let body = docID('body-summary-content');
//     body.classList.remove('body-summary');
//     body.innerHTML = renderPrivacyPolice();
// }

// function backToSite() {
//     let body = docID('body-summary-content');
//     let greetBody = docID('greet-body');
//     body.innerHTML = renderSummaryHTML();
//     greetBody = loadTheWelcomeSreen();
//     body.classList.add('body-summary');
// }