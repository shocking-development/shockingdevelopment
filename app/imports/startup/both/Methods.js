import { Meteor } from 'meteor/meteor';
import { Accounts } from 'meteor/accounts-base';
import { check } from 'meteor/check';

Meteor.methods({
  updateEmail: function (newAddress) {
    check(newAddress, String);
    const userId = this.userId;
    if (userId && Meteor.isServer) { // Meteor.isServer ensures this code only runs on the server
      const currentEmail = Meteor.users.findOne(userId).emails[0].address;
      Accounts.addEmail(userId, newAddress);
      Accounts.removeEmail(userId, currentEmail);
    }
  },
  updateUsername: function (newUsername) {
    check(newUsername, String);
    const userId = this.userId;
    if (userId && Meteor.isServer) {
      Accounts.setUsername(userId, newUsername);
    }
  },
});
