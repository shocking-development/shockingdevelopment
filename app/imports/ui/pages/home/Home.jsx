import React from 'react';
import { Grid, Segment, Statistic, Modal, Button, Image, Header } from 'semantic-ui-react';
import { useTracker } from 'meteor/react-meteor-data';
import NavBarHome from '../../components/main-navbar/NavBarMain';
import Datapage from './Datapage';
import { UserEmissionData } from '../../components/defaultcharts/UserEmissionsData';
import { countLengthOfNumber } from '../../../api/emissionsEquations/EmissionsCalculations';

/* A simple static component to render the home page when users are logged in. */
function Home() {

  const square = { width: 230, height: 230 };
  const pageStyle = {
    background: '#001947',
    minHeight: '110vh',
    width: '100%',
  };
  const divstyle = {
    paddingLeft: '15%',
    paddingTop: '3%',
    paddingRight: '2%',
    background: '#001947',
    width: '100vw',
  };

  const [open, setOpen] = React.useState(false);

  const {
    totalEmissions, galSaved, totalReducedEmissions, totalSavings,
    numberOfDigitsInTotalEmissions, numberOfDigitsInGalSaved,
    numberOfDigitsInTotalReducedEmissions, numberOfDigitsInTotalSavings,
  } = useTracker(() => {
    const totalEmissionsretrieved = UserEmissionData('totalEmissions'); // gets the id of the user
    const galSavedretrieved = UserEmissionData('totalGasSaved');
    const totalEmissionReducedretrieved = UserEmissionData('totalEmissionsReduced');
    const totalSavingsretrieved = UserEmissionData('totalSavings');
    const numberOfDigitsInTotalEmissions1 = countLengthOfNumber(Number(totalEmissionsretrieved));
    const numberOfDigitsInGalSaved1 = countLengthOfNumber(Number(galSavedretrieved));
    const numberOfDigitsInTotalReducedEmissions1 = countLengthOfNumber(Number(totalEmissionReducedretrieved));
    const numberOfDigitsInTotalSavings1 = countLengthOfNumber(Number(totalSavingsretrieved));

    return {
      totalEmissions: totalEmissionsretrieved,
      galSaved: galSavedretrieved,
      totalReducedEmissions: totalEmissionReducedretrieved,
      totalSavings: totalSavingsretrieved,
      numberOfDigitsInTotalEmissions: numberOfDigitsInTotalEmissions1,
      numberOfDigitsInGalSaved: numberOfDigitsInGalSaved1,
      numberOfDigitsInTotalReducedEmissions: numberOfDigitsInTotalReducedEmissions1,
      numberOfDigitsInTotalSavings: numberOfDigitsInTotalSavings1,
    };
  });

  /*
  * checkforfirstIf checks if the values are gotten e.g. they dont equal infinity or are undefined we also
  * check the number of digits in total emissions and if they are larger then we need to put a view more
  * in the bubble
  */
  const checkfornumberOfDigitsInTotalEmissions = (((totalEmissions !== Infinity && typeof totalEmissions !== 'undefined')
      || (galSaved !== Infinity && typeof galSaved !== 'undefined') || (totalReducedEmissions !== Infinity && typeof
          totalReducedEmissions !== 'undefined')
      || (totalSavings !== Infinity && typeof totalSavings !== 'undefined')) && numberOfDigitsInTotalEmissions <= 3);

  if (checkfornumberOfDigitsInTotalEmissions) {
    return (
        <div style={pageStyle}>
          <NavBarHome/>
          <div style={divstyle}>
            <Grid stackable centered columns={4}>
              <Grid.Row centered>
                <Grid.Column className={'jello-horizontal'}>
                  <div align="center">
                    <Segment className={'grow'} circular style={square}>
                      <Statistic inverted>
                        <Statistic.Value>${totalSavings}</Statistic.Value>
                        <Statistic.Label>saved</Statistic.Label>
                      </Statistic>
                    </Segment>
                  </div>
                </Grid.Column>

                <Grid.Column className={'jello-horizontal'}>
                  <div align="center">
                    <Segment className={'grow'} circular style={square}>
                      <Statistic inverted>
                        <Statistic.Value>{totalReducedEmissions} lbs</Statistic.Value>
                        <Statistic.Label>GHG reduced</Statistic.Label>
                      </Statistic>
                    </Segment>
                  </div>
                </Grid.Column>

                <Grid.Column className={'jello-horizontal'}>
                  <div align="center">
                    <Segment className={'grow'} circular style={square}>
                      <Statistic inverted>
                        <Statistic.Value>{galSaved} gal</Statistic.Value>
                        <Statistic.Label>gas saved</Statistic.Label>
                      </Statistic>
                    </Segment>
                  </div>

                </Grid.Column>

                <Grid.Column className={'jello-horizontal'}>
                  <div align="center">
                    <Segment className={'grow'} circular style={square}>
                      <Statistic inverted>
                        <Statistic.Value>{totalEmissions} lbs </Statistic.Value>
                        <Statistic.Label>of Emissions Produced</Statistic.Label>
                      </Statistic>
                    </Segment>
                  </div>

                </Grid.Column>

              </Grid.Row>
            </Grid>
            <Datapage/>
          </div>
        </div>
    );
  }
  if (!checkfornumberOfDigitsInTotalEmissions) {
    return (
        <div style={pageStyle}>
          <NavBarHome/>
          <div style={divstyle}>
            <Modal
                onClose={() => setOpen(false)}
                onOpen={() => setOpen(true)}
                open={open}
                trigger={<Button>Show Modal</Button>}
            >
              <Modal.Header>Select a Photo</Modal.Header>
              <Modal.Content image>
                <Image size='medium' src='/images/avatar/large/rachel.png' wrapped/>
                <Modal.Description>
                  <Header>Default Profile Image</Header>
                  <p>
                    We've found the following gravatar image associated with your e-mail
                    address.
                  </p>
                  <p>Is it okay to use this photo?</p>
                </Modal.Description>
              </Modal.Content>
              <Modal.Actions>
                <Button color='black' onClick={() => setOpen(false)}>
                  Nope
                </Button>
                <Button
                    content="Yep, that's me"
                    labelPosition='right'
                    icon='checkmark'
                    onClick={() => setOpen(false)}
                    positive
                />
              </Modal.Actions>
            </Modal>

            <Grid stackable centered columns={4}>
              <Grid.Row centered>
                <Grid.Column className={'jello-horizontal'}>
                  <div align="center">
                    <Segment className={'grow'} circular style={square}>
                      <Statistic inverted>
                        <Statistic.Value>${totalSavings}</Statistic.Value>
                        <Statistic.Label>saved</Statistic.Label>
                      </Statistic>
                    </Segment>
                  </div>
                </Grid.Column>

                <Grid.Column className={'jello-horizontal'}>
                  <div align="center">
                    <Segment className={'grow'} circular style={square}>
                      <Statistic inverted>
                        <Statistic.Value>{totalReducedEmissions} lbs</Statistic.Value>
                        <Statistic.Label>GHG reduced</Statistic.Label>
                      </Statistic>
                    </Segment>
                  </div>
                </Grid.Column>

                <Grid.Column className={'jello-horizontal'}>
                  <div align="center">
                    <Segment className={'grow'} circular style={square}>
                      <Statistic inverted>
                        <Statistic.Value>{galSaved} gal</Statistic.Value>
                        <Statistic.Label>gas saved</Statistic.Label>
                      </Statistic>
                    </Segment>
                  </div>

                </Grid.Column>

                <Grid.Column className={'jello-horizontal'}>
                  <div align="center">
                    <Segment className={'grow'} circular style={square}>
                      <Statistic inverted>
                        <Statistic.Value>{totalEmissions} lbs </Statistic.Value>
                        <Statistic.Label>of Emissions Produced</Statistic.Label>
                      </Statistic>
                    </Segment>
                  </div>

                </Grid.Column>

              </Grid.Row>
            </Grid>
            <Datapage/>
          </div>
        </div>
    );
  }
  return (
      <div style={pageStyle}>
        <NavBarHome/>
        <div style={divstyle}>
          <Grid stackable centered columns={4}>
            <Grid.Row centered>
              <Grid.Column className={'jello-horizontal'}>
                <div align="center">
                  <Segment className={'grow'} circular style={square}>
                    <Statistic inverted>
                      {/* Needs to be filled with actual data. */}
                      <Statistic.Value>$0</Statistic.Value>
                      <Statistic.Label>saved</Statistic.Label>
                    </Statistic>
                  </Segment>
                </div>
              </Grid.Column>

              <Grid.Column className={'jello-horizontal'}>
                <div align="center">
                  <Segment className={'grow'} circular style={square}>
                    <Statistic inverted>
                      {/* Needs to be filled with actual data. */}
                      <Statistic.Value>0 lbs</Statistic.Value>
                      <Statistic.Label>GHG reduced</Statistic.Label>
                    </Statistic>
                  </Segment>
                </div>
              </Grid.Column>

              <Grid.Column className={'jello-horizontal'}>
                <div align="center">
                  <Segment className={'grow'} circular style={square}>
                    <Statistic inverted>
                      {/* Needs to be filled with actual data. */}
                      <Statistic.Value>0 gal</Statistic.Value>
                      <Statistic.Label>gas saved</Statistic.Label>
                    </Statistic>
                  </Segment>
                </div>

              </Grid.Column>

              <Grid.Column className={'jello-horizontal'}>
                <div align="center">
                  <Segment className={'grow'} circular style={square}>
                    <Statistic inverted>
                      {/* Needs to be filled with actual data. */}
                      <Statistic.Value> 0 lbs </Statistic.Value>
                      <Statistic.Label>of Emissions Produced</Statistic.Label>
                    </Statistic>
                  </Segment>
                </div>

              </Grid.Column>

            </Grid.Row>
          </Grid>
          <Datapage/>
        </div>
      </div>
  );

}

/* Enable ReactRouter for this component. https://reacttraining.com/react-router/web/api/withRouter */
export default Home;
