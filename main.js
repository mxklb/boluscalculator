/*
* Helper: Check for empty strings
*/
function isEmpty(str) 
{
  return (!str || 0 === str.length);
}

/*
* Set default settings if the elements are not already initialized (contain no text).
*/
function setDefaultSettings()
{
  if( isEmpty(document.getElementById('aim1').value) ) document.getElementById('aim1').value = 100;
  if( isEmpty(document.getElementById('aim2').value) ) document.getElementById('aim2').value = 100;
  if( isEmpty(document.getElementById('aim3').value) ) document.getElementById('aim3').value = 120;
  if( isEmpty(document.getElementById('aim4').value) ) document.getElementById('aim4').value = 120;
  
  if( isEmpty(document.getElementById('corr1').value) ) document.getElementById('corr1').value = 50;
  if( isEmpty(document.getElementById('corr2').value) ) document.getElementById('corr2').value = 50;
  if( isEmpty(document.getElementById('corr3').value) ) document.getElementById('corr3').value = 50;
  if( isEmpty(document.getElementById('corr4').value) ) document.getElementById('corr4').value = 50;
  
  if( isEmpty(document.getElementById('bolus1').value) ) document.getElementById('bolus1').value = 1.5;
  if( isEmpty(document.getElementById('bolus2').value) ) document.getElementById('bolus2').value = 0.8;
  if( isEmpty(document.getElementById('bolus3').value) ) document.getElementById('bolus3').value = 1.0;
  if( isEmpty(document.getElementById('bolus4').value) ) document.getElementById('bolus4').value = 1.0;
}

/*
* Checks for local stored values and initialize the elements.
*/
function setLocalSettings()
{
  if (localStorage.getItem("glucose") != null) { document.getElementById('glucose').value = localStorage.getItem("glucose"); }
  if (localStorage.getItem("food") != null) { document.getElementById('foodbe').value = localStorage.getItem("food"); }
  
  if (localStorage.getItem("aim1") != null) { document.getElementById('aim1').value = localStorage.getItem("aim1"); }
  if (localStorage.getItem("aim2") != null) { document.getElementById('aim2').value = localStorage.getItem("aim2"); }
  if (localStorage.getItem("aim3") != null) { document.getElementById('aim3').value = localStorage.getItem("aim3"); }
  if (localStorage.getItem("aim4") != null) { document.getElementById('aim4').value = localStorage.getItem("aim4"); }
  
  if (localStorage.getItem("corr1") != null) { document.getElementById('corr1').value = localStorage.getItem("corr1"); }
  if (localStorage.getItem("corr2") != null) { document.getElementById('corr2').value = localStorage.getItem("corr2"); }
  if (localStorage.getItem("corr3") != null) { document.getElementById('corr3').value = localStorage.getItem("corr3"); }
  if (localStorage.getItem("corr4") != null) { document.getElementById('corr4').value = localStorage.getItem("corr4"); }
  
  if (localStorage.getItem("bolus1") != null) { document.getElementById('bolus1').value = localStorage.getItem("bolus1"); }
  if (localStorage.getItem("bolus2") != null) { document.getElementById('bolus2').value = localStorage.getItem("bolus2"); }
  if (localStorage.getItem("bolus3") != null) { document.getElementById('bolus3').value = localStorage.getItem("bolus3"); }
  if (localStorage.getItem("bolus4") != null) { document.getElementById('bolus4').value = localStorage.getItem("bolus4"); }
}

window.onload = function () 
{
  setLocalSettings();
  setDefaultSettings();
  if( !isEmpty(document.getElementById('glucose').value) ) {
    updateCalculations();
    updateTextColors();
  }     
}

function storeGlucose() 
{
  localStorage.setItem("glucose", document.getElementById('glucose').value);
}

function storeFood() 
{
  localStorage.setItem("food", document.getElementById('foodbe').value);
}

function storeSettings()
{
  localStorage.setItem("aim1", document.getElementById('aim1').value);
  localStorage.setItem("aim2", document.getElementById('aim2').value);
  localStorage.setItem("aim3", document.getElementById('aim3').value);
  localStorage.setItem("aim4", document.getElementById('aim4').value);
  
  localStorage.setItem("corr1", document.getElementById('corr1').value);
  localStorage.setItem("corr2", document.getElementById('corr2').value);
  localStorage.setItem("corr3", document.getElementById('corr3').value);
  localStorage.setItem("corr4", document.getElementById('corr4').value);
  
  localStorage.setItem("bolus1", document.getElementById('bolus1').value);
  localStorage.setItem("bolus2", document.getElementById('bolus2').value);
  localStorage.setItem("bolus3", document.getElementById('bolus3').value);
  localStorage.setItem("bolus4", document.getElementById('bolus4').value);
}

function setTextColor(elementId) 
{
  var element = document.getElementById(elementId);
  element.style.color = (element.value > 0) ? "red" : "darkgreen";
}

function updateTextColors() 
{
  setTextColor('final1');
  setTextColor('final2');
  setTextColor('final3');
  setTextColor('final4');
		
  setTextColor('correction1');
  setTextColor('correction2');
  setTextColor('correction3');
  setTextColor('correction4');
}

function calcCorrection(elemBolusId, elemAimId, elemCorrId)
{
  var glu = document.getElementById(elemBolusId).value;
  var gluAim = document.getElementById(elemAimId).value;
  var corr = document.getElementById(elemCorrId).value;
  return (glu - gluAim) / corr;
}

function calcEffectiveFood(elemFoodId, elemFactorId)
{
  var food = document.getElementById(elemFoodId).value;
  var factor = document.getElementById(elemFactorId).value;
  return food * factor;
}

function updateCalculations()
{
  var dec = 100;
  
  // Update corrections
  var correction1 = Math.round(calcCorrection('glucose', 'aim1', 'corr1')*dec)/dec;
  var correction2 = Math.round(calcCorrection('glucose', 'aim2', 'corr2')*dec)/dec;
  var correction3 = Math.round(calcCorrection('glucose', 'aim3', 'corr3')*dec)/dec;
  var correction4 = Math.round(calcCorrection('glucose', 'aim4', 'corr4')*dec)/dec;
  
  document.getElementById('correction1').value = correction1;
  document.getElementById('correction2').value = correction2;
  document.getElementById('correction3').value = correction3;
  document.getElementById('correction4').value = correction4;
  
  // Update effective food
  var effectiveFood1 = Math.round(calcEffectiveFood('foodbe', 'bolus1')*dec)/dec;
  var effectiveFood2 = Math.round(calcEffectiveFood('foodbe', 'bolus2')*dec)/dec;
  var effectiveFood3 = Math.round(calcEffectiveFood('foodbe', 'bolus3')*dec)/dec;
  var effectiveFood4 = Math.round(calcEffectiveFood('foodbe', 'bolus4')*dec)/dec;
  
  document.getElementById('food1').value = effectiveFood1;
  document.getElementById('food2').value = effectiveFood2;
  document.getElementById('food3').value = effectiveFood3;
  document.getElementById('food4').value = effectiveFood4;
  
  // Update resulting bolus
  document.getElementById('final1').value = Math.round((correction1 + effectiveFood1)*dec)/dec;
  document.getElementById('final2').value = Math.round((correction2 + effectiveFood2)*dec)/dec;
  document.getElementById('final3').value = Math.round((correction3 + effectiveFood3)*dec)/dec;
  document.getElementById('final4').value = Math.round((correction4 + effectiveFood4)*dec)/dec;
}

