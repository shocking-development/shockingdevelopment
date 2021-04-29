import faker from 'faker';
import { _ } from 'meteor/underscore';
import { CarsData } from '../cars/Cars.json';

/** Pluck out all of the cars mpg from the master list */
const carsList = _.pluck(CarsData, 'mpg');

/** List of possible Miles to pick from for driving */
const possibleMiles = [
  1, 2, 3, 4, 5, 6, 7, 8, 9,
  10, 11, 12, 13, 14, 15, 16,
  17, 18, 19, 20, 21, 22, 23,
  24, 25, 26, 27, 28, 29, 30,
];

const possibleTransportation = ['Drove', 'Telework', 'Public Transportation', 'Biking', 'Walk', 'Electric Vehicle'];

export default function generateEmissions(num, userlist) {
  const emissionsList = [];
  const list = userlist || [];

  for (let i = 0, n = list.length; i < n; i++) {
    const carmpgforuser = _.sample(carsList);

    for (let j = 0; j < num; j++) {
      const owner = list[i];
      const fakeDate = faker.date.between('2021-01-18', '2021-05-04');
      const fakeMiles = _.sample(possibleMiles);
      const fakeTransportation = _.sample(possibleTransportation);

      const emissionsUser = {
        owner: owner,
        date: fakeDate,
        transportation: fakeTransportation,
        miles: fakeMiles,
        mpg: carmpgforuser,
        createdAt: fakeDate,
      };

      emissionsList.push(emissionsUser);
    }

  }
  return emissionsList;

}
