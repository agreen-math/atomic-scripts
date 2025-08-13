/**
 * This script generates a CSV of problems for finding a limit using the
 * rationalizing technique. Each problem is constructed to have a 0/0
 * indeterminate form that can be solved by multiplying by the conjugate.
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
 * Formats a fraction into a simplified LaTeX string.
 */
function formatFraction(numerator, denominator) {
    if (numerator === 0) return "0";

    const commonDivisor = gcd(numerator, denominator);
    let simpNum = numerator / commonDivisor;
    let simpDen = denominator / commonDivisor;

    if (simpDen < 0) {
        simpDen *= -1;
        simpNum *= -1;
    }

    if (simpDen === 1) return simpNum.toString();

    return `\\frac{${simpNum}}{${simpDen}}`;
}


// --- Main Script ---

setColumns(["f", "value", "limit"]);

const rows = 50;

for (let i = 0; i < rows; i++) {
  // 1. Generate the core components of the problem.
  // We want the form (sqrt(ax+b) - c) / (x-d)
  const a = getRandomInt(1, 4); // Coefficient inside the radical
  const c = getRandomInt(1, 5); // Constant being subtracted
  const d = getRandomInt(-5, 5); // The value x approaches

  // 2. Calculate 'b' to ensure the numerator is 0 when x=d.
  // We need a*d + b = c^2, so b = c^2 - a*d.
  const b = c * c - a * d;

  // 3. Format the function string for LaTeX display.
  // Format the term inside the square root: ax+b
  const radical_content = (b > 0) ? `${a}x+${b}` : `${a}x${b}`;
  
  // Format the denominator: x-d
  // FIX: Changed 'const' to 'let' to allow modification.
  let denominator = (d > 0) ? `x-${d}` : `x+${Math.abs(d)}`;
  if (d === 0) {
    denominator = 'x'; // Handle the special case of x-0
  }

  const f_formatted = `\\frac{\\sqrt{${radical_content}}-${c}}{${denominator}}`;

  // 4. The value the limit approaches is 'd'.
  const value = d.toString();

  // 5. The limit simplifies to a / (2c).
  const limit = formatFraction(a, 2 * c);

  // 6. Add the new problem to the CSV.
  addRow([f_formatted, value, limit]);
}
