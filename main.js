/// Global variable to identify already passed initialization
var initialized = false;

// Array holding the therapy settings
var settings = [];

// Array holding local storage variable names
var localNames = [];

// Some simplyfing getter methods
function getTherapyAim(therapyId) {
  return settings[therapyId].aim;
}
function getTherapyCorrection(therapyId) {
  return settings[therapyId].corr;
}
function getTherapyBolus(therapyId) {
  return settings[therapyId].bolus;
}

/*
* Initializes the local storage variable names used for therapies.
*/
function initLocalNames() {
	var therapyId;
  for	(therapyId = 0; therapyId < settings.length; therapyId++) {
    var name1 = "aim" + therapyId;
  	var name2 = "corr" + therapyId;
  	var name3 = "bolus" + therapyId;
    localNames[therapyId] = {aim:name1, corr:name2, bolus:name3};
  }
}

/*
* Set default therapy settings and initialize local variable names.
*/
function initDefaultSettings() {
  settings[0] = {aim:103, corr:50, bolus:1.0};
	settings[1] = {aim:102, corr:50, bolus:1.1};
	settings[2] = {aim:121, corr:50, bolus:1.2};
	settings[3] = {aim:120, corr:50, bolus:1.3};
  initLocalNames(); 
}

/*
* Gets called if the page gets loaded (used as initialization).
*/
window.onload = function () {
  initDefaultSettings();
  initLocalSettings();
  autoTherapySetting();
  updateTime();
  initialized = true;
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
  return false;
}

/*
* Overwrites the therapy setting with local storage values (if exist).
*/
function loadTherapySettings(therapyId) {
  var stringAimName = localNames[therapyId].aim;
  var stringCorrName = localNames[therapyId].corr;
  var stringBolusName = localNames[therapyId].bolus;
  
  if( localStorage.getItem(stringAimName) != null )
    settings[therapyId].aim = localStorage.getItem(stringAimName);
  if( localStorage.getItem(stringCorrName) != null )
    settings[therapyId].corr = localStorage.getItem(stringCorrName);
  if( localStorage.getItem(stringBolusName) != null )
    settings[therapyId].bolus = localStorage.getItem(stringBolusName);
}

/*
* Writes the therapy settings of the given id into local storage. 
*/
function saveTherapySettings(therapyId){
  localStorage.setItem(localNames[therapyId].aim, settings[therapyId].aim);
  localStorage.setItem(localNames[therapyId].corr, settings[therapyId].corr);
  localStorage.setItem(localNames[therapyId].bolus, settings[therapyId].bolus);
}

/*
* Initializes the settings array with local stored values. 
*/
function initLocalSettings() {
  var therapyId;
  for( therapyId = 0; therapyId < settings.length; therapyId++ ) {
    loadTherapySettings(therapyId);
  }
}

/*
* Writes all settings and UI inputs to the local storage.
*/
function writeLocalStorage() {
  var therapyId;
  for	(therapyId = 0; therapyId < settings.length; therapyId++) {
    saveTherapySettings(therapyId);
  }
}

/*
* Returns a string with the main therapy informations.
*/
function getTherapyInfoText(therapyId) {
  var infoText = "Aim " + settings[therapyId].aim + " "
							 + "Corr " + settings[therapyId].corr + " "
  						 + "Bolus " + settings[therapyId].bolus;
  return infoText;
}

/*
* Updates the GUI by viewing the values stored in the settings array. 
*/
function updateTherapySettings() {
  var therapyId = document.getElementById('therapySetting').value;
  refreshSettings(therapyId);
  return therapyId;
}

/*
* Puts the UI values into the settings array and updates the GUI. 
*/
function changeTherapySettings() {
  var therapyId = document.getElementById('therapySetting').value;
  settings[therapyId].aim = document.getElementById('settingsAim').value;
  settings[therapyId].corr = document.getElementById('settingsCorr').value;
  settings[therapyId].bolus = document.getElementById('settingsBolus').value;
  saveTherapySettings(therapyId);
  updateTherapySettings();
}

/*
* Takes the settings and applies them to the gui.
*/
function refreshSettings(therapyId) {
  var therapyInfo = document.getElementById('therapyInfo');
  var therapySetting = document.getElementById('therapySetting');
  
  therapySetting.value = therapyId;
  therapyInfo.innerHTML = getTherapyInfoText(therapyId);
  document.getElementById('settingsAim').value = getTherapyAim(therapyId);
  document.getElementById('settingsCorr').value = getTherapyCorrection(therapyId);
  document.getElementById('settingsBolus').value = getTherapyBolus(therapyId);
  
  if( therapyId == getTherapyDaytime() ) { 
  	therapySetting.style.color = "black";
    therapyInfo.style.color = "black";
  }
  else {
  	therapySetting.style.color = "#800000";
    therapyInfo.style.color = "#800000";
  }
  
  updateCalculations();
}

/*
* Automaticly choose the therapy setting depending on the actual daytime.
*/
function autoTherapySetting() {
  var daytimeId = getTherapyDaytime();
  refreshSettings( daytimeId );
}


function calcCorrection(therapyId)
{
  var glu = document.getElementById("glucose").value;
  var gluAim = getTherapyAim(therapyId);
  var corr = getTherapyCorrection(therapyId);
  return (glu - gluAim) / corr;
}

function calcEffectiveFood(therapyId)
{
  var food = document.getElementById("foodbe").value;
  var factor = getTherapyBolus(therapyId);
  return food * factor;
}

function updateCalculations() {
  var bolusElement = document.getElementById('finalBolus');
  var therapyId = document.getElementById('therapySetting').value;
  var glucEmpty = document.getElementById("glucose").value == "";
  var foodEmpty = document.getElementById("foodbe").value == "";  
  var correction = calcCorrection(therapyId);
  var effectiveFood = calcEffectiveFood(therapyId);
  var finalBolus = correction + effectiveFood;
  
  
  if( glucEmpty && foodEmpty ) bolusElement.value = "";
  if( glucEmpty && !foodEmpty ) bolusElement.value = effectiveFood.toFixed(2);
  if( !glucEmpty && foodEmpty ) bolusElement.value = correction.toFixed(2);
  if( !glucEmpty || !foodEmpty ) bolusElement.value = finalBolus.toFixed(2);
 
  var elemSum = document.getElementById('sum');
 
  var calcString = "";
  if( bolusElement.value != "" ){
    calcString = "Meal (" + effectiveFood.toFixed(2) + ") + Corr (" + correction.toFixed(2) + ")";
    elemSum.style.background = "#fff";
  }
  else { elemSum.style.background = "transparent"; }
  elemSum.innerHTML = calcString;
  
  if( finalBolus <= 0 ) bolusElement.style.color = "darkgreen";
  else bolusElement.style.color = "#F11";
}

/*
* Checks if the given elements value is a number.
*/
function validateInputNumber(elementID)
{
    var x = document.getElementById(elementID).value;
    if (isNaN(x)) // this is the code I need to change
    {
        alert("Must input numbers");
        return false;
    }
}

function decrementNumber(elementID){
  elementID.value--;
  updateCalculations();
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
  var v = "Active Therapy Settings " + hours + ":" + minutes + ":" + seconds + " ";
  setTimeout("updateTime()",1000);
  document.getElementById('time').innerHTML=v;
  
  var elemTherapySetting = document.getElementById('therapySetting');
  var therapyIndex = elemTherapySetting.selectedIndex;
  
  if( initialized == true && therapyIndex != getTherapyDaytime() && elemTherapySetting.style.display == 'none') {
  	updateTherapySettings();
  }
}

//updateTime();

/*
* Returns an ID for the daytime depending on the actual time.
* Return values: 0 = morning, 1 = noontime, 2 = evening, 3 = late.
*/
function getTherapyDaytime() {
	var daytime = 0;
  var currentTime = new Date();
  var hours = currentTime.getHours();
  if( hours >= 6 && hours < 12 ) daytime = 0;
  if( hours >= 12 && hours < 18 ) daytime = 1;
  if( hours >= 18 && hours < 24 ) daytime = 2;
  if( hours >= 0 && hours < 6 ) daytime = 3;
  return daytime;  
}

