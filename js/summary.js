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
}

let date = new Date();
let hour = date.getHours();
let minute = date.getMinutes();
let time = hour + "." + minute;


/**
 * Retrieves and processes task data to update task summaries.
 * 
 * This function performs the following actions:
 * 1. Fetches task data from a data source.
 * 2. Counts tasks in different categories.
 * 3. Counts urgent tasks.
 * 4. Sets the date for the next urgent task.
 * 
 * It ensures that the latest task data is fetched and processed to provide an updated summary.
 * 
 * @returns {Promise<void>} A promise that resolves when all processing tasks are complete.
 * */
async function getTaskSummaryCount() {
    await getTaskData();

    countTasksInCategories();
    countUrgentTasks();
    setNextUrgentTaskDate();
} 

/**
 * Counts the number of tasks in each category and updates the corresponding counters.
 * 
 * This function iterates through an array of tasks and counts how many tasks fall into each of the following categories:
 * - 'toDo'
 * - 'inProgress'
 * - 'awaitFeedback'
 * - 'done'
 * 
 * The counters for each category are updated accordingly.
 * 
 * Assumptions:
 * - `arrTasks` is a global or accessible array containing task objects.
 * - `toDoCounter`, `inProgressCounter`, `awaitFeedbackCounter`, and `doneCounter` are global or accessible counters.
 * 
 * @returns {void}
 * */

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

/**
 * Counts the number of urgent tasks and collects their due dates.
 * 
 * This function iterates through an array of tasks and identifies tasks with a priority of 'urgent'. It increments
 * the count of urgent tasks and collects their due dates into an array.
 * 
 * Assumptions:
 * - `arrTasks` is a global or accessible array containing task objects.
 * - `urgentCounter` is a global or accessible counter for the number of urgent tasks.
 * - `urgentTaskDates` is a global or accessible array for storing the due dates of urgent tasks.
 * 
 * @returns {void}
 * 
*/

function countUrgentTasks() {
    for (let i = 0; i < arrTasks.length; i++) {
        if (arrTasks[i]['prio'] === "urgent") {
            urgentCounter += 1;
            urgentTaskDates.push(arrTasks[i]['date']);
        }
    }
}

/**
 * Determines and sets the date for the next upcoming urgent task.
 * 
 * This function processes an array of urgent task due dates to find the earliest date. It then formats this date as a
 * human-readable string. If there are no urgent tasks, it sets a default message indicating that no urgent tasks are available.
 * 
 * Assumptions:
 * - `urgentTaskDates` is a global or accessible array containing due dates of urgent tasks in ISO format.
 * - `upcomingDate` is a global or accessible variable where the formatted date of the next urgent task is stored.
 * 
 * @returns {void}
 * 
*/

function setNextUrgentTaskDate() {
    if (urgentTaskDates.length > 0) {
        var minDate = urgentTaskDates.reduce(function (a, b) { return a < b ? a : b; }); 

        upcomingDate = minDate ? new Date(minDate).toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' }) : 'No urgent task';
    } else {
        upcomingDate = "No urgent task available"
    }
}

/**
 * Generates and returns the HTML content for the summary page.
 * 
 * This function constructs the HTML for displaying a summary page with various metrics, including task counters and urgent task deadlines.
 * It uses template literals to insert dynamic data into the HTML structure.
 * 
 * Assumptions:
 * - `toDoCounter`, `doneCounter`, `urgentCounter`, `upcomingDate`, `arrTasks.length`, `inProgressCounter`, and `awaitFeedbackCounter` are global or accessible variables containing relevant data.
 * 
 * @returns {string} The HTML string representing the summary page content.
 * 
 * @example
 * // Example usage:
 * const summaryHTML = renderSummaryHTML();
 * document.getElementById('summary-container').innerHTML = summaryHTML;
 */

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

/**
 * Loads the welcome screen and greeting text into the designated elements.
 * 
 * This function sets the inner HTML of the welcome screen and greet body elements with a welcome message.
 * It generates the welcome message based on the current date and time, and inserts it into the respective HTML elements.
 * 
 * Assumptions:
 * - `docID` is a utility function to select DOM elements by their IDs.
 * - `loadDateTime` is a function that returns a string with the current date and time.
 * - `renderWelcomeHTML` is a function that generates HTML for the welcome screen based on a provided greeting text.
 * 
 * @function
 * @returns {void}
 * 
 * @example
 * // Example usage:
 * loadTheWelcomeScreen();
 */

function loadTheWelcomeSreen() {
    let greetBody = docID('greet-body');
    let welcomeScreen = docID('welcomeScreen');
    let greetText = loadDateTime();
    welcomeScreen.innerHTML = renderWelcomeHTML(greetText);
    greetBody.innerHTML = renderWelcomeHTML(greetText);
}

/**
 * Renders the HTML for the welcome message with a personalized greeting.
 * 
 * This function generates HTML content that includes a greeting text and the user's name
 * (retrieved from local storage). The HTML content is used to display a personalized
 * welcome message on the screen.
 * 
 * @function
 * @param {string} greetText - The greeting text to be displayed, such as a time-based greeting (e.g., "Good Morning").
 * @returns {string} The generated HTML string containing the personalized welcome message.
 * 
 * @example
 * // Example usage:
 * const greeting = "Good Morning";
 * const welcomeHTML = renderWelcomeHTML(greeting);
 * console.log(welcomeHTML);
 */

function renderWelcomeHTML(greetText) {
    return /*HTML*/ `
    <div class="greet">
      <div class="greet-text">${greetText},</div>
      <div class="greet-name">${localStorageName}</div>
    </div>  
  `;
}

/**
 * Stores a key-value pair in the browser's local storage.
 * 
 * This function saves a JavaScript object or value in the local storage by converting it into a JSON string.
 * It allows you to persist data across browser sessions.
 * 
 * @function
 * @param {string} key - The key under which the data is stored in local storage. This key should be unique within the local storage.
 * @param {*} data - The data to be stored. This can be any JavaScript value or object. The data will be serialized into a JSON string before being stored.
 * 
 * @example
 * // Example usage:
 * setItemLocalStorage('user', { name: 'Alice', age: 30 });
 * // The data `{ name: 'Alice', age: 30 }` will be stored in local storage under the key 'user'.
 */

function setItemLocalStorage(key, data) {
    localStorage.setItem(key, JSON.stringify(data));
}

/**
 * Retrieves and parses a value from the browser's local storage.
 * 
 * This function fetches a JSON string from local storage using the provided key and parses it back into
 * a JavaScript object or value. If the key does not exist in local storage, it returns `null`.
 * 
 * @function
 * @param {string} key - The key for the item to retrieve from local storage. This should match the key used when storing the item.
 * @returns {*} The parsed JavaScript object or value stored under the specified key, or `null` if the key does not exist in local storage.
 * 
 * @example
 * // Example usage:
 * const user = getItemLocalStorage('user');
 * console.log(user); // Outputs the parsed object stored under the key 'user', or `null` if not found.
 */

function getItemLocalStorage(key) {
    return JSON.parse(localStorage.getItem(key))
}

/**
 * Determines the appropriate greeting based on the current time.
 * 
 * This function returns a greeting based on the hour of the day. It checks the current time and returns
 * a greeting such as "Good morning", "Good afternoon", "Good evening", or "Good night" based on the time of day.
 * 
 * @function
 * @returns {string} A greeting message based on the current time of day.
 * 
 * @example
 * // Example usage:
 * const greeting = loadDateTime();
 * console.log(greeting); // Outputs a greeting based on the current time, e.g., "Good morning".
 */

function loadDateTime() {
    if (time >= 6.00 && time <= 11.59) {
        return 'Good morning'
    } if (time >= 12.00 && time <= 16.59) {
        return 'Good afternoon'
    } if (time >= 17.00 && time <= 21.59) {
        return 'Good evening'
    } if (time >= 22.00 && time <= 24.00) {
        return 'Good night'
    } if (time >= 0.00 && time <= 5.59) {
        return 'Good night'
    }
}