/**
 * This script generates a CSV of problems for dividing and simplifying
 * rational expressions. Each problem is constructed to have a common binomial
 * factor that can be canceled after inverting the second fraction.
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

setColumns(["expression", "simplified", "alt", "alternate2", "alternate3"]);

const rows = 50;

for (let i = 0; i < rows; i++) {
  // 1. Define the common factor (x - r) that will be canceled.
  const r = getRandomInt(-9, 9);
  // Define a GCF for the first numerator.
  const g = getRandomInt(2, 5);

  // 2. First fraction's numerator will be g(x-r).
  const num1_a = g;
  const num1_b = -g * r;

  // 3. First fraction's denominator will be (x-c1).
  let c1;
  do { c1 = getRandomInt(-9, 9); } while (c1 === r); // Ensure it's different from the canceling factor.
  const den1_str = formatLinear(1, -c1);

  // 4. Second fraction's numerator will be (x-r) to allow cancellation.
  const num2_str = formatLinear(1, -r);

  // 5. Second fraction's denominator will be (ax+b).
  const den2_a = getRandomInt(1, 9);
  const den2_b = getRandomInt(-9, 9);
  const den2_str = formatLinear(den2_a, den2_b);

  // 6. Format the full expression string.
  const num1_str = formatLinear(num1_a, num1_b);
  const expression = `\\frac{${num1_str}}{${den1_str}}\\div\\frac{${num2_str}}{${den2_str}}`;

  // 7. Format the simplified (factored) answer.
  // After inverting and canceling, the result is g * (den2) / den1.
  const simplified_num = `${g}(${den2_str})`;
  const simplified = `\\frac{${simplified_num}}{${den1_str}}`;

  // 8. Format the alternate (distributed) answer.
  const alternate_num = formatLinear(g * den2_a, g * den2_b);
  const alternate = `\\frac{${alternate_num}}{${den1_str}}`;

  // 9. Compute alternate2 factoring (e.g., factor out -1 if possible)
  let alternate2_num = '';
  // If both coefficients are negative, factor out -1
  if (g * den2_a < 0 && g * den2_b < 0) {
    alternate2_num = `-${formatLinear(-g * den2_a, -g * den2_b)}`;
  } else if (g * den2_a < 0) {
    // Factor out -1 from the leading coefficient only
    alternate2_num = `-${formatLinear(-g * den2_a, g * den2_b)}`;
  } else {
    // No alternate factoring
    alternate2_num = alternate_num;
  }
  const alternate2 = `\\frac{${alternate2_num}}{${den1_str}}`;

  // 10. Compute alternate3 factoring (factor out GCF from distributed numerator)
  function gcd(a, b) {
    a = Math.abs(a); b = Math.abs(b);
    while (b) { [a, b] = [b, a % b]; }
    return a;
  }
  const coeff1 = g * den2_a;
  const coeff2 = g * den2_b;
  let gcf = gcd(coeff1, coeff2);
  // Only factor if GCF > 1
  let alternate3_num;
  if (gcf > 1) {
    const factored = formatLinear(coeff1 / gcf, coeff2 / gcf);
    alternate3_num = `${gcf}(${factored})`;
  } else {
    alternate3_num = alternate_num;
  }
  const alternate3 = `\\frac{${alternate3_num}}{${den1_str}}`;

  // 11. Add the new problem to the CSV.
  addRow([
    expression,
    simplified,
    alternate,
    alternate2,
    alternate3
  ]);
}
