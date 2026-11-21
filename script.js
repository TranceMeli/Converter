// ---------- Parsing & formatting (pure functions) ----------

// Returns a number, null for empty/incomplete input (e.g. "" or "-"), NaN for invalid input.
function parseNumber(str){
  if(str === undefined || str === null) return null;
  const s = str.trim();
  if(s === '' || s === '-') return null;
  if(!/^-?\d+(?:[.,]\d*)?$/.test(s) && !/^-?[.,]\d+$/.test(s)) return NaN;
  return parseFloat(s.replace(',', '.'));
}

function formatNumber(num){
  if(!isFinite(num)) return '';
  const abs = Math.abs(num);
  const decimals = abs < 1 ? 3 : abs < 10 ? 2 : 1;
  const factor = Math.pow(10, decimals);
  const rounded = Math.round(num * factor) / factor;
  return rounded.toString().replace('.', ',');
}

// Returns total inches, null for empty input, NaN for invalid input.
// Formats: 5'9", 5' 9, 5'9, 5 9, 5,9 or a single number (feet).
function parseFeetInches(str){
  if(str === undefined || str === null) return null;
  const s = str.trim().toLowerCase();
  if(s === '') return null;

  let match = s.match(/^(\d+)\s*['′]\s*(\d+(?:[.,]\d+)?)\s*["″]?$/);
  if(match){
    return parseFloat(match[1]) * 12 + parseFloat(match[2].replace(',', '.'));
  }

  match = s.match(/^(\d+)[\s,]+(\d+(?:[.,]\d+)?)$/);
  if(match){
    return parseFloat(match[1]) * 12 + parseFloat(match[2].replace(',', '.'));
  }

  // Feet only, e.g. "5" or "5'" (while typing)
  match = s.match(/^(\d+(?:[.,]\d+)?)\s*['′]?$/);
  if(match){
    return parseFloat(match[1].replace(',', '.')) * 12;
  }

  return NaN;
}

function cmToFeetInches(cm){
  const totalInches = cm / 2.54;
  let feet = Math.floor(totalInches / 12);
  let inches = Math.round((totalInches - feet * 12) * 10) / 10;
  if(inches >= 12){ feet += 1; inches -= 12; }
  const inchesStr = Number.isInteger(inches) ? inches : inches.toFixed(1).replace('.', ',');
  return feet + "'" + inchesStr + '"';
}

// Values below 10 in the cm field are read as meters (1,75 = 175 cm).
function toCentimeters(val){
  return val < 10 ? val * 100 : val;
}

if(typeof module !== 'undefined'){
  module.exports = { parseNumber, formatNumber, parseFeetInches, cmToFeetInches, toCentimeters };
}

// ---------- DOM wiring ----------

if(typeof document !== 'undefined'){
  const MSG_NUMBER = 'Gib eine Zahl ein, z. B. 98,6.';
  const MSG_FEET = "Format nicht erkannt. Versuche z. B. 5'9\" oder 5 9.";

  function setError(errEl, inputEl, message){
    errEl.textContent = message ? '⚠ ' + message : '';
    if(message){
      inputEl.setAttribute('aria-invalid', 'true');
    } else {
      inputEl.removeAttribute('aria-invalid');
    }
  }

  // Links two fields: typing in one updates the other.
  function link({ a, b, errId, parseA, parseB, aToB, bToA, msgA, msgB }){
    const aEl = document.getElementById(a);
    const bEl = document.getElementById(b);
    const errEl = document.getElementById(errId);

    function handle(src, dst, parse, convert, msg){
      src.addEventListener('input', () => {
        const val = parse(src.value);
        dst.value = '';
        dst.removeAttribute('aria-invalid');
        if(val === null){ setError(errEl, src, ''); return; }
        if(Number.isNaN(val)){ setError(errEl, src, msg); return; }
        setError(errEl, src, '');
        dst.value = convert(val);
      });
    }

    handle(aEl, bEl, parseA, aToB, msgA);
    handle(bEl, aEl, parseB, bToA, msgB);
  }

  link({
    a: 'fahrenheit', b: 'celsius', errId: 'err-temp',
    parseA: parseNumber, parseB: parseNumber,
    aToB: f => formatNumber((f - 32) * 5 / 9),
    bToA: c => formatNumber(c * 9 / 5 + 32),
    msgA: MSG_NUMBER, msgB: MSG_NUMBER
  });

  link({
    a: 'feetInches', b: 'cm', errId: 'err-height',
    parseA: parseFeetInches, parseB: parseNumber,
    aToB: totalInches => formatNumber(totalInches * 2.54),
    bToA: val => cmToFeetInches(toCentimeters(val)),
    msgA: MSG_FEET, msgB: MSG_NUMBER
  });

  link({
    a: 'miles', b: 'km', errId: 'err-dist',
    parseA: parseNumber, parseB: parseNumber,
    aToB: mi => formatNumber(mi * 1.60934),
    bToA: km => formatNumber(km / 1.60934),
    msgA: MSG_NUMBER, msgB: MSG_NUMBER
  });

  link({
    a: 'lbs', b: 'kg', errId: 'err-weight',
    parseA: parseNumber, parseB: parseNumber,
    aToB: lbs => formatNumber(lbs * 0.45359237),
    bToA: kg => formatNumber(kg / 0.45359237),
    msgA: MSG_NUMBER, msgB: MSG_NUMBER
  });

  // Select the whole value on focus so it can be overwritten right away.
  document.querySelectorAll('input.digits').forEach(el => {
    el.addEventListener('focus', () => setTimeout(() => el.select(), 0));
  });
}
