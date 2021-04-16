import React from 'react';
import { Container, Table, Header, Loader, Image, Pagination } from 'semantic-ui-react';
import { withTracker } from 'meteor/react-meteor-data';
import PropTypes from 'prop-types';
import { _ } from 'meteor/underscore';
import NavBarMain from '../../components/main-navbar/NavBarMain';
import CarItem from '../../components/cars/CarItem';
import CarFilter from '../../components/cars/CarFilter';
import { Cars } from '../../../api/cars/CarsCollection';

/** Renders a table containing all of the Stuff documents. Use <StuffItem> to render each row. */
class ListCars extends React.Component {
  filterMaker;

  make;

  /* Link for pagination
  https://stackoverflow.com/questions/57471901/how-to-implement-pagination-for-react-by-semantic-ui-react
  */

  /** Initialize component state with properties for login and redirection. */
  constructor(props) {
    super(props);
    this.state = { make: 'All Makes' };
    this.filterMaker = {};
    this.make = 'All Makes';
    this.state = {
      // showIndex: 0,
      // showCount: 25,
      activePage: 1,
    };
  }

  getMake= (make) => {
    const newState = {
      make: make,
    };
    this.setState(newState);
    this.make = make;
    const fMake = make;
    this.filterMaker = _.filter(this.make, function (object) { return object.make === fMake; });
  }

  /** Update the form controls each time the user interacts with them. */
  handleInputChange = (e, data) => {
    this.setState({
      activePage: Number(data.activePage), // we save the active page e.g. the number the user clicks
      // showIndex: (this.state.activePage * 25 - 25),
      // showCount: (this.state.activePage * 25),
    });
    // for debugging console.log('index:', this.state.showIndex);
    // for debugging console.log('count:', this.state.showCount);
  }

  /** If the subscription(s) have been received, render the page, otherwise show a loading icon. */
  render() {
    return (this.props.ready) ? this.renderPage() : <div
        className={'loaderStyle'}>
      <Loader active inverted> Getting data</Loader>
    </div>;
  }

  /** Render the page once subscriptions have been received. */
  renderPage() {

    const pageStyle = {
      background: '#001947',
      height: '100%',
      backgroundSize: 'cover',
    };

    const startIndex = (this.state.activePage * 25 - 25); // lets do an if statement
    // for debugging console.log(`STARTINDEX:${startIndex}`);

    const endIndex = (this.state.activePage * 25);
    // for debugging console.log(`ENDINDEX:${endIndex}`);

    return (

        <div style={pageStyle}>
          <NavBarMain/>
          <Container style={{
            textAlign: 'center',
            background: '#001947',
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

            <Pagination
                defaultActivePage={1}
                totalPages={Math.ceil(this.props.Car.length / 25)}
                onPageChange={this.handleInputChange}
            />
            <Table celled>
              <Table.Header>
                <Table.Row>
                  <Table.HeaderCell>Make</Table.HeaderCell>
                  <Table.HeaderCell>Model</Table.HeaderCell>
                  <Table.HeaderCell>Year</Table.HeaderCell>
                  <Table.HeaderCell>MPG</Table.HeaderCell>
                </Table.Row>
              </Table.Header>
              <Table.Body> {/* we are going to .slice in conjunction with map to get the correct amount */}
                {this.props.Car.map((car) => <CarItem key={car._id} car={car}/>).slice(startIndex, endIndex)}
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
    make: Cars.find({}).fetch(),
    ready: subscription.ready(),
  };
})(ListCars);
