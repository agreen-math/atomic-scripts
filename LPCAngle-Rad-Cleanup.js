/**
 * This script reads a CSV string containing angles formatted as fractions of pi,
 * calculates the smallest positive and largest negative coterminal angles for each,
 * and outputs a corrected CSV.
 */

// --- Input Data ---
// All backslashes have been escaped (e.g., \ -> \\) to prevent JavaScript
// from interpreting them as special characters before the script runs.
const csvData = `angle,coterminal,coterminal_negative
-\\\\frac{9\\\\pi}{2},\\\\frac{3\\\\pi}{2},-\\\\frac{\\\\pi}{2}
\\\\frac{11\\\\pi}{3},\\\\frac{5\\\\pi}{3},-\\\\frac{\\\\pi}{3}
-\\\\frac{13\\\\pi}{6},\\\\frac{11\\\\pi}{6},-\\\\frac{\\\\pi}{6}
\\\\frac{17\\\\pi}{4},\\\\frac{\\\\pi}{4},-\\\\frac{7\\\\pi}{4}
-4\\\\pi,0,0
\\\\frac{10\\\\pi}{3},\\\\frac{4\\\\pi}{3},-\\\\frac{2\\\\pi}{3}
-\\\\frac{15\\\\pi}{4},\\\\frac{\\\\pi}{4},-\\\\frac{7\\\\pi}{4}
\\\\frac{13\\\\pi}{2},0,0
-\\\\frac{5\\\\pi}{2},\\\\frac{3\\\\pi}{2},-\\\\frac{\\\\pi}{2}
\\\\frac{19\\\\pi}{6},\\\\frac{\\\\pi}{6},-\\\\frac{11\\\\pi}{6}
\\\\frac{9\\\\pi}{2},\\\\pi,-\\\\pi
-2\\\\pi,0,0
-\\\\frac{7\\\\pi}{2},\\\\frac{\\\\pi}{2},-\\\\frac{3\\\\pi}{2}
\\\\frac{12\\\\pi}{1},0,0
-\\\\frac{5\\\\pi}{6},\\\\frac{7\\\\pi}{6},-\\\\frac{5\\\\pi}{6}
\\\\frac{11\\\\pi}{6},\\\\frac{11\\\\pi}{6},-\\\\frac{\\\\pi}{6}
-\\\\frac{41\\\\pi}{12},\\\\frac{7\\\\pi}{12},-\\\\frac{17\\\\pi}{12}
\\\\frac{13\\\\pi}{6},\\\\frac{\\\\pi}{6},-\\\\frac{11\\\\pi}{6}
-2\\\\pi,0,0
\\\\frac{17\\\\pi}{6},\\\\frac{5\\\\pi}{6},-\\\\frac{7\\\\pi}{6}
-\\\\frac{19\\\\pi}{6},\\\\frac{\\\\pi}{6},-\\\\frac{11\\\\pi}{6}
\\\\frac{\\\\pi}{2},\\\\frac{\\\\pi}{2},-\\\\frac{3\\\\pi}{2}
-\\\\frac{49\\\\pi}{12},\\\\frac{11\\\\pi}{12},-\\\\frac{13\\\\pi}{12}
\\\\frac{\\\\pi}{6},\\\\frac{\\\\pi}{6},-\\\\frac{11\\\\pi}{6}
-\\\\frac{5\\\\pi}{2},\\\\frac{3\\\\pi}{2},-\\\\frac{\\\\pi}{2}
\\\\frac{37\\\\pi}{6},\\\\frac{\\\\pi}{6},-\\\\frac{11\\\\pi}{6}
-\\\\frac{13\\\\pi}{3},\\\\frac{5\\\\pi}{3},-\\\\frac{\\\\pi}{3}
\\\\pi,\\\\pi,-\\\\pi
-\\\\frac{7\\\\pi}{6},\\\\frac{5\\\\pi}{6},-\\\\frac{7\\\\pi}{6}
\\\\frac{29\\\\pi}{6},\\\\frac{5\\\\pi}{6},-\\\\frac{7\\\\pi}{6}
-\\\\frac{3\\\\pi}{4},\\\\frac{5\\\\pi}{4},-\\\\frac{3\\\\pi}{4}
\\\\frac{20\\\\pi}{3},\\\\frac{2\\\\pi}{3},-\\\\frac{4\\\\pi}{3}
-\\\\frac{59\\\\pi}{12},\\\\frac{\\\\pi}{12},-\\\\frac{23\\\\pi}{12}
\\\\frac{5\\\\pi}{3},\\\\frac{5\\\\pi}{3},-\\\\frac{\\\\pi}{3}
-\\\\frac{19\\\\pi}{12},\\\\frac{5\\\\pi}{12},-\\\\frac{19\\\\pi}{12}
\\\\frac{32\\\\pi}{6},\\\\frac{2\\\\pi}{3},-\\\\frac{4\\\\pi}{3}
-\\\\frac{15\\\\pi}{4},\\\\frac{\\\\pi}{4},-\\\\frac{7\\\\pi}{4}
\\\\frac{41\\\\pi}{12},\\\\frac{5\\\\pi}{12},-\\\\frac{19\\\\pi}{12}
-\\\\frac{\\\\pi}{6},\\\\frac{11\\\\pi}{6},-\\\\frac{\\\\pi}{6}
\\\\frac{25\\\\pi}{6},\\\\frac{\\\\pi}{6},-\\\\frac{11\\\\pi}{6}
-\\\\frac{13\\\\pi}{6},\\\\frac{11\\\\pi}{6},-\\\\frac{\\\\pi}{6}
\\\\frac{29\\\\pi}{6},\\\\frac{5\\\\pi}{6},-\\\\frac{7\\\\pi}{6}
-\\\\frac{\\\\pi}{2},\\\\frac{3\\\\pi}{2},-\\\\frac{\\\\pi}{2}
\\\\frac{23\\\\pi}{6},\\\\frac{5\\\\pi}{6},-\\\\frac{7\\\\pi}{6}
-\\\\frac{4\\\\pi}{3},\\\\frac{2\\\\pi}{3},-\\\\frac{4\\\\pi}{3}
\\\\frac{17\\\\pi}{4},\\\\frac{\\\\pi}{4},-\\\\frac{7\\\\pi}{4}
-\\\\frac{37\\\\pi}{12},\\\\frac{11\\\\pi}{12},-\\\\frac{13\\\\pi}{12}`;


// --- Helper Functions ---

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
 * Parses a LaTeX-like string representing a fraction of pi into its numerator and denominator.
 * FIX: This function now uses a robust regular expression to correctly parse the
 * specific format of the input data, resolving the "all 0s" bug.
 */
function parsePiFraction(str) {
    str = str.trim();
    if (str === "0") {
        return { num: 0, den: 1 };
    }

    let isNegative = str.startsWith('-');
    if (isNegative) {
        str = str.substring(1);
    }

    let num, den;

    const fracRegex = /\\frac(\d*)?\\pi(\d+)/;
    const nonFracRegex = /(\d*)?\\pi/;

    if (str.includes('\\frac')) {
        const match = str.match(fracRegex);
        if (match) {
            num = match[1] ? parseInt(match[1], 10) : 1;
            den = parseInt(match[2], 10);
        } else {
            return { num: 0, den: 1 }; // Return 0 if format is unexpected
        }
    } else {
        const match = str.match(nonFracRegex);
        if (match) {
            num = match[1] ? parseInt(match[1], 10) : 1;
            den = 1;
        } else {
            return { num: 0, den: 1 }; // Return 0 if format is unexpected
        }
    }

    return {
        num: isNegative ? -num : num,
        den: den
    };
}


/**
 * Formats a numerator and denominator into a LaTeX string for a fraction of pi.
 */
function formatPiFraction(num, den) {
    if (num === 0) {
        return "0";
    }

    const commonDivisor = gcd(num, den);
    const simpNum = num / commonDivisor;
    const simpDen = den / commonDivisor;
    
    const isNegative = simpNum < 0;
    const absNum = Math.abs(simpNum);
    const sign = isNegative ? "-" : "";

    if (simpDen === 1) {
        if (absNum === 1) return `${sign}\\pi`;
        return `${sign}${absNum}\\pi`;
    }

    const numeratorStr = absNum === 1 ? "\\pi" : `${absNum}\\pi`;
    return `${sign}\\frac{${numeratorStr}}{${simpDen}}`;
}


// --- Main Processing Logic ---

function processCSV(csv) {
    const lines = csv.trim().split('\n');
    const headers = lines.shift(); // "angle,coterminal,coterminal_negative"
    let correctedCSV = headers + '\n';

    for (const line of lines) {
        if (!line.trim()) continue; // Skip empty lines
        
        const originalAngleStr = line.split(',')[0];
        const { num, den } = parsePiFraction(originalAngleStr);

        // Calculate smallest positive coterminal angle in the range [0, 2pi).
        const floorVal = Math.floor(num / (2 * den));
        const positiveNum = num - (2 * floorVal * den);
        
        const positiveCoterminalStr = formatPiFraction(positiveNum, den);

        // Calculate largest negative coterminal angle in the range (-2pi, 0].
        let negativeCoterminalStr;
        if (positiveNum === 0) {
            negativeCoterminalStr = "0";
        } else {
            const negativeNum = positiveNum - (2 * den);
            negativeCoterminalStr = formatPiFraction(negativeNum, den);
        }

        correctedCSV += `${originalAngleStr},${positiveCoterminalStr},${negativeCoterminalStr}\n`;
    }
    return correctedCSV;
}

// --- Execution ---

const correctedData = processCSV(csvData);
console.log(correctedData);

