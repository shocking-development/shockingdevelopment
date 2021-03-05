import { Meteor } from 'meteor/meteor';
import { UserInfos } from '../../api/userInfo/UserInfoCollection';
import { Cars } from '../../api/cars/CarsCollection';

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
