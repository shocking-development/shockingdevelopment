import { Meteor } from 'meteor/meteor';
import { Stuffs } from '../../api/stuff/Stuff.js';
import { TripsCollection } from '../../api/data/TripsCollection.js';
/* eslint-disable no-console */

/** Initialize the database with a default data document. */
function addData(data) {
  console.log(`  Adding: ${data.name} (${data.owner})`);
  Stuffs.collection.insert(data);
}

/** Initialize the collection if empty. */
if (Stuffs.collection.find().count() === 0) {
  if (Meteor.settings.defaultData) {
    console.log('Creating default data.');
    Meteor.settings.defaultData.map(data => addData(data));
  }

if (TripsCollection.find().count() === 0) {
  TripsCollection.insert({
    owner: 'defaultuser',
    name: 'school',
    miles: 20,
  });
}
}
