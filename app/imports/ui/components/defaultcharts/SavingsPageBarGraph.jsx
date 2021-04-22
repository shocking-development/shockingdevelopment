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
          color: 'white',
          fontWeight: '300',
          fontFamily: 'sans-serif',
        },
      },
      series: [{
        color: '#8086e8',
        name: 'Price (Thousands of Dollars)',
        borderColor: 'transparent',
        data: [25 + Math.random() * 20, 30 + Math.random() * 20],

      }, {
        color: '#b5cc18',
        name: 'Full Saved (Gallons)',
        borderColor: 'transparent',
        data: [30 + Math.random() * 20, 10 + Math.random() * 20],

      }, {
        color: '#f15d80',
        name: 'CO2 reduced (Pounds)',
        textColor: 'red',
        borderColor: 'transparent',
        data: [20 + Math.random() * 20, 10 + Math.random() * 20],

      }],
      chart: {
        type: 'column',
        styledMode: false,

      },
      xAxis: {
        gridLineColor: 'white',
        lineColor: 'white',
        labels: {
          style: {
            color: 'white',
          },
        },
        legend: {
          itemStyle: {
            color: 'white',
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
            color: 'white',
          },
        },
        labels: {
          style: {
            color: 'white',
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
