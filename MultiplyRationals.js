/**
 * This script generates a CSV of problems for multiplying and simplifying
 * rational expressions. Each problem is constructed to have a common binomial
 * factor that can be canceled.
 */

// --- Helper Functions ---

/**
 * Generates a random integer between min and max (inclusive).
 */
function getRandomInt(min, max) {
  return Math.floor(Math.random() * (max - min + 1)) + min;
}

/**
 * Formats a linear expression ax+b into a clean string.
 * @param {number} a The coefficient of x.
 * @param {number} b The constant term.
 * @returns {string} The formatted linear expression.
 */
function formatLinear(a, b) {
  let parts = [];
  if (a !== 0) {
    if (a === 1) parts.push('x');
    else if (a === -1) parts.push('-x');
    else parts.push(`${a}x`);
  }
  if (b !== 0) {
    const sign = (b > 0 && parts.length > 0) ? '+' : '';
    parts.push(`${sign}${b}`);
  }
  if (parts.length === 0) return '0';
  return parts.join('');
}

// --- Main Script ---

setColumns(["expression", "simplified", "alt"]);

const rows = 50;

for (let i = 0; i < rows; i++) {
  // 1. Define the components for the cancellation.
  // We'll create a common factor of the form (x - r).
  const r = getRandomInt(-9, 9);
  // The numerator of the first fraction will have a GCF, e.g., g(x-r).
  const g = getRandomInt(2, 5);

  // 2. Define the components of the first fraction: g(x-r) / (x-c1)
  const num1_a = g;
  const num1_b = -g * r;
  let c1;
  do {
    c1 = getRandomInt(-9, 9);
  } while (c1 === r); // Denominator must be different from the canceling factor.
  const den1_str = formatLinear(1, -c1);

  // 3. Define the components of the second fraction: (ax+b) / (x-r)
  const den2_str = formatLinear(1, -r);
  const num2_a = getRandomInt(1, 9);
  let num2_b;

  // FIX: This loop prevents the final expression from over-simplifying.
  // It ensures the remaining numerator (num2) is not a multiple of the
  // remaining denominator (den1), which happens if num2_b = -num2_a * c1.
  do {
    num2_b = getRandomInt(-9, 9);
  } while (num2_b === -num2_a * c1);
  const num2_str = formatLinear(num2_a, num2_b);


  // 4. Format the full expression string.
  const num1_str = formatLinear(num1_a, num1_b);
  const expression = `\\frac{${num1_str}}{${den1_str}}\\cdot\\frac{${num2_str}}{${den2_str}}`;

  // 5. Format the simplified (factored) answer.
  const simplified_num = `${g}(${num2_str})`;
  const simplified = `\\frac{${simplified_num}}{${den1_str}}`;

  // 6. Format the alternate (distributed) answer.
  const alternate_num = formatLinear(g * num2_a, g * num2_b);
  const alternate = `\\frac{${alternate_num}}{${den1_str}}`;

  // 7. Add the new problem to the CSV.
  addRow([
    expression,
    simplified,
    alternate
  ]);
}
