import { Meteor } from 'meteor/meteor';
import SimpleSchema from 'simpl-schema';
import { check } from 'meteor/check';
import { Roles } from 'meteor/alanning:roles';
import BaseCollection from '../base/BaseCollection';

/** Encapsulates state and variable values for this collection. */
export const userInfoCarsPublications = {
  userInfoCar: 'UserInfoCar',
  userInfoCarAdmin: 'UserInfoCarAdmin',
};

class UserInfoCarCollection extends BaseCollection {
  constructor() {
    super('UserInfosCars', new SimpleSchema({
      // userId: String, // whos logged in?
      carName: String,
      owner: String,
      makeofCar: String,
      modelofCar: String,
      yearofCar: Number,
      mpgofCar: Number,
    }));
  }

  /**
   * Defines a new Car and User Info item.
   * @param carId the carId of the car.
   * @param docID the docId name of the doc.
   * @return {String} the docID of the new document.
   */
  define({ carName, owner, makeofCar, modelofCar, yearofCar, mpgofCar }) {
    const docID = this._collection.insert({
      // userId,
      carName,
      owner,
      makeofCar,
      modelofCar,
      yearofCar,
      mpgofCar,
    });
    return docID;
  }

  /**
   * Updates the given document.
   * @param docID the id of the document to update.
   * @param carId the carId of the car.
   * @param docID the docId name of the doc.
   */
  update(docID, { userId, carId }) {
    const updateData = {};
    if (userId) {
      updateData.userId = userId;
    }
    if (carId) {
      updateData.carId = carId;
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
      Meteor.publish(userInfoCarsPublications.userInfoCar, function publish() {
        if (this.userId) {
          const username = Meteor.users.findOne(this.userId).username;
          return instance._collection.find({ owner: username });
        }
        return this.ready();
      });

      /** This subscription publishes all documents regardless of user, but only if the logged in user is the Admin. */
      Meteor.publish(userInfoCarsPublications.userInfoCarAdmin, function publish() {
        if (this.userId && Roles.userIsInRole(this.userId, 'admin')) {
          return instance._collection.find();
        }
        return this.ready();
      });
    }
  }

  /**
   * Subscription method for UserInfoCar owned by the current user.
   */
  subscribeUserInfoCars() {
    if (Meteor.isClient) {
      return Meteor.subscribe(userInfoCarsPublications.userInfoCar);
    }
    return null;
  }

  /**
   * Subscription method for admin users.
   * It subscribes to the entire collection.
   */
  subscribeUserInfoAdminCars() {
    if (Meteor.isClient) {
      return Meteor.subscribe(userInfoCarsPublications.userInfoCarAdmin);
    }
    return null;
  }

}

/**
 * Provides the singleton instance of this class to all other entities.
 */
export const UserInfosCars = new UserInfoCarCollection();
