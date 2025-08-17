/**
 * This script generates a CSV of application problems for interpreting a
 * sinusoidal function that models a business's monthly income.
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
 * Formats a fraction of pi into a simplified LaTeX string.
 */
function formatPiFraction(num, den) {
    if (num === 0) return "0";

    const commonDivisor = gcd(num, den);
    let simpNum = num / commonDivisor;
    let simpDen = den / commonDivisor;

    if (simpDen === 1) {
        return simpNum === 1 ? "\\pi" : `${simpNum}\\pi`;
    }
    const numerator = simpNum === 1 ? "\\pi" : `${simpNum}\\pi`;
    return `\\frac{${numerator}}{${simpDen}}`;
}


// --- Main Script ---

setColumns([
    "equation",
    "max_min",
    "average_income",
    "max_or_min_income",
    "months",
    "event_frequency"
]);

const rows = 50;

for (let i = 0; i < rows; i++) {
  // 1. Generate parameters for the function y = A*func(B(x-C)) + D
  const A = getRandomInt(5, 20);  // Amplitude in thousands
  const D = getRandomInt(20, 50); // Average income in thousands
  const C = getRandomInt(1, 12);  // Phase shift in months (1-12)

  // Set the number of events per year (2, 3, or 4)
  const num_events = getRandomInt(2, 4);
  const period = 12 / num_events;
  const B_num = 2;
  const B_den = period; // B = 2pi / period

  let isCosine, funcName, max_min;

  // FIX: Restrict function types based on period to guarantee integer month solutions.
  if (period === 4) { // Period is 4 (3 events), all combos work
    isCosine = Math.random() < 0.5;
    max_min = Math.random() < 0.5 ? "maximum" : "minimum";
  } else if (period === 6) { // Period is 6 (2 events), only cosine works for integer months
    isCosine = true;
    max_min = Math.random() < 0.5 ? "maximum" : "minimum";
  } else { // period === 3 (4 events), only cosine max works for integer months
    isCosine = true;
    max_min = "maximum";
  }
  
  funcName = isCosine ? "\\cos" : "\\sin";

  // 2. Format the equation string.
  const b_latex = formatPiFraction(B_num, B_den);
  const equation = `y=${A}${funcName}\\left[${b_latex}\\left(x-${C}\\right)\\right]+${D}`;

  // 3. Calculate the answers.
  const average_income = D;
  const max_or_min_income = (max_min === "maximum") ? D + A : D - A;
  const event_frequency = num_events;

  // 4. Find the months for the max/min income.
  let months = [];
  for (let k = -2; k < 4; k++) { // Expanded loop to catch all possibilities
    let month;
    if (isCosine) {
      if (max_min === "maximum") { // Max of cosine is at 0, 2pi, ...
        month = C + k * period;
      } else { // Min of cosine is at pi, 3pi, ...
        month = C + period / 2 + k * period;
      }
    } else { // Sine function
      if (max_min === "maximum") { // Max of sine is at pi/2, 5pi/2, ...
        month = C + period / 4 + k * period;
      } else { // Min of sine is at 3pi/2, 7pi/2, ...
        month = C + period * (3 / 4) + k * period;
      }
    }
    // Check if the month is an integer between 1 and 12
    if (month >= 1 && month <= 12 && Math.abs(month - Math.round(month)) < 0.001) {
      const roundedMonth = Math.round(month);
      if (!months.includes(roundedMonth)) {
        months.push(roundedMonth);
      }
    }
  }
  months.sort((a, b) => a - b); // Sort numerically

  // 5. Add the new problem to the CSV.
  // FIX: Add quotes around the months string to handle commas in CSV.
  const months_formatted = `"${months.join(',')}"`;
  addRow([
    equation,
    max_min,
    average_income.toString(),
    max_or_min_income.toString(),
    months_formatted,
    event_frequency.toString()
  ]);
}
