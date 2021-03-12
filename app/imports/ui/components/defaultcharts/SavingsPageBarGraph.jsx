import React from 'react';
import Highcharts from 'highcharts';
import HighchartsReact from 'highcharts-react-official';
import { BarGraph } from '../../../api/graphData/BarGraph';
import { Stuffs } from '../../../api/stuff/Stuff';
import StuffItem from '../StuffItem';

/** A simple static component to render some boxes for the landing page. */

class SavingsPageBarGraph extends React.Component {
  render() {

    const options = {
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
        //data: [25, 63.6],
        data: BarGraph.dataSavings[0],

      }, {
        color: 'yellow',
        name: 'Full Saved (Gallons)',
        data: BarGraph.dataSavings[1],

      }, {
        color: 'red',
        name: 'CO2 reduced (Pounds)',
        textColor: 'red',
        data: BarGraph.dataSavings[2],

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

export default SavingsPageBarGraph;
