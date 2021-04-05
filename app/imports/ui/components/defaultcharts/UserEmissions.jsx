import { Meteor } from 'meteor/meteor';
import { useTracker } from 'meteor/react-meteor-data';
import { _ } from 'meteor/underscore';
import { Emissions } from '../../../api/emissions/EmissionsCollection';
import { UserInfosCars } from '../../../api/userInfo/UserInfoCarCollection';
import {
  calculateCO2,
  calculateGHG,
  calculateGalUsed,
  fuelCost,
  calculatePounds,
} from '../../../api/trips/ghgcalculation';

// A export function to give data to other pages.
export function User() {
  const user = useTracker(() => Meteor.userId());
  return user;
}

export function UserEmissions() {
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

  const carInfo = useTracker(() => {
    UserInfosCars.subscribeUserInfoCars();
    const userCars = UserInfosCars.find({}).fetch();
    return userCars;
  });
  // for debugging console.log(carInfo);

  /*
  * Need to detect diffent modes of traveling
  */

  /* Code from https://stackoverflow.com/questions/24444738/sum-similar-keys-in-an-array-of-objects */
  const result = emissions.reduce(function (acc, val) {
    const o = acc.filter(function (obj) {
      // for debugging console.log(obj.date.getTime() === val.date.getTime());
      // https://stackoverflow.com/questions/7244513/javascript-date-comparisons-dont-equal
      return obj.date.getMonth() === val.date.getMonth();
    }).pop() || { date: val.date, miles: 0 };

    o.miles += val.miles;
    acc.push(o);
    return acc;
  }, []);

  /* Code from https://stackoverflow.com/questions/24444738/sum-similar-keys-in-an-array-of-objects */
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

  const finalresultdays = resultdays.filter(function (itm, index1, a) {
    return index1 === a.indexOf(itm);
  }).reverse();

  // for debugging console.log(finalresultdays);

  const finalresult = _.sortBy((result.filter(function (itm, index1, a) {
    return index1 === a.indexOf(itm);
  })), 'date');

  const formatter = new Intl.DateTimeFormat('en', { month: 'short' });

  const dateRecorded = finalresult.map(recentEmissions => formatter.format(recentEmissions.date));

  const dataMiles = finalresult.map(recentEmissions => recentEmissions.miles);

  const persontransportation = emissions.map(recentEmissions => recentEmissions.transportation);

  const carmpg = carInfo.map(car => car.mpgofCar);

  const Co2Produced = finalresult.map(recentEmissions => Number(calculatePounds(calculateCO2(calculateGalUsed(recentEmissions.miles, carmpg)))));

  const reducer = (accumulator, currentValue) => accumulator + currentValue;

  const ghgEquivalencyEmissionsProduced = finalresult.map(recentEmissions => Number((calculateGHG(calculateGalUsed(recentEmissions.miles, carmpg)))));

  let totalEmissions;
  if (Co2Produced.length !== 0) {
    totalEmissions = Co2Produced.reduce(reducer);
  }

  let totalGHGEmissions;

  if (ghgEquivalencyEmissionsProduced.length !== 0) {
    totalGHGEmissions = ghgEquivalencyEmissionsProduced.reduce(reducer);
  }

  /* let totalMilesDriven;
  if (dataMiles.length !== 0) {
    totalMilesDriven = dataMiles.reduce(reducer);
  } */

  const stateGasPrice = 3.14;

  const moneyspent = finalresult.map(recentEmissions => Number(fuelCost(calculateGalUsed(recentEmissions.miles, carmpg), stateGasPrice)));

  const ghgEmissionsbyDays = finalresultdays.map(item => {
    const container = { day: '', ghgProduced: '' };

    container.date = item.date.getDay();
    container.ghgProduced = Number(calculatePounds(calculateCO2(calculateGalUsed(item.miles, carmpg))));

    return container;
  });

  if (index === 'Transportation') {
    return persontransportation;
  }

  if (index === 'CO2EmissionsProduced') {
    return Co2Produced;
  }

  if (index === 'totalGHGEmissionsEquivalency') {
    return totalGHGEmissions;
  }

  if (index === 'MoneySpent') {
    return moneyspent;
  }

  if (index === 'DateRecorded') {
    return dateRecorded;
  }

  if (index === 'DataMiles') {
    return dataMiles;
  }

  if (index === 'totalEmissions') {
    return totalEmissions;
  }

  if (index === 'emisionsForweek') {
    return ghgEmissionsbyDays;
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

  return user;
}

export default UserEmissions;
