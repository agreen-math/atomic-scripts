/**
 * This script generates a CSV of problems where the goal is to eliminate the
 * parameter 't' from a set of trigonometric parametric equations to find the
 * rectangular equation of an ellipse.
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

setColumns(["x", "y", "rectangular"]);

const rows = 50;

for (let i = 0; i < rows; i++) {
  // 1. Define the coefficients (amplitudes) for the trig functions.
  // Ensure they are non-zero.
  let a, b;
  do { a = getRandomInt(2, 9); } while (a === 0);
  do { b = getRandomInt(2, 9); } while (b === 0);

  let x_str, y_str, rect_str;

  // 2. Randomly decide if x is cos and y is sin, or vice-versa.
  if (Math.random() < 0.5) {
    // Case 1: x = a*cos(t), y = b*sin(t)
    x_str = `${a}\\cos t`;
    y_str = `${b}\\sin t`;
    // Rectangular form: x^2/a^2 + y^2/b^2 = 1
    rect_str = `\\frac{x^2}{${a*a}}+\\frac{y^2}{${b*b}}=1`;
  } else {
    // Case 2: x = a*sin(t), y = b*cos(t)
    x_str = `${a}\\sin t`;
    y_str = `${b}\\cos t`;
    // Rectangular form is the same: x^2/a^2 + y^2/b^2 = 1
    rect_str = `\\frac{x^2}{${a*a}}+\\frac{y^2}{${b*b}}=1`;
  }

  // 3. Add the new problem to the CSV.
  addRow([x_str, y_str, rect_str]);
}