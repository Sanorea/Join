function initPolicy() {
    if (localStorage.getItem("user-name") === null) {
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



