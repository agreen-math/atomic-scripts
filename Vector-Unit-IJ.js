/**
 * This script generates a CSV of vector problems. Each problem provides a vector
 * with integer components (x, y) that form a Pythagorean triple. The goal is for
 * the student to find the unit vector in i, j notation.
 */

// --- Data for Pythagorean Triples ---
// Each array is a triple [a, b, c] where a^2 + b^2 = c^2.
// 'c' will be the magnitude of the vector <a, b>.
const pythagoreanTriples = [
  [3, 4, 5],
  [5, 12, 13],
  [8, 15, 17],
  [7, 24, 25],
  [20, 21, 29],
  [9, 40, 41],
  [6, 8, 10], // Multiple of [3,4,5]
  [10, 24, 26] // Multiple of [5,12,13]
];

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

/**
 * Formats the unit vector into a LaTeX string in i, j notation.
 * @param {number} x The x-component.
 * @param {number} y The y-component.
 * @param {number} magnitude The magnitude of the vector.
 * @returns {string} The formatted unit vector string.
 */
function formatUnitVector(x, y, magnitude) {
  let i_part = '';
  let j_part = '';

  // Format the i component
  if (x !== 0) {
    if (x < 0) {
      i_part = `-\\frac{${Math.abs(x)}}{${magnitude}}\\mathbf{i}`;
    } else {
      i_part = `\\frac{${x}}{${magnitude}}\\mathbf{i}`;
    }
  }

  // Format the j component
  if (y !== 0) {
    if (y < 0) {
      j_part = `-\\frac{${Math.abs(y)}}{${magnitude}}\\mathbf{j}`;
    } else {
      // Add a plus sign only if there is also an i component.
      if (i_part !== '') {
        j_part = `+\\frac{${y}}{${magnitude}}\\mathbf{j}`;
      } else {
        j_part = `\\frac{${y}}{${magnitude}}\\mathbf{j}`;
      }
    }
  }

  return i_part + j_part;
}


// --- Main Script ---

setColumns(["x", "y", "unit"]);

const rows = 50;

for (let i = 0; i < rows; i++) {
  // 1. Pick a random Pythagorean triple.
  const triple = pythagoreanTriples[getRandomInt(0, pythagoreanTriples.length - 1)];
  let x = triple[0];
  let y = triple[1];
  const magnitude = triple[2];

  // 2. Randomly assign signs to x and y.
  if (Math.random() < 0.5) x *= -1;
  if (Math.random() < 0.5) y *= -1;

  // 3. Randomly swap x and y for more variety.
  if (Math.random() < 0.5) {
    [x, y] = [y, x];
  }

  // 4. Format the final unit vector string.
  const unit_vector_formatted = formatUnitVector(x, y, magnitude);

  // 5. Add the new problem to the CSV.
  addRow([
    x.toString(),
    y.toString(),
    unit_vector_formatted
  ]);
}
