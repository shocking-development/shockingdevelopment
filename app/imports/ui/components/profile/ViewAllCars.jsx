import React from 'react';
import { Table, Loader, Pagination } from 'semantic-ui-react';
import { withTracker } from 'meteor/react-meteor-data';
import PropTypes from 'prop-types';
import ViewAllCarItem from './ViewAllCarItem';
import { UserInfosCars } from '../../../api/userInfo/UserInfoCarCollection';

/** Renders a table containing all of the Car documents. Use <CarItem> to render each row. */
class ViewAllCars extends React.Component {

  /** Initialize component state with properties for login and redirection. */
  constructor(props) {
    super(props);
    this.state = {
      activePage: 1,
    };
  }

  /** Update the form controls each time the user interacts with them. */
  handleInputChange = (e, data) => {
    this.setState({
      activePage: Number(data.activePage),
    });
  }

  /** If the subscription(s) have been received, render the page, otherwise show a loading icon. */
  render() {
    return (this.props.ready) ? this.renderPage() :
        <Loader style={{ background: 'transparent' }} active inverted> Getting data</Loader>;
  }

  /** Render the page once subscriptions have been received. */
  renderPage() {

    const startIndex = (this.state.activePage * 25 - 25);
    // for debugging console.log(`STARTINDEX:${startIndex}`);

    const endIndex = (this.state.activePage * 25);
    // for debugging console.log(`ENDINDEX:${endIndex}`);

    return (

        <div>

          <Pagination
              defaultActivePage={1}
              totalPages={Math.ceil(this.props.cars.length / 25)}
              onPageChange={this.handleInputChange}
          />

          <Table celled>
            <Table.Header>
              <Table.Row>
                <Table.HeaderCell>Car Name</Table.HeaderCell>
                <Table.HeaderCell>Year</Table.HeaderCell>
                <Table.HeaderCell>Make</Table.HeaderCell>
                <Table.HeaderCell>Model</Table.HeaderCell>
                <Table.HeaderCell>MPG</Table.HeaderCell>
                <Table.HeaderCell> </Table.HeaderCell>
              </Table.Row>
            </Table.Header>
            <Table.Body>
              {this.props.cars.map((car) => <ViewAllCarItem key={car._id} car={car}/>).slice(startIndex, endIndex)}
            </Table.Body>
          </Table>
        </div>
    );
  }
}

/** Require an array of Cars documents in the props. */
ViewAllCars.propTypes = {
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
})(ViewAllCars);
