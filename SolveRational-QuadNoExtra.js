function round(value, decimal_places){
  return value.toFixed(decimal_places);
}

function randomValue(min, max, decimal_places){
  // Assuming getRandom() is a function in your environment that returns a value [0, 1)
  // If not, replace with Math.random()
  return round(min + Math.random()*(max-min), decimal_places);
}

function randomItem(list){
  // Corrected to handle a 0-based index properly
  var selection = Math.floor(Math.random() * list.length);
  return list[selection];
}

function getA(){
  return randomItem([1,2,3,4,5,6,7,8,9]);
}

function getB(){
  // FIX: Removed -1 from this list. When b = -1, the script creates an
  // equation where x = -1 is an extraneous solution, but it was incorrectly
  // listed as a valid solution. This change prevents that case.
  return randomItem([1,5,11,19]);
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
// seed(42); // Seeding might not be available in all JS environments.

const rows = 80;

for(let i=0; i<rows; i++){
  const a=getA();
  const b=getB();
  const c=a*b;

  const sqrt=Math.sqrt(4*b+5);

  const sol1=(2*b+1+sqrt)/2;
  const sol2=(2*b+1-sqrt)/2;

  const equation=getEQ(a,b,c);
  // Enclose solutions in quotes for proper CSV formatting
  const solutions=`"${sol1},${sol2}"`
  addRow([equation,solutions]);
}
