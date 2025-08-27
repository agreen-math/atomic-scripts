/**
 * This script generates a CSV of problems for finding the solutions to quartic
 * equations of the form ax^4 + bx^2 = 0, which have complex solutions.
 */

// --- Helper Functions ---

/**
 * Generates a random integer between min and max (inclusive).
 */
function getRandomInt(min, max) {
  return Math.floor(Math.random() * (max - min + 1)) + min;
}

/**
 * Formats the quartic equation into a clean string.
 * @param {number} a The coefficient of x^4.
 * @param {number} b The coefficient of x^2.
 * @returns {string} The formatted equation string.
 */
function formatEquation(a, b) {
  let part1 = '';
  if (a === 1) part1 = 'x^4';
  else if (a === -1) part1 = '-x^4';
  else part1 = `${a}x^4`;

  let part2 = '';
  if (b > 0) {
    part2 = b === 1 ? '+x^2' : `+${b}x^2`;
  } else if (b < 0) {
    part2 = b === -1 ? '-x^2' : `${b}x^2`;
  }

  return `${part1}${part2}=0`;
}

/**
 * Formats the complex solutions into a clean string.
 * @param {number} c The integer coefficient of i.
 * @returns {string} The formatted solutions string.
 */
function formatSolutions(c) {
  let i_part = '';
  if (c === 1) {
    i_part = 'i';
  } else {
    i_part = `${c}i`;
  }
  // Enclose the final string in double quotes for proper CSV formatting.
  return `"0,${i_part},-${i_part}"`;
}


// --- Main Script ---

setColumns(["equation", "solutions"]);

const rows = 50;

for (let i = 0; i < rows; i++) {
  // 1. Generate the integer 'c' for the solutions ±ci.
  const c = getRandomInt(1, 9);

  // 2. Generate a non-zero integer 'a'.
  let a;
  do { a = getRandomInt(-5, 5); } while (a === 0);

  // 3. Calculate 'b' to ensure the solutions are correct.
  // For solutions ±ci, we need x^2 = -c^2.
  // From ax^2 + b = 0, we have x^2 = -b/a.
  // So, -b/a = -c^2  =>  b/a = c^2  =>  b = a * c^2.
  const b = a * c * c;

  // 4. Format the equation and solution strings.
  const equation_formatted = formatEquation(a, b);
  const solutions_formatted = formatSolutions(c);

  // 5. Add the new problem to the CSV.
  addRow([
    equation_formatted,
    solutions_formatted
  ]);
}
