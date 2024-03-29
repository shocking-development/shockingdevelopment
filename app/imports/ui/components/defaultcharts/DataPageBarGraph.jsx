import React from 'react';
import Highcharts from 'highcharts';
import HighchartsReact from 'highcharts-react-official';
import { Header } from 'semantic-ui-react';
import { UserEmissionData } from './UserEmissionsData';

/** A simple static component to render some boxes for the landing page. */

function DataPageBarGraph() {

  const options = {
    title: {
      text: 'Your 2021 Environmental Benefits Cummulative Total',
      style: {
        color: 'white',
        fontWeight: '300',
        fontFamily: 'sans-serif',
      },
    },
    series: [{
      name: 'Miles Traveled',
      data: UserEmissionData('DataMiles'),

    }, {
      name: 'Money spent ($)',
      data: UserEmissionData('MoneySpent'),

    }, {
      name: 'CO2 emissions produced (lbs)',
      data: UserEmissionData('CO2EmissionsProduced'),

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
      categories: UserEmissionData('DateRecorded'),
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
      <div>
        {UserEmissionData('Emissions').length !== 0 ?
            <div>
              <HighchartsReact
                  highcharts={Highcharts}
                  options={options}
              />
              <h1 style={{ position: 'absolute', top: '0px', right: '29px' }}>
                <a style={{ color: '#45efe7' }} href={'#/add'}> + </a>
              </h1>
            </div> : <Header inverted as="h3" textAlign="center" style={{ paddingBottom: '10px' }}>
              Hmm... These charts are empty. <a style={{ color: 'rgb(7 182 254)' }} href={'#/add'}>Try adding todays
              emissions </a>
            </Header>}
      </div>
  );

}

export default DataPageBarGraph;
