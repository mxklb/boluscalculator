# Bolus Calculator
Insulin Bolus & Correction Calculator HTML5 Webapp (using [gh-pages](https://pages.github.com/)).

A simple and tranparent calculator app for the intensive insulin therapy (Diabetes Typ A).

[Just try it out here](http://maxkalb.github.io/boluscalculator/)

## About
This is a bolus calculator app to estimate a single insulin dosis based on personalized therapy settings, the actual glucose level and a meal. I wrote this app because I couldn't find any free web/mobile app that let one calculate a insulin bolus depending on the meal to be eaten that implements the formulars I knew. Most of the apps I found did not clearly point out the formulars they use to perform the bolus calculation. So this is the result, hopefully someone will find it usable ... 

This app comes with absolutely no warranty and may only be used at your own risk!

I highly recommend to always discuss the personal therapy settings with a doctor. 

## How to use it
1. Open the [boluscalculator](http://maxkalb.github.io/boluscalculator/) in a modern HTML5 compatible web browser.
2. Make sure the therapy settings are displayed according to your needs.
3. Enter the actual _Glucose Level_ (soberly measured) --> _Correction_ [BE]
4. Enter the amount of _Bread Units_ to be eaten --> _Effective Meal_ [BE]

The resulting insulin which is needed - the _Final Bolus_ [BE] - is defined as the sum of the _Correction_ and the _Effective Meal_. The results are immediately recalculated if input values get changed. Red colored numbers indicate that a correction is needed while green colored numbers indicate that one need to eat.

_Note:_ By setting the amount of _Bread Units_ to be eaten to "0", the result is the _Correction_.   

## How is the Bolus calculated
The fromulars used to calculate the resulting insulin dosis are as simple as ...

### The Final Result
The _Final Bolus_ is defined as the sum of the _Effective Meal_ and the _Correction_.

<p align="center"><a href="" target="_blank"><img src="finalbolus.gif"/></a></p>

The _Correction_ and the _Effective Meal_ are provisional results ...

### The Provisional Results
The _Effective Meal_ is the product of the _Meal to eaten_ and the _Bolus_ factor.
<p align="center"><a href="" target="_blank"><img src="effmeal.gif"/></a></p><br>
<p align="center"><a href="" target="_blank"><img src="correction.gif"/></a></p>

Note that therapy settings (indexed i) may vary depending on the daytime!

## Implementation Details
Think of something like a prototype or egineering app. It's developed as a kind of case study for myself, learning web development technologies ... Actually all is strictly hardcoded. There is no dynamic content. All is implemented in a single html file. I'm sure it could be done more elegant. Feel free to send me pull requests. 

The calculations are performed using html5 _input_ and _output_ tags.

### Todo
- Default therapy settings should be configureable
- Form entries should remember/cache values!?
- Make a new scalable app
    - Therapy settings should be separated (menu)
    - Automated daytime detection  
- Use different measurement units  

## License
Feel free to use, modify, comment or whatever ... this implementation is licensed under [MIT](https://github.com/maxkalb/boluscalculator/blob/master/LICENSE). 
    
    