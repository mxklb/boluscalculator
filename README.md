# Insulin Bolus Calculator
IBC - An Insulin Bolus Calculator - A HTML5 App.

A simple and tranparent calculator app for the intensive/flexibles insulin therapy.

This app is deployed using gh-pages. Check out IBC here: [mxklb.github.io/boluscalculator](http://mxklb.github.io/boluscalculator/)

## About this App
This is a bolus calculator app to estimate a single insulin dose based on personalized therapy settings, the actual blood glucose level and a meal. I wrote this app because I could not find any free web/mobile app that let one calculate an insulin bolus using the formulars I knew. Most of the apps I found did not clearly point out the formulars they use to perform the calculations. So this is the result ... 

This app comes with absolutely no warranty and may only be used at your own risk!

All app settings are always stored in your browsers local storage.

## How is the Bolus calculated
The equations used to calculate the resulting insulin dose are simple ...

### Final Bolus
The _Final Bolus_ is defined as the sum of the _Effective Meal_ and a _Correction_.

<p align="center"><a href="" starget="_blank"><img src="images/finalbolus.png"/></a></p>

The _Correction_ and the _Effective Meal_ are provisional results. These results depend on personal therapy settings, which could vary during the day (indicated by the index _i_). All three values are always displayed in [insulin units](https://en.wikipedia.org/wiki/Insulin_%28medication%29#Dosage_and_timing) [U].

### Provisional Results
The _Effective Meal_ is simply defined as the product of the _Amount of Meal_ and a _Meal Factor_.

<p align="center"><a href="" target="_blank"><img src="images/effmeal.png"/></a></p>

The _Correction_ is defined as the difference of the actual _Glucose Level_ and the aspired _Glucose Aim_ divided by a correction. The _Corr. Factor_ is the personal insulin sensitivity. It indicates how many units the blood glucose level gets lowered by injecting one unit of insulin.

<p align="center"><a href="" target="_blank"><img src="images/correction.png"/></a></p>

_Note:_ The _Correction_ could be negative, which indicates that the resulting amount of bread units is missing to hit the _Glucose Aim_. If it is possitive insulin is needed to reduce the blood glucose level to reach the _Glucose Aim_.

## How to use it
This app is designed for actual versions of firefox and webkit based browsers (like chrome and safari). 

However:

1. Open [mxklb.github.io/boluscalculator](http://mxklb.github.io/boluscalculator/) in a modern web browser.
2. Make sure the therapy settings are displayed according to your needs.
3. Enter the actual _Glucose Level_ (soberly measured) --> _Correction_
4. Enter the _Amount of Meal_ to be eaten --> _Effective Meal_
5. Catch up the resulting insulin units [U] immediately

All results are always recalculated if any input value got changed. Red colored bolus numbers indicate that a correction is needed while green colored bolus numbers indicate that one need to eat some food. Just play around with the buttons. I'm sure you'll quickly find out how it works ..

_Note:_ By setting the _Amount of Meal_ to zero, the result is the _Correction_ only. Setting the _Blood Glucose_ to the _Glucose Aim_, the result is the _Effectice Meal_ only.

### Therapy Settings
The 24h day is devided into 4 pieces; morning, noontime, evening and night. For each daytime the therapy settings _Glucose Aim_, _Corr. Factor_ and _Meal Factor_ can be adjusted separately by toggeling the _Therapy Settings_ button. 

On load IBC automatically detects the correct therapy setting depending on the browsers daytime. To manually switch between different daytimes use the labeled buttons. The color red indicates that the selected setting does not match the IBC's detected daytime.

### Measurement Units
The default _Blood Glucose_ measurement unit is [mg/dL]. It may be changed to international units [mmol/L]. Releated therapy settings will change accordingly. This does not have any effect on the equations above. The transformation from [mmol/L] to [mg/dL] is just a factor of 18.

The default measurement unit for the _Amount of Meal_ is [bread units]. It may be changed to [gram carbs]. The default amount of carbs [g] needed for on insuline unit [U] is 12g. This factor can be adjusted in the application setup.

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
- ~~Make different measurement units available~~
- ~~Form entries should remember/cache values!?~~
- ~~Default therapy settings should be configureable~~
- ~~Develop a new more modern, scalable or mobile app~~
    - ~~Therapy settings should be separated (menu)~~
    - Steady changing therapy settings (curves)?
    - ~~Automated daytime detection~~
- ~~Redesign input elements (fix moz appearance)~~
- ~~Make final bolus editable .. calculate meal~~
- Refactorings to become a multi-lingual app
- Validate the users number input

## License
Feel free to use, modify, comment or whatever ... this implementation is licensed under [MIT](https://github.com/mxklb/boluscalculator/blob/master/LICENSE).
