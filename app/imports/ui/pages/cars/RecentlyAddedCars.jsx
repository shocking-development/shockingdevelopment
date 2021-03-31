import React from 'react';
import { Header, Loader, Grid, Image } from 'semantic-ui-react';
import { withTracker } from 'meteor/react-meteor-data';
import PropTypes from 'prop-types';
import { UserInfosCars } from '../../../api/userInfo/UserInfoCarCollection';
import CarCardItem from '../../components/cars/CarCardItem';

/** Renders a table containing all of the Stuff documents. Use <StuffItem> to render each row. */
class RecentlyAddedCars extends React.Component {

  /** If the subscription(s) have been received, render the page, otherwise show a loading icon. */
  render() {
    return (this.props.ready) ? this.renderPage() :
        <Loader active inverted>Getting data</Loader>;
  }

  /** Render the page once subscriptions have been received. */
  renderPage() {

    // console.log(this.props.cars.length);

    return (
        <div>
          <Header inverted as="h2" textAlign="center"
                  style={{ fontFamily: 'sans-serif', fontWeight: 'lighter' }}>
            Your Cars
          </Header>
          <Image src='images/HEI-WAVE-LOGO.png' centered size='small'/>
          {this.props.cars.length !== 0 ?
              <div style={{ width: '100%', display: 'flex', justifyContent: 'center' }}>
                <Grid>
                  {this.props.cars.map((car) => <CarCardItem key={car._id} car={car}/>)}
                </Grid>
              </div> : <Header inverted as="h2" textAlign="center">No cars have been added. You can add cars <a
                  style={{ color: '#45efe7' }} href={'#/cars'}>
                here
              </a>.
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
    cars: UserInfosCars.find({}).fetch(),
    ready: subscription.ready(),
  };
})(RecentlyAddedCars);
