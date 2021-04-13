import faker from 'faker';
import { _ } from 'meteor/underscore';

export default function generateUsers(num) {
  const userList = [];
  const userCarList = [];

  for (let i = 0; i < num; i++) {
    // const faker = require('faker');
    const fakeFirst = faker.name.firstName();
    const fakeLast = faker.name.lastName();
    const fakeState = _.sample(['Alaska', 'Alabama', 'Arkansas', 'Arizona', 'California', 'Colorado', 'Connecticut',
      'District of Columbia', 'Delaware', 'Florida', 'Georgia', 'Hawaii', 'Iowa', 'Idaho', 'Illinois',
      'Indiana', 'Kansas', 'Kentucky', 'Louisiana', 'Massachusetts', 'Maryland', 'Maine', 'Michigan',
      'Minnesota', 'Missouri', 'Mississippi', 'Montana', 'North Carolina', 'North Dakota', 'Nebraska',
      'New Hampshire', 'New Jersey', 'New Mexico', 'Nevada', 'New York', 'Ohio', 'Oklahoma', 'Oregon',
      'Pennsylvania', 'Rhode Island', 'South Carolina', 'South Dakota', 'Tennessee', 'Texas', 'Utah',
      'Virginia', 'Vermont', 'Washington', 'Wisconsin', 'West Virginia', 'Wyoming']);
    const fakePassword = 'changeme';
    const fakeOwner = (`${fakeFirst.charAt(0) + fakeLast + _.random(2, 9)}@foo.com`).toLowerCase().replace(/[^a-z0-9@.]/g, '');
    const profileImage = 'https://i0.wp.com/butwhythopodcast.com/wp-content/uploads/2021/04/Tropical-Rouge-PreCure-Episode-5-But-Why-Tho.jpg?fit=1500%2C844&ssl=1';
    const unitSelection = _.sample([
        'metric',
        'us units',
    ]);

    const numCars = _.random(1,5);
    for (let j = 0; j < numCars; j++) {
      const fakeCarName = _.sample(['work', 'school', 'shopping', 'children']);
      const fakeMakeOfCar = faker.name.firstName();
      const fakeModelOfCar = faker.name.firstName();

      const profileCar = {
        carName: fakeCarName,
        owner: fakeOwner,
      };
      userCarList.push(profileCar);
          }

    const profileUser = {
      firstName: fakeFirst,
      lastName: fakeLast,
      owner: fakeOwner,
      password: fakePassword,
      userImage: profileImage,
      unitSystem: unitSelection,
      State: fakeState,
    };
    userList.push(profileUser);

  }
  return userList;
  return userCarList;

}
