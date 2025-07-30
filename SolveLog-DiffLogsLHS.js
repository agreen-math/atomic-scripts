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

const bases = ['log', 'ln', 'log_2', 'log_3', 'log_5'];
const roots = [-3, -2, -1, 0, 1, 2, 3];

setColumns(["equation", "solutions"]);
seed(42);

for (let i = 0; i < 50; i++) {
  const xval = pickRandom(roots);
  const base = pickRandom(bases);
  const k = pickRandom([1, 2]);
  const bval = (base === 'ln') ? 'e' : (base === 'log' ? 10 : parseInt(base.split('_')[1]));
  const rhs = (base === 'ln') ? `e^{${k}}` : Math.pow(bval, k);

  let d = pickRandom([1, 2, 3]);
  let e = pickRandom([-4, -2, 0, 2, 4]);

  // Compute numerator: a*x + c = rhs * (d*x + e)
  const axPlusC = rhs * (d * xval + e);
  const a = d * rhs;
  const c = e * rhs;

  const L1 = cleanBaseLatex(base, formatBinomial(a, c));
  const L2 = cleanBaseLatex(base, formatBinomial(d, e));
  const equation = `${L1} - ${L2} = ${k}`;
  const solution = texFrac(xval, 1);

  addRow([equation, solution]);
}
