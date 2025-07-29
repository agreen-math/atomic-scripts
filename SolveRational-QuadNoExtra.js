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
  return randomItem([-1,1,5,11,19]);
}

function getEQ(a,b,c){ 
  if (a==1 && b==-1) { 
    return `\\frac{x${b}}{x+1}=\\frac{${a}}{x${b}}` } 
  else if (a!=1 && b==-1) { 
    return `\\frac{${a}x${c}}{x+1}=\\frac{${a}}{x${b}}` } 
  else if (a==1 && b!=1) { 
    return `\\frac{x-${b}}{x+1}=\\frac{${a}}{x-${b}}` } 
  else { 
    return `\\frac{${a}x-${c}}{x+1}=\\frac{${a}}{x-${b}}` }} 

setColumns(["equation","solutions"]);
seed(42);

const rows = 80;

for(let i=0; i<rows; i++){
  const a=getA();
  const b=getB();
  const c=a*b;

  const sqrt=Math.sqrt(4*b+5);

  const sol1=(2*b+1+sqrt)/2;
  const sol2=(2*b+1-sqrt)/2;
  
  const equation=getEQ(a,b,c);
  const solutions="${sol1},${sol2}"
  addRow([equation,solutions]);
}


