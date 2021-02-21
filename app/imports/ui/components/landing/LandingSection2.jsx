import React from 'react';
import { Statistic, Grid, Header, Button } from 'semantic-ui-react';
import { NavLink } from 'react-router-dom';
import LandingPageLineChart from '../defaultcharts/LandingPageLineChart';
import LandingPageBarGraph from '../defaultcharts/LandingPageBarGraph';
import LandingPagePieChart from '../defaultcharts/LandingPagePieChart';

/** A simple static component to render some statistics for the landing page. */
class LandingSection2 extends React.Component {
  render() {

    return (
        <div style={{ background: '#001947' }}>
          <Statistic.Group widths='three' style={{ padding: '5em' }}>
            <Statistic inverted>
              <Statistic.Value>1,550</Statistic.Value>
              <Statistic.Label>Users</Statistic.Label>
            </Statistic>
            <Statistic inverted>
              <Statistic.Value>$31,200</Statistic.Value>
              <Statistic.Label>Saved</Statistic.Label>
            </Statistic>
            <Statistic inverted>
              <Statistic.Value>22,000</Statistic.Value>
              <Statistic.Label>Gallons Saved</Statistic.Label>
            </Statistic>
          </Statistic.Group>
          <Grid stackable columns='equal'>
            <Grid.Row style={{
              background: 'linear-gradient(' +
                  '-225deg, rgba(8,0,96,1) 0%, rgba(4,62,107,1) 37%, rgba(0,124,118,1) 100%)',
            }}>
              <div style={{ color: 'white', margin: 'auto' }}>
                <Header className='body' as='h1' style={{ color: 'white' }}> Track your GHG emissions </Header>
                <p className='body'
                   style={{
                     fontFamily: 'sans-serif',
                     color: 'white',
                     fontSize: '20px',
                     fontWeight: 'lighter',
                   }}>
                  Find out how much GHG emisions you generate and learn of efficient alternatives.
                </p>
                <Button className="ui blue circular button"
                        style={{ fontSize: '16px' }}
                        as={NavLink} exact
                        to="/signup">
                  Start Tracking
                </Button>
              </div>
              <div style={{ paddingRight: '1em' }}>
                <LandingPageLineChart/>
              </div>
            </Grid.Row>
          </Grid>
          <Grid stackable columns='equal' style={{ paddingBottom: '3%', paddingTop: '3%' }}>
            <div style={{ margin: 'auto', paddingLeft: '3%' }}>
              <Header
                  className='body'
                  as='h1'
                  style={{ color: 'white' }}>
                Community Data
              </Header>
              <p style={{ fontFamily: 'sans-serif', color: 'white', fontSize: '20px', fontWeight: 'lighter' }}>
                View the environmental impact of the community.
              </p>
            </div>
            <Grid.Column>
              <LandingPageBarGraph/>
            </Grid.Column>
            <Grid.Column>
              <div style={{ paddingRight: '2em' }}>
                <LandingPagePieChart/>
              </div>
            </Grid.Column>
          </Grid>
        </div>
    );
  }
}

export default LandingSection2;
