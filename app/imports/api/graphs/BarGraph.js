import { Mongo } from 'meteor/mongo';
import SimpleSchema from 'simpl-schema';
import { Tracker } from 'meteor/tracker';
import { Stuffs } from '../stuff/Stuff';
import StuffItem from '../../ui/components/StuffItem';

/** Encapsulates state and variable values for this collection. */
class BarGraphCollection {

  constructor() {

    // The name of this collection.
    this.name = 'BarGraphCollection';

    //Current plays holder data
    this.dataOne = [20, 71.5, 0, 0, 55.8, 0, 8, 0, 0, 0, 0, 30];
    this.dataTwo = [83.6, 78.8, 0, 0, 0, 20, 0, 0, 0, 0, 0, 0];
    this.dataThree = [48.9, 38.8, 0, 0, 0, 0, 0, 0, 90, 0, 0, 0];
    this.dataLandOne = [49.9, 71.5, 106.4, 129.2, 144.0, 176.0, 135.6, 148.5, 216.4, 194.1, 95.6, 54.4];
    this.dataLandTwo = [83.6, 78.8, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0];
    this.dataLandThree = [48.9, 38.8, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0];
    this.dataSavings = [[25, 63.6], [80, 60], [30, 80]];

    // Define the Mongo collection.
    this.collection = new Mongo.Collection(this.name);

    // Define the structure of each document in the collection.
    this.schema = new SimpleSchema({
      name: String,
      dataOnes: Array[Number],
      dataTwo: Array[Number],
      dataThree: Array[Number],
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
export const BarGraph = new BarGraphCollection();
