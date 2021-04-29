// import React, { Component } from 'react';
// import { Button, Header, Icon, Modal } from 'semantic-ui-react';
// import { Meteor } from 'meteor/meteor';
// import Landing from './landing/Landing';
//
// const [open, setOpen] = React.useState(false);
//
// class Signout extends Component {
//   state = { open: false }
//
//   show = () => this.setState({ open: true });
//
//   handleConfirm = () => this.setState({
//     return:
//         <div id="signout-page">
//           <Landing/>
//         </div>,
//     logout: Meteor.logout(),
//     open: false });
//
//   handleCancel = () => this.setState({
//     return:
//         <div id="home">
//           <home/>
//         </div>,
//     open: false });
//
//   render() {
//     return (
//         <Modal
//             basic
//             onClose={() => setOpen(false)}
//             onOpen={() => setOpen(true)}
//             open={open}
//             size='small'
//             trigger={<Button>Basic Modal</Button>}
//         >
//           <Header icon>
//             <Icon name='archive' />
//             Archive Old Messages
//           </Header>
//           <Modal.Content>
//             <p>
//               Your inbox is getting full, would you like us to enable automatic
//               archiving of old messages?
//             </p>
//           </Modal.Content>
//           <Modal.Actions>
//             <Button basic color='red' inverted onClick={() => setOpen(false)}>
//               <Icon name='remove' /> No
//             </Button>
//             <Button color='green' inverted onClick={() => setOpen(false)}>
//               <Icon name='checkmark' /> Yes
//             </Button>
//           </Modal.Actions>
//         </Modal>
//         // <div>
//         //   <Confirm
//         //       open={this.state.open}
//         //       header='Sign Out'
//         //       onCancel={this.handleCancel}
//         //       onConfirm={this.handleConfirm}
//         //   />
//         // </div>
//     );
//   }
// }
//
// export default Signout;

import React from 'react';
import { Meteor } from 'meteor/meteor';
import swal from 'sweetalert';
import Landing from './landing/Landing';
import SignOutConfirmation from './SignOutConfirmation';

/** After the user clicks the "Signout" link in the NavBar, log them out and display this page. */
export default class Signout extends React.Component {
  render() {
    // swal({
    //   text: 'Are you sure you want to sign out?',
    //   buttons: {
    //     confirm: {
    //       text: 'Yes',
    //       value: true,
    //       visible: true,
    //     },
    //     cancel: {
    //       text: 'Cancel',
    //       value: false,
    //       visible: true,
    //     },
    //   },
    // }).then((val) => {
    //   if (val) {
    //     Meteor.logout();
    //   }
    // });
      return (
        <SignOutConfirmation/>
      );
    }
}
