/**
 * This script generates a CSV of vector problems. Each problem provides an initial
 * and a terminal point. The goal is for the student to calculate the
 * component form of the vector (x, y).
 */

// --- Helper Functions ---

/**
 * Generates a random integer between min and max (inclusive).
 * @param {number} min The minimum value.
 * @param {number} max The maximum value.
 * @returns {number} A random integer.
 */
function getRandomInt(min, max) {
  return Math.floor(Math.random() * (max - min + 1)) + min;
}


// --- Main Script ---

setColumns(["initial", "terminal", "x", "y"]);

const rows = 50;

for (let i = 0; i < rows; i++) {
  // 1. Generate random integer coordinates for the initial and terminal points.
  const x1 = getRandomInt(-10, 10); // Initial x
  const y1 = getRandomInt(-10, 10); // Initial y
  const x2 = getRandomInt(-10, 10); // Terminal x
  const y2 = getRandomInt(-10, 10); // Terminal y

  // 2. Format the points into the required string format "(x,y)".
  // The outer quotes are added to ensure proper CSV formatting if a point contains a comma.
  const initial_formatted = `(${x1},${y1})`;
  const terminal_formatted = `(${x2},${y2})`;

  // 3. Calculate the component form of the vector.
  // component x = terminal x - initial x
  // component y = terminal y - initial y
  const component_x = x2 - x1;
  const component_y = y2 - y1;

  // 4. Add the new problem to the CSV.
  addRow([
    `"${initial_formatted}"`,
    `"${terminal_formatted}"`,
    component_x.toString(),
    component_y.toString()
  ]);
}
