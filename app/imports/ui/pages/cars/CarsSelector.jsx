import React, { useState, useEffect } from 'react';
import { Loader } from 'semantic-ui-react';
import LoadCars from '../../components/cars/LoadCars';

/**
 * A simple component which puts together all the components to create the Car selector/ dropdown.
 * @memberOf ui/components/cars
 */
const CarsSelector = () => {

  const [cars, setCars] = useState([]);

  /* the loading task which creates a new LoadCars and loads them */
  const load = () => {
    const loadCarsTask = new LoadCars();
    loadCarsTask.load(setCars);
  };
  useEffect(load, []);

  return (
      <div>
        {cars.length === 0 ? <Loader active>Getting data</Loader> : <div>
          CAR
        </div>
        }
      </div>);

};

export default CarsSelector;
