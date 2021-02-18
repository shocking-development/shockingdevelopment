import React from 'react';
import { Statistic, Grid } from 'semantic-ui-react';
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
            <Grid.Column><LandingPageLineChart/></Grid.Column>
            <Grid.Column><LandingPageBarGraph/></Grid.Column>
            <Grid.Column><LandingPagePieChart/></Grid.Column>
          </Grid>
        </div>
    );
  }
}

export default LandingSection2;
