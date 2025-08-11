function getSide1(){
  // Generate a random integer between 61 and 69.
  // Math.random() * (max - min + 1) + min
  // Here, min = 61 and max = 69
  const randomInt = Math.floor(Math.random() * (15 - 10 + 1)) + 10;
  return randomInt;
}

function getHyp() {
  const randomInt = Math.floor(Math.random() * (21 - 16 + 1)) + 16;
  return randomInt;
}

setColumns(["side1","hyp","side2","angle1","angle2","angle3"]);

const rows = 50;

for (let i = 0; i < rows; i++) {
  const side1 = getSide1();
  const hyp = getHyp();
  const side2 = Math.sqrt(hyp * hyp - side1 * side1);
  // Calculate angles using right triangle properties
  const angle1 = Math.atan(side2 / side1) * (180 / Math.PI); // in degrees
  const angle2 = Math.atan(side1 / side2) * (180 / Math.PI); // in degrees
  const angle3 = 90; // right angle

  addRow([side1,hyp,side2.toFixed(1),angle1.toFixed(1), angle2.toFixed(1), angle3]);
  // Note: angles are in degrees, angle3 is always 90 degrees
}