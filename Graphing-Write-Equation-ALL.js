/**
 * This script generates a CSV of problems where students must find the equation
 * of a trigonometric function given its key features.
 */

// --- Helper Functions ---

const getRandomInt = (min, max) => {
    return Math.floor(Math.random() * (max - min + 1)) + min;
};

const getRandomElement = (arr) => {
    return arr[Math.floor(Math.random() * arr.length)];
};

const gcd = (a, b) => {
    return b === 0 ? a : gcd(b, a % b);
};

const formatPiLatex = (num, den) => {
    if (num === 0) return "0";
    
    const commonDivisor = gcd(Math.abs(num), Math.abs(den));
    num /= commonDivisor;
    den /= commonDivisor;

    if (den === 1) {
        return num === 1 ? "\\pi" : `${num}\\pi`;
    }
    return num === 1 ? `\\frac{\\pi}{${den}}` : `\\frac{${num}\\pi}{${den}}`;
};

// --- Main Script ---

setColumns([
    "function_type",
    "central_axis",
    "period",
    "horizontal_shift",
    "vertical_stretch",
    "value_at_shift",
    "equation"
]);

const rows = 50;

// Map for abbreviated function names to full names
const funcNameMap = {
    "sin": "sine",
    "cos": "cosine",
    "tan": "tangent",
    "cot": "cotangent",
    "sec": "secant",
    "csc": "cosecant"
};

for (let i = 0; i < rows; i++) {
    // 1. Randomly select the function type
    const funcList = ["sin", "cos", "tan", "cot", "sec", "csc"];
    const funcName = getRandomElement(funcList); // Abbreviated name for logic
    const isSinusoidal = ["sin", "cos", "sec", "csc"].includes(funcName);

    // 2. Generate parameters (A > 0, B > 0, C >= 0)
    const A = getRandomInt(1, 5);
    const D = getRandomInt(-5, 5);

    // Generate B and Period
    const periodOptions = [
        { num: 1, den: 4 }, { num: 1, den: 3 }, { num: 1, den: 2 }, { num: 2, den: 3 },
        { num: 1, den: 1 }, { num: 3, den: 2 }, { num: 2, den: 1 }, { num: 4, den: 1 }
    ];
    const periodChoice = getRandomElement(periodOptions);
    const periodLatex = formatPiLatex(periodChoice.num, periodChoice.den);
    
    const B_num = isSinusoidal ? 2 * periodChoice.den : periodChoice.den;
    const B_den = periodChoice.num;
    const commonDivisorB = gcd(B_num, B_den);
    const bNumFinal = B_num / commonDivisorB;
    const bDenFinal = B_den / commonDivisorB;

    // Generate C (Horizontal Shift)
    const shiftOptions = [
        { num: 0, den: 1 }, { num: 1, den: 6 }, { num: 1, den: 4 },
        { num: 1, den: 3 }, { num: 1, den: 2 }
    ];
    const shiftChoice = getRandomElement(shiftOptions);
    const cLatex = formatPiLatex(shiftChoice.num, shiftChoice.den);

    // 3. Determine the five features for the columns
    const centralAxis = `y = ${D}`;
    const verticalStretch = `${A}`;
    const horizontalShift = cLatex === "0" ? "0" : `${cLatex}`;
    
    let valueAtShift;
    if (["sin", "tan"].includes(funcName)) valueAtShift = `${D}`;
    else if (["cos", "sec"].includes(funcName)) valueAtShift = `${D + A}`;
    else valueAtShift = "Undefined"; // cot, csc

    // 4. Format the final equation string
    const aStr = A === 1 ? "" : `${A}`;
    const bStr = bDenFinal === 1 ? (bNumFinal === 1 ? "" : `${bNumFinal}`) : `\\frac{${bNumFinal}}{${bDenFinal}}`;
    const cStr = cLatex === "0" ? "" : ` - ${cLatex}`;
    const dStr = D === 0 ? "" : (D > 0 ? ` + ${D}` : ` - ${Math.abs(D)}`);
    
    let innerContent = bStr ? `${bStr}(x${cStr})` : `x${cStr}`;
    if (cLatex === "0" && bStr) innerContent = `${bStr}x`;
    
    const equation = `y = ${aStr}${funcName}\\left(${innerContent}\\right)${dStr}`;

    // 5. Add the new problem to the CSV.
    const funcNameFull = funcNameMap[funcName]; // Get the full name for the column
    addRow([
        funcNameFull,
        centralAxis,
        periodLatex,
        horizontalShift,
        verticalStretch,
        valueAtShift,
        equation
    ]);
}
