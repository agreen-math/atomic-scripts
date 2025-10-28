/**
 * This script generates a CSV of logarithmic equations that simplify to quadratics.
 * The quadratics are designed to be solved with the quadratic formula,
 * yield one valid and one extraneous solution, and have a "nice" simplified radical answer.
 */

// --- Helper Functions ---

/**
 * Generates a random integer between min and max (inclusive).
 */
function getRandomInt(min, max) {
    return Math.floor(Math.random() * (max - min + 1)) + min;
}

/**
 * Simplifies a radical (finds the largest perfect square factor).
 * @param {number} n The number under the radical.
 * @returns {{coefficient: number, radicand: number}} An object with the simplified parts.
 */
function simplifyRadical(n) {
    if (n < 0) return { coefficient: 1, radicand: n }; // Should not happen
    let coefficient = 1;
    let radicand = n;
    for (let i = Math.floor(Math.sqrt(n)); i > 1; i--) {
        if (radicand % (i * i) === 0) {
            radicand /= (i * i);
            coefficient *= i;
            break;
        }
    }
    return { coefficient, radicand };
}

/**
 * Calculates the greatest common divisor of three integers.
 */
function gcd(a, b, c) {
    const gcdOfTwo = (x, y) => {
        x = Math.abs(x);
        y = Math.abs(y);
        while (y) {
            [x, y] = [y, x % y];
        }
        return x;
    };
    return gcdOfTwo(gcdOfTwo(a, b), c);
}

/**
 * Formats a binomial (x+k) with correct signs.
 */
function formatBinomial(k) {
    if (k === 0) return 'x';
    if (k > 0) return `x + ${k}`;
    return `x - ${Math.abs(k)}`;
}

// --- Main Script ---

setColumns(["equation", "solution"]);

const rows = 50;
const bases = [
    { name: 'log', base: 10, constantStr: '1' },
    { name: 'log_3', base: 3, constantStr: '1' },
    { name: 'log_2', base: 2, constantStr: '1' },
    { name: 'ln', base: null, constantStr: null }
];
// A list of "nice" radicands to start from. These are non-perfect squares.
const niceRadicands = [2, 3, 5, 6, 7, 10, 11, 13, 14, 15, 17, 19, 21, 22, 23, 26, 29, 30];

for (let i = 0; i < rows; i++) {
    let m, n, K, D, baseInfo;

    // This loop ensures we generate a valid problem by construction, avoiding timeouts.
    let isValidProblem = false;
    while (!isValidProblem) {
        // 1. Select a base and determine the constant K.
        baseInfo = bases[getRandomInt(0, bases.length - 1)];
        if (baseInfo.name === 'ln') {
            K = getRandomInt(5, 25);
            baseInfo.constantStr = `\\ln(${K})`;
        } else {
            K = baseInfo.base;
        }

        // 2. Start with a "nice" radical and construct the problem backward.
        const radicand = niceRadicands[getRandomInt(0, niceRadicands.length - 1)];
        const coeff = getRandomInt(1, 3); // Coefficient for the simplified radical
        D = coeff * coeff * radicand; // This is our target discriminant.

        // 3. We need (m-n)^2 = D - 4K to be a perfect square.
        const diff_squared = D - 4 * K;

        if (diff_squared > 0 && Math.sqrt(diff_squared) % 1 === 0) {
            const diff = Math.sqrt(diff_squared);
            // We need to find m and n such that m - n = diff and m > n.
            n = getRandomInt(-5, 5);
            m = n + diff;
            isValidProblem = true; // We successfully constructed a valid problem.
        }
        // If it's not a perfect square, the loop will try again with new random values.
        // This is much faster as the condition is easier to meet.
    }

    // 5. Construct the equation string.
    const equation = `\\${baseInfo.name}(${formatBinomial(m)}) = ${baseInfo.constantStr} - \\${baseInfo.name}(${formatBinomial(n)})`;

    // 6. Calculate and format the valid solution.
    const simpRad = simplifyRadical(D);
    const numerator_const = -(m + n);
    const numerator_rad_coeff = simpRad.coefficient;
    const final_radicand = simpRad.radicand;

    // Simplify the fraction by finding the GCD of all parts.
    const commonDivisor = gcd(numerator_const, numerator_rad_coeff, 2);

    const final_num_const = numerator_const / commonDivisor;
    const final_num_rad_coeff = numerator_rad_coeff / commonDivisor;
    const final_den = 2 / commonDivisor;

    let solutionStr = '';
    const radPart = (final_num_rad_coeff === 1) ? `\\sqrt{${final_radicand}}` : `${final_num_rad_coeff}\\sqrt{${final_radicand}}`;

    if (final_den === 1) {
        // Denominator simplifies away.
        solutionStr = (final_num_const === 0) ? radPart : `${final_num_const} + ${radPart}`;
    } else {
        // Denominator remains.
        const numeratorStr = (final_num_const === 0) ? radPart : `${final_num_const} + ${radPart}`;
        solutionStr = `\\frac{${numeratorStr}}{${final_den}}`;
    }

    // Add the new problem to the CSV.
    addRow([equation, solutionStr]);
}

