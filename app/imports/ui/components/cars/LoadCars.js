import papa from 'papaparse';

/** This file */
class LoadCars {
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
