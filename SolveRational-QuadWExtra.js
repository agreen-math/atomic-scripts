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
  return randomItem([2,3,4,5,6,7,8,9]);
}

function getEQ(a,b,c,d){ 
    return `\\frac{${b}x^2-${c}}{x-${a}}=${b}x-${d}` } 

setColumns(["equation","solutions"]);
seed(42);

const rows = 50;

for(let i=0; i<rows; i++){
  const a=getA();
  const b=getB();
  const c=a^2*b;
  const d=a*b;
  
  const equation=getEQ(a,b,c);
  const solutions="none"
  addRow([equation,solutions]);
}


