import { Meteor } from 'meteor/meteor';
import { DataCollection } from './DataCollection';

Meteor.publish('data', function publishData() {
  return DataCollection.find({ owner: this.userId });
});
