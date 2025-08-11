function getSide1(){
  // Generate a random integer between 61 and 69.
  // Math.random() * (max - min + 1) + min
  // Here, min = 61 and max = 69
  const randomInt = Math.floor(Math.random() * (69 - 61 + 1)) + 61;

  // Divide by 10 to get the number in the desired range [6.1, 6.9].
  return randomInt / 10;
};

function getSide2() {
  const randomInt = Math.floor(Math.random() * (89 - 81 + 1)) + 81;
  return randomInt / 10;
};

setColumns(["side1","side2","side3","angle1","angle2","angle3"]);

const rows = 50;

for (let i = 0; i < rows; i++) {
  const side1 = getSide1();
  const side2 = getSide2();
  const side3 = Math.sqrt(side1 * side1 + side2 * side2).toFixed(1);
  // Calculate angles using right triangle properties
  const angle1 = Math.atan(side2 / side1) * (180 / Math.PI); // in degrees
  const angle2 = Math.atan(side1 / side2) * (180 / Math.PI); // in degrees
  const angle3 = 90; // right angle

  const angle1Tex = `${angle1.toFixed(1)}\\degree`;
  const angle2Tex = `${angle2.toFixed(1)}\\degree`;
  const angle3Tex = `${angle3}\\degree`;

    addRow([side1.toFixed(1), side2.toFixed(1), side3, angle1Tex, angle2Tex, angle3Tex]);
}