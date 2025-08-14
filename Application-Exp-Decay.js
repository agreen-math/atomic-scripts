/**
 * This script generates a CSV of word problems based on exponential decay,
 * using the context of radioactive half-life. The formula A(t) = A0 * e^(kt)
 * is used to solve for the time 't'.
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

setColumns([
    "halfLife",
    "percent",
    "years"
]);

const rows = 50;

for (let i = 0; i < rows; i++) {
  // 1. Generate random initial conditions.
  const halfLife = getRandomInt(100, 1000); // Half-life in years
  const percent = getRandomInt(1, 99);     // Target percentage remaining

  // 2. Calculate the decay constant 'k'.
  // The formula for k from half-life is: k = ln(0.5) / halfLife
  const k = Math.log(0.5) / halfLife;

  // 3. Calculate the time 't' to decay to the target percentage.
  // The formula is: A(t) = A0 * e^(kt)
  // We want A(t)/A0 to be percent/100.
  // So, (percent/100) = e^(kt)
  // ln(percent/100) = kt
  // t = ln(percent/100) / k
  const timeInYears = Math.log(percent / 100) / k;

  // 4. Add the problem data and formatted answer to the CSV.
  addRow([
    halfLife.toString(),
    percent.toString(),
    timeInYears.toFixed(2)
  ]);
}
