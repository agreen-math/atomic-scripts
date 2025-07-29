function round(value, decimal_places){
  return value.toFixed(decimal_places);
}

function randomValue(min, max, decimal_places){
  return round(min + getRandom() * (max - min), decimal_places);
}

function randomItem(list){
  var selection = randomValue(0, list.length - 1, 0);
  return list[selection];
}

function texPoly(coefficients) {
  let terms = [];

  for (let i = 0; i < coefficients.length; i++) {
    const coef = coefficients[i];
    const degree = coefficients.length - 1 - i;

    if (coef === 0) continue;

    const sign = coef > 0 ? (terms.length > 0 ? " + " : "") : " - ";
    const absCoef = Math.abs(coef);

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

function getA(){ return randomItem([-10,-9,-8,-7,-6,-5,-4,-3,-2,-1,1,2,3,4,5,6,7,8,9,10]); }
function getB(){ return randomItem([-10,-9,-8,-7,-6,-5,-4,-3,-2,-1,1,2,3,4,5,6,7,8,9,10]); }
function getM(){ return randomItem([-10,-9,-8,-7,-6,-5,-4,-3,-2,-1,1,2,3,4,5,6,7,8,9,10]); }
function getN(m) {
  let n;
  do {
    n = randomItem([-10,-9,-8,-7,-6,-5,-4,-3,-2,-1,1,2,3,4,5,6,7,8,9,10]);
  } while (m === n);
  return n;
}

function isInteger(x) {
  return Number.isInteger(x);
}

setColumns(["expression", "decomposed"]);
seed(42);

const rows = 50;

for (let i = 0; i < rows; i++) {
  let a, b, m, n, A, B;
  do {
    a = getA();
    b = getB();
    m = getM();
    n = getN(m);

    const den = n - m;
    const numA = b - a * m;

    A = numA / den;
    B = a - A;
  } while (
    !isInteger(A) || !isInteger(B) ||
    A === 0 || B === 0
  );

  const num = texPoly([a, b]);
  const den1 = texPoly([1, m]);
  const den2 = texPoly([1, n]);

  const expression = `"\\frac{${num}}{(${den1})(${den2})}"`;
  const decomposed = `"\\frac{${A}}{${den1}}+\\frac{${B}}{${den2}}"`;

  addRow([expression, decomposed]);
}
