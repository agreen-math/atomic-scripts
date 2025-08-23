/**
 * This script generates a list of 32 polar coordinates for a classroom card-sorting activity.
 * For each of the 4 input points, it creates:
 * - 4 mathematically equivalent coordinates (the "correct" answers).
 * - 4 plausible but incorrect coordinates (the "distractors").
 * The output is in CSV format, ready to be copied into a spreadsheet for printing.
 */

// --- 1. CUSTOMIZE YOUR FOUR POINTS HERE ---
const inputPoints = {
    A: { r: 3, num: 1, den: 4 },  // (3, pi/4)
    B: { r: 4, num: 2, den: 3 },  // (4, 2pi/3)
    C: { r: 2, num: 7, den: 6 },  // (2, 7pi/6)
    D: { r: 5, num: 11, den: 6 }  // (5, 11pi/6)
};

// --- 2. HELPER FUNCTIONS (No need to edit) ---

const gcd = (a, b) => {
  return b === 0 ? a : gcd(b, a % b);
};

const formatTheta = (num, den) => {
    if (num === 0) return "0";
    const sign = num < 0 ? "-" : "";
    num = Math.abs(num);
    const commonDivisor = gcd(num, den);
    const simpNum = num / commonDivisor;
    const simpDen = den / commonDivisor;

    if (simpDen === 1) return simpNum === 1 ? `${sign}\\pi` : `${sign}${simpNum}\\pi`;
    const numerator = simpNum === 1 ? "\\pi" : `${simpNum}\\pi`;
    return `${sign}\\frac{${numerator}}{${simpDen}}`;
};

const formatPolar = (r, num, den) => {
  const thetaStr = formatTheta(num, den);
  return `\\left(${r},${thetaStr}\\right)`;
};

// --- 3. MAIN SCRIPT LOGIC (No need to edit) ---

function generateCardData() {
    const allCards = [];

    for (const pointKey in inputPoints) {
        const p = inputPoints[pointKey];

        // --- Generate 4 Correct Equivalents ---
        const equivalents = [
            { coord: formatPolar(p.r, p.num + 2 * p.den, p.den), type: "Correct", point: pointKey }, // (r, θ + 2π)
            { coord: formatPolar(p.r, p.num - 2 * p.den, p.den), type: "Correct", point: pointKey }, // (r, θ - 2π)
            { coord: formatPolar(-p.r, p.num + p.den, p.den), type: "Correct", point: pointKey },  // (-r, θ + π)
            { coord: formatPolar(-p.r, p.num - p.den, p.den), type: "Correct", point: pointKey }   // (-r, θ - π)
        ];
        allCards.push(...equivalents);

        // --- Generate 4 Plausible Distractors ---
        const distractors = [
            { coord: formatPolar(-p.r, p.num, p.den), type: "Distractor", point: pointKey }, // (-r, θ)
            { coord: formatPolar(p.r, p.num + p.den, p.den), type: "Distractor", point: pointKey }, // (r, θ + π)
            { coord: formatPolar(p.r, -p.num, p.den), type: "Distractor", point: pointKey }, // (r, -θ)
            { coord: formatPolar(-p.r, p.num + 2 * p.den, p.den), type: "Distractor", point: pointKey } // (-r, θ + 2π)
        ];
        allCards.push(...distractors);
    }
    return allCards;
}

function printCSV(data) {
    console.log("Coordinate,Type,CorrectPoint");
    data.forEach(card => {
        // Enclose coordinate in quotes to handle the comma
        console.log(`"${card.coord}",${card.type},${card.point}`);
    });
}

// --- 4. EXECUTE SCRIPT ---
const cardData = generateCardData();
printCSV(cardData);
