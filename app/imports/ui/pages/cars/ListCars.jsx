import React from 'react';
import { Container, Table, Header, Loader, Image, Pagination } from 'semantic-ui-react';
import { withTracker } from 'meteor/react-meteor-data';
import PropTypes from 'prop-types';
import NavBarMain from '../../components/main-navbar/NavBarMain';
import CarItem from '../../components/cars/CarItem';
import { Cars } from '../../../api/cars/CarsCollection';

/** Renders a table containing all of the Stuff documents. Use <StuffItem> to render each row. */
class ListCars extends React.Component {

  /** Initialize component state with properties for login and redirection. */
  constructor(props) {
    super(props);
    this.state = {
      showIndex: '',
      showCount: 0,
    };
  }

  /** Update the form controls each time the user interacts with them. */
  handleInputChange = (e, data) => {
    this.setState({
      showIndex: data.activePage,
      showCount: (data.activePage) * 25,
      // we could probably do some calculations of the index in order to actually increment in the collection
    });
    console.log('index:', this.state.showIndex);
    console.log('count:', this.state.showCount);
  }

  /** Update the form controls each time the user interacts with them. */
  handlePrevious = (e, { name, value }) => {
    this.setState({ [name]: value });
  }
  // here we are going to need to get the correct index of the collection to show
  // use the slice funciton
  // get the state index

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

    const startIndex = this.state.showIndex; // lets do an if statement
    console.log(`STARTINDEX:${startIndex}`);

    const endIndex = startIndex + this.state.showCount;
    console.log(`ENDINDEX:${endIndex}`);

    const count = this.props.Car.length;
    if (endIndex > count) { // an edge case
      this.endIndex = count;
    }

    // we are going to slice based on the index

    // const showCount = this.props.Car.slice(0, 25).length; // this currently gets the max amount of cars to show, the show count state will change based on the index
    // we will slice the items then map over them
    // console.log(showCount);
    // important code  const currentTodos = todos.slice( indexOfFirstTodo, indexOfLastTodo );
    // (event, data) => console.log(data.activePage)

    return (
        /* const startIndex = pagination[collection.getCollectionName()].showIndex;
        const showCount = pagination[collection.getCollectionName()].showCount;
        const endIndex = startIndex + showCount;
        const itemsToShow = _.slice(items, startIndex, endIndex);
        the index of 1 should show the pages from 0,25
        the index of 2 should show the pages from 25,50
        */

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
                totalPages={Math.ceil(this.props.Car.length / 10)}
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
              <Table.Body> {/* we are going to .slice instead of map */}
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
    ready: subscription.ready(),
  };
})(ListCars);
