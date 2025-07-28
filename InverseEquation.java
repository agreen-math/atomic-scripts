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

setColumns(["a","b","c","d","f","t"]);
seed(42);

const rows = 50;

for(let i=0; i<rows; i++){
  const a=getA();
  const b=getB();  
  const c=getC();
  const d=getD();
  const f=getF();
  const t=getT();
  addRow([a,b,c,d,f,t]);
}

