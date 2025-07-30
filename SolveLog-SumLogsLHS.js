function pickRandom(arr) {
  return arr[Math.floor(getRandom() * arr.length)];
}

function gcd(a, b) {
  while (b !== 0) [a, b] = [b, a % b];
  return Math.abs(a);
}

function texFrac(num, den) {
  if (den < 0) num = -num, den = -den;
  const g = gcd(num, den);
  num /= g; den /= g;
  return den === 1 ? `${num}` : `\\frac{${num}}{${den}}`;
}

function cleanBaseLatex(base, val) {
  if (base === 'ln') return `\\ln\\left(${val}\\right)`;
  if (base === 'log') return `\\log\\left(${val}\\right)`;
  if (base.startsWith('log_')) {
    const b = base.split('_')[1];
    return `\\log_{${b}}\\left(${val}\\right)`;
  }
  return `\\log\\left(${val}\\right)`;
}

function formatBinomial(a, b) {
  const term = a === 1 ? "x" : `${a}x`;
  if (b === 0) return term;
  return b > 0 ? `${term}+${b}` : `${term}${b}`;
}

// Predefined nice roots
const baseOptions = ['log', 'ln', 'log_2', 'log_3'];
const rootsList = [
  [1, 3],
  [-2, 2],
  [0, 4],
  [-1, 1],
  [-3, -1],
  [2, 5]
];

setColumns(["equation", "solutions"]);
seed(42);

for (let i = 0; i < 50; i++) {
  const [r1, r2] = pickRandom(rootsList);
  const base = pickRandom(baseOptions);

  // Expand (x - r1)(x - r2)
  const A = 1;
  const B = -r1 - r2;
  const C = r1 * r2;

  // Factor into binomials: (a1x + c1)(a2x + c2)
  // We'll just use A=1 for both
  const f1 = formatBinomial(1, -r1);
  const f2 = formatBinomial(1, -r2);

  const rhs = (base === 'ln') ? `e^{${1}}` : Math.pow(base === 'log' ? 10 : parseInt(base.split('_')[1]), 1);
  const RHSisSymbolic = base === 'ln';
  const k = 1;

  const log1 = cleanBaseLatex(base, f1);
  const log2 = cleanBaseLatex(base, f2);
  const equation = `${log1} + ${log2} = ${k}`;
  const solution = `"${texFrac(r1, 1)},${texFrac(r2, 1)}"`;

  addRow([equation, solution]);
}
