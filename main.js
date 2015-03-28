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
  var correction1 = Math.round(calcCorrection('actbolus', 'aim1', 'corr1')*dec)/dec;
  var correction2 = Math.round(calcCorrection('actbolus', 'aim2', 'corr2')*dec)/dec;
  var correction3 = Math.round(calcCorrection('actbolus', 'aim3', 'corr3')*dec)/dec;
  var correction4 = Math.round(calcCorrection('actbolus', 'aim4', 'corr4')*dec)/dec;
  
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

