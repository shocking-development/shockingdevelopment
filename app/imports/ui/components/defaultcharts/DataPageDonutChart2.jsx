import React from 'react';
import Highcharts from 'highcharts';
import HighchartsReact from 'highcharts-react-official';
import { Header } from 'semantic-ui-react';
import { UserEmissionData } from './UserEmissionsData';

function DataPageDonutChart1() {

  const ghgEmissionsbyDays = UserEmissionData('emisionsForweek');

  let Monday = 0;
  let Tuesday = 0;
  let Wednesday = 0;
  let Thursday = 0;
  let Friday = 0;
  let Saturday = 0;
  let Sunday = 0;

  for (let i = 0, n = ghgEmissionsbyDays.length; i < n; i++) {
    if (ghgEmissionsbyDays[i].day === 0) {
      Monday += ghgEmissionsbyDays[i].ghgProduced;
    } else
      if (ghgEmissionsbyDays[i].day === 1) {
        Tuesday += ghgEmissionsbyDays[i].ghgProduced;
      } else
        if (ghgEmissionsbyDays[i].day === 2) {
          Wednesday += ghgEmissionsbyDays[i].ghgProduced;
        } else
          if (ghgEmissionsbyDays[i].day === 3) {
            Thursday += ghgEmissionsbyDays[i].ghgProduced;
          } else
            if (ghgEmissionsbyDays[i].day === 4) {
              Friday += ghgEmissionsbyDays[i].ghgProduced;
            } else
              if (ghgEmissionsbyDays[i].day === 5) {
                Saturday += ghgEmissionsbyDays[i].ghgProduced;
              } else
                if (ghgEmissionsbyDays[i].day === 6) {
                  Sunday += ghgEmissionsbyDays[i].ghgProduced;
                }
  }

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
      data: [['Monday', Monday], ['Tuesday', Tuesday], ['Wednesday', Wednesday], ['Thursday', Thursday], ['Friday', Friday], ['Saturday', Saturday], ['Sunday', Sunday]],
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
