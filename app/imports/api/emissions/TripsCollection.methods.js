import { Meteor } from 'meteor/meteor';
import { ValidatedMethod } from 'meteor/mdg:validated-method';
import { CallPromiseMixin } from 'meteor/didericis:callpromise-mixin';
import { Trips } from './TripsCollection';

export const TripsDefineMethod = new ValidatedMethod({
    name: 'TripsCollection.define',
    mixins: [CallPromiseMixin],
    validate: null,
    run(definitionData) {
      if (Meteor.isServer) {
        const docID = Trips.collection.insert(definitionData);
        return docID;
      }
      return '';
    },
  });

  export const tripsRemoveMethod = new ValidatedMethod({
    name: 'tripsCollection.remove',
    mixins: [CallPromiseMixin],
    validate: null,
    run(docId) {
      return Trips.collection.remove(docId);
    },
  });
