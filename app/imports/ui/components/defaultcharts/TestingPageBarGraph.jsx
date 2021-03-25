import React from 'react';
import Highcharts from 'highcharts';
import HighchartsReact from 'highcharts-react-official';
import { tesing } from './TestinBarGraph';
import EmissionsCollection from '../../../api/emissions/EmissionsCollection';

/** A simple static component to render some boxes for the landing page. */
console.log(EmissionsCollection.miles + "You");
class TestingPageBarGraph extends React.Component {


  render() {

    let options = {
      title: {
        text: 'Your current car vs input',
        style: {
          color: 'black',
          fontWeight: '300',
          fontFamily: 'sans-serif',
        },
      },
      series: [{
        color: 'blue',
        name: 'Price (Thousands of Dollars)',
        data: [25, 63],

      }, {
        color: 'yellow',
        name: 'Full Saved (Gallons)',
        data: [80, 60 + Math.random() * 50],

      }, {
        color: 'red',
        name: 'CO2 reduced (Pounds)',
        textColor: 'red',
        data: [30, 60 + Math.random() * 50],

      }],
      chart: {
        type: 'column',
        styledMode: false,
      },
      xAxis: {
        gridLineColor: 'black',
        lineColor: 'black',
        labels: {
          style: {
            color: 'black',
          },
        },
        legend: {
          itemStyle: {
            color: 'black',
            fontWeight: 'bold',
          },
        },
        categories: [
          'Current Car',
          'Input',
        ],
        crosshair: true,
      },
      yAxis: {
        min: 0,
        gridLineColor: 'yellow',
        title: {
          style: {
            color: 'black',
          },
        },
        labels: {
          style: {

            color: 'black',
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
  }
}

export default TestingPageBarGraph;
