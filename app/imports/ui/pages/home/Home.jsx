import React from 'react';
import { Grid, Segment, Statistic } from 'semantic-ui-react';
import NavBarHome from '../../components/main-navbar/NavBarMain';
import Datapage from './Datapage';
import { UserEmissionData } from '../../components/defaultcharts/UserEmissionsData';

/** A simple static component to render the home page when users are logged in. */
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

    const totalEmissions = UserEmissionData('totalEmissions');
    // for debugging console.log(totalEmissions);

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
                      <Statistic.Value>$20</Statistic.Value>
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
                      <Statistic.Value>5 lbs</Statistic.Value>
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
                      <Statistic.Value>1 gal</Statistic.Value>
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
                      <Statistic.Value>  {totalEmissions} lbs </Statistic.Value>
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

/** Enable ReactRouter for this component. https://reacttraining.com/react-router/web/api/withRouter */
export default Home;
