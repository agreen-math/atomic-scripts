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
  return randomItem([2,3,4,5,6,7,8,9,-2,-3,-4,-5,-6,-7,-8,-9]);
}

function getN(){
  return randomItem([6,7,8,9]);
}

function getO(){
  return randomItem([4,5]);
}

function getP(){
  return randomItem([2,3]);
}

function getB(){
  return randomItem([2,3,4,5,6,7,8,9]);
}

function getC(){
  return randomItem([2,3,4,5,6,7,8,9]);
}

function getD(){
  return randomItem([2,3,4,5,6,7,8,9]);
}

function getF(){
  return randomItem(["f","g","h"]);
}

function getT(){
  return randomItem(["t","z","p"]);
}

function getL(a, n) {
  if (a > 0 && n % 2 === 0) {
    return("\\infty");
  } else if (a > 0 && n % 2 !== 0) {
    return("-\\infty");
  } else if (a < 0 && n % 2 === 0) {
    return("-\\infty");
  } else if (a < 0 && n % 2 !== 0) {
    return("\\infty");
  } else {
    return("oops");
  }
}

function getR(a) {
  if (a > 0) {
    return("\\infty");
  } else if (a < 0) {
    return("-\\infty");
  } else {
    return("oops");
  }
}

setColumns(["a","n","o","p","b","c","d","f","t","R","L"]);
seed(42);

const rows = 50;

for(let i=0; i<rows; i++){
  const a=getA();
  const n=getN();  
  const o=getO();  
  const p=getP();  
  const b=getB();  
  const c=getC();
  const d=getD();
  const f=getF();
  const t=getT();
  const r=getR(a);  
  const l=getL(a,n);  
  addRow([a,n,o,p,b,c,d,f,t,r,l]);
}



