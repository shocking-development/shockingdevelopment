import { Meteor } from 'meteor/meteor';
import { UserInfos } from '../../api/userInfo/UserInfoCollection';
import { Cars } from '../../api/cars/CarsCollection';
import { GasPrices } from '../../api/gas-prices/GasPricesCollection';
import generateUsers from '../../api/faker-generator/userGenerator';
import generateEmissions from '../../api/faker-generator/emissionsGenerator';
import { Emissions } from '../../api/emissions/EmissionsCollection';

/* eslint-disable no-console */

const userIDarray = [];
/** Initialize the database with a default data document. */
function addProfiles(data) {
  console.log(`  Adding: ${data.firstName} ${data.lastName} ${data.user} ${data.password} ${data.State}
    (${data.owner})`);
  UserInfos.define(data);
}

/** Initialize the database with a default data document. */
function addCarData(data) {
  console.log(`  Adding: ${data.carType} ${data.make} ${data.model} ${data.year} ${data.mpg} `);
  Cars.define(data);
}

/** Initialize the database with a default data document. */
function addGasolineData(data) {
  console.log(`  Adding: ${data.State} ${data.regularPrice} ${data.midGradePrice} ${data.premiumPrice} ${data.dieselPrice} `);
  GasPrices.define(data);
}

function addEmissions(data) {
  Emissions.collection.insert(data);
  console.log(`Generated random Emissions: Adding: ${data.owner} ${data.mpg} ${data.date} ${data.miles}`);
}

/** Initialize the User Infos collection if empty. */
if (UserInfos.count() === 0) {
 if (Meteor.settings.defaultData) {
   console.log('Creating default User data from the defaultProfiles.');
   Meteor.settings.defaultData.map(data => addProfiles(data));
 }

}

/** Initialize the Cars collection if empty.
if (Cars.count() === 0) {
  if (Meteor.settings.defaultCarsData) {
    console.log('Creating default cars data.');
    Meteor.settings.defaultCarsData.map(data => addCarData(data));
  }

}

/** Adding the mock users */
function createUser(user, role) {
  // eslint-disable-next-line no-undef
  const userID = Accounts.createUser({ username: user, email: user, password: 'changeme' });
  userIDarray.push(userID);
  if (role === 'admin') {
    // eslint-disable-next-line no-undef
    Roles.addUsersToRoles(userID, 'admin');
  }
}

/** Defines a new user and associated profile. Error if user already exists. */
function addProfile({ firstName, lastName, owner, password, userImage, unitSystem, State }) {
  console.log(` Adding Fake Profiles: ${firstName} ${lastName} ${owner} ${password}, ${unitSystem}, ${State}`);
  // Define the user in the Meteor accounts package.
  const email = owner;
  const role = 'none';
  createUser(email, role);
  // Create the profile.
  UserInfos.define({ firstName, lastName, owner, password, userImage, unitSystem, State });
}

/** Initialize the GasPrices collection if empty. */
if (GasPrices.count() === 0) {
  if (Meteor.settings.defaultCarsData) {
    console.log('Creating default gas data.');
    Meteor.settings.stateGasolinePrices.map(data => addGasolineData(data));
  }
}

if ((Meteor.settings.generateData) && (Meteor.users.find().count() < 20)) {
  const userList = generateUsers(Meteor.settings.generateData.users);
  userList.map(profile => addProfile(profile));

  const emissionslist = generateEmissions(Meteor.settings.generateData.emissions, userIDarray);
  console.log('Generating random emissions list...');
  emissionslist.map(emissions => addEmissions(emissions));
}

if ((Meteor.settings.loadAssetsFile) && (Cars.find().count() === 0)) {
  const assetsFileName = 'data.json';
  console.log(`Loading data from private/${assetsFileName}`);
  // eslint-disable-next-line no-unused-vars
  const jsonData = JSON.parse(Assets.getText(assetsFileName));
  jsonData.defaultCarsData.map(data => addCarData(data));
}
