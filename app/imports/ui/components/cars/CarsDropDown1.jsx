import React, { useState } from 'react';
import swal from 'sweetalert';
import { Dropdown } from 'semantic-ui-react';
import papa from 'papaparse';
import { _ } from 'meteor/underscore';

function CarsDropDown1() {
  /* the csv url */
  const carsCSVfile = 'https://raw.githubusercontent.com/CalianaFortin/vehicledata/main/vehicles.csv';
  const carOptions = [];
  let uniqCaroptions = [];

  const processCarsData = (carDefintions) => {
    console.log(carDefintions[0].make);

    carDefintions.forEach((car) => { // loop for the first 50, populate the database with some
      carOptions.push({
        key: `${car.model}-${car.make}`,
        text: car.make,
        value: car.make,
      });
    });
  };

  // create test data
  // 2 json files the whole file, 10 cars of the file
  // load test first then for real life use the whole file

  papa.parse(carsCSVfile, {
    download: true,
    dynamicTyping: true,
    header: true,
    complete: (result) => {
      console.log('This is the data: ');
      console.log(result);
      processCarsData(result.data); // read datas collection
    },
  });

  return (
      <Dropdown placeholder='State' search selection options={carOptions}/>
  );
}

export default CarsDropDown1;
