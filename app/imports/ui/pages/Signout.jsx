import React from 'react';
import { Button, Header, Icon, Modal } from 'semantic-ui-react';
import { Meteor } from 'meteor/meteor';
import Landing from './landing/Landing';

/** After the user clicks the "Signout" link in the NavBar, log them out and display this page. */

function ModalExampleBasic() {
  const [open, setOpen] = React.useState(false);
  const [signout] = React.useState(false);
  return (
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
            Would you like to sign out?
          </p>
        </Modal.Content>
        <Modal.Actions>
          <Button basic color='red' inverted onClick={() => setOpen(false)}>
            <Icon name='remove'/> Cancel
          </Button>
          <Button color='green' inverted onClick={() => setOpen(false)}>
            <Icon name='checkmark'/> Yes
          </Button>
        </Modal.Actions>
      </Modal>
  );
}

export default class Signout extends React.Component {

  render() {
    ModalExampleBasic();
    Meteor.logout(function () {
      return (
          <div id="signout-page">
            <Landing/>
          </div>
      );
    });
  }
}
