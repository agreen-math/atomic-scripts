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
  return randomItem([2,4,6,8,10]);
}

function getR(){
  return randomItem([3,5,6,7,10,11,13]);
}

  function getEQ(a,b,c,d){
  if (c==0) {
    return `${a}x^3-${b}x^2+${d}=0`
  } else {
    return `${a}x^3-${b}x^2+${d}=${c}x`
  }
}

setColumns(["equation","solutions"]);
seed(42);

const rows = 80;

for(let i=0; i<rows; i++){
  const a=getA();
  const r=getR();
  const b=3*a;
  const c=-a*(3-r);
  const d=a*(r-1);

  const equation=getEQ(a,b,c,d);
  
  const solutions=`"1,1+\\sqrt{${r}},1-\\sqrt{${r}}"`
  addRow([equation,solutions]);
}





