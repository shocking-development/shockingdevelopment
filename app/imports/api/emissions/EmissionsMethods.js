import { Meteor } from 'meteor/meteor';
import { check } from 'meteor/check';
import { EmissionsCollection } from './EmissionsCollection';

Meteor.methods({
    'data.insert'(dataObject) {
        check(dataObject, Object);

        if (!this.userId) {
            throw new Meteor.Error('Not authorized.');
          }

          EmissionsCollection.insert({
              owner: dataObject.owner,
              date: dataObject.date,
              transportation: dataObject.transportation,
              miles: dataObject.miles,
              createdAt: new Date(),
          });

    },

});
