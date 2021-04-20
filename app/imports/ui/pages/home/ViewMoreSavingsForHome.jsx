import React from 'react';
import { Modal, Button, Header, Icon } from 'semantic-ui-react';
import { useTracker } from 'meteor/react-meteor-data';
import { UserEmissionData } from '../../components/defaultcharts/UserEmissionsData';
import TotalSavingsForMore from '../../components/defaultcharts/TotalSavingsForMore';

/* A simple static component to render the home page when users are logged in. */
function ViewMoreSavingsForHome() {

  const [open, setOpen] = React.useState(false);
  const { totalSavings } = useTracker(() => {
    const totalSavingsretrieved = UserEmissionData('totalSavings');
    return {
      totalSavings: totalSavingsretrieved,
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
            > <Icon name={'area graph'}/>View Your Savings Produced </Button></div>
            }
        >
          <Modal.Header style={{ fontFamily: 'Roboto', background: 'rgb(0 48 80)', color: 'white' }}> Your Savings
            For {currentYear} </Modal.Header>
          <Modal.Content style={{ fontFamily: 'Roboto', background: 'rgba(0, 73, 122, 1)', color: 'white' }}>
            <TotalSavingsForMore style={barGraphStyling}/>
            <Modal.Description style={{ fontFamily: 'Roboto', background: 'rgba(0, 73, 122, 1)', color: 'white' }}>
              <Header style={{ fontFamily: 'Roboto', color: 'white' }}>Money Saved</Header>
              <p>
                We&apos;ve found the following savings from your trips.
              </p>
              <p>
                You have saved ${totalSavings}0 .
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
export default ViewMoreSavingsForHome;
