
function init(){
    loadLogo();
}

function loadLogo(){
const acoustic = document.querySelector('.acoustic');
document.body.addEventListener('click', () => acoustic.classList.toggle('selected'));
docID('mobile-logo-white').classList.add('dispaly-none');
}
