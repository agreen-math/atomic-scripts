function pickRandom(arr) {
  return arr[Math.floor(Math.random() * arr.length)];
}

function getRandomInt(min, max) {
  return Math.floor(Math.random() * (max - min + 1)) + min;
}

function formatExponent(base, exp) {
  return exp === 1 ? base : `${base}^{${exp}}`;
}

function cleanLogLatex(base, expr) {
  if (base === 'ln') return `\\ln\\left(${expr}\\right)`;
  if (base === 'log') return `\\log\\left(${expr}\\right)`;
  if (base.startsWith('log_')) {
    const b = base.split('_')[1];
    return `\\log_{${b}}\\left(${expr}\\right)`;
  }
  return `\\log\\left(${expr}\\right)`;
}

function formatSolution(base, c, a, b) {
  let expValue;

  if (base === 'ln') {
    expValue = `e^{${c}}`; // keep symbolic
  } else if (base === 'log') {
    expValue = Math.pow(10, c);
  } else if (base.startsWith('log_')) {
    const baseNum = parseInt(base.split('_')[1]);
    expValue = Math.pow(baseNum, c);
  } else {
    expValue = Math.pow(10, c);
  }

  // Handle symbolic result (ln)
  if (typeof expValue === 'string') {
    const sign = b < 0 ? '+' : '-';
    const absB = Math.abs(b);
    const numerator = `${expValue} ${sign} ${absB}`;
    return a === 1
      ? `${numerator}`
      : `\\frac{${numerator}}{${a}}`;
  }

  // Numeric simplification
  const numerator = expValue - b;

  // Reduce if possible
  if (Number.isInteger(numerator) && numerator % a === 0) {
    return `${numerator / a}`;
  } else if (a === 1) {
    return `${numerator}`;
  } else {
    return `\\frac{${numerator}}{${a}}`;
  }
}


// Config
const bases = ['ln', 'log', 'log_2', 'log_3', 'log_5', 'log_10'];

function generateLogEquation() {
  const a = pickRandom([1, 2, 3, 4, 5]);
  const b = pickRandom([-5, -4, -3, -2, -1, 1, 2, 3, 4, 5]);
  const c = getRandomInt(1, 4);
  const base = pickRandom(bases);

  const expr = `${a === 1 ? "" : a}x ${b < 0 ? "- " + Math.abs(b) : "+ " + b}`;
  const equation = `${cleanLogLatex(base, expr)} = ${c}`;
  const solution = formatSolution(base, c, a, b);

  return { equation, solution };
}

// CSV OUTPUT
setColumns(["equation", "solutions"]);
seed(42);

const rows = 50;

for (let i = 0; i < rows; i++) {
  const { equation, solution } = generateLogEquation();
  addRow([equation, solution]);
}
