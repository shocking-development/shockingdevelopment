import React from 'react';
import Highcharts from 'highcharts';
import HighchartsReact from 'highcharts-react-official';
import { PieChart } from '../../../api/graphData/PieChart';

/** A simple static component to render some boxes for the landing page. */

class DataPagePieChart extends React.Component {

  render() {
    let dataOne = PieChart.dataOne;
    let dataTwo = PieChart.dataTwo;
    const options = {
      title: {
        text: '2021 Modes of Travel',
        style: {
          color: 'white',
          fontWeight: '300',
          fontFamily: 'sans-serif',
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
          name: dataOne[1],
          y: dataTwo[1],
        }, {
          name: dataOne[2],
          y: dataTwo[2],
        }, {
          name: dataOne[3],
          y: dataTwo[3],
        },
          {
            name: dataOne[4],
            y: dataTwo[4],
          },
          {
            name: dataOne[5],
            y: dataTwo[5],
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
          {dataOne[2]}
        </div>
    );
  }
}

export default DataPagePieChart;
