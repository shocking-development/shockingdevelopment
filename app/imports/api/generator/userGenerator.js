import faker from 'faker';
import { _ } from 'meteor/underscore';

export default function generateUsers(num) {
  const userList = [];

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
    const profileImage = _.sample(['https://i0.wp.com/butwhythopodcast.com/wp-content/uploads/2021/04/Tropical-Rouge-PreCure-Episode-5-But-Why-Tho.jpg?fit=1500%2C844&ssl=1',
      // eslint-disable-next-line max-len
      'https://pbs.twimg.com/media/Eyg2DjEUUAUAl0N?format=jpg&name=large', 'https://pbs.twimg.com/media/EvHQgiEVIAYUBKg?format=jpg&name=large', 'https://pbs.twimg.com/media/EqdZY19VoAEEo7K?format=jpg&name=large']);
    const unitSelection = _.sample([
        'metric',
        'us units',
    ]);

    const profileUser = {
      firstName: fakeFirst,
      lastName: fakeLast,
      owner: fakeOwner,
      password: fakePassword,
      userImage: profileImage,
      unitSystem: unitSelection,
      state: fakeState,
    };

    userList.push(profileUser);
  }
  return userList;

}
