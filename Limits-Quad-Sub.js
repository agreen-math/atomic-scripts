/**
 * This script generates a CSV of problems for finding the limit of a polynomial
 * function analytically. Since polynomials are continuous everywhere, the limit
 * is found by direct substitution.
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
 * Formats a quadratic polynomial into a clean string representation.
 * Example: (2, -4, 0) -> "2x^2-4x"
 * @param {number} a The coefficient of x^2.
 * @param {number} b The coefficient of x.
 * @param {number} c The constant term.
 * @returns {string} The formatted polynomial string.
 */
function formatPolynomial(a, b, c) {
  let parts = [];

  // Handle the x^2 term
  if (a !== 0) {
    if (a === 1) parts.push('x^2');
    else if (a === -1) parts.push('-x^2');
    else parts.push(`${a}x^2`);
  }

  // Handle the x term
  if (b !== 0) {
    if (b === 1) parts.push('x');
    else if (b === -1) parts.push('-x');
    else parts.push(`${b}x`);
  }

  // Handle the constant term
  if (c !== 0) {
    parts.push(c.toString());
  }

  // If all coefficients are zero, the function is just 0.
  if (parts.length === 0) {
    return '0';
  }

  // Join the parts with plus signs, then replace "+-" with "-" for clean output.
  return parts.join('+').replace(/\+-/g, '-');
}


// --- Main Script ---

setColumns(["f", "value", "limit"]);

const rows = 50;

for (let i = 0; i < rows; i++) {
  // 1. Generate random coefficients for a quadratic polynomial f(x) = ax^2 + bx + c.
  let a, b, c;
  do { a = getRandomInt(-5, 5); } while (a === 0); // Ensure it's actually quadratic.
  b = getRandomInt(-10, 10);
  c = getRandomInt(-10, 10);

  // 2. Generate a random integer value that x will approach.
  const value = getRandomInt(-5, 5);

  // 3. Format the polynomial into a string.
  const f_formatted = formatPolynomial(a, b, c);

  // 4. Calculate the limit by direct substitution.
  const limit = a * Math.pow(value, 2) + b * value + c;

  // 5. Add the new problem to the CSV.
  addRow([
    f_formatted,
    value.toString(),
    limit.toString()
  ]);
}
