import React, { useState, useEffect } from 'react';
import { Loader, Dropdown } from 'semantic-ui-react';
import LoadCars from './LoadCars';

/**
 * A simple component which puts together all the components to create the Car selector/ dropdown.
 * @memberOf ui/components/cars
 */
const CarsDropDown1 = () => {

  const setCars = useState([]); /* initially setCars has no state */

  /* the loading task which creates a new LoadCars and loads them */
  const load = () => {
    const loadCarsTask = new LoadCars();
    loadCarsTask.load(setCars); /* we set the cars state here */
  };
  useEffect(load, []); /* page load we tell it that it will track [] similar to componentDidMount */

  return (
      /** If the cars csv has been loaded, render the page, otherwise show a loading icon. */
      <div>
        {setCars.length === 0 ? <Loader active>Getting data</Loader> : <div>
          <LoadCars/>
        </div>
        }
      </div>
  );

};

export default CarsDropDown1;