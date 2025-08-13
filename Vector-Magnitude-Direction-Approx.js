/**
 * This script generates a CSV of vector problems. Each problem starts with "nice"
 * integer components for x and y. It then calculates the magnitude, expressing it
 * as a simplified radical, and the direction angle, rounded to the nearest hundredth.
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
 * Calculates the magnitude from components and formats it as a simplified radical string.
 * For example, components (4, 4) would result in a magnitude of sqrt(32), which
 * simplifies to "4\sqrt{2}".
 * @param {number} x The x-component of the vector.
 * @param {number} y The y-component of the vector.
 * @returns {string} The formatted magnitude string.
 */
function formatMagnitude(x, y) {
  const n = x * x + y * y;

  if (n === 0) return "0";

  // Check if n is a perfect square first.
  const sqrtN = Math.sqrt(n);
  if (sqrtN % 1 === 0) {
    return sqrtN.toString();
  }

  // Find the largest perfect square that divides n to simplify the radical.
  let largestSquare = 1;
  // Iterate downwards from floor(sqrt(n)) for efficiency.
  for (let i = Math.floor(sqrtN); i >= 2; i--) {
    const i_squared = i * i;
    if (n % i_squared === 0) {
      largestSquare = i_squared;
      break; // Found the largest one, so we can exit.
    }
  }

  const coefficient = Math.sqrt(largestSquare);
  const radical = n / largestSquare;

  // If the coefficient is 1, no need to show it.
  if (coefficient === 1) {
    return `\\sqrt{${radical}}`;
  }
  return `${coefficient}\\sqrt{${radical}}`;
}


// --- Main Script ---

setColumns(["x", "y", "magnitude", "direction"]);

const rows = 50;

for (let i = 0; i < rows; i++) {
  // 1. Pick random "nice" integer components.
  let x = getRandomInt(-12, 12);
  let y = getRandomInt(-12, 12);

  // Ensure the vector is not (0,0), which has no direction.
  // If it is, we redo this iteration to get a valid vector.
  if (x === 0 && y === 0) {
    i--; 
    continue;
  }

  // 2. Calculate and format the magnitude as a simplified radical.
  const magnitude_formatted = formatMagnitude(x, y);

  // 3. Calculate the direction angle.
  // Math.atan2 handles all quadrants correctly and returns radians.
  let direction_rad = Math.atan2(y, x);
  let direction_deg = direction_rad * (180 / Math.PI);

  // Convert angle from the [-180, 180] range to the standard [0, 360] range.
  if (direction_deg < 0) {
    direction_deg += 360;
  }
  
  const direction_formatted = direction_deg.toFixed(2);

  // 4. Add the new problem to the CSV.
  addRow([x.toString(), y.toString(), magnitude_formatted, direction_formatted]);
}
