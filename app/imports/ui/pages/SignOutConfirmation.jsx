import React, { Component } from 'react';
import { Confirm, Dropdown } from 'semantic-ui-react';
import { Meteor } from 'meteor/meteor';
// import Landing from './landing/Landing';
import { NavLink } from 'react-router-dom';

class SignOutConfirmation extends Component {
  state = { open: false }

  show = () => this.setState({ open: true });

  handleConfirm = () => this.setState({
    logout: Meteor.logout(),
    return: <div as={NavLink} exact to="/signout"/>,
    open: false,
  });

  handleCancel = () => this.setState({
    return: <div as={NavLink} exact to="/home"/>,
    open: false,
  });

  render() {
    return (
        <div>
          <Dropdown.Menu>
            <Dropdown.Item icon="sign out" text="Sign Out" onClick={this.show}/>
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
// import React from 'react';
// import { Button, Header, Icon, Modal } from 'semantic-ui-react';
//
// const SignOutExample = () => (
//     <Modal trigger={<Button>Basic Modal</Button>} basic size="small">
//       <Header icon="archive" content="Archive Old Messages" />
//       <Modal.Content>
//         <p>
//           Your inbox is getting full, would you like us to enable automatic
//           archiving of old messages?
//         </p>
//       </Modal.Content>
//       <Modal.Actions>
//         <Button basic color="red" inverted>
//           <Icon name="remove" /> No
//         </Button>
//         <Button color="green" inverted>
//           <Icon name="checkmark" /> Yes
//         </Button>
//       </Modal.Actions>
//     </Modal>
// );
//
// export default SignOutExample;
