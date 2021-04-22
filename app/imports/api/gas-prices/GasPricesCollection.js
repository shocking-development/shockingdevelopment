import { Meteor } from 'meteor/meteor';
import SimpleSchema from 'simpl-schema';
import { check } from 'meteor/check';
import { _ } from 'meteor/underscore';
import { Roles } from 'meteor/alanning:roles';
import BaseCollection from '../base/BaseCollection';

/** Encapsulates state and variable values for this collection. */
export const gasPricesPublications = {
  gasPrices: 'gasPrices',
  gasPricesAdmin: 'gasPricesAdmin',
};

class GasPricesCollection extends BaseCollection {
  constructor() {
    super('gasPrices', new SimpleSchema({
      State: String,
      regularPrice: Number,
      midGradePrice: Number,
      premiumPrice: Number,
      dieselPrice: Number,
    }));
  }

  /**
   * Defines a new gas-price item.
   * @param State the state where the gas price comes from.
   * @param regularPrice the regular gas price.
   * @param midGradePrice the mid Grade gas price .
   * @param premiumPrice the premium gas price.
   * @param dieselPrice the diesel gas price.
   * @return {String} the docID of the new document.
   */
  define({ State, regularPrice, midGradePrice, premiumPrice, dieselPrice }) {
    const docID = this._collection.insert({
      State,
      regularPrice,
      midGradePrice,
      premiumPrice,
      dieselPrice,
    });
    return docID;
  }

  /**
   * Updates the given document.
   * @param docID the id of the document to update.
   * @param State the state where the gas price comes from.
   * @param regularPrice the regular gas price.
   * @param midGradePrice the mid Grade gas price .
   * @param premiumPrice the premium gas price.
   * @param dieselPrice the diesel gas price.
   */
  update(docID, { State, regularPrice, midGradePrice, premiumPrice, dieselPrice }) {
    const updateData = {};
    if (State) {
      updateData.State = State;
    }
    if (_.isNumber(regularPrice)) {
      updateData.regularPrice = regularPrice;
    }
    if (_.isNumber(midGradePrice)) {
      updateData.midGradePrice = midGradePrice;
    }
    // if (quantity) { NOTE: 0 is falsy so we need to check if the quantity is a number.
    if (_.isNumber(premiumPrice)) {
      updateData.premiumPrice = premiumPrice;
    }
    if (_.isNumber(dieselPrice)) {
      updateData.dieselPrice = dieselPrice;
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
      Meteor.publish(gasPricesPublications.gasPrices, function publish() {
        if (this.userId) {
          return instance._collection.find({});
        }
        return this.ready();
      });

      /** This subscription publishes all documents regardless of user, but only if the logged in user is the Admin. */
      Meteor.publish(gasPricesPublications.gasPricesAdmin, function publish() {
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
      return Meteor.subscribe(gasPricesPublications.gasPrices);
    }
    return null;
  }

  /**
   * Subscription method for admin users.
   * It subscribes to the entire collection.
   */
  subscribeCarsAdmin() {
    if (Meteor.isClient) {
      return Meteor.subscribe(gasPricesPublications.gasPricesAdmin);
    }
    return null;
  }

}

/**
 * Provides the singleton instance of this class to all other entities.
 */
export const GasPrices = new GasPricesCollection();
