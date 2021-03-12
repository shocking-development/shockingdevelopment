import React from 'react';
import { Meteor } from 'meteor/meteor';
import { Container, Header, Loader, Image, Card, Button, Icon, Grid } from 'semantic-ui-react';
import { withTracker } from 'meteor/react-meteor-data';
import PropTypes from 'prop-types';
import { UserInfosCars } from '../../../api/userInfo/UserInfoCarCollection';
import NavBarHome from '../../components/main-navbar/NavBarMain';
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

    console.log(this.props.cars.length);

    return (
        <div>
          <NavBarHome/>
          <Header inverted as="h2" textAlign="center">Your Cars</Header>
          {this.props.cars.length !== 0 ?
              <div style={{ width: '100%', display: 'flex', justifyContent: 'center', paddingTop: '3rem' }}>
                <Grid>
                  {this.props.cars.map((car) => <CarCardItem key={car._id} car={car}/>)}
                </Grid>
              </div> : <h1>You have not added any Cars</h1>}
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
  // Get access to Stuff documents.
  const subscription = UserInfosCars.subscribeUserInfoCars();
  // const userAccount = Meteor.users.findOne(match.params._id);
  return {
    cars: UserInfosCars.find({}).fetch(),
    ready: subscription.ready(),
  };
})(RecentlyAddedCars);
