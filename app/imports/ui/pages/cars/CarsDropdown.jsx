import React from 'react';
import { Container, Table, Header, Loader, Dropdown } from 'semantic-ui-react';
import { withTracker } from 'meteor/react-meteor-data';
import PropTypes from 'prop-types';
import { Cars } from '../../../api/cars/CarsCollection';
import CarItem from '../../components/cars/CarItem';
import NavBarMain from '../../components/main-navbar/NavBarMain';

/** Renders a table containing all of the Stuff documents. Use <StuffItem> to render each row. */
class CarsDropdown extends React.Component {

  /** If the subscription(s) have been received, render the page, otherwise show a loading icon. */
  render() {
    return (this.props.ready) ? this.renderPage() : <Loader active>Getting data</Loader>;
  }

  /** Render the page once subscriptions have been received. */
  renderPage() {
    const pageStyle = {
      background: 'rgb(21 51 62)',
      height: '60em',
      backgroundSize: 'cover',
    };
    const options = [
      this.props.cars.map(({ make }) => ({ value: make, text: make })),
    ];
    return (
        <div style={pageStyle}>
          <NavBarMain/>
          <Container style={{ padding: '10em' }}>
            <Header as="h2" textAlign="center" inverted>List Profiles (Admin)</Header>
            <Dropdown
                placeholder='Select the make of your car'
                fluid
                selection
                options={options}
            />
          </Container>
        </div>
    );
  }
}

/** Require an array of Stuff documents in the props. */
CarsDropdown.propTypes = {
  cars: PropTypes.array.isRequired,
  ready: PropTypes.bool.isRequired,
};

/** withTracker connects Meteor data to React components. https://guide.meteor.com/react.html#using-withTracker */
export default withTracker(() => {
  // Get access to Stuff documents.
  const subscription = Cars.subscribeCars();
  return {
    cars: Cars.find({}).fetch(),
    ready: subscription.ready(),
  };
})(CarsDropdown);
