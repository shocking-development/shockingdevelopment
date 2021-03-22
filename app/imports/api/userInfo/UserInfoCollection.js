import { Meteor } from 'meteor/meteor';
import SimpleSchema from 'simpl-schema';
import { check } from 'meteor/check';
import { _ } from 'meteor/underscore';
import { Roles } from 'meteor/alanning:roles';
import BaseCollection from '../base/BaseCollection';

/** Encapsulates state and variable values for this collection. */
export const userInfoPublications = {
  userInfo: 'UserInfo',
  userInfoAdmin: 'UserInfoAdmin',
};

class UserInfoCollection extends BaseCollection {
  constructor() {
    super('UserInfos', new SimpleSchema({
      firstName: String,
      lastName: String,
      user: String,
      owner: String,
      email: String,
      password: String,
      userImage: String,
      zipcode: Number,
      transportation: String,
      unitSystem: {
        type: String,
        allowedValues: ['metric', 'us units'],
        defaultValue: 'us units',
      },
    }));
  }

  /**
   * Defines a new Stuff item.
   * @param firstName the first name of the person.
   * @param lastName the last name of the person.
   * @param user the user name of the person.
   * @param owner the owner of the item.
   * @param email the email of the person.
   * @param password the password of the person.
   * @param zipcode the zipcode of the person.
   * @return {String} the docID of the new document.
   */
  define({ firstName, lastName, user, owner, email, password, zipcode, userImage, transportation, unitSystem }) {
    const docID = this._collection.insert({
      firstName,
      lastName,
      user,
      owner,
      email,
      password,
      zipcode,
      userImage,
      transportation,
      unitSystem,
    });
    return docID;
  }

  /**
   * Updates the given document.
   * @param docID the id of the document to update.
   * @param firstName the first name of the person (optional).
   * @param lastName the last name of the person (optional).
   * @param user the user name of the person (optional).
   * @param email the email of the person (optional).
   * @param password the password of the person (optional).
   * @param zipcode the zipcode of the person (optional).
   */
  update(docID, { firstName, lastName, user, email, password, zipcode, userImage, transportation, unitSystem }) {
    const updateData = {};
    if (firstName) {
      updateData.firstName = firstName;
    }
    if (lastName) {
      updateData.lastName = lastName;
    }
    if (user) {
      updateData.user = user;
    }
    if (email) {
      updateData.email = email;
    }
    if (password) {
      updateData.password = password;
    }
    // if (quantity) { NOTE: 0 is falsy so we need to check if the quantity is a number.
    if (_.isNumber(zipcode)) {
      updateData.zipcode = zipcode;
    }
    if (userImage) {
      updateData.userImage = userImage;
    }
    if (transportation) {
      updateData.transportation = transportation;
    }
    if (unitSystem) {
      updateData.unitSystem = unitSystem;
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
