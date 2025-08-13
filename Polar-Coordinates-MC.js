/**
 * This script generates a CSV of problems where students must identify all
 * polar coordinates that are equivalent to a given original coordinate.
 * It provides four correct equivalent coordinates and four incorrect "distractor" coordinates.
 */

// --- Data for Special Angles in Radians ---
// We only need the numerator and denominator for each angle.
const specialAngles = [
    { num: 1, den: 6 }, { num: 1, den: 4 }, { num: 1, den: 3 },
    { num: 1, den: 2 }, { num: 2, den: 3 }, { num: 3, den: 4 },
    { num: 5, den: 6 }, { num: 1, den: 1 }, { num: 7, den: 6 },
    { num: 5, den: 4 }, { num: 4, den: 3 }, { num: 3, den: 2 },
    { num: 5, den: 3 }, { num: 7, den: 4 }, { num: 11, den: 6 }
];

// --- Helper Functions ---

/**
 * Generates a random integer between min and max (inclusive).
 */
function getRandomInt(min, max) {
  return Math.floor(Math.random() * (max - min + 1)) + min;
}

/**
 * Finds the greatest common divisor of two numbers.
 */
function gcd(a, b) {
  return b === 0 ? a : gcd(b, a % b);
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
 * Formats an angle (represented by a numerator and denominator for pi) into a LaTeX string.
 * It simplifies the fraction where possible.
 */
function formatTheta(num, den) {
    if (num === 0) return "0";
    
    // Simplify the fraction
    const commonDivisor = gcd(Math.abs(num), Math.abs(den));
    let simplifiedNum = num / commonDivisor;
    let simplifiedDen = den / commonDivisor;

    let sign = simplifiedNum < 0 ? "-" : "";
    simplifiedNum = Math.abs(simplifiedNum);

    if (simplifiedDen === 1) {
        if (simplifiedNum === 0) return "0";
        if (simplifiedNum === 1) return `${sign}\\pi`;
        return `${sign}${simplifiedNum}\\pi`;
    }
    
    const numerator = simplifiedNum === 1 ? "\\pi" : `${simplifiedNum}\\pi`;
    return `${sign}\\frac{${numerator}}{${simplifiedDen}}`;
}

/**
 * Formats a full polar coordinate into a LaTeX string.
 */
function formatPolar(r, num, den) {
  const thetaStr = formatTheta(num, den);
  return `\\left(${r},${thetaStr}\\right)`;
}


// --- Main Script ---

setColumns(["original", "equiv1", "equiv2", "equiv3", "equiv4", "distract1", "distract2", "distract3", "distract4"]);

const rows = 50;

for (let i = 0; i < rows; i++) {
  // 1. Pick a random "nice" radius and a special angle.
  const r = getRandomInt(2, 9);
  const angleInfo = specialAngles[getRandomInt(0, specialAngles.length - 1)];
  const num = angleInfo.num;
  const den = angleInfo.den;

  const original = formatPolar(r, num, den);

  // 2. Generate four equivalent coordinates.
  const equivalents = [
    formatPolar(r, num + 2 * den, den),      // (r, theta + 2pi)
    formatPolar(r, num - 2 * den, den),      // (r, theta - 2pi)
    formatPolar(-r, num + den, den),         // (-r, theta + pi)
    formatPolar(-r, num - den, den)          // (-r, theta - pi)
  ];

  // 3. Generate a pool of potential distractors.
  let distractorPool = [
    formatPolar(-r, num + 2 * den, den),     // (-r, theta + 2pi) - Incorrect
    formatPolar(-r, num - 2 * den, den),     // (-r, theta - 2pi) - Incorrect
    formatPolar(r, num + den, den),          // (r, theta + pi) - Incorrect
    formatPolar(r, num - den, den),          // (r, theta - pi) - Incorrect
    formatPolar(r, -num, den),               // (r, -theta) - Incorrect
    formatPolar(-r, -num, den)               // (-r, -theta) - Incorrect
  ];
  
  // Shuffle the pool and pick the first 4 for variety.
  shuffleArray(distractorPool);
  const distractors = distractorPool.slice(0, 4);

  // 4. Add the new problem to the CSV.
  addRow([original, ...equivalents, ...distractors]);
}
