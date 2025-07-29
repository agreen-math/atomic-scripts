function round(value, decimal_places){
  return value.toFixed(decimal_places);
}

function randomValue(min, max, decimal_places){
  return round(min + getRandom()*(max-min), decimal_places);

}function randomItem(list){
  var selection = randomValue(0, list.length-1, 0);
  return list[selection];
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

setColumns(["expression","simplified"]);
seed(42);

const rows = 50;

for(let i=0; i<rows; i++){
  const a=getA();
  const b=getB();  
  const c=getC();
  const d=getD();
  const m=getM();
  const n=getN(m);

  const A=a+c;
  const B=a*n+b+c*m+d;
  const C=b*n+d*m;

  const expression=`"\\frac{${a}x+${b}}{x+${m}}+\\frac{${c}x+${d}}{x+${n}}"`

  const simplified=`"\\frac{${A}x^2+${B}x+${C}}{(x+${m})(x+${n})}"`

  addRow([expression,simplified]);
}