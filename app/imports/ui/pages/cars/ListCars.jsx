import React from 'react';
import { Container, Table, Header, Loader, Image } from 'semantic-ui-react';
import { withTracker } from 'meteor/react-meteor-data';
import PropTypes from 'prop-types';
import NavBarMain from '../../components/main-navbar/NavBarMain';
import CarItem from '../../components/cars/CarItem';
import { Cars } from '../../../api/cars/CarsCollection';

/** Renders a table containing all of the Stuff documents. Use <StuffItem> to render each row. */
class ListCars extends React.Component {
  dispatch: any;

  pagination: any;

  setShowIndex: (collectionName: string, index: number) => any;

  setShowCount: (collectionName: string, count: number) => any;

  /** If the subscription(s) have been received, render the page, otherwise show a loading icon. */
  render() {
    return (this.props.ready) ? this.renderPage() : <Loader active>Getting data</Loader>;
  }

  /** Render the page once subscriptions have been received. */
  renderPage() {

    const pageStyle = {
      background: 'rgb(21 51 62)',
      height: '100%',
      backgroundSize: 'cover',
    };

    return (
        <div style={pageStyle}>
          <NavBarMain/>
          <Container style={{
            textAlign: 'center',
            background: 'rgb(21 51 62)',
            minHeight: '110vh',
            Width: '100%',
            paddingLeft: '15em',
            paddingTop: '8em',
            paddingBottom: '8em',
          }}>
            <Header as="h2" textAlign="center" inverted>List All Cars </Header>
            <Image src='images/HEI-WAVE-LOGO.png' centered size='small' style={{
              paddingBottom: '50px',
            }}/>
            <div aria-label="Pagination Navigation" role="navigation" className="ui pagination menu">
              <a aria-current="false" aria-disabled="false" tabIndex="0" value="1" aria-label="First item"
                 type="firstItem" className="item">«</a>
              <a aria-current="false" aria-disabled="false" tabIndex="0" value="4" aria-label="Previous item"
                 type="prevItem"
                 className="item">⟨</a><a aria-current="false" aria-disabled="false" tabIndex="0" value="1"
                                          type="pageItem"
                                          className="item">1</a>
              <a aria-current="false" aria-disabled="true" tabIndex="-1" value="3" type="ellipsisItem"
                 className="item">2</a>
              <a aria-current="false" aria-disabled="true" tabIndex="-1" value="7" type="ellipsisItem"
                 className="item">...</a>
              <a aria-current="false" aria-disabled="false" tabIndex="0" value="10"
                 type="pageItem" className="item">10</a>
              <a aria-current="false" aria-disabled="false" tabIndex="0" value="6" aria-label="Next item"
                 type="nextItem" className="item">⟩</a>
              <a aria-current="false" aria-disabled="false" tabIndex="0" value="10" aria-label="Last item"
                 type="lastItem" className="item">»</a>
            </div>
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
                {this.props.Car.map((car) => <CarItem key={car._id} car={car}/>)}
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
    Car: Cars.find({}, { sort: { count: -1 }, limit: 25 }).fetch(), // the changed line
    ready: subscription.ready(),
  };
})(ListCars);
