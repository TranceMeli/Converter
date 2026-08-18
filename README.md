![HTML5](https://img.shields.io/badge/HTML5-E34F26?style=for-the-badge&logo=html5&logoColor=white)
![CSS3](https://img.shields.io/badge/CSS3-1572B6?style=for-the-badge&logo=css3&logoColor=white)
![JavaScript](https://img.shields.io/badge/JavaScript-F7DF1E?style=for-the-badge&logo=javascript&logoColor=black)

# My American Friends make me crazy

![alt text](images/screenshot_calculator.jpeg)

A small converter for the units that cause the most confusion in everyday conversations with American contacts. All conversions happen live while typing, no button or form submit required.

## Features

- Fahrenheit to Celsius, both directions
- Feet/Inches to centimeters, both directions, with flexible input (e.g. 5'9", 5' 9, 5 9, 5,9)
- Miles to kilometers, both directions
- Pounds (lbs) to kilograms, both directions

## Usage

Open `index.html` in a browser. The number fields load the DSEG7 Classic font from a CDN, so an internet connection is required on first load.

## Structure

```
index.html   Markup
style.css    Styling
script.js    Conversion logic
```

## Conversion factors

- Fahrenheit to Celsius: (F - 32) * 5 / 9
- Inch to centimeter: 1 inch = 2.54 cm
- Mile to kilometer: 1 mile = 1.60934 km
- Pound to kilogram: 1 lb = 0.45359237 kg