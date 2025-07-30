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

const bases = ['log', 'ln', 'log_2', 'log_3'];

function cleanBaseLatex(base, val) {
    if (base === 'ln') return `\\ln\\left(${val}\\right)`;
    if (base === 'log') return `\\log\\left(${val}\\right)`;
    if (base.startsWith('log_')) {
        const b = base.split('_')[1];
        return `\\log_{${b}}\\left(${val}\\right)`;
    }
    return `\\log\\left(${val}\\right)`;
}

//------------------------------------------------------------------------

function getA(){
  return randomItem([2,3,4,5,6,7,8,9]);
}

function getC(){
  return randomItem([1,2,3,4,5,6,7,8,9]);
}

function getE(c){
  let e;
  do {
    e = randomItem([2,3,4,5,6,7,8,9]);
  } while (c === e);
  return e;
}

function getD(a){
  let d;
  do {
    d = randomItem([2,3,4,5,6,7,8,9]);
  } while (a === d);
  return d;
}

function getEQ(a,base,c,d,e){
    const expr1= `${a}x+${c}`
    const expr2= `${d}x+${e}`
    const Logexp1 = cleanBaseLatex(base,expr1);
    const Logexp2 = cleanBaseLatex(base,expr2);
    return `${Logexp1}=${Logexp2}`
}

function getSol(a,c,d,e){
    const num= e-c;
    const denom=a-d;
    const solution=texFrac(num,denom);
    return `${solution}`
}

setColumns(["equation","solutions"]);
seed(42);

const rows = 50;

for(let i=0; i<rows; i++){
  const a=getA();
  const c=getC();
  const base=pickRandom(bases);
  const d=getD(a);
  const e=getE(c);

  const equation=getEQ(a,base,c,d,e);
  const solutions=getSol(a,c,d,e);

  addRow([equation,solutions]);
}


