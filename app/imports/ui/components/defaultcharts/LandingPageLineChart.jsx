import React from 'react';
import Highcharts from 'highcharts';
import HighchartsReact from 'highcharts-react-official';
import { BarGraph } from '../../../api/graphData/BarGraph';
import { Stuffs } from '../../../api/stuff/Stuff';
import StuffItem from '../StuffItem';

/** A simple static component to render some boxes for the landing page. */

class LandingPageLineChart extends React.Component {

  constructor() {
    let dataOne = BarGraph.dataOne;
    let dataTwo = BarGraph.dataLandTwo;
    let dataThree = BarGraph.dataLandThree;
    super();
    this.state = {
      chartOptions: {
        series: [{
          name: '2020',
          data: [0, 1, 0, 2, 3, 5, 8, 5, 15, 14, 25, 54],
        }],
      },
    };
    setInterval(() => this.setState({
      chartOptions: {
        series: [{
          data: [
            dataOne[0] + Math.random() * 10,
            dataOne[1] + Math.random() * 10,
            dataOne[2] + Math.random() * 10,
            dataOne[3] + Math.random() * 10,
            dataOne[4] + Math.random() * 10,
            dataOne[5] + Math.random() * 10,
            dataOne[6] + Math.random() * 10,
            dataOne[7] + Math.random() * 10,
            dataOne[8] + Math.random() * 10,
            dataOne[9] + Math.random() * 10,
            dataOne[10] + Math.random() * 10,
            dataOne[11] + Math.random() * 10,
          ],
        }],
        chart: {
          styledMode: true,
          spacingTop: 20,
          spacingBottom: 20,
          spacingLeft: 20,
          spacingRight: 40,
        },
        title: {
          text: 'GHG Emissions Generated',
          style: {
            color: '#ccc',
            fontWeight: '300',
            fontFamily: 'Roboto',
          },
        },
        colors: ['#6AF9C4'],
        yAxis: {
          gridLineColor: '#ccc',
          floor: 0,
          ceiling: 100,
          title: {
            text: 'Emissions (tons)',
            style: {
              color: '#ccc',
              fontFamily: 'Roboto',
            },
          },
          labels: {
            style: {
              color: '#ccc',
            },
          },
        },
        xAxis: {
          gridLineColor: '#444',
          lineColor: '#444',
          categories: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'],
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
            verticalAlign: 'bottom',
          },
        },
      },
    }), 1500);
  }

  render() {

    return (
        <div id="linechart">
          <HighchartsReact
              highcharts={Highcharts}
              options={this.state.chartOptions}
          />
        </div>
    );
  }
}

export default LandingPageLineChart;
