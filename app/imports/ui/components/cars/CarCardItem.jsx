import React from 'react';
import { Button, Card, Grid, Header, Icon } from 'semantic-ui-react';
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

    // console.log(carDocs.length);

    return (
        <Card.Content style={{ paddingTop: '3rem', paddingLeft: '10%', paddingBottom: '5%' }}>
          <Grid>
            <Grid.Row columns={carDocs.length}>
              {carDocs.map(recentCar => <Grid.Column key={recentCar._id}>
                <Card style={{ background: '#136282' }}>
                  <Card.Content>
                    <Icon name={'car'} size={'huge'} inverted/>
                  </Card.Content>
                  <Card.Content>
                    <Card.Header className='CarcardFont'
                                 style={{ fontFamily: 'sans-serif', fontWeight: 'lighter' }}>
                      Car Name: {this.props.car.carName}
                    </Card.Header>
                  </Card.Content>
                  <Card.Content>
                    <Card.Header className='CarcardFont'
                                 style={{ fontFamily: 'sans-serif', fontWeight: 'lighter' }}>
                      Car Year: {recentCar.year}
                    </Card.Header>
                    <b style={{ fontFamily: 'sans-serif', fontWeight: 'lighter' }}
                       className='CarcardFont'
                    > Make: {recentCar.make}
                    </b>
                    <br/>
                    <b className='CarcardFont'
                       style={{ fontFamily: 'sans-serif', fontWeight: 'lighter' }}
                    > Model: {recentCar.model}
                    </b>
                    <br/>
                    <b className='CarcardFont'
                       style={{ fontFamily: 'sans-serif', fontWeight: 'lighter' }}>
                      MPG: {recentCar.mpg} </b>
                  </Card.Content>
                  <Button id='delete-trip' onClick={() => deleteCar(this.props.car)} color={'blue'}>
                    Remove Car
                  </Button>
                </Card>
              </Grid.Column>)}
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
