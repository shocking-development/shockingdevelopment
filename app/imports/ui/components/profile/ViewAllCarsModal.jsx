import React from 'react';
import { Modal, Button, Icon } from 'semantic-ui-react';
import ViewAllCars from './ViewAllCars';

/* A simple static component to render the home page when users are logged in. */
function ViewMoreEmissionsForHome() {

  const [open, setOpen] = React.useState(false);

  return (
      <div>
        <Modal
            onClose={() => setOpen(false)}
            onOpen={() => setOpen(true)}
            open={open}
            trigger={<Button
                className={'editButtonProfile'}
                color='blue'
                style={{ width: '177px', height: '38px' }}
            > <Button.Content style={{ width: '154px', height: '38px' }} >
              <Icon name={'car'}/> View All your Cars
            </Button.Content>
            </Button>
            }
        >
          <Modal.Header style={{ fontFamily: 'Roboto', background: 'rgb(0 48 80)', color: 'white' }}> Your
            Cars </Modal.Header>
          <Modal.Content style={{ fontFamily: 'Roboto', background: 'rgba(0, 73, 122, 1)', color: 'white' }}>
            <ViewAllCars/>
          </Modal.Content>
          <Modal.Actions style={{ background: 'rgb(0 48 80)' }}>
            <Button
                content="Done"
                labelPosition='right'
                icon='checkmark'
                onClick={() => setOpen(false)}
                positive
                circular
            />
          </Modal.Actions>
        </Modal>

      </div>
  );
}

/* Enable ReactRouter for this component. https://reacttraining.com/react-router/web/api/withRouter */
export default ViewMoreEmissionsForHome;
