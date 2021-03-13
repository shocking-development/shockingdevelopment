import { Mongo } from 'meteor/mongo';
import SimpleSchema from 'simpl-schema';
import { Tracker } from 'meteor/tracker';
import { Stuffs } from '../stuff/Stuff';
import StuffItem from '../../ui/components/StuffItem';

/** Encapsulates state and variable values for this collection. */
class DonutGraphCollection {

  constructor() {
    // The name of this collection.
    this.name = 'DonutGraphCollection';

    //Current plays holder data
    this.dataOne = [['Bike', 6], ['Car', 2], ['Public Transportation', 3]];
    this.dataTwo = [['Tuesday', 6], ['Monday', 2], ['Wednesday', 3]];

    // Define the Mongo collection.
    this.collection = new Mongo.Collection(this.name);

    // Define the structure of each document in the collection.
    this.schema = new SimpleSchema({
      name: String,
      dataOne: Array[Number],
      dataTwo: Array[Number],
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
export const DonutGraph = new DonutGraphCollection();
