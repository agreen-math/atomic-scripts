/**
 * This script generates a CSV of problems for converting between polar and
 * rectangular coordinates. It starts with a "nice" polar coordinate (integer radius,
 * special angle in radians) and calculates the exact rectangular coordinates.
 */

// --- Data for Special Angles in Radians ---
// Each angle object stores its radian representation as a fraction of pi,
// and the exact values for cosine and sine.
// The format for cos/sin is [coefficient, radical, denominator].
const specialAngles = [
    { num: 0, den: 1,  cos: [1, 1, 1],  sin: [0, 1, 1] },   // 0
    { num: 1, den: 6,  cos: [1, 3, 2],  sin: [1, 1, 2] },   // pi/6
    { num: 1, den: 4,  cos: [1, 2, 2],  sin: [1, 2, 2] },   // pi/4
    { num: 1, den: 3,  cos: [1, 1, 2],  sin: [1, 3, 2] },   // pi/3
    { num: 1, den: 2,  cos: [0, 1, 1],  sin: [1, 1, 1] },   // pi/2
    { num: 2, den: 3,  cos: [-1, 1, 2], sin: [1, 3, 2] },   // 2pi/3
    { num: 3, den: 4,  cos: [-1, 2, 2], sin: [1, 2, 2] },   // 3pi/4
    { num: 5, den: 6,  cos: [-1, 3, 2], sin: [1, 1, 2] },   // 5pi/6
    { num: 1, den: 1,  cos: [-1, 1, 1], sin: [0, 1, 1] },   // pi
    { num: 7, den: 6,  cos: [-1, 3, 2], sin: [-1, 1, 2] },  // 7pi/6
    { num: 5, den: 4,  cos: [-1, 2, 2], sin: [-1, 2, 2] },  // 5pi/4
    { num: 4, den: 3,  cos: [-1, 1, 2], sin: [-1, 3, 2] },  // 4pi/3
    { num: 3, den: 2,  cos: [0, 1, 1],  sin: [-1, 1, 1] },  // 3pi/2
    { num: 5, den: 3,  cos: [1, 1, 2],  sin: [-1, 3, 2] },  // 5pi/3
    { num: 7, den: 4,  cos: [1, 2, 2],  sin: [-1, 2, 2] },  // 7pi/4
    { num: 11, den: 6, cos: [1, 3, 2],  sin: [-1, 1, 2] }   // 11pi/6
];

// --- Helper Functions ---

/**
 * Generates a random integer between min and max (inclusive).
 */
function getRandomInt(min, max) {
  return Math.floor(Math.random() * (max - min + 1)) + min;
}

/**
 * Formats a rectangular component into an exact string with LaTeX for radicals.
 */
function formatComponent(coefficient, radical) {
  if (coefficient === 0) return "0";
  if (radical === 1) return coefficient.toString();
  if (coefficient === 1) return `\\sqrt{${radical}}`;
  if (coefficient === -1) return `-\\sqrt{${radical}}`;
  return `${coefficient}\\sqrt{${radical}}`;
}

/**
 * Formats an angle in radians into a LaTeX string.
 */
function formatTheta(num, den) {
    if (num === 0) return "0";
    if (den === 1) {
        return num === 1 ? "\\pi" : `${num}\\pi`;
    }
    const numerator = num === 1 ? "\\pi" : `${num}\\pi`;
    return `\\frac{${numerator}}{${den}}`;
}


// --- Main Script ---

setColumns(["x", "y", "r", "theta"]);

const rows = 50;

for (let i = 0; i < rows; i++) {
  // 1. Pick a random "nice" radius and a special angle.
  // We use even radii to ensure components are integers after dividing by 2.
  const r = getRandomInt(1, 10) * 2;
  const angleInfo = specialAngles[getRandomInt(0, specialAngles.length - 1)];
  const theta_formatted = formatTheta(angleInfo.num, angleInfo.den);

  // 2. Get the exact sin/cos values from our data.
  const [cos_num, cos_rad, cos_den] = angleInfo.cos;
  const [sin_num, sin_rad, sin_den] = angleInfo.sin;

  // 3. Calculate the integer coefficient for each rectangular component.
  // x = r * cos(theta), y = r * sin(theta)
  const x_coeff = (r * cos_num) / cos_den;
  const y_coeff = (r * sin_num) / sin_den;

  // 4. Format the components into their final string representation.
  const x_formatted = formatComponent(x_coeff, cos_rad);
  const y_formatted = formatComponent(y_coeff, sin_rad);

  // 5. Add the new problem to the CSV.
  addRow([x_formatted, y_formatted, r.toString(), theta_formatted]);
}
