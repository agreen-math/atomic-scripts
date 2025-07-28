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
  return randomItem([-2,-3,-4,-5,-6,-7,-8,-9,2,3,4,5,6,7,8,9]);
}

function getC(){
  return randomItem([1,2,3,4,5,6,7,8,9,-1,-2,-3,-4,-5,-6,-7,-8,-9]);
}

function getT(){
  return randomItem(["t","z","p"]);
}


setColumns(["f","dq"]);
seed(42);

const rows = 50;

for(let i=0; i<rows; i++){
  const b=getB();
  const c=getC();  
  const t=getT();
  const f=`f(${t})=${b}${t}${c}`
  addRow([f,b]);
}



