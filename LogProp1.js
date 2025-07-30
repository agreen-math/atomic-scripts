function getRandomInt(min, max) {
    return Math.floor(Math.random() * (max - min + 1)) + min;
}

function pickRandom(arr) {
    return arr[Math.floor(Math.random() * arr.length)];
}

const variables = ['x', 'y', 'z', 'a', 'b', 'm', 'n'];
const bases = ['log', 'ln', 'log_2', 'log_3'];

function formatPower(base, power) {if (power == 1) {
    return `${base}`
} else {
    return `${base}^{${power}}`
}
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

// EXPANSION
function generateExpansionProblem() {
    const var1 = pickRandom(variables);
    const var2 = pickRandom(variables.filter(v => v !== var1));
    const var3 = pickRandom(variables.filter(v => v !== var1 && v !== var2));
    const power1 = getRandomInt(1, 3);
    const power2 = getRandomInt(1, 3);
    const includeQuotient = Math.random() < 0.5;
    const base = pickRandom(bases);

    let expression, answer;

    if (includeQuotient) {
        const expr = `\\frac{${formatPower(var1, power1)}${formatPower(var2, power2)}}{${var3}}`;
        expression = `${cleanBaseLatex(base, expr)}`;

        const part1 = `${power1}${cleanBaseLatex(base, var1)}`;
        const part2 = `${power2}${cleanBaseLatex(base, var2)}`;
        const part3 = `- ${cleanBaseLatex(base, var3)}`;

        answer = `$${part1} + ${part2} ${part3}$`;
    } else {
        const coef = getRandomInt(2, 9);
        const expr = `${coef}${formatPower(var1,power1)}${formatPower(var2,power2)}`;
        expression = cleanBaseLatex(base, expr);

        const coefPart = `${cleanBaseLatex(base, coef)}`;
        const part1 = `${power1} ${cleanBaseLatex(base, var1)}`;
        const part2 = `${power2} ${cleanBaseLatex(base, var2)}`;

        answer = `${coefPart} + ${part1} + ${part2}`;
    }

    return { expression, answer };
}

// CONDENSATION
function generateCondenseProblem() {
    const var1 = pickRandom(variables);
    const var2 = pickRandom(variables.filter(v => v !== var1));
    const var3 = pickRandom(variables.filter(v => v !== var1 && v !== var2));
    const power1 = getRandomInt(1, 3);
    const power2 = getRandomInt(1, 3);
    const base = pickRandom(bases);

    const part1 = `${power1}${cleanBaseLatex(base, var1)}`;
    const part2 = `${power2}${cleanBaseLatex(base, var2)}`;
    const part3 = `- ${cleanBaseLatex(base, var3)}`;
    const expression = `${part1} + ${part2} ${part3}`;

    const numerator = `${formatPower(var1, power1)}${formatPower(var2, power2)}`;
    const condensed = `\\frac{${numerator}}{${var3}}`;
    const answer = `${cleanBaseLatex(base, condensed)}`;

    return { expression, answer };
}

// 📄 CSV Setup
setColumns(["expand_expr", "expand_ans", "condense_expr", "condense_ans"]);
seed(42);

const rows = 50;

for (let i = 0; i < rows; i++) {
    const expand = generateExpansionProblem();
    const condense = generateCondenseProblem();
    addRow([expand.expression, expand.answer, condense.expression, condense.answer]);
}
