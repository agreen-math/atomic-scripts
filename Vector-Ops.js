/**
 * This script generates a CSV of vector operation problems. Each problem provides
 * two vectors, u and v, and a scalar k. The goal is for the student to
 * calculate u - v and u + kv.
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
 * Formats a vector into a string with i, j notation.
 * Handles signs, coefficients of 1, and zero components.
 * @param {number} x The x-component (coefficient of i).
 * @param {number} y The y-component (coefficient of j).
 * @returns {string} The formatted vector string, e.g., "3i-5j".
 */
function formatVector(x, y) {
  let i_part = '';
  let j_part = '';

  // Format the i component
  if (x !== 0) {
    if (x === 1) i_part = 'i';
    else if (x === -1) i_part = '-i';
    else i_part = `${x}i`;
  }

  // Format the j component
  if (y !== 0) {
    if (y === 1) j_part = 'j';
    else if (y === -1) j_part = '-j';
    else j_part = `${y}j`;

    // Add the correct sign between the parts
    if (i_part !== '' && y > 0) {
      j_part = `+${j_part}`;
    }
  }

  // If both are zero, return "0"
  if (i_part === '' && j_part === '') {
    return '0';
  }

  return i_part + j_part;
}


// --- Main Script ---

setColumns(["u", "v", "k", "u-v", "u+kv"]);

const rows = 50;

for (let i = 0; i < rows; i++) {
  // 1. Generate random components for vectors u and v, and a scalar k.
  const u_x = getRandomInt(-10, 10);
  const u_y = getRandomInt(-10, 10);
  const v_x = getRandomInt(-10, 10);
  const v_y = getRandomInt(-10, 10);
  const k = getRandomInt(-5, 5);

  // 2. Format the initial vectors u and v.
  const u_formatted = formatVector(u_x, u_y);
  const v_formatted = formatVector(v_x, v_y);

  // 3. Calculate and format u - v.
  const sub_x = u_x - v_x;
  const sub_y = u_y - v_y;
  const sub_formatted = formatVector(sub_x, sub_y);

  // 4. Calculate and format u + kv.
  const add_x = u_x + (k * v_x);
  const add_y = u_y + (k * v_y);
  const add_formatted = formatVector(add_x, add_y);

  // 5. Add the new problem to the CSV.
  addRow([
    u_formatted,
    v_formatted,
    k.toString(),
    sub_formatted,
    add_formatted
  ]);
}
