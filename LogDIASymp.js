function randomItem(list) {
  return list[Math.floor(getRandom() * list.length)];
}

function logBase(b, x) {
  return Math.log(x) / Math.log(b);
}

function isInteger(x) {
  return Number.isInteger(x);
}

function getA() {
  return randomItem([1, 2, 3, 4]);
}

function getB(a) {
  let b;
  do {
    b = randomItem([2, 3, 4, 5]);
  } while (a === b);
  return b;
}

function getValidD(b, c) {
  const candidates = [];
  for (let d = -5; d <= 5; d++) {
    if (d === 0) continue; // ✅ reject d = 0
    const xint = b ** (-d) - c;
    if (isInteger(xint) && xint > -100 && xint < 100) {
      candidates.push({ d, xint });
    }
  }
  return randomItem(candidates);
}


function getEQ(b, c, d) {
  const sign = d < 0 ? `-${Math.abs(d)}` : `+${d}`;
  return `f(x)=\\log_{${b}}\\left(x+${c}\\right)${sign}`;
}

setColumns(["equation", "domain", "VA", "Xint", "Yint", "ineq", "VALim", "posLim"]);
seed(42);

const rows = 50;

for (let i = 0; i < rows; i++) {
  const a = getA();                 // log_b(c) = a
  const b = getB(a);
  const c = b ** a;

  const { d, xint: Xint } = getValidD(b, c);
  const VA = -c;
  const Yint = a + d;

  const equation = getEQ(b, c, d);
  const domain = `"(${VA},\\infty)"`;
  const ineq = `"(${Xint},\\infty)"`;
  const VALim = `-\\infty`;
  const posLim = `\\infty`;

  addRow([equation, domain, VA, Xint, Yint, ineq, VALim, posLim]);
}
