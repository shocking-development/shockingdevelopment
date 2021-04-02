import { Meteor } from 'meteor/meteor';
import { useTracker } from 'meteor/react-meteor-data';
import { Emissions } from '../../../api/emissions/EmissionsCollection';
import { UserInfosCars } from '../../../api/userInfo/UserInfoCarCollection';
import { GasPrices } from '../../../api/gas-prices/GasPricesCollection';
import { UserInfos } from '../../../api/userInfo/UserInfoCollection';
import { calculateCO2, calculateGHG, calculateGalUsed, fuelCost, calculatePounds } from '../../../api/trips/ghgcalculation';

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

  // for debugging console.log(emissions);

  const carInfo = useTracker(() => {
    UserInfosCars.subscribeUserInfoCars();
    const userCars = UserInfosCars.find({}).fetch();
    return userCars;
  });
  // for debugging console.log(carInfo);

  /* Code from https://stackoverflow.com/questions/24444738/sum-similar-keys-in-an-array-of-objects */
  const result = emissions.reduce(function (acc, val) {
    const o = acc.filter(function (obj) {
      // for debugging console.log(obj.date.getTime() === val.date.getTime());
      // https://stackoverflow.com/questions/7244513/javascript-date-comparisons-dont-equal
      return obj.date.getTime() === val.date.getTime();
    }).pop() || { date: val.date, miles: 0 };

    o.miles += val.miles;
    acc.push(o);
    return acc;
  }, []);

  const finalresult = result.filter(function (itm, i, a) {
    return i === a.indexOf(itm);
  });

  const dateRecorded = finalresult.map(recentEmissions => `${recentEmissions.date.getMonth() + 1}/${recentEmissions.date.getDate()}/${recentEmissions.date.getFullYear()}`);

  const dataMiles = finalresult.map(recentEmissions => recentEmissions.miles);

  const persontransportation = emissions.map(recentEmissions => recentEmissions.transportation);

  const carmpg = carInfo.map(car => car.mpgofCar);

  const Co2Producedarray = [];

  const Co2Produced = Number(calculatePounds(calculateCO2(calculateGalUsed(dataMiles, carmpg))));

  console.log(Co2Producedarray);

  Co2Producedarray.push(Co2Produced);

  const moneyspentarray = [];

  const stateGasPrice = 3.14;

  const moneyspent = Number(fuelCost((calculateGalUsed(dataMiles, carmpg)), stateGasPrice));
  moneyspentarray.push(moneyspent);

  if (index === 'User') {
    return user;
  }

  if (index === 'Transportation') {
    return persontransportation;
  }

  if (index === 'Emissions') {
    return emissions;
  }

  if (index === 'CO2EmissionsProduced') {
    return Co2Producedarray;
  }

  if (index === 'MoneySpent') {
    return moneyspentarray;
  }

  if (index === 'DateRecorded') {
    return dateRecorded;
  }

  if (index === 'DataMiles') {
    return dataMiles;
  }
  if (index === 'Transportation') {
    return emissions.map(recentEmissions => recentEmissions.transportation);
  }

  return user;
}

export default UserEmissions;
