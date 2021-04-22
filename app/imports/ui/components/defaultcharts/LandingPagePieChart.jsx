import React from 'react';
import Highcharts from 'highcharts';
import HighchartsReact from 'highcharts-react-official';
import { cumulativeEmissionsData } from './cumulativeEmissionsData';

/** A simple static component to render some boxes for the landing page. */

function LandingPagePieChart() {
  const transportation = cumulativeEmissionsData('Transportation').map(recentEmissions => recentEmissions);
  let droveCount = 0;
  let teleworkCount = 0;
  let publicTransportationCount = 0;
  let bikingCount = 0;
  let walkCount = 0;
  let carpoolCount = 0;
  let electricVehicleCount = 0;

  for (let i = 0, n = transportation.length; i < n; i++) {
    if (transportation[i] === 'Drove') {
      droveCount += 1;
    } else
      if (transportation[i] === 'Telework') {
        teleworkCount += 1;
      } else
        if (transportation[i] === 'Public Transportation') {
          publicTransportationCount += 1;
        } else
          if (transportation[i] === 'Biking') {
            bikingCount += 1;
          } else
            if (transportation[i] === 'Walk') {
              walkCount += 1;
            } else
              if (transportation[i] === 'Carpool') {
                carpoolCount += 1;
              } else
                if (transportation[i] === 'Electric Vehicle') {
                  electricVehicleCount += 1;
                }
  }
  const options = {
    title: {
      text: 'Modes of Travel Cumulative Total',
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
        name: 'TeleWork',
        y: teleworkCount,
        sliced: true,
        selected: true,
      }, {
        name: 'Carpool',
        y: carpoolCount,
      }, {
        name: 'Electric Vehicle',
        y: electricVehicleCount,
      }, {
        name: 'Public Transportation',
        y: publicTransportationCount,
      },
        {
          name: 'Biking',
          y: bikingCount,
        },
        {
          name: 'Walking',
          y: walkCount,
        },
        {
          name: 'Drove',
          y: droveCount,
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

export default LandingPagePieChart;
