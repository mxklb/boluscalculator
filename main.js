function addFloatLabel(self) {
  var label = document.createElement("label");
  var id = "label-" + new Date().getTime();
  label.setAttribute("id", id);
  self.dataset.inputOf = id;
  label.classList.add("float-label-hidden");
  self.parentNode.insertBefore(label, self);
  label.innerHTML = self.getAttribute("placeholder");
  setTimeout(function(){
    label.classList.add("float-label");
  }, 10)
}
function floatLabelKeyUp(event) {
  var self = event.target;
  if(!self.dataset.inputOf && !!self.value) {
    addFloatLabel(self);
  }
  else {
    var label = document.querySelector("#" + self.dataset.inputOf);
    if(!self.value && !!label) {
      label.classList.remove("float-label");
      setTimeout(function(){
        label.parentNode.removeChild(label);
        delete self.dataset.inputOf;
      }, 1000)
    }
  }
}
function wrapElement(element) {
  var parent = element.parentNode;
  var sibling = element.nextElementSibling;
  var div = document.createElement("div");
  div.classList.add("float-label-wrapper");
  div.appendChild(element);
  if(!sibling) {
    parent.appendChild(div);
  }
  else {
    parent.insertBefore(div, sibling);
  }
}
var floatLabels = document.querySelectorAll(".js-floatLabel");
var inputs = [].slice.call(floatLabels);
for(var i in inputs) {
  wrapElement(inputs[i]);
  if(!!inputs[i].value) {
    addFloatLabel(inputs[i]);
  }
  inputs[i].addEventListener("keyup", floatLabelKeyUp);
}

/// Global variable to identify already passed initialization
var initialized = false;

function validateInputNumber(elementID)
{
    var x = document.getElementById(elementID);
    if (isNaN(x)) // this is the code I need to change
    {
        alert("Must input numbers");
        return false;
    }alert("test");
}

/*
* Frequently called to update the displayed daytime.
*/
function updateTime() {
  var currentTime = new Date();
  var hours = currentTime.getHours();
  var minutes = currentTime.getMinutes();
  var seconds = currentTime.getSeconds();
  if (minutes < 10){
      minutes = "0" + minutes;
  }
  if (seconds < 10){
      seconds = "0" + seconds;
  }
  var v = hours + ":" + minutes + ":" + seconds + " ";
  setTimeout("updateTime()",1000);
  document.getElementById('time').innerHTML=v;
  
  if( initialized == true ){
    var daytime = estimateTherapySetting();
    var checkBoxTherapy = document.getElementById('therapySetting');
    if( checkBoxTherapy.selectedIndex != daytime ){
      var r = confirm("Switch therapy settings?");
      if (r == true) {
        checkBoxTherapy.value = daytime;
      }
    }
  }
}

updateTime();

/*
* Returns an ID for the daytime depending on the actual time.
* Return values: 0 = morning, 1 = noontime, 2 = evening, 3 = late.
*/
function estimateTherapySetting() {
	var daytime = 0;
  var currentTime = new Date();
  var hours = currentTime.getHours();
  if( hours >= 6 && hours < 12 ) daytime = 0;
  if( hours >= 12 && hours < 18 ) daytime = 1;
  if( hours >= 18 && hours < 24 ) daytime = 2;
  if( hours >= 0 && hours < 6 ) daytime = 3;
  return daytime;  
}

/*
* Toggles (show/hide) the settings. 
*/
function toggleSettings() {
	var e = document.getElementById('settings');
  if ( e.style.display == 'block' )
    e.style.display = 'none';
  else
    e.style.display = 'block';
}

/*
* Callback if the therapy settings were changed.
* Switches the calculation depending on the therapy.
*/
function therapySettingsChanged(self) {
  var value = self.value;
  if( value == estimateTherapySetting() ) { 
  	self.style.color = "black";
    initialized = true;
  }
  else {
  	self.style.color = "#800000";
    initialized = false;
  }
}

/*
* Returns a string with the main therapy informations.
*/
function getTherapyInfoText(therapyId) {
  var infoString = "Aim 120 Corr: 50 Bolus 1.5"; // TODO Read/Generate from local storrage!
  return infoString;
} 

/*
* Gets called if the page gets loaded (used as initialization).
*/
window.onload = function () {
  var therapyId = estimateTherapySetting();
  document.getElementById('therapySetting').value = therapyId;
  document.getElementById('therapyInfo').innerHTML = getTherapyInfoText(therapyId);
  initialized = true;
}
