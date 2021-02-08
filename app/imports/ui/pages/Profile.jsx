import React from 'react';
import { Image, Grid } from 'semantic-ui-react';
import Text from 'uniforms-semantic/src/TextField';

class Profile extends React.Component {
  render() {
    return (
    <div>
      <Grid.Row columns={2}>
        <Grid.Column>
         <Image src='/images/wireframe/square-image.png' size='medium' circular/>
          <Text>Edit Profile</Text>
          <Text>User Name</Text>
          <Text>Real Name</Text>
          <Text>Current Location</Text>
        </Grid.Column>
        <Grid.Column>
          <Image src='/images/wireframe/square-image.png' size='medium' circular/>
          <p>Above is everything associated with your carbon footprint for the week</p>
          <p>The size of your carbon footprint is: </p>
          <p>Below are the usual modes of transportation that you use: </p>
          <p>
            Car (2018 Ford Focus w/ EcoBoost)
            Bicycle
            Walking/Jogging
            Bus
          </p>
          <Text>Have a new car or want to change your mode of transportation? Click here to Edit</Text>
        </Grid.Column>
      </Grid.Row>
    </div>
    );
  }
}

export default Profile;
