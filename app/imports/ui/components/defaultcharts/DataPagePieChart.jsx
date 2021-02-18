import React from 'react';
import Highcharts from 'highcharts';
import HighchartsReact from 'highcharts-react-official';

/** A simple static component to render some boxes for the landing page. */

class DataPagePieChart extends React.Component {
  render() {
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
          name: 'TeleWork',
          y: 61,
          sliced: true,
          selected: true,
        }, {
          name: 'Carpool',
          y: 11,
        }, {
          name: 'Electrical Vehical',
          y: 10,
        }, {
          name: 'Public Transportation',
          y: 4.67,
        },
          {
            name: 'Biking',
            y: 2.67,
          },
          {
            name: 'Walking',
            y: 2.67,
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

export default DataPagePieChart;
