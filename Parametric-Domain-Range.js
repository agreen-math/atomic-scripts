/**
 * This script generates a CSV of problems involving linear parametric equations.
 * Each problem provides equations for x and y in terms of a parameter t,
 * along with an interval for t. The goal is for the student to determine
 * the domain (interval for x) and range (interval for y).
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
 * Formats a linear equation in terms of 't' into a clean string.
 * Example: (3, -2) -> "3t-2"; (-1, 5) -> "-t+5"; (1, 0) -> "t"
 * @param {number} coefficient The coefficient of 't'.
 * @param {number} constant The constant term.
 * @returns {string} The formatted equation string.
 */
function formatEquation(coefficient, constant) {
  let t_part = '';
  let const_part = '';

  // Format the 't' part
  if (coefficient !== 0) {
    if (coefficient === 1) t_part = 't';
    else if (coefficient === -1) t_part = '-t';
    else t_part = `${coefficient}t`;
  }

  // Format the constant part
  if (constant !== 0) {
    // Add a plus sign only if there's a t_part and the constant is positive.
    if (t_part !== '' && constant > 0) {
      const_part = `+${constant}`;
    } else {
      const_part = constant.toString();
    }
  }

  // If both are zero, the equation is just "0".
  if (t_part === '' && const_part === '') {
    return '0';
  }

  return t_part + const_part;
}


// --- Main Script ---

setColumns(["x", "y", "Tinterval", "domain", "range"]);

const rows = 50;

for (let i = 0; i < rows; i++) {
  // 1. Generate coefficients and constants for the linear equations.
  // Ensure coefficients are not zero to keep 't' in the equation.
  const a = getRandomInt(-5, 5, { exclude: 0 }); // Coeff for x(t)
  const b = getRandomInt(-10, 10);              // Const for x(t)
  const c = getRandomInt(-5, 5, { exclude: 0 }); // Coeff for y(t)
  const d = getRandomInt(-10, 10);              // Const for y(t)

  // 2. Generate an interval for the parameter t.
  const t1 = getRandomInt(-5, 5);
  const t2 = getRandomInt(-5, 5);
  const t_min = Math.min(t1, t2);
  const t_max = Math.max(t1, t2);
  
  // Ensure the interval has a non-zero width.
  if (t_min === t_max) {
      i--; // Redo this iteration.
      continue;
  }

  // 3. Format the equations and the t-interval.
  const x_formatted = formatEquation(a, b);
  const y_formatted = formatEquation(c, d);
  const t_interval_formatted = `[${t_min},${t_max}]`;

  // 4. Calculate the endpoints of the domain and range.
  const x_at_t_min = a * t_min + b;
  const x_at_t_max = a * t_max + b;
  const y_at_t_min = c * t_min + d;
  const y_at_t_max = c * t_max + d;

  // 5. Determine and format the domain and range intervals.
  const domain_min = Math.min(x_at_t_min, x_at_t_max);
  const domain_max = Math.max(x_at_t_min, x_at_t_max);
  const range_min = Math.min(y_at_t_min, y_at_t_max);
  const range_max = Math.max(y_at_t_min, y_at_t_max);
  
  const domain_formatted = `[${domain_min},${domain_max}]`;
  const range_formatted = `[${range_min},${range_max}]`;

  // 6. Add the new problem to the CSV.
  addRow([
    x_formatted,
    y_formatted,
    `"${t_interval_formatted}"`,
    `"${domain_formatted}"`,
    `"${range_formatted}"`
  ]);
}
