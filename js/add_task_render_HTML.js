function renderContactListHTML(color, acronym, name, i) {
    return /*html*/`   
        <table>
            <div class ="dropDownList-contact-container">
                <div class ="dropDownList-contact-element">
                    <div class ="add-task-details-user-initials" style="background-color: ${color}">${acronym}</div>
                    <div class ="dropDownList-contact-element">${name}</div>
                </div>
                <div class ="dropDownList-contact-element" >
                    <input onclick = "readValueAssignedTo()" id="checkboxes${i}" type="checkbox" value="${acronym};${color};${name}">
                </div>
            </div>
        </table>
        `;
}

function templateRenderHTMLDropdownCategory(categorie) {
    return /*html*/ `                
    <li>
        <label>
            <div>
                <div>${categorie}</div>
            </div>    
            <input type="checkbox" value="${categorie}">
        </label>
    </li>`;
}

function renderSubtaskList(element, i) {
    return /*HTML*/`
    <div id="editId_${i}" class="list hover">
       <li>${element}</li>
       <div class="img-content hover">
           <img onclick="editSubtask(${i})" src="/assets/img/edit_icon.svg" alt="Bearbeiten">
           <div class="split"></div>
           <img onclick="deletTask(${i})" src="/assets/img/delete_icon.svg" alt="Löschen">
       </div>
    </div>
    `;
}

function renderSwitchToInput(i) {
    return /*HTML*/ `
    <div id="edit_content_${i}" class="list">
        <li><input class="newEditInput" id="newID_${i}" type="text"></li>
        <div class="img-content hover">
        <div id="newInputSwitchImg"><img onclick="editSubtask(${i})" src="/assets/img/edit_icon.svg" alt="Bearbeiten"></div>
           <div class="split"></div>
           <div id="otherInputSitchImg"><img onclick="deletTask(${i})" src="/assets/img/delete_icon.svg" alt="Löschen"></div>
           </div>
    </div>
    `;
}

function renderSearchedContactListHTML(color, acronym, name, i) {
    return /*html*/`   
            <table>
            <div class ="dropDownList-contact-container">
                <div class ="dropDownList-contact-element">
                    <div class ="add-task-details-user-initials" style="background-color: ${color}">${acronym}</div>
                    <div class ="dropDownList-contact-element">${name}</div>
                </div>
                <div class ="dropDownList-contact-element" >
                    <input onclick = "readValueAssignedTo()" id="checkboxes${i}" type="checkbox" value="${acronym};${color};${name}">
                </div>
            </div>
        </table>
            `;
}