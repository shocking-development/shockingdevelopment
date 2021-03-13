import React from 'react';
import { Meteor } from 'meteor/meteor';
import { useTracker } from 'meteor/react-meteor-data';
import { Card, Header, Grid } from 'semantic-ui-react';
import HighchartsReact from 'highcharts-react-official';
import Highcharts from 'highcharts';
import { Emissions } from '../../../api/emissions/EmissionsCollection';

function EmissionsChart() {

  const user = useTracker(() => Meteor.userId());
  const emissions = useTracker(() => {
    Meteor.subscribe(Emissions.emissionsPublicationName);
    return Emissions.collection.find({ owner: user }, { sort: { createdAt: -1 }, limit: 3 }).fetch();
  });
  const dateRecorded = emissions.map(recentEmissions => `${recentEmissions.date.getMonth() + 1}/${recentEmissions.date.getDate()}/${recentEmissions.date.getFullYear()}`);
  const dataMiles = emissions.map(recentEmissions => recentEmissions.miles);

  console.log(emissions);
  // if the date created at is the same then add the miles up
  // if the object created had the same date as another object add up the miles
  console.log(emissions.map(recentEmissions => `${recentEmissions.date}-${recentEmissions.miles}`));

  const options = {
    title: {
      text: 'Your 2021 Emissions Total',
      style: {
        color: 'white',
        fontWeight: '300',
        fontFamily: 'sans-serif',
      },
    },
    series: [{
      name: 'VMT (Miles)',
      // need what it would have cost using the worst mode of transport and then the mode of transport being used -> gallons
      // co2 store this info somewhere in a diff/same collection, get all the data from this collection and add them up,
      // go to only your page calculate your data, user, mode, worstmode of transportation
      data: dataMiles,

    }, {
      name: 'Fuel Gallons Saved (Gallons)',
      data: [83.6, 78.8, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],

    }, {
      name: 'CO2 reduced (Pounds)',
      data: [48.9, 38.8, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],

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
      categories: dateRecorded,
      crosshair: true,
    },
    yAxis: {
      min: 0,
      gridLineColor: 'white',
      title: {
        style: {
          color: 'white',
        },
      },
      labels: {
        style: {
          color: '#ccc',
        },
      },
    },
  };

  return (
      <div style={{ paddingTop: '3rem' }}>
        <Header inverted size='huge' textAlign={'center'}>Graph</Header>
        <div>
          <HighchartsReact
              highcharts={Highcharts}
              options={options}
          />
        </div>
      </div>
  );
}

export default EmissionsChart;
