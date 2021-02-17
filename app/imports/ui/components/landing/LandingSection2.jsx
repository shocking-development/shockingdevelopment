import React from 'react';
import { Statistic } from 'semantic-ui-react';

/** A simple static component to render some statistics for the landing page. */
class LandingSection2 extends React.Component {
  render() {

    return (
        <div style={{ background: '#001947' }}>
          <Statistic.Group widths='three' style={{ padding: '5em' }}>
            <Statistic inverted>
              <Statistic.Value>22</Statistic.Value>
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
        </div>
    );
  }
}

export default LandingSection2;
