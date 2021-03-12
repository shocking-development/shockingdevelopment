import { Meteor } from 'meteor/meteor';
import { ValidatedMethod } from 'meteor/mdg:validated-method';
import { CallPromiseMixin } from 'meteor/didericis:callpromise-mixin';
import { UserInfosCars } from './UserInfoCarCollection';

/**
 * Meteor method used to define new instances of the given collection name.
 * @param collectionName the name of the collection.
 * @param definitionDate the object used in the collection.define method.
 * @memberOf api/base
 */
export const userInfoCarDefineMethod = new ValidatedMethod({
  name: 'UserInfoCarCollection.define',
  mixins: [CallPromiseMixin],
  validate: null,
  run(definitionData) {
    // console.log('stuffDefineMethod', definitionData);
    if (Meteor.isServer) {
      const docID = UserInfosCars.define(definitionData);
      console.log(`stuffDefineMethod returning ${docID}. Now have ${UserInfosCars.count()}`);
      return docID;
    }
    return '';
  },
});

export const userInfoUpdateMethod = new ValidatedMethod({
  name: 'UserInfoCarCollection.update',
  mixins: [CallPromiseMixin],
  validate: null,
  run(updateData) {
    UserInfosCars.update(updateData.id, updateData);
    return true;
  },
});

export const userInfoRemoveItMethod = new ValidatedMethod({
  name: 'UserInfoCarCollection.removeIt',
  mixins: [CallPromiseMixin],
  validate: null,
  run(instance) {
    return UserInfosCars.removeIt(instance);
  },
});
