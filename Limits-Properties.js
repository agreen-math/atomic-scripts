/**
 * This script generates a CSV of conceptual problems for using the properties of
 * limits. Given the limits of several functions, the student must find the
 * value of new limits created by combining those functions.
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
 * Finds the greatest common divisor of two integers.
 * @param {number} a The first integer.
 * @param {number} b The second integer.
 * @returns {number} The greatest common divisor.
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
 * @param {number} numerator The numerator of the fraction.
 * @param {number} denominator The denominator of the fraction.
 * @returns {string} The formatted fraction string.
 */
function formatFraction(numerator, denominator) {
    if (numerator === 0) {
        return "0";
    }

    const commonDivisor = gcd(numerator, denominator);
    let simpNum = numerator / commonDivisor;
    let simpDen = denominator / commonDivisor;

    // Move the negative sign to the numerator for consistency
    if (simpDen < 0) {
        simpDen *= -1;
        simpNum *= -1;
    }

    if (simpDen === 1) {
        return simpNum.toString();
    }

    return `\\frac{${simpNum}}{${simpDen}}`;
}


// --- Main Script ---

setColumns(["fLim", "gLim", "hLim", "k", "kfLim+hLim", "f-gLim", "fLim*gLim", "hLim/fLim", "gLim^k"]);

const rows = 50;

for (let i = 0; i < rows; i++) {
  // 1. Generate random integer values for the given limits and the scalar.
  let fLim, gLim;
  
  // Ensure fLim and gLim are non-zero.
  do { fLim = getRandomInt(-5, 5); } while (fLim === 0);
  do { gLim = getRandomInt(-5, 5); } while (gLim === 0);
  
  const hLim = getRandomInt(-5, 5);
  const k = getRandomInt(2, 4); // Ensure k is positive.

  // 2. Calculate the new limits using the properties of limits.
  // Sum/Difference/Scalar Multiple
  const sumAndScalarLimit = (k * fLim) + hLim;
  const differenceLimit = fLim - gLim;

  // Product Rule: lim(f(x)*g(x)) = lim(f(x)) * lim(g(x))
  const productLimit = fLim * gLim;

  // Quotient Rule: lim(h(x)/f(x)) = lim(h(x)) / lim(f(x))
  const quotientLimit = formatFraction(hLim, fLim);
  
  // Power Rule: lim(g(x)^k) = (lim(g(x)))^k
  const exponentLimit = Math.pow(gLim, k);


  // 3. Add the new problem to the CSV.
  addRow([
    fLim.toString(),
    gLim.toString(),
    hLim.toString(),
    k.toString(),
    sumAndScalarLimit.toString(),
    differenceLimit.toString(),
    productLimit.toString(),
    quotientLimit.toString(),
    exponentLimit.toString()
  ]);
}
