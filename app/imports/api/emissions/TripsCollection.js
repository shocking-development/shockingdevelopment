import SimpleSchema from 'simpl-schema';
import { Mongo } from 'meteor/mongo';
import { Tracker } from 'meteor/tracker';

/** Encapsulates state and variable values for this collection. */
class TripsCollection {
  constructor() {
    // The name of this collection.
    this.name = 'trips';
    // Define the Mongo collection.
    this.collection = new Mongo.Collection(this.name);
    // Define the structure of each document in the collection.
    this.schema = new SimpleSchema({
      owner: String,
      name: String,
      miles: Number,
    }, { tracker: Tracker });
    // Attach the schema to the collection, so all attempts to insert a document are checked against schema.
    this.collection.attachSchema(this.schema);
    // Define names for publications and subscriptions
    this.tripsPublicationName = `${this.name}.publication.emissions`;
  }
}

export const Trips = new TripsCollection();
