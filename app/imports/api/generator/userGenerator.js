import faker from 'faker';
import { _ } from 'meteor/underscore';

export default function generateUsers(num) {
  const userList = [];

  for (let i = 0; i < num; i++) {

    const fakeFirst = faker.name.firstName();
    const fakeLast = faker.name.lastName();
    const fakeState = _.sample(['Alaska', 'Alabama', 'Arkansas', 'Arizona', 'California', 'Colorado', 'Connecticut',
      'District of Columbia', 'Delaware', 'Florida', 'Georgia', 'Hawaii', 'Iowa', 'Idaho', 'Illinois',
      'Indiana', 'Kansas', 'Kentucky', 'Louisiana', 'Massachusetts', 'Maryland', 'Maine', 'Michigan',
      'Minnesota', 'Missouri', 'Mississippi', 'Montana', 'North Carolina', 'North Dakota', 'Nebraska',
      'New Hampshire', 'New Jersey', 'New Mexico', 'Nevada', 'New York', 'Ohio', 'Oklahoma', 'Oregon',
      'Pennsylvania', 'Rhode Island', 'South Carolina', 'South Dakota', 'Tennessee', 'Texas', 'Utah',
      'Virginia', 'Vermont', 'Washington', 'Wisconsin', 'West Virginia', 'Wyoming']);
    const fakePassword = faker.name.findName({ minimum: 5, maximum: 10 });
    const fakeOwner = faker.internet.email;
    const profileImage = faker.image.imageUrl();
    const unitSelection = _.sample([
        'metric',
        'us units',
    ]);

    const profileUser = {
      firstName: fakeFirst,
      lastName: fakeLast,
      owner: fakeOwner.toString(),
      password: fakePassword.toString(),
      userImage: profileImage.toString(),
      unitSystem: unitSelection,
      State: fakeState,
    };
    userList.push(profileUser);
  }
  return userList;

}
