import React, { useState, useEffect } from 'react';
import { Loader } from 'semantic-ui-react';
import LoadCars from '../../components/cars/LoadCars';

const CarsSelector = () => {

  const [cars, setCars] = useState([]);

  const load = () => { // have to change this line
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
