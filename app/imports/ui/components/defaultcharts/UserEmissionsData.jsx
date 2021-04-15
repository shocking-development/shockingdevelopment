import { Meteor } from 'meteor/meteor';
import { useTracker } from 'meteor/react-meteor-data';
import { _ } from 'meteor/underscore';
import { Emissions } from '../../../api/emissions/EmissionsCollection';
import {
  calculateCO2,
  calculateGalUsed,
  fuelCost,
  calculatePounds,
} from '../../../api/trips/ghgcalculation';

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

export function UserDateRecorded() {
  const user = useTracker(() => Meteor.userId());
  const emissions = useTracker(() => {
    Meteor.subscribe(Emissions.emissionsPublicationName);
    return Emissions.collection.find({ owner: user }, { sort: { createdAt: -1 } }).fetch();
  });
  const dateRecorded = emissions.map(recentEmissions => `${recentEmissions.date.getMonth() + 1}/${recentEmissions.date.getDate()}/${recentEmissions.date.getFullYear()}`);

  return dateRecorded;

}

export function UserDataMiles() {
  const user = useTracker(() => Meteor.userId());
  const emissions = useTracker(() => {
    Meteor.subscribe(Emissions.emissionsPublicationName);
    return Emissions.collection.find({ owner: user }, { sort: { createdAt: -1 } }).fetch();
  });
  const dataMiles = emissions.map(recentEmissions => recentEmissions.miles);

  return dataMiles;

}

export function UserEmissionData(index) {
  const user = useTracker(() => Meteor.userId());
  const emissions = useTracker(() => {
    Meteor.subscribe(Emissions.emissionsPublicationName);
    return Emissions.collection.find({ owner: user }, { sort: { createdAt: -1 } }).fetch();
  });

  /* Code from https://stackoverflow.com/questions/24444738/sum-similar-keys-in-an-array-of-objects
  * The purpose of the code is to sum up all the miles for a specific month
  * */
  const result = emissions.reduce(function (acc, val) {
    const o = acc.filter(function (obj) {
      // for debugging console.log(obj.date.getTime() === val.date.getTime());
      // https://stackoverflow.com/questions/7244513/javascript-date-comparisons-dont-equal
      return (obj.date.getMonth() === val.date.getMonth() && obj.transportation === val.transportation);
    }).pop() || { date: val.date, miles: 0, transportation: val.transportation };

    o.miles += val.miles;
    acc.push(o);
    return acc;
  }, []);

  /* Code from https://stackoverflow.com/questions/24444738/sum-similar-keys-in-an-array-of-objects
  * The purpose of this code is to sum up all the miles for each day of the week
  * */
  const resultdays = emissions.reduce(function (acc, val) {
    const o = acc.filter(function (obj) {
      // for debugging console.log(obj.date.getTime() === val.date.getTime());
      // https://stackoverflow.com/questions/7244513/javascript-date-comparisons-dont-equal
      return obj.date.getDay() === val.date.getDay();
    }).pop() || { date: val.date, miles: 0 };

    o.miles += val.miles;
    acc.push(o);
    return acc;
  }, []);

  /* *
  * Removes the duplicates of the resultdays
  * */
  // eslint-disable-next-line no-unused-vars
  const finalresultdays = resultdays.filter(function (itm, index1, a) {
    return index1 === a.indexOf(itm);
  }).reverse();

  // for debugging console.log(finalresultdays);

  /* *
  * Removes the duplicates of the resultMonths
  * */
  const finalresultMonths = _.sortBy((result.filter(function (itm, index1, a) {
    return index1 === a.indexOf(itm);
  })), 'date');

  let totalEmissionsofAllTransport;
  const totalMiles = [];
  const Co2Produced = [];
  const moneyspent = [];
  let gallonsOfGasSaved = 0;
  let emissionReduced = 0;
  let totalSavings = 0;
  let carmpg = emissions.map(car => car.mpg);

  if (carmpg.some(function (i) { return i === null; })) {
    carmpg = 24.9;
  } else {
    carmpg = _.uniq(emissions.map(car => car.mpg), 'mpg');
  }
  // const chosenMPG = _.uniq(carmpg, 'mpg');
  const stateGasPrice = 3.14;

  for (let i = 0, iLen = finalresultMonths.length; i < iLen; i++) {

    if (finalresultMonths[i].transportation === 'Telework') {
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

  /* Code from https://stackoverflow.com/questions/24444738/sum-similar-keys-in-an-array-of-objects
  * The purpose of this code is to sum up all the miles for each day of the week
  * */
  const resultMonthsEmissions = Co2Produced.reduce(function (acc, val) {
    const o = acc.filter(function (obj) {
      // for debugging console.log(obj.date.getTime() === val.date.getTime());
      // https://stackoverflow.com/questions/7244513/javascript-date-comparisons-dont-equal
      return obj.date.getMonth() === val.date.getMonth();
    }).pop() || { date: val.date, emissions: 0 };

    o.emissions += val.emissions;
    acc.push(o);
    return acc;
  }, []);

  /* *
  * Removes the duplicates of the resultdays
  * */
  const finalresultMonthsEmissions = _.sortBy((resultMonthsEmissions.filter(function (itm, index1, a) {
    return index1 === a.indexOf(itm);
  })), 'date');

  const resultMilesTraveled = totalMiles.reduce(function (acc, val) {
    const o = acc.filter(function (obj) {
      // for debugging console.log(obj.date.getTime() === val.date.getTime());
      // https://stackoverflow.com/questions/7244513/javascript-date-comparisons-dont-equal
      return obj.date.getMonth() === val.date.getMonth();
    }).pop() || { date: val.date, miles: 0 };

    o.miles += val.miles;
    acc.push(o);
    return acc;
  }, []);

  /* *
  * Removes the duplicates of the resultdays
  * */
  const finalresultMilesTraveled = _.sortBy((resultMilesTraveled.filter(function (itm, index1, a) {
    return index1 === a.indexOf(itm);
  })), 'date');

  const resultMoneySpent = moneyspent.reduce(function (acc, val) {
    const o = acc.filter(function (obj) {
      // for debugging console.log(obj.date.getTime() === val.date.getTime());
      // https://stackoverflow.com/questions/7244513/javascript-date-comparisons-dont-equal
      return obj.date.getMonth() === val.date.getMonth();
    }).pop() || { date: val.date, spent: 0 };

    o.spent += val.spent;
    acc.push(o);
    return acc;
  }, []);

  /* *
  * Removes the duplicates of the resultdays
  * */
  const finalresultMoneySpent = _.sortBy((resultMoneySpent.filter(function (itm, index1, a) {
    return index1 === a.indexOf(itm);
  })), 'date');

  /* *
  * Formats the days to months e.g. outputting January for month 1
  * */
  const formatter = new Intl.DateTimeFormat('en', { month: 'short' });

  /* *
  * maps the months to an array
  * */
  const dateRecorded = finalresultMonthsEmissions.map(recentEmissions => formatter.format(recentEmissions.date));
  /// console.log(dateRecorded);

  /* *
  * maps the months to an array
  * */
  const CO2EmisionsbyMonths = finalresultMonthsEmissions.map(recentEmissions => recentEmissions.emissions);
  // console.log(dateRecorded);

  /* *
  * maps the miles to an array
  * */
  const dataMiles = finalresultMilesTraveled.map(recentEmissions => recentEmissions.miles);
  // console.log(dataMiles);

  /* *
  * maps the miles to an array
  * */
  const moneyLost = finalresultMoneySpent.map(recentEmissions => recentEmissions.spent);
  // console.log(dataMiles);

  /* *
  * maps the transportation to an array
  * */
  const persontransportation = emissions.map(recentEmissions => recentEmissions.transportation);

  const curr = new Date();
  const week = [];

  for (let i = 1; i <= 7; i++) {
    const first = curr.getDate() - curr.getDay() + i;
    const day = new Date(curr.setDate(first)).toISOString().slice(0, 10);
    week.push(day);
  }

  const firstDayofWeek = new Date(week[0]);
  const lastDayofWeek = new Date(week[week.length - 1]);
  const selectedWeek = emissions.filter(d => {
    const time = new Date(d.date).getTime();
    return time >= firstDayofWeek && time <= lastDayofWeek;
  });

  /* *
  * saves the ghg produced by day into an array
  * */
  const ghgEmissionsbyDays = selectedWeek.map(item => {
    const container = { day: '', ghgProduced: '' };

    container.day = item.date.getDay();
    container.ghgProduced = Number(calculatePounds(calculateCO2(calculateGalUsed(item.miles, carmpg))));

    return container;
  });

  const currentDate = new Date();

  const currentDay = emissions.filter(item => item.date.toDateString() === currentDate.toDateString());

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
