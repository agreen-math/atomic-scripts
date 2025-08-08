/**
 * Selects a specified number of unique, random items from an array.
 * If the number of items to select is greater than the array's length, it returns the entire shuffled array.
 *
 * @param {Array<string>} arr The input array of strings.
 * @param {number} count The number of distinct items to select.
 * @returns {Array<string>} An array containing the randomly selected items.
 */
function getRandom(arr, count){
  // Handle edge cases for invalid input
  if (count <= 0 || arr.length === 0) {
    return [];
  }

  // Create a copy of the array to avoid modifying the original
  const shuffledArr = [...arr];
  const result = [];

  // If the count is greater than the array length, simply shuffle and return the whole array
  if (count >= shuffledArr.length) {
    // A simple shuffling algorithm (Fisher-Yates)
    for (let i = shuffledArr.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [shuffledArr[i], shuffledArr[j]] = [shuffledArr[j], shuffledArr[i]];
    }
    return shuffledArr;
  }

  // Select 'count' distinct items
  while (result.length < count && shuffledArr.length > 0) {
    // Get a random index from the remaining items in the shuffled array
    const randomIndex = Math.floor(Math.random() * shuffledArr.length);

    // Add the item to the result array
    result.push(shuffledArr[randomIndex]);

    // Remove the selected item from the temporary array to ensure it is not picked again
    shuffledArr.splice(randomIndex, 1);
  }

  return result;
};

function getProductToSumIdentities(arg1, arg2){
  
  
    // Construct the LaTeX string for the sine product-to-sum identity
  const sinProductIdentity = `\\sin\\left(${arg1}\\right)\\sin\\left(${arg2}\\right)`
  const sinPtoS = `\\frac{1}{2}\\left[\\cos\\left(${arg1}-${arg2}\\right) - \\cos\\left(${arg1}+${arg2}\\right)\\right]`;

  // Construct the LaTeX string for the cosine product-to-sum identity
  const cosProductIdentity = `\\cos\\left(${arg1}\\right)\\cos\\left(${arg2}\\right)`
  const cosPtoS = `\\frac{1}{2}\\left[\\cos\\left(${arg1}-${arg2}\\right) + \\cos\\left(${arg1}+${arg2}\\right)\\right]`;
  

  // Construct the LaTeX string for the sine-cosine product-to-sum identity
  const sinCosProductIdentity = `\\sin\\left(${arg1}\\right)\\cos\\left(${arg2}\\right)` 
  const sinCosPtoS = `\\frac{1}{2}\\left[\\sin\\left(${arg1}+${arg2}\\right) + \\sin\\left(${arg1}-${arg2}\\right)\\right]`;

  const cosSinProductIdentity = `\\cos\\left(${arg1}\\right)\\sin\\left(${arg2}\\right)` 
  const cosSinPtoS=    `\\frac{1}{2}\\left[\\sin\\left(${arg1}+${arg2}\\right) + \\sin\\left(${arg1}-${arg2}\\right)\\right]`;

  return {
    sinProductIdentity,
    sinPtoS,
    cosProductIdentity,
    cosPtoS,
    sinCosProductIdentity,
    sinCosPtoS,
    cosSinProductIdentity,
    cosSinPtoS
  };
};

const arg1list = ['2x', '3x', '4x', '5x', '6x', '7x', '8x', '9x'];
const arg2list = ['2x', '3x', '4x', '5x', '6x', '7x', '8x', '9x'];

//---------------------------------------------------------------------

setColumns(["sinP", "sinPtoS", "cosP", "cosPtoS", "scP", "scPtoS", "csP", "csPtoS"]);
seed(42);

const rows = 50;

for (let i = 0; i < rows; i++) {
    const arg1 = getRandom(arg1list, 1);
    const arg2 = getRandom(arg2list, 1);
    const identities = getProductToSumIdentities(arg1[0], arg2[0]);

    addRow([identities.sinProductIdentity, identities.sinPtoS,
            identities.cosProductIdentity, identities.cosPtoS,
            identities.sinCosProductIdentity, identities.sinCosPtoS,
            identities.cosSinProductIdentity, identities.cosSinPtoS]);
}
