import React from 'react';
import Highcharts from 'highcharts';
import HighchartsReact from 'highcharts-react-official';
import { BarGraph } from '../../../api/graphData/BarGraph';
import { Stuffs } from '../../../api/stuff/Stuff';
import StuffItem from '../StuffItem';

/** A simple static component to render some boxes for the landing page. */

class LandingPageBarGraph extends React.Component {
  render() {

    let dataOne = BarGraph.dataLandOne;
    let dataTwo = BarGraph.dataLandTwo;
    let dataThree = BarGraph.dataLandThree;
    const options = {
      title: {
        text: 'Environmental Benefits Cummulative Total',
        style: {
          color: '#ccc',
          fontWeight: '300',
          fontFamily: 'Roboto',
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
  }
}

export default LandingPageBarGraph;
