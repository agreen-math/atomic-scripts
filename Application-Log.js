/**
 * This script generates a CSV of word problems based on a logarithmic model,
 * using the context of the Richter scale for earthquake intensity.
 */

// --- Helper Functions ---

/**
 * Generates a random floating-point number between min and max (inclusive).
 * @param {number} min The minimum value.
 * @param {number} max The maximum value.
 * @returns {number} A random float.
 */
function getRandomFloat(min, max) {
  return Math.random() * (max - min) + min;
}

// --- Main Script ---

setColumns([
    "magnitude1",
    "magnitude2",
    "intensity_ratio"
]);

const rows = 50;
const equation = "M=\\log\\left(\\frac{I}{I_0}\\right)";

for (let i = 0; i < rows; i++) {
  // 1. Generate two distinct earthquake magnitudes.
  let m1, m2;
  do {
      m1 = getRandomFloat(3.0, 7.0);
      m2 = getRandomFloat(3.0, 9.0);
  } while (Math.abs(m1 - m2) < 1.0); // Ensure magnitudes are different enough

  // Ensure magnitude2 is the larger one for consistent problem wording.
  const magnitude1 = Math.min(m1, m2);
  const magnitude2 = Math.max(m1, m2);

  // 2. Calculate the ratio of the intensities.
  // The formula is: I2 / I1 = 10^(M2 - M1)
  const intensity_ratio = Math.pow(10, magnitude2 - magnitude1);

  // 3. Add the problem data and formatted answer to the CSV.
  addRow([
    magnitude1.toFixed(1),
    magnitude2.toFixed(1),
    intensity_ratio.toFixed(2)
  ]);
}
