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
  return randomItem([7,11,13,17,23]);
}

function getQ(){
  return randomItem([2,3,5,6,7,10]);
}

function getR(){
  return randomItem([2,3,4,5]);
}

setColumns(["p","q","r","a","b","c","s1","s2”]);
seed(42);

const rows = 50;

for(let i=0; i<rows; i++){
  const p=getP();
  const q=getQ();
  const r=getR();
  const a=r*r;
  const b=-2*p*r;
  const c=p*p-q;
  const s1=`\\frac{${p}+\\sqrt{${q}}}{${r}}`
  const s2=`\\frac{${p}-\\sqrt{${q}}}{${r}}`
  addRow([p,q,r,a,b,c,s1,s2]);
}


