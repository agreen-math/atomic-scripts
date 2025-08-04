function formatLatexFraction(a, b) {
    const sign = a * b < 0 ? '-' : '';
    return `${sign}\\frac{${Math.abs(a)}}{${Math.abs(b)}}`;
}

function getOpposite(latex) {
    const frac = parseLatexFraction(latex);
    if (!frac) return '';
    return formatLatexFraction(-frac.numerator, frac.denominator);
}

function getReciprocalOfOpposite(latex) {
    const frac = parseLatexFraction(latex);
    if (!frac || frac.numerator === 0) return '';
    return formatLatexFraction(-frac.denominator, frac.numerator);
}


function gcd(a, b) {
    while (b !== 0) {
        [a, b] = [b, a % b];
    }
    return Math.abs(a);
}

function areRelativelyPrime(a, b) {
    return gcd(a, b) === 1;
}

function parseLatexFraction(latex) {
    const match = latex.match(/(-?)\\frac{(\d+)}{(\d+)}/);
    if (!match) return null;

    const sign = match[1] === '-' ? -1 : 1;
    const numerator = parseInt(match[2], 10);
    const denominator = parseInt(match[3], 10);

    return { numerator: sign * numerator, denominator };
}


function getValue() {
    let a, b;
    do {
        a = Math.floor(Math.random() * 9) + 1; // 1–9
        b = Math.floor(Math.random() * 9) + 1;
    } while (!areRelativelyPrime(a, b));

    // Randomly decide whether to make the entire fraction negative
    const isNegative = Math.random() < 0.5;

    return `${isNegative ? '-' : ''}\\frac{${a}}{${b}}`;
}

function getTrig12() {
    const primaryKeys = ["cos", "sin", "tan"];
    const reciprocalMap = {
        cos: "sec",
        sin: "csc",
        tan: "cot"
    };

    // Pick a random key
    const chosen = primaryKeys[Math.floor(Math.random() * primaryKeys.length)];

    // Build LaTeX versions
    const latexPrimary = `\\${chosen}`;
    const latexReciprocal = `\\${reciprocalMap[chosen]}`;

    return [latexPrimary, latexReciprocal];
}

function getAngleVar() {
    const variables = ["\\theta", "t", "\\alpha", "x"];
    return variables[Math.floor(Math.random() * variables.length)];
}

//---------------------------------------------------------------------

setColumns(["value", "trig1", "trig2", "angleVar", "negValue", "recipNegValue"]);
seed(42);

const rows = 50;

for (let i = 0; i < rows; i++) {
    const value = getValue();  // returns LaTeX string like "\\frac{3}{4}" or "-\\frac{2}{5}"
    const [trig1, trig2] = getTrig12();
    const angleVar = getAngleVar();
    const opposite = getOpposite(value);
    const reciprocalOfOpposite = getReciprocalOfOpposite(value);

    addRow([value, trig1, trig2, angleVar, opposite, reciprocalOfOpposite]);
}