/**
 * This script generates a CSV of problems for finding the arc length of a
 * circle sector using the formula s = rθ. The angle is given in degrees
 * to assess whether students remember to convert to radians.
 */

// --- Data for Special Angles in Degrees ---
const specialAnglesInDegrees = [
    30, 45, 60, 90, 120, 135, 150, 180,
    210, 225, 240, 270, 300, 315, 330
];

// --- Helper Functions ---

/**
 * Generates a random integer between min and max (inclusive).
 */
function getRandomInt(min, max) {
  return Math.floor(Math.random() * (max - min + 1)) + min;
}


// --- Main Script ---

setColumns([
    "radius",
    "angle_degrees",
    "arc_length"
]);

const rows = 50;

for (let i = 0; i < rows; i++) {
  // 1. Generate a random radius and a random central angle in degrees.
  const radius = getRandomInt(2, 20);
  const angle_degrees = specialAnglesInDegrees[getRandomInt(0, specialAnglesInDegrees.length - 1)];

  // 2. Calculate the arc length: s = r * θ
  // First, convert the angle from degrees to radians.
  const theta_in_radians = angle_degrees * (Math.PI / 180);
  const arc_length = radius * theta_in_radians;

  // 3. Add the problem data and formatted answer to the CSV.
  addRow([
    radius.toString(),
    angle_degrees.toString(),
    arc_length.toFixed(2)
  ]);
}
