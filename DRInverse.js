function round(value, decimal_places){
  return value.toFixed(decimal_places);
}

function randomValue(min, max, decimal_places){
  return round(min + getRandom()*(max-min), decimal_places);

}function randomItem(list){
  var selection = randomValue(0, list.length-1, 0);
  return list[selection];
}

function getB(){
  return randomItem([-1,1,0,-2,-3,-4,-5,-6,-7,-8,-9,2,3,4,5,6,7,8,9]);
}

function getF(){
  return randomItem(["f","g","h"]);
}

function getT(){
  return randomItem(["t","z","p"]);
}

function getE(){
  return randomItem(["]",")"]);
}


setColumns(["fu","R"]);
seed(42);

const rows = 50;

for(let i=0; i<rows; i++){
  const b=getB();
  const f=getF();  
  const t=getT();
  const e=getE();
  const fu=`${f}(${t})`
  const r=`\\left(-\\infty,${b}${e}`
  addRow([fu,r]);
}





