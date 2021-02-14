import { Meteor } from 'meteor/meteor';
import SimpleSchema from 'simpl-schema';
import { check } from 'meteor/check';
import { _ } from 'meteor/underscore';
import { Roles } from 'meteor/alanning:roles';
import BaseCollection from '../base/BaseCollection';

/** Encapsulates state and variable values for this collection. */

export const stuffConditions = ['excellent', 'good', 'fair', 'poor'];
export const userInfoPublications = {
  userInfo: 'UserInfor',
  userInfoAdmin: 'UserInfoAdmin',
};

class UserInfoCollection extends BaseCollection {
  constructor() {
    super('UserInfos', new SimpleSchema({
      firstName: String,
      lastName: String,
      userName: String,
      owner: String,
      email: String,
      password: String,
      zipcode: Number,
      transportation: String,
    }));
  }

  /**
   * Defines a new Stuff item.
   * @param name the name of the item.
   * @param quantity how many.
   * @param owner the owner of the item.
   * @param condition the condition of the item.
   * @return {String} the docID of the new document.
   */
  define({ firstName, lastName, userName, owner, email, password, zipcode, transportation }) {
    const docID = this._collection.insert({
      firstName,
      lastName,
      userName,
      owner,
      email,
      password,
      zipcode,
      transportation,
    });
    return docID;
  }

  /**
   * Updates the given document.
   * @param docID the id of the document to update.
   * @param name the new name (optional).
   * @param quantity the new quantity (optional).
   * @param condition the new condition (optional).
   */
  update(docID, { firstName, lastName, userName, email, password, zipcode, transportation }) {
    const updateData = {};
    if (firstName) {
      updateData.firstName = firstName;
    }
    if (lastName) {
      updateData.firstName = lastName;
    }
    if (userName) {
      updateData.firstName = userName;
    }
    if (email) {
      updateData.firstName = email;
    }
    if (password) {
      updateData.firstName = password;
    }
    // if (quantity) { NOTE: 0 is falsy so we need to check if the quantity is a number.
    if (_.isNumber(zipcode)) {
      updateData.zipcode = zipcode;
    }
    if (transportation) {
      updateData.transportation = transportation;
    }
    this._collection.update(docID, { $set: updateData });
  }

  /**
   * A stricter form of remove that throws an error if the document or docID could not be found in this collection.
   * @param { String | Object } name A document or docID in this collection.
   * @returns true
   */
  removeIt(name) {
    const doc = this.findDoc(name);
    check(doc, Object);
    this._collection.remove(doc._id);
    return true;
  }

  /**
   * Default publication method for entities.
   * It publishes the entire collection for admin and just the stuff associated to an owner.
   */
  publish() {
    if (Meteor.isServer) {
      // get the StuffCollection instance.
      const instance = this;
      /** This subscription publishes only the documents associated with the logged in user */
      Meteor.publish(userInfoPublications.userInfo, function publish() {
        if (this.userId) {
          const username = Meteor.users.findOne(this.userId).username;
          return instance._collection.find({ owner: username });
        }
        return this.ready();
      });

      /** This subscription publishes all documents regardless of user, but only if the logged in user is the Admin. */
      Meteor.publish(userInfoPublications.userInfoAdmin, function publish() {
        if (this.userId && Roles.userIsInRole(this.userId, 'admin')) {
          return instance._collection.find();
        }
        return this.ready();
      });
    }
  }

  /**
   * Subscription method for stuff owned by the current user.
   */
  subscribeUserInfo() {
    if (Meteor.isClient) {
      return Meteor.subscribe(userInfoPublications.userInfo);
    }
    return null;
  }

  /**
   * Subscription method for admin users.
   * It subscribes to the entire collection.
   */
  subscribeUserInfoAdmin() {
    if (Meteor.isClient) {
      return Meteor.subscribe(userInfoPublications.userInfoAdmin);
    }
    return null;
  }

}

/**
 * Provides the singleton instance of this class to all other entities.
 */
export const UserInfos = new UserInfoCollection();
