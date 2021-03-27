import { Meteor } from 'meteor/meteor';
import { ValidatedMethod } from 'meteor/mdg:validated-method';
import { CallPromiseMixin } from 'meteor/didericis:callpromise-mixin';
import { Emissions } from './EmissionsCollection';

export const EmissionsDefineMethod = new ValidatedMethod({
    name: 'EmissionsCollection.define',
    mixins: [CallPromiseMixin],
    validate: null,
    run(definitionData) {
      if (Meteor.isServer) {
        const docID = Emissions.collection.insert(definitionData);
        return docID;
      }
      return '';
    },
  });

export const EmissionsRemoveMethod = new ValidatedMethod({
    name: 'EmissionsCollection.remove',
    mixins: [CallPromiseMixin],
    validate: null,
    run(docId) {
      return Emissions.collection.remove(docId);
    },
  });
