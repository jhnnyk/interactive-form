var nameField = document.getElementById('name');
var otherJobRole = document.getElementById('other-title');
var selectJobRole = document.getElementById('title');
var tshirtThemeSelect = document.getElementById('design');
var tshirtColorSelect = document.getElementById('colors-js-puns');
var activities = document.querySelectorAll('.activities input');
var totalCost = 0;

//  1. set focus on first text field when the page loads
nameField.focus();


//  2. hide "Other Job Role" text field unless "Other"
//     is selected from the "Job Role" drop down menu
otherJobRole.style.display = "none";

var showOtherJobRoleField = function() {
  if (selectJobRole.value === 'other') {
    otherJobRole.style.display = "initial";
  } else {
    otherJobRole.style.display = "none";
  }
}

selectJobRole.addEventListener("change", showOtherJobRoleField)


//  3. hide "Color" drop down menu until a T-Shirt design is selected
//     and only show the color options that match the design selected
tshirtColorSelect.style.display = "none";

var showTShirtColors = function() {
  var options = document.querySelectorAll('#color option');
  var first = true;

  //  if the theme selected is 'JS Puns' then only show the JS Puns colors
  if (tshirtThemeSelect.value === 'js puns') {
    
    for (var i = 0; i < options.length; i++) {
      if (options[i].innerHTML.includes('Puns shirt')) {
        // show the JS Puns shirt colors
        options[i].style.display = "initial";
        // automatically select the first option so that the user doesn't 
        //   ever see any of the wrong colors
        if (first) {
          options[i].selected = true;
          first = false;
        }
      } else {
        // hide the other colors
        options[i].style.display = "none";
      }
    }
    
    // show the drop down
    tshirtColorSelect.style.display = "initial";

  //  if the theme selected is 'I heart JS' then only show the I heart JS colors
  } else if (tshirtThemeSelect.value === 'heart js') {
    
    for (var i = 0; i < options.length; i++) {
      if (options[i].innerHTML.includes('JS shirt')) {
        // show the I heart JS colors
        options[i].style.display = "initial";
        // automatically select the first option so that the user doesn't 
        //   ever see any of the wrong colors
        if (first) {
          options[i].selected = true;
          first = false;
        }
      } else {
        // hide the other colors
        options[i].style.display = "none";
      }
    }

    // show the drop down
    tshirtColorSelect.style.display = "initial";
  } else {
    // if the user doesn't select either t-shirt design
    //  hide the color choices
    tshirtColorSelect.style.display = "none";
  }
}

tshirtThemeSelect.addEventListener("change", showTShirtColors);


// 4. Register for Activities

//    function that disables workshops with conflicting schedules
var disableWorkshop = function (workshopName) {
  var conflictingWS = document.querySelector('input[name=' + workshopName + ']');
  conflictingWS.disabled = true;
  conflictingWS.parentElement.classList.add("disabled");
}

//    function that enables workshops
//      called when workshops with conflicting schedules are deselected
var enableWorkshop = function (workshopName) {
  var conflictingWS = document.querySelector('input[name=' + workshopName + ']');
  conflictingWS.disabled = false;
  conflictingWS.parentElement.classList.remove("disabled");
}

//    main Register for activities function
//      calculates totalCost and
//      prevents conflicting workshops from being scheduled by
//          calling disableWorkshop and enableWorkshop functions
var regForActivities = function() {
  // if we're checking the box
  if (this.checked) {

    switch (this.name) {
      case 'all':
        totalCost += 200;
        break;
      case 'js-frameworks':
        totalCost += 100;
        disableWorkshop('express');
        break;
      case 'js-libs':
        totalCost += 100;
        disableWorkshop('node');
        break;
      case 'express':
        totalCost += 100;
        disableWorkshop('js-frameworks');
        break;
      case 'node':
        totalCost += 100;
        disableWorkshop('js-libs');
        break;
      default:
        totalCost += 100;
    }

  // else we're unchecking the box
  } else {

    switch (this.name) {
      case 'all':
        totalCost -= 200;
        break;
      case 'js-frameworks':
        totalCost -= 100;
        enableWorkshop('express');
        break;
      case 'js-libs':
        totalCost -= 100;
        enableWorkshop('node');
        break
      case 'express':
        totalCost -= 100;
        enableWorkshop('js-frameworks');
        break;
      case 'node':
        totalCost -= 100;
        enableWorkshop('js-libs');
        break;
      default:
        totalCost -= 100;
    }
  }

  console.log(totalCost);
}

// attach an event listener for each checkbox
for (var i = 0; i < activities.length; i ++) {
  activities[i].addEventListener("click", regForActivities);
}

