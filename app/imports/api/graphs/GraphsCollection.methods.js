import { Meteor } from 'meteor/meteor';
import { ValidatedMethod } from 'meteor/mdg:validated-method';
import { CallPromiseMixin } from 'meteor/didericis:callpromise-mixin';
import { Graphs } from './GraphsCollection';
import { Cars } from '../cars/CarsCollection';

export const GraphsDefineMethod = new ValidatedMethod({
    name: 'GraphsCollection.define',
    dataOne: [CallPromiseMixin],
    validate: null,
    run(definitionData) {
      if (Meteor.isServer) {
        const docID = Graphs.collection.insert(definitionData);
        return docID;
      }
      return '';
    },
  });

export const carsUpdateMethod = new ValidatedMethod({
  name: 'CarsCollection.update',
  mixins: [CallPromiseMixin],
  validate: null,
  run(updateData) {
    Cars.update(updateData.id, updateData);
    return true;
  },
});
