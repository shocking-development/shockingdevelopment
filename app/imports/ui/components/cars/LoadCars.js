import papa from 'papaparse';

/** Renders a single row in the List Stuff table. See pages/ListStuff.jsx. */
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

/** Wrap this component in withRouter since we use the <Link> React Router element. */
export default (LoadCars);
