var nameField = document.getElementById('name');
var otherJobRole = document.getElementById('other-title');
var selectJobRole = document.getElementById('title');

//  set focus on first text field when the page loads
nameField.focus();

//  hide "Other Job Role" text field unless "Other"
//  is selected from the "Job Role" drop down menu
otherJobRole.style.display = "none";

var showOtherJobRoleField = function() {
  if (selectJobRole.value === 'other') {
    otherJobRole.style.display = "initial";
  } else {
    otherJobRole.style.display = "none";
  }
}

selectJobRole.addEventListener("change", showOtherJobRoleField)
