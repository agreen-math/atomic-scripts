const fs = require("fs");
const path = require("path");

// Convert \ln-expression to a different logarithm base
function convertLnExprToSimplifiedBase(expr, base) {
  return expr.replace(/(\d*)\\ln\s*\\left\(([^)]+)\\right\)/g, (_, coef, arg) => {
    const coefficient = coef === "" ? "" : coef;

    // Only simplify ln(e) = 1
    if (arg === "e") {
      return coefficient || "1";
    } else {
      return (coefficient || "1") + `\\log_{${base}}\\left(${arg}\\right)`;
    }
  });
}


// Find all exponent bases like 10^{...}, 3^{...}, e^{...}
function extractBases(equation) {
  const matches = Array.from(equation.matchAll(/([0-9]+|e)\^\{/g), m => m[1]);
  return [...new Set(matches)];
}

// Read input.csv
const inputPath = path.join(__dirname, "input.csv");
const outputPath = path.join(__dirname, "output.csv");
const inputCSV = fs.readFileSync(inputPath, "utf8").trim();

// Parse CSV
const lines = inputCSV.split("\n");
const headers = lines[0].split(",").map(h => h.trim());
const rows = lines.slice(1).map(line => {
  const cols = line.split(",");
  return { equation: cols[0].trim(), solutions: cols[1].trim() };
});

// Process and build extra base-solution columns
const allOutputRows = rows.map(row => {
  const bases = extractBases(row.equation);
  const result = { ...row };

  // always include base 10 and base e
  result["solutions_base_10"] = convertLnExprToSimplifiedBase(row.solutions, "10");
  result["solutions_base_e"]  = row.solutions;  // original is ln

  // also include any extra detected bases
  bases.forEach(b => {
    if (b !== "10" && b !== "e") {
      result[`solutions_base_${b}`] = convertLnExprToSimplifiedBase(row.solutions, b);
    }
  });

  return result;
});

// Determine complete output headers
const allKeys = new Set();
allOutputRows.forEach(r => Object.keys(r).forEach(k => allKeys.add(k)));
const outputHeaders = Array.from(allKeys);

// Build CSV
const outputCSV = [
  outputHeaders.join(","),
  ...allOutputRows.map(r => outputHeaders.map(h => r[h] || "").join(","))
].join("\n");

fs.writeFileSync(outputPath, outputCSV);
console.log("✅ Wrote output.csv with added solution columns.");
