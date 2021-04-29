import React, { Component } from 'react';
import { Confirm, Dropdown } from 'semantic-ui-react';
import { Meteor } from 'meteor/meteor';
import Landing from './landing/Landing';

class SignOutConfirmation extends Component {
  state = { open: false }

  show = () => this.setState({ open: true });

  handleConfirm = () => this.setState({ result:
      <div id="signout-page">
        <Landing/>
      </div>,
    logout: Meteor.logout(),
    open: false });

  handleCancel = () => this.setState({ result:
        <div id="home">
          <home/>
        </div>,
    open: false });

  render() {
    return (
        <div>
          <Dropdown.Menu>
            <Dropdown.Item id="navbar-sign-out" icon="sign out" text="Sign Out" onClick={this.show}/>
          </Dropdown.Menu>
          <Confirm
              open={this.state.open}
              header='This is a custom header'
              onCancel={this.handleCancel}
              onConfirm={this.handleConfirm}
          />
        </div>
    );
  }
}

export default SignOutConfirmation;
