import { Meteor } from 'meteor/meteor';
import { Accounts } from 'meteor/accounts-base';
import { Roles } from 'meteor/alanning:roles';

/* eslint-disable no-console */

// This needs to be fixed later
// eslint-disable-next-line no-unused-vars
function createUser(email, password, role, firstName, lastName, zipcode, transportation) {
  console.log(`  Creating user ${email}.`);
  const userID = Accounts.createUser({
    username: email,
    email: email,
    password: password,
  });
  if (role === 'admin') {
    Roles.createRole(role, { unlessExists: true });
    Roles.addUsersToRoles(userID, 'admin');
  }
}

/** When running app for first time, pass a settings file to set up a default user account. */
if (Meteor.users.find().count() === 0) {
  if (Meteor.settings.defaultAccounts) {
    console.log('Creating the default user(s)');
    Meteor.settings.defaultAccounts.map(({ email, password, role, firstName,
        lastName, zipcode, transportation,
    // This needs to be fixed later
    // eslint-disable-next-line array-callback-return
    }) => {
      createUser(email, password, role, firstName,
          lastName, zipcode, transportation);
    });
  } else {
    console.log('Cannot initialize the database!  Please invoke meteor with a settings file.');
  }
}
