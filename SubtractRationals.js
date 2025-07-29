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


function getA(){
  return randomItem([2,3,4,5,6,7,8,9]);
}

function getB(){
  return randomItem([1,2,3,4,5,6,7,8,9]);
}

function getC(){
  return randomItem([2,3,4,5,6,7,8,9]);
}

function getD(){
  return randomItem([1,2,3,4,5,6,7,8,9]);
}

function getM(){
  return randomItem([1,2,3,4,5,6,7,8,9]);
}

function getN(m) {
  let n;
  do {
    n = randomItem([1,2,3,4,5,6,7,8,9]);
  } while (n === m);
  return n;
}

setColumns(["expression","simplified","alt"]);
seed(42);

const rows = 50;

for(let i=0; i<rows; i++){
  const a=getA();
  const b=getB();  
  const c=getC();
  const d=getD();
  const m=getM();
  const n=getN(m);

  const A=a-c;
  const B=a*n+b-c*m-d;
  const C=b*n-d*m;

  const D=m+n;
  const E=m*n

  const num=texPoly([A,B,C]);
  
  const expression=`"\\frac{${a}x+${b}}{x+${m}}-\\frac{${c}x+${d}}{x+${n}}"`
  const simplified=`"\\frac{${num}}{(x+${m})(x+${n})}"`
  const alt=`"\\frac{${num}}{(x^2+${D}x+${E}}"`


  addRow([expression,simplified,alt]);
}