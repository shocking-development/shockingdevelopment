import { Mongo } from 'meteor/mongo';
import SimpleSchema from 'simpl-schema';
import { Tracker } from 'meteor/tracker';

/** Encapsulates state and variable values for this collection. */
class PieChartCollection {

  constructor() {

    // The name of this collection.
    this.name = 'PieChartCollection';

    // Current plays holder data
    this.dataOne = ['TeleWork', 'Carpool', 'Electrical Vehical', 'Public Transportation', 'Biking', 'Walking', 'Walking'];
    this.dataTwo = [61, 11, 10, 4.67, 2.67, 2.67];

    // Define the Mongo collection.
    this.collection = new Mongo.Collection(this.name);

    // Define the structure of each document in the collection.
    this.schema = new SimpleSchema({
      name: String,
      dataOne: String,
      dataTwo: Number,
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

// Export Collection
export const PieChart = new PieChartCollection();
