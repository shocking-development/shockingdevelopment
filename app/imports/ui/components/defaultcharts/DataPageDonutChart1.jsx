import React from 'react';
import Highcharts from 'highcharts';
import HighchartsReact from 'highcharts-react-official';
import { DonutGraph } from '../../../api/graphData/DonutGraph';
import { Stuffs } from '../../../api/stuff/Stuff';
import StuffItem from '../StuffItem';

/** A simple static component to render some boxes for the landing page. */

class DataPageDonutChart1 extends React.Component {
  render() {
    let options = {
      title: {
        text: 'Today&apos;s Choice of Travel',
        style: {
          color: 'white',
          fontWeight: '300',
          fontFamily: 'sans-serif',
        },
      },
      series: [{
        name: 'Transportation',
        data: DonutGraph.dataOne,
        size: '60%',
        innerSize: '20%',
        showInLegend: true,
        dataLabels: {
          enabled: false,
        },
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
          borderColor: '#58b3f3',
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
        <div >
          <HighchartsReact
              highcharts={Highcharts}
              options={options}
          />
        </div>
    );
  }
}

export default DataPageDonutChart1;
