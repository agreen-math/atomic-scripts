function randomItem(list) {
  return list[Math.floor(getRandom() * list.length)];
}

function texPoly(coefficients) {
  let terms = [];

  for (let i = 0; i < coefficients.length; i++) {
    const coef = coefficients[i];
    const degree = coefficients.length - 1 - i;

    if (coef === 0) continue;

    const sign = coef > 0 ? (terms.length > 0 ? " + " : "") : " - ";
    const absCoef = Math.abs(coef);

    let term = "";
    if (degree === 0) {
      term = `${absCoef}`;
    } else if (degree === 1) {
      term = (absCoef === 1 ? "" : `${absCoef}`) + "x";
    } else {
      term = (absCoef === 1 ? "" : `${absCoef}`) + `x^${degree}`;
    }

    terms.push((coef < 0 ? sign + term : sign.trim() + term));
  }

  return terms.join("");
}

function getSmallInt() {
  return randomItem([-5, -4, -3, -2, -1, 1, 2, 3, 4, 5]);
}

function getPositiveInt() {
  return randomItem([1, 2, 3, 4, 5, 6, 7, 8, 9]);
}

setColumns(["expression", "decomposed"]);
seed(42);

const rows = 50;

for (let i = 0; i < rows; i++) {
  let a, b, c, r, q;
  let A = null, B = null, C = null;

  while (A === null || B === null || C === null || [A, B, C].some(v => v === 0)) {
    a = getSmallInt();
    b = getSmallInt();
    c = getSmallInt();
    r = getSmallInt();
    q = getPositiveInt();  // Ensures x^2 + q is irreducible

    // System:
    // a = A + B
    // b = B*r + C
    // c = A*q + C*r

    for (let trialA = -5; trialA <= 5; trialA++) {
      const trialB = a - trialA;
      const trialC = b - trialB * r;
      const checkC = trialA * q + trialC * r;

      if (
        Number.isInteger(trialB) &&
        Number.isInteger(trialC) &&
        checkC === c &&
        trialA !== 0 && trialB !== 0 && trialC !== 0
      ) {
        A = trialA;
        B = trialB;
        C = trialC;
        break;
      }
    }
  }

  const numerator = texPoly([a, b, c]);
  const lin = texPoly([1, r]);
  const quad = `x^2 + ${q}`;

  const expression = `"\\frac{${numerator}}{(${lin})(${quad})}"`;
  const decomposed = `"\\frac{${A}}{${lin}} + \\frac{${B}x + ${C}}{${quad}}"`;

  addRow([expression, decomposed]);
}
