/**
 *  * Generates a random integer between min and max (inclusive).
  * @param {number} min - The minimum value.
   * @param {number} max - The maximum value.
    * @returns {number} A random integer.
     */
     function getRandomInt(min, max) {
       return Math.floor(Math.random() * (max - min + 1)) + min;
       }

       /**
        * Converts degrees to radians.
         * @param {number} degrees - The angle in degrees.
          * @returns {number} The angle in radians.
           */
           function degToRad(degrees) {
             return degrees * (Math.PI / 180);
             }

             /**
              * Converts radians to degrees.
               * @param {number} radians - The angle in radians.
                * @returns {number} The angle in degrees.
                 */
                 function radToDeg(radians) {
                   return radians * (180 / Math.PI);
                   }

  // Assumes helper functions from above are included.

setColumns(["angleC", "sideA", "sideC", "angleA1", "angleB1", "sideB1", "angleA2", "angleB2", "sideB2"]);

const rows = 25; // Generate 25 pairs, resulting in 50 rows

for (let i = 0; i < rows; i++) {
  // 1. Generate the given information
  const angleC_deg = getRandomInt(20, 70);
  const sideA = getRandomInt(12, 20);
  const angleC_rad = degToRad(angleC_deg);
  
  // 2. Calculate height and generate side c BETWEEN height and sideA
  const height = sideA * Math.sin(angleC_rad);
  const cRange = sideA - height;
  const sideCcalc = height + (cRange * (getRandomInt(10, 90) / 100)); // Ensure c is not too close to h or a
  const sideC = Math.round(sideCcalc * 100) / 100; // Round to 2 decimal places

  // 3. Calculate angles A and B using the Law of Sines

  // --- Solution 1: Angle A is acute ---
  const angleA1_rad = Math.asin((sideA * Math.sin(angleC_rad)) / sideC);
  const angleA1_deg = radToDeg(angleA1_rad);
  const angleB1_deg = 180 - angleC_deg - angleA1_deg;
  const angleB1_rad = degToRad(angleB1_deg);
  const sideB1 = (sideC * Math.sin(angleB1_rad)) / Math.sin(angleC_rad);

  // --- Solution 2: Angle A is obtuse ---
  const angleA2_deg = 180 - angleA1_deg;
  const angleB2_deg = 180 - angleC_deg - angleA2_deg;
  const angleB2_rad = degToRad(angleB2_deg);
  const sideB2 = (sideC * Math.sin(angleB2_rad)) / Math.sin(angleC_rad);

  addRow([
    angleC_deg, sideA, sideC,
        angleA1_deg.toFixed(2), angleB1_deg.toFixed(2), sideB1.toFixed(2),
    angleA2_deg.toFixed(2), angleB2_deg.toFixed(2), sideB2.toFixed(2)
  ]);
}
