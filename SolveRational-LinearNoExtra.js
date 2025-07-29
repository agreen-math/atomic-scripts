function round(value, decimal_places){
  return value.toFixed(decimal_places);
}

function randomValue(min, max, decimal_places){
  return round(min + getRandom()*(max-min), decimal_places);

}function randomItem(list){
  var selection = randomValue(0, list.length-1, 0);
  return list[selection];
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

function getA(){
  return randomItem([-10,-9,-8,-7,-6,-5,-4,-3,-2,-1,2,3,4,5,6,7,8,9,10]);
}


function getEQ(a){ 
    return `\\frac{x}{x-1}-\\frac{${a}}{x+1}=1` } 

setColumns(["equation","solutions"]);
seed(42);

const rows = 80;

for(let i=0; i<rows; i++){
  const a=getA();
  const cnum=-(1+a);
  const cdenom=1-a;

  const solutions=texFrac(cnum,cdenom);
    const equation=getEQ(a);
  addRow([equation,solutions]);
}