import React from 'react';
import Highcharts from 'highcharts';
import HighchartsReact from 'highcharts-react-official';

// A simple static component to render some boxes for the the graph page.
class SavingsPageBarGraph extends React.Component {
  render() {

    // variable to hold the parameters for the graph.
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
        data: [25 + Math.random() * 20, 30 + Math.random() * 20],

      }, {
        color: 'yellow',
        name: 'Full Saved (Gallons)',
        data: [30 + Math.random() * 20, 10 + Math.random() * 20],

      }, {
        color: 'red',
        name: 'CO2 reduced (Pounds)',
        textColor: 'red',
        data: [20 + Math.random() * 20, 10 + Math.random() * 20],

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

    // return the graph.
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
