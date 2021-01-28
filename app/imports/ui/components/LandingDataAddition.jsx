import React from 'react';
import { Image, Statistic } from 'semantic-ui-react';

/** The Footer appears at the bottom of every page. Rendered by the App Layout component. */
class LandingDataAddition extends React.Component {
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

export default LandingDataAddition;
