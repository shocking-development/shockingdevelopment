import React from 'react';
import Highcharts from 'highcharts';
import HighchartsReact from 'highcharts-react-official';
import { Mongo } from 'meteor/mongo';
import SimpleSchema from 'simpl-schema';
import { Tracker } from 'meteor/tracker';

/** Encapsulates state and variable values for this collection. */
class GraphsCollection {

  constructor() {
    // The name of this collection.
    this.name = 'GraphsCollection';
    this.dataOne = [20, 71.5, 0, 0, 0, 0, 8, 0, 0, 0, 0, 0];
    this.dataTwo = [83.6, 78.8, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0];
    this.dataThree = [48.9, 38.8, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0];

    // Define the Mongo collection.
    this.collection = new Mongo.Collection(this.name);

    // Define the structure of each document in the collection.
    this.schema = new SimpleSchema({
      name: String,
      dataOne: Number,
      dataTwo: Number,
      dataThree: Number,
      owner: String,
      fontFamily: 'sans-serif',
    }, { tracker: Tracker });

    // Attach the schema to the collection, so all attempts to insert a document are checked against schema.
    this.collection.attachSchema(this.schema);

    // Define names for publications and subscriptions
    this.userPublicationName = `${this.name}.publication.user`;
    this.adminPublicationName = `${this.name}.publication.admin`;
  }
}

//Export Collection
export const Graphs = new GraphsCollection();
