function getRandomInt(min, max) {
  return Math.floor(Math.random() * (max - min + 1)) + min;
}

function degToRad(degrees) {
  return degrees * (Math.PI / 180);
}

function getShuffledTriangleLabels() {
  let labels = ['a', 'b', 'c'];

  // Fisher-Yates shuffle algorithm
  // It iterates backwards through the array, swapping each element
  // with a random element before it (or itself).
  for (let i = labels.length - 1; i > 0; i--) {
    // Pick a random index from 0 to i (inclusive)
    const j = Math.floor(Math.random() * (i + 1));

    // Swap the elements at index i and j
    [labels[i], labels[j]] = [labels[j], labels[i]];
  }

  // Capitalize the last letter of the newly shuffled array
  labels[2] = labels[2].toUpperCase();

  return labels;
}

function getSide1(){
  const side1 = getRandomInt(15,20);
  return side1;
}

function getSide2() {
  const side2 = getRandomInt(10,14);
  return side2;
}

function getAngle2() {
  // Generate a random integer between 20 and 70.
  const angle2= getRandomInt(20, 70);

  // Return the angle in degrees.
  return angle2;
}

setColumns(["givenSide1","givenSide3","givenAngle2","side1","angle2","side3","area"]);

const rows = 50;

for (let i = 0; i < rows; i++) {
  const side1 = getSide1();
  const angle2 = getAngle2();
  const side3 = getSide2();
  // Calculate the area using the formula: area = 0.5 * a * b * sin(C)
  // Here, we will use side1, side2, and angle2.
  const area = (0.5 * side1 * side3 * Math.sin(degToRad(angle2)));

  // Get the shuffled labels for the triangle sides
  const [givenSide1, givenSide3, givenAngle2] = getShuffledTriangleLabels();

  // Add the row with the given labels and calculated values
  addRow([givenSide1, givenSide3, givenAngle2, side1, angle2, side3, area.toFixed(2)]);
}