import React from 'react';
import { Button, Card, Grid } from 'semantic-ui-react';
import PropTypes from 'prop-types';
import { withRouter } from 'react-router-dom';
import { Cars } from '../../../api/cars/CarsCollection';
import { userInfoRemoveItMethod } from '../../../api/userInfo/UserInfoCarCollection.methods';

/** Renders a single row in the List Stuff table. See pages/ListStuff.jsx. */
class carCardItem extends React.Component {

  render() {
    const carDocs = Cars.find(this.props.car.carId).fetch();
    // console.log(carDocs);

    /* deleteCar function allows users to delete preset cars */
    const deleteCar = ({ _id }) => userInfoRemoveItMethod.call(_id);

    return (
        <Card.Content>
          <Grid>
            <Grid.Row columns={carDocs.length}>
              {carDocs.map(recentCar => <Grid.Column key={toString(recentCar.year) + recentCar.make + recentCar._id}>
                <Card>
                  <Card.Content>
                    <Card.Header> Car Name: {this.props.car.carName}</Card.Header>
                  </Card.Content>
                  <Card.Content>
                    <Card.Header> Car Year: {recentCar.year} </Card.Header>
                    <b>Make: {recentCar.make}</b>
                    <br/>
                    <b>Model: {recentCar.model}</b>
                    <br/>
                    <b>MPG: {recentCar.mpg} </b>
                  </Card.Content>
                  <Button id='delete-trip' onClick={() => deleteCar(this.props.car)} color={'red'}>
                    Delete
                  </Button>
                </Card></Grid.Column>)}
            </Grid.Row>
          </Grid>
          {/* <Card.Header>{this.props.car.owner}</Card.Header> */}
        </Card.Content>
    );
  }
}

/** Require a document to be passed to this component. */
carCardItem.propTypes = {
  car: PropTypes.object.isRequired,
};

/** Wrap this component in withRouter since we use the <Link> React Router element. */
export default withRouter(carCardItem);
