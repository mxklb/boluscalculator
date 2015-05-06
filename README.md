# Insulin Bolus Calculator
IBC - A Insulin Bolus Calculator HTML5 Webapp.

A simple and tranparent calculator app for the intensive/flexibles insulin therapy.

Just try it out here: [maxkalb.github.io/boluscalculator](http://maxkalb.github.io/boluscalculator/)

## About
This is a bolus calculator app to estimate a single insulin dose based on personalized therapy settings, the actual blood glucose level and a meal. I wrote this app because I couldn't find any free web/mobile app that let one calculate a insulin bolus that implements the formulars I knew. Most of the apps I found did not clearly point out the formulars they use to perform the calculations. So this is the result, hopefully someone will find it usable ... 

This app comes with absolutely no warranty and may only be used at your own risk!

## How is the Bolus calculated
The equations used to calculate the resulting insulin dosis are simple ...

### The Final Result
The _Final Bolus_ is defined as the sum of the _Effective Meal_ and the _Correction_.

<p align="center"><a href="" target="_blank"><img src="images/finalbolus.png"/></a></p>

The _Correction_ and the _Effective Meal_ are provisional results which are calculated as described in the following chapter. These results depend on the therapy settings and the daytime, which is indicated by the index i.

### The Provisional Results
The _Effective Meal_ is defined as the product of the _Meal to eaten_ and the _Bolus_ factor.

<p align="center"><a href="" target="_blank"><img src="images/effmeal.png"/></a></p>

The _Correction_ is defined as the difference of the actual _Glucose Level_ and the aspired _Glucose Aim_ divided by a correction, the _Corr. Factor_. The _Correction_ could be negative which indicates that the resulting amount of bread units is missing to hit the _Glucose Aim_. If it is possitive insulin is needed to reduce the blood sugar level to reach the _Glucose Aim_.

<p align="center"><a href="" target="_blank"><img src="images/correction.png"/></a></p>

_Note:_ Therapy settings (indexed i) may vary depending on the daytime! The calculation during the day can be adjusted by tweaking the therapy settings.

## How to use it
This app works best with chrome or other webkit based browsers.

1. Open the [boluscalculator](http://maxkalb.github.io/boluscalculator/) in a modern HTML5 compatible web browser.
2. Make sure the therapy settings are displayed according to your needs.
3. Enter the actual _Glucose Level_ (soberly measured) --> _Correction_ [BE]
4. Enter the amount of _Meal_ to be eaten --> _Effective Meal_ [BE]
5. Catch up the resulting insulin dose immediately

All results are immediately recalculated if any input value got changed. Red colored numbers indicate that a correction is needed while green colored numbers indicate that one need to eat some food [BE].

_Note:_ By setting the amount of meal to be eaten to zero, the result is the _Correction_ only.

### Offline Usage
This webapp is developed for on- and offline usage. No server is needed to run this app. All settings are always storred locally. You can alway execute it local just by using a suitable browser. Use the following best practice to do so ...

1. If you are using chrome browser simple create an application shortcut to your desktop, finished.
2. Clone or download this repository and place it somewhere locally

    A dropbox (or other cloud sync'ed) folder could be a good choice to also feed multiple devices. 
    
    Then just open the local index.html file in the web browser et voila ...

## Implementation Details
Think of something like a prototype or egineering app. It's developed as a kind of case study for myself, to learn something about web development technologies and intensive insulin therapy calculations ... All is implemented from scratch, no libs where used. Plain html with css and java-script. For offline usage the app make heavy use of html5 technics such as _local storrage_ and _cache.manifest_.

I'm sure the implementation could be more elegant. Feel free to send me pull requests or append the following todo entries. 

Actually the code is not tested, reviewed or validated!

### Todo
- ~~Add therapy settings for daytime _Late_~~
- Make different measurement units available
- ~~Form entries should remember/cache values!?~~
- ~~Default therapy settings should be configureable~~
- ~~Develop a new more modern, scalable or mobile app~~
    - ~~Therapy settings should be separated (menu)~~
    - Steady changing therapy settings (curves)?
    - ~~Automated daytime detection~~
- Redesign input elements (fix moz appearance)
- Make final bolus editable .. calculate meal
- Refactorings to become a multi-lingual app
- Validate the users number input

## License
Feel free to use, modify, comment or whatever ... this implementation is licensed under [MIT](https://github.com/maxkalb/boluscalculator/blob/master/LICENSE).
