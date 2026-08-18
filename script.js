const fahrenheitEl = document.getElementById('fahrenheit');
const celsiusEl = document.getElementById('celsius');
const feetInchesEl = document.getElementById('feetInches');
const cmEl = document.getElementById('cm');

function parseNumber(str){
  if(str === undefined || str === null) return null;
  const cleaned = str.trim().replace(',', '.');
  if(cleaned === '' || cleaned === '-' ) return null;
  const num = parseFloat(cleaned);
  return isNaN(num) ? null : num;
}

function formatNumber(num, decimals = 1){
  if(!isFinite(num)) return '';
  const rounded = Math.round(num * Math.pow(10, decimals)) / Math.pow(10, decimals);
  return rounded.toString().replace('.', ',');
}

fahrenheitEl.addEventListener('input', () => {
  const f = parseNumber(fahrenheitEl.value);
  if(f === null){ celsiusEl.value = ''; return; }
  const c = (f - 32) * 5 / 9;
  celsiusEl.value = formatNumber(c);
});

celsiusEl.addEventListener('input', () => {
  const c = parseNumber(celsiusEl.value);
  if(c === null){ fahrenheitEl.value = ''; return; }
  const f = c * 9 / 5 + 32;
  fahrenheitEl.value = formatNumber(f);
});

function parseFeetInches(str){
  if(!str) return null;
  const cleaned = str.trim().toLowerCase();
  if(cleaned === '') return null;

  // Formate: 5'9", 5' 9, 5'9, 5 9, 5,9
  let match = cleaned.match(/^(\d+)\s*['′]\s*(\d+(?:[.,]\d+)?)\s*["″]?\s*$/);
  if(match){
    return parseFloat(match[1]) * 12 + parseFloat(match[2].replace(',', '.'));
  }

  match = cleaned.match(/^(\d+)[\s,]+(\d+(?:[.,]\d+)?)$/);
  if(match){
    return parseFloat(match[1]) * 12 + parseFloat(match[2].replace(',', '.'));
  }

  const single = parseNumber(cleaned);
  if(single !== null) return single * 12;

  return null;
}

function cmToFeetInches(cm){
  const totalInches = cm / 2.54;
  let feet = Math.floor(totalInches / 12);
  let inches = Math.round((totalInches - feet * 12) * 10) / 10;
  if(inches >= 12){ feet += 1; inches -= 12; }
  const inchesStr = Number.isInteger(inches) ? inches : inches.toFixed(1).replace('.', ',');
  return feet + "'" + inchesStr + '"';
}

feetInchesEl.addEventListener('input', () => {
  const totalInches = parseFeetInches(feetInchesEl.value);
  if(totalInches === null){ cmEl.value = ''; return; }
  const cm = totalInches * 2.54;
  cmEl.value = formatNumber(cm);
});

cmEl.addEventListener('input', () => {
  let val = parseNumber(cmEl.value);
  if(val === null){ feetInchesEl.value = ''; return; }
  const cm = val < 10 ? val * 100 : val;
  feetInchesEl.value = cmToFeetInches(cm);
});

const milesEl = document.getElementById('miles');
const kmEl = document.getElementById('km');

milesEl.addEventListener('input', () => {
  const miles = parseNumber(milesEl.value);
  if(miles === null){ kmEl.value = ''; return; }
  kmEl.value = formatNumber(miles * 1.60934);
});

kmEl.addEventListener('input', () => {
  const km = parseNumber(kmEl.value);
  if(km === null){ milesEl.value = ''; return; }
  milesEl.value = formatNumber(km / 1.60934);
});

const lbsEl = document.getElementById('lbs');
const kgEl = document.getElementById('kg');

lbsEl.addEventListener('input', () => {
  const lbs = parseNumber(lbsEl.value);
  if(lbs === null){ kgEl.value = ''; return; }
  kgEl.value = formatNumber(lbs * 0.45359237);
});

kgEl.addEventListener('input', () => {
  const kg = parseNumber(kgEl.value);
  if(kg === null){ lbsEl.value = ''; return; }
  lbsEl.value = formatNumber(kg / 0.45359237);
});