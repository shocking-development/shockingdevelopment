import React from 'react';
import { Container, Table, Header, Loader } from 'semantic-ui-react';
import { withTracker } from 'meteor/react-meteor-data';
import PropTypes from 'prop-types';
import NavBarMain from '../../components/main-navbar/NavBarMain';
import CarItem  from '../../components/cars/CarItem';
import { Cars } from '../../../api/cars/CarsCollection';

/** Renders a table containing all of the Stuff documents. Use <StuffItem> to render each row. */
class ListCars extends React.Component {

  /** If the subscription(s) have been received, render the page, otherwise show a loading icon. */
  render() {
    return (this.props.ready) ? this.renderPage() : <Loader active>Getting data</Loader>;
  }

  /** Render the page once subscriptions have been received. */
  renderPage() {
    {/**const carDocs = Cars.find({}).fetch();
    const carYears = carDocs.map((doc) => `${doc.year}`);
    const carModel = carDocs.map((doc) => `${doc.model}-${doc._id}`);
    const carMake = carDocs.map((doc) => `${doc.make}-${doc._id}`); */ }
    const pageStyle = {
      background: 'rgb(21 51 62)',
      height: '60em',
      backgroundSize: 'cover',
    };
    console.log(this.props.Car);

    return (
        <div style={pageStyle}>
          <NavBarMain/>
          <Container style={{ padding: '10em' }}>
            <Header as="h2" textAlign="center" inverted>List My Cars </Header>
            <Table celled>
              <Table.Header>
                <Table.Row>
                  <Table.HeaderCell>Make</Table.HeaderCell>
                  <Table.HeaderCell>Model</Table.HeaderCell>
                  <Table.HeaderCell>Year</Table.HeaderCell>
                  <Table.HeaderCell>MPG</Table.HeaderCell>
                </Table.Row>
              </Table.Header>
              <Table.Body>
                {this.props.Car.map((Car) => <CarItem key={Car._id} Car={Car}/>)}
              </Table.Body>
            </Table>
          </Container>
        </div>
    );
  }
}

/** Require an array of Stuff documents in the props. */
ListCars.propTypes = {
  Car: PropTypes.array,
  ready: PropTypes.bool.isRequired,
};

/** withTracker connects Meteor data to React components. https://guide.meteor.com/react.html#using-withTracker */
export default withTracker(() => {
  // Get access to Stuff documents.
  const subscription = Cars.subscribeCars();
  return {
    Car: Cars.find({}).fetch(),
    ready: subscription.ready(),
  };
})(ListCars);
