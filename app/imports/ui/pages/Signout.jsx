import React from 'react';
import { Meteor } from 'meteor/meteor';
import Landing from './landing/Landing';

/** After the user clicks the "Signout" link in the NavBar, log them out and display this page. */
export default class Signout extends React.Component {
  render() {
    Meteor.logout();
    return (
      <div id="signout-page">
        <Landing/>
      </div>
    );
  }
}
