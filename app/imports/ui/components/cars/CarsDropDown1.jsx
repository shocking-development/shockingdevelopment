import React, { useState } from 'react';
import swal from 'sweetalert';
import { Meteor } from 'meteor/meteor';
import { useTracker } from 'meteor/react-meteor-data';
import { Dropdown, Card, Button, Input, Popup, Form } from 'semantic-ui-react';
import papa from 'papaparse';
import { _ } from 'meteor/underscore';

function CarsDropDown1() {
  /* the csv url */
  const carsCSVfile = 'https://raw.githubusercontent.com/CalianaFortin/vehicledata/main/vehicles.csv';
  const carOptions = [];

  const processCarsData = (carDefintions) => {
    console.log(carDefintions[0].make);

    carDefintions.forEach((car) => {
      if (!carOptions.includes(car)) {
        carOptions.push({
          key: car.Id,
          text: car.make,
          value: car.make,
        });
      }
    });
  };

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
