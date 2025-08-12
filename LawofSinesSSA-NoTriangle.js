/**
 * Generates a random integer between min and max (inclusive).
 * @param {number} min - The minimum value.
 * @param {number} max - The maximum value.
 * @returns {number} A random integer.
 */
function getRandomInt(min, max) {
  return Math.floor(Math.random() * (max - min + 1)) + min;
}

/**
 * Converts degrees to radians.
 * @param {number} degrees - The angle in degrees.
 * @returns {number} The angle in radians.
 */
function degToRad(degrees) {
  return degrees * (Math.PI / 180);
}

/**
 * Converts radians to degrees.
 * @param {number} radians - The angle in radians.
 * @returns {number} The angle in degrees.
 */
function radToDeg(radians) {
  return radians * (180 / Math.PI);
}

// Assumes helper functions from above are included.

setColumns(["angleC", "sideA", "sideC", "angleA", "angleB", "sideB"]);

const rows = 50;

for (let i = 0; i < rows; i++) {
  // 1. Generate the given information
  const angleC_deg = getRandomInt(20, 70); // Given angle C in degrees
  const sideA = getRandomInt(12, 20);      // Given side a

  // 2. Calculate the height, h
  const angleC_rad = degToRad(angleC_deg);
  const height = sideA * Math.sin(angleC_rad);

  // 3. Generate side c to be SHORTER than the height
  // We generate a number from 50-95 and divide by 100 to get a percentage of the height.
  const sideC = height * (getRandomInt(50, 95) / 100);

  // 4. Add the row to the dataset
  addRow([
    `${angleC_deg.toFixed(1)}\\degree`,
    sideA.toFixed(1),
    sideC.toFixed(1),
    "none",
    "none",
    "none"
  ]);
}
