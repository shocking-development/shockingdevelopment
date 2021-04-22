import { Meteor } from 'meteor/meteor';
import { ValidatedMethod } from 'meteor/mdg:validated-method';
import { CallPromiseMixin } from 'meteor/didericis:callpromise-mixin';
import { GasPrices } from './GasPricesCollection';

/**
 * Meteor method used to define new instances of the given collection name.
 * @param collectionName the name of the collection.
 * @param definitionDate the object used in the collection.define method.
 * @memberOf api/base
 */
export const gasPricesDefineMethod = new ValidatedMethod({
  name: 'GasPricesCollection.define',
  mixins: [CallPromiseMixin],
  validate: null,
  run(definitionData) {
    if (Meteor.isServer) {
      const docID = GasPrices.define(definitionData);
      return docID;
    }
    return '';
  },
});

export const gasPricesUpdateMethod = new ValidatedMethod({
  name: 'GasPricesCollection.update',
  mixins: [CallPromiseMixin],
  validate: null,
  run(updateData) {
    GasPrices.update(updateData.id, updateData);
    return true;
  },
});

export const gasPricesRemoveItMethod = new ValidatedMethod({
  name: 'GasPricesCollection.removeIt',
  mixins: [CallPromiseMixin],
  validate: null,
  run(instance) {
    return GasPrices.removeIt(instance);
  },
});
