import { Meteor } from 'meteor/meteor';
import { ValidatedMethod } from 'meteor/mdg:validated-method';
import { CallPromiseMixin } from 'meteor/didericis:callpromise-mixin';
import { Cars } from './CarsCollection';

/**
 * Meteor method used to define new instances of the given collection name.
 * @param collectionName the name of the collection.
 * @param definitionDate the object used in the collection.define method.
 * @memberOf api/base
 */
export const carsDefineMethod = new ValidatedMethod({
  name: 'CarsCollection.define',
  mixins: [CallPromiseMixin],
  validate: null,
  run(definitionData) {
    // console.log('stuffDefineMethod', definitionData);
    if (Meteor.isServer) {
      const docID = Cars.define(definitionData);
      // console.log(`stuffDefineMethod returning ${docID}. Now have ${Stuffs.count()}`);
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

export const carsRemoveItMethod = new ValidatedMethod({
  name: 'CarsCollection.removeIt',
  mixins: [CallPromiseMixin],
  validate: null,
  run(instance) {
    return Cars.removeIt(instance);
  },
});
