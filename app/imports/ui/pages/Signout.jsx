import React from 'react';
import { Meteor } from 'meteor/meteor';
import swal from 'sweetalert';
import Landing from './landing/Landing';

/** After the user clicks the "Signout" link in the NavBar, log them out and display this page. */
export default class Signout extends React.Component {
  render() {
    swal({
      text: 'Are you sure you want to sign out?',
      buttons: {
        confirm: {
          text: 'Yes',
          value: true,
          visible: true,
        },
        cancel: {
          text: 'Cancel',
          value: false,
          visible: true,
        },
      },
    }).then((val) => {
      if (val) {
        Meteor.logout();
      }
    });
      if (Meteor.user() === null) {
      return (
      <div id="signout-page">
      <Landing/>
      </div>
      );
    }
    if (Meteor.user() !== null) {
      return (
          <div id="home">
            <home/>
          </div>
      );
    }
  }
}
