import React from 'react';
import { Modal, Button, Header, Icon } from 'semantic-ui-react';
import { useTracker } from 'meteor/react-meteor-data';
import { UserEmissionData } from '../../components/defaultcharts/UserEmissionsData';
import TotalEmissionsProducedForMore from '../../components/defaultcharts/TotalEmissionsProducedForMore';
import { calculateGHG } from '../../../api/ghgEquations/ghgcalculation';

/* A simple static component to render the home page when users are logged in. */
function ViewMoreEmissionsForHome() {

  const [open, setOpen] = React.useState(false);
  const { totalEmissions, galSaved, totalReducedEmissions, totalSavings } = useTracker(() => {
    const totalEmissionsretrieved = UserEmissionData('totalEmissions'); // gets the id of the user
    const galSavedretrieved = UserEmissionData('totalGasSaved');
    const totalEmissionReducedretrieved = UserEmissionData('totalEmissionsReduced');
    const totalSavingsretrieved = UserEmissionData('totalSavings');

    return {
      totalEmissions: totalEmissionsretrieved,
      galSaved: galSavedretrieved,
      totalReducedEmissions: totalEmissionReducedretrieved,
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
            > <Icon name={'area graph'}/>View Your Emissions Produced </Button></div>
            }
        >
          <Modal.Header style={{ fontFamily: 'Roboto', background: 'rgb(0 48 80)', color: 'white' }}> Your Emissions
            For {currentYear} </Modal.Header>
          <Modal.Content style={{ fontFamily: 'Roboto', background: 'rgba(0, 73, 122, 1)', color: 'white' }}>
            <TotalEmissionsProducedForMore style={barGraphStyling}/>
            <Modal.Description style={{ fontFamily: 'Roboto', background: 'rgba(0, 73, 122, 1)', color: 'white' }}>
              <Header style={{ fontFamily: 'Roboto', color: 'white' }}>CO2 Emissions Produced</Header>
              <p>
                We&apos;ve found the following emissions from your trips.
              </p>
              <p>
                You have generated {totalEmissions} gallons of CO2 emissions.
              </p>
              <p>This is equivalent to the GHG emissions from {calculateGHG(totalEmissions)} passenger vehicles
                driven for one year.</p>
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
export default ViewMoreEmissionsForHome;
