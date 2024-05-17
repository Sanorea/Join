function initSummary(){
    renderHeaderNav();
    docID('body').innerHTML = renderSummaryHTML();
}

function renderSummaryHTML(){
    return /*HTML*/ `
    <div class="top-header">
            <div class="join360-contrent"><span class="join360">Join 360</span></div>
            <div class="key-metrics-content"><span class="key-metrics">Key Metrics at a Glance</span></div>
            <div class="top-underline"></div>
        </div>
        <div class="cards-body">
            <div class="first-row">
                <div class="to-do-card card-hover">
                    <div class=""><img class="to-do-card-img" src="/assets/img/Frame 59.svg" alt=""></div>
                    <div class="to-do-card-counter">
                        <div class="counter"><span class="black">1</span></div>
                        <div class="card-info"><span class="focus-color">To-Do</span></div>
                    </div>
                </div>
                <div class="done-card card-hover">
                    <div class=""><img class="to-do-card-img" src="/assets/img/Group 7.svg" alt=""></div>
                    <div class="to-do-card-counter">
                        <div class="counter"><span class="black">1</span></div>
                        <div class="card-info"><span class="focus-color">Done</span></div>
                    </div>
                </div>
            </div>
            <div class="second-row card-hover">
                <div class="urgent-left">
                    <div class=""><img src="assets/img/Group 7 logo.svg" alt=""></div>
                    <div class="urgent-counter">
                        <div class="counter"><span class="black">1</span></div>
                        <div class="card-info"><span class="focus-color">Urgent</span></div>
                    </div>
                </div>
                <div class="intermediate-line"></div>
                <div class="urgent-right">
                    <div class="date"><span class="black">October 16, 2022</span></div>
                    <div class="upcoming-deadline"><span class="focus-color">Upcoming Deadline</span></div>
                </div>
            </div>
            <div class="third-row">
                <div class="board-card card-hover">
                    <div class="counter"><span class="black">5</span></div>
                    <div class="board-info"><span class="focus-color">Task in Board</span></div>
                </div>
                <div class="board-card card-hover">
                    <div class="counter"><span class="black">2</span></div>
                    <div class="progress-info"><span class="focus-color">Task in Progress</span></div>
                </div>
                <div class="board-card card-hover">
                    <div class="counter"><span class="black">2</span></div>
                    <div class="feedback-info"><span class="focus-color">Awaiting feedback</span></div>
                </div>
            </div>
        </div>
        <div id="welcomeScreen" class="welcome"></div>
    `; 
}

function loadTheWelcomeSreen(user){
    let welcomeScreen = docID('welcomeScreen');
    welcomeScreen.innerHTML = renderWelcomeHTML(user);
}

function renderWelcomeHTML(user){
  return /*HTML*/ `
    <div class="Greet">
      <div class="greet">good Morning</div>
      <div class="greet-name">${user.name}</div>
    </div>  
  `;
}