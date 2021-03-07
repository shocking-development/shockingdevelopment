import { Mongo } from 'meteor/mongo';

// should be a class so it can be extended
export const TripsCollection = new Mongo.Collection('trips');
