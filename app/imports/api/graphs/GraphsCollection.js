import { Mongo } from 'meteor/mongo';
import SimpleSchema from 'simpl-schema';
import { Tracker } from 'meteor/tracker';
import { Stuffs } from '../stuff/Stuff';
import StuffItem from '../../ui/components/StuffItem';

/** Encapsulates state and variable values for this collection. */
class GraphsCollection {

  constructor() {

    // The name of this collection.
    this.name = 'BarGraphCollection';

    //Current plays holder data
    this.dataOne = [
        [20, 71.5, 0, 0, 55.8, 0, 8, 0, 0, 0, 0, 30],
        [83.6, 78.8, 0, 0, 0, 20, 0, 0, 0, 0, 0, 30],
        [48.9, 38.8, 0, 0, 0, 0, 0, 0, 90, 0, 0, 30]
    ];


    // Define the Mongo collection.
    this.collection = new Mongo.Collection(this.name);

    // Define the structure of each document in the collection.
    this.schema = new SimpleSchema({
      name: String,
      dataOnes: Array[Array[Number], Array[Number], Array[Number]],
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
