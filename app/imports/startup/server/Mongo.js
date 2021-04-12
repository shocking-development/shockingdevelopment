import { Meteor } from 'meteor/meteor';
import { UserInfos } from '../../api/userInfo/UserInfoCollection';
import { Cars } from '../../api/cars/CarsCollection';
import { GasPrices } from '../../api/gas-prices/GasPricesCollection';

/* eslint-disable no-console */

/** Initialize the database with a default data document. */
function addData(data) {
  console.log(`  Adding: ${data.firstName} ${data.lastName} ${data.user} ${data.email} ${data.password}  ${data.zipcode}
   ${data.transportation} (${data.owner})`);
  UserInfos.define(data);
}

/** Initialize the database with a default data document. */
function addCarData(data) {
  console.log(`  Adding: ${data.make} ${data.model} ${data.year} ${data.mpg} `);
  Cars.define(data);
}

/** Initialize the database with a default data document. */
function addGasolineData(data) {
  console.log(`  Adding: ${data.State} ${data.regularPrice} ${data.midGradePrice} ${data.premiumPrice} ${data.dieselPrice} `);
  GasPrices.define(data);
}

/** Initialize the User Infos collection if empty. */
if (UserInfos.count() === 0) {
  if (Meteor.settings.defaultData) {
    console.log('Creating default User data.');
    Meteor.settings.defaultData.map(data => addData(data));
  }

}

/** Initialize the Cars collection if empty. */
if (Cars.count() === 0) {
  if (Meteor.settings.defaultCarsData) {
    console.log('Creating default cars data.');
    Meteor.settings.defaultCarsData.map(data => addCarData(data));
  }

}

/** Initialize the GasPrices collection if empty. */
if (GasPrices.count() === 0) {
  if (Meteor.settings.defaultCarsData) {
    console.log('Creating default gas data.');
    Meteor.settings.stateGasolinePrices.map(data => addGasolineData(data));
  }

}

if ((Meteor.settings.loadAssetsFile) && (Cars.find().count() === 0)) {
  const assetsFileName = 'data.json';
  console.log(`Loading data from private/${assetsFileName}`);
  // eslint-disable-next-line no-unused-vars
  const jsonData = JSON.parse(Assets.getText(assetsFileName));
  jsonData.defaultCarsData.map(cars => addData(cars));
}
