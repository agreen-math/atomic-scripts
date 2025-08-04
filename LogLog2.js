function convertLnExprToSimplifiedBase(expr, base) {
  return expr
    .replace(/(\d*)\\ln\s*\\left\(([^)]+)\\right\)/g, (_, coef, arg) => {
      const coefficient = coef === "" ? "" : coef;
      if (arg === `${base}`) {
        return coefficient || "1"; // ln(base) = 1
      } else {
        return (coefficient || "1") + `\\log_{${base}}\\left(${arg}\\right)`;
      }
    });
}

// Assuming you have CSV content already read into `rows`:
const csvInput = `equation,solutions
\\ln(x+2)=\\ln(3x+1),\\frac{1}{3}
\\frac{5\\ln\\left(10\\right)+2\\ln\\left(3\\right)}{\\ln\\left(3\\right)-\\ln\\left(10\\right)},\\frac{5\\log_3\\left(10\\right)+2}{1-\\log_3\\left(10\\right)}`;

// Parse
const lines = csvInput.trim().split("\n");
const headers = lines[0].split(",");
const rows = lines.slice(1).map(line => {
  const [eq, sol] = line.split(",");
  return { equation: eq.trim(), solutions: sol.trim() };
});

// Transform
const baseList = [2, 3, 10];
const updatedRows = rows.map(row => {
  const baseSolutions = {};
  for (const base of baseList) {
    baseSolutions[`solutions_base_${base}`] = convertLnExprToSimplifiedBase(row.solutions, base);
  }
  return { ...row, ...baseSolutions };
});

// Output
const newHeaders = [...headers, ...baseList.map(b => `solutions_base_${b}`)];
const newCSV = [newHeaders.join(",")].concat(
  updatedRows.map(row => newHeaders.map(h => row[h] || "").join(","))
).join("\n");

console.log(newCSV);
