# Bolus Calculator
Bolus / Correction Calculator HTML5 Webapp (deployed using [gh-pages](https://pages.github.com/)).

A simple and tranparent calculator app for the intensive insulin therapy (Diabetes Typ A).

[Just try it out](http://maxkalb.github.io/boluscalculator/)

## About
This is a bolus calculator app to estimate a single insulin dosis based on personalized therapy settings and a meal. I wrote this app because I couldn't find any free web/mobile app that let one calculate a insulin bolus depending on the meal to be eaten that implements the formulars I knew. Most of the apps I found did not clearly point out the formulars used to perform the bolus calculations. So this is the result, hopefully someone will find it usable ... 

This app comes with absolutely no warranty and may only be used at your own risk!

I highly recommend to discuss the personal therapy settings with a doctor. 

## How to use it
1. Open the [boluscalculator](http://maxkalb.github.io/boluscalculator/) in a modern HTML5 compatible web browser.
2. Enter the actual _Glucose Level_ (soberly measured) --> _Correction_ [BE]
3. Enter the amount of _Bread Units_ to be eaten --> _Effective Meal_ [BE]

The resulting insulin which is needed - the _Final Bolus_ [BE] - is defined as the sum of the _Correction_ and the _Effective Meal_. All results are immediately calculated when the input values change. Red colored numbers indicate that a correction is needed. Green colored numbers indicate that one need to eat.

_Note:_ By setting the amount of _Bread Units_ to be eaten to "0", the result is the _Correction_.   

## How is the Bolus calculated
The fromulars used to calculate the resulting insulin dosis are as simple as ...

### Final Result

- <a href="" target="_blank"><img src="finalbolus.gif"/></a>

### Provisional Results
- <a href="" target="_blank"><img src="effmeal.gif"/></a>

- <a href="" target="_blank"><img src="correction.gif"/></a>    

Note that therapy settings (_Glucose Aim_, _Corr. Factor_ and _Bolus_) may vary depending on the daytime!

## License
Feel free to use, modify, comment or whatever ... this implementation is licensed under [MIT](https://github.com/maxkalb/boluscalculator/blob/master/LICENSE). 
    
    