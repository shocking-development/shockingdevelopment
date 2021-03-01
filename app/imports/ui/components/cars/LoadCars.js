import papa from 'papaparse';

/**
 * A simple component which loads the cars/vehicles from a csv file and parses it into a JSDOC.
 * @memberOf ui/components/cars
 */
class LoadCars {

  /* the csv url */
  carsCSVfile = 'https://raw.githubusercontent.com/CalianaFortin/vehicledata/main/vehicles.csv';

  setState = null;

  load = (setState) => {
    this.setState = setState;
    papa.parse(this.carsCSVfile, {
      download: true,
      dynamicTyping: true,
      header: true,
      complete: (result) => {
        console.log(result);
      },
    });

  };

}

export default (LoadCars);
