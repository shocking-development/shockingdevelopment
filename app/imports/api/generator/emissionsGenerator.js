import faker from 'faker';
import { _ } from 'meteor/underscore';
import { CarsData } from '../cars/Cars.json';

/** Pluck out all of the course numbers from the master list */
const carsList = _.pluck(CarsData, 'mpg');

/** List of possible Miles to pick from for session date generation */
const possibleMiles = [
  1, 2, 3, 4, 5, 6, 7, 8, 9,
  10, 11, 12, 13, 14, 15, 16,
  17, 18, 19, 20, 21, 22, 23,
  24, 25, 26, 27, 28, 29, 30,
];

export default function generateEmissions(num, userlist) {
  const emissionsList = [];
  const list = userlist || [];

  for (let i = 0; i < num; i++) {

    const listofusers = _.pluck(list, 'owner');
    const fakeDate = faker.date.between('2020-01-01', '2020-04-05');
    const fakeMiles = _.sample(possibleMiles);
    const fakeTransportation = 0;
    const owner = _.sample(listofusers);

    const emissionsUser = {
      owner: owner,
      date: fakeDate,
      transportation: fakeTransportation,
      miles: fakeMiles,
      mpg: _.sample(carsList),
      createdAt: fakeDate,
    };

    emissionsList.push(emissionsUser);
  }
  return emissionsList;

}
