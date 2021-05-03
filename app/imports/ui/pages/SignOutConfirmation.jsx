import React from 'react';
import { Modal, Button, Icon, Menu } from 'semantic-ui-react';
import { Meteor } from 'meteor/meteor';
import { NavLink } from 'react-router-dom';
import Landing from './landing/Landing';

function Reducer(state, action) {

  switch (action.type) {
    case 'OPEN_MODAL':
      return {
        open: true,
        dimmer: action.dimmer,
      };
    case 'CLOSE_MODAL':
      return {
        open: false,
      };
    case 'LOG_OUT':
      return {
        logout: Meteor.logout(),
        open: false,
      };
    default:
      throw new Error();
  }
}

function SignOutConfirmation() {

  const [state, dispatch] = React.useReducer(Reducer, {
    open: false,
    dimmer: undefined,
    return: <div id="signout-page">
      <Landing/>
    </div>,
  });
  const { open, dimmer } = state;

  return (
      <div>
        <Menu.Item text="Sign Out"
                   onClick={() => dispatch({
                     type: 'OPEN_MODAL',
                     dimmer: 'blurring',
                   })}>
          <Icon name='sign-out' size='large'/>
          Sign Out
        </Menu.Item>

        <Modal basic size={'mini'} dimmer={dimmer}
               onOpen={(e) => dispatch({ event: e.type, type: 'OPEN_MODAL' })
               }
               onClose={(e) => dispatch({ event: e.type, type: 'CLOSE_MODAL' })
               }
               open={open}
            // trigger={}
        >
          <Modal.Header>
            <Icon name='sign-out'/>
            Sign Out</Modal.Header>
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
                as={NavLink} activeClassName="active" exact to="/signout">
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
