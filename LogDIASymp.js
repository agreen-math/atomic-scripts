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
  return randomItem([2,3]);
}

function getB(a) {
  let b;
  do {
    b = randomItem([2,3]);
  } while (a === b);
  return b;
}

function getD(){
  return randomItem([-10,-9,-8,-7,-6,-5,-4,-3,-2,-1,1,2,3,4,5,6,7,8,9]);
}

  function getEQ(b,c,d){
    return `f(x)=\\log_{${b}}\\left(x+${c}\\right)+${d}`
}

function getNegLim(a){if (a>0) {
    return `\\infty`
  } else {
    return `-\\infty`
  }}

setColumns(["equation","domain","VA","Xint","Yint","ineq","VALim","posLim"]);
seed(42);

const rows = 50;

for(let i=0; i<rows; i++){
  
  const a=getA();
  const b=getB();
  const d=getD();
  const c = b ** a;

  const VA = -c;
  const Xint = b ** (-d) - c;
  const Yint = logBase(b, c) + d;

  const equation=getEQ(b,c,d);
  const domain=`"(${VA},\\infty)"`
  
  const ineq=`"(${Xint},\\infty)"`
  const VALim=`-\\infty`
  const posLim=`\\infty`
  addRow([equation,domain,VA,Xint,Yint,ineq,VALim,posLim]);
}


