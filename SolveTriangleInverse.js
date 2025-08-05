function round(value, decimal_places){
  return value.toFixed(decimal_places);
}

function randomValue(min, max, decimal_places){
  return round(min + getRandom()*(max-min), decimal_places);

}function randomItem(list){
  var selection = randomValue(0, list.length-1, 0);
  return list[selection];
}

function pickRandom(arr) {
    return arr[Math.floor(Math.random() * arr.length)];
}

function getSide(){
  return randomItem([3,4,5,6,7,8,9]);
}

function getAngle(){
  return randomItem([25,30,35,40,45]);
}

function getLetters() {
  const startSide = ["a", "b"];
  const givenSide = pickRandom(startSide);

  const startAngle = {
    a: "B",
    b: "A"
  };
  const findSide = {
    a: "b",
    b: "a"
  };
  const findAngle = {
    a: "A",
    b: "B"
  };

  const givenAngle = startAngle[givenSide];
  const remainingSide = findSide[givenSide];
  const remainingAngle = findAngle[givenSide];

  return [givenSide, givenAngle, remainingSide, remainingAngle];
}

setColumns(["givenSide","givenAngle","remainingSide","remainingAngle","side1","angle2","side2","angle1","side3","angle3"]);
seed(42);

const rows = 50;

for(let i=0; i<rows; i++){
  const a=getSide();
  const B=getAngle();
  const [startSide, startAngle, findSide, findAngle] = getLetters();
  const C=`90\\degree`;

  const b=`${a}\\tan\\left(${B}\\degree\\right)`
  const A=90-B;
  const Atex=`${A}\\degree`;
  const c=`\\frac{${a}}{\\cos\\left(${B}\\degree\\right)}`;

  addRow([startSide,startAngle,findSide,findAngle,a,B,b,Atex,c,C]);
}