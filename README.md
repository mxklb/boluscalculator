# Bolus Calculator
Bolus / Correction Calculator HTML5 Webapp (deployed using gh-pages).

## About
This is my personal bolus per food calculator app. I implemented this because I could not find any free mobile app which let me calculate my daily bolis depending on the food I eat. It comes with absolutely no warranty and may be used at your own risk!

## How to use it
Open the [boluscalculator](http://maxkalb.github.io/boluscalculator/) in a HTML5 compatible browser (f.e. chrome) and enter the actual _glucose level_ (before eating) and the amount of _bread units_ you would like to eat. The _final bolus_ to be injected will be calculated on the fly. Red colors indicate that a correction is needed while green colors indicate that you need to eat something.  

## How is the Bolus calculated
The fromulars used to calculate the needed dosis are simple. Note that the therapy settings (_Glucose Aim_, _Corr. Factor_ and _Bolus_) could be different depending on the daytime!   

### Final Result

    Final Bolus = Effective Food + Correction

### Provisional Results

    Effective Food = Food to eat * Bolus

                   Glucose Level  -  Glucose Aim
    Correction  =  -----------------------------
                           Corr. Factor         

## License
Feel free to use, modify, comment or whatever ... this implementation is licensed under [MIT](https://github.com/maxkalb/boluscalculator/blob/master/LICENSE). 
    
    