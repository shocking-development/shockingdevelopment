import { Meteor } from 'meteor/meteor';
import { Roles } from 'meteor/alanning:roles';
import { Stuffs } from '../../api/stuff/Stuff';
import { UserInfos } from '../../api/userInfo/UserInfoCollection';
import { Cars } from '../../api/cars/CarsCollection';
import { Emissions } from '../../api/emissions/EmissionsCollection';
import { Trips } from '../../api/emissions/TripsCollection';
import { UserInfosCars } from '../../api/userInfo/UserInfoCarCollection';
import { GasPrices } from '../../api/gas-prices/GasPricesCollection';

// User-level publication.
// If logged in, then publish documents owned by this user. Otherwise publish nothing.
Meteor.publish(Stuffs.userPublicationName, function () {
  if (this.userId) {
    const username = Meteor.users.findOne(this.userId).username;
    return Stuffs.collection.find({ owner: username });
  }
  return this.ready();
});

// Admin-level publication.
// If logged in and with admin role, then publish all documents from all users. Otherwise publish nothing.
Meteor.publish(Stuffs.adminPublicationName, function () {
  if (this.userId && Roles.userIsInRole(this.userId, 'admin')) {
    return Stuffs.collection.find();
  }
  return this.ready();
});

/** Publish all the collections you need. */
UserInfos.publish();

/** Publish all the collections you need. */
Cars.publish();

/** Publish all the collections you need. */
UserInfosCars.publish();

/** Publish all the collections you need. */
GasPrices.publish();

// alanning:roles publication
// Recommended code to publish roles for each user.
Meteor.publish(null, function () {
  if (this.userId) {
    return Meteor.roleAssignment.find({ 'user._id': this.userId });
  }
  return this.ready();
});

Meteor.publish(Emissions.emissionPublicationName, function () {
  if (this.userId) {
    return Emissions.collection.find({ owner: this.userId });
  }
  return this.ready();
});

Meteor.publish(Emissions.cumulativeEmissionsPublicationName, function () {
  if (this.userId || !this.userId) {
    return Emissions.collection.find();
  }
  return this.ready();
});

Meteor.publish(Trips.emissionPublicationName, function () {
  if (this.userId) {
    return Trips.collection.find({ owner: this.userId });
  }
  return this.ready();
});
