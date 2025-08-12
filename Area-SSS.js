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

setColumns(["side1","side2","side3","area"]);

const rows = 50;

for (let i = 0; i < rows; i++) {
  const side1 = getSide1();
  const side2 = getSide1();
  const side3 = getSide2();
  // Calculate the area using Heron's formula: area = sqrt(s * (s - a) * (s - b) * (s - c))
  // Here, we will use the sides as side1, side2, and side3.
    const s = (side1 + side2 + side3) / 2;
  const area = Math.sqrt(s * (s - side1) * (s - side2) * (s - side3)).toFixed(1);

  addRow([side1.toFixed(1), side2.toFixed(1), side3.toFixed(1), area]);
} 