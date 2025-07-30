function round(value, decimal_places){
  return value.toFixed(decimal_places);
}

function randomValue(min, max, decimal_places){
  return round(min + getRandom()*(max-min), decimal_places);

}function randomItem(list){
  var selection = randomValue(0, list.length-1, 0);
  return list[selection];
}

function pickRandom(arr) {
    return arr[Math.floor(Math.random() * arr.length)];
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

//------------------------------------------------------------------------

function getA(){
  return randomItem([-1,-2,-3,-4,-5,-6,-7,-8,-9,1,2,3,4,5,6,7,8,9]);
}

function getB(){
  return randomItem([-1,-2,-3,-4,-5,-6,-7,-8,-9,1,2,3,4,5,6,7,8,9]);
}

function getC(a){
  let c;
  do {
    c = randomItem([2,3]);
  } while (c === a);
  return c;
}

function getD(){
  return randomItem([-1,-2,-3,-4,-5,-6,-7,-8,-9,1,2,3,4,5,6,7,8,9]);
}

function getE(){
  return randomItem([2,3,4,5]);
}

function getEQ(a,b,c,d,e){
    const exponent1 = texPoly([a,b]);
    const exponent2 = texPoly([1,d]);
    const base2=e**c;
    return `${e}^{\\left(${exponent1}\\right)}=${base2}^{\\left(${exponent2}\\right)}`
}

function getSol(a,b,c,d){
    const num= c*d-b;
    const denom=a-c;
    const solution=texFrac(num,denom);
    return `${solution}`
}

setColumns(["equation","solutions"]);
seed(42);

const rows = 50;

for(let i=0; i<rows; i++){
  const a=getA();
  const b=getB();
  const c=getC(a);
  const d=getD();
  const e=getE();

  const equation=getEQ(a,b,c,d,e);
  const solutions=getSol(a,b,c,d);

  addRow([equation,solutions]);
}


