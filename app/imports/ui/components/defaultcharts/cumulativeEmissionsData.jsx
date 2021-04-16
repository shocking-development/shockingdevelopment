import { Meteor } from 'meteor/meteor';
import { useTracker } from 'meteor/react-meteor-data';
import { _ } from 'meteor/underscore';
import { calculateCO2, calculateGalUsed, calculatePounds, fuelCost } from '../../../api/ghgEquations/ghgcalculation';
import {
  sumAllMilesForMonthBasedOnTransportation,
  duplicateFilter,
  sumAllEmissionsByMonth,
  totalMilesbyMonth,
  totalMoneySpentByMonth,
  totalSavingsByMonth,
  totalEmissionsReducedByMonth,
  totalfuelGallonSavedByMonth,
} from '../../../api/emissionsEquations/EmissionsCalculations';
import { Emissions } from '../../../api/emissions/EmissionsCollection';
import { UserInfos } from '../../../api/userInfo/UserInfoCollection';

export function cumulativeEmissionsData(index) {

  const emissions = useTracker(() => {
    Meteor.subscribe(Emissions.cumulativeEmissionsPublicationName);
    return Emissions.collection.find({}).fetch();
  });

  const numberofUsers = useTracker(() => {
    UserInfos.subscribeUserInfoLanding();
    return UserInfos.find({}).fetch();
  });

  const countOfUser = numberofUsers.length;

  const finalresultMonths = _.sortBy((duplicateFilter(sumAllMilesForMonthBasedOnTransportation(emissions))), 'date');

  let totalEmissionsofAllTransport;
  const totalMiles = [];
  const Co2Produced = [];
  const moneyspent = [];
  const emissionsReducedArray = [];
  const fuelGallonSavedArray = [];
  let gallonsOfGasSaved = 0;
  let emissionReduced = 0;
  let totalSavings = 0;
  const totalSavingsArray = [];
  const carmpg = emissions.map(car => car.mpg);
  const carmpgLength = carmpg.length;
  let carmpgAVERAGE;
  const average = (array) => array.reduce((a, b) => a + b) / array.length;
  if (carmpgLength !== 0) {
    carmpgAVERAGE = average(carmpg);
  }
  const stateGasPrice = 3.14;

  for (let i = 0, iLen = finalresultMonths.length; i < iLen; i++) {

    if (finalresultMonths[i].transportation === 'Telework') {
      const telework = Number(calculateGalUsed(finalresultMonths[i].miles, carmpgAVERAGE));
      const teleworkEmissions = Number(calculatePounds(calculateCO2(calculateGalUsed(finalresultMonths[i].miles, carmpgAVERAGE))));
      const teleworkCost = Number(fuelCost(calculateGalUsed(finalresultMonths[i].miles, carmpgAVERAGE), stateGasPrice));
      let teleworkEmissionReduced = 0;
      let moneySavedtelework = 0;
      let gallonsTeleworkSaved = 0;

      Co2Produced.push({
        emissions: 0,
        date: finalresultMonths[i].date,
      });
      totalMiles.push({
        miles: finalresultMonths[i].miles,
        date: finalresultMonths[i].date,
      });
      moneyspent.push({
        spent: 0,
        date: finalresultMonths[i].date,
      });
      totalSavingsArray.push({
        savings: moneySavedtelework += teleworkCost,
        date: finalresultMonths[i].date,
      });
      emissionsReducedArray.push({
        emissionsReduced: teleworkEmissionReduced += teleworkEmissions,
        date: finalresultMonths[i].date,
      });
      fuelGallonSavedArray.push({
        // eslint-disable-next-line no-unused-vars
        gallonsSaved: gallonsTeleworkSaved = +telework,
        date: finalresultMonths[i].date,
      });
      gallonsOfGasSaved += telework;
      emissionReduced += teleworkEmissions;
      totalSavings += teleworkCost;
    } else
      if (finalresultMonths[i].transportation === 'Drove') {
        const drove = Number(calculateGalUsed(finalresultMonths[i].miles, carmpgAVERAGE));
        const droveEmissions = Number(calculatePounds(calculateCO2(calculateGalUsed(finalresultMonths[i].miles, carmpgAVERAGE))));
        const droveCost = Number(fuelCost(calculateGalUsed(finalresultMonths[i].miles, carmpgAVERAGE), stateGasPrice));
        let droveEmissionsReduced = 0;
        let moneySavedDrove = 0;
        let gallonsDroveSaved = 0;

        Co2Produced.push({
          emissions: (Number(calculatePounds(calculateCO2(calculateGalUsed(finalresultMonths[i].miles, carmpgAVERAGE))))),
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
        totalSavingsArray.push({
          savings: moneySavedDrove -= droveCost,
          date: finalresultMonths[i].date,
        });
        moneyspent.push({
          spent: Number(fuelCost(calculateGalUsed(finalresultMonths[i].miles, carmpgAVERAGE), stateGasPrice)),
          date: finalresultMonths[i].date,
        });
        emissionsReducedArray.push({
          emissionsReduced: droveEmissionsReduced -= droveEmissions,
          date: finalresultMonths[i].date,
        });
        fuelGallonSavedArray.push({
          gallonsSaved: gallonsDroveSaved -= drove,
          date: finalresultMonths[i].date,
        });

        gallonsOfGasSaved -= drove;
        emissionReduced -= droveEmissions;
        totalSavings -= droveCost;

      } else
        if (finalresultMonths[i].transportation === 'Public Transportation') {
          const publicTransportation = Number(calculateGalUsed(finalresultMonths[i].miles, carmpgAVERAGE));
          const publicTransportationEmissions = (Number(calculatePounds(calculateCO2(calculateGalUsed(finalresultMonths[i].miles,
              carmpgAVERAGE)))) - Number(calculatePounds(calculateCO2(calculateGalUsed(finalresultMonths[i].miles, 140)))));
          const publicTransportationCost = Number(fuelCost(calculateGalUsed(finalresultMonths[i].miles, carmpgAVERAGE),
              stateGasPrice)) - 2.60;
          let publicTransportationEmissionReduced = 0;
          let PTsaved = 0;
          let PTGallonsSaved = 0;

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

          totalSavingsArray.push({
            savings: PTsaved += publicTransportationCost,
            date: finalresultMonths[i].date,
          });
          moneyspent.push({
            spent: 2.60,
            date: finalresultMonths[i].date,
          });
          emissionsReducedArray.push({
            emissionsReduced: publicTransportationEmissionReduced += publicTransportationEmissions,
            date: finalresultMonths[i].date,
          });
          fuelGallonSavedArray.push({
            // eslint-disable-next-line no-unused-vars
            gallonsSaved: PTGallonsSaved = +publicTransportation,
            date: finalresultMonths[i].date,
          });

          gallonsOfGasSaved += publicTransportation;
          emissionReduced += publicTransportationEmissions;
          totalSavings += publicTransportationCost;

        } else
          if (finalresultMonths[i].transportation === 'Biking') {
            const Biking = Number(calculateGalUsed(finalresultMonths[i].miles, carmpgAVERAGE));
            const BikingEmissions = Number(calculatePounds(calculateCO2(calculateGalUsed(finalresultMonths[i].miles, carmpgAVERAGE))));
            const BikingCost = Number(fuelCost(calculateGalUsed(finalresultMonths[i].miles, carmpgAVERAGE), stateGasPrice));
            let BikingEmissionsReduced = 0;
            let BikingSaved = 0;
            let BikingGallonsSaved = 0;

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
            totalSavingsArray.push({
              savings: BikingSaved += BikingCost,
              date: finalresultMonths[i].date,
            });
            moneyspent.push({
              spent: 0,
              date: finalresultMonths[i].date,
            });
            emissionsReducedArray.push({
              emissionsReduced: BikingEmissionsReduced += BikingEmissions,
              date: finalresultMonths[i].date,
            });
            fuelGallonSavedArray.push({
              // eslint-disable-next-line no-unused-vars
              gallonsSaved: BikingGallonsSaved = +Biking,
              date: finalresultMonths[i].date,
            });
            gallonsOfGasSaved += Biking;
            emissionReduced += BikingEmissions;
            totalSavings += BikingCost;

          } else
            if (finalresultMonths[i].transportation === 'Walk') {
              const walk = Number(calculateGalUsed(finalresultMonths[i].miles, carmpgAVERAGE));
              const walkEmissions = Number(calculatePounds(calculateCO2(calculateGalUsed(finalresultMonths[i].miles, carmpgAVERAGE))));
              const walkCost = Number(fuelCost(calculateGalUsed(finalresultMonths[i].miles, carmpgAVERAGE), stateGasPrice));
              let WalkingEmissionsReduced = 0;
              let WalkingSaved = 0;
              let walkingGallonsSaved = 0;

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
              totalSavingsArray.push({
                savings: WalkingSaved += walkCost,
                date: finalresultMonths[i].date,
              });
              moneyspent.push({
                spent: 0,
                date: finalresultMonths[i].date,
              });
              emissionsReducedArray.push({
                emissionsReduced: WalkingEmissionsReduced += walkEmissions,
                date: finalresultMonths[i].date,
              });
              fuelGallonSavedArray.push({
                // eslint-disable-next-line no-unused-vars
                gallonsSaved: walkingGallonsSaved = +walk,
                date: finalresultMonths[i].date,
              });
              gallonsOfGasSaved += walk;
              emissionReduced += walkEmissions;
              totalSavings += walkCost;

            } else
              if (finalresultMonths[i].transportation === 'Electric Vehicle') {
                const Ev = Number(calculateGalUsed(finalresultMonths[i].miles, carmpgAVERAGE));
                const EvEmissions = Number(calculatePounds(calculateCO2(calculateGalUsed(finalresultMonths[i].miles, carmpgAVERAGE))));
                const EvCost = Number(fuelCost(calculateGalUsed(finalresultMonths[i].miles, carmpgAVERAGE), stateGasPrice));
                let EVemissionsReduced = 0;
                let EVSavings = 0;
                let EVGallonsSaved = 0;

                Co2Produced.push({
                  emissions: (Number(calculatePounds(calculateCO2(calculateGalUsed(finalresultMonths[i].miles, carmpgAVERAGE))))),
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
                totalSavingsArray.push({
                  savings: EVSavings += EvCost,
                  date: finalresultMonths[i].date,
                });
                moneyspent.push({
                  spent: 0,
                  date: finalresultMonths[i].date,
                });
                emissionsReducedArray.push({
                  emissionsReduced: EVemissionsReduced += EvEmissions,
                  date: finalresultMonths[i].date,
                });
                fuelGallonSavedArray.push({
                  // eslint-disable-next-line no-unused-vars
                  gallonsSaved: EVGallonsSaved = +Ev,
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

  const finalresultSavings = _.sortBy((duplicateFilter(totalSavingsByMonth(totalSavingsArray))), 'date');

  const finalresultEmissions = _.sortBy((duplicateFilter(totalEmissionsReducedByMonth(emissionsReducedArray))), 'date');

  const finalresultGallonsSaved = _.sortBy((duplicateFilter(totalfuelGallonSavedByMonth(fuelGallonSavedArray))), 'date');

  const gallonsofgasbymonth = finalresultGallonsSaved.map(recentEmissions => Number((recentEmissions.gallonsSaved).toFixed(2)));
  const emissionsbyMonth = finalresultEmissions.map(recentEmissions => Number((recentEmissions.emissionsReduced).toFixed(2)));
  const savingsperMonthArray = finalresultSavings.map(recentEmissions => Number((recentEmissions.savings).toFixed(2)));

  const formatter = new Intl.DateTimeFormat('en', { month: 'short' });
  const dateRecorded = finalresultMonthsEmissions.map(recentEmissions => formatter.format(recentEmissions.date));

  // maps the months to an array
  const CO2EmisionsbyMonths = finalresultMonthsEmissions.map(recentEmissions => recentEmissions.emissions);

  // maps the miles to an array
  const dataMiles = finalresultMilesTraveled.map(recentEmissions => recentEmissions.miles);

  // maps the miles to an array
  const moneyLost = finalresultMoneySpent.map(recentEmissions => recentEmissions.spent);

  // maps the transportation to an array
  const persontransportation = emissions.map(recentEmissions => recentEmissions.transportation);

  if (index === 'Transportation') {
    return persontransportation;
  }
  if (index === 'savingsCumulative') {
    return savingsperMonthArray;
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

  if (index === 'EmissionsByMonth') {
    return emissionsbyMonth;
  }

  if (index === 'gallonsofgasbymonth') {
    return gallonsofgasbymonth;
  }

  if (index === 'totalEmissions') {
    if (typeof totalEmissionsofAllTransport !== 'undefined') {
      return totalEmissionsofAllTransport.toFixed(2);
    }
    return totalEmissionsofAllTransport;
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

  if (index === 'Emissions') {
    return emissions;
  }

  if (index === 'Transportation') {
    return emissions.map(recentEmissions => recentEmissions.transportation);
  }

  if (index === 'NumberOfUser') {
    return countOfUser;
  }

  return 0;
}

export default cumulativeEmissionsData;
