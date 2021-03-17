import { Mongo } from 'meteor/mongo';
import SimpleSchema from 'simpl-schema';
import { Tracker } from 'meteor/tracker';
import { Meteor } from 'meteor/meteor';
import { check } from 'meteor/check';
import { _ } from 'meteor/underscore';
import { Roles } from 'meteor/alanning:roles';
import { carsPublications } from '../cars/CarsCollection';

// Encapsulates state and variable values for this collection.
class GraphsCollection{

  constructor() {

    // The name of this collection.
    this.name = 'BarGraphCollection';

    //Current plays holder data
    this.dataOne = [20, 71.5, 0, 0, 55.8, 0, 8, 0, 0, 0, 0, 30];
    this.dataTwo = [83.6, 78.8, 0, 0, 0, 20, 0, 0, 0, 0, 0, 30];
    this.dataThree = [48.9, 38.8, 0, 0, 0, 0, 0, 0, 90, 0, 0, 30];

    // Define the Mongo collection.
    this.collection = new Mongo.Collection(this.name);

    // Define the structure of each document in the collection.
    this.schema = new SimpleSchema({
      name: String,
      dataOne: Array[Number],
      dataTwo: Array[Number],
      dataThree: Array[Number],
      owner: String,
    }, { tracker: Tracker });

    // Attach the schema to the collection, so all attempts to insert a document are checked against schema.
    this.collection.attachSchema(this.schema);

    // Define names for publications and subscriptions
    this.userPublicationName = `${this.name}.publication.user`;
    this.adminPublicationName = `${this.name}.publication.admin`;
  }

  define({ name, dataOne, owner }) {
    const instance = this._collection.insert({
      name,
      dataOne,
      owner,
    });
    return instance;
  }

  update(instance, { name, dataOne, owner }) {
    const dataUpdate = {};

    // update the name of the graph
      dataUpdate.name = name;

    // update the owner of the data
      dataUpdate.dataOne = dataOne;

    // update the owner of the graph
      dataUpdate.owner = owner;

    this._collection.update(instance, { $set: updateData });
  }

  removeIt(instance) {
    const doc = this.findDoc(instance);
    check(doc, Object);
    this.collection.remove(doc._id);
    return true;
  }

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

  subscribeCars() {
    if (Meteor.isClient) {
      return Meteor.subscribe(carsPublications.car);
    }
    return null;
  }


}

//Export Collection
export const Graphs = new GraphsCollection();
