import React from 'react';
import Highcharts from 'highcharts';
import HighchartsReact from 'highcharts-react-official';
import { Meteor } from 'meteor/meteor';
import { useTracker } from 'meteor/react-meteor-data';
import { Emissions } from '../../../api/emissions/EmissionsCollection';

/** A simple static component to render some boxes for the landing page. */

function DataPagePieChart() {

  const user = useTracker(() => Meteor.userId());
  const emissions = useTracker(() => {
    Meteor.subscribe(Emissions.emissionsPublicationName);
    return Emissions.collection.find({ owner: user }, { sort: { createdAt: -1 } }).fetch();
  });
  const transportation = emissions.map(recentEmissions => recentEmissions.transportation);
  let droveCount = 0;
  let teleworkCount = 0;
  let publicTransportationCount = 0;
  let bikingCount = 0;
  let walkCount = 0;
  let carpoolCount = 0;
  let electricVehicleCount = 0;

  for (let i = 0; i < transportation.length; i++) {
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
        name: 'Drove',
        y: droveCount,
      }, {
        name: 'Telework',
        y: teleworkCount,
      }, {
        name: 'Public Transportation',
        y: publicTransportationCount,
      }, {
        name: 'Biking',
        y: bikingCount,
      },
        {
          name: 'Walk',
          y: walkCount,
        },
        {
          name: 'Carpool',
          y: carpoolCount,
        },
        {
          name: 'Electric Vehicle',
          y: electricVehicleCount,
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

export default DataPagePieChart;
