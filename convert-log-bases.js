const fs = require("fs");
const csv = require("csv-parser");
const createCsvWriter = require("csv-writer").createObjectCsvWriter;
const math = require("mathjs");

function fromLatexToMathjs(expr) {
  return expr
    .replace(/\\frac\{([^{}]+)\}\{([^{}]+)\}/g, "($1)/($2)")
    .replace(/\\log\\left\(([^()]+)\)/g, "log($1)")
    .replace(/\\ln\\left\(([^()]+)\)/g, "log($1)")
    .replace(/\\log\(([^()]+)\)/g, "log($1)")
    .replace(/\\left\(|\\right\)/g, "");
}

function toLatexFromMathjs(node) {
  return math.parse(node.toString()).toTex();
}

function simplifyLatexFraction(exprLatex) {
  try {
    const mathExpr = fromLatexToMathjs(exprLatex);
    const simplified = math.simplify(mathExpr);
    return toLatexFromMathjs(simplified);
  } catch (err) {
    console.warn("❌ Could not simplify:", exprLatex, err.message);
    return exprLatex;
  }
}

function convertLnTo(expr, base) {
  return expr.replace(/\\ln\s*\\left\(([^)]+)\\right\)/g, (_, arg) => {
    return `\\frac{\\log\\left(${arg}\\right)}{\\log\\left(${base}\\right)}`;
  });
}

function convertLnToCommon(expr) {
  return expr.replace(/\\ln\s*\\left\(([^)]+)\\right\)/g, (_, arg) => {
    return `\\frac{\\log\\left(${arg}\\right)}{\\log\\left(e\\right)}`;
  });
}

function processRow(row) {
  const lnSolution = row.solution_ln;
  const a = row.base_lhs?.trim();
  const b = row.base_rhs?.trim();

  if (!lnSolution || !a || !b) {
    console.warn("⚠️ Skipping row due to missing ln solution or base info:", row.equation);
    return {
      ...row,
      solution_log10: "",
      solution_log_a: "",
      solution_log_b: ""
    };
  }

  const log10 = convertLnToCommon(lnSolution);
  const logA = convertLnTo(lnSolution, a);
  const logB = convertLnTo(lnSolution, b);

  return {
    ...row,
    solution_log10: simplifyLatexFraction(log10),
    solution_log_a: simplifyLatexFraction(logA),
    solution_log_b: simplifyLatexFraction(logB)
  };
}

function processCSV(inputFile, outputFile) {
  const rows = [];

  fs.createReadStream(inputFile)
    .pipe(csv())
    .on("data", (data) => rows.push(processRow(data)))
    .on("end", () => {
      const csvWriter = createCsvWriter({
        path: outputFile,
        header: [
          { id: "equation", title: "equation" },
          { id: "solution_ln", title: "solution_ln" },
          { id: "base_lhs", title: "base_lhs" },
          { id: "base_rhs", title: "base_rhs" },
          { id: "solution_log10", title: "solution_log10" },
          { id: "solution_log_a", title: "solution_log_a" },
          { id: "solution_log_b", title: "solution_log_b" }
        ]
      });

      csvWriter.writeRecords(rows).then(() => {
        console.log("✅ Output written to", outputFile);
      });
    });
}

// Run it
processCSV("input.csv", "output.csv");
