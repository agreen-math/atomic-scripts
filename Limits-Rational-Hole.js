/**
 * This script generates a CSV of problems for finding the limit of a rational
 * function at a removable discontinuity (a "hole"). It creates a factorable
 * quadratic numerator and uses one of its linear factors as the denominator.
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
 * Formats a polynomial into a clean string representation.
 * @param {number} a The coefficient of x^2.
 * @param {number} b The coefficient of x.
 * @param {number} c The constant term.
 * @returns {string} The formatted polynomial string.
 */
function formatPolynomial(a, b, c) {
  let parts = [];

  if (a !== 0) {
    if (a === 1) parts.push('x^2');
    else if (a === -1) parts.push('-x^2');
    else parts.push(`${a}x^2`);
  }
  if (b !== 0) {
    const sign = b > 0 ? '+' : '';
    if (b === 1) parts.push(`${sign}x`);
    else if (b === -1) parts.push('-x');
    else parts.push(`${sign}${b}x`);
  }
  if (c !== 0) {
    const sign = c > 0 ? '+' : '';
    parts.push(`${sign}${c}`);
  }
  if (parts.length === 0) return '0';
  
  let result = parts.join('').trim();
  // Remove leading plus sign if it exists
  if (result.startsWith('+')) {
      result = result.substring(1);
  }
  return result;
}


// --- Main Script ---

setColumns(["f", "value", "limit"]);

const rows = 50;

for (let i = 0; i < rows; i++) {
  // 1. Generate two distinct integer roots for the numerator.
  let r1, r2;
  do {
    r1 = getRandomInt(-9, 9);
    r2 = getRandomInt(-9, 9);
  } while (r1 === r2); // Ensure the roots are different.

  // 2. The quadratic numerator is (x - r1)(x - r2) = x^2 - (r1+r2)x + r1*r2
  const b_coeff = -(r1 + r2);
  const c_coeff = r1 * r2;

  // 3. Optionally add a GCF to make problems more interesting.
  const gcf = getRandomInt(1, 3);
  const num_formatted = formatPolynomial(gcf, gcf * b_coeff, gcf * c_coeff);

  // 4. The denominator is a linear factor (x - r1) or (x - r2).
  // The 'value' is the root of that factor.
  let den_formatted, value, limit;
  if (Math.random() < 0.5) {
    // Denominator is gcf*(x - r1), so x approaches r1.
    den_formatted = formatPolynomial(0, gcf, -gcf * r1);
    value = r1;
    // The limit is found by plugging r1 into the other factor, (x - r2).
    limit = r1 - r2;
  } else {
    // Denominator is gcf*(x - r2), so x approaches r2.
    den_formatted = formatPolynomial(0, gcf, -gcf * r2);
    value = r2;
    // The limit is found by plugging r2 into the other factor, (x - r1).
    limit = r2 - r1;
  }

  // 5. Format the final rational function string.
  const f_formatted = `\\frac{${num_formatted}}{${den_formatted}}`;

  // 6. Add the new problem to the CSV.
  addRow([
    f_formatted,
    value.toString(),
    limit.toString()
  ]);
}
