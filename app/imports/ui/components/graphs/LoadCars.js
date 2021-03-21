import papa from 'papaparse';
import { _ } from 'meteor/underscore';
import { Dropdown } from 'semantic-ui-react';

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
    // console.log(setState);
    papa.parse(this.carsCSVfile, {
      download: true,
      dynamicTyping: true,
      header: true,
      complete: (result) => {
        // console.log('This is the data: ');
        // console.log(result);
        this.#processCarsData(result.data); // read datas collection
      },
    });

  };

  #processCarsData = (carDefintions) => {
    const carOptions = _.map(carDefintions.highwayE, (highwayE, index) => ({
      key: carDefintions.highwayE[index],
      text: highwayE,
      value: carDefintions.highwayE[index],
    }));
    // console.log(JSON.stringify(carOptions));
    // eslint-disable-next-line no-unused-vars
    const DropdownExampleSearchSelectionTwo = () => (
        // eslint-disable-next-line react/react-in-jsx-scope
        <Dropdown placeholder='State' search selection options={carOptions}/>
    );
  }

}

export default (LoadCars);
