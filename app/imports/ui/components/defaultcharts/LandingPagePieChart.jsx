import React from 'react';
import Highcharts from 'highcharts';
import HighchartsReact from 'highcharts-react-official';
import { PieChart } from '../../../api/graphData/PieChart';
import { Stuffs } from '../../../api/stuff/Stuff';
import StuffItem from '../StuffItem';

/** A simple static component to render some boxes for the landing page. */

class LandingPagePieChart extends React.Component {
  render() {
    let dataOne = PieChart.dataOne;
    let dataTwo = PieChart.dataTwo;
    const options = {
      title: {
        text: 'Modes of Travel Cummulative Total',
        style: {
          color: '#ccc',
          fontWeight: '300',
          fontFamily: 'Roboto',
        },
      },
      series: [{
        name: 'Modes of Travel',
        colorByPoint: true,
        data: [{
          name: dataOne[0],
          y: dataTwo[0],
          sliced: true,
          selected: true,
        }, {
          name: dataOne[0],
          y: 11,
        }, {
          name: dataOne[1],
          y: dataTwo[1],
        }, {
          name: dataOne[2],
          y: dataTwo[2],
        },
          {
            name: dataOne[3],
            y: dataTwo[3],
          },
          {
            name: dataOne[4],
            y: dataTwo[4],
          },
        ],
      }],
      chart: {
        type: 'pie',
        styledMode: false,
      },
      tooltip: {
        pointFormat: '{series.name}: <b>{point.percentage:.1f}%</b>',
      },
      accessibility: {
        point: {
          valueSuffix: '%',
        },
      },
      plotOptions: {
        pie: {
          allowPointSelect: true,
          cursor: 'pointer',
          dataLabels: {
            enabled: true,
            format: '<b>{point.name}</b>: {point.percentage:.1f} %',
            style: {
              textOverflow: 'ellipsis',
              textOutline: '0px',
              color: 'white',
            },
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

export default LandingPagePieChart;
