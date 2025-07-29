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
  return randomItem([1,2,3,4,5,6,7,8,9]);
}

function getB(){
  return randomItem([3,4,5]);
}

function getC(){
  return randomItem([1,2]);
}

function getD(){
  return randomItem([7,8,9]);
}

  function getEQ(a,b,c,d){
  if (a==1) {
    return `f(x)=\\frac{(x+${b})(x-${b})(x-${d})}{(x+${c})(x+${d})}`
  } else {
    return `f(x)=\\frac{(x+${b})(x-${b})(x-${d})}{${a}(x+${c})(x+${d})}`
  }
}

setColumns(["equation","domain","VA","holes","HOAsymp","Xint","Yint","ineq","negLim","posLim"]);
seed(42);

const rows = 80;

for(let i=0; i<rows; i++){
  const a=getA();
  const b=getB();
  const c=getC();
  const d=getD();

  const Yint=(b^2*d)/(a*c*d);
  
  const equation=getEQ(a,b,c,d);
  const domain=`"(-\\infty,-${d})\\cup(-${d},-${c})\\cup(-${c},\\infty)"`
  const VA=`"-${c},-${d}"`
  const holes=`none`
  const HOAsymp=`\\frac{1}{${a}}x+idk`
  const Xint=`"${b},-${b},${d}"`
  const ineq=`"(-${d},-${b})\\cup(-${c},${b})\\cup(${d},\\infty)"`
  const negLim=`-\\infty`
  const posLim=`\\infty`
  addRow([equation,domain,VA,holes,HOAsymp,Xint,Yint,ineq,negLim,posLim]);
}


