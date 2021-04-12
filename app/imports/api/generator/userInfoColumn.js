import React from 'react';
import { Image } from 'semantic-ui-react';

const userInfoColumn = [
    {
  name: 'USER',
  selector: 'user',
  sortable: true,
  grow: 1,
},
  {
    name: 'FIRST',
    selector: 'firstName',
    sortable: true,
    grow: 1,
  },
  {
    name: 'LAST',
    selector: 'lastName',
    sortable: true,
    grow: 1,
  },
];

export default userInfoColumn;
