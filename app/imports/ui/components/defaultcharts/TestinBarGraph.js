/** This function calculates the CO2 created by user inputted gallons. */
export function tesing(data1, data2, data3, dataAll) {
  data1 = Number(data1);
  data2 = Number(data2);
  data3 = Number(data3);
  let newData = [data1, data2];


  let options = {
    title: {
      text: 'Your current car vs input',
      style: {
        color: 'black',
        fontWeight: '300',
        fontFamily: 'sans-serif',
      },
    },
    series: [{
      color: 'blue',
      name: 'Price (Thousands of Dollars)',
      data: [data1, data2],

    }, {
      color: 'yellow',
      name: 'Full Saved (Gallons)',
      data: newData,

    }, {
      color: 'red',
      name: 'CO2 reduced (Pounds)',
      textColor: 'red',
      data: [data3, newData[0]],

    }],
    chart: {
      type: 'column',
      styledMode: false,
    },
    xAxis: {
      gridLineColor: 'black',
      lineColor: 'black',
      labels: {
        style: {
          color: 'black',
        },
      },
      legend: {
        itemStyle: {
          color: 'black',
          fontWeight: 'bold',
        },
      },
      categories: [
        'Current Car',
        'Input',
      ],
      crosshair: true,
    },
    yAxis: {
      min: 0,
      gridLineColor: 'yellow',
      title: {
        style: {
          color: 'black',
        },
      },
      labels: {
        style: {

          color: 'black',
        },
      },
    },
  };


  return options;
}

/** This function calculates the GHG emissions equivalency. */
export function calculateGHG(gallons) {
  const mutltifactor = 0.00043;
  return (4.63 * (gallons * mutltifactor)).toFixed(3);
}

// distance and mpg calculates number of gallons
// calculate the cost of the trip in another file, for each trip then all the trips