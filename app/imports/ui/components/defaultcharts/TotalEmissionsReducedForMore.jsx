import React from 'react';
import Highcharts from 'highcharts';
import HighchartsReact from 'highcharts-react-official';
import { Header } from 'semantic-ui-react';
import { UserEmissionData } from './UserEmissionsData';

/** A simple static component to render some boxes for the landing page. */

function TotalEmissionsReducedForMore() {

  const options = {
    title: {
      text: 'Your Cumulative Savings',
      style: {
        color: 'white',
        fontWeight: '300',
        fontFamily: 'sans-serif',
      },
    },
    series: [{
      name: 'Emissions Reduced',
      data: UserEmissionData('EmissionsReducedByMonth'),
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
            </div> : <Header inverted as="h3" textAlign="center" style={{ paddingBottom: '10px' }}>
              Hmm... These charts are empty. <a style={{ color: 'rgb(7 182 254)' }} href={'#/add'}>Try adding todays
              emissions </a>
            </Header>}
      </div>
  );

}

export default TotalEmissionsReducedForMore;
