// file with all the calculations that take in the number of gallons

// be able to use it any where
/** This function calculates the CO2 created by user inputted gallons. */
export function calculateCO2(gallons) {
  const mutltifactor = 10 ** -3;
  return (gallons * (8.887 * mutltifactor)).toFixed(2);
}

/** This function calculates the CO2 created by user inputted gallons. */
export function calculateGallonsUsed(miles, mpg) {
  return (miles / mpg).toFixed(2);
}

/** This function calculates the GHG emissions equivalency. */
export function calculateGHG(gallons) {
  const mutltifactor = 0.00043;
  return (4.63 * (gallons * mutltifactor)).toFixed(3);
}

/** This function converts liters into gallons. */
export function calculateGal(liters) {
  const convertFactor = 0.264172;
  return (liters * convertFactor);
}

// distance and mpg calculates number of gallons
// calculate the cost of the trip in another file, for each trip then all the trips
