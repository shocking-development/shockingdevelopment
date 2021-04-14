import faker from 'faker';
import { _ } from 'meteor/underscore';
import { CarsData } from '../cars/Cars.json';

export default function userCarGenerator(count, userlist) {
  const userCarList = [];
  const list = userlist || [];
  const num = _.random(1, 5);
  for (let i = 0; i < list.length; i++) {
    const owner = list[i];
    for (let j = 0; j < num; j++) {
         const fakeName = faker.name.firstName();
         const k = _.random(1, 100);
         const selectCar = CarsData[k];
         const fakeModel = _.pluck(selectCar, 'model');
         const fakeYear = _.pluck(selectCar, 'year');
         const fakeMake = _.pluck(selectCar, 'make');
         const fakeMPG = _.pluck(selectCar, 'mpg');

         const fakeUserCar = {
           carName: fakeName,
           owner: owner,
           makeofCar: fakeMake.String(),
           modelofCar: fakeModel.String(),
           yearofCar: fakeYear,
           mpgofCar: fakeMPG,
         };
      userCarList.push(fakeUserCar);

  }

  }

  return userCarList;
}
