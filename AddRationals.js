/**
 * This script generates a CSV of problems for adding and simplifying
 * rational expressions with different linear denominators.
 */

// --- Helper Functions ---

/**
 * Generates a random integer between min and max (inclusive).
 */
function getRandomInt(min, max) {
  return Math.floor(Math.random() * (max - min + 1)) + min;
}

/**
 * Selects a random element from an array.
 */
function randomItem(list) {
  const selection = Math.floor(Math.random() * list.length);
  return list[selection];
}

/**
 * Formats a quadratic expression ax^2+bx+c into a clean string.
 */
function formatQuadratic(a, b, c) {
  let parts = [];
  // Handle x^2 term
  if (a !== 0) {
    if (a === 1) parts.push('x^2');
    else if (a === -1) parts.push('-x^2');
    else parts.push(`${a}x^2`);
  }
  // Handle x term
  if (b !== 0) {
    const sign = (b > 0 && parts.length > 0) ? '+' : '';
    if (b === 1) parts.push(`${sign}x`);
    else if (b === -1) parts.push('-x');
    else parts.push(`${sign}${b}x`);
  }
  // Handle constant term
  if (c !== 0) {
    const sign = (c > 0 && parts.length > 0) ? '+' : '';
    parts.push(`${sign}${c}`);
  }
  if (parts.length === 0) return '0';
  return parts.join('');
}

/**
 * Formats a binomial factor (x-r) into a clean string like (x+5) or (x-3).
 * @param {number} r The root of the factor.
 * @returns {string} The formatted factor.
 */
function formatFactor(r) {
    if (r === 0) return 'x';
    // To format as (x-r), we use a negative sign for positive roots
    // and a positive sign for negative roots.
    if (r < 0) return `(x+${Math.abs(r)})`;
    return `(x-${r})`;
}


// --- Main Script ---

setColumns(["expression", "simplified", "alternate", "factored_numerator_alt"]);

const rows = 50;

for (let i = 0; i < rows; i++) {
  let a, b, c, d, m, n, A, B, C, discriminant;
  let hasCommonFactor = true; // Start true to enter the loop

  // Keep generating problems until we find one with no common factors.
  while (hasCommonFactor) {
    hasCommonFactor = false; // Assume this attempt is good.

    // 1. Generate random non-zero integer coefficients.
    a = randomItem([2, 3, 4, 5, 6, 7, 8, 9]);
    b = randomItem([1, 2, 3, 4, 5, 6, 7, 8, 9]);
    c = randomItem([2, 3, 4, 5, 6, 7, 8, 9]);
    d = randomItem([1, 2, 3, 4, 5, 6, 7, 8, 9]);
    m = randomItem([1, 2, 3, 4, 5, 6, 7, 8, 9]);
    do {
      n = randomItem([1, 2, 3, 4, 5, 6, 7, 8, 9]);
    } while (n === m);

    // 2. Calculate the simplified numerator's coefficients.
    A = a + c;
    B = a * n + b + c * m + d;
    C = b * n + d * m;
    
    // 3. Check if the numerator is factorable and shares a root with the denominator.
    discriminant = B * B - 4 * A * C;
    if (discriminant >= 0 && Math.sqrt(discriminant) % 1 === 0) {
      const sqrtDiscriminant = Math.sqrt(discriminant);
      const rootNumerator1 = -B + sqrtDiscriminant;
      const rootNumerator2 = -B - sqrtDiscriminant;
      const rootDenominator = 2 * A;

      if (rootNumerator1 % rootDenominator === 0 && rootNumerator2 % rootDenominator === 0) {
        const r1 = rootNumerator1 / rootDenominator;
        const r2 = rootNumerator2 / rootDenominator;

        // Denominator roots are -m and -n. If a numerator root matches, it's a bad problem.
        if (r1 === -m || r1 === -n || r2 === -m || r2 === -n) {
          hasCommonFactor = true; // This will cause the while loop to run again.
        }
      }
    }
  }

  // 4. Now that we have a valid problem, format the output strings.
  const expression = `"\\frac{${a}x+${b}}{x+${m}}+\\frac{${c}x+${d}}{x+${n}}"`;
  const simplifiedNumerator = formatQuadratic(A, B, C);
  const simplified = `"\\frac{${simplifiedNumerator}}{(x+${m})(x+${n})}"`;

  const expandedDenominator = formatQuadratic(1, m + n, m * n);
  const alternate = `"\\frac{${simplifiedNumerator}}{${expandedDenominator}}"`;

  let factoredNumeratorAlt = simplified; // Default to the non-factored version.
  if (discriminant >= 0 && Math.sqrt(discriminant) % 1 === 0) {
     const sqrtDiscriminant = Math.sqrt(discriminant);
     const rootNumerator1 = -B + sqrtDiscriminant;
     const rootNumerator2 = -B - sqrtDiscriminant;
     const rootDenominator = 2 * A;

    if (rootNumerator1 % rootDenominator === 0 && rootNumerator2 % rootDenominator === 0) {
      const r1 = rootNumerator1 / rootDenominator;
      const r2 = rootNumerator2 / rootDenominator;

      const leadCoeff = (A === 1) ? '' : A;
      const factor1 = formatFactor(r1);
      const factor2 = formatFactor(r2);
      
      const factoredNumerator = `${leadCoeff}${factor1}${factor2}`;
      const factoredDenominatorStr = `(x+${m})(x+${n})`;
      
      factoredNumeratorAlt = `"\\frac{${factoredNumerator}}{${factoredDenominatorStr}}"`;
    }
  }

  // 5. Add the new problem to the CSV.
  addRow([expression, simplified, alternate, factoredNumeratorAlt]);
}