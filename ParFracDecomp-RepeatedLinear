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

function getA(){ return randomItem([-5,-4,-3,-2,-1,1,2,3,4,5]); }
function getB(){ return randomItem([-20,-15,-10,-5,0,5,10,15,20]); }
function getR(){ return randomItem([-5,-4,-3,-2,-1,1,2,3,4,5]); }

setColumns(["expression", "decomposed"]);
seed(42);

const rows = 50;

for (let i = 0; i < rows; i++) {
  let a, b, r, A, B;

  do {
    a = getA();
    b = getB();
    r = getR();

    A = a;
    B = b - a * r;
  } while (!Number.isInteger(B) || A === 0 || B === 0);

  const numerator = texPoly([a, b]);
  const denom = texPoly([1, 2 * r, r * r]); // only for expression display
  const factor = texPoly([1, r]);

  const expression = `"\\frac{${numerator}}{(${factor})^2}"`;
  const decomposed = `"\\frac{${A}}{${factor}} + \\frac{${B}}{(${factor})^2}"`;

  addRow([expression, decomposed]);
}
