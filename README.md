# Insulin Bolus Calculator
IBC - An Insulin Bolus Calculator - A HTML5 App.

A simple and transparent calculator app for the intensive/flexible insulin therapy.

This app is deployed using [gh-pages](https://pages.github.com/). Check out IBC here: [mxklb.github.io/boluscalculator](http://mxklb.github.io/boluscalculator/)

## About this App
This is a bolus calculator app to estimate a single insulin dose based on personalized therapy settings, the actual blood glucose level and a meal. I wrote this app because I could not find any free web/mobile app that let one calculate an insulin bolus using the formulas I knew. Most of the apps I found did not clearly point out the formulas they use to perform the calculations. So this is the result ... 

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
This app is developed for actual versions of firefox and webkit based browsers like chrome and safari. It is designed for mobile screen resolutions above 320x480.

However:

1. Open [mxklb.github.io/boluscalculator](http://mxklb.github.io/boluscalculator/) in a modern web browser
2. Make sure the therapy settings are displayed according to your needs
3. Enter the actual _Glucose Level_ (soberly measured) --> _Correction_
4. Enter the _Amount of Meal_ to be eaten --> _Effective Meal_
5. Catch up the resulting insulin units [U] immediately

All results are always recalculated if any input value got changed. Red colored bolus numbers indicate that insulin is needed while green colored bolus numbers indicate that one need to eat some food. Just play around with the buttons. I'm sure you'll quickly find out how it works ..

_Note:_ By setting the _Amount of Meal_ to zero, the result is the _Correction_ only. Setting the _Blood Glucose_ to the _Glucose Aim_, the result is the _Effective Meal_ only.

### Therapy Settings
The 24h day is divided into 4 pieces; morning, noontime, evening and night. For each daytime the therapy settings _Glucose Aim_, _Corr. Factor_ and _Meal Factor_ can be adjusted separately by toggling the _Therapy Settings_ button. 

On load IBC automatically detects the correct therapy setting depending on the browsers daytime. To manually switch between different daytimes use the labeled buttons. The color red indicates that the selected setting does not match the IBC's detected daytime.

### Measurement Units
The default _Blood Glucose_ measurement unit is [mg/dL]. It may be changed to international units [mmol/L]. Related therapy settings will change accordingly. This does not have any effect on the equations above. The transformation from [mmol/L] to [mg/dL] is just a factor of 18.

The default measurement unit for the _Amount of Meal_ is [bread units]. It may be changed to [gram carbs]. The default amount of carbs [g] needed for on insulin unit [U] is 12g. This factor can be adjusted in the application setup.

### Offline Usage
This webapp is developed for on- and offline usage. No server is needed to run this app. All settings are always stored locally. You can always execute it locally by just using a suitable browser. To do so, use the following best practice ...

1. If you are using chrome browser simple create an application shortcut to your desktop, finished.
2. Clone or download this repository and place it somewhere locally

    A dropbox (or other cloud sync'ed) folder could be a good choice to also feed multiple devices. 
    
    Then just open the local index.html file in the web browser et voila ...

## Implementation Details
Think of something like a prototype or engineering app. It's developed as a kind of case study for myself, to learn something about web development technologies and intensive insulin therapy calculations ... All is implemented from scratch, just one lib [R.js](https://github.com/keithamus/R.js) is used. It's all plain html with css and java-script. For offline usage the app makes heavy use of techniques such as _local storage_ and _cache.manifest_.

Actually the code is not tested, reviewed or validated! I'm sure the implementation could be done more elegant, unit-tests are missing .. nothing is optimized .. Nevertheless for the actual purpose everything shall work as expected ;) 

Feel free to contribute,
 
- report - open issues 
- generate new translations
- send me feature requests or
- better send pull requests

### Translations
To contribute translations for your favorite language refer to the [multilang](https://github.com/mxklb/multilang) project. IBC uses _multilang_ to generate all its translations. _multilang_'s documentation is straight forward, it's as easy as generating one translation file and slightly editing two other files.

### Nice to have ..
- Make the daytime time-spans user adjustable
- Interpolate therapy settings (curves/splines)
- Setup an optional high contrast theme
- Use more icons to improve setup menu
- Add blind mode (bad eyes) special ui
- Validate the users input numbers
- Restructure show-/hide layout
- Add active insulin features

## License
Feel free to use, modify, comment or whatever ... this implementation is licensed under [MIT](https://github.com/mxklb/boluscalculator/blob/master/LICENSE).
