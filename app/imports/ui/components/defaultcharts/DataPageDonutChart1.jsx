import React from 'react';
import Highcharts from 'highcharts';
import HighchartsReact from 'highcharts-react-official';
import { Header } from 'semantic-ui-react';
import { UserEmissionData } from './UserEmissionsData';

function DataPageDonutChart1() {

  const transportation = UserEmissionData('CurrentDayTransportation').map(recentEmissions => recentEmissions.transportation);
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
      text: 'Today&apos;s Choice of Travel',
      style: {
        color: 'white',
        fontWeight: '300',
        fontFamily: 'sans-serif',
      },
    },
    series: [{
      name: 'Transportation',
      data: [
        ['Drove', droveCount],
        ['Telework', teleworkCount],
        ['Public Transportation', publicTransportationCount],
        ['Biking', bikingCount],
        ['Walk', walkCount],
        ['Carpool', carpoolCount],
        ['Electric Vehicle', electricVehicleCount],
      ],
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
        {UserEmissionData('Emissions').length !== 0 ?
            <div>
              <HighchartsReact
                  highcharts={Highcharts}
                  options={options}
              />
              <h1 style={{ position: 'absolute', top: '-18px', right: '22px' }}>
                <a style={{ color: '#45efe7' }} href={'#/add'}> + </a>
              </h1>
            </div> :
            <Header inverted as="h3" textAlign="center" style={{ marginTop: '3em', paddingLeft: '10px', marginBottom: '3em' }}>
              Hmm... These charts are empty. <a style={{ color: 'rgb(7 182 254)' }} href={'#/add'}>Try adding todays
              emissions </a>
            </Header>}
      </div>
  );
}

export default DataPageDonutChart1;
