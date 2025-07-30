function round(value, decimal_places){
  return value.toFixed(decimal_places);
}

function randomValue(min, max, decimal_places){
  return round(min + getRandom()*(max-min), decimal_places);

}function randomItem(list){
  var selection = randomValue(0, list.length-1, 0);
  return list[selection];
}

function formatSigned(value) {
  return value < 0 ? ` - ${Math.abs(value)}` : value > 0 ? ` + ${value}` : "";
}

function formatBare(value) {
  return value < 0 ? `-${Math.abs(value)}` : `${value}`;
}

function getA(){
  return randomItem(["e","2","3","4","5","6","7","8","9","10"]);
}

function getB(){
  return randomItem([-10,-9,-8,-7,-6,-5,-4,-3,-2,-1,1,2,3,4,5,6,7,8,9,10]);
}

function getC(b) {
  let c;
  do {
    c = randomItem([-10,-9,-8,-7,-6,-5,-4,-3,-2,-1,1,2,3,4,5,6,7,8,9,10]);
  } while (b === c);
  return c;
}

function getF(){
  return randomItem(["f","g","h"]);
}

function getT(){
  return randomItem(["t","z","p"]);
}

function getExp(a, b, c, f, t) {
  const bPart = formatSigned(-b);
  const cPart = formatSigned(c);
  return `${a}^{\\left(${t}${bPart}\\right)}${cPart}`;
}

function getLog(a, b, c, f, t) {
  const cPart = formatSigned(-c);
  const bPart = formatSigned(b);

  if (a === "10") {
    return `\\log\\left(${t}${cPart}\\right)${bPart}`;
  } else if (a === "e") {
    return `\\ln\\left(${t}${cPart}\\right)${bPart}`;
  } else {
    return `\\log_{${a}}\\left(${t}${cPart}\\right)${bPart}`;
  }
}

setColumns(["a","b","c","f","t","exp","log"]);
seed(42);

const rows = 50;

for(let i=0; i<rows; i++){
  const a=getA();
  const b=getB();  
  const c=getC();
  const f=getF();
  const t=getT();
  const exp=getExp(a,b,c,f,t);
  const log=getLog(a,b,c,f,t);
  addRow([a,b,c,f,t,exp,log]);
}

