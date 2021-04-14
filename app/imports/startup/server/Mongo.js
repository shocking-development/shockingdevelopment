import { Meteor } from 'meteor/meteor';
import { UserInfos } from '../../api/userInfo/UserInfoCollection';
import { UserInfosCars } from '../../api/userInfo/UserInfoCarCollection';
import { Cars } from '../../api/cars/CarsCollection';
import { GasPrices } from '../../api/gas-prices/GasPricesCollection';
import { Emissions } from '../../api/emissions/EmissionsCollection';
import generateUsers from '../../api/generator/userGenerator';
import generateEmissions from '../../api/generator/emissionsGenerator';
import userCarGenerator from '../../api/generator/userCarGenerator';

/* eslint-disable no-console */

const userIDarray = [];
/** Initialize the database with a default data document. */
function addProfiles(data) {
  console.log(`  Adding: ${data.firstName} ${data.lastName} ${data.password} ${data.State}
    (${data.owner})`);
  UserInfos.define(data);
}

/** Initialize the database with a default data document. */
function addUserCars(data) {
  console.log(`  Adding: ${data.carName} ${data.owner} ${data.makeofCar} ${data.modelofCar} ${data.yearofCar}${data.mpgofCar}
    (${data.owner})`);
  UserInfosCars.define(data);
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

  const userCarList = userCarGenerator(Meteor.settings.generateData.userInfoCar, userIDarray);
  userCarList.map(userInfoCar => addUserCars(userInfoCar));
}
