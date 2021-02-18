import React from 'react';
import Highcharts from 'highcharts';
import HighchartsReact from 'highcharts-react-official';

/** A simple static component to render some boxes for the landing page. */

class LandingPageLineChart extends React.Component {
  constructor() {
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
            Math.random() * 3,
            Math.random() * 3,
            Math.random() * 3,
            Math.random() * 3,
            Math.random() * 3,
            Math.random() * 3,
            Math.random() * 3,
            Math.random() * 3,
            Math.random() * 3,
            Math.random() * 3,
            Math.random() * 3,
            Math.random() * 3,
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
          gridLineColor: '#444',
          floor: 0,
          ceiling: 100,
          title: {
            text: 'Emissions (tons)',
            style: {
              color: '#aaa',
              fontFamily: 'Roboto',
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
        <div>
          <HighchartsReact
              highcharts={Highcharts}
              options={this.state.chartOptions}
          />
        </div>
    );
  }
}

export default LandingPageLineChart;
