import React from 'react';
import { Grid, Segment, Statistic } from 'semantic-ui-react';
import { useTracker } from 'meteor/react-meteor-data';
import NavBarHome from '../../components/main-navbar/NavBarMain';
import Datapage from './Datapage';
import { UserEmissionData } from '../../components/defaultcharts/UserEmissionsData';
import { countLengthOfNumber } from '../../../api/emissionsEquations/EmissionsCalculations';
import ViewMoreEmissionsForHome from './ViewMoreEmissionsForHome';
import ViewMoreSavingsForHome from './ViewMoreSavingsForHome';
import ViewMoreEmissionsReducedForHome from './ViewMoreEmissionsReducedForHome';
import ViewMoreGasSaved from './ViewMoreGasSaved';

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
  */
  const checkforfirstIf = (((totalEmissions !== Infinity && typeof totalEmissions !== 'undefined')
      || (galSaved !== Infinity && typeof galSaved !== 'undefined') || (totalReducedEmissions !== Infinity && typeof
          totalReducedEmissions !== 'undefined')
      || (totalSavings !== Infinity && typeof totalSavings !== 'undefined')));

  if (checkforfirstIf) {
    return (
        <div style={pageStyle}>
          <NavBarHome/>
          <div style={divstyle}>
            <Grid stackable centered columns={4}>
              <Grid.Row centered>
                <Grid.Column className={'jello-horizontal'}>
                  <div align="center">

                    {numberOfDigitsInTotalSavings > 3 ?
                        <div>
                          <ViewMoreSavingsForHome/>
                        </div> : <Segment className={'grow'} circular style={square}> <Statistic inverted>
                          <Statistic.Value>${totalSavings}</Statistic.Value>
                          <Statistic.Label>saved</Statistic.Label>
                        </Statistic>
                        </Segment>
                    }

                  </div>
                </Grid.Column>

                <Grid.Column className={'jello-horizontal'}>
                  <div align="center">
                    {numberOfDigitsInTotalReducedEmissions > 3 ?
                        <div>
                          <ViewMoreEmissionsReducedForHome/>
                        </div> : <Segment className={'grow'} circular style={square}> <Statistic inverted>
                          <Statistic.Value>{totalReducedEmissions} lbs</Statistic.Value>
                          <Statistic.Label>GHG reduced</Statistic.Label>
                        </Statistic>
                        </Segment>
                    }
                  </div>
                </Grid.Column>

                <Grid.Column className={'jello-horizontal'}>
                  <div align="center">
                    {numberOfDigitsInGalSaved > 3 ?
                        <div>
                          <ViewMoreGasSaved/>
                        </div> : <Segment className={'grow'} circular style={square}> <Statistic inverted>
                          <Statistic.Value>{galSaved} gal</Statistic.Value>
                          <Statistic.Label>gas saved</Statistic.Label>
                        </Statistic> </Segment>
                    }
                  </div>

                </Grid.Column>

                <Grid.Column className={'jello-horizontal'}>
                  <div align="center">

                    {numberOfDigitsInTotalEmissions > 3 ?
                        <div>
                          <ViewMoreEmissionsForHome/>
                        </div> : <Segment className={'grow'} circular style={square}>
                          <Statistic inverted>
                            <Statistic.Value>{totalEmissions} lbs </Statistic.Value>
                            <Statistic.Label>of Emissions Produced</Statistic.Label>
                          </Statistic> </Segment>
                    }

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
