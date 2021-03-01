import React, { useState, useEffect } from 'react';
import LoadCars from '../../components/cars/LoadCars';

const CarsSelector = () => {

  const [cars, setCars] = useState([]);

  const load = () => { // have to change this line
    const loadCarsTask = new LoadCars();
    loadCarsTask.load(setCars);
  };
  useEffect(load, []);

};

export default CarsSelector;
