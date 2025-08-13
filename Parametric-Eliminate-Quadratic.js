/**
 * This script generates a CSV of problems where the goal is to eliminate the
 * parameter 't' from a set of parametric equations to find the rectangular equation.
 * One equation is linear in 't', and the other is quadratic.
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

/**
 * Formats a parametric equation in terms of 't' into a clean string.
 * @param {number} t_squared_coeff Coefficient of t^2.
 * @param {number} t_coeff Coefficient of t.
 * @param {number} constant The constant term.
 * @returns {string} The formatted equation string.
 */
function formatParametric(t_squared_coeff, t_coeff, constant) {
  let parts = [];

  // Handle t^2 term
  if (t_squared_coeff !== 0) {
    if (t_squared_coeff === 1) parts.push('t^2');
    else if (t_squared_coeff === -1) parts.push('-t^2');
    else parts.push(`${t_squared_coeff}t^2`);
  }

  // Handle t term
  if (t_coeff !== 0) {
    if (t_coeff === 1) parts.push('t');
    else if (t_coeff === -1) parts.push('-t');
    else parts.push(`${t_coeff}t`);
  }

  // Handle constant term
  if (constant !== 0) {
    parts.push(constant.toString());
  }
  
  if (parts.length === 0) return '0';

  // Join parts with plus signs, then clean up for negative numbers.
  return parts.join('+').replace(/\+-/g, '-');
}

/**
 * Formats the final rectangular equation string.
 * @param {string} leftVar The variable on the left side (e.g., 'x').
 * @param {string} rightVar The variable on the right side (e.g., 'y').
 * @param {number} sq_coeff Coefficient of the squared term.
 * @param {number} lin_coeff Coefficient of the linear term.
 * @param {number} constant The constant term.
 * @returns {string} The formatted rectangular equation.
 */
function formatRectangular(leftVar, rightVar, sq_coeff, lin_coeff, constant) {
    const rightSide = formatParametric(sq_coeff, lin_coeff, constant)
        .replace(/t/g, rightVar); // Replace 't' with the correct variable
    return `${leftVar}=${rightSide}`;
}


// --- Main Script ---

setColumns(["x", "y", "rectangular"]);

const rows = 50;

for (let i = 0; i < rows; i++) {
  // 1. Define coefficients for the parametric equations.
  // We will create one linear eq (t + b) and one quadratic eq (a*t^2 + c).
  let a;
  do {
    a = getRandomInt(-3, 3);
  } while (a === 0); // Coeff for t^2, ensuring it's not zero.
  
  const b = getRandomInt(-5, 5);                 // Const for linear eq
  const c = getRandomInt(-5, 5);                 // Const for quadratic eq

  let x_str, y_str, rect_str;

  // 2. Randomly decide if x or y gets the linear equation.
  if (Math.random() < 0.5) {
    // Case 1: x is linear, y is quadratic.
    // x = t + b  =>  t = x - b
    // y = a*t^2 + c
    x_str = formatParametric(0, 1, b);
    y_str = formatParametric(a, 0, c);

    // Substitute t = x - b into y = a*t^2 + c
    // y = a*(x-b)^2 + c = a*(x^2 - 2bx + b^2) + c
    // y = a*x^2 - 2ab*x + (a*b^2 + c)
    const rect_sq_coeff = a;
    const rect_lin_coeff = -2 * a * b;
    const rect_const = a * b * b + c;
    rect_str = formatRectangular('y', 'x', rect_sq_coeff, rect_lin_coeff, rect_const);

  } else {
    // Case 2: y is linear, x is quadratic.
    // y = t + b  =>  t = y - b
    // x = a*t^2 + c
    y_str = formatParametric(0, 1, b);
    x_str = formatParametric(a, 0, c);

    // Substitute t = y - b into x = a*t^2 + c
    // x = a*(y-b)^2 + c = a*(y^2 - 2by + b^2) + c
    // x = a*y^2 - 2ab*y + (a*b^2 + c)
    const rect_sq_coeff = a;
    const rect_lin_coeff = -2 * a * b;
    const rect_const = a * b * b + c;
    rect_str = formatRectangular('x', 'y', rect_sq_coeff, rect_lin_coeff, rect_const);
  }

  // 3. Add the new problem to the CSV.
  addRow([x_str, y_str, rect_str]);
}
