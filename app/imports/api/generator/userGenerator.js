import faker from 'faker';
import { _ } from 'meteor/underscore';

export default function generateUsers(num) {
  const userList = [];

  for (let i = 0; i < num; i++) {

    const fakeFirst = faker.name.firstName();
    const fakeLast = faker.name.lastName();
    const fakeState = faker.address.state;
    const fakeOwner = faker.internet.email;
    const profileImage = faker.image.imageUrl();
    const unitSelection = _.sample([
        'metric',
        'us units',
    ]);

    const profileUser = {
      firstName: fakeFirst,
      lastName: fakeLast,
      owner: fakeOwner,
      State: fakeState,
      userImage: profileImage,
      unitSystem: unitSelection,
    };
    userList.push(profileUser);
  }
  return userList;

}
