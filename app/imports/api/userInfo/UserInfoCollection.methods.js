import { Meteor } from 'meteor/meteor';
import { ValidatedMethod } from 'meteor/mdg:validated-method';
import { CallPromiseMixin } from 'meteor/didericis:callpromise-mixin';
import { UserInfos } from './UserInfoCollection';

/**
 * Meteor method used to define new instances of the given collection name.
 * @param collectionName the name of the collection.
 * @param definitionDate the object used in the collection.define method.
 * @memberOf api/base
 */
export const userInfoDefineMethod = new ValidatedMethod({
  name: 'UserInfoCollection.define',
  mixins: [CallPromiseMixin],
  validate: null,
  run(definitionData) {
    // console.log('stuffDefineMethod', definitionData);
    if (Meteor.isServer) {
      const docID = UserInfos.define(definitionData);
      // console.log(`stuffDefineMethod returning ${docID}. Now have ${Stuffs.count()}`);
      return docID;
    }
    return '';
  },
});

export const userInfoUpdateMethod = new ValidatedMethod({
  name: 'UserInfoCollection.update',
  mixins: [CallPromiseMixin],
  validate: null,
  run(updateData) {
    UserInfos.update(updateData.id, updateData);
    return true;
  },
});

export const userInfoRemoveItMethod = new ValidatedMethod({
  name: 'UserInfoCollection.removeIt',
  mixins: [CallPromiseMixin],
  validate: null,
  run(instance) {
    return UserInfos.removeIt(instance);
  },
});
