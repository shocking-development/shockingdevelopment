import { Meteor } from 'meteor/meteor';
import SimpleSchema from 'simpl-schema';
import { check } from 'meteor/check';
import { _ } from 'meteor/underscore';
import { Roles } from 'meteor/alanning:roles';
import BaseCollection from '../base/BaseCollection';

/** Encapsulates state and variable values for this collection. */
export const carsPublications = {
  car: 'Car',
  carsAdmin: 'carsAdmin',
};

class CarsCollection extends BaseCollection {
  constructor() {
    super('Cars', new SimpleSchema({
      carType: {
        type: String,
        defaultValue: 'Gas',
        allowedValues: ['Electric', 'Gas'],
        optional: true,
      },
      make: String,
      model: String,
      year: Number,
      mpg: Number,
    }));
  }

  /**
   * Defines a new Cars item.
   * @param cartype of car
   * @param make the make of the car.
   * @param model the model the car.
   * @param year the year of the car.
   * @param mpg the mpg of the car.
   * @return {String} the docID of the new document.
   */
  define({ carType, make, model, year, mpg }) {
    const docID = this._collection.insert({
      carType,
      make,
      model,
      year,
      mpg,
    });
    return docID;
  }

  /**
   * Updates the given document.
   * @param docID the id of the document to update.
   * @param cartype of car
   * @param make the make of the car.
   * @param model the model the car.
   * @param year the year of the car.
   * @param mpg the mpg of the car.
   */
  update(docID, { carType, make, model, year, mpg }) {
    const updateData = {};

    if (carType) {
      updateData.cartype = carType;
    }
    if (make) {
      updateData.make = make;
    }
    if (model) {
      updateData.model = model;
    }
    if (_.isNumber(mpg)) {
      updateData.mpg = mpg;
    }
    // if (quantity) { NOTE: 0 is falsy so we need to check if the quantity is a number.
    if (_.isNumber(year)) {
      updateData.year = year;
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
      Meteor.publish(carsPublications.car, function publish() {
        if (this.userId) {
          return instance._collection.find({});
        }
        return this.ready();
      });

      /** This subscription publishes all documents regardless of user, but only if the logged in user is the Admin. */
      Meteor.publish(carsPublications.carsAdmin, function publish() {
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
  subscribeCars() {
    if (Meteor.isClient) {
      return Meteor.subscribe(carsPublications.car);
    }
    return null;
  }

  /**
   * Subscription method for admin users.
   * It subscribes to the entire collection.
   */
  subscribeCarsAdmin() {
    if (Meteor.isClient) {
      return Meteor.subscribe(carsPublications.carsAdmin);
    }
    return null;
  }

}

/**
 * Provides the singleton instance of this class to all other entities.
 */
export const Cars = new CarsCollection();
