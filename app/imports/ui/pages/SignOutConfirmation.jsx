// import React, { Component } from 'react';
// import { Confirm, Dropdown } from 'semantic-ui-react';
// import { Meteor } from 'meteor/meteor';
// import Landing from './landing/Landing';
//
// class SignOutConfirmation extends Component {
//   state = { open: false }
//
//   show = () => this.setState({ open: true });
//
//   handleConfirm = () => this.setState({ result:
//       <div id="signout-page">
//         <Landing/>
//       </div>,
//     logout: Meteor.logout(),
//     open: false });
//
//   handleCancel = () => this.setState({ result:
//         <div id="home">
//           <home/>
//         </div>,
//     open: false });
//
//   render() {
//     return (
//         <div>
//           <Dropdown.Menu>
//             <Dropdown.Item icon="sign out" text="Sign Out" onClick={this.show}/>
//           </Dropdown.Menu>
//           <Confirm
//               open={this.state.open}
//               header='This is a custom header'
//               onCancel={this.handleCancel}
//               onConfirm={this.handleConfirm}
//           />
//         </div>
//     );
//   }
// }
//
// export default SignOutConfirmation;
import React from 'react';
import { Button, Header, Icon, Modal } from 'semantic-ui-react';
import NavBarHome from '../../components/main-navbar/NavBarMain';

function SignOutConfirmation() {
  const pageStyle = {
    background: '#001947',
    minHeight: '110vh',
    width: '100%',
  };
  const [open, setOpen] = React.useState(false);

  return (
      <div style={pageStyle}>
        <NavBarHome/>
        <Modal
            basic
            onClose={() => setOpen(false)}
            onOpen={() => setOpen(true)}
            open={open}
            size='small'
            trigger={<Button>Basic Modal</Button>}
        >
          <Header icon>
            <Icon name='archive'/>
            Archive Old Messages
          </Header>
          <Modal.Content>
            <p>
              Your inbox is getting full, would you like us to enable automatic
              archiving of old messages?
            </p>
          </Modal.Content>
          <Modal.Actions>
            <Button basic color='red' inverted onClick={() => setOpen(false)}>
              <Icon name='remove'/> No
            </Button>
            <Button color='green' inverted onClick={() => setOpen(false)}>
              <Icon name='checkmark'/> Yes
            </Button>
          </Modal.Actions>
        </Modal>
      </div>
  );
}

export default SignOutConfirmation;
