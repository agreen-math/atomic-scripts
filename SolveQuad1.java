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
  return randomItem([2,3,5,7]);
}

function getC(){
  return randomItem([1,2,3,4,5,6,7,8,9]);
}

setColumns(["a","b","c","s1","s2"]);
seed(42);

const rows = 50;

for(let i=0; i<rows; i++){
  const a=getA();
  const c=getC();
  const b=-1*(a*c+1);
  const s1=`-\\frac{1}{${a}}`;
  const s2=c;
  addRow([a,b,c,s1,s2]);
}


