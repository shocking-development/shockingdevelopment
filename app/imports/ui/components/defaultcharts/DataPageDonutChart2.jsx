import React from 'react';
import Highcharts from 'highcharts';
import HighchartsReact from 'highcharts-react-official';

class DataPageDonutChart1 extends React.Component {
  render() {
    const options = {
      title: {
        text: 'This Week&apos;s Emissions',
        style: {
          color: 'white',
          fontWeight: '300',
          fontFamily: 'sans-serif',
        },
      },
      colors: ['#058DC7', '#50B432', '#ED561B', '#DDDF00', '#24CBE5', '#64E572', '#FF9655', '#FFF263', '#6AF9C4'],
      series: [{
        name: 'GHG emisions',
        data: [['Tuesday', 6], ['Monday', 2], ['Wednesday', 3]],
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
        <div>
          <HighchartsReact
              highcharts={Highcharts}
              options={options}
          />
          <h1 style={{
            position: 'relative',
            left: '90%',
            bottom: '46vh',
          }}><a style={{
            color: '#45efe7',
          }} href={'#/add'}> + </a></h1>

        </div>
    );
  }
}

export default DataPageDonutChart1;
