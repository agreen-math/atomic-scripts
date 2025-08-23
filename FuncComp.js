/**
 * This script generates a CSV of problems for finding the composition of
 * a linear and a quadratic function.
 */

// --- Helper Functions ---

/**
 * Generates a random integer between min and max (inclusive).
 */
function getRandomInt(min, max) {
  return Math.floor(Math.random() * (max - min + 1)) + min;
}

/**
 * Shuffles an array in place using the Fisher-Yates algorithm.
 */
function shuffleArray(array) {
  for (let i = array.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [array[i], array[j]] = [array[j], array[i]];
  }
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

  // Handle the x^2 term
  if (a !== 0) {
    if (a === 1) parts.push('x^2');
    else if (a === -1) parts.push('-x^2');
    else parts.push(`${a}x^2`);
  }

  // Handle the x term
  if (b !== 0) {
    let sign = (b > 0 && parts.length > 0) ? '+' : '';
    if (b === 1) parts.push(`${sign}x`);
    else if (b === -1) parts.push('-x');
    else parts.push(`${sign}${b}x`);
  }

  // Handle the constant term
  if (c !== 0) {
    let sign = (c > 0 && parts.length > 0) ? '+' : '';
    parts.push(`${sign}${c}`);
  }

  if (parts.length === 0) return '0';
  return parts.join('');
}


// --- Main Script ---

setColumns(["f", "g", "1", "2", "1o2", "2o1"]);

const rows = 50;
const funcNames = ['f', 'g', 'h', 'p', 'q'];

for (let i = 0; i < rows; i++) {
  // 1. Select two distinct function names.
  shuffleArray(funcNames);
  const f_name = funcNames[0];
  const g_name = funcNames[1];

  // 2. Generate coefficients for the linear function (func1 = a1*x + b1).
  let a1, b1;
  do { a1 = getRandomInt(-9, 9); } while (a1 === 0 || a1 === 1);
  do { b1 = getRandomInt(-9, 9); } while (b1 === 0);

  // 3. Generate coefficients for the quadratic function (func2 = a2*x^2 + b2*x + c2).
  let a2, b2, c2;
  do { a2 = getRandomInt(-5, 5); } while (a2 === 0 || a2 === 1);
  do { b2 = getRandomInt(-9, 9); } while (b2 === 0);
  do { c2 = getRandomInt(-9, 9); } while (c2 === 0);

  // 4. Format the initial function strings.
  const func1_str = formatPolynomial(0, a1, b1);
  const func2_str = formatPolynomial(a2, b2, c2);

  // 5. Calculate the composition (func1 o func2)(x).
  // a1*(a2*x^2 + b2*x + c2) + b1
  const comp1o2_a = a1 * a2;
  const comp1o2_b = a1 * b2;
  const comp1o2_c = a1 * c2 + b1;
  const comp1o2_str = formatPolynomial(comp1o2_a, comp1o2_b, comp1o2_c);

  // 6. Calculate the composition (func2 o func1)(x).
  // a2*(a1*x + b1)^2 + b2*(a1*x + b1) + c2
  // a2*(a1^2*x^2 + 2*a1*b1*x + b1^2) + b2*a1*x + b2*b1 + c2
  const comp2o1_a = a2 * a1 * a1;
  const comp2o1_b = 2 * a2 * a1 * b1 + b2 * a1;
  const comp2o1_c = a2 * b1 * b1 + b2 * b1 + c2;
  const comp2o1_str = formatPolynomial(comp2o1_a, comp2o1_b, comp2o1_c);

  // 7. Add the new problem to the CSV.
  addRow([
    f_name,
    g_name,
    func1_str,
    func2_str,
    comp1o2_str,
    comp2o1_str
  ]);
}
