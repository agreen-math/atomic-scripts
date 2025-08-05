function round(value, decimal_places) {
    return value.toFixed(decimal_places);
}

function randomValue(min, max, decimal_places) {
    return round(min + getRandom() * (max - min), decimal_places);

} function randomItem(list) {
    var selection = randomValue(0, list.length - 1, 0);
    return list[selection];
}

function getA() {
    return randomItem([20, 21, 22, 23, 24, 25, 26, 27, 28, 29, 30]);
}

function getP() {
    return randomItem([2, 3, 4, 5, 6, 7, 8, 9]);
}

function gcd(x, y) {
    while (y !== 0) {
        [x, y] = [y, x % y];
    }
    return Math.abs(x);
}

function formatPiFraction(a, b) {
    const divisor = gcd(a, b);
    const num = a / divisor;
    const den = b / divisor;

    if (den === 1) return `${num}\\pi`;             // Just return like "3\\pi"
    if (num === 1) return `\\frac{\\pi}{${den}}`;   // Format like "\\frac{\\pi}{4}"
    return `\\frac{${num}\\pi}{${den}}`;            // Format like "\\frac{3\\pi}{4}"
}

function formatFraction(a, b) {
    const divisor = gcd(a, b);
    const num = a / divisor;
    const den = b / divisor;

    if (den === 1) return `${num}`;             // Just return like "3\\pi"
    if (num === 1) return `\\frac{1}{${den}}`;   // Format like "\\frac{\\pi}{4}"
    return `\\frac{${num}}{${den}}`;            // Format like "\\frac{3\\pi}{4}"
}

setColumns(["displacement", "period", "initial", "equation","eq2", "eq3", "eq4", "eq5", "eq6", "eq7", "eq8"]);
seed(42);

const rows = 50;

for (let i = 0; i < rows; i++) {
    const a = getA();
    const p = getP();
    const initial = p / 4;
    const b = formatPiFraction(2, p);
    const b1 = formatFraction(2, p);

    const Cequation = `${a}\\sin\\left(${b}t\\right)`;
    const eq2 = `${a}\\cos\\left(${b}t\\right)`;
    const eq3 = `-${a}\\cos\\left(${b}t\\right)`;
    const eq4 = `-${a}\\sin\\left(${b}t\\right)`;

    const eq5 = `${a}\\sin\\left(${b1}t\\right)`;
    const eq6 = `${a}\\cos\\left(${b1}t\\right)`;
    const eq7 = `-${a}\\sin\\left(${b1}t\\right)`;
    const eq8 = `-${a}\\cos\\left(${b1}t\\right)`;

    addRow([a, p, initial, Cequation, eq2, eq3, eq4, eq5, eq6, eq7, eq8]);
}
