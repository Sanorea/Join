
function init(){
    
}

function checkBox() {
    // Get the checkbox
    var checkBox = document.getElementById("confirm");
    // Get the output text
  
    // If the checkbox is checked, display the output text
    if (checkBox.checked == true){
        checkBox.style.backgroundImage = "url('/assets/img/checked.png')";
    } else {
        checkBox.style.backgroundImage = "url('/assets/img/checkbox1.svg')";
    }
  }

