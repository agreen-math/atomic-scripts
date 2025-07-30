function round(value, decimal_places){
  return value.toFixed(decimal_places);
}

function randomValue(min, max, decimal_places){
  return round(min + getRandom()*(max-min), decimal_places);

}function randomItem(list){
  var selection = randomValue(0, list.length-1, 0);
  return list[selection];
}

function texPoly(coefficients) {
  let terms = [];

  for (let i = 0; i < coefficients.length; i++) {
    const coef = coefficients[i];
    const degree = coefficients.length - 1 - i;

    if (coef === 0) continue; // skip zero terms

    // Sign prefix
    const sign = coef > 0 ? (terms.length > 0 ? " + " : "") : " - ";

    // Absolute value for formatting
    const absCoef = Math.abs(coef);

    // Term content
    let term = "";
    if (degree === 0) {
      term = `${absCoef}`;
    } else if (degree === 1) {
      term = (absCoef === 1 ? "" : `${absCoef}`) + "x";
    } else {
      term = (absCoef === 1 ? "" : `${absCoef}`) + `x^${degree}`;
    }

    terms.push((coef < 0 ? sign + term : sign.trim() + term));
  }

  return terms.join("");
}

function gcd(a, b) {
  while (b !== 0) {
    [a, b] = [b, a % b];
  }
  return Math.abs(a);
}

function texFrac(cnum, cdenom) {
  // Handle signs: normalize so denominator is positive
  if (cdenom < 0) {
    cnum = -cnum;
    cdenom = -cdenom;
  }

  const divisor = gcd(cnum, cdenom);
  const num = cnum / divisor;
  const denom = cdenom / divisor;

  if (denom === 1) {
    return `${num}`; // e.g., 4/2 → "2"
  } else {
    return `\\frac{${num}}{${denom}}`;
  }
}