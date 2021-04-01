import React from 'react';
import { Button, Card, Grid, Icon } from 'semantic-ui-react';
import PropTypes from 'prop-types';
import { withRouter } from 'react-router-dom';
import { userInfoRemoveItMethod } from '../../../api/userInfo/UserInfoCarCollection.methods';

/** Renders a single row in the List Stuff table. See pages/ListStuff.jsx. */
class carCardItem extends React.Component {

  render() {

    /* deleteCar function allows users to delete preset cars */
    const deleteCar = ({ _id }) => userInfoRemoveItMethod.call(_id);

    return (
        <Card.Content style={{ paddingBottom: '5%' }}>
          <Grid>
            <Grid.Row>
               <Grid.Column key={this.props.car._id}>
                <Card style={{ background: '#1d7f90', boxShadow: 'none' }}>
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
                      Car Year: {this.props.car.yearofCar}
                    </Card.Header>
                    <b style={{ fontFamily: 'sans-serif', fontWeight: 'lighter' }}
                       className='CarcardFont'
                    > Make: {this.props.car.makeofCar}
                    </b>
                    <br/>
                    <b className='CarcardFont'
                       style={{ fontFamily: 'sans-serif', fontWeight: 'lighter' }}
                    > Model: {this.props.car.modelofCar}
                    </b>
                    <br/>
                    <b className='CarcardFont'
                       style={{ fontFamily: 'sans-serif', fontWeight: 'lighter' }}>
                      MPG: {this.props.car.mpgofCar} </b>
                  </Card.Content>
                  <Button id='delete-trip' onClick={() => deleteCar(this.props.car)} color={'teal'}>
                    Remove Car
                  </Button>
                </Card>
              </Grid.Column>
            </Grid.Row>
          </Grid>
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
