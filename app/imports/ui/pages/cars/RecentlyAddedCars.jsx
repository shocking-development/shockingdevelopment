import React from 'react';
import { Header, Grid, Button, Icon } from 'semantic-ui-react';
import { withTracker } from 'meteor/react-meteor-data';
import PropTypes from 'prop-types';
import { NavLink } from 'react-router-dom';
import { UserInfosCars } from '../../../api/userInfo/UserInfoCarCollection';
import CarCardItem from '../../components/cars/CarCardItem';

/** Renders a table containing all of the Stuff documents. Use <StuffItem> to render each row. */
class RecentlyAddedCars extends React.Component {

  /** If the subscription(s) have been received, render the page, otherwise show a loading icon. */
  render() {
    return (this.props.ready) ? this.renderPage() :
        <div style={{ background: 'transparent' }}>
        </div>;
  }

  /** Render the page once subscriptions have been received. */
  renderPage() {

    return (
        <div>
          <Header inverted as="h1" textAlign="center"
                  style={{ fontWeight: 'lighter', paddingTop: '65px', paddingBottom: '45px' }} className={'YourCarsHeader'}>
            Your Cars
          </Header>
          {this.props.cars.length !== 0 ?
              <div>
                <Grid className={'RecentlyAddedCarsGrid'} >
                  {this.props.cars.map((car) => <CarCardItem key={car._id} car={car}/>)}
                  <Grid.Column className={'addCarBtn'} >
                    <Button
                        as={NavLink}
                        exact to={'/cars'}
                        animated='vertical'
                        size='medium'
                        color='blue'
                        style={{ top: '310px', left: '-124px'}}
                        id='edit-password'
                        className={'editButtonProfile'}
                    >
                      <Button.Content hidden>Add Car</Button.Content>
                      <Button.Content visible>
                        <Icon name='add'/>
                      </Button.Content>
                    </Button>
                  </Grid.Column>
                </Grid>
              </div> :
              <Header
                  className={'RecentlyAddedCarsHeader'}
                  inverted as="h2"
                  textAlign="center">
                No cars have been added. <a
                  style={{ color: 'rgb(7 182 254)' }} href={'#/cars'}>
                You can add cars here.
              </a>
              </Header>}
        </div>
    );
  }
}

/** Require an array of Stuff documents in the props. */
RecentlyAddedCars.propTypes = {
  cars: PropTypes.array,
  ready: PropTypes.bool.isRequired,
};

/** withTracker connects Meteor data to React components. https://guide.meteor.com/react.html#using-withTracker */
export default withTracker(() => {
  const subscription = UserInfosCars.subscribeUserInfoCars();
  return {
    cars: UserInfosCars.find({}, { sort: { count: -1 }, limit: 1 }).fetch(),
    ready: subscription.ready(),
  };
})(RecentlyAddedCars);
