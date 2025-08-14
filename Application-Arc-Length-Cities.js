/**
 * This script generates a CSV of application problems for finding the arc
 * length between two locations on Earth, given their latitudes. It specifically
 * pairs cities that are approximately aligned north-south (similar longitudes).
 */

// --- Data for World Cities with Latitude and Longitude ---
const locations = [
    { name: "New York City, USA", lat: 40.7128, lon: -74.0060 },
    { name: "London, UK", lat: 51.5072, lon: -0.1276 },
    { name: "Tokyo, Japan", lat: 35.6762, lon: 139.6503 },
    { name: "Sydney, Australia", lat: -33.8688, lon: 151.2093 },
    { name: "Cairo, Egypt", lat: 30.0444, lon: 31.2357 },
    { name: "Rio de Janeiro, Brazil", lat: -22.9068, lon: -43.1729 },
    { name: "Moscow, Russia", lat: 55.7558, lon: 37.6173 },
    { name: "Cape Town, South Africa", lat: -33.9249, lon: 18.4241 },
    { name: "Buenos Aires, Argentina", lat: -34.6037, lon: -58.3816 },
    { name: "Toronto, Canada", lat: 43.6532, lon: -79.3832 }
];

// --- Helper Functions ---

/**
 * Generates a random integer between min and max (inclusive).
 */
function getRandomInt(min, max) {
  return Math.floor(Math.random() * (max - min + 1)) + min;
}

/**
 * Formats a latitude value into a string with N/S designation.
 */
function formatLatitude(lat) {
    const direction = lat >= 0 ? 'N' : 'S';
    return `${Math.abs(lat).toFixed(4)}\\degree ${direction}`;
}

// --- Main Script ---

setColumns([
    "place1",
    "place2",
    "p1Lat",
    "p2Lat",
    "distance"
]);

const earthRadiusKm = 6400;
const longitudeThreshold = 15; // Max difference in longitude to be considered a pair
const validPairs = [];

// 1. Find all city pairs that are approximately aligned north-south.
for (let i = 0; i < locations.length; i++) {
    for (let j = i + 1; j < locations.length; j++) {
        const lon1 = locations[i].lon;
        const lon2 = locations[j].lon;
        if (Math.abs(lon1 - lon2) <= longitudeThreshold) {
            validPairs.push([locations[i], locations[j]]);
        }
    }
}

const problemsToGenerate = validPairs.length; // Generate one problem for each valid pair

for (let i = 0; i < problemsToGenerate; i++) {
  // 2. Select a valid pair.
  const pair = validPairs[i];
  const place1 = pair[0];
  const place2 = pair[1];

  // 3. Calculate the central angle in degrees.
  const centralAngleDegrees = Math.abs(place1.lat - place2.lat);

  // 4. Convert the central angle to radians.
  const centralAngleRadians = centralAngleDegrees * (Math.PI / 180);

  // 5. Calculate the arc length (distance).
  const distance = earthRadiusKm * centralAngleRadians;

  // 6. Add the problem data and formatted answer to the CSV.
  addRow([
    place1.name,
    place2.name,
    formatLatitude(place1.lat),
    formatLatitude(place2.lat),
    distance.toFixed(3)
  ]);
}
