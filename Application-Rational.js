/**
 * This script generates a CSV of word problems based on rational functions,
 * using the context of chemical concentration in a mixture.
 */

// --- Helper Functions ---

/**
 * Generates a random integer between min and max (inclusive).
 */
function getRandomInt(min, max) {
  return Math.floor(Math.random() * (max - min + 1)) + min;
}

/**
 * Formats the concentration function C(t) into a LaTeX string.
 * @param {number} initial_chemical The initial amount of chemical.
 * @param {number} initial_solution The initial volume of the solution.
 * @param {number} inflow_rate The rate at which new solution is added.
 * @param {number} inflow_concentration The concentration of the incoming solution.
 * @returns {string} The formatted C(t) equation string.
 */
function formatConcentrationFunction(initial_chemical, initial_solution, inflow_rate, inflow_concentration) {
  const numerator_t_coeff = inflow_concentration * inflow_rate;
  const numerator_const = initial_chemical;

  const denominator_t_coeff = inflow_rate;
  const denominator_const = initial_solution;

  const num_str = `${numerator_t_coeff}t+${numerator_const}`;
  const den_str = `${denominator_t_coeff}t+${denominator_const}`;

  return `C(t)=\\frac{${num_str}}{${den_str}}`;
}


// --- Main Script ---

setColumns([
    "function",
    "initial_solution_gallons",
    "initial_chemical_pounds",
    "inflow_rate_gal_per_min",
    "inflow_concentration_lbs_per_gal",
    "time_for_calc",
    "initial_concentration",
    "concentration_at_t",
    "long_term_concentration"
]);

const rows = 50;

for (let i = 0; i < rows; i++) {
  // 1. Generate random initial conditions for the mixture problem.
  const initial_solution_gallons = getRandomInt(50, 200);
  const initial_chemical_pounds = getRandomInt(5, 20);
  const inflow_rate_gal_per_min = getRandomInt(5, 15);
  const inflow_concentration_lbs_per_gal = getRandomInt(1, 4);
  const time_for_calc = getRandomInt(10, 60);

  // 2. Format the C(t) equation string.
  const c_of_t_formatted = formatConcentrationFunction(
    initial_chemical_pounds,
    initial_solution_gallons,
    inflow_rate_gal_per_min,
    inflow_concentration_lbs_per_gal
  );

  // 3. Calculate the answers.
  // Initial concentration is at t=0.
  const initial_concentration = initial_chemical_pounds / initial_solution_gallons;

  // Concentration at a specific time t.
  const numerator_at_t = initial_chemical_pounds + inflow_concentration_lbs_per_gal * inflow_rate_gal_per_min * time_for_calc;
  const denominator_at_t = initial_solution_gallons + inflow_rate_gal_per_min * time_for_calc;
  const concentration_at_t = numerator_at_t / denominator_at_t;

  // Long-term concentration is the horizontal asymptote of C(t).
  const long_term_concentration = (inflow_concentration_lbs_per_gal * inflow_rate_gal_per_min) / inflow_rate_gal_per_min;

  // 4. Add the problem data and formatted answers to the CSV.
  addRow([
    c_of_t_formatted,
    initial_solution_gallons.toString(),
    initial_chemical_pounds.toString(),
    inflow_rate_gal_per_min.toString(),
    inflow_concentration_lbs_per_gal.toString(),
    time_for_calc.toString(),
    initial_concentration.toFixed(2),
    concentration_at_t.toFixed(2),
    long_term_concentration.toFixed(2)
  ]);
}
