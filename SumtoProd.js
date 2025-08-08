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

function getSumToProductIdentities(arg1, arg2){
  // Construct the LaTeX string for the sine sum identity: sin(A) + sin(B)
  const sinS = `\\sin\\left(${arg1}\\right) + \\sin\\left(${arg2}\\right)` 
  const sinStoP= `2\\sin\\left(\\frac{${arg1}+${arg2}}{2}\\right)\\cos\\left(\\frac{${arg1}-${arg2}}{2}\\right)`;

  // Construct the LaTeX string for the sine difference identity: sin(A) - sin(B)
  const sinD = `\\sin\\left(${arg1}\\right) - \\sin\\left(${arg2}\\right)` 
  const sinDtoP= `2\\cos\\left(\\frac{${arg1}+${arg2}}{2}\\right)\\sin\\left(\\frac{${arg1}-${arg2}}{2}\\right)`;

  // Construct the LaTeX string for the cosine sum identity: cos(A) + cos(B)
  const cosS = `\\cos\\left(${arg1}\\right) + \\cos\\left(${arg2}\\right)` 
  const cosStoP= `2\\cos\\left(\\frac{${arg1}+${arg2}}{2}\\right)\\cos\\left(\\frac{${arg1}-${arg2}}{2}\\right)`;

  // Construct the LaTeX string for the cosine difference identity: cos(A) - cos(B)
  const cosD = `\\cos\\left(${arg1}\\right) - \\cos\\left(${arg2}\\right)`
  const cosDtoP = `-2\\sin\\left(\\frac{${arg1}+${arg2}}{2}\\right)\\sin\\left(\\frac{${arg1}-${arg2}}{2}\\right)`;

  return {
    sinS,
    sinStoP,
    sinD,
    sinDtoP,
    cosS,
    cosStoP,
    cosD,
    cosDtoP
  };
};

const arg1list = ['2x', '3x', '4x', '5x', '6x', '7x', '8x', '9x'];
const arg2list = ['2x', '3x', '4x', '5x', '6x', '7x', '8x', '9x'];

//---------------------------------------------------------------------

setColumns(["sinS", "sinStoP", "sinD", "sinDtoP", "cosS", "cosStoP", "cosD", "cosDtoP"]);
seed(42);

const rows = 50;

for (let i = 0; i < rows; i++) {
    const arg1 = getRandom(arg1list, 1);
    const arg2 = getRandom(arg2list, 1);
    const identities = getSumToProductIdentities(arg1[0], arg2[0]);

    addRow([identities.sinS, identities.sinStoP, identities.sinD, identities.sinDtoP,
            identities.cosS, identities.cosStoP, identities.cosD, identities.cosDtoP]);
}
