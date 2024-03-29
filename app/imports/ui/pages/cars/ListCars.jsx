import React from 'react';
import { Container, Table, Header, Loader, Image, Pagination, Dropdown } from 'semantic-ui-react';
import { withTracker } from 'meteor/react-meteor-data';
import PropTypes from 'prop-types';
import NavBarMain from '../../components/main-navbar/NavBarMain';
import CarItem from '../../components/cars/CarItem';
import { Cars } from '../../../api/cars/CarsCollection';

/** Renders a table containing all of the Car documents. Use <CarItem> to render each row. */
class ListCars extends React.Component {

  /* Link for pagination
  https://stackoverflow.com/questions/57471901/how-to-implement-pagination-for-react-by-semantic-ui-react
  */

  /** Initialize component state with properties for login and redirection. */
  constructor(props) {
    super(props);
    this.state = {
      // showIndex: 0,
      // showCount: 25,
      activePage: 1,
      filteredCars: null,
    };

    this.carTypeOptions = [
      {
        key: 'All Types',
        text: 'All Types',
        value: null,
      },
      {
        key: 'Gas',
        text: 'Gas',
        value: 'Gas',
      },
      {
        key: 'Hybrid',
        text: 'Hybrid',
        value: 'Hybrid',
      },
      {
        key: 'Electric',
        text: 'Electric',
        value: 'Electric',
      },
    ];
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

  // Updates the filtered car array
  handleFilteredCarsChange = (e, data) => {
    if (data.value == null) {
      this.setState({
        activePage: 1,
        filteredCars: null,
      });
    } else {
      const filteredCars = this.props.Car.filter(function (car) {
        return car.carType === data.value;
      });
      this.setState({
        activePage: 1,
        filteredCars: filteredCars,
      });
    }
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
            <Header as="h2" textAlign="center" inverted>List All Cars</Header>
            <Image src='images/HEI-WAVE-LOGO.png' centered size='small' style={{
              paddingBottom: '50px',
            }}/>

            <Dropdown
            style={{ width: '25%', display: 'inline-block' }}
              placeholder='Select Car Type'
              fluid
              selection
              options={this.carTypeOptions}
              onChange={this.handleFilteredCarsChange}
              />

            <br/>
            <br/>

            {/* Pagination changes based on whether or not the filtered car array is being used */}
            {this.state.filteredCars === null ?
            <Pagination
                defaultActivePage={1}
                totalPages={Math.ceil(this.props.Car.length / 25)}
                onPageChange={this.handleInputChange}
            />
            :
            <Pagination
            defaultActivePage={1}
            totalPages={Math.ceil(this.state.filteredCars.length / 25)}
            onPageChange={this.handleInputChange}
            />
            }

            <Table celled>
              <Table.Header>
                <Table.Row>
                  <Table.HeaderCell>Car Type</Table.HeaderCell>
                  <Table.HeaderCell>Make</Table.HeaderCell>
                  <Table.HeaderCell>Model</Table.HeaderCell>
                  <Table.HeaderCell>Year</Table.HeaderCell>
                  <Table.HeaderCell>MPG</Table.HeaderCell>
                </Table.Row>
              </Table.Header>
              <Table.Body>
                {/* we are going to .slice in conjunction with map to get the correct amount */}
                {/* Different arrays are displayed based on whether or not a filter is selected */}
                {this.state.filteredCars === null ?
                this.props.Car.map((car) => <CarItem key={car._id} car={car}/>).slice(startIndex, endIndex)
                :
                this.state.filteredCars.map((car) => <CarItem key={car._id} car={car}/>).slice(startIndex, endIndex)
                }
              </Table.Body>
            </Table>
          </Container>
        </div>
    );
  }
}

/** Require an array of Cars documents in the props. */
ListCars.propTypes = {
  Car: PropTypes.array,
  ready: PropTypes.bool.isRequired,
};

/** withTracker connects Meteor data to React components. https://guide.meteor.com/react.html#using-withTracker */
export default withTracker(() => {
  // Get access to Cars documents.
  const subscription = Cars.subscribeCars();
  return {
    Car: Cars.find({}).fetch(),
    ready: subscription.ready(),
  };
})(ListCars);
