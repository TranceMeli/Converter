![HTML5](https://img.shields.io/badge/HTML5-E34F26?style=for-the-badge&logo=html5&logoColor=white)
![CSS3](https://img.shields.io/badge/CSS3-1572B6?style=for-the-badge&logo=css3&logoColor=white)
![JavaScript](https://img.shields.io/badge/JavaScript-F7DF1E?style=for-the-badge&logo=javascript&logoColor=black)

# My American Friends make me crazy

![Screenshot of the converter](images/screenshot_calculator.jpeg)

A small browser-based converter for the units that cause the most confusion in conversations with American contacts: Fahrenheit, feet/inches, miles and pounds. Conversions happen live while typing, with no button and no form submit.

## Features

- Fahrenheit ⇄ Celsius
- Feet/inches ⇄ centimeters, with flexible input (`5'9"`, `5' 9`, `5 9`, `5,9`)
- Centimeters or meters (`175` or `1,75`) ⇄ feet/inches
- Miles ⇄ kilometers
- Pounds (lbs) ⇄ kilograms
- Works in both directions: type into either field and the other one updates
- Results use a decimal comma and are rounded sensibly (3 decimals below 1, 2 below 10, otherwise 1)
- Strict input check: invalid input such as `12abc` shows a hint under the fields instead of silently converting
- Accessible: labelled fields, visible keyboard focus, AA-level text contrast, responsive layout, respects `prefers-reduced-motion`
- No build step, no dependencies, no framework

## Prerequisites

- A modern web browser
- Nothing else: fonts (Space Mono, DSEG7 Classic) are bundled in `fonts/`, so the page works offline and makes no third-party requests

## Quick start

```bash
git clone https://github.com/TranceMeli/Converter.git
cd Converter
```

Then open `index.html` in your browser (double-click it, or drag it into a browser window).

## Usage

Type a value into any field; the paired field updates immediately.

| You type | Field | You get | Field |
|---|---|---|---|
| `98.6` or `98,6` | Fahrenheit | `37` | Celsius |
| `5'9"` | Feet / Inches | `175,3` | cm |
| `1,75` | cm or m/cm | `5'8,9"` | Feet / Inches |
| `26.2` | Miles | `42,2` | km |
| `150` | lbs | `68` | kg |

A value below 10 in the cm field is read as meters, so `1,75` and `175` mean the same thing.

## Project structure

```
index.html   Markup
style.css    Styling (colors, typography, responsive layout)
script.js    Conversion logic
fonts/       Self-hosted fonts (SIL Open Font License)
images/      Screenshot used in this README
```

## Conversion factors

- Fahrenheit to Celsius: `(F - 32) * 5 / 9`
- Inch to centimeter: 1 inch = 2.54 cm
- Mile to kilometer: 1 mile = 1.60934 km
- Pound to kilogram: 1 lb = 0.45359237 kg

## Help and feedback

Found a bug or have an idea for another unit? Open an [issue](https://github.com/TranceMeli/Converter/issues).

## License

This project is licensed under the [MIT License](LICENSE).
