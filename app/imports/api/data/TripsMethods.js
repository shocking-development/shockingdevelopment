import { Meteor } from 'meteor/meteor';
import { check } from 'meteor/check';
import { TripsCollection } from './TripsCollection.js';

Meteor.methods({
    'trips.insert'(tripsObject) {
        check(tripsObject, Object);

        if (!this.userId) {
            throw new Meteor.Error('Not authorized.');
          }

          TripsCollection.insert({
              owner: tripsObject.owner,
              name: tripsObject.name,
              miles: tripsObject.miles,
          });

    },

});
