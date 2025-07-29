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
  return randomItem([23,29,31,37,41,43]);
}

function getB(){
  return randomItem([1,2,3,4,5,6,7,8,9]);
}

function getC(){
  return randomItem([1,2,3,4,5,6,7,8,9]);
}

function getT(){
  return randomItem(["t","z","p","y"]);
}

setColumns(["a","b","c","t","sol"]);
seed(42);

const rows = 80;

for(let i=0; i<rows; i++){
  const a=getA();
  const b=getB();  
  const c=getC();
  const t=getT();
  const n1=c-b;
  const n2=-c-b;
  const sol=`"\\frac{${n1}}{${a}},\\frac{${n2}}{${a}}"`
  addRow([a,b,c,t,sol]);
}



