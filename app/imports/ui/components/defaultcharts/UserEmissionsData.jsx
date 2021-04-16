import { Meteor } from 'meteor/meteor';
import { useTracker } from 'meteor/react-meteor-data';
import { _ } from 'meteor/underscore';
import { Emissions } from '../../../api/emissions/EmissionsCollection';
import {
  calculateCO2,
  calculateGalUsed,
  fuelCost,
  calculatePounds,
} from '../../../api/ghgEquations/ghgcalculation';
import {
  duplicateFilter, sumAllEmissionsByMonth,
  sumAllMilesForMonthBasedOnTransportation, totalMilesbyMonth, totalMoneySpentByMonth,
} from '../../../api/emissionsEquations/EmissionsCalculations';

// A export function to give data to other pages.
export function User() {
  const user = useTracker(() => Meteor.userId());
  return user;
}

export function UserEmissionsData() {
  const user = useTracker(() => Meteor.userId());
  const emissions = useTracker(() => {
    Meteor.subscribe(Emissions.emissionsPublicationName);
    return Emissions.collection.find({ owner: user }, { sort: { createdAt: -1 } }).fetch();
  });

  return emissions;

}

export function UserEmissionData(index) {
  const user = useTracker(() => Meteor.userId());
  const emissions = useTracker(() => {
    Meteor.subscribe(Emissions.emissionsPublicationName);
    return Emissions.collection.find({ owner: user }, { sort: { createdAt: -1 } }).fetch();
  });

  const finalresultMonths = _.sortBy((duplicateFilter(sumAllMilesForMonthBasedOnTransportation(emissions))), 'date');

  let totalEmissionsofAllTransport;
  const totalMiles = [];
  const Co2Produced = [];
  const moneyspent = [];
  let gallonsOfGasSaved = 0;
  let emissionReduced = 0;
  let totalSavings = 0;

  let carmpg1 = emissions.map(car => car.mpg);

  if (carmpg1.some(function (i) { return i === null; })) {
    carmpg1 = 24.9;
  } else if (emissions.length >= 1) {
    carmpg1 = emissions[0].mpg;
  }

  // const chosenMPG = _.uniq(carmpg, 'mpg');
  const stateGasPrice = 3.14;

  for (let i = 0, iLen = finalresultMonths.length; i < iLen; i++) {

    if (finalresultMonths[i].transportation === 'Telework') {
      let carmpg = emissions.map(car => car.mpg);

      if (carmpg.some(function (index1) { return index1 === null; })) {
        carmpg = 24.9;
      } else if (emissions.length > 1) {
        carmpg = emissions[0].mpg;
      }
      const telework = Number(calculateGalUsed(finalresultMonths[i].miles, carmpg));
      const teleworkEmissions = Number(calculatePounds(calculateCO2(calculateGalUsed(finalresultMonths[i].miles, carmpg))));
      const teleworkCost = Number(fuelCost(calculateGalUsed(finalresultMonths[i].miles, carmpg), stateGasPrice));
      Co2Produced.push({
        emissions: 0,
        date: finalresultMonths[i].date,
      });
      totalMiles.push({
        miles: finalresultMonths[i].miles,
        date: finalresultMonths[i].date,
      });
      gallonsOfGasSaved += telework;
      emissionReduced += teleworkEmissions;
      totalSavings += teleworkCost;
    } else
      if (finalresultMonths[i].transportation === 'Drove') {
        let carmpg = emissions.map(car => car.mpg);

        if (carmpg.some(function (index2) { return index2 === null; })) {
          carmpg = 24.9;
        } else if (emissions.length > 1) {
          carmpg = emissions[0].mpg;
        }
        const drove = Number(calculateGalUsed(finalresultMonths[i].miles, carmpg));
        const droveEmissions = Number(calculatePounds(calculateCO2(calculateGalUsed(finalresultMonths[i].miles, carmpg))));
        const droveCost = Number(fuelCost(calculateGalUsed(finalresultMonths[i].miles, carmpg), stateGasPrice));

        Co2Produced.push({
          emissions: (Number(calculatePounds(calculateCO2(calculateGalUsed(finalresultMonths[i].miles, carmpg))))),
          date: finalresultMonths[i].date,
        });
        if (Co2Produced.length !== 0) {
          // eslint-disable-next-line no-shadow
          totalEmissionsofAllTransport = Object.values(Co2Produced).reduce((t, { emissions }) => t + emissions, 0);
        }
        totalMiles.push({
          miles: finalresultMonths[i].miles,
          date: finalresultMonths[i].date,
        });

        moneyspent.push({
          spent: Number(fuelCost(calculateGalUsed(finalresultMonths[i].miles, carmpg), stateGasPrice)),
          date: finalresultMonths[i].date,
        });

        gallonsOfGasSaved -= drove;
        emissionReduced -= droveEmissions;
        totalSavings -= droveCost;

      } else
        if (finalresultMonths[i].transportation === 'Public Transportation') {
          let carmpg = emissions.map(car => car.mpg);

          if (carmpg.some(function (index3) { return index3 === null; })) {
            carmpg = 24.9;
          } else if (emissions.length > 1) {
            carmpg = emissions[0].mpg;
          }

          const publicTransportation = Number(calculateGalUsed(finalresultMonths[i].miles, carmpg));
          const publicTransportationEmissions = (Number(calculatePounds(calculateCO2(calculateGalUsed(finalresultMonths[i].miles, carmpg)))) -
              Number(calculatePounds(calculateCO2(calculateGalUsed(finalresultMonths[i].miles, 140)))));
          const publicTransportationCost = Number(fuelCost(calculateGalUsed(finalresultMonths[i].miles, carmpg), stateGasPrice)) - 2.60;

          Co2Produced.push({
            emissions: (Number(calculatePounds(calculateCO2(calculateGalUsed(finalresultMonths[i].miles, 140))))),
            date: finalresultMonths[i].date,
          });
          if (Co2Produced.length !== 0) {
            // eslint-disable-next-line no-shadow
            totalEmissionsofAllTransport = Object.values(Co2Produced).reduce((t, { emissions }) => t + emissions, 0);
          }
          totalMiles.push({
            miles: finalresultMonths[i].miles,
            date: finalresultMonths[i].date,
          });
          moneyspent.push({
            spent: 2.60,
            date: finalresultMonths[i].date,
          });
          gallonsOfGasSaved += publicTransportation;
          emissionReduced += publicTransportationEmissions;
          totalSavings += publicTransportationCost;

        } else
          if (finalresultMonths[i].transportation === 'Biking') {
            let carmpg = emissions.map(car => car.mpg);

            if (carmpg.some(function (index4) { return index4 === null; })) {
              carmpg = 24.9;
            } else if (emissions.length > 1) {
              carmpg = emissions[0].mpg;
            }

            const Biking = Number(calculateGalUsed(finalresultMonths[i].miles, carmpg));
            const BikingEmissions = Number(calculatePounds(calculateCO2(calculateGalUsed(finalresultMonths[i].miles, carmpg))));
            const BikingCost = Number(fuelCost(calculateGalUsed(finalresultMonths[i].miles, carmpg), stateGasPrice));

            Co2Produced.push({
              emissions: 0,
              date: finalresultMonths[i].date,
            });
            if (Co2Produced.length !== 0) {
              // eslint-disable-next-line no-shadow
              totalEmissionsofAllTransport = Object.values(Co2Produced).reduce((t, { emissions }) => t + emissions, 0);
            }
            totalMiles.push({
              miles: finalresultMonths[i].miles,
              date: finalresultMonths[i].date,
            });
            moneyspent.push({
              spent: 0,
              date: finalresultMonths[i].date,
            });
            gallonsOfGasSaved += Biking;
            emissionReduced += BikingEmissions;
            totalSavings += BikingCost;

          } else
            if (finalresultMonths[i].transportation === 'Walk') {
              let carmpg = emissions.map(car => car.mpg);

              if (carmpg.some(function (index5) { return index5 === null; })) {
                carmpg = 24.9;
              } else if (emissions.length > 1) {
                carmpg = emissions[0].mpg;
              }

              const walk = Number(calculateGalUsed(finalresultMonths[i].miles, carmpg));
              const walkEmissions = Number(calculatePounds(calculateCO2(calculateGalUsed(finalresultMonths[i].miles, carmpg))));
              const walkCost = Number(fuelCost(calculateGalUsed(finalresultMonths[i].miles, carmpg), stateGasPrice));

              Co2Produced.push({
                emissions: 0,
                date: finalresultMonths[i].date,
              });
              if (Co2Produced.length !== 0) {
                // eslint-disable-next-line no-shadow
                totalEmissionsofAllTransport = Object.values(Co2Produced).reduce((t, { emissions }) => t + emissions, 0);
              }
              totalMiles.push({
                miles: finalresultMonths[i].miles,
                date: finalresultMonths[i].date,
              });
              moneyspent.push({
                spent: 0,
                date: finalresultMonths[i].date,
              });
              gallonsOfGasSaved += walk;
              emissionReduced += walkEmissions;
              totalSavings += walkCost;

            } else
              if (finalresultMonths[i].transportation === 'Electric Vehicle') {
                let carmpg = emissions.map(car => car.mpg);

                if (carmpg.some(function (index6) { return index6 === null; })) {
                  carmpg = 24.9;
                } else if (emissions.length > 1) {
                  carmpg = emissions[0].mpg;
                }

                const Ev = Number(calculateGalUsed(finalresultMonths[i].miles, carmpg));
                const EvEmissions = Number(calculatePounds(calculateCO2(calculateGalUsed(finalresultMonths[i].miles, carmpg))));
                const EvCost = Number(fuelCost(calculateGalUsed(finalresultMonths[i].miles, carmpg), stateGasPrice));

                Co2Produced.push({
                  emissions: (Number(calculatePounds(calculateCO2(calculateGalUsed(finalresultMonths[i].miles, carmpg))))),
                  date: finalresultMonths[i].date,
                });
                if (Co2Produced.length !== 0) {
                  // eslint-disable-next-line no-shadow
                  totalEmissionsofAllTransport = Object.values(Co2Produced).reduce((t, { emissions }) => t + emissions, 0);
                }
                totalMiles.push({
                  miles: finalresultMonths[i].miles,
                  date: finalresultMonths[i].date,
                });
                moneyspent.push({
                  spent: Number(fuelCost(calculateGalUsed(finalresultMonths[i].miles, carmpg), stateGasPrice)),
                  date: finalresultMonths[i].date,
                });
                gallonsOfGasSaved += Ev;
                emissionReduced += EvEmissions;
                totalSavings += EvCost;

              }
  }

  const finalresultMonthsEmissions = _.sortBy((duplicateFilter(sumAllEmissionsByMonth(Co2Produced))), 'date');

  const finalresultMilesTraveled = _.sortBy((duplicateFilter(totalMilesbyMonth(totalMiles))), 'date');

  const finalresultMoneySpent = _.sortBy((duplicateFilter(totalMoneySpentByMonth(moneyspent))), 'date');

  const formatter = new Intl.DateTimeFormat('en', { month: 'short' });

  const dateRecorded = finalresultMonthsEmissions.map(recentEmissions => formatter.format(recentEmissions.date));

  const CO2EmisionsbyMonths = finalresultMonthsEmissions.map(recentEmissions => recentEmissions.emissions);

  const dataMiles = finalresultMilesTraveled.map(recentEmissions => recentEmissions.miles);

  const moneyLost = finalresultMoneySpent.map(recentEmissions => recentEmissions.spent);

  const persontransportation = emissions.map(recentEmissions => recentEmissions.transportation);

  const curr = new Date();
  const week = [];

  for (let i = 1; i <= 7; i++) {
    const first = curr.getDate() - curr.getDay() + i;
    const day = new Date(curr.setDate(first)).toISOString().slice(0, 10);
    week.push(day);
  }

  const firstDayofWeek = week[0];
  const lastDayofWeek = week[week.length - 1];
  const selectedWeek = emissions.filter(d => {
    const time = new Date(d.date).toISOString().slice(0, 10);
    return time >= firstDayofWeek && time <= lastDayofWeek;
  });

  /* *
  * saves the ghg produced by day into an array
  * */
  const ghgEmissionsbyDays = selectedWeek.map(item => {
    const container = { day: '', ghgProduced: '' };
    container.day = item.date.getUTCDay();
    container.ghgProduced = Number(calculatePounds(calculateCO2(calculateGalUsed(item.miles, carmpg1))));

    return container;
  });

  /* Gets the current date and puts it in the correct format for the date input */
  const currentDate = new Date();
  let cMonth = currentDate.getMonth() + 1;
  if (cMonth.toString().length === 1) {
    cMonth = `0${cMonth}`;
  }
  let cDay = currentDate.getDate();
  if (cDay.toString().length === 1) {
    cDay = `0${cDay}`;
  }
  const fullDate = `${currentDate.getFullYear().toString()}-${cMonth.toString()}-${cDay.toString()}`;
  const currentDay = emissions.filter(d => {
    const time = new Date(d.date).toISOString().slice(0, 10);
    return time === fullDate;
  });

  if (index === 'Transportation') {
    return persontransportation;
  }

  if (index === 'CO2EmissionsProduced') {
    return CO2EmisionsbyMonths;
  }

  if (index === 'MoneySpent') {
    return moneyLost;
  }

  if (index === 'DateRecorded') {
    return dateRecorded;
  }

  if (index === 'DataMiles') {
    return dataMiles;
  }

  if (index === 'totalEmissions') {
    if (typeof totalEmissionsofAllTransport !== 'undefined') {
      return totalEmissionsofAllTransport.toFixed(2);
    }
    return totalEmissionsofAllTransport;
  }

  if (index === 'emisionsForweek') {
    return ghgEmissionsbyDays;
  }
  if (index === 'totalGasSaved') {
    if (typeof gallonsOfGasSaved !== 'undefined') {
      return gallonsOfGasSaved.toFixed(2);
    }
    return gallonsOfGasSaved.toFixed(2);
  }

  if (index === 'totalEmissionsReduced') {
    if (typeof emissionReduced !== 'undefined') {
      return emissionReduced.toFixed(2);
    }
    return emissionReduced.toFixed(2);
  }

  if (index === 'totalSavings') {
    if (typeof totalSavings !== 'undefined') {
      return totalSavings.toFixed(2);
    }
    return totalSavings.toFixed(2);
  }

  if (index === 'User') {
    return user;
  }

  if (index === 'Emissions') {
    return emissions;
  }

  if (index === 'Transportation') {
    return emissions.map(recentEmissions => recentEmissions.transportation);
  }

  if (index === 'CurrentDayTransportation') {
    return currentDay;
  }

  return user;
}

export default UserEmissionsData;
