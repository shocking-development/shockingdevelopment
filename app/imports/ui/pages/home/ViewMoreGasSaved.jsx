import React from 'react';
import { Modal, Button, Header, Icon } from 'semantic-ui-react';
import { useTracker } from 'meteor/react-meteor-data';
import { UserEmissionData } from '../../components/defaultcharts/UserEmissionsData';
import TotalGasSavedForMore from '../../components/defaultcharts/TotalGasSavedForMore';

/* A simple static component to render the home page when users are logged in. */
function ViewMoreGasSaved() {

  const [open, setOpen] = React.useState(false);
  const { galSaved } = useTracker(() => {
    const galSavedretrieved = UserEmissionData('totalGasSaved');
    return {
      galSaved: galSavedretrieved,
    };
  });

  const currentDate = new Date();
  const currentYear = currentDate.getFullYear();

  const barGraphStyling = {
    background: 'rgba(0, 73, 122, 1)',
    borderRadius: '6px',
    paddingTop: '10px',
    paddingRight: '10px',
    position: 'relative',
    left: '10px',
    height: '100%',
    width: '24%',
  };

  const square = { width: 230, height: 230, fontSize: '19px', fontWeight: '100' };

  return (
      <div>
        <Modal
            onClose={() => setOpen(false)}
            onOpen={() => setOpen(true)}
            open={open}
            trigger={<div className={'grow'}><Button
                circular color='blue'
                style={square}
            > <Icon name={'area graph'}/>View Your Gas Savings </Button></div>
            }
        >
          <Modal.Header style={{ fontFamily: 'Roboto', background: 'rgb(0 48 80)', color: 'white' }}> Your Gas Savings
            For {currentYear} </Modal.Header>
          <Modal.Content style={{ fontFamily: 'Roboto', background: 'rgba(0, 73, 122, 1)', color: 'white' }}>
            <TotalGasSavedForMore style={barGraphStyling}/>
            <Modal.Description style={{ fontFamily: 'Roboto', background: 'rgba(0, 73, 122, 1)', color: 'white' }}>
              <Header style={{ fontFamily: 'Roboto', color: 'white' }}>Gallons of Gas Saved</Header>
              <p>
                We&apos;ve found the following gallons of gas saved from your trips.
              </p>
              <p>
                You have saved {galSaved} gallons of gas.
              </p>
            </Modal.Description>
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
export default ViewMoreGasSaved;
