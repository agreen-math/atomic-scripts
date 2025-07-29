function round(value, decimal_places){
  return value.toFixed(decimal_places);
}

function randomValue(min, max, decimal_places){
  return round(min + getRandom()*(max-min), decimal_places);

}function randomItem(list){
  var selection = randomValue(0, list.length-1, 0);
  return list[selection];
}

function getP(){
  return randomItem([1,2,3,4,5,6,7,8,9]);
}

function getQ(){
  return randomItem([1,2,3,4,5,6,7,8,9]);
}

setColumns(["p","q","b","c","s1","s2"]);
seed(42);

const rows = 50;

for(let i=0; i<rows; i++){
  const p=getP();
  const q=getQ();
  const b=p+q;
  const c=p*q;
  const s1=p
  const s2=q
  addRow([p,q,b,c,s1,s2]);
}


