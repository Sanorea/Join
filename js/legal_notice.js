function initNotice() {
    if (document.referrer == 'http://127.0.0.1:5501/index.html') {
        renderSideNavHTML();
    let editSideNav = document.getElementById('edit-sideNav'); 
    let editPolicy = document.getElementById('edit-content'); 
    editSideNav.classList.add('d-none');
    editPolicy.style.height = '65%'; 
    } else{
        renderHeaderNav();
        renderSideNavHTML();  
    }
}
