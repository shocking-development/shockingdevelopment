import React from 'react';
import Highcharts from 'highcharts';
import HighchartsReact from 'highcharts-react-official';

export function GraphOptions(data1, data2) {
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
      name: 'Price of Gas (Dollars)',
      borderColor: 'transparent',
      data: [data1 * 4.17, data2 * 4.17],

    }, {
      color: '#b5cc18',
      name: 'Full Use (Gallons)',
      borderColor: 'transparent',
      data: [data1, data2],

    }, {
      color: '#f15d80',
      name: 'CO2 reduced (Pounds)',
      textColor: 'red',
      borderColor: 'transparent',
      data: [data1 * 5.22, data2 * 5.22],

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

  return (
      <div>
        <HighchartsReact
            highcharts={Highcharts}
            options={options}
        />
      </div>
  );

}
// A simple static component to render some boxes for the the graph page.
function SavingsPageBarGraph(data1, data2) {
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
      data: [data1 * 1.3, data2 * 1.3],

    }, {
      color: '#b5cc18',
      name: 'Full Saved (Gallons)',
      borderColor: 'transparent',
      data: [data1 * 0.2, data2 * 0.2],

    }, {
      color: '#f15d80',
      name: 'CO2 reduced (Pounds)',
      textColor: 'red',
      borderColor: 'transparent',
      data: [data1 * 0.9, data2 * 0.9],

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

export default SavingsPageBarGraph;
