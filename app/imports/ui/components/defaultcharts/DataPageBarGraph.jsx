import React from 'react';
import Highcharts from 'highcharts';
import HighchartsReact from 'highcharts-react-official';
import { BarGraph } from '../../../api/graphData/BarGraph';

/** A simple static component to render some boxes for the landing page. */

class DataPageBarGraph extends React.Component {
  render() {
    const options = {
      title: {
        text: 'Your 2021 Environmental Benefits Cummulative Total',
        style: {
          color: 'white',
          fontWeight: '300',
          fontFamily: 'sans-serif',
        },
      },
      series: [{
        name: 'VMT saved (Miles)',
        data: [49.9, 71.5, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],

      }, {
        name: 'Fuel Gallons Saved (Gallons)',
        data: [83.6, 78.8, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],

      }, {
        name: 'CO2 reduced (Pounds)',
        data: [48.9, 38.8, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],

      }],
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
        categories: [
          'Jan',
          'Feb',
          'Mar',
          'Apr',
          'May',
          'Jun',
          'Jul',
          'Aug',
          'Sep',
          'Oct',
          'Nov',
          'Dec',
        ],
        crosshair: true,
      },
      yAxis: {
        min: 0,
        gridLineColor: 'white',
        title: {
          style: {
            color: 'white',
          },
        },
        labels: {
          style: {
            color: '#ccc',
          },
        },
      },
    };


    let dataOne = BarGraph.dataOne;
    let dataTwo = BarGraph.dataTwo;
    let dataThree = BarGraph.dataThree;

    let optionsLet = {

      title: {
        text: 'Your 2021 Environmental Benefits Cummulative Total',
        style: {
          color: 'white',
          fontWeight: '300',
          fontFamily: 'sans-serif',
        },
      },
      series: [{
        name: 'VMT saved (Miles)',
        data: dataOne,

      }, {
        name: 'Fuel Gallons Saved (Gallons)',
        data: dataTwo,

      }, {
        name: 'CO2 reduced (Pounds)',
        data: dataThree,

      }],
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
        categories: [
          'Jan',
          'Feb',
          'Mar',
          'Apr',
          'May',
          'Jun',
          'Jul',
          'Aug',
          'Sep',
          'Oct',
          'Nov',
          'Dec',
        ],
        crosshair: true,
      },
      yAxis: {
        min: 0,
        gridLineColor: 'white',
        title: {
          style: {
            color: 'white',
          },
        },
        labels: {
          style: {
            color: '#ccc',
          },
        },
      },
    };

    return (

        <div>
          <HighchartsReact
              highcharts={Highcharts}
              options={optionsLet}
          />
        </div>
    );
  }
}

export default DataPageBarGraph;
