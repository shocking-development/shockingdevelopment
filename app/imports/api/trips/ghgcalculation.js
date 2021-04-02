/** This function calculates the CO2 created by user inputted gallons. */
export function calculateCO2(gallons) {
  const mutltifactor = 10 ** -3;
  return (gallons * (8.887 * mutltifactor)).toFixed(3);
}

/** This function calculates the GHG emissions equivalency. */
export function calculateGHG(gallons) {
  const mutltifactor = 0.00043;
  return (4.63 * (gallons * mutltifactor)).toFixed(3);
}

/** This function calculates the gallons used based on mpg. */
export function calculateGalUsed(miles, mpg) {
  return (miles / mpg).toFixed(3);
}

/** This function calculates the fuel cost. */
export function fuelCost(gallons, gasolinePrice) {
  return (gallons * gasolinePrice).toFixed(3);
}

/** This function converts tons into gallons. */
export function calculatePounds(tons) {
  const convertFactor = 2000;
  return (tons * convertFactor).toFixed(4);
}

/** This function converts liters into gallons. */
export function calculateGal(liters) {
  const convertFactor = 0.264172;
  return (liters * convertFactor).toFixed(4);
}

/** This function convers tons into metric tons. */
export function convertTons(usTon) {
  const convertFactor = 0.907185;
  return (usTon * convertFactor).toFixed(2);
}

// distance and mpg calculates number of gallons
// calculate the cost of the trip in another file, for each trip then all the trips
