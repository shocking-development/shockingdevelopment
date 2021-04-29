import React, { Component } from 'react';
import { Dropdown, Modal, Button, Header, Icon, Grid, Segment, Label } from 'semantic-ui-react';
import { Meteor } from 'meteor/meteor';
// import Signout from './Signout';
import Signin from './Signin';
// import Landing from './landing/Landing';
// import { NavLink } from 'react-router-dom';

function exampleReducer(state, action) {
  switch (action.type) {
    case 'OPEN_MODAL':
      return {
        open: true,
        dimmer: action.dimmer,
      };
    case 'CLOSE_MODAL':
      return {
        log: [],
        open: false,
      };
    case 'LOG_OUT':
      return {
        logout: Meteor.logout(),
        render: <Signin/>,
        open: false,
      };
    default:
      throw new Error();
  }
}

function SignOutConfirmation() {
  const [state, dispatch] = React.useReducer(exampleReducer, {
    open: false,
    dimmer: undefined,
  });
  const { open, dimmer } = state;

  return (
      <div>
        <Dropdown.Item icon="sign out" text="Sign Out"
                       onClick={() => dispatch({
                         type: 'OPEN_MODAL',
                         dimmer: 'blurring',
                       })}>
          Sign Out
        </Dropdown.Item>

        <Modal basic size={'mini'} dimmer={dimmer}
               onOpen={(e) => dispatch({ event: e.type, type: 'OPEN_MODAL' })
               }
               onClose={(e) => dispatch({ event: e.type, type: 'CLOSE_MODAL' })
               }
               open={open}
            // trigger={}
        >
          <Modal.Header>Sign Out</Modal.Header>
          <Modal.Content>
            <p>Are you sure you want to sign out?</p>
          </Modal.Content>
          <Modal.Actions>
            <Button
                onClick={(e) => dispatch({
                  event: e.type,
                  name: 'onClick',
                  type: 'CLOSE_MODAL',
                })
                }
                negative
            >
              No
            </Button>
            <Button
                onClick={(e) => dispatch({
                  event: e.type,
                  name: 'onClick',
                  type: 'LOG_OUT',
                })
                }
                positive
            >
              Yes
            </Button>
          </Modal.Actions>
        </Modal>
      </div>
  );
}

//
// class SignOutConfirmation extends Component {
//   state = { open: false }
//
//   show = () => this.setState({ open: true });
//
//   handleConfirm = () => this.setState({
//     logout: Meteor.logout(),
//     return: <div as={NavLink} exact to="/signout"/>,
//     open: false,
//   });
//
//   handleCancel = () => this.setState({
//     return: <div as={NavLink} exact to="/home"/>,
//     open: false,
//   });
//
//   render() {
//     return (
//         <div>
//           <Modal basic trigger={<Dropdown.Item icon="sign out" text="Sign Out" open={this.state.open} basic size="small"/>} size={'mini'}>
//             <Header icon="sign out" content="Sign Out"/>
//             <Modal.Content>
//               <p>
//                 Are you sure you want to sign out?
//               </p>
//             </Modal.Content>
//             <Modal.Actions>
//               <Button basic color="red" inverted onCancel={this.handleCancel}>
//                 <Icon name="remove"/> No
//               </Button>
//               <Button color="green" inverted onConfirm={this.handleConfirm}>
//                 <Icon name="checkmark"/> Yes
//               </Button>
//             </Modal.Actions>
//           </Modal>
//         </div>
//     );
//   }
// }

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
