import React from 'react';
import { Statistic } from 'semantic-ui-react';
import { cumulativeEmissionsData } from '../defaultcharts/cumulativeEmissionsData';

/** A simple static component to render some statistics for the landing page. */
function LandingSectionStatistics() {

  const savings = cumulativeEmissionsData('totalSavings');
  const gasSaved = cumulativeEmissionsData('totalGasSaved');

    return (
        <div id="saved" style={{ background: '#001947' }}>

          <Statistic.Group widths='three' style={{ padding: '5em' }}>
            <Statistic inverted>
              <Statistic.Value>1,550</Statistic.Value>
              <Statistic.Label>Users</Statistic.Label>
            </Statistic>
            <Statistic inverted>
              <Statistic.Value>${savings}</Statistic.Value>
              <Statistic.Label>Saved</Statistic.Label>
            </Statistic>
            <Statistic inverted>
              <Statistic.Value>{gasSaved}</Statistic.Value>
              <Statistic.Label>Gallons Saved</Statistic.Label>
            </Statistic>
          </Statistic.Group>

        </div>
    );

}

export default LandingSectionStatistics;
