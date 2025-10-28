/**
 * This script generates a CSV of logarithmic equations that simplify to linear equations.
 * The solutions are exact fractions, sometimes involving the constant 'e'.
 * The script ensures that the calculated solution is not extraneous.
 */

// --- Helper Functions ---

/**
 * Generates a random integer between min and max (inclusive).
 */
function getRandomInt(min, max) {
    return Math.floor(Math.random() * (max - min + 1)) + min;
}

/**
 * Calculates the greatest common divisor of two integers.
 */
function gcd(a, b) {
    a = Math.abs(a);
    b = Math.abs(b);
    while (b) {
        [a, b] = [b, a % b];
    }
    return a;
}

/**
 * Formats a linear expression ax+c into a clean string.
 */
function formatLinear(a, c) {
    let parts = [];
    // Handle x term
    if (a !== 0) {
        if (a === 1) parts.push('x');
        else if (a === -1) parts.push('-x');
        else parts.push(`${a}x`);
    }
    // Handle constant term
    if (c !== 0) {
        const sign = (c > 0 && parts.length > 0) ? ' + ' : (c < 0 ? ' - ' : '');
        parts.push(`${sign}${Math.abs(c)}`);
    }
    if (parts.length === 0) return '0';
    return parts.join('');
}

// --- Main Script ---

setColumns(["equation", "solution"]);

const rows = 50;
const bases = [
    { name: 'log_2', base: 2, isNumeric: true },
    { name: 'log_3', base: 3, isNumeric: true },
    { name: 'log', base: 10, isNumeric: true },
    { name: 'ln', base: Math.E, isNumeric: false }
];

for (let i = 0; i < rows; i++) {
    let isValid = false;
    let a, c, d, f, k, baseInfo, sol_num, sol_den;

    // This loop ensures we find a problem with a valid, non-extraneous solution.
    while (!isValid) {
        // 1. Generate random parameters for the equation.
        baseInfo = bases[getRandomInt(0, bases.length - 1)];
        a = getRandomInt(1, 6);
        d = getRandomInt(1, 6);
        c = getRandomInt(-6, 6);
        f = getRandomInt(-6, 6);
        k = getRandomInt(1, 2);

        // 2. Calculate the potential solution.
        if (baseInfo.isNumeric) {
            const B_k = Math.pow(baseInfo.base, k);
            sol_num = B_k * f - c;
            sol_den = a - B_k * d;
            
            if (sol_den === 0) continue; // Denominator is zero, regenerate.

            const x = sol_num / sol_den;
            // Check if the arguments of the logs are positive for this solution.
            if (a * x + c > 0.001 && d * x + f > 0.001) { // Use a small tolerance
                isValid = true;
            }
        } else { // It's the 'ln' case, involving 'e'
            const ek = Math.pow(Math.E, k);
            if (Math.abs(a - ek * d) < 0.001) continue; // Denominator is zero, regenerate.

            // The arguments are valid if sign(af-cd) == sign(a-e^k*d)
            const term1 = a * f - c * d;
            const term2 = a - ek * d;
            if (term1 !== 0 && Math.sign(term1) === Math.sign(term2)) {
                isValid = true;
            }
        }
    }

    // 3. Format the equation string.
    const term1_str = formatLinear(a, c);
    const term2_str = formatLinear(d, f);
    const equation = `\\${baseInfo.name}(${term1_str}) = \\${baseInfo.name}(${term2_str}) + ${k}`;
    
    // 4. Format the solution string.
    let solution;
    if (baseInfo.isNumeric) {
        const commonDivisor = gcd(sol_num, sol_den);
        let final_num = sol_num / commonDivisor;
        let final_den = sol_den / commonDivisor;
        if (final_den < 0) { // Keep denominator positive
            final_num *= -1;
            final_den *= -1;
        }
        solution = (final_den === 1) ? `${final_num}` : `\\frac{${final_num}}{${final_den}}`;
    } else { // 'ln' case, format with 'e'
        const ek_str = k === 1 ? 'e' : `e^${k}`;
        
        let num_parts = [];
        if (f !== 0) num_parts.push(f === 1 ? ek_str : (f === -1 ? `-${ek_str}` : `${f}${ek_str}`));
        if (c !== 0) {
            const sign = -c > 0 ? ' + ' : ' - ';
            if (num_parts.length > 0) num_parts.push(sign);
            else if (sign === ' - ') num_parts.push('-');
            num_parts.push(Math.abs(c));
        }
        const num_str = num_parts.join('');

        let den_parts = [];
        if (a !== 0) den_parts.push(a);
        if (d !== 0) {
            const sign = -d > 0 ? ' + ' : ' - ';
            if (den_parts.length > 0) den_parts.push(sign);
            else if (sign === ' - ') den_parts.push('-');
            const dek = Math.abs(d) === 1 ? ek_str : `${Math.abs(d)}${ek_str}`;
            den_parts.push(dek);
        }
        const den_str = den_parts.join('');

        solution = `\\frac{${num_str}}{${den_str}}`;
    }
    
    // 5. Add the new problem to the CSV.
    addRow([equation, solution]);
}
