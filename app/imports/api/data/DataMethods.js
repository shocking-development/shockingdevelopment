import { Meteor } from 'meteor/meteor';
import { check } from 'meteor/check';
import { DataCollection } from './DataCollection';

Meteor.methods({
    'data.insert'(dataObject) {
        check(dataObject, Object);

        if (!this.userId) {
            throw new Meteor.Error('Not authorized.');
          }

          DataCollection.insert({
              owner: dataObject.owner,
              date: dataObject.date,
              transportation: dataObject.transportation,
              miles: dataObject.miles,
          });

    },

});
