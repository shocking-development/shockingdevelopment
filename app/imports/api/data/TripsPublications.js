import { Meteor } from 'meteor/meteor';
import { TripsCollection } from './TripsCollection';

Meteor.publish('trips', function publishTrips() {
  return TripsCollection.find({ owner: this.userId });
});
