/**
 * This script generates a CSV of problems for finding the equation of a sine
 * function of the form y = a*sin(b(x-c)) + d, given its properties.
 */

// --- Helper Functions ---

/**
 * Generates a random integer between min and max (inclusive).
 */
function getRandomInt(min, max) {
  return Math.floor(Math.random() * (max - min + 1)) + min;
}

/**
 * Finds the greatest common divisor of two integers.
 */
function gcd(a, b) {
    a = Math.abs(a);
    b = Math.abs(b);
    while(b) {
        let t = b;
        b = a % b;
        a = t;
    }
    return a;
}

/**
 * Formats a fraction of pi into a simplified LaTeX string.
 */
function formatPiFraction(num, den) {
    if (num === 0) return "0";

    const commonDivisor = gcd(num, den);
    let simpNum = num / commonDivisor;
    let simpDen = den / commonDivisor;

    if (simpDen === 1) {
        return simpNum === 1 ? "\\pi" : `${simpNum}\\pi`;
    }
    const numerator = simpNum === 1 ? "\\pi" : `${simpNum}\\pi`;
    return `\\frac{${numerator}}{${simpDen}}`;
}


// --- Main Script ---

setColumns(["period", "phaseShift", "range", "equation"]);

const rows = 50;

for (let i = 0; i < rows; i++) {
  // 1. Generate properties for the sine function.
  // Generate a "nice" period as a fraction of pi.
  const periodDen = getRandomInt(2, 6);
  const period = formatPiFraction(1, periodDen);

  // Generate a "nice" phase shift as a fraction of pi.
  const psDen = getRandomInt(2, 6);
  const phaseShift = formatPiFraction(1, psDen);

  // Generate a "nice" range with endpoints of the same parity.
  const rangeEnd1 = getRandomInt(-10, 10);
  let rangeEnd2;
  do {
      rangeEnd2 = getRandomInt(-10, 10);
      // Ensure endpoints are different and have the same parity (both even or both odd).
      // This guarantees that a and d will be integers.
  } while (rangeEnd1 === rangeEnd2 || Math.abs(rangeEnd1 % 2) !== Math.abs(rangeEnd2 % 2));
  
  const rangeMin = Math.min(rangeEnd1, rangeEnd2);
  const rangeMax = Math.max(rangeEnd1, rangeEnd2);
  const range = `"[${rangeMin},${rangeMax}]"`;

  // 2. Calculate the parameters a, b, c, and d.
  // a = amplitude, d = vertical shift (midline)
  const a = (rangeMax - rangeMin) / 2;
  const d = (rangeMax + rangeMin) / 2;

  // b = frequency, from period = 2pi / b => b = 2pi / period
  const b = 2 * periodDen;

  // c = phase shift (given directly)
  const c = phaseShift;

  // 3. Construct the final equation string.
  let equation = `${a}\\sin\\left[${b}\\left(x-${c}\\right)\\right]`;
  if (d > 0) {
    equation += `+${d}`;
  } else if (d < 0) {
    equation += `${d}`;
  }
  // If d is 0, do nothing.

  // 4. Add the new problem to the CSV.
  addRow([
    period,
    phaseShift,
    range,
    equation
  ]);
}
