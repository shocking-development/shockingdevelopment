import { Mongo } from 'meteor/mongo';
import SimpleSchema from 'simpl-schema';
import { Tracker } from 'meteor/tracker';

/** Define a Mongo collection to hold the data. */
const UserInfo = new Mongo.Collection('UserInfo');

/** Define a schema to specify the structure of each document in the collection. */
const UserInfoSchema = new SimpleSchema({
    firstName: String,
    lastName: String,
    userName: String,
  email: String,
      password: String,
      zipcode: Number,
      transportation: String,
}, { tracker: Tracker });

/** Attach this schema to the collection. */
UserInfo.attachSchema(UserInfoSchema);

/** Make the collection and schema available to other code. */
export { UserInfo, UserInfoSchema };
