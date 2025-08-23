/**
 * This script generates a CSV of problems for graphing parametric equations
 * by creating a table of values for t, x, and y.
 */

// --- Helper Functions ---

/**
 * Generates a random integer between min and max (inclusive).
 */
function getRandomInt(min, max) {
  return Math.floor(Math.random() * (max - min + 1)) + min;
}

/**
 * Formats a linear equation in terms of 't' into a clean string.
 */
function formatEquation(variable, coeff, constant) {
  let t_part = '';
  if (coeff !== 0) {
    if (coeff === 1) t_part = 't';
    else if (coeff === -1) t_part = '-t';
    else t_part = `${coeff}t`;
  }

  let const_part = '';
  if (constant !== 0) {
    if (t_part !== '' && constant > 0) {
      const_part = `+${constant}`;
    } else {
      const_part = `${constant}`;
    }
  }
  
  if (t_part === '' && const_part === '') return `${variable}=0`;
  return `${variable}=${t_part}${const_part}`;
}


// --- Main Script ---

setColumns([
    "xEquation", "yEquation", "interval",
    "t1", "t2", "t3", "t4",
    "xt1", "xt2", "xt3", "xt4",
    "yt1", "yt2", "yt3", "yt4",
    "domain", "range"
]);

const rows = 50;

for (let i = 0; i < rows; i++) {
  // 1. Generate coefficients for the linear equations x=at+b, y=ct+d.
  let a, c;
  do { a = getRandomInt(-5, 5); } while (a === 0);
  do { c = getRandomInt(-5, 5); } while (c === 0);
  const b = getRandomInt(-10, 10);
  const d = getRandomInt(-10, 10);

  // 2. Generate an interval for t that is exactly 4 units long.
  const t_start = getRandomInt(-5, 2);
  const t_end = t_start + 3;
  const interval = `"[${t_start},${t_end}]"`;

  // 3. Select the four consecutive integer t-values for the table.
  const t1 = t_start;
  const t2 = t_start + 1;
  const t3 = t_start + 2;
  const t4 = t_end;

  // 4. Calculate the corresponding x and y values.
  const xt1 = a * t1 + b;
  const xt2 = a * t2 + b;
  const xt3 = a * t3 + b;
  const xt4 = a * t4 + b;
  const yt1 = c * t1 + d;
  const yt2 = c * t2 + d;
  const yt3 = c * t3 + d;
  const yt4 = c * t4 + d;

  // 5. Calculate the domain and range from the interval endpoints.
  const domain_end1 = a * t_start + b;
  const domain_end2 = a * t_end + b;
  const domain = `"[${Math.min(domain_end1, domain_end2)},${Math.max(domain_end1, domain_end2)}]"`;

  const range_end1 = c * t_start + d;
  const range_end2 = c * t_end + d;
  const range = `"[${Math.min(range_end1, range_end2)},${Math.max(range_end1, range_end2)}]"`;

  // 6. Add the new problem to the CSV.
  addRow([
    formatEquation('x', a, b),
    formatEquation('y', c, d),
    interval,
    t1.toString(), t2.toString(), t3.toString(), t4.toString(),
    xt1.toString(), xt2.toString(), xt3.toString(), xt4.toString(),
    yt1.toString(), yt2.toString(), yt3.toString(), yt4.toString(),
    domain,
    range
  ]);
}
