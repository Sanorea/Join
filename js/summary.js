let toDoCounter = 0;
let inProgressCounter = 0;
let awaitFeedbackCounter = 0;
let doneCounter = 0;
let urgentCounter = 0;
let upcomingDate = '';

let urgentTaskDates = [];

async function initSummary(id, renderClass) {
    renderHeaderNav(id, renderClass);
    await getTaskSummaryCount();
    docID('body-summary-content').innerHTML = renderSummaryHTML();
    loadTheWelcomeSreen();
    // loadFocus();
    // renderSideNavHTML(id, renderClass);
}

let date = new Date();
let hour = date.getHours();
let minute = date.getMinutes();
let time = hour + "." + minute;
console.log(time)

async function getTaskSummaryCount() {
    await getTaskData();

    countTasksInCategories();
    countUrgentTasks();
    setNextUrgentTaskDate();
} 

function countTasksInCategories() {
    for (let i = 0; i < arrTasks.length; i++) {
        switch (arrTasks[i]['boardCategory']) {
            case 'toDo':
                toDoCounter += 1;
                break;
            case 'inProgress':
                inProgressCounter += 1;
                break;
            case 'awaitFeedback':
                awaitFeedbackCounter += 1;
                break;
            case 'done':
                doneCounter += 1;
                break;
        }
    }
}

function countUrgentTasks() {
    for (let i = 0; i < arrTasks.length; i++) {
        if (arrTasks[i]['prio'] === "urgent") {
            urgentCounter += 1;
            urgentTaskDates.push(arrTasks[i]['date']);
        }
    }
}

function setNextUrgentTaskDate() {
    if (urgentTaskDates.length > 0) {
        var minDate = urgentTaskDates.reduce(function (a, b) { return a < b ? a : b; }); 

        upcomingDate = minDate ? new Date(minDate).toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' }) : 'No urgent task';
    } else {
        upcomingDate = "No urgent task available"
    }
}

function renderSummaryHTML() {
    return /*HTML*/ `
    <div class="body-content">
      <div class="top-header">
              <div class="join360-contrent"><span class="join360">Join 360</span></div>
              <div class="switch">
                <div class="key-metrics-content"><span class="key-metrics">Key Metrics at a Glance</span></div>
                <div class="top-underline"></div>
              </div>
          </div>
          <div class="cards-body">
              <div class="first-row">
                  <div class="to-do-card card-hover">
                      <div class=""><img class="to-do-card-img" src="/assets/img/Frame 59.svg" alt=""></div>
                      <div class="to-do-card-counter">
                          <div class="counter"><span class="black">${toDoCounter}</span></div>
                          <div class="card-info"><span class="focus-color">To-do</span></div>
                      </div>
                  </div>
                  <div class="done-card card-hover">
                      <div class=""><img class="to-do-card-img" src="/assets/img/Group 7.svg" alt=""></div>
                      <div class="to-do-card-counter">
                          <div class="counter"><span class="black">${doneCounter}</span></div>
                          <div class="card-info"><span class="focus-color">Done</span></div>
                      </div>
                  </div>
              </div>
              <div class="second-row card-hover">
                  <div class="urgent-left">
                      <div class=""><img class="to-do-card-img" src="assets/img/Group 7 logo.svg" alt=""></div>
                      <div class="urgent-counter">
                          <div class="counter"><span class="black">${urgentCounter}</span></div>
                          <div class="card-info"><span class="focus-color">Urgent</span></div>
                      </div>
                  </div>
                  <div class="intermediate-line"></div>
                  <div class="urgent-right">
                      <div class="date"><span class="black">${upcomingDate}</span></div>
                      <div class="upcoming-deadline"><span class="focus-color">Upcoming Deadline</span></div>
                  </div>
              </div>
              <div class="third-row">
                  <div class="board-card card-hover">
                      <div class="counter"><span class="black">${arrTasks.length}</span></div>
                      <div class="board-info"><span class="focus-color">Tasks in Board</span></div>
                  </div>
                  <div class="board-card card-hover">
                      <div class="counter"><span class="black">${inProgressCounter}</span></div>
                      <div class="progress-info"><span class="focus-color">Tasks In<br>Progress</span></div>
                  </div>
                  <div class="board-card card-hover">
                      <div class="counter"><span class="black">${awaitFeedbackCounter}</span></div>
                      <div class="feedback-info"><span class="focus-color">Awaiting Feedback</span></div>
                  </div>
              </div>
          </div>
        </div>
        <div id="welcomeScreen" class="welcome"></div>
        <div class="greet-body" id="greet-body"></div>
    `;
}

function loadTheWelcomeSreen() {
    let greetBody = docID('greet-body');
    let welcomeScreen = docID('welcomeScreen');
    let greetText = loadDateTime();
    welcomeScreen.innerHTML = renderWelcomeHTML(greetText);
    greetBody.innerHTML = renderWelcomeHTML(greetText);
}

function renderWelcomeHTML(greetText) {
    return /*HTML*/ `
    <div class="greet">
      <div class="greet-text">${greetText},</div>
      <div class="greet-name">${localStorageName}</div>
    </div>  
  `;
}

function setItemLocalStorage(key, data) {
    localStorage.setItem(key, JSON.stringify(data));
}

function getItemLocalStorage(key) {
    return JSON.parse(localStorage.getItem(key))
}

function loadDateTime() {
    if (time > 6.00 && time < 11.59) {
        return 'Good morning'
    } if (time > 12.00 && time < 16.59) {
        return 'Good afternoon'
    } if (time > 17.00 && time < 21.59) {
        return 'Good evening'
    } if (time > 22.00 && time < 24.00) {
        return 'Good night'
    } if (time > 0.00 && time < 5.00) {
        return 'Good night'
    }
}

// function loadFocus(){
//     let id = docID('summary-link'); 
//     id.classList.add('sideNav-summary-focus');
// };

