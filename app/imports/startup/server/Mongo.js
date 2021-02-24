import { Meteor } from 'meteor/meteor';
import { UserInfos } from '../../api/userInfo/UserInfoCollection';

/* eslint-disable no-console */

/** Initialize the database with a default data document. */
function addData(data) {
  console.log(`  Adding: ${data.firstName} ${data.lastName} ${data.user} ${data.email} ${data.password}  ${data.zipcode}
   ${data.transportation} (${data.owner})`);
  UserInfos.define(data);
}

/** Initialize the collection if empty. */
if (UserInfos.count() === 0) {
  if (Meteor.settings.defaultData) {
    console.log('Creating default data.');
    Meteor.settings.defaultData.map(data => addData(data));
  }
}
