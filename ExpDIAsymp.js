function round(value, decimal_places){
  return value.toFixed(decimal_places);
}

function randomValue(min, max, decimal_places){
  return round(min + getRandom()*(max-min), decimal_places);

}function randomItem(list){
  var selection = randomValue(0, list.length-1, 0);
  return list[selection];
}

function logBase(b, x) {
  return Math.log(x) / Math.log(b); // Using natural logarithm (base e)
}

function isInteger(x) {
  return Number.isInteger(x);
}

function getA(){
  return randomItem([-9,-8,-7,-6,-5,-4,4,5,6,7,8,9]);
}

function getB(a) {
  let b;
  do {
    b = randomItem([2,3]);
  } while (a === b);
  return b;
}

  function getEQ(a,b,c){
    return `f(x)=${a}\\cdot ${b}^{-x}+${c}`
}

function getNegLim(a){if (a>0) {
    return `\\infty`
  } else {
    return `-\\infty`
  }}

function getIneq(a){if (a<0) {
  return `"(0,\\infty)"`
} else {
  return `"(-\\infty,0)"`
}}

setColumns(["equation","domain","HA","Xint","Yint","ineq","posLim","negLim"]);
seed(42);

const rows = 50;

for(let i=0; i<rows; i++){
  
  const a=getA();
  const b=getB();
  const c=-a;
  const Xint=0;
  const Yint=0;
  const equation=getEQ(a,b,c);
  const domain=`"(-\\infty,\\infty)"`
  const HA=c;
  const ineq=getIneq(a);
  const negLim=getNegLim(a);
  const posLim=c;
  addRow([equation,domain,HA,Xint,Yint,ineq,posLim,negLim]);
}


