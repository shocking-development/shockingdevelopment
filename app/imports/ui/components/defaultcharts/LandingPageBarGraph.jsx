import React from 'react';
import Highcharts from 'highcharts';
import HighchartsReact from 'highcharts-react-official';
import { cumulativeEmissionsData } from './cumulativeEmissionsData';
/** A simple static component to render some boxes for the landing page. */

function LandingPageBarGraph() {

  const options = {
    title: {
      text: 'Environmental Benefits Cumulative Total',
      style: {
        color: '#ccc',
        fontWeight: '300',
        fontFamily: 'Roboto',
      },
    },
    series: [{
      name: 'VMT',
      data: cumulativeEmissionsData('DataMiles'),

    }, {
      name: 'Fuel Gallons Saved (Gallons)',
      data: cumulativeEmissionsData('gallonsofgasbymonth'),

    }, {
      name: 'CO2 reduced (Pounds)',
      data: cumulativeEmissionsData('EmissionsByMonth'),

    }, {
      name: 'Money Saved',
      data: cumulativeEmissionsData('savingsCumulative'),

    },
    ],
    chart: {
      type: 'column',
      styledMode: false,
    },
    xAxis: {
      gridLineColor: '#444',
      lineColor: '#444',
      labels: {
        style: {
          color: '#ccc',
        },
      },
      legend: {
        itemStyle: {
          color: '#ccc',
          fontWeight: 'bold',
        },
      },
      categories: cumulativeEmissionsData('DateRecorded'),
      crosshair: true,
    },
    yAxis: {
      min: 0,
      gridLineColor: '#444',
      title: {
        style: {
          color: '#011947',
        },
      },
    },
  };

  return (
      <div>
        <HighchartsReact
            highcharts={Highcharts}
            options={options}
        />
      </div>
  );

} export default LandingPageBarGraph;
